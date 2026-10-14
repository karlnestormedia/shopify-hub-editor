import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shop/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Användningsguide – Foldit 3-i-1 måttsats" },
      { name: "description", content: "Så mäter, skrapar och rengör du med Foldit 3-i-1 måttsats: ½ dl, 1 msk och 1 tsk i ett hopfällbart redskap." },
      { property: "og:title", content: "Användningsguide – Foldit 3-i-1 måttsats" },
      { property: "og:description", content: "Mätning, skrapning och skötsel – steg för steg." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Guide,
});

const sections = [
  {
    value: "matning", label: "Mätning",
    steps: [
      { title: "Välj mått", text: "Vik Foldit till det mått receptet kräver: 1 tsk, 1 msk eller ½ dl.", image: "Foldit vikt i de tre måtten bredvid varandra" },
      { title: "Fyll upp", text: "Fyll måttet till kanten. Håll det plant för ett exakt mått.", image: "Måttet fylls med sirap eller mjöl" },
      { title: "Häll i", text: "Töm innehållet i bunken – formen gör att det mesta rinner ut av sig självt.", image: "Innehållet hälls ner i en bunke" },
    ],
  },
  {
    value: "skrapning", label: "Hällning & skrapning",
    steps: [
      { title: "Vik ut", text: "Vik ut måttet direkt över bunken.", image: "Händer som viker ut Foldit över bunken" },
      { title: "Skrapa ren", text: "Använd den raka kanten som slickepott och skrapa av sirap eller smet.", image: "Sirap skrapas av mot bunkens kant" },
      { title: "Skrapa bunken", text: "Samma kant skrapar även bunken ren – inget behov av ett extra redskap.", image: "Foldit skrapar smet från bunkens insida" },
    ],
  },
  {
    value: "skotsel", label: "Skötsel",
    steps: [
      { title: "Skölj", text: "Vik ut helt och skölj under rinnande vatten, eller diska i diskmaskinen.", image: "Utvikt Foldit under kranen" },
      { title: "Torka", text: "Låt torka eller torka av med en handduk – den platta ytan torkar snabbt.", image: "Foldit torkas med kökshandduk" },
      { title: "Förvara platt", text: "Lägg den platt i kökslådan, där den tar nästan ingen plats.", image: "Foldit platt i en prydlig kökslåda" },
    ],
  },
];

function Guide() {
  return (
    <PageShell>
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Guide</p>
          <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">Så använder du Foldit</h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">Tre mått, en slickepott och platt förvaring – steg för steg.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <Tabs defaultValue="matning">
          <TabsList className="h-auto w-full justify-start gap-6 overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
            {sections.map((s) => (
              <TabsTrigger key={s.value} value={s.value}
                className="rounded-none border-b-2 border-transparent px-0 pb-3 text-xs uppercase tracking-[0.16em] data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {sections.map((s) => (
            <TabsContent key={s.value} value={s.value} className="mt-10">
              <ol className="grid gap-8 md:grid-cols-3">
                {s.steps.map((step, i) => (
                  <li key={step.title}>
                    <div className="flex aspect-square items-center justify-center bg-destructive p-6 text-center text-xs uppercase text-destructive-foreground">
                      Lägg in bild: {step.image}
                    </div>
                    <span className="mt-5 block text-xs text-muted-foreground">Steg {i + 1}</span>
                    <h2 className="mt-1 font-display text-2xl font-semibold">{step.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </PageShell>
  );
}
