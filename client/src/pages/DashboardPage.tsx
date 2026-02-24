import { useAuthStore } from "@/store/authStore";
import { Navigate, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Contact } from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Bienvenido, {user.email}
          </h1>
          <p className="text-sm text-muted-foreground">
            Rol: <span className="font-semibold capitalize">{user.role}</span>
          </p>
        </div>

        {/* Quick Access */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Acceso rápido</h2>
            <p className="text-sm text-muted-foreground">
              Navega a los módulos principales del sistema
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Contactos - Visible para Admin y Sales */}
            <Link to="/contacts">
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Contact className="size-6 text-primary" />
                    <div className="flex-1">
                      <CardTitle>Contactos</CardTitle>
                      <CardDescription>Gestiona tus contactos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Usuarios - Solo visible para Admin */}
            {user.role === "admin" && (
              <Link to="/users">
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="size-6 text-primary" />
                      <div className="flex-1">
                        <CardTitle>Usuarios</CardTitle>
                        <CardDescription>Gestiona los usuarios</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            )}

            {/* Mi Perfil */}
            <Link to="/profile">
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {user.email[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <CardTitle>Mi Perfil</CardTitle>
                      <CardDescription>Edita tu información</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
