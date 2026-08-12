"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { defaultRedirectAfterLogin, routes } from "@/config/routes.config";
import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { registerAction } from "@/features/auth/server/actions/auth.action";
import { useSafeForm } from "@/lib/safe-form/use-safe-form";
import { SocialAuthButtons } from "./social-auth-buttons";

/**
 * Formulaire de création de compte.
 *
 * Le prénom et le nom sont saisis séparément puis concaténés côté serveur dans
 * le champ `name` attendu par Better Auth.
 */
export const RegisterForm = () => {
  const router = useRouter();

  const { register, getFieldError, onSubmit, isPending } = useSafeForm({
    schema: registerSchema,
    action: registerAction,
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    onSuccess: () => {
      toast.success("Compte créé. Bienvenue !");
      router.push(defaultRedirectAfterLogin);
      // Rafraîchit les composants serveur pour qu'ils voient la session.
      router.refresh();
    },
    onError: (message) => toast.error(message),
  });

  return (
    <div className="w-full max-w-md space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-ink-900">
          Créer un compte
        </h1>
        <p className="text-sm text-muted">
          Quelques informations et vous êtes prêt à démarrer.
        </p>
      </header>

      <SocialAuthButtons mode="register" />

      <Separator label="Ou avec un e-mail" />

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField name="firstName" error={getFieldError("firstName")}>
            <Input
              id="firstName"
              autoComplete="given-name"
              placeholder="Prénom"
              hasError={Boolean(getFieldError("firstName"))}
              {...register("firstName")}
            />
          </FormField>

          <FormField name="lastName" error={getFieldError("lastName")}>
            <Input
              id="lastName"
              autoComplete="family-name"
              placeholder="Nom"
              hasError={Boolean(getFieldError("lastName"))}
              {...register("lastName")}
            />
          </FormField>
        </div>

        <FormField name="email" error={getFieldError("email")}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Adresse e-mail"
            hasError={Boolean(getFieldError("email"))}
            {...register("email")}
          />
        </FormField>

        <FormField
          name="password"
          error={getFieldError("password")}
          hint="8 caractères minimum."
        >
          <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder="Mot de passe"
            hasError={Boolean(getFieldError("password"))}
            {...register("password")}
          />
        </FormField>

        <p className="text-xs leading-relaxed text-muted">
          En créant un compte, vous acceptez notre{" "}
          <span className="font-medium text-ink-700">
            politique de confidentialité
          </span>{" "}
          et nos{" "}
          <span className="font-medium text-ink-700">
            conditions d'utilisation
          </span>
          .
        </p>

        <Button type="submit" size="lg" fullWidth isLoading={isPending}>
          Créer mon compte
        </Button>
      </form>

      <p className="text-center text-sm text-ink-600">
        Vous avez déjà un compte ?{" "}
        <Link
          href={routes.auth.login}
          className="font-medium text-primary hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
};
