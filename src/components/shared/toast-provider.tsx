"use client";

import { Toaster } from "react-hot-toast";

/**
 * Conteneur global des notifications `react-hot-toast`.
 *
 * Monté une seule fois dans le layout racine. Le style est aligné sur les
 * jetons du design system afin que les toasts ne dénotent pas.
 *
 * Le toast est volontairement *inversé* : il emprunte la couleur de premier
 * plan comme fond et celle du fond comme texte. Il ressort ainsi dans les deux
 * thèmes — sombre sur une interface claire, clair sur une interface sombre —
 * sans avoir à connaître le thème actif.
 *
 * @example
 * ```ts
 * import toast from "react-hot-toast";
 * toast.success("Tâche créée");
 * ```
 */
export const ToastProvider = () => (
  <Toaster
    position="top-right"
    gutter={12}
    toastOptions={{
      duration: 4000,
      className: "!rounded-field !text-sm !font-normal",
      style: {
        background: "var(--color-foreground)",
        color: "var(--color-background)",
        padding: "12px 16px",
        maxWidth: "24rem",
      },
      success: {
        iconTheme: {
          primary: "var(--color-success)",
          secondary: "var(--color-foreground)",
        },
      },
      error: {
        iconTheme: {
          primary: "var(--color-danger)",
          secondary: "var(--color-foreground)",
        },
      },
    }}
  />
);
