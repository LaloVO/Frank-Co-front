import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Building2,
  MapPin,
  ChevronRight,
  Heart,
  Share2,
  Clock,
  Phone,
  MessageSquare,
  ArrowLeft,
  Bed,
  Bath,
  Square,
  Car,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchProperty, formatPrice, actionLabel } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, site } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 w-full">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="h-[500px] bg-gray-200 rounded-2xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-4">
              <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] items-center justify-center">
        <Building2 className="size-14 text-gray-300 mb-4" />
        <p className="text-gray-500 text-xl font-semibold">Propiedad no encontrada</p>
        <Link to="/listings" className="mt-4 text-[#867027] hover:underline text-sm font-medium flex items-center gap-1">
          <ArrowLeft className="size-4" /> Volver al portafolio
        </Link>
      </div>
    );
  }

  const images = property.imagenes_propiedades?.map((i) => i.image_url).filter(Boolean) ?? [];
  const mainImg = images[0] ?? FALLBACK_IMG;
  const label = actionLabel(property.id_tipo_accion);
  const location = [property.colonia, property.ciudad_nombre, property.estado_nombre].filter(Boolean).join(', ');
  const whatsappMsg = encodeURIComponent(`Hola, me interesa la propiedad: ${property.nombre}`);
  const whatsappUrl = user?.telefono_usuario
    ? `https://wa.me/${user.telefono_usuario.replace(/\D/g, '')}?text=${whatsappMsg}`
    : '#';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#231f20] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 md:px-10 py-4 shadow-sm border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Building2 className="size-8 text-[#002d43]" />
          <h2 className="text-[#002d43] text-xl font-bold uppercase tracking-tight">
            {site?.site_name ?? 'Frank Co'} <span className="text-[#867027]">Asesores</span>
          </h2>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/propiedades" className="text-sm font-semibold text-[#002d43] hover:text-[#867027] transition-colors">Propiedades</Link>
          <Link to="/listings" className="text-sm font-semibold text-[#002d43] hover:text-[#867027] transition-colors">Portafolio</Link>
        </nav>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          <Link to="/listings" className="hover:text-[#002d43]">Portafolio</Link>
          <ChevronRight className="size-3" />
          <span className="text-[#867027] line-clamp-1">{property.nombre}</span>
        </nav>

        {/* Título */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-[#002d43] text-3xl md:text-5xl font-extrabold tracking-tight">{property.nombre}</h1>
            {location && (
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin className="size-5 text-[#867027]" />
                <p className="font-medium">{location}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">
                  VERIFICADA
                </Badge>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button className="flex items-center justify-center size-11 rounded-full border border-gray-200 hover:bg-gray-50 text-[#002d43] transition-colors">
              <Heart className="size-5" />
            </button>
            <button className="flex items-center justify-center size-11 rounded-full border border-gray-200 hover:bg-gray-50 text-[#002d43] transition-colors">
              <Share2 className="size-5" />
            </button>
          </div>
        </div>

        {/* Galería */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-10 rounded-2xl overflow-hidden shadow-lg border border-white">
            <div className="col-span-1 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
              <img src={mainImg} alt={property.nombre} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002d43]/60 to-transparent" />
            </div>
            {images.slice(1, 5).map((img, i) => (
              <div key={i} className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden">
                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
            {images.length <= 1 && [1, 2, 3, 4].map((i) => (
              <div key={i} className="col-span-1 row-span-1 bg-gray-100" />
            ))}
          </div>
        ) : (
          <div className="h-[400px] mb-10 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <Building2 className="size-16 text-gray-300" />
          </div>
        )}

        {/* Stats Bar */}
        <div className="bg-[#002d43] text-white rounded-2xl p-8 flex flex-wrap justify-between items-center gap-8 shadow-2xl mb-12 border border-white/10">
          <div className="flex flex-col gap-1">
            <p className="text-[#867027] text-[10px] uppercase font-black tracking-[0.2em]">Precio</p>
            <p className="text-4xl font-black tabular-nums">
              {formatPrice(property.precio, property.moneda)}
            </p>
          </div>
          {property.area && (
            <>
              <div className="w-px h-12 bg-white/10 hidden lg:block" />
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Superficie</p>
                <p className="text-2xl font-bold">{property.area} <span className="text-sm font-medium text-white/40">m²</span></p>
              </div>
            </>
          )}
          {(property.habitaciones != null || property.banios != null) && (
            <>
              <div className="w-px h-12 bg-white/10 hidden lg:block" />
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Distribución</p>
                <p className="text-2xl font-bold">
                  {property.habitaciones != null ? `${property.habitaciones} Rec` : ''}
                  {property.habitaciones != null && property.banios != null ? ' / ' : ''}
                  {property.banios != null ? `${property.banios} Baños` : ''}
                </p>
              </div>
            </>
          )}
          <div className="w-px h-12 bg-white/10 hidden lg:block" />
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Operación</p>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-[#867027]" />
              <p className="text-2xl font-bold text-[#867027] uppercase tracking-tighter">{label}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          {/* Información principal */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            {property.descripcion && (
              <section>
                <h3 className="text-[#002d43] text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#867027]" /> Descripción de la propiedad
                </h3>
                <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                  <p>{property.descripcion}</p>
                </div>
              </section>
            )}

            {/* Características */}
            <section>
              <h3 className="text-[#002d43] text-2xl font-bold mb-8">Características</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {property.habitaciones != null && (
                  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <Bed className="size-7 text-[#867027]" />
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#002d43]">{property.habitaciones}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Recámaras</p>
                    </div>
                  </div>
                )}
                {property.banios != null && (
                  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <Bath className="size-7 text-[#867027]" />
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#002d43]">{property.banios}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Baños</p>
                    </div>
                  </div>
                )}
                {property.area != null && (
                  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <Square className="size-7 text-[#867027]" />
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#002d43]">{property.area}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">m²</p>
                    </div>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <Car className="size-7 text-[#867027]" />
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#002d43]">{property.estacionamientos}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Estac.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Ubicación */}
            {location && (
              <section className="pb-12">
                <h3 className="text-[#002d43] text-2xl font-bold mb-6">Ubicación</h3>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#867027]/10 p-3 rounded-full">
                      <MapPin className="size-6 text-[#867027]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#002d43] text-lg">{property.nombre}</p>
                      {property.direccion && <p className="text-gray-600 mt-1">{property.direccion}</p>}
                      <p className="text-gray-500 text-sm mt-1">{location}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar de contacto */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 ring-1 ring-[#002d43]/5">
                <div className="bg-[#002d43] p-6 text-white">
                  <p className="text-[10px] font-black text-[#867027] uppercase tracking-[0.2em] mb-1">Precio</p>
                  <p className="text-3xl font-black">{formatPrice(property.precio, property.moneda)}</p>
                  <p className="text-white/50 text-sm mt-1">{label}</p>
                </div>

                <div className="p-8 space-y-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full h-14 bg-[#25D366] hover:bg-[#20c05a] text-white font-black uppercase tracking-[0.15em] shadow-xl text-xs rounded-2xl transition-colors"
                  >
                    <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Contactar por WhatsApp
                  </a>

                  <Button
                    variant="outline"
                    className="w-full h-12 border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white font-bold uppercase tracking-wide text-xs rounded-2xl"
                    onClick={() => user?.telefono_usuario && (window.location.href = `tel:${user.telefono_usuario}`)}
                  >
                    Agendar llamada
                  </Button>
                </div>
              </div>

              {/* Tarjeta del asesor */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  {user?.imagen_perfil_usuario ? (
                    <img src={user.imagen_perfil_usuario} alt={user.nombre_usuario} className="size-14 rounded-full object-cover" />
                  ) : (
                    <div className="size-14 rounded-full bg-[#002d43]/10 flex items-center justify-center text-[#002d43] font-black text-lg">
                      {user?.nombre_usuario?.charAt(0) ?? 'F'}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#002d43]">{user?.nombre_usuario ?? 'Frank'}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asesor Inmobiliario</p>
                    {user?.email_usuario && (
                      <p className="text-xs text-gray-400 mt-0.5">{user.email_usuario}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#F8FAFC] rounded-xl text-[#002d43] hover:bg-[#25D366] hover:text-white transition-all"
                  >
                    <MessageSquare className="size-5" />
                  </a>
                  {user?.telefono_usuario && (
                    <a
                      href={`tel:${user.telefono_usuario}`}
                      className="p-3 bg-[#F8FAFC] rounded-xl text-[#002d43] hover:bg-[#002d43] hover:text-white transition-all"
                    >
                      <Phone className="size-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-auto bg-[#002d43] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="size-6 text-[#867027]" />
            <span className="text-xl font-bold uppercase tracking-widest">
              {site?.site_name ?? 'Frank Co Asesores'}
            </span>
          </div>
          <div className="flex gap-12 text-xs font-black uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
          <p className="text-[10px] font-medium text-white/20">© 2025 {site?.site_name ?? 'Frank Co Asesores'}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetail;
