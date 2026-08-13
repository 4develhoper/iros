"use client";

import { useEffect, useState } from "react";
import {
  DOCS_NAVIGATION,
  DOCS_SECTION_IDS,
} from "@/features/docs/content/docs-navigation.content";
import { cn } from "@/lib/utils/cn";

/**
 * Fenêtre d'observation : seule la bande haute du viewport est prise en
 * compte, de sorte que la section « active » soit celle qu'on est en train de
 * lire et non celle qui affleure en bas de l'écran.
 */
const OBSERVER_ROOT_MARGIN = "-88px 0px -70% 0px";

/**
 * Sommaire latéral de la documentation, avec suivi de la lecture.
 *
 * Un `IntersectionObserver` met en évidence la section visible : c'est plus
 * économique qu'un écouteur de défilement, qui recalculerait des positions à
 * chaque image.
 */
export const DocsToc = () => {
  const [activeId, setActiveId] = useState<string>(DOCS_SECTION_IDS[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN, threshold: 0 },
    );

    const sections = DOCS_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((section) => section !== null);

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sommaire de la documentation" className="space-y-6">
      {DOCS_NAVIGATION.map((group) => (
        <div key={group.title} className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
            {group.title}
          </p>

          <ul className="space-y-0.5 border-l border-border">
            {group.items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                      isActive
                        ? "border-primary font-medium text-primary"
                        : "border-transparent text-ink-600 hover:border-ink-300 hover:text-ink-900",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};
