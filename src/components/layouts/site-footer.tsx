import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site.config";

/**
 * Pied de page du site public.
 *
 * L'année provient de `siteConfig` et non de `new Date()` : sous
 * `cacheComponents`, lire l'heure courante rendrait la page dynamique et
 * exigerait une frontière `<Suspense>` pour un gain nul.
 */
export const SiteFooter = () => (
  <footer className="border-t border-border bg-vanilla">
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
      <Logo />
      <p className="text-sm text-muted">
        © {siteConfig.copyrightYear} {siteConfig.name}. Tous droits réservés.
      </p>
    </div>
  </footer>
);
