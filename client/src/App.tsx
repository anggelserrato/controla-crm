import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicLayout from "@/components/layout/PublicLayout";
import PrivateLayout from "@/components/layout/PrivateLayout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import DashboardPage from "@/pages/DashboardPage";
import ContactsPage from "@/pages/ContactsPage";
import ContactNewPage from "@/pages/ContactNewPage";
import ContactEditPage from "@/pages/ContactEditPage";
import UsersPage from "@/pages/UsersPage";
import UserNewPage from "@/pages/UserNewPage";
import UserEditPage from "@/pages/UserEditPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  const initAuth = useAuthStore((state) => {
    // Si initAuth existe en el store, lo obtenemos de ahí, sino retornamos un no-op
    return (state as any).initAuth || (() => {});
  });

  useEffect(() => {
    // Validar la sesión al montar la app (recargas de página)
    if (typeof initAuth === "function") {
      initAuth();
    }
  }, []);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Rutas privadas - todos los usuarios autenticados */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contacts/new" element={<ContactNewPage />} />
          <Route path="/contacts/:id/edit" element={<ContactEditPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Rutas privadas - solo Admin */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route element={<PrivateLayout />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/new" element={<UserNewPage />} />
          <Route path="/users/:id/edit" element={<UserEditPage />} />
        </Route>
      </Route>

      {/* Página no encontrada */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
