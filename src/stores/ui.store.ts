import { create } from "zustand";
import { persist } from "zustand/middleware";

/** État de l'interface partagé entre les écrans applicatifs. */
export type TUiStore = {
  /** Barre latérale déployée sur les grands écrans. */
  isSidebarOpen: boolean;
  /** Tiroir de navigation ouvert sur mobile. */
  isMobileNavOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setMobileNavOpen: (isOpen: boolean) => void;
};

/**
 * Store Zustand dédié à l'état d'interface non persisté côté serveur.
 *
 * Seule la préférence de barre latérale est conservée dans le `localStorage` :
 * l'état du tiroir mobile doit repartir fermé à chaque visite.
 *
 * @example
 * ```tsx
 * const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
 * const toggleSidebar = useUiStore((state) => state.toggleSidebar);
 * ```
 */
export const useUiStore = create<TUiStore>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      isMobileNavOpen: false,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
    }),
    {
      name: "ui-store",
      partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
    },
  ),
);
