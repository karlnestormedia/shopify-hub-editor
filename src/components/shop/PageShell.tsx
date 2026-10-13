import type { ReactNode } from "react";
import { SiteHeader } from "@/components/shop/SiteHeader";
import { SiteFooter } from "@/components/shop/SiteFooter";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
