import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { routes } from "@/config/routes.config";
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

      <nav aria-label="Liens de bas de page" className="flex gap-6">
        <Link
          href={routes.public.docs}
          className="text-sm text-ink-600 transition-colors hover:text-ink-900"
        >
          Documentation
        </Link>
      </nav>

      <p className="text-sm text-muted">
        © {siteConfig.copyrightYear} {siteConfig.name}. Tous droits réservés.
      </p>
    </div>
  </footer>
);
