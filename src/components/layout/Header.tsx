import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSiteUser } from '@/hooks/useSiteUser';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Desarrollos', href: '/desarrollos' },
  { name: 'Propiedades', href: '/propiedades' },
  { name: 'Portafolio', href: '/listings' },
  { name: 'Servicios', href: '/servicios' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, site } = useSiteUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex min-h-11 min-w-0 items-center gap-2 hover:opacity-90 transition-opacity lg:mr-10">
            <Building2 className="size-8 text-[#002d43]" />
            <h2 className="truncate text-[#002d43] text-lg xl:text-xl font-bold uppercase tracking-tight font-sans">
              Frank & Co. <span className="text-[#867027]">Consultores</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Button
              variant="outline"
              asChild
              className="rounded-full px-5 border-[#002d43]/20 text-[#002d43] hover:bg-[#f5f7f8] font-sans text-sm font-semibold"
            >
              <Link to="/vender-propiedad">Vender propiedad</Link>
            </Button>

            {/* Social Links */}
            <a
              href="https://www.facebook.com/profile.php?id=61584824315314"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#002d43] hover:text-[#867027] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/frankco.consultores/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#002d43] hover:text-[#867027] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden min-h-11 min-w-11 p-2 text-[#002d43] hover:text-[#867027] transition-colors focus:outline-none"
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
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
