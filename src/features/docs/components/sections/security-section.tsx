import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Ce qui fait autorité selon le contexte d'exécution. */
const GUARD_ROWS = [
  [
    <DocCode key="proxy">src/proxy.ts</DocCode>,
    "Optimiste",
    "Vérifie la présence du cookie, redirige tôt. N'interroge jamais la base.",
  ],
  [
    <DocCode key="dal">requireUser()</DocCode>,
    "Autorité",
    "Composants serveur : valide la session en base et expose l'utilisateur.",
  ],
  [
    <DocCode key="action">createAuthAction</DocCode>,
    "Autorité",
    "Server Actions : refuse l'exécution sans session valide.",
  ],
] as const;

const PROTECTED_PAGE = `const StarterPage = async () => {
  const user = await requireUser();

  return <TaskList userId={user.id} />;
};`;

/** Fonctionnement de la garde d'accès et règles de sécurité. */
export const SecuritySection = () => (
  <DocSection
    id="securite"
    title="Authentification & sécurité"
    description="Better Auth gère les sessions ; la protection des routes repose sur deux contrôles complémentaires qu'il ne faut pas confondre."
  >
    <DocTable columns={["Contrôle", "Rôle", "Portée"]} rows={GUARD_ROWS} />

    <DocSubtitle>Protéger une page</DocSubtitle>

    <CodeBlock title="src/app/(app)/starter/page.tsx" code={PROTECTED_PAGE} />

    <DocNote
      variant="danger"
      title="Ne jamais rediriger « à la main » vers /login"
    >
      Le proxy se fie au cookie, <DocCode>requireUser()</DocCode> à la base : un
      cookie présent mais rattaché à aucune session valide (base réinitialisée,
      session révoquée, secret changé) ferait rebondir le visiteur entre{" "}
      <DocCode>/login</DocCode> et la page protégée, indéfiniment.{" "}
      <DocCode>requireUser()</DocCode> redirige donc vers{" "}
      <DocCode>/login?session_expired=1</DocCode> ; le proxy reconnaît ce
      marqueur, purge le cookie fantôme et laisse la page de connexion
      s'afficher. Une redirection écrite à la main court-circuite ce mécanisme.
    </DocNote>

    <DocSubtitle>Accès aux données</DocSubtitle>

    <DocParagraph>
      Toutes les requêtes Drizzle de la DAL filtrent systématiquement par{" "}
      <DocCode>userId</DocCode>. Une nouvelle requête qui omettrait ce filtre
      exposerait les données des autres comptes : c'est la règle la plus
      importante du projet.
    </DocParagraph>

    <DocSubtitle>Déclarer une route protégée</DocSubtitle>

    <DocParagraph>
      Ajouter la route dans <DocCode>routes.config.ts</DocCode>, puis son
      préfixe dans <DocCode>protectedRoutePrefixes</DocCode> : le proxy
      l'intercepte alors automatiquement.
    </DocParagraph>

    <DocSubtitle>Fournisseurs OAuth</DocSubtitle>

    <DocParagraph>
      Google et GitHub ne sont activés que si leurs identifiants sont présents
      dans <DocCode>.env</DocCode>. Sans configuration, les boutons affichent
      une erreur explicite et l'authentification par e-mail continue de
      fonctionner.
    </DocParagraph>
  </DocSection>
);
