import React, { useState } from "react";
import { MapPin, Bed, Bath, Square, Car, Loader2, Sparkles, RotateCcw, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteUser } from "@/hooks/useSiteUser";
import { submitValuation, formatPrice, type ValuationResult } from "@/lib/cbf";

const TIPO_OPTIONS = [
  { value: 2, label: "Casa" },
  { value: 3, label: "Casa en Condominio" },
  { value: 4, label: "Departamento" },
];

const CONSERVACION_OPTIONS = [
  { value: "malo", label: "Malo" },
  { value: "regular", label: "Regular" },
  { value: "bueno", label: "Bueno" },
  { value: "excelente", label: "Excelente" },
];

const CONFIDENCE_LABEL: Record<number, string> = {
  0.2: "Baja",
  0.4: "Media-baja",
  0.65: "Media",
  0.85: "Alta",
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-sm text-[#231f20] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#867027]/40 focus:border-[#867027] transition-all";

const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#002d43] mb-1.5";

const ValuationWidget = () => {
  const { site } = useSiteUser();
  const mapboxToken = (site?.platform_config?.mapbox_token ?? import.meta.env.VITE_MAPBOX_TOKEN ?? "").trim();

  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState<number>(4);
  const [superficie, setSuperficie] = useState("");
  const [habitaciones, setHabitaciones] = useState("");
  const [banos, setBanos] = useState("");
  const [estacionamientos, setEstacionamientos] = useState("");
  const [conservacion, setConservacion] = useState<"malo" | "regular" | "bueno" | "excelente">("bueno");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const geocode = async (query: string): Promise<{ lat: number; lon: number } | null> => {
    if (!mapboxToken) {
      setGeoError("El mapa no está disponible en este momento.");
      return null;
    }
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=1&types=neighborhood,locality,place,address&country=mx`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const feature = data.features?.[0];
    if (!feature) return null;
    const [lon, lat] = feature.center;
    return { lat, lon };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGeoError(null);
    setResult(null);

    if (!direccion.trim()) {
      setError("Escribe una colonia o zona para ubicar la propiedad.");
      return;
    }

    setLoading(true);
    try {
      const coords = await geocode(direccion.trim());
      if (!coords) {
        setError("No pudimos ubicar esa zona. Prueba con una colonia o ciudad más específica.");
        return;
      }

      const response = await submitValuation({
        lat: coords.lat,
        lon: coords.lon,
        direccion: direccion.trim(),
        tipo_inmueble: tipo,
        superficie_construida: superficie ? Number(superficie) : undefined,
        habitaciones: habitaciones ? Number(habitaciones) : undefined,
        banos: banos ? Number(banos) : undefined,
        estacionamientos: estacionamientos ? Number(estacionamientos) : undefined,
        estado_conservacion: conservacion,
      });

      if (!response.success) {
        setError(
          response.message ??
            "No hay suficientes comparables en esa zona para estimar con calidad. Prueba con una zona más céntrica."
        );
        return;
      }
      setResult(response.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error al obtener la valuación.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setGeoError(null);
  };

  return (
    <section className="bg-[#f5f7f8] py-20 px-4 md:px-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#002d43] leading-tight">
            ¿Cuánto vale tu <span className="text-[#867027]">propiedad</span>?
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Estimación inteligente con análisis de avalúos comparables de la zona, calibración de mercado y explicación generada por inteligencia artificial.
          </p>
          <div className="flex items-start gap-3 text-sm text-gray-500">
            <TrendingUp className="size-5 text-[#867027] shrink-0 mt-0.5" />
            <p>
              El valor estimado es una referencia de mercado, no una valuación formal. Para una tasación certificada, contáctanos.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl shadow-[#002d43]/5 p-6 md:p-8">
            {!result ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>Zona o colonia</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#867027]" />
                    <input
                      className={`${inputClass} pl-11`}
                      placeholder="Ej. Polanco, Ciudad de México"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  {geoError && <p className="text-xs text-red-600 mt-1">{geoError}</p>}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Tipo</label>
                    <select
                      className={inputClass}
                      value={tipo}
                      onChange={(e) => setTipo(Number(e.target.value))}
                      disabled={loading}
                    >
                      {TIPO_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Conservación</label>
                    <select
                      className={inputClass}
                      value={conservacion}
                      onChange={(e) => setConservacion(e.target.value as typeof conservacion)}
                      disabled={loading}
                    >
                      {CONSERVACION_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>m² construidos</label>
                    <div className="relative">
                      <Square className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#867027]" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="number"
                        min="1"
                        placeholder="120"
                        value={superficie}
                        onChange={(e) => setSuperficie(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Habitaciones</label>
                    <div className="relative">
                      <Bed className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#867027]" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="number"
                        min="0"
                        placeholder="3"
                        value={habitaciones}
                        onChange={(e) => setHabitaciones(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Baños</label>
                    <div className="relative">
                      <Bath className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#867027]" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="number"
                        min="0"
                        placeholder="2"
                        value={banos}
                        onChange={(e) => setBanos(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Estacionamientos</label>
                    <div className="relative">
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#867027]" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="number"
                        min="0"
                        placeholder="2"
                        value={estacionamientos}
                        onChange={(e) => setEstacionamientos(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#002d43] hover:bg-[#867027] text-white rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Analizando mercado…
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 size-4" /> Estimar valor
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#867027]">
                      Valor estimado · {direccion}
                    </p>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#002d43] mt-2">
                      {formatPrice(result.valor)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Rango: {formatPrice(result.rango[0])} – {formatPrice(result.rango[1])}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={reset}
                    className="rounded-full shrink-0"
                    title="Nueva valuación"
                  >
                    <RotateCcw className="size-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl bg-[#f5f7f8] px-4 py-3">
                    <p className="text-xs text-gray-500">Precio por m²</p>
                    <p className="font-bold text-[#002d43]">
                      {result.valor_m2 ? formatPrice(result.valor_m2) : "—"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#f5f7f8] px-4 py-3">
                    <p className="text-xs text-gray-500">Confianza</p>
                    <p className="font-bold text-[#002d43]">
                      {CONFIDENCE_LABEL[result.confidence] ?? "Baja"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#f5f7f8] px-4 py-3">
                    <p className="text-xs text-gray-500">Comparables</p>
                    <p className="font-bold text-[#002d43]">{result.comparables}</p>
                  </div>
                </div>

                {result.explanation && (
                  <div className="rounded-2xl border border-[#867027]/20 bg-gradient-to-br from-[#f5f7f8] to-white p-5 space-y-4">
                    <p className="text-sm text-[#231f20] leading-relaxed">
                      {result.explanation.summary}
                    </p>
                    {result.explanation.keyInsights.length > 0 && (
                      <ul className="space-y-2">
                        {result.explanation.keyInsights.map((insight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="size-1.5 rounded-full bg-[#867027] mt-2 shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    )}
                    {result.explanation.recommendations.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#002d43] mb-2">
                          Recomendaciones
                        </p>
                        <ul className="space-y-2">
                          {result.explanation.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="size-1.5 rounded-full bg-[#002d43] mt-2 shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  Estimación generada con análisis de avalúos comparables y calibración de mercado. Referencia informativa, no constituye una valuación formal.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuationWidget;
