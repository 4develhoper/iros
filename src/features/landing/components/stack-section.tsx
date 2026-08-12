import { Badge } from "@/components/ui/badge";

/** Technologies embarquées, affichées sous forme d'étiquettes. */
const STACK_ITEMS = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "Better Auth",
  "Drizzle ORM",
  "SQLite",
  "Zustand",
  "Zod",
  "React Hook Form",
  "next-safe-form",
  "react-hot-toast",
  "react-feather",
  "Biome",
] as const;

/** Section listant la pile technique du boilerplate. */
export const StackSection = () => (
  <section id="stack" className="border-y border-border bg-vanilla">
    <div className="mx-auto w-full max-w-4xl space-y-8 px-6 py-20 text-center">
      <div className="space-y-3">
        <h2 className="text-3xl font-medium tracking-tight text-ink-900">
          Une pile assumée
        </h2>
        <p className="text-ink-600">
          Des outils éprouvés, choisis pour tenir dans la durée.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-2.5">
        {STACK_ITEMS.map((item) => (
          <li key={item}>
            <Badge className="bg-background px-3 py-1.5 text-sm text-ink-700">
              {item}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
