import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { routes } from "@/config/routes.config";
import {
  UserMenu,
  UserMenuSkeleton,
} from "@/features/auth/components/user-menu";

/** Liens de navigation de la partie publique du site. */
const NAVIGATION_LINKS = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Stack", href: "#stack" },
  { label: "Documentation", href: routes.public.docs },
  { label: "Démarrer", href: routes.app.starter },
] as const;

/**
 * En-tête du site public.
 *
 * Le bloc utilisateur dépend de la session : il est isolé dans un `<Suspense>`
 * pour que le reste de l'en-tête reste prérendu statiquement.
 */
export const SiteHeader = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
    <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-6 px-6">
      <Logo />

      <nav aria-label="Navigation principale" className="hidden gap-8 md:flex">
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-ink-600 transition-colors hover:text-ink-900"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Suspense fallback={<UserMenuSkeleton />}>
          <UserMenu />
        </Suspense>
      </div>
    </div>
  </header>
);
