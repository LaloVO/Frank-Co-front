import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { useDesarrollos } from '@/hooks/useDesarrollos';
import { useSiteUser } from '@/hooks/useSiteUser';
import { formatPrice } from '@/lib/cbf';
import { MapPin, Building2, CalendarCheck, ArrowRight, Layers, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';

function formatFechaEntrega(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
}

export default function Desarrollos() {
  const { user, site } = useSiteUser();
  const { desarrollos, isLoading } = useDesarrollos();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8] font-sans">
      <Header />

      <main className="flex-grow py-12 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#002d43] tracking-tight">
              Desarrollos
            </h1>
            <p className="text-gray-500 text-base mt-2 max-w-2xl">
              Explora nuestros desarrollos residenciales y comerciales de alto nivel.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm h-96 animate-pulse" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && desarrollos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Building2 className="size-12 text-[#867027]" />
              <h3 className="text-xl font-bold text-[#002d43]">Nuevos desarrollos en preparación</h3>
              <p className="text-gray-500 text-sm max-w-md">
                Próximamente publicaremos preventas y desarrollos exclusivos.
              </p>
              <Link to="/propiedades">
                <Button className="bg-[#002d43] hover:bg-[#867027] text-white rounded-full px-6">
                  Ver propiedades disponibles
                </Button>
              </Link>
            </div>
          )}

          {/* Grid de desarrollos */}
          {!isLoading && desarrollos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {desarrollos.map((dev) => {
                const imagen = dev.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
                const verticals = dev.development_verticals ?? [];
                const entrega = formatFechaEntrega(dev.fecha_entrega);

                return (
                  <Link
                    key={dev.id}
                    to={`/propiedad/${dev.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col block transform hover:-translate-y-1"
                  >
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={imagen}
                        alt={dev.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }}
                      />
                      {dev.tipo && (
                        <span className="absolute top-4 left-4 bg-[#002d43]/90 text-white text-xs font-bold px-3 py-1 rounded">
                          {dev.tipo}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow space-y-3">
                      {verticals.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {verticals.map((v) => (
                            <span
                              key={v}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#867027] bg-[#867027]/10 px-2.5 py-0.5 rounded-full"
                            >
                              <Layers className="size-3" />
                              {v}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="text-xl md:text-2xl font-bold text-[#002d43] group-hover:text-[#867027] transition-colors">
                        {dev.nombre}
                      </h2>

                      {dev.descripcion && (
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {dev.descripcion}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-100">
                        {(dev.ciudad_nombre || dev.estado_nombre) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3.5 text-[#867027]" />
                            {dev.ciudad_nombre ?? dev.estado_nombre}
                          </span>
                        )}
                        {entrega && (
                          <span className="flex items-center gap-1">
                            <CalendarCheck className="size-3.5 text-[#867027]" />
                            Entrega {entrega}
                          </span>
                        )}
                        {dev.fromPrice != null && (
                          <span className="font-bold text-[#002d43]">
                            Desde {formatPrice(dev.fromPrice, dev.moneda)}
                          </span>
                        )}
                        {dev.unitCount > 0 && (
                          <span>
                            {dev.unitCount} {dev.unitCount === 1 ? 'unidad' : 'unidades'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[#867027] text-xs font-bold uppercase tracking-wider pt-2 group-hover:gap-2 transition-all">
                        Ver desarrollo <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#002d43] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <Building2 className="size-6 text-[#867027]" />
                <span className="text-xl font-bold tracking-tight uppercase text-white">
                  Frank & Co. <span className="text-[#867027]">Consultores</span>
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
                <li><Link to="/desarrollos" className="hover:text-[#867027] transition-colors">Desarrollos</Link></li>
                <li><Link to="/propiedades" className="hover:text-[#867027] transition-colors">Propiedades</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Servicios</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><Link to="/vender-propiedad" className="hover:text-[#867027] transition-colors">Vender Propiedad</Link></li>
                <li><Link to="/solicita-inmueble" className="hover:text-[#867027] transition-colors">Solicitar Inmueble</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Contacto</h4>
              <p className="text-gray-400 text-sm mb-2">{user?.nombre_usuario || 'Frank & Co. Consultores'}</p>
              <p className="text-gray-400 text-sm">{user?.email_usuario}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#867027]/80 text-xs font-semibold">© 2025 {site?.site_name ?? 'Frank & Co. Consultores'}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
