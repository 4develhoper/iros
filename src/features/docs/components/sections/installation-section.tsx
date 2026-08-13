import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocList,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";

const CREATE_COMMANDS = `bun  create iros-app mon-projet
npm  create iros-app@latest mon-projet
pnpm create iros-app mon-projet`;

const QUICK_START = `bun create iros-app mon-projet   # nom affiché, description
cd mon-projet
bun run dev                      # http://localhost:3017`;

/** Génération du projet avec create-iros-app et parcours de démarrage. */
export const InstallationSection = () => (
  <DocSection
    id="installation"
    title="Installation"
    description="Le boilerplate ne se clone pas : create-iros-app le télécharge, le personnalise et l'installe."
  >
    <CodeBlock title="Terminal" code={CREATE_COMMANDS} />

    <DocParagraph>
      La CLI demande le nom du projet, le nom affiché et une description, puis
      fait tout le reste : <DocCode>package.json</DocCode>,{" "}
      <DocCode>src/config/site.config.ts</DocCode>, un <DocCode>.env</DocCode>{" "}
      avec un <DocCode>BETTER_AUTH_SECRET</DocCode> généré, le dossier{" "}
      <DocCode>data/</DocCode>, l'installation des dépendances, les migrations
      et le premier commit Git.
    </DocParagraph>

    <DocSubtitle>Le parcours complet</DocSubtitle>

    <CodeBlock title="Terminal" code={QUICK_START} />

    <DocList
      isOrdered
      items={[
        <>
          <strong>Générer le projet</strong> avec{" "}
          <DocCode>create-iros-app</DocCode> et répondre aux trois questions.
        </>,
        <>
          <strong>Ajuster l'identité</strong> : <DocCode>author</DocCode> et{" "}
          <DocCode>copyrightYear</DocCode> dans{" "}
          <DocCode>site.config.ts</DocCode>, couleurs dans{" "}
          <DocCode>globals.css</DocCode>.
        </>,
        <>
          <strong>Lancer le serveur</strong> et vérifier le parcours
          d'inscription.
        </>,
        <>
          <strong>Supprimer la feature starter</strong> une fois le modèle
          compris.
        </>,
      ]}
    />

    <DocParagraph>
      Options utiles : <DocCode>--yes</DocCode> (aucune question),{" "}
      <DocCode>--pm bun</DocCode> (gestionnaire de paquets),{" "}
      <DocCode>--no-install</DocCode> et <DocCode>--no-git</DocCode>. Avec{" "}
      <DocCode>--no-install</DocCode>, lancer soi-même{" "}
      <DocCode>bun install</DocCode> puis <DocCode>bun run db:migrate</DocCode>.
    </DocParagraph>

    <DocParagraph>
      <DocCode>better-sqlite3</DocCode> figure dans{" "}
      <DocCode>trustedDependencies</DocCode> : son script d'installation est
      autorisé à s'exécuter, contrairement à <DocCode>sharp</DocCode> et{" "}
      <DocCode>unrs-resolver</DocCode>, volontairement ignorés.
    </DocParagraph>

    <DocNote variant="info" title="Application sur le port 3017">
      Le port est défini dans les scripts <DocCode>dev</DocCode> et{" "}
      <DocCode>start</DocCode> de <DocCode>package.json</DocCode>. Pour en
      changer, modifier aussi les URL de <DocCode>.env</DocCode> : Better Auth
      rejette les requêtes dont l'origine ne correspond pas à{" "}
      <DocCode>BETTER_AUTH_URL</DocCode>.
    </DocNote>
  </DocSection>
);
