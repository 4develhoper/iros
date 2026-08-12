/**
 * Métadonnées globales de l'application.
 *
 * Point d'entrée unique à modifier au démarrage d'un nouveau projet :
 * le nom, la description et l'URL sont consommés par le layout racine,
 * les métadonnées SEO et les composants de marque.
 */
export const siteConfig = {
  name: "Boilerplate",
  /** Nom affiché dans le logo, avec le point final de la marque. */
  shortName: "Boilerplate.",
  description:
    "Boilerplate Next.js prêt à l'emploi : architecture par features, Better Auth, Drizzle et Tailwind.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "fr-FR",
  author: "Votre nom",
  /**
   * Année affichée dans les mentions de copyright.
   *
   * Valeur figée volontairement : sous `cacheComponents`, appeler `new Date()`
   * pendant le rendu rendrait toute la page dynamique.
   */
  copyrightYear: 2026,
} as const;

export type TSiteConfig = typeof siteConfig;
