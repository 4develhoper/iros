import type { ReactNode } from "react";

export type TDocSectionProps = {
  /** Ancre de la section, référencée par `DOCS_NAVIGATION`. */
  id: string;
  /** Titre affiché en tête de section. */
  title: string;
  /** Phrase d'introduction facultative. */
  description?: ReactNode;
  /** Corps de la section. */
  children: ReactNode;
};

/**
 * Section de documentation avec son ancre et son titre.
 *
 * `scroll-mt-28` compense la hauteur de l'en-tête collant : sans cette marge,
 * le titre visé par une ancre se retrouverait masqué derrière la barre.
 *
 * @example
 * ```tsx
 * <DocSection id="installation" title="Installation">
 *   <CodeBlock code="bun install" />
 * </DocSection>
 * ```
 */
export const DocSection = ({
  id,
  title,
  description,
  children,
}: TDocSectionProps) => (
  <section id={id} className="scroll-mt-28 border-t border-border pt-12">
    <h2 className="text-2xl font-medium tracking-tight text-ink-900">
      {title}
    </h2>

    {description ? (
      <p className="mt-3 max-w-3xl leading-relaxed text-ink-600">
        {description}
      </p>
    ) : null}

    <div className="mt-6 space-y-5">{children}</div>
  </section>
);

export type TDocSubtitleProps = {
  children: ReactNode;
};

/** Intertitre à l'intérieur d'une section. */
export const DocSubtitle = ({ children }: TDocSubtitleProps) => (
  <h3 className="pt-2 text-base font-medium text-ink-900">{children}</h3>
);

export type TDocParagraphProps = {
  children: ReactNode;
};

/** Paragraphe de documentation, à la largeur de lecture confortable. */
export const DocParagraph = ({ children }: TDocParagraphProps) => (
  <p className="max-w-3xl leading-relaxed text-ink-700">{children}</p>
);

export type TDocListProps = {
  /** Éléments de la liste. */
  items: readonly ReactNode[];
  /** Numérote les éléments : utile pour une marche à suivre. @default false */
  isOrdered?: boolean;
};

/** Liste à puces ou numérotée, stylée de façon homogène. */
export const DocList = ({ items, isOrdered = false }: TDocListProps) => {
  const className =
    "max-w-3xl space-y-2 pl-5 leading-relaxed text-ink-700 marker:text-ink-400";

  return isOrdered ? (
    <ol className={`list-decimal ${className}`}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: liste statique, jamais réordonnée
        <li key={index}>{item}</li>
      ))}
    </ol>
  ) : (
    <ul className={`list-disc ${className}`}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: liste statique, jamais réordonnée
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export type TDocCodeProps = {
  children: ReactNode;
};

/** Fragment de code au fil du texte (`nom de fichier`, `variable`…). */
export const DocCode = ({ children }: TDocCodeProps) => (
  <code className="rounded-sm bg-ink-100 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-800">
    {children}
  </code>
);
