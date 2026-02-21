import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">ControlaCRM</h1>
      <p className="text-lg text-gray-600">Sistema de Gestión de Contactos</p>
      <Link to="/login">
        <Button>Iniciar Sesión</Button>
      </Link>
    </div>
  );
}
