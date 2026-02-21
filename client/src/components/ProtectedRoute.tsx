import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  roles?: Array<"admin" | "sales">;
}

export default function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // Si no está autenticado, redirige a login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles y el usuario no tiene el rol requerido, redirige a dashboard
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
