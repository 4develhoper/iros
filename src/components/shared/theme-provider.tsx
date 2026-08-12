"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export type TThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * Fournisseur de thème clair / sombre.
 *
 * Monté dans le layout racine. `next-themes` injecte un script bloquant qui
 * applique la classe `dark` sur `<html>` **avant** la peinture : il n'y a donc
 * aucun flash de thème clair au chargement. C'est aussi la raison pour laquelle
 * `<html>` porte `suppressHydrationWarning` — le serveur ne peut pas connaître
 * la préférence du visiteur.
 *
 * @example
 * ```tsx
 * <ThemeProvider><App /></ThemeProvider>
 * ```
 */
export const ThemeProvider = ({ children, ...props }: TThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    {...props}
  >
    {children}
  </NextThemesProvider>
);
