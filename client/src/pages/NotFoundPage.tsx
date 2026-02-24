import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Home, ArrowLeft, Zap } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          {/* 404 Error Code - Bold & Distinctive */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 drop-shadow-lg">
                404
              </div>
            </div>

            {/* Animated icon */}
            <div
              className="flex justify-center animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <Zap className="size-12 text-primary/70" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Algo salió mal
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              La página que buscas no existe o fue movida. No te preocupes, te
              ayudamos a encontrar lo que necesitas.
            </p>
          </div>

          {/* Visual divider */}
          <div className="flex items-center justify-center gap-4 py-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
            <div className="h-2 w-2 rounded-full bg-primary/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 md:flex-row md:justify-center md:gap-4 pt-4">
            {/* Primary: Go Home or Dashboard */}
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <Home className="size-4" />
                  Ir al Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/">
                <Button size="lg" className="gap-2">
                  <Home className="size-4" />
                  Volver a Inicio
                </Button>
              </Link>
            )}

            {/* Secondary: Go back */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Ir Atrás
            </Button>
          </div>

          {/* Additional Help */}
          <div className="pt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas ayuda? Puedes:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/">
                <span className="inline-block px-3 py-1 rounded-full bg-muted hover:bg-muted text-sm font-medium transition-colors text-primary hover:text-primary/80">
                  Explorar
                </span>
              </Link>
              <a href="mailto:support@controla.crm">
                <span className="inline-block px-3 py-1 rounded-full bg-muted hover:bg-muted text-sm font-medium transition-colors text-primary hover:text-primary/80">
                  Contactar Soporte
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Style animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
