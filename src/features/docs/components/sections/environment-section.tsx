import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Variables lues par l'application, et leur caractère obligatoire. */
const ENV_ROWS = [
  [
    <DocCode key="db">DATABASE_URL</DocCode>,
    "oui",
    "Chemin du fichier SQLite, relatif à la racine du projet",
  ],
  [
    <DocCode key="secret">BETTER_AUTH_SECRET</DocCode>,
    "oui",
    "Signature des sessions. Le modifier invalide toutes les sessions existantes",
  ],
  [
    <DocCode key="authurl">BETTER_AUTH_URL</DocCode>,
    "oui",
    "URL d'origine du serveur d'authentification",
  ],
  [
    <DocCode key="appurl">NEXT_PUBLIC_APP_URL</DocCode>,
    "oui",
    "URL publique, exposée au navigateur — n'y placer aucun secret",
  ],
  [
    <DocCode key="google">GOOGLE_CLIENT_ID / _SECRET</DocCode>,
    "non",
    "Active le bouton « Continuer avec Google »",
  ],
  [
    <DocCode key="github">GITHUB_CLIENT_ID / _SECRET</DocCode>,
    "non",
    "Active le bouton « Continuer avec GitHub »",
  ],
] as const;

const SECRET_GENERATION = `openssl rand -base64 32

# sans openssl (Windows / PowerShell) :
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`;

/** Configuration des variables d'environnement. */
export const EnvironmentSection = () => (
  <DocSection
    id="environnement"
    title="Variables d'environnement"
    description="create-iros-app a déjà écrit le .env et son secret : cette section sert de référence, et de mode opératoire manuel."
  >
    <CodeBlock title="Terminal" code="cp .env.example .env" />

    <DocSubtitle>Générer BETTER_AUTH_SECRET</DocSubtitle>

    <CodeBlock title="Terminal" code={SECRET_GENERATION} />

    <DocSubtitle>Référence</DocSubtitle>

    <DocTable columns={["Variable", "Requise", "Rôle"]} rows={ENV_ROWS} />

    <DocParagraph>
      Les fournisseurs OAuth sont facultatifs : laissés vides, leurs boutons
      affichent une erreur explicite et l'authentification par e-mail continue
      de fonctionner normalement.
    </DocParagraph>

    <DocNote
      variant="warning"
      title=".env.example est le seul contrat versionné"
    >
      <DocCode>.gitignore</DocCode> exclut <DocCode>.env*</DocCode>. Toute
      nouvelle variable doit être ajoutée à <DocCode>.env.example</DocCode>,
      sinon elle sera invisible pour les autres développeurs et pour la mise en
      production.
    </DocNote>
  </DocSection>
);
