import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName?: string;
  contactId?: string;
}

export default function DeleteContactModal({
  isOpen,
  onClose,
  contactName,
  contactId,
}: DeleteContactModalProps) {
  const handleDelete = () => {
    // Por implementar en T-21
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Contacto</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar a{" "}
            {contactName || "este contacto"}? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Por implementar en T-21. Contact ID: {contactId || "N/A"}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
