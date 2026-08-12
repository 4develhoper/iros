"use client";

import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { Input, type TInputProps } from "./input";

export type TPasswordInputProps = Omit<TInputProps, "type" | "endAdornment">;

/**
 * Champ mot de passe avec bascule d'affichage.
 *
 * Composant client : l'état de visibilité vit dans le navigateur. Il reste
 * compatible avec `register()` de React Hook Form puisque toutes les props
 * inconnues sont transmises à l'`<input>` sous-jacent.
 *
 * @example
 * ```tsx
 * <PasswordInput placeholder="Mot de passe" {...register("password")} />
 * ```
 */
export const PasswordInput = ({ ...props }: TPasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      type={isVisible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setIsVisible((previous) => !previous)}
          aria-label={
            isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
          aria-pressed={isVisible}
          className="flex size-9 items-center justify-center rounded-md text-ink-400 transition-colors hover:text-ink-600 [&_svg]:size-4.5"
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </button>
      }
      {...props}
    />
  );
};
