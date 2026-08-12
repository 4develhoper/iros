"use client";

import { useState } from "react";
import { Download, Heart, Star } from "react-feather";
import toast from "react-hot-toast";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { LinkButton } from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes.config";

/** Petit titre de section interne à la galerie. */
const ShowcaseGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <p className="text-xs font-medium tracking-wide text-ink-400 uppercase">
      {title}
    </p>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

/**
 * Galerie des composants natifs du design system.
 *
 * Sert de référence visuelle pendant le développement : chaque nouveau
 * composant ajouté à `components/ui` devrait y apparaître.
 */
export const UiShowcase = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ShowcaseGroup title="Boutons">
        <Button>Primaire</Button>
        <Button variant="secondary">Secondaire</Button>
        <Button variant="outline">Contour</Button>
        <Button variant="ghost">Discret</Button>
        <Button variant="danger">Danger</Button>
        <Button isLoading>Chargement</Button>
      </ShowcaseGroup>

      <ShowcaseGroup title="Icônes et liens">
        <IconButton icon={<Heart />} label="Ajouter aux favoris" />
        <IconButton icon={<Download />} label="Télécharger" variant="outline" />
        <LinkButton href={routes.public.landing} variant="outline" size="sm">
          Retour à l'accueil
        </LinkButton>
      </ShowcaseGroup>

      <ShowcaseGroup title="Badges et avatars">
        <Badge>Neutre</Badge>
        <Badge variant="primary">Primaire</Badge>
        <Badge variant="success">Succès</Badge>
        <Badge variant="warning">Attention</Badge>
        <Badge variant="danger">Danger</Badge>
        <Avatar name="Alesia Karapova" size="sm" />
        <Avatar name="Jean Dupont" />
      </ShowcaseGroup>

      <Separator label="Retours utilisateur" />

      <ShowcaseGroup title="Notifications et modale">
        <Button
          variant="outline"
          leftIcon={<Star className="size-4" />}
          onClick={() => toast.success("Notification de succès")}
        >
          Toast de succès
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Une erreur est survenue")}
        >
          Toast d'erreur
        </Button>
        <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
          Ouvrir une modale
        </Button>
      </ShowcaseGroup>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Boîte de dialogue"
        description="Construite sur l'élément natif <dialog>."
        footer={<Button onClick={() => setIsDialogOpen(false)}>Compris</Button>}
      >
        La fermeture par la touche Échap, le piège de focus et le fond inerte
        sont fournis par le navigateur.
      </Dialog>
    </div>
  );
};
