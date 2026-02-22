import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import api from "@/services/api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string({ message: "Campo requerido" })
    .min(8, { message: "Mínimo 8 caracteres" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("/auth/login", data);
      const { user, token } = response.data.data;
      login(user, token);
      toast.success("¡Bienvenido de nuevo!");
      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Credenciales incorrectas";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl">ControlaCRM</h1>
          <p className="text-sm">Inicia sesión para continuar</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@email.com"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 rounded-md p-3 text-sm ">
          <p className="font-semibold">Credenciales de prueba:</p>
          <p>Email: admin@example.com</p>
          <p>Contraseña: 123456</p>
        </div>
      </Card>
    </div>
  );
}
