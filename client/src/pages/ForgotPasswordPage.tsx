import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperar Contraseña</CardTitle>
          <CardDescription>Solicita una nueva contraseña</CardDescription>
        </CardHeader>
        <div className="space-y-6 px-6 pb-6">
          {/* Alert */}
          <div className="flex gap-4 rounded-lg bg-muted p-4">
            <AlertCircle className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold text-sm">Función no disponible</p>
              <p className="text-sm text-muted-foreground">
                La recuperación de contraseña estará disponible próximamente.
                Por favor, contacta al administrador si necesitas ayuda.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Link to="/" className="block">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="size-4" />
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
