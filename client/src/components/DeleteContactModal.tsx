import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { AlertCircle, Loader2 } from "lucide-react";

interface DeleteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  contactName?: string;
  contactId?: string;
}

export default function DeleteContactModal({
  isOpen,
  onClose,
  onDelete,
  contactName,
  contactId,
}: DeleteContactModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!contactId) return;

    try {
      setIsDeleting(true);
      await api.delete(`/contacts/${contactId}`);
      toast.success("¡Contacto desactivado exitosamente!");
      onDelete?.();
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al desactivar el contacto";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-border/50 bg-card/80 backdrop-blur-sm">
        <DialogHeader className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-bold tracking-tight">
                Desactivar Contacto
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Esta acción no se puede deshacer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4 border-t border-b border-border/30">
          <div className="rounded-lg bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">
              {contactName
                ? `Desactivar a ${contactName}`
                : "Desactivar este contacto"}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              El contacto se marcará como inactivo y no aparecerá en la lista de
              contactos activos. Podrás reactivarlo más adelante si es
              necesario.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 sm:flex-none"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 sm:flex-none gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Desactivando...</span>
              </>
            ) : (
              <span>Desactivar Contacto</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
