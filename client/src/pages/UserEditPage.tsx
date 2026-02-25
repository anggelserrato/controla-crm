import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
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
import { ArrowLeft, Loader2 } from "lucide-react";

const userEditSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres").or(z.literal("")),
  role: z.enum(["admin", "sales"]),
});

type UserEditFormData = z.infer<typeof userEditSchema>;

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const form = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "sales",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        const user = response.data.data;
        form.reset({
          email: user.email,
          password: "",
          role: user.role,
        });
      } catch (error) {
        const message =
          error.response?.data?.message || "Error al cargar el usuario";
        toast.error(message);
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, form, navigate]);

  const onSubmit = async (data: UserEditFormData) => {
    try {
      const payload = { ...data };
      if (!payload.password) {
        delete payload.password;
      }
      await api.put(`/users/${id}`, payload);
      toast.success("¡Usuario actualizado exitosamente!");
      navigate(`/users/${id}`);
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al actualizar el usuario";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Cargando formulario...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/10 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/users/${id}`)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Editar Usuario
            </h1>
            <p className="text-sm text-muted-foreground">
              Actualiza la información del usuario
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="usuario@example.com"
                          type="email"
                          autoComplete="email"
                          className="h-10 bg-muted/30 transition-all focus:bg-muted/50"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        La dirección de correo electrónico del usuario
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Contraseña (Opcional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          autoComplete="new-password"
                          className="h-10 bg-muted/30 transition-all focus:bg-muted/50"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Déjalo en blanco para mantener la contraseña actual
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Rol
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-foreground shadow-xs transition-all focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring focus:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="sales">Sales</option>
                          <option value="admin">Admin</option>
                        </select>
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Asigna el rol de acceso del usuario
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Divider */}
                <div className="border-t border-border/30" />

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="flex-1 gap-2"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar Cambios"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/users/${id}`)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>

        {/* Help Text */}
        <div className="rounded-lg border border-border/30 bg-muted/20 p-4 backdrop-blur-sm">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Tip:</span> Si
            cambias el rol, los permisos del usuario se actualizarán
            inmediatamente en su próxima sesión.
          </p>
        </div>
      </div>
    </div>
  );
}
