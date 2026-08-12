"use client";

import { useState } from "react";
import { GitHub } from "react-feather";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { defaultRedirectAfterLogin } from "@/config/routes.config";
import type { TAuthMode } from "@/features/auth/types/auth.types";
import type { TSocialProvider } from "@/lib/better-auth/auth.types";
import { authClient } from "@/lib/better-auth/auth-client";

export type TSocialAuthButtonsProps = {
  /** Adapte les libellés : « Se connecter avec » ou « S'inscrire avec ». */
  mode: TAuthMode;
};

/** Logo Google officiel, en SVG inline pour éviter une requête réseau. */
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="size-4.5" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.7l7.8 6.1C12.3 13.9 17.7 9.5 24 9.5Z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5Z"
    />
    <path
      fill="#FBBC05"
      d="M10.4 28.2c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C1 15.9 0 19.8 0 23.5s1 7.6 2.6 10.8l7.8-6.1Z"
    />
    <path
      fill="#34A853"
      d="M24 47.5c6.2 0 11.5-2 15.4-5.6l-7.5-5.8c-2.1 1.4-4.8 2.2-7.9 2.2-6.3 0-11.7-4.4-13.6-10.3l-7.8 6.1C6.5 42.1 14.6 47.5 24 47.5Z"
    />
  </svg>
);

/**
 * Boutons de connexion via un fournisseur externe.
 *
 * La redirection est déléguée à Better Auth (`callbackURL`) : la navigation
 * quitte l'application, aucun état local n'a donc besoin d'être restauré.
 *
 * @example
 * ```tsx
 * <SocialAuthButtons mode="register" />
 * ```
 */
export const SocialAuthButtons = ({ mode }: TSocialAuthButtonsProps) => {
  const [pendingProvider, setPendingProvider] =
    useState<TSocialProvider | null>(null);

  const label = mode === "login" ? "Se connecter avec" : "S'inscrire avec";

  const handleSignIn = async (provider: TSocialProvider) => {
    setPendingProvider(provider);

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: defaultRedirectAfterLogin,
    });

    if (error) {
      // Le fournisseur n'est pas configuré ou a refusé la demande.
      toast.error(
        error.message ?? "La connexion avec ce fournisseur est indisponible.",
      );
      setPendingProvider(null);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button
        variant="outline"
        onClick={() => handleSignIn("google")}
        isLoading={pendingProvider === "google"}
        disabled={pendingProvider !== null}
        leftIcon={<GoogleIcon />}
      >
        {label} Google
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSignIn("github")}
        isLoading={pendingProvider === "github"}
        disabled={pendingProvider !== null}
        leftIcon={<GitHub className="size-4.5" />}
      >
        {label} GitHub
      </Button>
    </div>
  );
};
