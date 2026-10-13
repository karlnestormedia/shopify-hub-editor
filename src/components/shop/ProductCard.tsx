import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const { node } = product;
  const addItem = useCartStore((s) => s.addItem);
  const loading = useCartStore((s) => s.loading);
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const add = async () => {
    if (!variant) return;
    try {
      await addItem(variant.id, 1);
      toast.success("Lagd i varukorgen");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Kunde inte lägga till");
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link to="/product/$handle" params={{ handle: node.handle }} className="block aspect-square overflow-hidden bg-muted">
        {image ? (
          <img src={image.url} alt={image.altText ?? node.title} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : null}
      </Link>
      <div className="space-y-3 p-5">
        <Link to="/product/$handle" params={{ handle: node.handle }}>
          <h3 className="text-2xl font-medium leading-tight">{node.title}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{node.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold">{formatPrice(price.amount, price.currencyCode)}</span>
          <Button onClick={add} disabled={loading || !variant?.availableForSale}>
            {variant?.availableForSale === false ? "Slutsåld" : "Lägg i varukorg"}
          </Button>
        </div>
      </div>
    </article>
  );
}
