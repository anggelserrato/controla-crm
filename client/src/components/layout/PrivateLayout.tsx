import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function PrivateLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal aumentable a la derecha */}
      <main className="flex-1 overflow-auto bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
