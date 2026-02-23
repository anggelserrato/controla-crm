import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(user.role)) {
    toast.error("No tienes permisos para acceder a esta sección", {
      id: "access-denied",
    });
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
