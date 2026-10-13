import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shop/PageShell";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – Foldit UF" },
      { name: "description", content: "Berättelsen om Foldit UF och den hopfällbara 3-i-1 måttsatsen som sparar plats i köket." },
      { property: "og:title", content: "Om oss – Foldit UF" },
      { property: "og:description", content: "Berättelsen om Foldit UF och den hopfällbara 3-i-1 måttsatsen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OmOss,
});

function OmOss() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent-foreground/70">Foldit UF</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Om oss</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Ett litet företag med en stor idé: smarta köksredskap som tar minimal plats.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">Vår idé</h2>
            <p className="mt-3 text-muted-foreground">
              Foldit föddes ur ett enkelt problem – köksskåpen är fulla av redskap som används sällan men
              tar stor plats. Vår 3-i-1 måttsats vecklas ihop till ett tunnt format men ersätter flera
              separata mått.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Vem vi är</h2>
            <p className="mt-3 text-muted-foreground">
              Foldit UF drivs av unga företagare inom Ung Företagsamhet. Vi tar fram, tillverkar och
              säljer våra egna produkter – från idé till färdig måttsats.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Kommande</h2>
            <p className="mt-3 text-muted-foreground">
              Produkten är under produktion och förbeställning öppnar snart. Följ oss för att veta när
              den är tillgänglig.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
