import { Button } from "@/components/ui/button";

export function StickyBuyBar({ visible, price, disabled, loading, onAdd }: {
  visible: boolean;
  price?: string | undefined;
  disabled: boolean;
  loading: boolean;
  onAdd: () => void;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 ${visible ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 lg:px-8">
        <div className="h-11 w-11 shrink-0 bg-destructive" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-semibold leading-tight">Foldit 3-i-1 måttsats</p>
          {price && <p className="text-xs text-muted-foreground">{price}</p>}
        </div>
        <Button
          tabIndex={visible ? 0 : -1}
          className="h-11 rounded-none bg-obsidian px-6 text-xs uppercase text-obsidian-foreground hover:bg-obsidian/90 sm:px-10"
          disabled={disabled}
          onClick={onAdd}
        >
          {loading ? "Lägger till…" : "Lägg i varukorg"}
        </Button>
      </div>
    </div>
  );
}
