import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatPrice, withChannel } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function SiteHeader() {
  const { cart, loading, open, setOpen, updateQuantity, removeItem, sync } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    sync();
  }, [sync]);

  const count = mounted ? (cart?.totalQuantity ?? 0) : 0;

  const checkout = () => {
    if (!cart) return;
    window.open(withChannel(cart.checkoutUrl), "_blank");
  };

  const run = async (fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Något gick fel");
    }
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-obsidian py-2 text-center text-xs tracking-wide text-obsidian-foreground">
        Foldit är under produktion - Förbeställning öppnar snart!
      </div>
      <div className="border-b border-border bg-nude text-nude-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-3xl font-semibold tracking-tight text-primary">
          Foldit
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Öppna varukorg">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-full flex-col sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="font-display">Varukorg</SheetTitle>
            </SheetHeader>
            {!cart || cart.lines.length === 0 ? (
              <p className="mt-10 text-center text-muted-foreground">Din varukorg är tom.</p>
            ) : (
              <>
                <div className="mt-4 flex-1 space-y-4 overflow-y-auto">
                  {cart.lines.map((line) => (
                    <div key={line.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                      {line.imageUrl && (
                        <img src={line.imageUrl} alt={line.productTitle} className="h-20 w-20 rounded-md object-cover" />
                      )}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-sm font-medium leading-tight">{line.productTitle}</p>
                          {line.variantTitle !== "Default Title" && (
                            <p className="text-xs text-muted-foreground">{line.variantTitle}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Button size="icon" variant="outline" className="h-7 w-7" disabled={loading}
                              aria-label="Minska antal" onClick={() => run(() => updateQuantity(line.id, line.quantity - 1))}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{line.quantity}</span>
                            <Button size="icon" variant="outline" className="h-7 w-7" disabled={loading}
                              aria-label="Öka antal" onClick={() => run(() => updateQuantity(line.id, line.quantity + 1))}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="text-sm font-medium">
                            {formatPrice(Number(line.price.amount) * line.quantity, line.price.currencyCode)}
                          </span>
                          <Button size="icon" variant="ghost" className="h-7 w-7" aria-label="Ta bort"
                            onClick={() => run(() => removeItem(line.id))}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Totalt</span>
                    <span>{formatPrice(cart.total.amount, cart.total.currencyCode)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Frakt och betalning väljer du i kassan.</p>
                  <Button className="w-full" size="lg" onClick={checkout} disabled={loading}>
                    Gå till kassan
                  </Button>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
      </div>
    </header>
  );
}
