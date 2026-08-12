"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export type TErrorPageProps = {
  /** Erreur interceptée par la frontière React. */
  error: Error & { digest?: string };
  /** Relance le rendu du segment fautif. */
  reset: () => void;
};

/**
 * Frontière d'erreur globale de l'application.
 *
 * Le message brut n'est jamais affiché : il peut contenir des détails
 * d'implémentation. Seul le `digest` est montré, il permet de retrouver la
 * trace complète dans les journaux serveur.
 */
const ErrorPage = ({ error, reset }: TErrorPageProps) => {
  useEffect(() => {
    console.error("[app:error]", error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-vanilla px-6 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium text-ink-900">
          Une erreur est survenue
        </h1>
        <p className="max-w-md text-ink-600">
          L'action n'a pas pu aboutir. Réessayez, puis contactez le support si
          le problème persiste.
        </p>
        {error.digest ? (
          <p className="text-xs text-muted">Référence : {error.digest}</p>
        ) : null}
      </div>
      <Button onClick={reset}>Réessayer</Button>
    </main>
  );
};

export default ErrorPage;
