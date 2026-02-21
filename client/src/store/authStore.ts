import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  role: "admin" | "sales";
}

interface RawUser {
  _id: string;
  email: string;
  role: "admin" | "sales";
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (rawUser: RawUser, token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (rawUser, token) => {
        const { _id, ...rest } = rawUser;
        set({
          user: { id: _id, ...rest },
          token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      initAuth: () => {
        // Este método es llamado al montar la app para validar que la sesión
        // persistida en localStorage sea válida.
        // Por ahora es un no-op ya que no hay expiración en el store.
        // En el futuro aquí se podría validar sesión con el servidor.
        const state = useAuthStore.getState();
        if (state.user && state.token && state.isAuthenticated) {
          // La sesión se recuperó del localStorage automáticamente por persist.
          // Aquí podrías hacer una validación con el servidor si es necesario.
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
