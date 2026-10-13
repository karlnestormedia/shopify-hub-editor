import { Link } from "@tanstack/react-router";
import { Lock, Truck, RotateCcw } from "lucide-react";

const PRODUCT_HANDLE = "foldit-3-i-1-mattsats";

export function SiteFooter() {
  const linkCls = "text-obsidian-foreground/70 transition-colors hover:text-obsidian-foreground";
  return (
    <footer className="bg-obsidian text-obsidian-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight">Foldit</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-obsidian-foreground/70">
            Mått och slickepott i ett. Utvecklad av Foldit UF.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em]">Butik</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/product/$handle" params={{ handle: PRODUCT_HANDLE }} className={linkCls}>Måttsatsen</Link></li>
            <li><Link to="/guide" className={linkCls}>Guide</Link></li>
            <li><Link to="/om-oss" className={linkCls}>Om oss</Link></li>
            <li><Link to="/kontakt" className={linkCls}>Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em]">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm text-obsidian-foreground/70">
            <li>hej@foldit.se</li>
            <li>Instagram: @foldit.uf</li>
            <li>Vi svarar inom 24 timmar</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em]">Handla tryggt</p>
          <ul className="mt-4 space-y-2 text-sm text-obsidian-foreground/70">
            <li className="flex items-center gap-2"><Lock className="h-4 w-4" />Säker betalning via Shopify</li>
            <li className="flex items-center gap-2"><Truck className="h-4 w-4" />1-3 dagars leveranstid</li>
            <li className="flex items-center gap-2"><RotateCcw className="h-4 w-4" />14 dagars öppet köp</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-obsidian-foreground/15">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-obsidian-foreground/60 lg:px-8">
          © {new Date().getFullYear()} Foldit UF · Ett UF-företag inom Ung Företagsamhet
        </p>
      </div>
    </footer>
  );
}
