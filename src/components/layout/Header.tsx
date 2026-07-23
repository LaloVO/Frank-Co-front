import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSiteUser } from '@/hooks/useSiteUser';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Desarrollos', href: '/desarrollos' },
  { name: 'Propiedades', href: '/propiedades' },
  { name: 'Portafolio', href: '/listings' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, site } = useSiteUser();

  const handleContactClick = () => {
    if (user?.telefono_usuario) {
      const waNumber = user.telefono_usuario.replace(/\D/g, '');
      window.open(`https://wa.me/${waNumber}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Building2 className="size-8 text-[#002d43]" />
            <h2 className="text-[#002d43] text-xl font-bold uppercase tracking-tight font-sans">
              {site?.site_name ? (
                <>{site.site_name}</>
              ) : (
                <>
                  Frank Co <span className="text-[#867027]">Asesores</span>
                </>
              )}
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors duration-200 hover:text-[#867027]",
                  location.pathname === item.href
                    ? "text-[#867027]"
                    : "text-[#002d43]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              asChild
              className="rounded-full px-5 border-[#002d43]/20 text-[#002d43] hover:bg-[#f5f7f8] font-sans text-sm font-semibold"
            >
              <Link to="/vender-propiedad">Vender propiedad</Link>
            </Button>
            <Button
              onClick={handleContactClick}
              className="bg-[#002d43] hover:bg-[#867027] text-white rounded-full px-6 transition-all duration-300 font-sans text-sm font-semibold shadow-md"
            >
              Contactar
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[#002d43] hover:text-[#867027] transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col space-y-3 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-base font-semibold py-2 transition-colors duration-200 hover:text-[#867027]",
                    location.pathname === item.href
                      ? "text-[#867027]"
                      : "text-[#002d43]"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full w-full justify-center border-[#002d43]/20 text-[#002d43] hover:bg-[#f5f7f8] font-semibold"
                >
                  <Link to="/vender-propiedad" onClick={() => setIsOpen(false)}>
                    Vender propiedad
                  </Link>
                </Button>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    handleContactClick();
                  }}
                  className="bg-[#002d43] hover:bg-[#867027] text-white rounded-full w-full justify-center font-semibold"
                >
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
