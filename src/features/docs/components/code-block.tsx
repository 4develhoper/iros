"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "react-feather";
import { cn } from "@/lib/utils/cn";

export type TCodeBlockProps = {
  /** Contenu du bloc, tel qu'il sera copié dans le presse-papiers. */
  code: string;
  /** Étiquette affichée en tête de bloc : shell, chemin de fichier… */
  title?: string;
  /** Classes complémentaires du conteneur. */
  className?: string;
};

/** Durée d'affichage de la confirmation de copie, en millisecondes. */
const COPIED_FEEDBACK_MS = 2000;

/**
 * Bloc de code accompagné d'un bouton de copie.
 *
 * Îlot client volontairement minimal : seul le bouton justifie l'interactivité,
 * le contenu textuel reste rendu par le serveur.
 *
 * @example
 * ```tsx
 * <CodeBlock title="Terminal" code="bun install" />
 * ```
 */
export const CodeBlock = ({ code, title, className }: TCodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // Réinitialise la confirmation, y compris si le composant est démonté avant
  // la fin du délai.
  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeout = setTimeout(() => setIsCopied(false), COPIED_FEEDBACK_MS);

    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch {
      // `navigator.clipboard` est indisponible hors contexte sécurisé : le
      // texte reste sélectionnable manuellement, rien d'autre à signaler.
    }
  };

  return (
    <div
      className={cn(
        "max-w-3xl overflow-hidden rounded-card border border-border bg-ink-50",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-ink-500">
          {title ?? "bash"}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={isCopied ? "Code copié" : "Copier le code"}
          className="inline-flex items-center gap-1.5 rounded-field px-2 py-1 text-xs text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 [&_svg]:size-3.5"
        >
          {isCopied ? <Check /> : <Copy />}
          {isCopied ? "Copié" : "Copier"}
        </button>
      </div>

      <pre className="scrollbar-thin overflow-x-auto px-4 py-3.5">
        <code className="font-mono text-[0.8125rem] leading-relaxed text-ink-800">
          {code}
        </code>
      </pre>
    </div>
  );
};
