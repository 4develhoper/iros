import {
  DocCode,
  DocParagraph,
  DocSection,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Symptômes fréquents et leur correctif. */
const ISSUE_ROWS = [
  [
    <DocCode key="cantopen">
      SQLITE_CANTOPEN: unable to open database file
    </DocCode>,
    <>
      Le dossier <DocCode key="d">data/</DocCode> n'existe pas →{" "}
      <DocCode key="m">mkdir -p data</DocCode>
    </>,
  ],
  [
    <DocCode key="notable">no such table: user</DocCode>,
    <>
      Migrations non appliquées →{" "}
      <DocCode key="mig">bun run db:migrate</DocCode>
    </>,
  ],
  [
    <DocCode key="locked">database is locked</DocCode>,
    <>
      Un autre processus tient la base : arrêter{" "}
      <DocCode key="st">db:studio</DocCode> ou un{" "}
      <DocCode key="dev">dev</DocCode> resté ouvert
    </>,
  ],
  [
    <DocCode key="layout">Cannot find name &apos;LayoutProps&apos;</DocCode>,
    <>
      Types de routes non générés. <DocCode key="tc">bun run typecheck</DocCode>{" "}
      appelle <DocCode key="tg">next typegen</DocCode> avant{" "}
      <DocCode key="tsc">tsc</DocCode> : l'erreur signale un script modifié
    </>,
  ],
  [
    "Déconnexion à chaque redémarrage",
    <>
      <DocCode key="sec">BETTER_AUTH_SECRET</DocCode> absent ou modifié entre
      deux lancements
    </>,
  ],
  [
    "Boucle entre /login et une page protégée",
    <>
      Une redirection manuelle a court-circuité{" "}
      <DocCode key="ru">requireUser()</DocCode> — toujours passer par cette
      fonction
    </>,
  ],
  [
    <DocCode key="cookies">Route used cookies inside a component…</DocCode>,
    <>
      <DocCode key="cc">cacheComponents</DocCode> : isoler la lecture dynamique
      derrière un <DocCode key="sus">&lt;Suspense fallback&gt;</DocCode>
    </>,
  ],
  [
    <DocCode key="route">
      Type &apos;&quot;/x&quot;&apos; is not assignable to type
      &apos;Route&apos;
    </DocCode>,
    <>
      <DocCode key="tr">typedRoutes</DocCode> : la route n'existe pas, ou elle
      manque dans <DocCode key="rc">routes.config.ts</DocCode>
    </>,
  ],
  [
    "Erreur de compilation better-sqlite3 à l'installation",
    "Outils de compilation C++ manquants (voir Prérequis)",
  ],
  [
    "Bouton OAuth en erreur",
    <>
      Identifiants du fournisseur absents de <DocCode key="env">.env</DocCode> —
      comportement attendu
    </>,
  ],
] as const;

/** Table de dépannage des erreurs les plus fréquentes. */
export const TroubleshootingSection = () => (
  <DocSection
    id="depannage"
    title="Dépannage"
    description="Les erreurs rencontrées le plus souvent, et ce qu'elles signifient réellement."
  >
    <DocTable columns={["Symptôme", "Cause & correctif"]} rows={ISSUE_ROWS} />

    <DocParagraph>
      Si <DocCode>bun run lint</DocCode>, <DocCode>bun run typecheck</DocCode>{" "}
      et <DocCode>bun run build</DocCode> passent tous les trois, le projet est
      dans un état sain : ces trois commandes sont la condition d'entrée de tout
      commit.
    </DocParagraph>
  </DocSection>
);
