import { useEffect, useRef, useState } from "react";
import { CreditCard, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { formatDeliveryWindow, parseProductTitle, productImagePlans } from "@/lib/product-presentation";
import { useCartStore } from "@/stores/cartStore";
import { StickyBuyBar } from "@/components/shop/StickyBuyBar";

export function PurchasePresentation({ product, isLoading = false, heading = "h2" }: {
  product?: ShopifyProduct["node"] | null | undefined;
  isLoading?: boolean;
  heading?: "h1" | "h2";
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const swipeStart = useRef<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const loading = useCartStore((s) => s.loading);
  const variant = product?.variants.edges[variantIndex]?.node;
  const visibleImageIndex = isPreviewing && imageIndex === 0 ? 1 : imageIndex;
  const imagePlan = productImagePlans[visibleImageIndex] ?? productImagePlans[0];
  const Heading = heading;
  const { name, preorder } = parseProductTitle(product?.title);

  async function add() {
    if (!variant) return;
    try {
      await addItem(variant.id, 1);
      toast.success("Lagd i varukorgen");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Kunde inte lägga till");
    }
  }

  function stepImage(direction: number) {
    setImageIndex((visibleImageIndex + direction + productImagePlans.length) % productImagePlans.length);
    setIsPreviewing(false);
  }

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-label={`Köp ${name}`} className="mx-auto max-w-6xl px-5 py-8 sm:py-10 lg:px-8">
      <StickyBuyBar visible={showSticky} price={variant ? formatPrice(variant.price.amount, variant.price.currencyCode) : undefined} disabled={loading || !variant} loading={loading} onAdd={add} name={name} preorder={preorder} />
      <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-10">
        <div className="flex min-w-0 flex-col gap-3" data-testid="purchase-gallery">
          <div className="relative flex aspect-[4/5] touch-pan-y select-none flex-col justify-center bg-destructive p-6 text-center text-destructive-foreground md:aspect-auto md:min-h-[460px] md:flex-1" aria-live="polite"
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setIsPreviewing(true); }}
            onPointerLeave={() => setIsPreviewing(false)}
            onPointerDown={(event) => { if (event.pointerType !== "mouse") swipeStart.current = event.clientX; }}
            onPointerUp={(event) => {
              const start = swipeStart.current;
              swipeStart.current = null;
              if (start === null) return;
              const dx = event.clientX - start;
              if (Math.abs(dx) > 40) stepImage(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => { swipeStart.current = null; }}>
            <span className="absolute left-5 top-5 text-xs">Produktbild {visibleImageIndex + 1} / {productImagePlans.length}</span>
            <div className="mx-auto max-w-sm">
              <p className="text-xs font-medium uppercase">Lägg in produktbild</p>
              <p className="mt-3 font-display text-4xl font-semibold">{imagePlan.title}</p>
              <p className="mt-4 text-sm leading-relaxed">{imagePlan.instruction}</p>
            </div>
            {visibleImageIndex === 4 && (
              <div className="mt-8 grid grid-cols-3 divide-x divide-destructive-foreground/40 border-y border-destructive-foreground/40 py-5 text-sm font-semibold">
                <span>1 tsk<br /><span className="text-xs font-normal">(tsp)</span></span>
                <span>1 msk</span>
                <span>½ dl</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <Button variant="ghost" size="icon" className="text-destructive-foreground hover:bg-destructive-foreground/15 hover:text-destructive-foreground" onClick={() => stepImage(-1)} aria-label="Föregående produktbild"><ChevronLeft /></Button>
              <Button variant="ghost" size="icon" className="text-destructive-foreground hover:bg-destructive-foreground/15 hover:text-destructive-foreground" onClick={() => stepImage(1)} aria-label="Nästa produktbild"><ChevronRight /></Button>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col" data-testid="purchase-details">
          {preorder && <span className="mb-3 self-start border border-obsidian px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]">Förbeställning</span>}
          <Heading className="text-4xl font-semibold leading-tight lg:text-5xl">{name}</Heading>
          {variant && <p className="mt-3 text-xl font-medium">{formatPrice(variant.price.amount, variant.price.currencyCode)}</p>}
          {isLoading && <p className="mt-3 text-sm text-muted-foreground">Laddar…</p>}
          <p className="mt-5 text-sm leading-relaxed"><strong className="font-medium">Mått och slickepott i ett.</strong><br />Designad för att sirap, honung och klibbig smet aldrig ska fastna i måttet.</p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li><strong className="font-medium text-foreground">3 mått i samma verktyg:</strong> ½ dl, 1 msk och 1 tsk.</li>
            <li><strong className="font-medium text-foreground">Vik & skrapa:</strong> Inga rester lämnas kvar i måttsatsen.</li>
            <li><strong className="font-medium text-foreground">Tar ingen plats:</strong> Förvaras helt platt i kökslådan.</li>
          </ul>
          {(product?.variants.edges.length ?? 0) > 1 && <div className="mt-4 flex flex-wrap gap-2">{product?.variants.edges.map(({ node }, index) => <Button key={node.id} size="sm" variant={index === variantIndex ? "default" : "outline"} onClick={() => setVariantIndex(index)}>{node.title}</Button>)}</div>}
          <Button size="lg" className="mt-5 h-12 w-full rounded-none bg-obsidian text-xs uppercase text-obsidian-foreground hover:bg-obsidian/90" disabled={loading || !variant} onClick={add}>{loading ? "Lägger till…" : "Lägg i varukorg"}</Button>
          <div className="mt-4 grid grid-cols-3 gap-2 border-b border-border pb-4 text-center text-[11px] leading-relaxed text-muted-foreground">
            <div className="flex flex-col items-center gap-2"><CreditCard className="h-5 w-5 text-foreground" strokeWidth={1.5} aria-hidden="true" /><span>Säker betalning</span></div>
            <div className="flex flex-col items-center gap-2"><Truck className="h-5 w-5 text-foreground" strokeWidth={1.5} aria-hidden="true" /><span>{formatDeliveryWindow()}</span></div>
            <div className="flex flex-col items-center gap-2"><RotateCcw className="h-5 w-5 text-foreground" strokeWidth={1.5} aria-hidden="true" /><span>14 dagars<br />öppet köp</span></div>
          </div>
          <Accordion type="single" collapsible className="mt-auto pt-2">
            <AccordionItem value="measures"><AccordionTrigger className="py-3">Specifikationer & mått</AccordionTrigger><AccordionContent>Tre mått i ett verktyg: 1 tsk, 1 msk och ½ dl. Viks ut helt platt för förvaring.</AccordionContent></AccordionItem>
            <AccordionItem value="delivery"><AccordionTrigger className="py-3">Frakt & leverans</AccordionTrigger><AccordionContent>{formatDeliveryWindow()}. Fraktalternativ och kostnad visas i kassan.</AccordionContent></AccordionItem>
            <AccordionItem value="care"><AccordionTrigger className="py-3">Skötsel & rengöring</AccordionTrigger><AccordionContent>Vik ut måttet och skölj av under rinnande vatten eller diska i diskmaskinen. Låt torka innan det läggs i kökslådan.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}