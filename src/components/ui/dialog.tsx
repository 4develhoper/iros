"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { X } from "react-feather";
import { cn } from "@/lib/utils/cn";
import { IconButton } from "./icon-button";

/** Largeurs maximales de la boîte de dialogue. */
export type TDialogSize = "sm" | "md" | "lg";

export type TDialogProps = {
  /** Contrôle l'ouverture (composant contrôlé). */
  isOpen: boolean;
  /** Appelé lors d'une fermeture demandée : croix, `Échap` ou clic extérieur. */
  onClose: () => void;
  /** Titre affiché dans l'en-tête et lu par les lecteurs d'écran. */
  title: string;
  /** Texte explicatif sous le titre. */
  description?: string;
  /** Contenu principal. */
  children: ReactNode;
  /** Zone d'actions en pied de boîte. */
  footer?: ReactNode;
  /** Largeur maximale. @default "md" */
  size?: TDialogSize;
  className?: string;
};

const SIZE_CLASSES: Record<TDialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/**
 * Boîte de dialogue modale bâtie sur l'élément natif `<dialog>`.
 *
 * L'élément natif fournit gratuitement le piège de focus, le fond inerte et la
 * fermeture par `Échap` ; ce composant se contente de synchroniser son état
 * avec la prop `isOpen`.
 *
 * @example
 * ```tsx
 * <Dialog isOpen={isOpen} onClose={close} title="Supprimer la tâche">
 *   Cette action est irréversible.
 * </Dialog>
 * ```
 */
export const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
}: TDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: le clic ne ferme que via le fond, l'équivalent clavier étant la touche Échap gérée par `onCancel`
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-title"
      // `cancel` couvre la touche Échap : on laisse React piloter l'état.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      // Un clic sur le `::backdrop` a pour cible l'élément <dialog> lui-même.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-2rem)] rounded-card bg-background p-0 text-ink-900 shadow-2xl backdrop:bg-black/50",
        SIZE_CLASSES[size],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <div className="space-y-1">
          <h2 id="dialog-title" className="text-lg font-medium">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-muted">{description}</p>
          ) : null}
        </div>
        <IconButton
          icon={<X />}
          label="Fermer la boîte de dialogue"
          size="sm"
          onClick={onClose}
        />
      </div>

      <div className="px-6 py-5 text-sm text-ink-600">{children}</div>

      {footer ? (
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          {footer}
        </div>
      ) : null}
    </dialog>
  );
};
