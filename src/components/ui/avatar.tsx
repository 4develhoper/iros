import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { getInitials } from "@/lib/utils/format";

/** Tailles disponibles pour l'avatar. */
export type TAvatarSize = "xs" | "sm" | "md" | "lg";

export type TAvatarProps = {
  /** Nom complet, utilisé pour le `alt` et les initiales de repli. */
  name: string;
  /** URL de la photo de profil. Absente, les initiales sont affichées. */
  src?: string | null;
  /** Gabarit. @default "md" */
  size?: TAvatarSize;
  className?: string;
};

const SIZE_CLASSES: Record<TAvatarSize, string> = {
  xs: "size-7 text-[10px]",
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-16 text-lg",
};

const SIZE_PIXELS: Record<TAvatarSize, number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 64,
};

/**
 * Photo de profil circulaire, avec repli sur les initiales.
 *
 * @example
 * ```tsx
 * <Avatar name="Alesia Karapova" src={user.image} size="sm" />
 * ```
 */
export const Avatar = ({ name, src, size = "md", className }: TAvatarProps) => (
  <span
    className={cn(
      "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 font-medium text-primary-700 select-none",
      SIZE_CLASSES[size],
      className,
    )}
  >
    {src ? (
      <Image
        src={src}
        alt={name}
        width={SIZE_PIXELS[size]}
        height={SIZE_PIXELS[size]}
        className="size-full object-cover"
      />
    ) : (
      <span aria-hidden="true">{getInitials(name)}</span>
    )}
    {src ? null : <span className="sr-only">{name}</span>}
  </span>
);
