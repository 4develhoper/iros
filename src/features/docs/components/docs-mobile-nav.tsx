import { ChevronDown } from "react-feather";
import { DOCS_NAVIGATION } from "@/features/docs/content/docs-navigation.content";

/**
 * Sommaire replié des petits écrans.
 *
 * Repose sur `<details>` natif plutôt que sur un état React : aucun JavaScript
 * n'est nécessaire, le composant reste donc rendu par le serveur.
 */
export const DocsMobileNav = () => (
  <details className="group rounded-card border border-border bg-background lg:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink-900">
      Sommaire
      <ChevronDown
        aria-hidden="true"
        className="size-4 text-ink-500 transition-transform group-open:rotate-180"
      />
    </summary>

    <div className="space-y-4 border-t border-border px-4 py-4">
      {DOCS_NAVIGATION.map((group) => (
        <div key={group.title} className="space-y-1.5">
          <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
            {group.title}
          </p>

          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block text-sm text-ink-600 transition-colors hover:text-ink-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </details>
);
