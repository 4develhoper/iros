"use client";

import { useRouter } from "next/navigation";
import { useSafeActionForm } from "next-safe-form";
import { LogOut } from "react-feather";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes.config";
import { logoutAction } from "@/features/auth/server/actions/auth.action";

export type TSignOutButtonProps = {
  /** Style visuel du bouton. @default "ghost" */
  variant?: "ghost" | "outline";
};

/**
 * Bouton de déconnexion.
 *
 * Aucun champ à saisir : `useSafeActionForm` est utilisé directement, sans
 * React Hook Form. Le `<form action>` natif conserve l'amélioration
 * progressive — la déconnexion fonctionne même sans JavaScript.
 */
export const SignOutButton = ({ variant = "ghost" }: TSignOutButtonProps) => {
  const router = useRouter();

  const { formAction, isPending } = useSafeActionForm<{ success: boolean }>({
    action: logoutAction,
    initialValues: { success: false },
    onSuccess: () => {
      router.push(routes.auth.login);
      router.refresh();
    },
    onError: (message: string) => toast.error(message),
  });

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant={variant}
        size="sm"
        isLoading={isPending}
        leftIcon={<LogOut className="size-4" />}
      >
        Se déconnecter
      </Button>
    </form>
  );
};
