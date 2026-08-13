import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";

const MIGRATE_COMMANDS = `mkdir -p data          # PowerShell : New-Item -ItemType Directory -Force data
bun run db:migrate     # applique les migrations vers ./data/app.db`;

const RESET_COMMANDS = `rm -rf data && mkdir -p data && bun run db:migrate`;

/** Création de la base SQLite et application des migrations. */
export const DatabaseSection = () => (
  <DocSection
    id="base-de-donnees"
    title="Base de données"
    description="SQLite via better-sqlite3 : la base est un simple fichier, versionné par les migrations générées depuis les schémas TypeScript."
  >
    <DocNote variant="danger" title="Le dossier data/ n'est jamais versionné">
      <DocCode>create-iros-app</DocCode> l'a créé et a appliqué les migrations :
      la base est prête. Ailleurs — clone manuel,{" "}
      <DocCode>--no-install</DocCode>, remise à zéro — il faut le recréer, car{" "}
      <DocCode>better-sqlite3</DocCode> ne crée pas les dossiers manquants et la
      migration échoue sur <DocCode>SQLITE_CANTOPEN</DocCode>.
    </DocNote>

    <CodeBlock title="Terminal" code={MIGRATE_COMMANDS} />

    <DocParagraph>
      La migration initiale crée les tables d'authentification (
      <DocCode>user</DocCode>, <DocCode>session</DocCode>,{" "}
      <DocCode>account</DocCode>, <DocCode>verification</DocCode>) ainsi que
      celle de la feature <DocCode>starter</DocCode>.
    </DocParagraph>

    <DocSubtitle>Modifier un schéma</DocSubtitle>

    <DocParagraph>
      Après toute modification d'un fichier de{" "}
      <DocCode>src/lib/drizzle/schemas/</DocCode>, régénérer puis appliquer :
    </DocParagraph>

    <CodeBlock
      title="Terminal"
      code="bun run db:generate && bun run db:migrate"
    />

    <DocSubtitle>Repartir de zéro</DocSubtitle>

    <CodeBlock title="Terminal" code={RESET_COMMANDS} />

    <DocParagraph>
      Les cookies de session du navigateur survivent à cette remise à zéro. Le
      cas est prévu : <DocCode>requireUser()</DocCode> redirige vers{" "}
      <DocCode>/login?session_expired=1</DocCode> et <DocCode>proxy.ts</DocCode>{" "}
      purge le cookie fantôme — aucune boucle de redirection.
    </DocParagraph>
  </DocSection>
);
