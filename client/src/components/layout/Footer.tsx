import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Footer() {
  const { user } = useAuthStore();
  const currentYear = new Date().getFullYear();
  const isAuthenticated = !!user;

  if (isAuthenticated) return null;

  return (
    <footer className="border-t border-border/40 bg-linear-to-t from-background to-background/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-md">
                <span className="text-sm font-bold text-primary-foreground">
                  C
                </span>
              </div>
              <span className="font-semibold text-foreground tracking-tight">
                ControlaCRM
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gestiona tus contactos comerciales de manera eficiente y
              profesional.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-accent/50 transition-all duration-200"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-accent/50 transition-all duration-200"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-accent/50 transition-all duration-200"
              >
                <Twitter className="size-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground tracking-tight">
              Producto
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Características", href: "#features" },
                { label: "Documentación", href: "/docs" },
                { label: "Precios", href: "#pricing" },
                { label: "Historial", href: "#changelog" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground tracking-tight">
              Empresa
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Acerca de", href: "#about" },
                { label: "Blog", href: "/blog" },
                { label: "Carreras", href: "#careers" },
                { label: "Contacto", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground tracking-tight">
              Soporte
            </h3>
            <ul className="space-y-2.5">
              {[
                {
                  label: "Centro de Ayuda",
                  href: "#help",
                },
                { label: "Estado del Servicio", href: "#status" },
                { label: "Seguridad", href: "#security" },
                { label: "Término de Servicio", href: "#terms" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 md:my-12 h-px bg-border/30" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} ControlaCRM. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Política de Privacidad
            </a>
            <div className="hidden md:block w-px h-4 bg-border/30" />
            <a
              href="#terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Términos de Servicio
            </a>
            <div className="hidden md:block w-px h-4 bg-border/30" />
            <a
              href="mailto:support@controlacrm.com"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Mail className="size-4" />
              <span className="hidden sm:inline">support@controlacrm.com</span>
              <span className="sm:hidden">Contacto</span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/30 to-transparent" />
    </footer>
  );
}
