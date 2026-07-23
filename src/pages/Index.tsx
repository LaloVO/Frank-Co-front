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
import { Header } from '@/components/layout/Header';
import { AnimatedPropertySelector } from '@/components/home/AnimatedPropertySelector';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-e32870110044?q=80&w=2500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2500&auto=format&fit=crop',
];

const operacionMap: Record<string, number> = { venta: 1, renta: 2, preventa: 4 };

const Index = () => {
  const navigate = useNavigate();
  const { properties, isLoading } = useProperties({ limit: 4 });
  const { user, site } = useSiteUser();

  const [heroLocation, setHeroLocation] = useState('');
  const [heroOperation, setHeroOperation] = useState('venta');
  const [heroType, setHeroType] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  const mapboxToken = (site?.platform_config?.mapbox_token ?? import.meta.env.VITE_MAPBOX_TOKEN ?? '').trim();

  // Cierra sugerencias al hacer click fuera
  useEffect(() => {
    const close = () => setShowSuggestions(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // Fetch sugerencias con debounce mientras escribe
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

        {/* Sección Solicitar Inmueble (Smart Search CTA) */}
        <section className="bg-white py-20 px-4 md:px-10 border-t border-gray-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#867027] text-xs font-bold uppercase tracking-widest block">
                Asesoría Personalizada
              </span>
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
      </main>

      {/* Footer */}
      <footer className="bg-[#002d43] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <Building2 className="size-6 text-[#867027]" />
                <span className="text-xl font-bold tracking-tight uppercase text-white">
                  {site?.site_name ? <>{site.site_name}</> : <>Frank Co <span className="text-[#867027]">Asesores</span></>}
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
              <p className="text-gray-400 text-sm mb-2">{user?.nombre_usuario || 'Frank Co Asesores'}</p>
              <p className="text-gray-400 text-sm">{user?.email_usuario}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2025 {site?.site_name ?? 'Frank Co Asesores'}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
