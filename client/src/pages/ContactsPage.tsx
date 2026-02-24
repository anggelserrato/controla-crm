import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit2, Ban } from "lucide-react";
import DeleteContactModal from "@/components/DeleteContactModal";

export default function ContactsPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContactForDelete, setSelectedContactForDelete] =
    useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/contacts");
        const apiContacts = response.data.data || [];

        // Filtrar solo contactos activos (excluir inactivos)
        const activeContacts = apiContacts
          .filter((c) => c.status !== "INACTIVE")
          .map((c) => ({
            id: c._id,
            firstName: c.firstName,
            lastName: c.lastName,
            email: c.email,
            phone: c.phone,
            status: c.status,
          }));

        setContacts(activeContacts);
      } catch (err) {
        const message =
          err.response?.data?.message || "Error al cargar contactos";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleView = (contactId) => {
    navigate(`/contacts/${contactId}`);
  };

  const handleEdit = (contactId) => {
    navigate(`/contacts/${contactId}/edit`);
  };

  const handleDeactivate = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    setSelectedContactForDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    setContacts((prev) =>
      prev.filter((c) => c.id !== selectedContactForDelete?.id),
    );
    setSelectedContactForDelete(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      NEW: {
        bg: "bg-primary/10",
        text: "text-primary",
        label: "Nuevo",
      },
      CONTACTED: {
        bg: "bg-secondary/10",
        text: "text-secondary-foreground",
        label: "Contactado",
      },
      INTERESTED: {
        bg: "bg-accent/10",
        text: "text-accent-foreground",
        label: "Interesado",
      },
      QUALIFIED: {
        bg: "bg-primary/5",
        text: "text-primary",
        label: "Calificado",
      },
      INACTIVE: {
        bg: "bg-muted/50",
        text: "text-muted-foreground",
        label: "Inactivo",
      },
    };

    const config = statusConfig[status] || statusConfig.NEW;
    return (
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Cargando contactos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <p className="text-sm text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Contactos</h1>
            <p className="text-sm text-muted-foreground">
              Gestiona tus contactos y seguimiento
            </p>
          </div>
          <Button onClick={() => navigate("/contacts/new")}>
            + Nuevo Contacto
          </Button>
        </div>

        {/* Tabla de contactos */}
        <Card>
          {contacts.length === 0 ? (
            <div className="flex items-center justify-center p-12">
              <p className="text-sm text-muted-foreground">
                No hay contactos registrados
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground">
                        {c.firstName} {c.lastName}
                      </td>
                      <td className="px-6 py-4 text-foreground">{c.email}</td>
                      <td className="px-6 py-4 text-foreground">{c.phone}</td>
                      <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(c.id)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">Ver</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(c.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">
                              Editar
                            </span>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeactivate(c.id)}
                          >
                            <Ban className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">
                              Desactivar
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Delete Modal */}
        {selectedContactForDelete && (
          <DeleteContactModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedContactForDelete(null);
            }}
            onDelete={handleDeleteSuccess}
            contactName={`${selectedContactForDelete.firstName} ${selectedContactForDelete.lastName}`}
            contactId={selectedContactForDelete.id}
          />
        )}
      </div>
    </div>
  );
}
