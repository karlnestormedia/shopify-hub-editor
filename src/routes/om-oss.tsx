import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shop/PageShell";
import melvinPortrait from "@/assets/team/melvin-cronzell.jpg.asset.json";
import emilPortrait from "@/assets/team/emil-nestor.jpg.asset.json";
import isabellePortrait from "@/assets/team/isabelle-montelius.jpg.asset.json";
import karlPortrait from "@/assets/team/karl-nestor.jpg.asset.json";
import melkerPortrait from "@/assets/team/melker-lehnberg.jpg.asset.json";

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
  { step: "Prototyperna", text: "Vi testade form, material och funktion. Detta resulterade i Foldit. ½ dl, 1 msk, 1 tsk + 1 slickepott. Allt i ett verktyg." },
  { step: "Produktionen", text: "Foldit är designad och producerad i Sverige. Med ett mål att göra vardagen enklare." },
  { step: "Lanseringen", text: "Förbeställningen öppnar snart. Därefter skickas måttsatsen med 1-3 dagars leveranstid." },
];

const team = [
  { name: "Melvin Cronzell", role: "VD", image: melvinPortrait.url, description: "Melvin håller i trådarna. Han samordnar arbetet och ser till att vi tar nästa steg tillsammans – från idé till färdig måttsats." },
  { name: "Emil Nestor", role: "Ekonomiansvarig", image: emilPortrait.url, description: "Emil har koll på Foldits ekonomi. Han ansvarar för budget, bokföring och uppföljning av våra inköp och försäljningar." },
  { name: "Isabelle Montelius", role: "Marknadsföringsansvarig", image: isabellePortrait.url, description: "Isabelle ansvarar för hur Foldit syns. Genom bilder, kampanjer och våra sociala medier får fler upptäcka måttsatsen och hur den används." },
  { name: "Karl Nestor", role: "Produktansvarig", image: karlPortrait.url, description: "Karl har hand om själva produkten. Han arbetar med design, material och tillverkning – med fokus på att göra Foldit enkelt att mäta, vika och skrapa med." },
  { name: "Melker Lehnberg", role: "Säljansvarig", image: melkerPortrait.url, description: "Melker ansvarar för Foldits försäljning och kundkontakter. Han hjälper fler att hitta måttsatsen och tar tillvara frågor och feedback från våra kunder." },
];

function OmOss() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 lg:px-8">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Foldit UF</p>
          <h1 className="max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Ett redskap. Tre mått. Ingenting som fastnar.</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Vi är ett UF-företag som vill göra bakning lite enklare – med en kombinerad måttsats och slickepott i en och samma produkt.
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
          <div className="mt-10 space-y-10 md:space-y-4">
            {team.map((p, i) => (
              <article key={p.name} aria-labelledby={`team-${i}`} className="grid items-center md:grid-cols-2">
                <img
                  src={p.image}
                  alt={`${p.name}, ${p.role} på Foldit UF`}
                  width={1200}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className={`aspect-[6/5] w-full object-cover ${i % 2 === 1 ? "md:order-2" : ""}`}
                />
                <div className={`py-7 md:px-8 md:py-10 lg:px-12 ${i % 2 === 1 ? "md:order-1 md:pl-0 lg:pl-0" : ""}`}>
                  <p className="text-xs uppercase text-muted-foreground">{p.role}</p>
                  <h3 id={`team-${i}`} className="mt-3 font-display text-4xl font-semibold leading-tight lg:text-5xl">{p.name}</h3>
                  <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">{p.description}</p>
                </div>
              </article>
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
