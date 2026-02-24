import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, Mail, Zap, BarChart3, Shield, Workflow } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-6 py-20">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Gestión de Contactos Inteligente
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              Centro centralizado para organizar, filtrar y realizar seguimiento
              de tus contactos. Sin complicaciones.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 md:flex-row md:justify-center pt-4">
            <Link to="/login">
              <Button size="lg">Comenzar Ahora</Button>
            </Link>
            <Button size="lg" variant="outline">
              Ver Demo
            </Button>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground">
            Trusted by sales teams worldwide • Enterprise-ready • 99.9% uptime
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Todo lo que necesitas
            </h2>
            <p className="text-lg text-muted-foreground">
              Funcionalidades diseñadas para mejorar tu productividad
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Users className="size-8 text-primary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <CardTitle>Gestión Centralizada</CardTitle>
                    <CardDescription>
                      Organiza todos tus contactos en un único lugar. Acceso
                      instantáneo a toda la información.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Mail className="size-8 text-primary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <CardTitle>Seguimiento Eficiente</CardTitle>
                    <CardDescription>
                      Registra interacciones, notas y cambios de estado. Nunca
                      pierdas un detalle importante.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <BarChart3 className="size-8 text-primary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <CardTitle>Análisis en Tiempo Real</CardTitle>
                    <CardDescription>
                      Visualiza métricas de tus contactos. Toma decisiones
                      basadas en datos.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Workflow className="size-8 text-primary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <CardTitle>Flujos de Trabajo</CardTitle>
                    <CardDescription>
                      Automatiza procesos repetitivos. Optimiza tu equipo para
                      máxima eficiencia.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Shield className="size-8 text-primary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <CardTitle>Seguridad Enterprise</CardTitle>
                    <CardDescription>
                      Protección de datos de nivel empresarial. Cumplimiento de
                      estándares internacionales.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Zap className="size-8 text-primary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <CardTitle>Rendimiento Rápido</CardTitle>
                    <CardDescription>
                      Respuesta instantánea. Interfaz optimizada para máxima
                      velocidad.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Construido con Tecnología Moderna
            </h2>
            <p className="text-muted-foreground">
              Stack de última generación para garantizar confiabilidad y
              rendimiento
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React 18",
              "TypeScript",
              "Node.js",
              "MongoDB",
              "Tailwind CSS",
              "Docker",
            ].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-full bg-background border border-border hover:border-primary transition-colors"
              >
                <span className="font-medium text-sm">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Listo para transformar tu gestión de contactos?
          </h2>
          <p className="text-lg text-muted-foreground">
            Únete a equipos de ventas que ya están mejorando su productividad
            con ControlaCRM.
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:justify-center pt-4">
            <Link to="/login">
              <Button size="lg">Comenzar Gratis</Button>
            </Link>
            <Button size="lg" variant="outline">
              Programar Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-2">
            <p className="font-semibold">ControlaCRM</p>
            <p className="text-sm text-muted-foreground">
              © 2026 ControlaCRM. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
