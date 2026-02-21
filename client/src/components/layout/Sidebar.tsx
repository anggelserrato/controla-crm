import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { LayoutDashboard, Users, Contact, LogOut } from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-sidebar-bg">
      {/* Logo / Brand */}
      <div className="border-b px-6 py-6">
        <h1 className="text-2xl font-bold text-primary">ControlaCRM</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Contact size={20} />
          Contactos
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Users size={20} />
            Usuarios
          </NavLink>
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t px-4 py-6">
        <div className="mb-4 space-y-1">
          <p className="text-sm font-medium text-gray-900">{user?.email}</p>
          <p className="text-xs capitalize text-gray-600">{user?.role}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
}
