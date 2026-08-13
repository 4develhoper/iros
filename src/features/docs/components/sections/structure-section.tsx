import { CodeBlock } from "@/features/docs/components/code-block";
import {
  DocCode,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

const TREE = `src/
├── app/                        # Routes (App Router)
│   ├── (public)/               # Landing, documentation
│   ├── (auth)/                 # Connexion, inscription
│   ├── (app)/                  # Écrans protégés
│   └── api/auth/[...all]/      # Handler Better Auth
├── components/
│   ├── ui/                     # Primitives du design system
│   ├── layouts/                # Gabarits de mise en page
│   └── shared/                 # Composants partagés non natifs
├── config/                     # site.config.ts, routes.config.ts
├── features/                   # Un dossier par domaine métier
├── lib/
│   ├── better-auth/            # Instance serveur + client
│   ├── drizzle/                # Connexion, schémas, migrations
│   ├── safe-form/              # Server Actions validées + pont RHF
│   └── utils/                  # cn, formatage
├── stores/                     # Stores Zustand
├── types/                      # Types utilitaires transverses
└── proxy.ts                    # Garde d'accès (ex-middleware)`;

const FEATURE_TREE = `src/features/<nom>/
├── components/      # composants de la feature
├── schemas/         # schémas Zod partagés client/serveur
├── server/
│   ├── actions/     # Server Actions (createAction / createAuthAction)
│   └── dal/         # accès Drizzle, toujours filtré par userId
└── types/`;

/** Emplacement de chaque type de fichier. */
const PLACEMENT_ROWS = [
  [
    "Composant réutilisable, sans logique métier",
    <DocCode key="ui">src/components/ui/</DocCode>,
  ],
  [
    "Composant lié à un domaine métier",
    <DocCode key="feat">src/features/&lt;nom&gt;/components/</DocCode>,
  ],
  [
    "Requête base de données",
    <DocCode key="dal">src/features/&lt;nom&gt;/server/dal/</DocCode>,
  ],
  [
    "Mutation déclenchée par un formulaire",
    <DocCode key="action">src/features/&lt;nom&gt;/server/actions/</DocCode>,
  ],
  [
    "Table de la base",
    <DocCode key="schema">src/lib/drizzle/schemas/</DocCode>,
  ],
] as const;

/** Arborescence du projet et règles de placement des fichiers. */
export const StructureSection = () => (
  <DocSection
    id="structure"
    title="Structure du projet"
    description="Le découpage suit les domaines métier plutôt que les types de fichiers : une fonctionnalité se lit, se déplace et se supprime d'un seul tenant."
  >
    <CodeBlock title="src/" code={TREE} />

    <DocSubtitle>Anatomie d'une feature</DocSubtitle>

    <CodeBlock title="src/features/" code={FEATURE_TREE} />

    <DocParagraph>
      La feature <DocCode>starter</DocCode> est le modèle de référence : elle
      couvre le schéma Zod, l'action serveur, la DAL Drizzle et les composants
      client.
    </DocParagraph>

    <DocSubtitle>Où placer quoi</DocSubtitle>

    <DocTable columns={["Ce que vous écrivez", "Où"]} rows={PLACEMENT_ROWS} />
  </DocSection>
);
