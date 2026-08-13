import { CodeBlock } from "@/features/docs/components/code-block";
import {
  DocCode,
  DocList,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";

const SCHEMA_FILE = `// src/lib/drizzle/schemas/task.schema.ts
export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});`;

const ROUTE_FILE = `// src/config/routes.config.ts
export const routes = {
  app: {
    starter: "/starter",
    tasks: "/tasks",
  },
} as const;`;

/** Marche à suivre pour ajouter un domaine métier. */
export const FeatureSection = () => (
  <DocSection
    id="feature"
    title="Ajouter une feature"
    description="Quatre étapes, toujours les mêmes, de la table à la page."
  >
    <DocList
      isOrdered
      items={[
        <>
          Créer <DocCode>src/features/&lt;nom&gt;/</DocCode> avec{" "}
          <DocCode>schemas/</DocCode>, <DocCode>server/actions/</DocCode>,{" "}
          <DocCode>server/dal/</DocCode>, <DocCode>components/</DocCode>,{" "}
          <DocCode>types/</DocCode>.
        </>,
        <>
          Déclarer la table dans{" "}
          <DocCode>src/lib/drizzle/schemas/&lt;nom&gt;.schema.ts</DocCode> et
          l'exporter depuis <DocCode>schemas/index.ts</DocCode>.
        </>,
        <>
          Générer et appliquer la migration :{" "}
          <DocCode>bun run db:generate &amp;&amp; bun run db:migrate</DocCode>.
        </>,
        <>
          Ajouter la route dans <DocCode>routes.config.ts</DocCode>, puis la
          page dans <DocCode>src/app/</DocCode>.
        </>,
      ]}
    />

    <DocSubtitle>1. La table</DocSubtitle>

    <CodeBlock title="task.schema.ts" code={SCHEMA_FILE} />

    <DocParagraph>
      La colonne <DocCode>userId</DocCode> n'est pas optionnelle : c'est elle
      qui permet à la DAL de cloisonner les données par compte.
    </DocParagraph>

    <DocSubtitle>2. La route</DocSubtitle>

    <CodeBlock title="routes.config.ts" code={ROUTE_FILE} />

    <DocParagraph>
      Pour une route protégée, ajouter également son préfixe à{" "}
      <DocCode>protectedRoutePrefixes</DocCode>. La feature{" "}
      <DocCode>starter</DocCode> reste le modèle complet à recopier.
    </DocParagraph>
  </DocSection>
);
