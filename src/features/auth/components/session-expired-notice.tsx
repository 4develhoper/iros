"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { SESSION_EXPIRED_PARAM } from "@/config/routes.config";

/**
 * Prévient l'utilisateur que sa session a expiré.
 *
 * Sans ce message, un visiteur éjecté d'une page protégée réapparaîtrait sur la
 * page de connexion sans explication.
 *
 * `useSearchParams` rend le composant dynamique : sous `cacheComponents`, il
 * doit être rendu dans une frontière `<Suspense>` pour que la page de connexion
 * reste prérendue.
 */
export const SessionExpiredNotice = () => {
  const searchParams = useSearchParams();
  const hasNotified = useRef(false);

  const isSessionExpired = searchParams.has(SESSION_EXPIRED_PARAM);

  useEffect(() => {
    // Le garde évite un second toast lors des re-rendus de développement.
    if (!isSessionExpired || hasNotified.current) return;

    hasNotified.current = true;
    toast("Votre session a expiré. Merci de vous reconnecter.", { icon: "🔒" });
  }, [isSessionExpired]);

  return null;
};
