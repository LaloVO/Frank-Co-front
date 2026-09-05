import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Facebook,
  Instagram,
  Twitter,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePropertyCatalog } from '@/hooks/usePropertyCatalog';
import { useSiteUser } from '@/hooks/useSiteUser';
import { formatPrice, actionLabel } from '@/lib/cbf';
import { Header } from '@/components/layout/Header';
import { AnimatedPropertySelector } from '@/components/home/AnimatedPropertySelector';
import ValuationWidget from '@/components/home/ValuationWidget';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2500&auto=format&fit=crop';

const Index = () => {
  const navigate = useNavigate();
  const { developments, standaloneUnits, isLoading: loadingCatalog } = usePropertyCatalog();
  const { user, site } = useSiteUser();

  const [heroLocation, setHeroLocation] = useState('');
  const [heroOperation, setHeroOperation] = useState('venta');
  const [heroType, setHeroType] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  const mapboxToken = (site?.platform_config?.mapbox_token ?? import.meta.env.VITE_MAPBOX_TOKEN ?? '').trim();

  useEffect(() => {
    const close = () => setShowSuggestions(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    if (!heroLocation.trim() || !mapboxToken) { setSuggestions([]); return; }
    if (selectedCoords && heroLocation === selectedCoords.name) return;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(heroLocation)}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.features ?? []);
          setShowSuggestions(true);
        }
      } catch (_) {}
    }, 300);

    return () => clearTimeout(timer);
  }, [heroLocation, mapboxToken, selectedCoords]);

  const handleSuggestionClick = (feature: any) => {
    const [lng, lat] = feature.center;
    setHeroLocation(feature.place_name);
    setSelectedCoords({ lat, lng, name: feature.place_name });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleHeroSearch = async () => {
    const params = new URLSearchParams();
    const loc = heroLocation.trim();
    if (loc) params.set('ubicacion', loc);
    if (heroOperation) params.set('operacion', heroOperation);
    if (heroType) params.set('tipo', heroType);

    if (selectedCoords) {
      params.set('lat', String(selectedCoords.lat));
      params.set('lng', String(selectedCoords.lng));
    } else if (loc && mapboxToken) {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc)}.json?access_token=${mapboxToken}&limit=1&country=mx`
        );
        if (res.ok) {
          const data = await res.json();
          const feature = data.features?.[0];
          if (feature) {
            const [lng, lat] = feature.center;
            params.set('lat', String(lat));
            params.set('lng', String(lng));
          }
        }
      } catch (_) {}
    }

    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8] font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-[650px] md:h-[800px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2500&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-[#002d43]/40 z-[1]" />

          <div className="relative z-[2] w-full max-w-7xl px-4 md:px-10 flex flex-col items-center gap-8 text-center pt-20">
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
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      placeholder="Ciudad, colonia o estado"
                      value={heroLocation}
                      onChange={(e) => {
                        setHeroLocation(e.target.value);
                        if (selectedCoords && e.target.value !== selectedCoords.name) setSelectedCoords(null);
                      }}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleHeroSearch(); }}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:border-[#002d43]"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[200] max-h-56 overflow-y-auto">
                        {suggestions.map((s) => (
                          <li key={s.id}>
                            <button
                              type="button"
                              onClick={() => handleSuggestionClick(s)}
                              className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-[#002d43] hover:text-white transition-colors border-b border-gray-100 last:border-0 flex items-start gap-2"
                            >
                              <MapPin className="size-3 mt-0.5 shrink-0 text-[#867027]" />
                              <span>{s.place_name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Operación</span>
                  <select
                    value={heroOperation}
                    onChange={(e) => setHeroOperation(e.target.value)}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:border-[#002d43]"
                  >
                    <option value="venta">Comprar</option>
                    <option value="renta">Rentar</option>
                    <option value="preventa">Pre-Venta</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Tipo</span>
                  <select
                    value={heroType}
                    onChange={(e) => setHeroType(e.target.value)}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:border-[#002d43]"
                  >
                    <option value="">Cualquier tipo</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="oficina">Oficina</option>
                    <option value="local">Local Comercial</option>
                    <option value="bodega">Bodega</option>
                  </select>
                </div>
                <Button
                  onClick={handleHeroSearch}
                  className="h-[46px] bg-[#002d43] hover:bg-[#867027] text-white font-bold gap-2 w-full"
                >
                  <Search className="size-5" />
                  Buscar
                </Button>
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

        {/* FILA 1: Desarrollos Exclusivos (is_unit === false) */}
        <section className="py-20 px-4 md:px-10 bg-white border-b border-gray-100">
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

            {loadingCatalog ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
                ))}
              </div>
            ) : developments.length === 0 ? (
              <div className="bg-[#f8fafb] rounded-2xl p-12 text-center border border-gray-100">
                <Building2 className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg font-semibold">Próximamente nuevos desarrollos</p>
                <p className="text-gray-400 text-sm mt-1">Estamos preparando proyectos exclusivos para ti</p>
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

                          {dev.descripcion && (
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed pt-1">
                              {dev.descripcion}
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
        <section className="py-20 px-4 md:px-10 bg-[#f8fafb]">
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

            {loadingCatalog ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
                ))}
              </div>
            ) : standaloneUnits.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <Building2 className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg font-semibold">Propiedades próximamente</p>
                <p className="text-gray-400 text-sm mt-1">Estamos preparando nuestro catálogo de propiedades individuales</p>
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

        {/* Sección Solicitar Inmueble (Smart Search CTA) */}
        <section className="bg-white py-20 px-4 md:px-10 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#002d43] leading-tight">
                Encuentra la residencia ideal según tu <span className="text-[#867027]">estilo de vida</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                ¿No encontraste lo que buscabas? Completa nuestra solicitud de inmueble en pocos pasos indicando tu presupuesto, zona de preferencia, financiamiento y requerimientos clave.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nuestros asesores expertos analizarán tu perfil para encontrar o gestionar la propiedad perfecta para ti.
              </p>

              <div className="pt-2">
                <Link to="/solicita-inmueble">
                  <Button className="bg-[#002d43] hover:bg-[#867027] text-white rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg">
                    Solicitar Inmueble <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center justify-center">
              <AnimatedPropertySelector />
            </div>
          </div>
        </section>

        {/* Módulo Inteligencia — Valuación con el Brain */}
        <ValuationWidget />
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
            <p className="text-gray-500 text-xs">© 2025 {site?.site_name ?? 'Frank & Co. Consultores'}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
