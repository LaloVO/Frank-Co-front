import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Building2,
  Search,
  MapPin,
  User,
  Bell,
  Bookmark,
  ChevronDown,
  X,
  Menu,
  Bed,
  Bath,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';
import { formatPrice, actionLabel } from '@/lib/cbf';
import PropertyMap from '@/components/map/PropertyMap';
import type { MapProperty } from '@/components/map/PropertyMap';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';

const operacionMap: Record<string, number> = { venta: 1, renta: 2, preventa: 4 };

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('ubicacion') ?? '');
  const { properties, isLoading } = useProperties({ limit: 100 });
  const { site } = useSiteUser();

  const mapboxToken = site?.platform_config?.mapbox_token ?? '';

  const urlTipo = searchParams.get('tipo') ?? '';
  const urlOperacion = searchParams.get('operacion') ?? '';
  const urlLat = searchParams.get('lat');
  const urlLng = searchParams.get('lng');
  const initialCenter = urlLat && urlLng ? { lat: parseFloat(urlLat), lng: parseFloat(urlLng) } : undefined;

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const haystack = `${p.nombre} ${p.ciudad_nombre ?? ''} ${p.colonia ?? ''} ${p.estado_nombre ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (urlTipo && p.tipo?.toLowerCase() !== urlTipo) return false;
      if (urlOperacion && operacionMap[urlOperacion] && p.id_tipo_accion !== operacionMap[urlOperacion]) return false;
      return true;
    });
  }, [properties, search, urlTipo, urlOperacion]);

  const mapProperties = useMemo<MapProperty[]>(
    () =>
      filtered
        .filter((p) => p.latitud != null && p.longitud != null)
        .map((p) => ({
          id: p.id,
          title: p.nombre,
          location: [p.colonia, p.ciudad_nombre].filter(Boolean).join(', '),
          price: formatPrice(p.precio, p.moneda),
          priceValue: p.precio,
          image: p.imagenes_propiedades?.[0]?.image_url ?? '',
          bedrooms: p.habitaciones ?? 0,
          bathrooms: p.banios ?? 0,
          sqm: p.area ?? 0,
          coordinates: { lat: p.latitud!, lng: p.longitud! },
        })),
    [filtered]
  );

  return (
    <div className="flex flex-col h-screen bg-white text-[#231f20] overflow-hidden">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between bg-[#002d43] px-6 py-3 z-50 shadow-md">
        <Link to="/" className="flex items-center gap-4 text-white hover:opacity-90 transition-opacity">
          <div className="size-8 flex items-center justify-center bg-white/10 rounded-lg text-[#867027]">
            <Building2 className="size-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight uppercase">
            {site?.site_name ? <>{site.site_name}</> : <>Frank Co <span className="text-[#867027]">Asesores</span></>}
          </h2>
        </Link>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <Link to="/propiedades" className="text-white/90 hover:text-[#867027] text-sm font-medium transition-colors">Propiedades</Link>
            <Link to="/listings" className="text-white/70 hover:text-[#867027] text-sm font-medium transition-colors">Portafolio</Link>
          </nav>

          <div className="flex gap-3">
            <button className="flex size-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
              <Bell className="size-5" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
              <User className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Lista */}
        <aside className="w-full lg:w-[450px] xl:w-[500px] shrink-0 flex flex-col bg-white border-r border-[#f0f3f5] h-full shadow-xl z-20">
          <div className="flex flex-col border-b border-[#f0f3f5] bg-white sticky top-0 z-30">
            <div className="px-5 pt-6 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  className="pl-10 bg-gray-50 border-gray-200 focus:ring-[#002d43] focus:border-[#002d43]"
                  placeholder="Ciudad, colonia o nombre"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 px-5 pb-5 overflow-x-auto no-scrollbar">
              {urlOperacion && (
                <Link
                  to={`/propiedades?${new URLSearchParams([...Array.from(searchParams.entries())].filter(([k]) => k !== 'operacion')).toString()}`}
                  className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-[#002d43] bg-[#002d43]/5 px-3 text-[#002d43] text-xs font-semibold"
                >
                  {urlOperacion === 'venta' ? 'Comprar' : urlOperacion === 'renta' ? 'Rentar' : 'Pre-Venta'} <X className="size-4" />
                </Link>
              )}
              {urlTipo && (
                <Link
                  to={`/propiedades?${new URLSearchParams([...Array.from(searchParams.entries())].filter(([k]) => k !== 'tipo')).toString()}`}
                  className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-[#867027] bg-[#867027]/5 px-3 text-[#867027] text-xs font-semibold"
                >
                  {urlTipo.charAt(0).toUpperCase() + urlTipo.slice(1)} <X className="size-4" />
                </Link>
              )}
              {!urlOperacion && !urlTipo && (
                <span className="flex h-8 shrink-0 items-center px-3 text-xs text-gray-400">Sin filtros activos</span>
              )}
            </div>

            <div className="flex items-center justify-between px-5 py-3 bg-[#f8fafb] border-t border-[#f0f3f5]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {isLoading ? 'Cargando…' : `${filtered.length} propiedad${filtered.length !== 1 ? 'es' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`}
              </span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#002d43] transition-colors">
                <span className="text-xs font-bold">Ordenar: Recomendados</span>
                <ChevronDown className="size-4" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafb]">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 h-28 animate-pulse" />
              ))
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="size-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-gray-400">Sin resultados</p>
                <p className="text-xs text-gray-400 mt-1">Intenta con otra búsqueda</p>
              </div>
            ) : (
              filtered.map((prop) => {
                const img = prop.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
                return (
                  <Link
                    to={`/propiedad/${prop.id}`}
                    key={prop.id}
                    className="relative flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="p-4 flex gap-4">
                      <div className="relative w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img src={img} alt={prop.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-[#002d43] uppercase">
                          {actionLabel(prop.id_tipo_accion)}
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-[#002d43] text-sm font-bold leading-tight group-hover:text-[#867027] transition-colors line-clamp-1">
                              {prop.nombre}
                            </h3>
                            <button className="text-gray-400 hover:text-[#867027] transition-colors" onClick={(e) => e.preventDefault()}>
                              <Bookmark className="size-4" />
                            </button>
                          </div>
                          <p className="text-gray-500 text-[10px] mt-1 flex items-center gap-1">
                            <MapPin className="size-3" />
                            {[prop.colonia, prop.ciudad_nombre].filter(Boolean).join(', ')}
                          </p>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div>
                            <p className="text-base font-extrabold text-[#143f61]">{formatPrice(prop.precio, prop.moneda)}</p>
                            <div className="flex gap-3 text-[10px] text-gray-400 font-medium mt-0.5">
                              {prop.habitaciones != null && <span className="flex items-center gap-0.5"><Bed className="size-3" /> {prop.habitaciones}</span>}
                              {prop.banios != null && <span className="flex items-center gap-0.5"><Bath className="size-3" /> {prop.banios}</span>}
                              {prop.area != null && <span className="flex items-center gap-0.5"><Square className="size-3" /> {prop.area}m²</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </aside>

        {/* Mapa */}
        <section className="flex-1 relative h-full">
          <PropertyMap properties={mapProperties} mapboxToken={mapboxToken} initialCenter={initialCenter} />
        </section>
      </div>
    </div>
  );
};

export default Properties;
