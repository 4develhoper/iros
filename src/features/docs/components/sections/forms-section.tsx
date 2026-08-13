import { CodeBlock } from "@/features/docs/components/code-block";
import { DocNote } from "@/features/docs/components/doc-note";
import {
  DocCode,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

const SCHEMA_STEP = `// 1. Le schéma, partagé client et serveur
export const createTaskSchema = z.object({
  title: z.string().min(3, "Trois caractères minimum."),
  description: formOptionalString(500, "500 caractères maximum."),
  priority: z.enum(TASK_PRIORITIES),
});`;

const ACTION_STEP = `// 2. L'action serveur
export const createTaskAction = createAuthAction({
  actionName: "createTask",
  schema: createTaskSchema,
  handler: async (input, { user }) => ({
    task: await createTask(input, user.id),
  }),
});`;

const COMPONENT_STEP = `// 3. Le composant client
const { register, getFieldError, onSubmit, isPending } = useSafeForm({
  schema: createTaskSchema,
  action: createTaskAction,
  defaultValues: { title: "", description: "", priority: "medium" },
  resetOnSuccess: true,
  onSuccess: ({ task }) => toast.success(\`Tâche « \${task.title} » créée.\`),
  onError: (message) => toast.error(message),
});`;

/** Fabriques à utiliser pour les champs non textuels. */
const FACTORY_ROWS = [
  [
    <DocCode key="bool">formBoolean()</DocCode>,
    <>
      Case à cocher : <DocCode key="on">&quot;on&quot;</DocCode>,{" "}
      <DocCode key="true">&quot;true&quot;</DocCode>, ou champ absent
    </>,
  ],
  [
    <DocCode key="opt">formOptionalString(max, message)</DocCode>,
    <>
      Texte optionnel : <DocCode key="empty">&quot;&quot;</DocCode> devient{" "}
      <DocCode key="undef">undefined</DocCode>
    </>,
  ],
] as const;

/** Écriture d'un formulaire validé côté client et côté serveur. */
export const FormsSection = () => (
  <DocSection
    id="formulaires"
    title="Formulaires & Server Actions"
    description="Un schéma Zod unique valide dans le navigateur puis à nouveau sur le serveur. next-safe-form fait le pont, React Hook Form gère la saisie."
  >
    <CodeBlock title="task.schema.ts" code={SCHEMA_STEP} />
    <CodeBlock title="task.action.ts" code={ACTION_STEP} />
    <CodeBlock title="create-task-form.tsx" code={COMPONENT_STEP} />

    <DocParagraph>
      <DocCode>useSafeForm</DocCode> ne déclenche la Server Action que si la
      validation navigateur passe ; <DocCode>next-safe-form</DocCode> revalide
      ensuite avec le même schéma. <DocCode>getFieldError</DocCode> fusionne les
      erreurs des deux côtés.
    </DocParagraph>

    <DocSubtitle>Champs non textuels</DocSubtitle>

    <DocNote variant="warning" title="FormData ne transporte que des chaînes">
      Un booléen, un nombre ou un champ vide arrivent au serveur sous forme de
      texte. Utiliser les fabriques de{" "}
      <DocCode>lib/safe-form/form-schema.ts</DocCode> plutôt que{" "}
      <DocCode>z.boolean()</DocCode> ou <DocCode>z.number()</DocCode> bruts.
    </DocNote>

    <DocTable columns={["Fabrique", "Usage"]} rows={FACTORY_ROWS} />

    <DocSubtitle>Mutations sans saisie</DocSubtitle>

    <DocParagraph>
      Pour un bouton qui déclenche une action sans champ (déconnexion,
      suppression), utiliser <DocCode>useSafeActionForm</DocCode> avec un{" "}
      <DocCode>&lt;form action&gt;</DocCode> natif et des{" "}
      <DocCode>&lt;input type=&quot;hidden&quot;&gt;</DocCode> : l'amélioration
      progressive est conservée. Voir <DocCode>sign-out-button.tsx</DocCode>.
    </DocParagraph>

    <DocSubtitle>Erreurs</DocSubtitle>

    <DocNote variant="info" title="Seul ActionError atteint le client">
      Les messages destinés à l'utilisateur passent par{" "}
      <DocCode>ActionError</DocCode>. Toute autre exception est journalisée côté
      serveur puis remplacée par un message générique — aucune fuite
      d'information technique.
    </DocNote>
  </DocSection>
);
