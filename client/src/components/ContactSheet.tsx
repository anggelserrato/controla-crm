import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
  contactId?: string;
}

export default function ContactSheet({
  isOpen,
  onClose,
  contactId,
}: ContactSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalle de Contacto</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-500">
            Por implementar en T-20. Contact ID: {contactId || "N/A"}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
