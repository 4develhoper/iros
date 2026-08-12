import type { ReactNode } from "react";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site.config";
import { AuthShowcase } from "@/features/auth/components/auth-showcase";

export type TAuthLayoutProps = {
  /** Formulaire affiché dans la colonne de droite. */
  children: ReactNode;
  /** Accroche du panneau de marque. */
  showcaseTitle: string;
  /** Paragraphe du panneau de marque. */
  showcaseDescription: string;
};

/**
 * Gabarit en deux colonnes des écrans d'authentification.
 *
 * À gauche, le panneau de marque (masqué sous `lg`) ; à droite, le formulaire
 * centré et son pied de page légal.
 */
export const AuthLayout = ({
  children,
  showcaseTitle,
  showcaseDescription,
}: TAuthLayoutProps) => (
  <div className="grid min-h-dvh gap-6 bg-background p-4 lg:grid-cols-2 lg:p-6">
    <AuthShowcase title={showcaseTitle} description={showcaseDescription} />

    <div className="flex flex-col">
      {/* Logo de repli : le panneau de marque disparaît sur mobile. */}
      <div className="flex justify-center py-6 lg:hidden">
        <Logo />
      </div>

      <main className="flex flex-1 items-center justify-center px-2 py-6 sm:px-8">
        {children}
      </main>

      <footer className="flex flex-col items-center justify-between gap-2 px-2 py-4 text-xs text-muted sm:flex-row sm:px-8">
        <span>Politique de confidentialité</span>
        <span>
          © {siteConfig.copyrightYear} {siteConfig.name}
        </span>
      </footer>
    </div>
  </div>
);
