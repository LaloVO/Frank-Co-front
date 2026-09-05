const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_CBF_API_URL as string;
  if (envUrl && envUrl.trim() !== "" && envUrl.trim() !== "undefined") {
    return envUrl.trim();
  }
  
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:8080/api/cbf";
    }
  }
  return "";
};

const BASE_URL = getBaseUrl();
const API_KEY = (import.meta.env.VITE_CBF_API_KEY as string) || "cbf_live_PENDING_UUID";

export interface CBFImage {
  image_url: string;
}

export interface CBFProperty {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo?: string;
  precio: number;
  moneda?: string;
  area?: number;
  habitaciones?: number;
  banios?: number;
  estacionamientos?: number;
  direccion?: string;
  colonia?: string;
  ciudad_nombre?: string;
  estado_nombre?: string;
  id_tipo_accion?: number;
  latitud?: number;
  longitud?: number;
  caracteristicas?: string;
  imagenes_propiedades?: CBFImage[];
  // Campos de desarrollo
  is_unit?: boolean | null;
  parent_id?: number | null;
  development_verticals?: string[] | null;
  fecha_entrega?: string | null;
  fecha_inicio?: string | null;
  comision?: number | null;
  descripcion_estado?: string | null;
  descripcion_inversion?: string | null;
}

export interface CBFUser {
  id: string;
  nombre_usuario: string;
  email_usuario: string;
  telefono_usuario?: string;
  imagen_perfil_usuario?: string;
}

export interface CBFSite {
  id: string;
  site_name: string;
  subdomain?: string;
  theme_config?: { logo?: string; primaryColor?: string };
  platform_config?: { mapbox_token?: string | null };
}

const headers = () => {
  if (!BASE_URL || API_KEY === "cbf_live_PENDING_UUID") {
    throw new Error("La conexión CBF requiere configuración autorizada");
  }
  return {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
};

export async function fetchSiteUser(): Promise<{ user: CBFUser; site: CBFSite }> {
  const res = await fetch(`${BASE_URL}/user`, { headers: headers() });
  if (!res.ok) throw new Error("Error al cargar datos del sitio");
  const json = await res.json();
  return json.data;
}

export async function fetchProperties(params?: {
  limit?: number;
  offset?: number;
  tipo?: string;
  id_tipo_accion?: number;
  is_unit?: boolean;
}): Promise<{ data: CBFProperty[]; pagination: { limit: number; offset: number; total: number } }> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  if (params?.tipo) query.set("tipo", params.tipo);
  if (params?.id_tipo_accion !== undefined)
    query.set("id_tipo_accion", String(params.id_tipo_accion));
  if (params?.is_unit !== undefined)
    query.set("is_unit", String(params.is_unit));

  const res = await fetch(`${BASE_URL}/properties?${query}`, { headers: headers() });
  if (!res.ok) throw new Error("Error al cargar propiedades");
  return res.json();
}

export async function fetchProperty(id: string): Promise<CBFProperty> {
  const res = await fetch(`${BASE_URL}/properties/${id}`, { headers: headers() });
  if (!res.ok) throw new Error("Propiedad no encontrada");
  const json = await res.json();
  return json.data ?? json;
}

export function formatPrice(precio: number, moneda: string = "MXN"): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: moneda || "MXN",
    maximumFractionDigits: 0,
  }).format(precio);
}

export interface LeadSubmission {
  nombre_completo: string;
  email: string;
  telefono: string;
  tipo_operacion: "compra" | "renta";
  tipo_propiedad: string;
  num_habitaciones?: string;
  num_banos?: string;
  num_estacionamientos?: string;
  metros_cuadrados_min?: string;
  metros_cuadrados_max?: string;
  estados_deseados: string[];
  ciudades_deseadas?: string[];
  zonas_especificas?: string;
  estilo_vida_descripcion: string;
  presupuesto_min: string;
  presupuesto_max: string;
  metodo_pago: string[];
  tiene_precalificacion_crediticia?: boolean;
  institucion_crediticia?: string;
  uso_destino: "vivienda_propia" | "inversion" | "negocio" | "vacacional" | "otro";
  detalles_uso?: string;
  documentos_disponibles?: string[];
  documentos_urls?: Record<string, string>;
  cita_virtual_solicitada?: boolean;
  cita_virtual_fecha_hora?: string;
}

export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; data: any }> {
  const res = await fetch(`${BASE_URL}/leads`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || "Error al enviar la solicitud de búsqueda inteligente");
  }
  return res.json();
}

export interface CBFPost {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  post_type: "post" | "blog";
  created_at: string;
  property?: CBFProperty | null;
}

export async function fetchPosts(params?: {
  post_type?: "post" | "blog";
  limit?: number;
}): Promise<{ data: CBFPost[] }> {
  const query = new URLSearchParams();
  if (params?.post_type) query.set("post_type", params.post_type);
  if (params?.limit) query.set("limit", String(params.limit));
  const res = await fetch(`${BASE_URL}/posts?${query}`, { headers: headers() });
  if (!res.ok) throw new Error("Error al cargar posts");
  return res.json();
}

export async function fetchBusySlots(): Promise<Array<{ start: string; end: string }>> {
  const res = await fetch(`${BASE_URL}/calendar/busy-slots`, { headers: headers() });
  if (!res.ok) throw new Error("Error al cargar horarios ocupados");
  const json = await res.json();
  return json.busySlots || [];
}

export function actionLabel(id?: number): string {
  const map: Record<number, string> = {
    1: "Venta",
    2: "Renta",
    3: "Traspaso",
    4: "Pre-Venta",
    5: "Aportación",
    6: "Remate"
  };
  return id ? (map[id] ?? "Venta") : "Venta";
}

// ─────────────────────────────────────────────────────────────────────────────
// Módulo Inteligencia — Valuación con el Brain (vía madre nodriza)
// ─────────────────────────────────────────────────────────────────────────────

export interface ValuationRequest {
  lat: number;
  lon: number;
  direccion: string;
  tipo_inmueble?: number; // 2=Casa, 3=Casa en Condominio, 4=Departamento
  superficie_construida?: number;
  tamano_terreno?: number;
  habitaciones?: number;
  banos?: number;
  estacionamientos?: number;
  vivienda_nueva_usada?: "Nueva" | "Usada";
  antiguedad_anos?: number;
  estado_conservacion?: "malo" | "regular" | "bueno" | "excelente";
  radius?: number;
  clase_inmueble?: number;
  cvegeo?: string;
}

export interface ValuationExplanation {
  summary: string;
  keyInsights: string[];
  recommendations: string[];
  riskFactors: string[];
  opportunities: string[];
  confidence: number;
}

export interface ValuationResult {
  valor: number;
  valor_m2: number | null;
  rango: [number, number];
  confidence: number;
  explanation: ValuationExplanation | null;
  comparables: number;
  status: "estimated" | "insufficient_comparables";
  search_params?: Record<string, unknown>;
}

export interface ValuationResponse {
  success: boolean;
  data?: ValuationResult;
  code?: "INSUFFICIENT_COMPARABLES";
  message?: string;
  comparableCount?: number;
  suggestedNextSteps?: string[];
}

export async function submitValuation(
  request: ValuationRequest
): Promise<ValuationResponse> {
  const res = await fetch(`${BASE_URL}/intelligence/valuation`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || "Error al obtener la valuación");
  }
  return res.json();
}
