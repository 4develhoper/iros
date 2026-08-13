import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocList,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Suffixe de fichier attendu selon le rôle. */
const NAMING_ROWS = [
  ["Schéma Zod", <DocCode key="s">auth.schema.ts</DocCode>],
  ["Server Action", <DocCode key="a">task.action.ts</DocCode>],
  ["Accès aux données", <DocCode key="d">session.dal.ts</DocCode>],
  ["Store Zustand", <DocCode key="st">ui.store.ts</DocCode>],
  ["Types du domaine", <DocCode key="t">task.types.ts</DocCode>],
] as const;

const EXAMPLE = `/**
 * Carte résumant une tâche.
 *
 * @example
 * <TaskCard task={task} />
 */
export const TaskCard = ({ task }: TTaskCardProps) => (
  <Card>…</Card>
);`;

/** Conventions de nommage et de rédaction du code. */
export const ConventionsSection = () => (
  <DocSection
    id="conventions"
    title="Conventions de code"
    description="Elles sont peu nombreuses mais s'appliquent sans exception : c'est ce qui rend le code prévisible d'une feature à l'autre."
  >
    <DocList
      items={[
        <>
          <strong>Fonctions fléchées partout</strong>, y compris pour les
          composants et les pages.
        </>,
        <>
          <strong>Noms de fichiers en kebab-case</strong>, suffixés par leur
          rôle.
        </>,
        <>
          <strong>
            Types préfixés <DocCode>T</DocCode>
          </strong>{" "}
          et en PascalCase : <DocCode>TButtonProps</DocCode>,{" "}
          <DocCode>TAuthSession</DocCode>.
        </>,
        <>
          <strong>JSDoc en français</strong> sur chaque export public, avec un{" "}
          <DocCode>@example</DocCode> quand l'usage n'est pas évident.
        </>,
        <>
          <strong>Imports absolus</strong> via l'alias <DocCode>@/</DocCode>.
        </>,
        <>
          <strong>
            <DocCode>page.tsx</DocCode> et <DocCode>layout.tsx</DocCode> en
            composants serveur
          </strong>{" "}
          ; <DocCode>&quot;use client&quot;</DocCode> est réservé aux îlots
          réellement interactifs.
        </>,
      ]}
    />

    <DocSubtitle>Suffixes de fichiers</DocSubtitle>

    <DocTable columns={["Rôle", "Nom de fichier"]} rows={NAMING_ROWS} />

    <DocSubtitle>Exemple</DocSubtitle>

    <CodeBlock title="task-card.tsx" code={EXAMPLE} />

    <DocSubtitle>cacheComponents</DocSubtitle>

    <DocNote
      variant="warning"
      title="Toute lecture dynamique passe par Suspense"
    >
      L'option est activée dans <DocCode>next.config.ts</DocCode> : lire{" "}
      <DocCode>cookies()</DocCode>, <DocCode>headers()</DocCode> ou la base de
      données rend le rendu dynamique et <strong>doit</strong> être encapsulé
      dans une frontière <DocCode>&lt;Suspense&gt;</DocCode> avec un{" "}
      <DocCode>fallback</DocCode>. Éviter également{" "}
      <DocCode>new Date()</DocCode> pendant le rendu : utiliser{" "}
      <DocCode>siteConfig.copyrightYear</DocCode> ou passer la valeur en props.
    </DocNote>

    <DocSubtitle>typedRoutes</DocSubtitle>

    <DocNote variant="info" title="Les href sont vérifiés à la compilation">
      Les routes sont centralisées dans{" "}
      <DocCode>src/config/routes.config.ts</DocCode>. Une route absente de ce
      catalogue provoque une erreur de typage sur{" "}
      <DocCode>&lt;Link href&gt;</DocCode> ou <DocCode>redirect()</DocCode>.
    </DocNote>
  </DocSection>
);
