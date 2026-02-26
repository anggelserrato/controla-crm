import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, Search, LogOut, User, Settings } from "lucide-react";

interface HeaderProps {
  isPublic?: boolean;
}

export default function Header({ isPublic = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuthStore();
  const isAuthenticated = !!user;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/contacts?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation links para usuarios autenticados
  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Contactos", path: "/contacts" },
    { label: "Usuarios", path: "/users", adminOnly: true },
  ];

  const authenticatedNavLinks = navLinks.filter(
    (link) => !link.adminOnly || user?.role === "admin",
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-linear-to-b from-background to-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-8">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 transition-all duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-md transition-all group-hover:shadow-lg">
                <span className="text-sm font-bold text-primary-foreground">
                  C
                </span>
              </div>
              <span className="hidden font-semibold text-foreground transition-colors group-hover:text-primary sm:inline text-sm tracking-tight">
                ControlaCRM
              </span>
            </button>

            {/* Desktop Navigation */}
            {isAuthenticated && !isPublic && (
              <nav className="hidden md:flex items-center gap-1">
                {authenticatedNavLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative group ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                    )}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            {isAuthenticated && !isPublic && (
              <div className="hidden sm:block">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Buscar contactos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="h-9 w-48 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors"
                      onBlur={() => !searchQuery && setSearchOpen(false)}
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-200"
                  >
                    <Search className="size-5" />
                  </button>
                )}
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated && !isPublic ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200">
                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="hidden md:inline truncate max-w-25">
                      {user?.name?.split(" ")[0] || "Usuario"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col gap-1 px-2 py-1.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Rol:{" "}
                      <span className="font-medium capitalize">
                        {user?.role}
                      </span>
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 size-4" />
                    Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 size-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden gap-2 sm:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Ingresar
                </Button>
                <Button size="sm" onClick={() => navigate("/login")}>
                  Comenzar
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            {isAuthenticated && !isPublic && (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                    <Menu className="size-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <nav className="flex flex-col gap-1 mt-8">
                    {authenticatedNavLinks.map((link) => (
                      <SheetClose asChild key={link.path}>
                        <button
                          onClick={() => navigate(link.path)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            location.pathname === link.path
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-accent"
                          }`}
                        >
                          {link.label}
                        </button>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <User className="mr-2 size-4" />
                      Mi Perfil
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 size-4" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {/* Mobile Menu - Public */}
            {!isAuthenticated && isPublic && (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                    <Menu className="size-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-2 mt-8">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/login")}
                    >
                      Ingresar
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => navigate("/login")}
                    >
                      Comenzar
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
