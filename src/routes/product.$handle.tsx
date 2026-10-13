import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/shop/SiteHeader";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} – Foldit` },
      { name: "description", content: "Produktinformation och köp hos Foldit." },
      { property: "og:title", content: `${params.handle.replace(/-/g, " ")} – Foldit` },
      { property: "og:description", content: "Produktinformation och köp hos Foldit." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });
  const addItem = useCartStore((s) => s.addItem);
  const loading = useCartStore((s) => s.loading);
  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  const variants = product?.variants.edges ?? [];
  const variant = variants[variantIdx]?.node;
  const images = product?.images.edges ?? [];

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
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Tillbaka</Link>
        {isLoading && <p className="mt-8 text-muted-foreground">Laddar…</p>}
        {!isLoading && !product && <p className="mt-8">Produkten hittades inte.</p>}
        {product && (
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <div>
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                {images[imgIdx] && (
                  <img src={images[imgIdx].node.url} alt={images[imgIdx].node.altText ?? product.title} className="h-full w-full object-cover" />
                )}
              </div>
              {images.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {images.map((im, i) => (
                    <button key={im.node.url} onClick={() => setImgIdx(i)} aria-label={`Bild ${i + 1}`}
                      className={`h-16 w-16 overflow-hidden rounded-md border ${i === imgIdx ? "border-primary" : "border-border"}`}>
                      <img src={im.node.url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{product.title}</h1>
              {variant && (
                <p className="text-2xl font-bold">{formatPrice(variant.price.amount, variant.price.currencyCode)}</p>
              )}
              {variants.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <Button key={v.node.id} variant={i === variantIdx ? "default" : "outline"} size="sm" onClick={() => setVariantIdx(i)}>
                      {v.node.title}
                    </Button>
                  ))}
                </div>
              )}
              <p className="whitespace-pre-line text-muted-foreground">{product.description}</p>
              <Button size="lg" className="w-full sm:w-auto" onClick={add} disabled={loading || !variant?.availableForSale}>
                {variant?.availableForSale === false ? "Slutsåld" : "Lägg i varukorg"}
              </Button>
              <p className="text-xs text-muted-foreground">Frakt och betalning väljer du i kassan.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
