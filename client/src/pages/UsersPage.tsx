import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2 } from "lucide-react";

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/users");
        const apiUsers = response.data.data || [];
        const transformedUsers = apiUsers.map((u) => ({
          id: u._id,
          email: u.email,
          role: u.role,
        }));
        setUsers(transformedUsers);
      } catch (err) {
        const message =
          err.response?.data?.message || "Error al cargar usuarios";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log("Eliminar usuario con ID:", userId);
  };

  const handleEdit = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Cargando usuarios...</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
            <p className="text-sm text-muted-foreground">
              Gestiona los usuarios del sistema
            </p>
          </div>
          <Button onClick={() => navigate("/users/new")}>
            + Nuevo Usuario
          </Button>
        </div>

        {/* Tabla de usuarios */}
        <Card>
          {users.length === 0 ? (
            <div className="flex items-center justify-center p-12">
              <p className="text-sm text-muted-foreground">
                No hay usuarios registrados
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-foreground">{u.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            u.role === "admin"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-accent text-accent-foreground"
                          }`}
                        >
                          {u.role === "admin" ? "Admin" : "Sales"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(u.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">
                              Editar
                            </span>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(u.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">
                              Eliminar
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
      </div>
    </div>
  );
}
