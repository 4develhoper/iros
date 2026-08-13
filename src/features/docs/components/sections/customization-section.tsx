import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocList,
  DocSection,
} from "@/features/docs/components/doc-section";

/** Points d'entrée à modifier au démarrage d'un nouveau projet. */
export const CustomizationSection = () => (
  <DocSection
    id="personnalisation"
    title="Personnaliser le projet"
    description="create-iros-app a déjà posé le nom et la description : six fichiers suffisent à faire disparaître le reste du boilerplate."
  >
    <DocList
      isOrdered
      items={[
        <>
          <DocCode>package.json</DocCode> — le port dans <DocCode>dev</DocCode>{" "}
          / <DocCode>start</DocCode> si <DocCode>3017</DocCode> ne convient pas
          (penser aux URL de <DocCode>.env</DocCode>).
        </>,
        <>
          <DocCode>src/config/site.config.ts</DocCode> —{" "}
          <DocCode>author</DocCode> et <DocCode>copyrightYear</DocCode> ;{" "}
          <DocCode>name</DocCode>, <DocCode>shortName</DocCode> et{" "}
          <DocCode>description</DocCode> sont déjà renseignés par la CLI. Ces
          valeurs alimentent le logo, les métadonnées SEO et le pied de page.
        </>,
        <>
          <DocCode>src/app/globals.css</DocCode>, bloc <DocCode>@theme</DocCode>{" "}
          — couleurs (steam blue <DocCode>#1E56CD</DocCode>, vanilla{" "}
          <DocCode>#FDF8F2</DocCode>) et police (Poppins).
        </>,
        <>
          <DocCode>src/config/routes.config.ts</DocCode> — catalogue des routes,
          vérifié à la compilation par <DocCode>typedRoutes</DocCode>.
        </>,
        <>
          <DocCode>src/components/layouts/app-sidebar.tsx</DocCode> — navigation
          de l'espace applicatif.
        </>,
        <>
          <DocCode>src/features/starter/</DocCode> — feature de démonstration, à
          supprimer une fois le modèle compris.
        </>,
      ]}
    />

    <DocNote variant="warning" title="Supprimer la feature starter proprement">
      Retirer sa table de <DocCode>src/lib/drizzle/schemas/index.ts</DocCode>,
      sa route de <DocCode>routes.config.ts</DocCode>, son dossier de{" "}
      <DocCode>src/app/(app)/</DocCode>, puis regénérer les migrations. Penser
      aussi à <DocCode>defaultRedirectAfterLogin</DocCode>, qui pointe vers{" "}
      <DocCode>/starter</DocCode>.
    </DocNote>
  </DocSection>
);
