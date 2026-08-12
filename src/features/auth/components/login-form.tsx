/** @format */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { defaultRedirectAfterLogin, routes } from "@/config/routes.config";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { loginAction } from "@/features/auth/server/actions/auth.action";
import { useSafeForm } from "@/lib/safe-form/use-safe-form";
import { SocialAuthButtons } from "./social-auth-buttons";

/**
 * Formulaire de connexion par e-mail et mot de passe.
 *
 * La validation est faite deux fois avec le même schéma Zod : côté client par
 * React Hook Form pour un retour immédiat, côté serveur par `next-safe-form`
 * car le navigateur n'est jamais une source de confiance.
 */
export const LoginForm = () => {
  const router = useRouter();

  const { register, getFieldError, onSubmit, isPending } = useSafeForm({
    schema: loginSchema,
    action: loginAction,
    defaultValues: { email: "", password: "", rememberMe: false },
    onSuccess: () => {
      toast.success("Connexion réussie. Bon retour parmi nous !");
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
          Connexion à votre compte
        </h1>
        <p className="text-sm text-muted">
          Retrouvez votre espace en quelques secondes.
        </p>
      </header>

      <SocialAuthButtons mode="login" />

      <Separator label="Ou avec un e-mail" />

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
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

        <FormField name="password" error={getFieldError("password")}>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            hasError={Boolean(getFieldError("password"))}
            {...register("password")}
          />
        </FormField>

        <div className="flex items-center justify-between">
          <Checkbox label="Se souvenir de moi" {...register("rememberMe")} />
          <span className="text-sm text-muted">Mot de passe oublié ?</span>
        </div>

        <Button type="submit" size="lg" fullWidth isLoading={isPending}>
          Se connecter
        </Button>
      </form>

      <p className="text-center text-sm text-ink-600">
        Pas encore de compte ?{" "}
        <Link
          href={routes.auth.register}
          className="font-medium text-primary hover:underline"
        >
          Créer un compte
        </Link>
      </p>
    </div>
  );
};
