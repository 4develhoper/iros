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

/** Compatibilité des plateformes avec une base SQLite locale. */
const TARGET_ROWS = [
  ["VPS, Docker avec volume, Fly.io", "Fonctionne tel quel"],
  [
    "Vercel, Netlify",
    "Système de fichiers éphémère : remplacer la couche base par Turso, Neon ou Postgres",
  ],
] as const;

const DEPLOY_COMMANDS = `bun install --production=false
bun run db:migrate
bun run build
bun run start`;

/** Mise en production et migration vers une autre base. */
export const DeploymentSection = () => (
  <DocSection
    id="deploiement"
    title="Déploiement"
    description="La base est un fichier local : le choix de la plateforme en dépend directement."
  >
    <DocTable columns={["Cible", "Verdict"]} rows={TARGET_ROWS} />

    <DocNote variant="danger" title="Conteneurs éphémères = base perdue">
      Sur Vercel ou Netlify, le système de fichiers est reconstruit à chaque
      déploiement : <DocCode>data/app.db</DocCode> disparaîtrait avec toutes les
      données. Migrer vers une base distante avant d'y déployer.
    </DocNote>

    <DocSubtitle>VPS ou Docker</DocSubtitle>

    <CodeBlock title="Terminal" code={DEPLOY_COMMANDS} />

    <DocParagraph>
      <DocCode>serverExternalPackages: [&quot;better-sqlite3&quot;]</DocCode>{" "}
      (dans <DocCode>next.config.ts</DocCode>) empêche le bundler d'embarquer le
      binaire natif : il doit rester dans le <DocCode>node_modules</DocCode> du
      serveur. Monter <DocCode>data/</DocCode> sur un volume persistant et le
      sauvegarder — c'est l'intégralité de la base.
    </DocParagraph>

    <DocSubtitle>Migrer vers Postgres</DocSubtitle>

    <DocList
      isOrdered
      items={[
        <>
          <DocCode>drizzle.config.ts</DocCode> :{" "}
          <DocCode>dialect: &quot;postgresql&quot;</DocCode>.
        </>,
        <>
          <DocCode>src/lib/drizzle/index.ts</DocCode> : remplacer{" "}
          <DocCode>better-sqlite3</DocCode> par <DocCode>postgres-js</DocCode>.
        </>,
        <>
          <DocCode>src/lib/drizzle/schemas/*</DocCode> :{" "}
          <DocCode>sqliteTable</DocCode> → <DocCode>pgTable</DocCode>, ajuster
          les types de colonnes.
        </>,
        <>
          <DocCode>src/lib/better-auth/</DocCode> : adapter le{" "}
          <DocCode>drizzleAdapter</DocCode> au provider <DocCode>pg</DocCode>.
        </>,
        <>Regénérer les migrations depuis zéro.</>,
      ]}
    />
  </DocSection>
);
