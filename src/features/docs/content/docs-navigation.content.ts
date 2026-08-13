import type { TDocsNavGroup } from "@/features/docs/types/docs.types";

/**
 * Sommaire de la page de documentation.
 *
 * Chaque `id` doit correspondre à l'`id` d'une `<DocSection>` de
 * `src/app/(public)/docs/page.tsx` : c'est ce lien qui alimente à la fois les
 * ancres et la mise en évidence de la section courante.
 */
export const DOCS_NAVIGATION: readonly TDocsNavGroup[] = [
  {
    title: "Prise en main",
    items: [
      { id: "overview", label: "Vue d'ensemble" },
      { id: "prerequis", label: "Prérequis" },
      { id: "installation", label: "Installation" },
      { id: "environnement", label: "Variables d'environnement" },
      { id: "base-de-donnees", label: "Base de données" },
      { id: "demarrage", label: "Démarrage & scripts" },
    ],
  },
  {
    title: "Architecture",
    items: [
      { id: "structure", label: "Structure du projet" },
      { id: "conventions", label: "Conventions de code" },
      { id: "formulaires", label: "Formulaires & actions" },
      { id: "securite", label: "Authentification & sécurité" },
      { id: "theme", label: "Thème & design system" },
    ],
  },
  {
    title: "Aller plus loin",
    items: [
      { id: "personnalisation", label: "Personnaliser le projet" },
      { id: "feature", label: "Ajouter une feature" },
      { id: "deploiement", label: "Déploiement" },
      { id: "depannage", label: "Dépannage" },
    ],
  },
] as const;

/**
 * Identifiants de toutes les sections, à plat et dans l'ordre de la page.
 *
 * Consommé par le sommaire interactif pour observer les sections.
 */
export const DOCS_SECTION_IDS: readonly string[] = DOCS_NAVIGATION.flatMap(
  (group) => group.items.map((item) => item.id),
);
