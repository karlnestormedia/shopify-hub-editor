const steps = [
  {
    title: "Mät",
    image: "Närbild på Foldit vikt som ett mått. En hand häller gyllene sirap i måttet. Visa måttets form och sirapen tydligt.",
    caption: "Välj ditt mått och mät sedan upp ingrediensen",
  },
  {
    title: "Vik",
    image: "Visa händerna som viker ut det sirapsfyllda måttet till en plan yta ovanför bunken. Fånga övergången från mått till slickepott.",
    caption: "Vik ut Foldit till en slickepott över bunken.",
  },
  {
    title: "Skrapa",
    image: "Närbild på det utvikta måttet som dras mot bunkens kant. Visa hur den sista sirapen skrapas ner i smeten.",
    caption: "Skrapa av mot kanten så att sirapen hamnar i smeten.",
  },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="border-t border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-medium uppercase text-muted-foreground">Tre enkla steg</p>
          <h2 id="how-it-works-title" className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Så använder du Foldit</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Från mått till slickepott.</p>
        </div>
        <ol className="grid gap-8 md:grid-cols-3 md:gap-5 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="min-w-0">
              <div className="relative flex aspect-[3/4] min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-lg bg-destructive px-5 pb-20 pt-16 text-center text-destructive-foreground">
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-obsidian text-xs font-medium text-obsidian-foreground" aria-label={`Steg ${index + 1}`}>{String(index + 1).padStart(2, "0")}</span>
                <p className="text-[11px] font-semibold uppercase">Lägg in bild · 3:4</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed">{step.image}</p>
                <h3 className="absolute bottom-5 left-5 font-sans text-2xl font-semibold uppercase">{step.title}</h3>
              </div>
              <p className="mx-auto mt-4 max-w-xs text-center text-sm leading-relaxed text-foreground">{step.caption}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}