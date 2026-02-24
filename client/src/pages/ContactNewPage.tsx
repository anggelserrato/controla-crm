import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
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
import { ArrowLeft } from "lucide-react";

const contactSchema = z.object({
  firstName: z
    .string({ message: "Campo requerido" })
    .min(2, { message: "Mínimo 2 caracteres" }),
  lastName: z
    .string({ message: "Campo requerido" })
    .min(2, { message: "Mínimo 2 caracteres" }),
  email: z.email({ message: "Email inválido" }),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export default function ContactNewPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/contacts", data);
      toast.success("¡Contacto creado exitosamente!");
      navigate("/contacts");
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al crear el contacto";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/contacts")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Nuevo Contacto
            </h1>
            <p className="text-sm text-muted-foreground">
              Agrega un nuevo contacto a tu lista
            </p>
          </div>
        </div>

        {/* Formulario */}
        <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Row: Nombre y Apellido */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Nombre */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Nombre
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Juan"
                            className="h-10 bg-muted/30 transition-all focus:bg-muted/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Apellido */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Apellido
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Pérez"
                            className="h-10 bg-muted/30 transition-all focus:bg-muted/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
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
                          placeholder="juan@ejemplo.com"
                          type="email"
                          autoComplete="email"
                          className="h-10 bg-muted/30 transition-all focus:bg-muted/50"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Dirección de correo del contacto
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Teléfono */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Teléfono (Opcional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+34 123 456 789"
                          type="tel"
                          className="h-10 bg-muted/30 transition-all focus:bg-muted/50"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Número de teléfono del contacto
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notas */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Notas (Opcional)
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Agrega notas o detalles adicionales..."
                          rows={4}
                          className="w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-foreground shadow-xs transition-all focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring focus:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Divider */}
                <div className="border-t border-border/30" />

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="flex-1"
                  >
                    {form.formState.isSubmitting
                      ? "Creando..."
                      : "Crear Contacto"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/contacts")}
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
            <span className="font-semibold text-foreground">Tip:</span> Completa
            los campos requeridos (nombre, apellido, email). Teléfono y notas
            son opcionales.
          </p>
        </div>
      </div>
    </div>
  );
}
