import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Vilka mått ersätter 3-i-1 måttsatsen?",
    a: "Foldit kombinerar tre av kökets vanligaste mått i ett enda flexibelt verktyg: ½ deciliter (50 ml), 1 matsked (15 ml) och 1 tesked (5 ml). Du viker enkelt fram den storlek du behöver.",
  },
  {
    q: "Hur fungerar slickepottsfunktionen?",
    a: "När du har mätt upp ingrediensen viker du ut måttet till en plan skrapa. Den flexibla kanten formar sig efter skålen och skrapar effektivt bort trögflytande sirap, honung eller smet så att inget går till spillo.",
  },
  {
    q: "Är materialet livsmedelsgodkänt och tål det maskindisk?",
    a: "Ja, Foldit är tillverkad i 100 % livsmedelsgodkänt och BPA-fritt material som tål både maskindisk och höga temperaturer. När måttet är utvikt är det dessutom extremt enkelt att skölja rent för hand.",
  },
  {
    q: "Vad gäller vid ångerrätt och retur?",
    a: "Du har 14 dagars öppet köp från den dag du tar emot din beställning. Produkten ska returneras i oskadat originalskick.",
  },
] as const;

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">FAQ</p>
          <h2 id="faq-title" className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Vanliga frågor</h2>
        </div>
        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-base hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
