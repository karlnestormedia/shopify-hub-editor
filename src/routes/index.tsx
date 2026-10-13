import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/shop/ProductCard";
import { SiteHeader } from "@/components/shop/SiteHeader";
import { fetchProducts } from "@/lib/shopify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Foldit – smarta måttsatser för köket" },
      { name: "description", content: "Handla Foldit 3-i-1 måttsats – hopfällbar och platsbesparande. Säker kassa via Shopify." },
      { property: "og:title", content: "Foldit – smarta måttsatser för köket" },
      { property: "og:description", content: "Handla Foldit 3-i-1 måttsats – hopfällbar och platsbesparande." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts(24) });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent-foreground/70">Foldit UF</p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-primary sm:text-6xl">
            Mät smartare. Spara plats i köket.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Hopfällbara måttsatser som gör vardagsbaket och matlagningen enklare.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="mb-8 text-4xl font-semibold tracking-tight">Produkter</h2>
        {isLoading && <p className="text-muted-foreground">Laddar produkter…</p>}
        {error && <p className="text-destructive">Kunde inte hämta produkterna just nu.</p>}
        {data && data.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Inga produkter hittades. Be mig skapa en produkt i chatten, så dyker den upp här.
          </p>
        )}
        {data && data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © Foldit UF · Betalning och frakt hanteras säkert i Shopifys kassa
      </footer>
    </div>
  );
}
