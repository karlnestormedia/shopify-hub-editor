export const SHOPIFY_API_VERSION = "2026-10";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "n002tb-jm.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
// Publishable storefront token (safe in client code)
export const SHOPIFY_STOREFRONT_TOKEN = "b038ff32a29a83bc78e8a711b7ce90ab";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    descriptionHtml?: string;
    handle: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

const PRODUCT_FIELDS = `
  id title description descriptionHtml handle
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 25) { edges { node { id title price { amount currencyCode } availableForSale selectedOptions { name value } } } }
  options { name values }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) { edges { node { ${PRODUCT_FIELDS} } } }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (response.status === 402) {
    throw new Error("Shopify kräver en aktiv betald plan för att butiken ska kunna visas.");
  }
  if (!response.ok) throw new Error(`Shopify svarade med fel ${response.status}`);
  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify-fel: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }
  return data;
}

export async function fetchProducts(first = 24): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first });
  return data.data.products.edges as ShopifyProduct[];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct["node"] | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.data.productByHandle ?? null;
}

export function formatPrice(amount: string | number, currency: string) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

// ---- Cart (Storefront API) ----
const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { totalAmount { amount currencyCode } }
  lines(first: 50) { edges { node {
    id quantity
    merchandise { ... on ProductVariant {
      id title price { amount currencyCode }
      selectedOptions { name value }
      product { handle title images(first: 1) { edges { node { url altText } } } }
    } }
  } } }
`;

export interface CartLine {
  id: string;
  quantity: number;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
  productHandle: string;
  productTitle: string;
  imageUrl?: string;
}

export interface CartState {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  total: { amount: string; currencyCode: string };
  lines: CartLine[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCart(cart: any): CartState {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    total: cart.cost.totalAmount,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lines: cart.lines.edges.filter(({ node }: any) => node.quantity > 0).map(({ node }: any) => ({
      id: node.id,
      quantity: node.quantity,
      variantId: node.merchandise.id,
      variantTitle: node.merchandise.title,
      price: node.merchandise.price,
      selectedOptions: node.merchandise.selectedOptions,
      productHandle: node.merchandise.product.handle,
      productTitle: node.merchandise.product.title,
      imageUrl: node.merchandise.product.images.edges[0]?.node.url,
    })),
  };
}

function stockWarning(warnings: Array<{ message: string; code: string }> | undefined) {
  const w = warnings?.find((x) => x.code.startsWith("MERCHANDISE_"));
  if (w) throw new Error(w.message);
}

function userErrors(errors: Array<{ message: string }> | undefined) {
  if (errors && errors.length) throw new Error(errors.map((e) => e.message).join(", "));
}

export async function cartCreate(variantId: string, quantity: number): Promise<CartState> {
  const data = await storefrontApiRequest(
    `mutation($input: CartInput!) { cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { message } warnings { message code } } }`,
    { input: { lines: [{ merchandiseId: variantId, quantity }] } },
  );
  userErrors(data.data.cartCreate.userErrors);
  stockWarning(data.data.cartCreate.warnings);
  return mapCart(data.data.cartCreate.cart);
}

export async function cartLinesAdd(cartId: string, variantId: string, quantity: number): Promise<CartState> {
  const data = await storefrontApiRequest(
    `mutation($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } warnings { message code } } }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  userErrors(data.data.cartLinesAdd.userErrors);
  stockWarning(data.data.cartLinesAdd.warnings);
  return mapCart(data.data.cartLinesAdd.cart);
}

export async function cartLinesUpdate(cartId: string, lineId: string, quantity: number): Promise<CartState> {
  const data = await storefrontApiRequest(
    `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  userErrors(data.data.cartLinesUpdate.userErrors);
  return mapCart(data.data.cartLinesUpdate.cart);
}

export async function cartLinesRemove(cartId: string, lineId: string): Promise<CartState> {
  const data = await storefrontApiRequest(
    `mutation($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lineIds: [lineId] },
  );
  userErrors(data.data.cartLinesRemove.userErrors);
  return mapCart(data.data.cartLinesRemove.cart);
}

export async function cartFetch(cartId: string): Promise<CartState | null> {
  const data = await storefrontApiRequest(`query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id: cartId });
  return data.data.cart ? mapCart(data.data.cart) : null;
}

export function withChannel(url: string) {
  const u = new URL(url);
  u.searchParams.set("channel", "online_store");
  return u.toString();
}

export const POLICY_KEYS = {
  "rattsligt-meddelande": { field: "legalNotice", label: "Rättsligt meddelande" },
  kopvillkor: { field: "termsOfService", label: "Köpvillkor" },
  integritetspolicy: { field: "privacyPolicy", label: "Integritetspolicy" },
  returpolicy: { field: "refundPolicy", label: "Retur- och återbetalningspolicy" },
  fraktpolicy: { field: "shippingPolicy", label: "Fraktpolicy" },
} as const;
export type PolicySlug = keyof typeof POLICY_KEYS;

export async function fetchPolicy(slug: string): Promise<{ label: string; body: string } | null> {
  const entry = POLICY_KEYS[slug as PolicySlug];
  if (!entry) return null;
  const data = await storefrontApiRequest(`{ shop { ${entry.field} { body } } }`);
  const policy = data?.data?.shop?.[entry.field];
  return policy ? { label: entry.label, body: policy.body } : null;
}
