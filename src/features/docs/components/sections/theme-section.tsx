import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocList,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Jetons sémantiques disponibles comme utilitaires Tailwind. */
const TOKEN_ROWS = [
  [<DocCode key="bg">bg-background</DocCode>, "Fond de page"],
  [<DocCode key="surface">bg-vanilla</DocCode>, "Surface secondaire, encarts"],
  [<DocCode key="fg">text-ink-900</DocCode>, "Texte principal"],
  [<DocCode key="muted">text-ink-600</DocCode>, "Texte secondaire"],
  [<DocCode key="border">border-border</DocCode>, "Filets et séparateurs"],
  [<DocCode key="primary">bg-primary</DocCode>, "Couleur de marque"],
  [
    <DocCode key="state">bg-danger/12 text-danger</DocCode>,
    "État : jeton sémantique en transparence",
  ],
] as const;

const THEME_BLOCK = `@theme {
  --color-primary-500: #1e56cd;   /* steam blue */
  --color-vanilla-100: #fdf8f2;   /* surfaces chaudes */
  --radius-card: 1rem;
}`;

/** Fonctionnement du thème clair/sombre et règles à respecter. */
export const ThemeSection = () => (
  <DocSection
    id="theme"
    title="Thème & design system"
    description="Le thème sombre est piloté par next-themes et ne redéfinit que des jetons CSS. Les composants n'écrivent donc aucune variante dark:."
  >
    <DocNote variant="info" title="L'échelle ink est inversée en thème sombre">
      Dans le bloc <DocCode>.dark</DocCode> de <DocCode>globals.css</DocCode>,{" "}
      <DocCode>ink-50</DocCode> devient la surface la plus sombre et{" "}
      <DocCode>ink-900</DocCode> le texte le plus clair. La hiérarchie visuelle
      est conservée : <DocCode>text-ink-700</DocCode> reste « texte secondaire »
      dans les deux thèmes.
    </DocNote>

    <DocSubtitle>Jetons courants</DocSubtitle>

    <DocTable columns={["Utilitaire", "Usage"]} rows={TOKEN_ROWS} />

    <DocSubtitle>Trois précautions</DocSubtitle>

    <DocList
      items={[
        <>
          <strong>Ne jamais figer une couleur de la palette Tailwind</strong> (
          <DocCode>bg-red-50</DocCode>, <DocCode>text-emerald-700</DocCode>)
          pour un état : utiliser les jetons sémantiques en transparence, comme{" "}
          <DocCode>bg-danger/12 text-danger</DocCode>.
        </>,
        <>
          <strong>Les voiles et surimpressions</strong> utilisent{" "}
          <DocCode>bg-black/50</DocCode>, jamais{" "}
          <DocCode>bg-ink-900/40</DocCode> — <DocCode>ink-900</DocCode> devient
          clair en thème sombre.
        </>,
        <>
          <strong>
            Une surface volontairement blanche dans les deux thèmes
          </strong>{" "}
          doit figer ses couleurs de texte sur une palette qui ne s'inverse pas
          (<DocCode>slate</DocCode>). Voir <DocCode>auth-showcase.tsx</DocCode>.
        </>,
      ]}
    />

    <DocSubtitle>Changer les couleurs</DocSubtitle>

    <CodeBlock title="src/app/globals.css" code={THEME_BLOCK} />

    <DocParagraph>
      Tailwind 4 génère automatiquement les utilitaires correspondants (
      <DocCode>bg-primary</DocCode>, <DocCode>text-vanilla-500</DocCode>,{" "}
      <DocCode>rounded-card</DocCode>) : il n'y a aucune configuration
      JavaScript à maintenir.
    </DocParagraph>

    <DocSubtitle>Coquille applicative</DocSubtitle>

    <DocParagraph>
      <DocCode>AppLayout</DocCode> occupe exactement la hauteur du viewport (
      <DocCode>h-dvh</DocCode> + <DocCode>overflow-hidden</DocCode>) : seule la
      zone de contenu défile. Les conteneurs flex intermédiaires portent{" "}
      <DocCode>min-h-0</DocCode> / <DocCode>min-w-0</DocCode> — sans quoi un
      enfant refuserait de rétrécir sous sa taille intrinsèque et le défilement
      remonterait à la page entière.
    </DocParagraph>
  </DocSection>
);
