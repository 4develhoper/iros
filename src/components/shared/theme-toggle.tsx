"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";
import { IconButton } from "@/components/ui/icon-button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Bascule entre le thème clair et le thème sombre.
 *
 * Le thème résolu n'est connu qu'une fois le composant monté dans le
 * navigateur : afficher une icône avant cela produirait une divergence
 * d'hydratation. Un gabarit neutre est donc rendu jusqu'au montage.
 */
export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <Skeleton className="size-9 rounded-field" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      icon={isDark ? <Sun /> : <Moon />}
      label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
};
