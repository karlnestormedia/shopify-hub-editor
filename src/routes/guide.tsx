import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shop/PageShell";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Användningsguide – Foldit 3-i-1 måttsats" },
      { name: "description", content: "Lär dig använda Foldit 3-i-1 måttsats: mått, vikning och skötsel – allt i en hopfällbar måttsats." },
      { property: "og:title", content: "Användningsguide – Foldit 3-i-1 måttsats" },
      { property: "og:description", content: "Så använder du Foldit 3-i-1 måttsats i köket." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Guide,
});

function Guide() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent-foreground/70">Foldit</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Användningsguide</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Allt du behöver veta för att komma igång med din 3-i-1 måttsats.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold">1. Vik ut måttsatsen</h2>
            <p className="mt-3 text-muted-foreground">
              Veckla ut måttsatsen tills den ligger plant. Den hopfällbara konstruktionen gör att den tar
              minimal plats i skåpet när den inte används.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">2. Välj rätt mått</h2>
            <p className="mt-3 text-muted-foreground">
              Måttsatsen har tre skalor i samma verktyg – läs av den skala som receptet kräver och häll
              upp till rätt streck.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">3. Rengöring</h2>
            <p className="mt-3 text-muted-foreground">
              Skölj av måttsatsen under rinnande vatten efter användning. Den är platt och lätt att torka,
              så den är snabbt redo att förvaras igen.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
