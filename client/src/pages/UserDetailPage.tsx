import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Edit2, Trash2, Mail, Shield } from "lucide-react";

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.data);
        setError(null);
      } catch (err) {
        const message =
          err.response?.data?.message || "Error al cargar el usuario";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = () => {
    // TODO: Open DeleteUserModal
    console.log("TODO: Open delete modal for user:", id);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Cargando usuario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => navigate("/users")}>Volver</Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">Usuario no encontrado</p>
        <Button onClick={() => navigate("/users")}>Volver</Button>
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
            onClick={() => navigate("/users")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Detalle del Usuario
            </h1>
            <p className="text-sm text-muted-foreground">
              Visualiza y gestiona la información del usuario
            </p>
          </div>
        </div>

        {/* User Card */}
        <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
          <div className="space-y-6 p-8">
            {/* User Header Section */}
            <div className="flex items-start justify-between border-b border-border/30 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-semibold tracking-tight">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2">
                <Shield className="h-4 w-4 text-secondary-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                  {user.role === "admin" ? "Admin" : "Sales"}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Rol
                </label>
                <p className="text-base font-medium capitalize">
                  {user.role === "admin" ? "Admin" : "Sales"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Estado
                </label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-base font-medium">Activo</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Creado
                </label>
                <p className="text-base font-medium text-foreground/70">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("es-ES", {
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
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("es-ES", {
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
                Editar Usuario
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="flex-1 gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </div>
        </Card>

        {/* Back Link */}
        <div className="flex justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/users")}
            className="text-muted-foreground hover:text-foreground"
          >
            Volver a la lista de usuarios
          </Button>
        </div>
      </div>
    </div>
  );
}
