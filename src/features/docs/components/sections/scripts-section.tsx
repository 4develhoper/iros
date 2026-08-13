import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocList,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Scripts déclarés dans `package.json`. */
const SCRIPT_ROWS = [
  [
    <DocCode key="dev">bun run dev</DocCode>,
    "Serveur de développement (Turbopack, port 3017)",
  ],
  [<DocCode key="build">bun run build</DocCode>, "Build de production"],
  [<DocCode key="start">bun run start</DocCode>, "Sert le build de production"],
  [
    <DocCode key="typecheck">bun run typecheck</DocCode>,
    "next typegen puis tsc --noEmit",
  ],
  [
    <DocCode key="lint">bun run lint</DocCode>,
    "Biome en lecture seule (lint + format)",
  ],
  [
    <DocCode key="format">bun run format</DocCode>,
    "Biome, écriture des corrections",
  ],
  [
    <DocCode key="generate">bun run db:generate</DocCode>,
    "Génère les migrations SQL depuis les schémas TypeScript",
  ],
  [
    <DocCode key="migrate">bun run db:migrate</DocCode>,
    "Applique les migrations en attente",
  ],
  [
    <DocCode key="push">bun run db:push</DocCode>,
    "Synchronise le schéma sans fichier de migration",
  ],
  [
    <DocCode key="studio">bun run db:studio</DocCode>,
    "Explorateur de base de données",
  ],
] as const;

const CHECKS = `bun run lint
bun run typecheck
bun run build`;

/** Lancement du serveur, parcours de vérification et catalogue des scripts. */
export const ScriptsSection = () => (
  <DocSection
    id="demarrage"
    title="Démarrage & scripts"
    description="Le serveur de développement écoute sur http://localhost:3017."
  >
    <CodeBlock title="Terminal" code="bun run dev" />

    <DocSubtitle>Vérifier que tout fonctionne</DocSubtitle>

    <DocList
      isOrdered
      items={[
        <>
          <DocCode>/</DocCode> — la landing publique s'affiche.
        </>,
        <>
          <DocCode>/register</DocCode> — créer un compte.
        </>,
        <>
          La redirection mène à <DocCode>/starter</DocCode>, l'espace protégé de
          démonstration.
        </>,
        <>
          Créer une tâche : le trajet formulaire → Server Action → DAL → SQLite
          est validé de bout en bout.
        </>,
      ]}
    />

    <DocSubtitle>Scripts disponibles</DocSubtitle>

    <DocTable columns={["Commande", "Rôle"]} rows={SCRIPT_ROWS} />

    <DocNote variant="warning" title="db:push est réservé au prototypage">
      Il écrase le schéma sans laisser de trace : à ne jamais utiliser sur une
      base contenant des données à conserver.
    </DocNote>

    <DocSubtitle>Avant chaque commit</DocSubtitle>

    <CodeBlock title="Terminal" code={CHECKS} />
  </DocSection>
);
