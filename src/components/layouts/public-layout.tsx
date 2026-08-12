import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export type TPublicLayoutProps = {
  children: ReactNode;
};

/**
 * Gabarit des pages publiques : en-tête, contenu, pied de page.
 *
 * Consommé par `src/app/(public)/layout.tsx`.
 */
export const PublicLayout = ({ children }: TPublicLayoutProps) => (
  <div className="flex min-h-dvh flex-col">
    <SiteHeader />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
);
