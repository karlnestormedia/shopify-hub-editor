import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/shop/PageShell";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle } from "@/lib/shopify";
import { PurchasePresentation } from "@/components/shop/PurchasePresentation";
import { HowItWorks } from "@/components/shop/HowItWorks";
import { Faq } from "@/components/shop/Faq";

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
  return <PurchasePresentation product={product} isLoading={isLoading} />;
}

function Index() {
  return (
    <PageShell>
      <Hero />
      <ProductShowcase />
      <HowItWorks />
      <Faq />
    </PageShell>
  );
}
