import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  propiedades: [
    { name: 'Venta', href: '/propiedades?operacion=venta' },
    { name: 'Renta', href: '/propiedades?operacion=renta' },
    { name: 'Pre-Venta', href: '/propiedades?operacion=preventa' },
    { name: 'Mapa', href: '/propiedades' },
  ],
  destinos: [
    { name: 'México', href: '/propiedades?pais=MX' },
    { name: 'Estados Unidos', href: '/propiedades?pais=US' },
    { name: 'República Dominicana', href: '/propiedades?pais=DO' },
  ],
  recursos: [
    { name: 'Centro Educativo', href: '/hub' },
    { name: 'Videos', href: '/videos' },
    { name: 'Blog', href: '/hub' },
  ],
  legal: [
    { name: 'Términos y Condiciones', href: '/terminos' },
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Aviso Legal', href: '/aviso-legal' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold gold-gradient-text">
                Homepty
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Tu plataforma premium para encontrar propiedades exclusivas en México, 
              Estados Unidos y República Dominicana.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a 
                href="mailto:info@homepty.com" 
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} className="mr-2" />
                info@homepty.com
              </a>
              <a 
                href="tel:+525555555555" 
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={16} className="mr-2" />
                +52 55 5555 5555
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Propiedades */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Propiedades</h3>
            <ul className="space-y-3">
              {footerLinks.propiedades.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinos */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Destinos</h3>
            <ul className="space-y-3">
              {footerLinks.destinos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Homepty. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
