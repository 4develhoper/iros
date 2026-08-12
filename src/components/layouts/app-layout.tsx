import { type ReactNode, Suspense } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  UserMenu,
  UserMenuSkeleton,
} from "@/features/auth/components/user-menu";
import { AppSidebar } from "./app-sidebar";
import { MobileNavToggle } from "./mobile-nav-toggle";

export type TAppLayoutProps = {
  children: ReactNode;
};

/**
 * Gabarit des écrans protégés : barre latérale, barre supérieure, contenu.
 *
 * La coquille occupe exactement la hauteur du viewport (`h-dvh` +
 * `overflow-hidden`) : la barre latérale et l'en-tête restent donc fixes, et
 * seule la zone de contenu défile. Les conteneurs intermédiaires portent
 * `min-h-0` / `min-w-0`, sans quoi un enfant flex refuserait de rétrécir sous
 * sa taille intrinsèque et le défilement remonterait à la page entière.
 *
 * Le bloc utilisateur lit la session : il est encapsulé dans `<Suspense>` afin
 * que le reste de la coquille reste prérendu sous `cacheComponents`.
 */
export const AppLayout = ({ children }: TAppLayoutProps) => (
  <div className="flex h-dvh overflow-hidden bg-vanilla-50">
    <AppSidebar />

    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex h-18 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6">
        <MobileNavToggle />

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <Suspense fallback={<UserMenuSkeleton />}>
            <UserMenu />
          </Suspense>
        </div>
      </header>

      <main className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          {children}
        </div>
      </main>
    </div>
  </div>
);
