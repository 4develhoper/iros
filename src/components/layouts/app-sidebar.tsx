"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Grid, Home, Settings, X } from "react-feather";
import { Logo } from "@/components/shared/logo";
import { IconButton } from "@/components/ui/icon-button";
import { routes } from "@/config/routes.config";
import { cn } from "@/lib/utils/cn";
import { useUiStore } from "@/stores/ui.store";

/** Entrée de navigation de l'espace applicatif. */
type TNavigationItem = {
  label: string;
  href: Route;
  icon: ReactNode;
};

const NAVIGATION_ITEMS: readonly TNavigationItem[] = [
  { label: "Accueil", href: routes.public.landing, icon: <Home /> },
  { label: "Starter", href: routes.app.starter, icon: <Grid /> },
] as const;

/** Rendu d'un lien de navigation, avec état actif. */
const NavigationLink = ({
  item,
  isActive,
  onNavigate,
}: {
  item: TNavigationItem;
  isActive: boolean;
  onNavigate: () => void;
}) => (
  <Link
    href={item.href}
    onClick={onNavigate}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "flex items-center gap-3 rounded-field px-3.5 py-2.5 text-sm transition-colors [&_svg]:size-4.5",
      isActive
        ? "bg-primary-50 font-medium text-primary-700"
        : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
    )}
  >
    {item.icon}
    {item.label}
  </Link>
);

/**
 * Barre latérale de l'espace applicatif.
 *
 * Composant client : il lit l'URL courante pour surligner l'entrée active et
 * s'appuie sur `useUiStore` pour l'ouverture du tiroir mobile.
 */
export const AppSidebar = () => {
  const pathname = usePathname();
  const isMobileNavOpen = useUiStore((state) => state.isMobileNavOpen);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  const content = (
    <>
      <div className="flex shrink-0 items-center justify-between px-2 py-1">
        <Logo />
        <IconButton
          icon={<X />}
          label="Fermer la navigation"
          size="sm"
          className="lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      </div>

      {/* Seule la liste de liens défile : l'en-tête et le pied restent visibles
          même si la navigation devient longue. */}
      <nav
        aria-label="Navigation de l'application"
        className="scrollbar-thin mt-8 min-h-0 flex-1 space-y-1 overflow-y-auto"
      >
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationLink
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            onNavigate={() => setMobileNavOpen(false)}
          />
        ))}
      </nav>

      <div className="mt-4 flex shrink-0 items-center gap-3 rounded-field bg-vanilla px-3.5 py-3 text-xs text-ink-600">
        <Settings className="size-4 shrink-0" />
        Personnalisez cette navigation dans <code>app-sidebar.tsx</code>.
      </div>
    </>
  );

  return (
    <>
      {/* Barre fixe sur grand écran. */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background p-4 lg:flex">
        {content}
      </aside>

      {/* Tiroir superposé sur mobile. */}
      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            aria-label="Fermer la navigation"
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <aside className="relative flex w-72 max-w-[85%] flex-col bg-background p-4 shadow-xl">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
};
