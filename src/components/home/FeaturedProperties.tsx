import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin, Bed, Bath, Square, Layers } from 'lucide-react';
import { usePropertyCatalog } from '@/hooks/usePropertyCatalog';
import { formatPrice, actionLabel } from '@/lib/cbf';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2500&auto=format&fit=crop';

export function FeaturedProperties() {
  const { developments, standaloneUnits, isLoading } = usePropertyCatalog();

  return (
    <div className="space-y-16">
      {/* FILA 1: Desarrollos (is_unit === false) */}
      <section className="py-16 px-4 md:px-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002d43] tracking-tight">
                Desarrollos
              </h2>
              <p className="text-gray-500 mt-2 text-base max-w-2xl">
                Proyectos residenciales y comerciales en preventa y desarrollo.
              </p>
            </div>
            <Link to="/desarrollos" className="flex items-center gap-2 text-[#867027] font-bold hover:underline shrink-0 text-sm">
              Ver todos los desarrollos <ArrowRight className="size-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : developments.length === 0 ? (
            <div className="bg-[#f8fafb] rounded-2xl p-12 text-center border border-gray-100">
              <Building2 className="size-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-lg font-semibold">Próximamente nuevos desarrollos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {developments.slice(0, 3).map((dev) => {
                const img = dev.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
                const verticals = dev.development_verticals ?? [];
                return (
                  <Link
                    key={dev.id}
                    to={`/propiedad/${dev.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={img}
                        alt={dev.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#002d43]/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Desarrollo
                      </div>
                      {dev.fromPrice != null && (
                        <div className="absolute bottom-3 left-3 bg-[#002d43]/95 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                          Desde {formatPrice(dev.fromPrice, dev.moneda)}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-2">
                        {verticals.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap">
                            {verticals.map((v) => (
                              <span key={v} className="inline-flex items-center gap-1 text-xs font-semibold text-[#867027] bg-[#867027]/10 px-2.5 py-0.5 rounded-full">
                                <Layers className="size-3" />
                                {v}
                              </span>
                            ))}
                          </div>
                        )}

                        <h3 className="text-xl font-bold text-[#002d43] group-hover:text-[#867027] transition-colors line-clamp-1">
                          {dev.nombre}
                        </h3>

                        {(dev.ciudad_nombre || dev.colonia) && (
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="size-3.5 text-[#867027]" />
                            {[dev.colonia, dev.ciudad_nombre, dev.estado_nombre].filter(Boolean).join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-semibold text-[#002d43]">
                        <span>{dev.unitCount > 0 ? `${dev.unitCount} unidades disponibles` : 'Preventa'}</span>
                        <span className="text-[#867027] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ver desarrollo <ArrowRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FILA 2: Propiedades Individuales (SOLO standalone: is_unit === true && parent_id == null) */}
      <section className="py-16 px-4 md:px-10 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002d43] tracking-tight">
                Propiedades <span className="text-[#867027]">Individuales</span>
              </h2>
              <p className="text-gray-500 mt-2 text-base max-w-2xl">
                Residencias y propiedades independientes creadas directamente como unidades.
              </p>
            </div>
            <Link to="/listings" className="flex items-center gap-2 text-[#867027] font-bold hover:underline shrink-0 text-sm">
              Ver todas las propiedades <ArrowRight className="size-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : standaloneUnits.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <Building2 className="size-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-lg font-semibold">Propiedades próximamente</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {standaloneUnits.slice(0, 3).map((prop) => {
                const img = prop.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
                const label = actionLabel(prop.id_tipo_accion);
                return (
                  <Link
                    key={prop.id}
                    to={`/propiedad/${prop.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={img}
                        alt={prop.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#867027] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {label}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-[#002d43]/95 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                        {formatPrice(prop.precio, prop.moneda)}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#002d43] group-hover:text-[#867027] transition-colors line-clamp-1">
                          {prop.nombre}
                        </h3>

                        {(prop.ciudad_nombre || prop.colonia) && (
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="size-3.5 text-[#867027]" />
                            {[prop.colonia, prop.ciudad_nombre, prop.estado_nombre].filter(Boolean).join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex gap-4 text-xs font-semibold text-gray-500 pt-3 border-t border-gray-100">
                          {prop.habitaciones != null && (
                            <span className="flex items-center gap-1"><Bed className="size-3.5 text-[#867027]" /> {prop.habitaciones} Recs</span>
                          )}
                          {prop.banios != null && (
                            <span className="flex items-center gap-1"><Bath className="size-3.5 text-[#867027]" /> {prop.banios} Baños</span>
                          )}
                          {prop.area != null && (
                            <span className="flex items-center gap-1"><Square className="size-3.5 text-[#867027]" /> {prop.area} m²</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="font-bold text-[#002d43]">Propiedad Individual</span>
                          <span className="text-[#867027] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Ver detalles <ArrowRight className="size-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
