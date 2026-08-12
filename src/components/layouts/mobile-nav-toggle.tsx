"use client";

import { Menu } from "react-feather";
import { IconButton } from "@/components/ui/icon-button";
import { useUiStore } from "@/stores/ui.store";

/**
 * Bouton d'ouverture du tiroir de navigation sur mobile.
 *
 * Isolé dans son propre fichier pour que la barre supérieure puisse rester un
 * composant serveur.
 */
export const MobileNavToggle = () => {
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);

  return (
    <IconButton
      icon={<Menu />}
      label="Ouvrir la navigation"
      size="sm"
      className="lg:hidden"
      onClick={() => setMobileNavOpen(true)}
    />
  );
};
