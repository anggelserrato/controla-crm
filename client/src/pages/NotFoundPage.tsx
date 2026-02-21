import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg text-gray-600">Página no encontrada</p>
      <Link to="/">
        <Button>Volver a Inicio</Button>
      </Link>
    </div>
  );
}
