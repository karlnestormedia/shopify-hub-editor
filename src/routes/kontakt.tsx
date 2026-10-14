import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shop/PageShell";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Foldit UF" },
      { name: "description", content: "Kontakta Foldit UF med frågor om måttsatsen, din beställning eller förbeställning." },
      { property: "og:title", content: "Kontakt – Foldit UF" },
      { property: "og:description", content: "Kontakta Foldit UF med frågor om måttsatsen och beställningar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent-foreground/70">Foldit UF</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Kontakt</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Vi svarar gärna på frågor om måttsatsen, din beställning eller förbeställning.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">Hör av dig</h2>
            <p className="mt-3 text-muted-foreground">
              Skicka ett mail till{" "}
              <a href="mailto:info@foldit.se" className="font-medium text-foreground underline underline-offset-4">
                info@foldit.se
              </a>{" "}
              så återkommer vi så snart vi kan.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Frakt och beställningar</h2>
            <p className="mt-3 text-muted-foreground">
              Frakt och betalning sköts i kassan. Har du frågor om en beställning som lagts
              där, hör av dig så hjälper vi dig.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
