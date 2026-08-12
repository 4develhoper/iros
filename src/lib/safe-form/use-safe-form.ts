/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSafeActionForm } from "next-safe-form";
import { startTransition } from "react";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import type { z } from "zod";
import { toFormData } from "./form-schema";
import type { TSafeAction } from "./safe-form.types";

export type TUseSafeFormOptions<
  TValues extends FieldValues,
  TOutput extends FieldValues,
  TData,
> = {
  /**
   * Schéma partagé entre la validation client et la validation serveur.
   *
   * Il décrit les valeurs **d'entrée** du formulaire : les transformations
   * (`"on"` vers `true`, par exemple) ne s'appliquent qu'à la sortie, côté
   * serveur.
   */
  schema: z.ZodType<TOutput, TValues>;
  /** Server Action à déclencher une fois la validation client passée. */
  action: TSafeAction<TData>;
  /** Valeurs initiales du formulaire. */
  defaultValues: DefaultValues<TValues>;
  /** Appelé avec la charge utile renvoyée par le handler serveur. */
  onSuccess?: (data: TData) => void;
  /** Appelé avec le message d'erreur serveur (hors erreurs de champ). */
  onError?: (message: string) => void;
  /** Réinitialise le formulaire après un succès. @default false */
  resetOnSuccess?: boolean;
};

/**
 * Relie React Hook Form à `next-safe-form`.
 *
 * Les deux bibliothèques sont complémentaires mais ne se parlent pas :
 * - React Hook Form valide immédiatement dans le navigateur et gère l'état des
 *   champs ;
 * - `next-safe-form` revalide côté serveur avec **le même schéma Zod** et
 *   renvoie des erreurs normalisées (par champ ou globales).
 *
 * Ce hook fait le pont : la soumission n'est transmise au serveur que si la
 * validation client passe, les valeurs sont converties en `FormData`, et les
 * erreurs des deux origines sont fusionnées par `getFieldError`.
 *
 * @example
 * ```tsx
 * const { register, getFieldError, onSubmit, isPending } = useSafeForm({
 *   schema: loginSchema,
 *   action: loginAction,
 *   defaultValues: { email: "", password: "", rememberMe: false },
 *   onSuccess: () => router.push("/starter"),
 *   onError: (message) => toast.error(message),
 * });
 *
 * <form onSubmit={onSubmit} noValidate>…</form>
 * ```
 */
export const useSafeForm = <
  TValues extends FieldValues,
  TOutput extends FieldValues,
  TData,
>({
  schema,
  action,
  defaultValues,
  onSuccess,
  onError,
  resetOnSuccess = false,
}: TUseSafeFormOptions<TValues, TOutput, TData>) => {
  const form = useForm<TValues, unknown, TOutput>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    formAction,
    isPending,
    fieldsErrors,
    serverError,
    isSuccess,
    resetState,
  } = useSafeActionForm<TData>({
    action,
    // La bibliothèque réutilise le même paramètre de type pour les valeurs
    // initiales et pour la charge utile de succès. Les valeurs initiales ne
    // sont jamais relues ici : seul `onSuccess` est exploité.
    initialValues: defaultValues as unknown as TData,
    onSuccess: (data) => {
      if (resetOnSuccess) {
        form.reset(defaultValues);
      }
      onSuccess?.(data);
    },
    onError: (message: string) => onError?.(message),
    resetOnSuccess,
  });

  /**
   * Retourne le message d'erreur d'un champ.
   *
   * L'erreur client est prioritaire : elle décrit la saisie en cours, alors que
   * la réponse du serveur porte sur la soumission précédente.
   *
   * @param name - Nom du champ, tel que passé à `register`.
   */
  const getFieldError = (name: keyof TValues & string): string | undefined => {
    const clientError = form.formState.errors[name]?.message;

    return typeof clientError === "string" ? clientError : fieldsErrors?.[name];
  };

  /**
   * Gestionnaire à brancher sur `<form onSubmit>`.
   *
   * La Server Action n'est déclenchée que si la validation client réussit.
   *
   * L'appel est encapsulé dans `startTransition` : la soumission passant par
   * React Hook Form et non par la prop `action` du `<form>`, React ne l'ouvre
   * pas lui-même. Sans cette transition, `isPending` ne se mettrait pas à jour
   * et React émettrait un avertissement.
   */
  const onSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      formAction(toFormData(values));
    });
  });

  return {
    ...form,
    getFieldError,
    onSubmit,
    isPending,
    serverError,
    isSuccess,
    resetState,
  };
};
