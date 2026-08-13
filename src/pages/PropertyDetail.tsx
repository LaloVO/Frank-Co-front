import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Building2,
  MapPin,
  ChevronRight,
  ChevronLeft,
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
  Layers,
  CalendarCheck,
  Home as HomeIcon,
  Sparkles,
  X,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchProperty, formatPrice, CBFProperty, actionLabel } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';
import { usePropertyCatalog } from '@/hooks/usePropertyCatalog';
import { fetchAmenidades } from '@/lib/sellerInquiry';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';

interface PropertyWithAmenities extends CBFProperty {
  amenidades_propiedades?: { id_amenidad: number }[];
}

function formatFecha(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00`).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, site } = useSiteUser();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!) as Promise<PropertyWithAmenities>,
    enabled: !!id,
  });

  const { childUnitsByParent } = usePropertyCatalog();
  const { data: amenidadesCatalog } = useQuery({
    queryKey: ['amenidades-catalog'],
    queryFn: fetchAmenidades,
    staleTime: 60 * 60 * 1000,
  });

  const isDevelopment = property?.is_unit === false;
  const childUnits = isDevelopment && id ? childUnitsByParent.get(Number(id)) ?? [] : [];
  const verticals = property?.development_verticals ?? [];
  const amenityNames = (property?.amenidades_propiedades ?? [])
    .map((a) => amenidadesCatalog?.find((c) => c.id_amenidad === a.id_amenidad)?.nombre_amenidad)
    .filter((n): n is string => !!n);

  const fromPrice = isDevelopment
    ? (() => {
        const prices = childUnits.map((u) => u.precio).filter((p) => p > 0);
        if (prices.length) return Math.min(...prices);
        return property && property.precio > 0 ? property.precio : null;
      })()
    : null;

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 w-full">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="h-[480px] bg-gray-200 rounded-3xl animate-pulse mb-8" />
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
      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-24">
          <Building2 className="size-14 text-gray-300 mb-4" />
          <p className="text-gray-500 text-xl font-semibold">Propiedad no encontrada</p>
          <Link to="/listings" className="mt-4 text-[#867027] hover:underline text-sm font-medium flex items-center gap-1">
            <ArrowLeft className="size-4" /> Volver al portafolio
          </Link>
        </div>
      </div>
    );
  }

  const images = property.imagenes_propiedades?.map((i) => i.image_url).filter(Boolean) ?? [];
  const badge = isDevelopment ? 'Desarrollo' : actionLabel(property.id_tipo_accion);
  const location = [property.colonia, property.ciudad_nombre, property.estado_nombre].filter(Boolean).join(', ');
  const fechaInicio = formatFecha(property.fecha_inicio);
  const fechaEntrega = formatFecha(property.fecha_entrega);

  const whatsappMsg = encodeURIComponent(`Hola, me interesa la propiedad: ${property.nombre}`);
  const whatsappUrl = user?.telefono_usuario
    ? `https://wa.me/${user.telefono_usuario.replace(/\D/g, '')}?text=${whatsappMsg}`
    : '#';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#231f20] font-sans">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          <Link to="/listings" className="hover:text-[#002d43]">Portafolio</Link>
          <ChevronRight className="size-3" />
          {isDevelopment && (
            <>
              <Link to="/desarrollos" className="hover:text-[#002d43]">Desarrollos</Link>
              <ChevronRight className="size-3" />
            </>
          )}
          <span className="text-[#867027] line-clamp-1">{property.nombre}</span>
        </nav>

        {/* Header Title Block */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-[#002d43] text-3xl md:text-5xl font-extrabold tracking-tight">
              {property.nombre}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3.5 py-1 bg-[#002d43] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {badge}
              </span>
              {property.tipo && (
                <span className="px-3.5 py-1 bg-[#867027]/10 text-[#867027] border border-[#867027]/20 text-xs font-semibold capitalize rounded-full">
                  {property.tipo}
                </span>
              )}
            </div>
            {location && (
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin className="size-5 text-[#867027]" />
                <p className="font-medium">{location}</p>
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

        {/* Carousel / Image Gallery */}
        <div className="mb-10">
          {images.length > 0 ? (
            <div className="relative w-full rounded-3xl overflow-hidden bg-black/5 border border-gray-100 shadow-xl group h-[320px] sm:h-[420px] md:h-[500px]">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer",
                    idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  )}
                  onClick={() => setActivePhotoIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`${property.nombre} ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                </div>
              ))}

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 active:scale-90 cursor-pointer shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 active:scale-90 cursor-pointer shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 right-4 z-20 px-4 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#867027]" />
                <span>{currentSlide + 1} / {images.length}</span>
              </div>

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 max-w-[70%] overflow-x-auto py-1 px-3 rounded-full bg-black/30 backdrop-blur-sm">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide(idx);
                      }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300 cursor-pointer shrink-0",
                        idx === currentSlide ? "w-6 bg-[#867027]" : "w-2 bg-white/50 hover:bg-white"
                      )}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-[350px] bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
              <ImageIcon className="w-10 h-10 mr-2 opacity-50" />
              <span>Sin imágenes disponibles</span>
            </div>
          )}
        </div>

        {/* Key Stats Bar */}
        <div className="bg-[#002d43] text-white rounded-3xl p-8 flex flex-wrap justify-between items-center gap-8 shadow-2xl mb-12 border border-white/10">
          <div className="flex flex-col gap-1">
            <p className="text-[#867027] text-[10px] uppercase font-black tracking-[0.2em]">
              {isDevelopment ? 'Precio Desde' : 'Precio'}
            </p>
            <p className="text-3xl md:text-4xl font-black tabular-nums">
              {isDevelopment
                ? fromPrice != null
                  ? `Desde ${formatPrice(fromPrice, property.moneda)}`
                  : 'Precio a consultar'
                : formatPrice(property.precio, property.moneda)}
            </p>
          </div>

          {isDevelopment ? (
            <>
              {childUnits.length > 0 && (
                <>
                  <div className="w-px h-12 bg-white/10 hidden lg:block" />
                  <div className="flex flex-col gap-1">
                    <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Inventario</p>
                    <p className="text-2xl font-bold">{childUnits.length} <span className="text-sm font-medium text-white/40">Unidades</span></p>
                  </div>
                </>
              )}
              {fechaEntrega && (
                <>
                  <div className="w-px h-12 bg-white/10 hidden lg:block" />
                  <div className="flex flex-col gap-1">
                    <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Entrega Estimada</p>
                    <p className="text-2xl font-bold text-[#867027]">{fechaEntrega}</p>
                  </div>
                </>
              )}
              {verticals.length > 0 && (
                <>
                  <div className="w-px h-12 bg-white/10 hidden lg:block" />
                  <div className="flex flex-col gap-1">
                    <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Tipo de Desarrollo</p>
                    <p className="text-xl font-bold">{verticals.join(', ')}</p>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {property.area != null && (
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
                  <p className="text-2xl font-bold text-[#867027] uppercase tracking-tighter">{badge}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            {/* Features / Stats Summary */}
            {isDevelopment ? (
              <section>
                <h3 className="text-[#002d43] text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#867027]" /> Resumen del desarrollo
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {childUnits.length > 0 && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <HomeIcon className="size-6 text-[#867027]" />
                      <p className="text-2xl font-black text-[#002d43]">{childUnits.length}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                        {childUnits.length === 1 ? 'Unidad Disponible' : 'Unidades Disponibles'}
                      </p>
                    </div>
                  )}
                  {fechaInicio && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <CalendarCheck className="size-6 text-[#867027]" />
                      <p className="text-lg font-bold text-[#002d43]">{fechaInicio}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Inicio de Obra</p>
                    </div>
                  )}
                  {fechaEntrega && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <CalendarCheck className="size-6 text-[#867027]" />
                      <p className="text-lg font-bold text-[#002d43]">{fechaEntrega}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Entrega Estimada</p>
                    </div>
                  )}
                  {verticals.length > 0 && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <Layers className="size-6 text-[#867027]" />
                      <p className="text-base font-bold text-[#002d43] leading-snug">{verticals.join(', ')}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Categoría</p>
                    </div>
                  )}
                </div>
              </section>
            ) : (
              <section>
                <h3 className="text-[#002d43] text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#867027]" /> Características principales
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.habitaciones != null && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <Bed className="size-7 text-[#867027]" />
                      <p className="text-2xl font-black text-[#002d43]">{property.habitaciones}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Recámaras</p>
                    </div>
                  )}
                  {property.banios != null && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <Bath className="size-7 text-[#867027]" />
                      <p className="text-2xl font-black text-[#002d43]">{property.banios}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Baños</p>
                    </div>
                  )}
                  {property.area != null && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <Square className="size-7 text-[#867027]" />
                      <p className="text-2xl font-black text-[#002d43]">{property.area}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">m² Superficie</p>
                    </div>
                  )}
                  {property.estacionamientos != null && (
                    <div className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                      <Car className="size-7 text-[#867027]" />
                      <p className="text-2xl font-black text-[#002d43]">{property.estacionamientos}</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Estac.</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Descriptions */}
            {(property.descripcion || property.descripcion_estado || property.descripcion_inversion) && (
              <section className="space-y-6">
                <h3 className="text-[#002d43] text-2xl font-bold flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#867027]" />
                  {isDevelopment ? 'Descripción del Desarrollo' : 'Descripción de la Propiedad'}
                </h3>

                {property.descripcion && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#867027]">Información General</h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                      {property.descripcion}
                    </p>
                  </div>
                )}

                {property.descripcion_estado && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#867027]">Estado y Conservación</h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                      {property.descripcion_estado}
                    </p>
                  </div>
                )}

                {property.descripcion_inversion && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#867027]">Oportunidad de Inversión</h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                      {property.descripcion_inversion}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Amenidades */}
            {isDevelopment && amenityNames.length > 0 && (
              <section>
                <h3 className="text-[#002d43] text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#867027]" /> Amenidades del desarrollo
                </h3>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {amenityNames.map((name) => (
                      <div key={name} className="flex items-center gap-2.5 text-sm text-[#002d43] font-semibold">
                        <CheckCircle2 className="size-4 text-[#867027] shrink-0" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Unidades disponibles (Child Units) */}
            {isDevelopment && (
              <section>
                <h3 className="text-[#002d43] text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#867027]" />
                  Unidades disponibles{childUnits.length > 0 ? ` (${childUnits.length})` : ''}
                </h3>

                {childUnits.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {childUnits.map((unit) => {
                      const unitImg = unit.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
                      return (
                        <Link
                          key={unit.id}
                          to={`/propiedad/${unit.id}`}
                          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group block"
                        >
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <img
                              src={unitImg}
                              alt={unit.nombre}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-3 left-3 bg-[#002d43]/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
                              {formatPrice(unit.precio, unit.moneda)}
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1 justify-between">
                            <div>
                              <h4 className="text-lg font-bold text-[#002d43] group-hover:text-[#867027] transition-colors line-clamp-1 mb-2">
                                {unit.nombre}
                              </h4>
                              {unit.descripcion && (
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                                  {unit.descripcion}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 pt-3 border-t border-gray-100">
                              {unit.habitaciones != null && (
                                <span className="flex items-center gap-1">
                                  <Bed className="size-3.5 text-[#867027]" /> {unit.habitaciones} Recs
                                </span>
                              )}
                              {unit.banios != null && (
                                <span className="flex items-center gap-1">
                                  <Bath className="size-3.5 text-[#867027]" /> {unit.banios} Baños
                                </span>
                              )}
                              {unit.area != null && (
                                <span className="flex items-center gap-1">
                                  <Square className="size-3.5 text-[#867027]" /> {unit.area} m²
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                    <p className="text-sm text-gray-500">
                      Aún no hay unidades específicas publicadas para este desarrollo.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Ubicación */}
            {location && (
              <section className="pb-12">
                <h3 className="text-[#002d43] text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#867027]" /> Ubicación
                </h3>
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

          {/* Contact Sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 ring-1 ring-[#002d43]/5">
                <div className="bg-[#002d43] p-6 text-white">
                  <p className="text-3xl font-black">
                    {isDevelopment
                      ? fromPrice != null
                        ? `Desde ${formatPrice(fromPrice, property.moneda)}`
                        : 'Precio a consultar'
                      : formatPrice(property.precio, property.moneda)}
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    {isDevelopment
                      ? 'desde la unidad más económica'
                      : badge === 'Renta'
                      ? 'por mes'
                      : 'precio total'}
                  </p>
                </div>

                <div className="p-8 space-y-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full h-14 bg-[#25D366] hover:bg-[#20c05a] text-white font-black uppercase tracking-[0.15em] shadow-xl text-xs rounded-2xl transition-colors"
                  >
                    <MessageSquare className="size-5" />
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
                    <p className="font-bold text-[#002d43]">{user?.nombre_usuario ?? 'Frank & Co.'}</p>
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

              {/* Búsqueda Inteligente Banner */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <h4 className="font-bold text-[#002d43] text-sm">¿Buscas algo a tu medida?</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Completa nuestra solicitud inteligente en 6 pasos para encontrar la propiedad ideal.
                </p>
                <Link
                  to="/solicita-inmueble"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-[#867027] text-[#867027] hover:bg-[#867027] hover:text-white rounded-xl font-bold text-xs transition-all duration-300"
                >
                  <Sparkles className="size-4" />
                  Búsqueda Inteligente
                </Link>
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
              Frank & Co. Consultores
            </span>
          </div>
          <p className="text-[10px] font-medium text-white/40">© 2025 {site?.site_name ?? 'Frank & Co. Consultores'}. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[999] flex flex-col justify-between p-6 select-none outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setActivePhotoIndex(null);
            if (e.key === 'ArrowRight') setActivePhotoIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
            if (e.key === 'ArrowLeft') setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
          }}
          tabIndex={0}
          ref={(el) => el?.focus()}
        >
          <div className="flex justify-between items-center text-white/80 font-sans text-sm">
            <span>{activePhotoIndex + 1} de {images.length}</span>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-between gap-4 max-h-[75vh]">
            <button
              onClick={() => setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
              disabled={activePhotoIndex === 0}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-[85vw] max-h-[70vh] flex items-center justify-center">
              <img
                src={images[activePhotoIndex]}
                alt={`${property.nombre} slide ${activePhotoIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl animate-fade-in"
              />
            </div>

            <button
              onClick={() => setActivePhotoIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev))}
              disabled={activePhotoIndex === images.length - 1}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto justify-center py-4 no-scrollbar max-w-full">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-16 h-12 rounded-md overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${
                  idx === activePhotoIndex ? 'border-[#867027] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
