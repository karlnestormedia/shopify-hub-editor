import type { ReactNode } from "react";
import { SiteHeader } from "@/components/shop/SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © Foldit UF · Betalning och frakt hanteras säkert i Shopifys kassa
      </footer>
    </div>
  );
}
