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
import { AlertCircle } from "lucide-react";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  userName?: string;
  userEmail?: string;
  userId?: string;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  onDelete,
  userName,
  userEmail,
  userId,
}: DeleteUserModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (!userId) return;

    try {
      setIsDeleting(true);
      await api.delete(`/users/${userId}`);
      toast.success("¡Usuario eliminado exitosamente!");
      onDelete?.();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error && "response" in error
          ? (error as any).response?.data?.message
          : "Error al eliminar el usuario";
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
                Eliminar Usuario
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Esta acción no se puede deshacer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 py-4 border-t border-b border-border/30">
          <div className="rounded-lg bg-destructive/5 p-4">
            <p className="text-sm font-medium">
              Eliminando a:{" "}
              <strong>{userName || userEmail || "este usuario"}</strong>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
