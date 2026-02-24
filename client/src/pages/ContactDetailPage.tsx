import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit2, Ban, Mail, Phone, FileText } from "lucide-react";

export default function ContactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await api.get(`/contacts/${id}`);
        setContact(response.data.data);
        setError(null);
      } catch (err) {
        const message =
          err.response?.data?.message || "Error al cargar el contacto";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleEdit = () => {
    navigate(`/contacts/${id}/edit`);
  };

  const handleDeactivate = () => {
    // TODO: Open DeleteContactModal
    console.log("TODO: Open delete modal for contact:", id);
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
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Cargando contacto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => navigate("/contacts")}>Volver</Button>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">Contacto no encontrado</p>
        <Button onClick={() => navigate("/contacts")}>Volver</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/contacts")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Detalle del Contacto
            </h1>
            <p className="text-sm text-muted-foreground">
              Visualiza y gestiona la información del contacto
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
          <div className="space-y-6 p-8">
            {/* Contact Header Section */}
            <div className="flex items-start justify-between border-b border-border/30 pb-6">
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">Nombre completo</p>
                <p className="text-2xl font-bold tracking-tight">
                  {contact.firstName} {contact.lastName}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2">
                {getStatusBadge(contact.status)}
              </div>
            </div>

            {/* Contact Info - Email and Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-4">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <p className="text-sm font-medium break-all">
                    {contact.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-4">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Teléfono
                  </label>
                  <p className="text-sm font-medium">{contact.phone || "—"}</p>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {contact.notes && (
              <div className="rounded-lg bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Notas
                    </label>
                    <p className="text-sm font-medium whitespace-pre-wrap">
                      {contact.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Grid - Metadata */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Estado
                </label>
                <p className="text-base font-medium">
                  {getStatusBadge(contact.status)}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Creado
                </label>
                <p className="text-base font-medium text-foreground/70">
                  {contact.createdAt
                    ? new Date(contact.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "—"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Última actualización
                </label>
                <p className="text-base font-medium text-foreground/70">
                  {contact.updatedAt
                    ? new Date(contact.updatedAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/30" />

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleEdit} className="flex-1 gap-2">
                <Edit2 className="h-4 w-4" />
                Editar Contacto
              </Button>
              <Button
                onClick={handleDeactivate}
                variant="destructive"
                className="flex-1 gap-2"
              >
                <Ban className="h-4 w-4" />
                Desactivar
              </Button>
            </div>
          </div>
        </Card>

        {/* Back Link */}
        <div className="flex justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/contacts")}
            className="text-muted-foreground hover:text-foreground"
          >
            Volver a la lista de contactos
          </Button>
        </div>
      </div>
    </div>
  );
}
