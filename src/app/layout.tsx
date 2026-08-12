import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { ToastProvider } from "@/components/shared/toast-provider";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

/**
 * Police unique du projet : Poppins en graisse 400.
 *
 * Exposée en variable CSS et consommée par `--font-sans` dans `globals.css`.
 */
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f16" },
  ],
};

/**
 * Layout racine.
 *
 * Il ne rend rien de dynamique : les portions dépendant de la session sont
 * isolées plus bas dans l'arbre, derrière des frontières `<Suspense>`.
 *
 * `suppressHydrationWarning` est requis par `next-themes` : la classe de thème
 * est posée sur `<html>` par un script avant l'hydratation, le serveur ne
 * pouvant pas deviner la préférence du visiteur.
 */
const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="fr"
    className={`${poppins.variable} h-full`}
    suppressHydrationWarning
  >
    <body className="min-h-full antialiased">
      <ThemeProvider>
        {children}
        <ToastProvider />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
