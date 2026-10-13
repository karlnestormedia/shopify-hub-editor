import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shop/PageShell";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – Foldit UF" },
      { name: "description", content: "Berättelsen om Foldit UF och den hopfällbara 3-i-1 måttsatsen – mått och slickepott i ett." },
      { property: "og:title", content: "Om oss – Foldit UF" },
      { property: "og:description", content: "Från idé i köket till färdig måttsats. Möt Foldit UF." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OmOss,
});

const timeline = [
  { step: "Idén", text: "Sirap och honung som fastnar i måttet, och en kökslåda full av mått. Vi ville lösa båda problemen med ett enda redskap." },
  { step: "Prototyperna", text: "Vi testade form, material och vikning tills ett verktyg kunde bli ½ dl, 1 msk och 1 tsk – och skrapa bunken ren." },
  { step: "Produktionen", text: "Foldit är just nu under produktion. Varje detalj är framtagen för att förvaras platt och rengöras enkelt." },
  { step: "Lanseringen", text: "Förbeställningen öppnar snart. Därefter skickas måttsatsen med 1-3 dagars leveranstid." },
];

const team = [
  { name: "Namn Efternamn", role: "VD" },
  { name: "Namn Efternamn", role: "Ekonomiansvarig" },
  { name: "Namn Efternamn", role: "Marknadsansvarig" },
];

function OmOss() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 lg:px-8">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Foldit UF</p>
          <h1 className="max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Ett redskap. Tre mått. Ingenting som fastnar.</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Vi är ett UF-företag som vill göra bakning lite enklare – med en måttsats som också är en slickepott och som tar nästan ingen plats.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Från idé till färdig produkt</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {timeline.map((item, i) => (
            <li key={item.step} className="border-t border-foreground pt-5">
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold">{item.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Teamet bakom Foldit</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {team.map((p, i) => (
              <div key={i}>
                <div className="flex aspect-[4/5] items-center justify-center bg-destructive p-6 text-center text-xs uppercase text-destructive-foreground">
                  Lägg in porträtt – ljus bakgrund, samma beskärning för alla
                </div>
                <p className="mt-4 font-display text-xl font-semibold">{p.name}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 lg:px-8">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ett UF-företag</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Foldit UF drivs inom Ung Företagsamhet. Under ett läsår tar vi en idé hela vägen till en riktig produkt – design, produktion, ekonomi och försäljning. Varje köp hjälper oss att ta nästa steg.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
