import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Lock, Truck, RotateCcw } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { PageShell } from "@/components/shop/PageShell";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";

const PRODUCT_HANDLE = "foldit-3-i-1-mattsats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Foldit – smarta måttsatser för köket" },
      { name: "description", content: "Mät. Vik. Skrapa. Foldit 3-i-1 måttsats – hopfällbar, platsbesparande och gjord så att sirap och smet aldrig fastnar." },
      { property: "og:title", content: "Foldit – smarta måttsatser för köket" },
      { property: "og:description", content: "Mät. Vik. Skrapa. Måttsats och slickepott i ett." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-obsidian">
      {/* Mobil 9:16, desktop 16:9. Byt ut placeholdern mot <video> när filmerna är klara. */}
      <div className="relative aspect-[9/16] w-full md:aspect-video">
        <div className="absolute inset-0 flex items-start justify-center bg-destructive/90 p-4 text-center">
          <p className="rounded bg-background/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
            <span className="md:hidden">Lägg in hero-video (9:16, mobil) från kolakaksinspelningen</span>
            <span className="hidden md:inline">Lägg in hero-video (16:9, desktop) från kolakaksinspelningen</span>
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-14 text-center sm:pb-20">
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-obsidian-foreground sm:text-6xl lg:text-7xl">
            Mät. Vik. Skrapa.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-obsidian-foreground/90 sm:text-base">
            Måttsats och slickepott i ett. Designad för att sirap, honung och smet aldrig ska fastna.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-none border border-obsidian-foreground/40 bg-obsidian px-8 text-xs font-medium uppercase tracking-[0.18em] text-obsidian-foreground hover:bg-obsidian/90"
          >
            <Link to="/product/$handle" params={{ handle: PRODUCT_HANDLE }}>
              Upptäck måttsatsen
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", PRODUCT_HANDLE],
    queryFn: () => fetchProductByHandle(PRODUCT_HANDLE),
  });
  const addItem = useCartStore((s) => s.addItem);
  const loading = useCartStore((s) => s.loading);
  const variant = product?.variants.edges[0]?.node;
  const image = product?.images.edges[0]?.node;

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
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory">
        {image ? (
          <img src={image.url} alt={image.altText ?? product?.title ?? "Foldit 3-i-1"} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-destructive bg-destructive/10 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
              Lägg in produktbild på Foldit 3-i-1 (4:5)
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Förbeställning</p>
        <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Foldit 3-i-1 måttsats
        </h2>
        {variant && (
          <p className="mt-4 text-xl">{formatPrice(variant.price.amount, variant.price.currencyCode)}</p>
        )}
        {isLoading && <p className="mt-4 text-sm text-muted-foreground">Laddar…</p>}
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          {product?.description || "Mått, vikbar skrapa och slickepott i ett. Sirap, honung och smet följer med hela vägen ner i bunken."}
        </p>
        <Button
          size="lg"
          onClick={add}
          disabled={loading || !variant}
          className="mt-8 w-full rounded-none bg-obsidian px-8 text-xs font-medium uppercase tracking-[0.18em] text-obsidian-foreground hover:bg-obsidian/90 sm:w-auto sm:self-start"
        >
          Lägg i varukorg
        </Button>
        <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
          <li className="flex items-center gap-3"><Lock className="h-4 w-4" strokeWidth={1.5} />Säker betalning med Klarna, Swish & kort</li>
          <li className="flex items-center gap-3"><Truck className="h-4 w-4" strokeWidth={1.5} />Klimatsmart frakt via PostNord</li>
          <li className="flex items-center gap-3"><RotateCcw className="h-4 w-4" strokeWidth={1.5} />14 dagars öppet köp efter leverans</li>
        </ul>
      </div>
    </section>
  );
}

function Index() {
  return (
    <PageShell>
      <Hero />
      <ProductShowcase />
    </PageShell>
  );
}
