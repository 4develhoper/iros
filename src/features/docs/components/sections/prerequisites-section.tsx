import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Outils à installer avant de générer un projet avec create-iros-app. */
const REQUIREMENT_ROWS = [
  [
    <DocCode key="bun">Bun</DocCode>,
    "≥ 1.3.14",
    "Gestionnaire de paquets et runtime des scripts",
  ],
  [
    <DocCode key="node">Node.js</DocCode>,
    "≥ 20",
    "Requis par Next.js 16, create-iros-app et la compilation de better-sqlite3",
  ],
  [
    <DocCode key="git">Git</DocCode>,
    "quelconque",
    "Facultatif : premier commit créé par create-iros-app",
  ],
] as const;

const VERSION_CHECK = `bun --version
node --version
git --version`;

/** Prérequis système et vérification des versions installées. */
export const PrerequisitesSection = () => (
  <DocSection
    id="prerequis"
    title="Prérequis"
    description="Trois outils suffisent. Vérifiez leurs versions avant toute chose : la plupart des erreurs d'installation viennent d'une version trop ancienne."
  >
    <DocTable columns={["Outil", "Version", "Rôle"]} rows={REQUIREMENT_ROWS} />

    <CodeBlock title="Terminal" code={VERSION_CHECK} />

    <DocNote variant="warning" title="Utilisez Bun, pas npm">
      <DocCode>create-iros-app</DocCode> installe avec le gestionnaire qui l'a
      lancé : préférer <DocCode>bun create iros-app</DocCode>.{" "}
      <DocCode>package.json</DocCode> épingle{" "}
      <DocCode>packageManager: &quot;bun@1.3.14&quot;</DocCode>. Installer avec{" "}
      <DocCode>npm</DocCode> ou <DocCode>pnpm</DocCode> produirait un arbre de
      dépendances différent de celui verrouillé par <DocCode>bun.lock</DocCode>.
    </DocNote>

    <DocSubtitle>Modules natifs</DocSubtitle>

    <DocNote variant="info" title="better-sqlite3 se compile parfois">
      Un binaire précompilé est téléchargé pour la plupart des combinaisons
      Node/OS. Si la compilation se déclenche malgré tout : sous Windows,
      installer les <strong>Visual Studio Build Tools</strong> avec la charge de
      travail « Développement Desktop en C++ » ; sous macOS,{" "}
      <DocCode>xcode-select --install</DocCode> suffit.
    </DocNote>
  </DocSection>
);
