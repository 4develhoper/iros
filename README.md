# Iros

Base de départ pour créer rapidement de nouveaux projets Next.js, organisée en
**architecture par features**.

## Documentation

- **`/docs`** — la même prise en main, consultable dans l'application
  (`src/features/docs/`), avec sommaire, blocs de code copiables et thème
  clair/sombre.
- [Installation & prise en main](docs/installation.md) — prérequis, variables
  d'environnement, base de données, déploiement, dépannage.
- [Publier `create-iros-app`](docs/create-iros-app.md) — transformer ce dépôt en
  starter distribuable (`bun create iros-app mon-projet`).

## Stack

| Domaine        | Choix                                        |
| -------------- | -------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)           |
| UI             | React 19, Tailwind CSS 4                     |
| Langage        | TypeScript (strict)                          |
| Authentifi.    | Better Auth                                  |
| Base de données| Drizzle ORM + SQLite (`better-sqlite3`)      |
| État local     | Zustand                                      |
| Formulaires    | React Hook Form + Zod + next-safe-form       |
| Notifications  | react-hot-toast                              |
| Icônes         | react-feather                                |
| Classes CSS    | tailwind-merge + clsx (`cn`)                 |
| Qualité        | Biome (lint + format)                        |

## Démarrage

Le boilerplate ne se clone pas : `create-iros-app` le télécharge, le
personnalise (nom, `.env`, secret d'authentification) et l'installe.

```bash
bun  create iros-app mon-projet   # ou : npm create iros-app@latest mon-projet
cd mon-projet
bun run dev
```

La CLI a déjà installé les dépendances, écrit le `.env`, créé `data/` et
appliqué les migrations. L'application est disponible sur
http://localhost:3017.

Détail de chaque étape, options de la CLI et installation manuelle (maintenance
du boilerplate) : [docs/installation.md](docs/installation.md).

## Scripts

| Commande             | Rôle                                          |
| -------------------- | --------------------------------------------- |
| `bun run dev`        | Serveur de développement                      |
| `bun run build`      | Build de production                           |
| `bun run typecheck`  | Vérification TypeScript                       |
| `bun run lint`       | Lint + format (Biome)                         |
| `bun run format`     | Formatage automatique                         |
| `bun run db:generate`| Génère les migrations depuis les schémas TS   |
| `bun run db:migrate` | Applique les migrations                       |
| `bun run db:push`    | Synchronise le schéma sans migration          |
| `bun run db:studio`  | Explorateur de base de données                |

## Structure

```
src/
├── app/                        # Routes (App Router)
│   ├── (public)/               # Landing page
│   ├── (auth)/                 # Connexion, inscription
│   ├── (app)/                  # Écrans protégés (starter)
│   └── api/auth/[...all]/      # Handler Better Auth
├── components/
│   ├── ui/                     # Primitives natives (button, input, dialog…)
│   ├── layouts/                # Gabarits de mise en page
│   └── shared/                 # Composants partagés non natifs
├── config/                     # site.config.ts, routes.config.ts
├── features/                   # Un dossier par domaine métier
│   └── <feature>/
│       ├── components/         # Composants de la feature
│       ├── schemas/            # Schémas Zod
│       ├── server/
│       │   ├── actions/        # Server Actions (next-safe-form)
│       │   └── dal/            # Accès aux données (Drizzle)
│       └── types/              # Types de la feature
├── lib/
│   ├── better-auth/            # Instance serveur + client
│   ├── drizzle/                # Connexion, schémas, migrations
│   ├── safe-form/              # Server Actions validées + pont React Hook Form
│   └── utils/                  # cn, formatage
├── stores/                     # Stores Zustand
├── types/                      # Types utilitaires transverses
└── proxy.ts                    # Garde d'accès (ex-middleware)
```

### Ajouter une feature

1. Créer `src/features/<nom>/` avec `schemas/`, `server/actions/`,
   `server/dal/`, `components/`, `types/`.
2. Déclarer la table dans `src/lib/drizzle/schemas/<nom>.schema.ts` et
   l'exporter depuis `schemas/index.ts`.
3. `bun run db:generate && bun run db:migrate`.
4. Ajouter la route dans `src/config/routes.config.ts` puis la page dans
   `src/app/`.

La feature `starter` sert de modèle complet : formulaire → action → DAL → base.

## Conventions de code

- **Fonctions fléchées** partout, y compris pour les composants et les pages.
- **Noms de fichiers en kebab-case**, suffixés par leur rôle :
  `auth.schema.ts`, `task.action.ts`, `session.dal.ts`, `ui.store.ts`,
  `task.types.ts`.
- **Types préfixés `T`** et en PascalCase : `TButtonProps`, `TAuthSession`.
- **JSDoc** sur tout export public : rôle, paramètres, exemple d'usage.
- **`page.tsx` en composant serveur**. Les portions dynamiques (session, base
  de données) sont isolées derrière `<Suspense>`, comme l'impose
  `cacheComponents`.
- **Chemins absolus** via l'alias `@/`.

## Formulaires

`next-safe-form` transporte les données en **`FormData`** via `useActionState` :
toutes les valeurs arrivent au serveur sous forme de chaînes.

### Écrire un formulaire

```tsx
// 1. Le schéma, partagé client et serveur
export const createTaskSchema = z.object({
  title: z.string().min(3, "…"),
  description: formOptionalString(500, "…"), // "" -> undefined
  priority: z.enum(TASK_PRIORITIES),
});

// 2. L'action serveur
export const createTaskAction = createAuthAction({
  actionName: "createTask",
  schema: createTaskSchema,
  handler: async (input, { user }) => ({ task: await createTask(input, user.id) }),
});

// 3. Le composant client
const { register, getFieldError, onSubmit, isPending } = useSafeForm({
  schema: createTaskSchema,
  action: createTaskAction,
  defaultValues: { title: "", description: "", priority: "medium" },
  resetOnSuccess: true,
  onSuccess: ({ task }) => toast.success(`Tâche « ${task.title} » créée.`),
  onError: (message) => toast.error(message),
});
```

`useSafeForm` (dans `lib/safe-form`) fait le pont : React Hook Form valide dans
le navigateur, la Server Action n'est déclenchée que si cette validation passe,
puis `next-safe-form` revalide côté serveur avec le même schéma.
`getFieldError` fusionne les erreurs client et serveur.

### Champs non textuels

Comme la `FormData` ne transporte que des chaînes, utiliser les fabriques de
`lib/safe-form/form-schema.ts` pour les champs qui ne sont pas du texte :

| Fabrique                          | Usage                                        |
| --------------------------------- | -------------------------------------------- |
| `formBoolean()`                   | Case à cocher (`"on"`, `"true"`, absente…)   |
| `formOptionalString(max, message)`| Texte optionnel : `""` devient `undefined`   |

### Mutations sans saisie

Pour un bouton qui déclenche une action sans champ (déconnexion, suppression),
utiliser directement `useSafeActionForm` avec un `<form action>` natif et des
`<input type="hidden">` : l'amélioration progressive est conservée. Voir
`sign-out-button.tsx` et `task-row-actions.tsx`.

### Erreurs

Seuls les messages portés par `ActionError` sont transmis au client ; toute
autre exception est journalisée puis remplacée par un message générique.

## Points d'attention

### `cacheComponents`

Activé dans `next.config.ts`. Toute lecture de `cookies()`, `headers()` ou de
la base de données rend le rendu dynamique et **doit** être encapsulée dans une
frontière `<Suspense>` avec un `fallback` (voir `TaskListSkeleton`,
`UserMenuSkeleton`). Éviter `new Date()` pendant le rendu : utiliser
`siteConfig.copyrightYear` ou passer la valeur en props.

### `typedRoutes`

Les `href` sont vérifiés à la compilation. Les routes sont centralisées dans
`src/config/routes.config.ts`.

### Sécurité

- `src/proxy.ts` ne fait qu'un contrôle **optimiste** (présence du cookie).
- **Piège des deux contrôles.** Le proxy se fie au cookie, `requireUser()` à la
  base : un cookie présent mais rattaché à aucune session valide (base
  réinitialisée, session révoquée, secret changé) ferait rebondir le visiteur
  entre `/login` et la page protégée, indéfiniment. `requireUser()` redirige
  donc vers `/login?session_expired=1` ; le proxy reconnaît ce marqueur, purge
  les cookies fantômes et laisse la page s'afficher. Toute nouvelle route
  protégée hérite de ce comportement — ne pas rediriger « à la main » vers
  `/login` depuis un composant serveur, appeler `requireUser()`.
- La vérification qui fait autorité est `requireUser()` dans
  `features/auth/server/dal/session.dal.ts`, ou `createAuthAction` pour les
  Server Actions.
- Les requêtes de la DAL filtrent systématiquement par `userId`.

### Thème clair / sombre

Piloté par `next-themes` (`ThemeProvider` dans le layout racine, bascule via
`ThemeToggle`). Le script anti-flash pose la classe `dark` sur `<html>` avant la
peinture, d'où le `suppressHydrationWarning` sur `<html>`.

Le thème sombre ne redéfinit **que des jetons CSS**, dans le bloc `.dark` de
`globals.css` : l'échelle `ink` y est inversée (`ink-50` devient la surface la
plus sombre, `ink-900` le texte le plus clair). Les composants n'ont donc
aucune variante `dark:` à écrire — `text-ink-700` reste « texte secondaire »
dans les deux thèmes.

Trois précautions lors de l'ajout d'un composant :

- **Ne pas figer une couleur de la palette Tailwind** (`bg-red-50`,
  `text-emerald-700`) pour un état : utiliser les jetons sémantiques en
  transparence, comme `bg-danger/12 text-danger`.
- **Les voiles et surimpressions** utilisent `bg-black/50`, jamais
  `bg-ink-900/40` — `ink-900` devient clair en thème sombre.
- **Une surface volontairement blanche dans les deux thèmes** (la maquette
  produit de `auth-showcase.tsx`) doit figer ses couleurs de texte sur une
  palette qui ne s'inverse pas (`slate`).

### Coquille applicative

`AppLayout` occupe exactement la hauteur du viewport (`h-dvh` +
`overflow-hidden`) : la barre latérale et l'en-tête sont fixes, seule la zone de
contenu défile. Les conteneurs flex intermédiaires portent `min-h-0` /
`min-w-0` — sans quoi un enfant refuserait de rétrécir sous sa taille
intrinsèque et le défilement remonterait à la page entière.

### Personnalisation

- Nom, description et URL : `src/config/site.config.ts`.
- Couleurs et police : bloc `@theme` de `src/app/globals.css`
  (steam blue `#1E56CD`, vanilla `#FDF8F2`, Poppins).
- Navigation de l'espace applicatif : `src/components/layouts/app-sidebar.tsx`.

### Dépendances imbriquées de `next-safe-form`

Le paquet déclare `next`, `react` et `react-dom` en dépendances directes (au
lieu de `peerDependencies`). `react` est dédupliqué avec celui du projet — il
n'y a donc **pas** de double instance de React — mais `next@15.5.7` et
`react-dom@19.2.4` sont installés en doublon sous
`node_modules/next-safe-form/node_modules/`. Ce sont des fichiers morts : le
paquet n'importe que `react` et `zod`. Seul l'espace disque est concerné.

### Fournisseurs OAuth

Google et GitHub ne sont activés que si leurs identifiants sont présents dans
`.env`. Sans configuration, les boutons affichent une erreur explicite ; le
reste de l'authentification par e-mail fonctionne normalement.
