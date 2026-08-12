/** @format */

import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";
import { SessionExpiredNotice } from "@/features/auth/components/session-expired-notice";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre espace.",
};

/**
 * Page de connexion.
 *
 * Composant serveur statique : seule l'interactivité du formulaire vit côté
 * client. La redirection des utilisateurs déjà connectés est prise en charge
 * par `src/proxy.ts`.
 *
 * `SessionExpiredNotice` lit les paramètres d'URL : il est isolé dans un
 * `<Suspense>` pour que le reste de la page demeure prérendu.
 */
const LoginPage = () => (
  <AuthLayout
    showcaseTitle="Rapide, simple et fiable"
    showcaseDescription="Retrouvez votre tableau de bord, vos données et vos équipes en un instant. Une base solide pour vos prochains projets."
  >
    <Suspense fallback={null}>
      <SessionExpiredNotice />
    </Suspense>

    <LoginForm />
  </AuthLayout>
);

export default LoginPage;
