import { BarChart3, Mail, Shield, Users, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Section({ children, className = "", id = "", ariaLabel = "" }) {
  return (
    <section
      id={id || undefined}
      aria-label={ariaLabel || undefined}
      className={`px-6 py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-2 hover:border-primary transition-colors">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="size-8 text-primary shrink-0 mt-1">{icon}</div>
          <div className="text-left">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

function CTAButtons({ className = "" }) {
  return (
    <div
      className={`flex flex-col gap-3 md:flex-row md:justify-center ${className}`}
    >
      <a href="/login">
        <Button size="lg">Comenzar Ahora</Button>
      </a>
      <Button size="lg" variant="outline">
        Ver Demo
      </Button>
    </div>
  );
}

function TechBadge({ name }) {
  return (
    <div className="px-4 py-2 rounded-full bg-background border border-border hover:border-primary transition-colors">
      <span className="font-medium text-sm">{name}</span>
    </div>
  );
}

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="size-8" />,
      title: "Gestión Centralizada",
      description:
        "Organiza todos tus contactos en un único lugar. Acceso instantáneo a toda la información.",
    },
    {
      icon: <Mail className="size-8" />,
      title: "Seguimiento Eficiente",
      description:
        "Registra interacciones, notas y cambios de estado. Nunca pierdas un detalle importante.",
    },
    {
      icon: <BarChart3 className="size-8" />,
      title: "Análisis en Tiempo Real",
      description:
        "Visualiza métricas de tus contactos. Toma decisiones basadas en datos.",
    },
    {
      icon: <Workflow className="size-8" />,
      title: "Flujos de Trabajo",
      description:
        "Automatiza procesos repetitivos. Optimiza tu equipo para máxima eficiencia.",
    },
    {
      icon: <Shield className="size-8" />,
      title: "Seguridad Enterprise",
      description:
        "Protección de datos de nivel empresarial. Cumplimiento de estándares internacionales.",
    },
    {
      icon: <Zap className="size-8" />,
      title: "Rendimiento Rápido",
      description:
        "Respuesta instantánea. Interfaz optimizada para máxima velocidad.",
    },
  ];

  const technologies = [
    "React 18",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Docker",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Section
        className="min-h-[90vh] flex items-center justify-center bg-linear-to-b from-background to-muted/30 px-6 py-20"
        ariaLabel="Hero section - Welcome to ControlaCRM"
      >
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

          <CTAButtons className="pt-4" />
        </div>
      </Section>

      <Section
        id="features"
        ariaLabel="Features section - What ControlaCRM offers"
        className="bg-background"
      >
        <div className="space-y-12">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Todo lo que necesitas
            </h2>
            <p className="text-lg text-muted-foreground">
              Funcionalidades diseñadas para mejorar tu productividad
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={`feature-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="tech-stack"
        ariaLabel="Tech stack section - Technology we use"
        className="bg-muted/30"
      >
        <div className="space-y-8">
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
            {technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="cta"
        ariaLabel="Call to action section - Get started with ControlaCRM"
        className="bg-background"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Listo para transformar tu gestión de contactos?
          </h2>
          <p className="text-lg text-muted-foreground">
            Únete a equipos de ventas que ya están mejorando su productividad
            con ControlaCRM.
          </p>

          <CTAButtons className="pt-4" />
        </div>
      </Section>

      <footer className="border-t bg-background px-6 py-12" aria-label="Footer">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-2">
            <p className="font-semibold">ControlaCRM</p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ControlaCRM. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
