import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Menu,
  Star,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';
import { formatPrice, actionLabel } from '@/lib/cbf';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';

const Index = () => {
  const { properties, isLoading } = useProperties({ limit: 4 });
  const { user, site } = useSiteUser();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 border-b border-[#f0f3f5] px-6 md:px-10 py-4 shadow-sm backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="size-8 text-[#002d43]" />
          <h2 className="text-[#002d43] text-xl font-bold uppercase tracking-tight">
            {site?.site_name ?? 'Frank Co'} <span className="text-[#867027]">Asesores</span>
          </h2>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Servicios Financieros</a>
          <Link to="/propiedades" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Propiedades</Link>
          <Link to="/listings" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Portafolio</Link>
          <a href="#" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Testimonios</a>
          {user?.telefono_usuario ? (
            <a
              href={`https://wa.me/${user.telefono_usuario.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" className="bg-[#002d43] hover:bg-[#867027] transition-all">
                Contactar
              </Button>
            </a>
          ) : (
            <Button variant="default" className="bg-[#002d43] hover:bg-[#867027] transition-all">
              Contactar
            </Button>
          )}
        </nav>

        <button className="lg:hidden text-[#002d43]">
          <Menu className="size-8" />
        </button>
      </header>

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-[650px] md:h-[800px] flex items-center justify-center overflow-hidden">
          <div className="hero-bg absolute inset-0 z-0 bg-gray-200" />
          <div className="absolute inset-0 bg-[#002d43]/40 z-0" />

          <div className="relative z-10 w-full max-w-7xl px-4 md:px-10 flex flex-col items-center gap-8 text-center pt-20">
            <h1 className="text-white text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
              Invierte en tu <span className="text-[#867027]">Legado</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl drop-shadow-md">
              Propiedades exclusivas y servicios financieros integrados para decisiones de alto valor.
            </p>

            <div className="mt-8 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-4xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Ubicación</span>
                  <select className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full">
                    <option>Polanco, CDMX</option>
                    <option>Lomas de Chapultepec</option>
                    <option>Santa Fe</option>
                    <option>San Pedro Garza García</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Operación</span>
                  <select className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full">
                    <option>Comprar</option>
                    <option>Rentar</option>
                    <option>Pre-Venta</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Tipo</span>
                  <select className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full">
                    <option>Penthouse</option>
                    <option>Casa</option>
                    <option>Departamento</option>
                    <option>Comercial</option>
                  </select>
                </div>
                <Link to="/propiedades">
                  <Button className="h-[46px] bg-[#002d43] hover:bg-[#867027] text-white font-bold gap-2 w-full">
                    <Search className="size-5" />
                    Buscar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="bg-[#f5f7f8] py-20 px-4 md:px-10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#002d43] mb-6">¿Por qué elegirnos?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Conectamos el sector inmobiliario de lujo con la estrategia financiera. Nuestro enfoque integrado garantiza que tu propiedad no sea solo un hogar, sino un activo de alto rendimiento en tu portafolio.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#002d43]/10 p-3 rounded-full text-[#002d43]">
                  <ShieldCheck className="size-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#231f20]">Inversiones Seguras</h3>
                  <p className="text-sm text-gray-500">Validación legal de alto nivel.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#002d43]/10 p-3 rounded-full text-[#002d43]">
                  <TrendingUp className="size-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#231f20]">Análisis de Mercado</h3>
                  <p className="text-sm text-gray-500">Valuaciones basadas en datos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Propiedades Destacadas */}
        <section className="py-24 px-4 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-bold text-[#002d43]">Propiedades Destacadas</h2>
                <p className="text-gray-500 mt-2">Selección curada de listados premium disponibles ahora.</p>
              </div>
              <Link to="/listings" className="hidden md:flex items-center gap-2 text-[#867027] font-bold hover:underline">
                Ver todas las propiedades <ArrowRight className="size-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <Building2 className="size-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">Propiedades próximamente</p>
                <p className="text-gray-400 text-sm mt-1">Estamos preparando nuestro catálogo</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {properties.map((prop) => {
                  const img = prop.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
                  const label = actionLabel(prop.id_tipo_accion);
                  return (
                    <Link
                      key={prop.id}
                      to={`/propiedad/${prop.id}`}
                      className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute top-3 left-3 bg-[#002d43]/90 text-white text-xs font-bold px-2 py-1 rounded z-10">
                          {label.toUpperCase()}
                        </div>
                        <img
                          src={img}
                          alt={prop.nombre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-lg font-bold line-clamp-1">{prop.nombre}</p>
                          <p className="text-gray-200 text-sm flex items-center gap-1">
                            <MapPin className="size-3" />
                            {prop.colonia ?? prop.ciudad_nombre ?? ''}
                          </p>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[#867027] text-xl font-bold">
                            {formatPrice(prop.precio, prop.moneda)}
                          </span>
                        </div>
                        <div className="flex gap-4 text-gray-500 text-sm mb-4 border-b border-gray-100 pb-4">
                          {prop.habitaciones != null && (
                            <span className="flex items-center gap-1"><Bed className="size-4" /> {prop.habitaciones}</span>
                          )}
                          {prop.banios != null && (
                            <span className="flex items-center gap-1"><Bath className="size-4" /> {prop.banios}</span>
                          )}
                          {prop.area != null && (
                            <span className="flex items-center gap-1"><Square className="size-4" /> {prop.area}m²</span>
                          )}
                        </div>
                        <div className="mt-auto">
                          <Button variant="outline" className="w-full border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white transition-colors">
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="mt-12 text-center">
              <Link to="/listings">
                <Button variant="outline" className="border-2 border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white font-bold gap-2">
                  Ver todos los listados
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="bg-[#f5f7f8] py-20 px-4 md:px-10 overflow-hidden border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-extrabold text-[#002d43] mb-4 leading-tight">
                Confiados por <br /> <span className="text-[#867027]">Visionarios</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Hemos ayudado a más de 500 personas a encontrar su propiedad ideal y asegurar su legado financiero.
              </p>
              <div className="flex gap-4">
                <button className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#002d43] hover:text-white hover:border-[#002d43] transition-colors text-gray-600">
                  <ChevronLeft className="size-5" />
                </button>
                <button className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#002d43] hover:text-white hover:border-[#002d43] transition-colors text-gray-600">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>

            <div className="md:w-2/3 h-[400px] relative overflow-hidden">
              <div className="flex flex-col gap-6 animate-scroll-vertical">
                {[
                  { name: "Carlos Rodríguez", role: "Inversionista", text: "La asesoría financiera fue excepcional, igual que la propiedad. Entendieron exactamente lo que necesitaba para mi portafolio." },
                  { name: "Sofía Méndez", role: "Empresaria", text: "Encontrar un penthouse en Polanco que cumpliera mis estándares de seguridad y lujo era imposible hasta que conocí a este equipo." },
                  { name: "David Cohen", role: "Arquitecto", text: "Proceso impecable desde la primera visita hasta la firma final. Muy recomendable para transacciones de alto nivel." },
                  { name: "Carlos Rodríguez", role: "Inversionista", text: "La asesoría financiera fue excepcional, igual que la propiedad. Entendieron exactamente lo que necesitaba para mi portafolio." },
                ].map((t, i) => (
                  <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex text-[#867027] mb-4">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="size-4 fill-current" />)}
                    </div>
                    <p className="text-lg text-[#231f20] italic mb-6">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="text-sm font-bold text-[#002d43]">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#002d43] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <Building2 className="size-6 text-[#867027]" />
                <span className="text-xl font-bold tracking-tight uppercase text-white">
                  {site?.site_name ?? 'Frank Co'} <span className="text-[#867027]">Asesores</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Acceso exclusivo a las propiedades más prestigiosas, combinado con estrategia financiera de primer nivel.
              </p>
              <div className="flex gap-4">
                <Facebook className="size-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Instagram className="size-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Twitter className="size-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Explorar</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><Link to="/listings" className="hover:text-[#867027] transition-colors">Residencial</Link></li>
                <li><Link to="/listings" className="hover:text-[#867027] transition-colors">Comercial</Link></li>
                <li><Link to="/listings" className="hover:text-[#867027] transition-colors">Nuevos Desarrollos</Link></li>
                <li><Link to="/listings" className="hover:text-[#867027] transition-colors">Destacados</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Servicios</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#867027] transition-colors">Consultoría Financiera</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Administración de Propiedades</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Asesoría Legal</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Apoyo Infonavit</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Boletín</h4>
              <p className="text-gray-400 text-sm mb-4">Suscríbete para recibir actualizaciones de propiedades exclusivas.</p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full bg-[#003855] border-none rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#867027]"
                />
                <Button className="bg-[#867027] text-white font-bold py-3 px-4 rounded-lg text-sm hover:bg-[#9a8130] transition-colors uppercase tracking-wide w-full">
                  Suscribirse
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2025 {site?.site_name ?? 'Frank Co Asesores'}. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
