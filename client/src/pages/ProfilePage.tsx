import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-sm text-muted-foreground">
            Información de tu cuenta
          </p>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
            <CardDescription>Detalles del usuario autenticado</CardDescription>
          </CardHeader>
          <div className="space-y-4 px-6 pb-6">
            {/* Email Display */}
            <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
              <Mail className="size-6 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Correo electrónico
                </p>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Role Display */}
            <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
              <Shield className="size-6 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Rol</p>
                <p className="font-semibold capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
