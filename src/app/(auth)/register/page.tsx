import type { Metadata } from "next";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Créer un compte",
  description: "Créez votre compte en quelques secondes.",
};

/**
 * Page d'inscription.
 *
 * Composant serveur statique : le formulaire est le seul îlot client.
 */
const RegisterPage = () => (
  <AuthLayout
    showcaseTitle="Rapide, simple et fiable"
    showcaseDescription="Créez votre compte et démarrez immédiatement : authentification, base de données et interface sont déjà en place."
  >
    <RegisterForm />
  </AuthLayout>
);

export default RegisterPage;
