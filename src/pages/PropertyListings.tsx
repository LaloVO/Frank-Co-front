import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bed,
  SlidersHorizontal,
  Building2,
  ChevronLeft,
  MapPin,
  Bath,
  Square,
} from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';
import { formatPrice, actionLabel } from '@/lib/cbf';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';

const PropertyListings = () => {
  const { properties, isLoading } = useProperties();
  const { user } = useSiteUser();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#143f61] font-sans">
      {/* Header */}
      <header className="bg-[#002d43] text-white w-full shadow-md sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 hover:text-[#867027] transition-colors">
              <ChevronLeft className="size-5" />
              <Building2 className="size-6" />
            </Link>
            <h1 className="text-sm md:text-xl font-semibold tracking-tight">
              Tu propiedad ideal está a un filtro de distancia
            </h1>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-200 transition-colors group">
            Filtrar
            <SlidersHorizontal className="size-5 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-96 animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <Building2 className="size-14 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl font-semibold">Propiedades próximamente</p>
            <p className="text-gray-400 text-sm mt-2">Estamos preparando el catálogo de propiedades</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {properties.map((prop) => {
              const img = prop.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
              const label = actionLabel(prop.id_tipo_accion);
              return (
                <Link
                  to={`/propiedad/${prop.id}`}
                  key={prop.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group border border-gray-100 block"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={img}
                      alt={prop.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#D9F955] text-[#002d43] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm">
                        {label}
                      </span>
                    </div>
                    {prop.habitaciones != null && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-white text-[#143f61] px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                          <Bed className="size-4" /> {prop.habitaciones}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#002d43] mb-1 line-clamp-1">{prop.nombre}</h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                        <MapPin className="size-4" />
                        {[prop.colonia, prop.ciudad_nombre, prop.estado_nombre].filter(Boolean).join(', ')}
                      </p>
                      <div className="flex gap-4 text-gray-500 text-sm border-t border-gray-100 pt-4">
                        {prop.habitaciones != null && <span className="flex items-center gap-1"><Bed className="size-4" /> {prop.habitaciones}</span>}
                        {prop.banios != null && <span className="flex items-center gap-1"><Bath className="size-4" /> {prop.banios}</span>}
                        {prop.area != null && <span className="flex items-center gap-1"><Square className="size-4" /> {prop.area}m²</span>}
                      </div>
                    </div>
                    <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm text-gray-500 font-medium">Desde</span>
                      <span className="text-lg font-bold text-[#002d43]">{formatPrice(prop.precio, prop.moneda)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* Botón WhatsApp flotante */}
      {user?.telefono_usuario && (
        <a
          href={`https://wa.me/${user.telefono_usuario.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, estoy interesado en una propiedad de su catálogo.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        >
          <svg fill="currentColor" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default PropertyListings;
