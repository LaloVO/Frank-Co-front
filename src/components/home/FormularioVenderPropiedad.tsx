import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  User,
  Mail,
  Phone,
  Image as ImageIcon,
  Home,
  DollarSign,
  MapPin,
  FileText,
  Upload,
  X,
  Check,
  CheckCircle,
  Layers,
  BedDouble,
  Bath,
  Car,
  Maximize,
  Building2,
  TreePine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useSiteUser } from "@/hooks/useSiteUser";
import {
  uploadSellerFile,
  submitSellerInquiry,
  insertSellerImages,
  insertSellerDocuments,
  insertSellerAmenidades,
  fetchEstados,
  fetchCiudadesByEstado,
  fetchAmenidades,
  geocodeAddress,
} from "@/lib/sellerInquiry";

// ─── Constants ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "cbf-seller-funnel-draft";

const TIPOS_PROPIEDAD = [
  { id: 1, label: "Casa" },
  { id: 2, label: "Departamento" },
  { id: 3, label: "Terreno" },
  { id: 4, label: "Oficina" },
  { id: 5, label: "Local Comercial" },
  { id: 6, label: "Bodega" },
  { id: 7, label: "Loft" },
  { id: 8, label: "Lote" },
  { id: 9, label: "Nave Industrial" },
];

const TIPOS_ACCION = [
  { id: 1, label: "Venta" },
  { id: 2, label: "Renta" },
  { id: 3, label: "Traspaso" },
  { id: 4, label: "Pre-Venta" },
  { id: 5, label: "Aportación" },
  { id: 6, label: "Remate" },
  { id: 7, label: "Permuta" },
];

const TIPOS_RESIDENCIALES = new Set([1, 2, 7]);  // Casa, Departamento, Loft
const TIPOS_COMERCIALES   = new Set([4, 5]);      // Oficina, Local Comercial
const TIPOS_INDUSTRIALES  = new Set([6, 9]);      // Bodega, Nave Industrial

const IDS_AMENIDADES_RESIDENCIALES = new Set([
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,
  101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,
]);
const IDS_AMENIDADES_COMERCIALES = new Set([
  18,19,20,21,22,23,24,25,26,27,28,114,115,116,117,
]);
const IDS_AMENIDADES_INDUSTRIALES = new Set([
  21,22,23,24,35,36,37,38,39,114,
]);

const REQUIRED_DOCS = [
  { id: "escritura", label: "Escritura pública", required: false },
  { id: "cedula_catastral", label: "Cédula catastral", required: false },
  { id: "planos", label: "Planos", required: false },
  { id: "usos_suelo", label: "Permiso de usos de suelo", required: false },
  { id: "libertad_gravamen", label: "Certificado de Libertad de Gravamen", required: false },
  { id: "carta_adeudo", label: "Carta adeudo", required: false },
  { id: "identificacion", label: "Identificación oficial del vendedor", required: false },
  { id: "comprobante_domicilio", label: "Comprobante de domicilio", required: false },
  { id: "liberacion_credito", label: "Carta liberación de crédito", required: false },
  { id: "predial", label: "Constancia predial", required: false },
  { id: "avaluo", label: "Avalúo catastral", required: false },
  { id: "antiguedad", label: "Constancia de Antigüedad", required: false },
];

const INHERITANCE_DOCS = [
  { id: "testamento", label: "Testamento", required: false },
  { id: "declaracion_herederos", label: "Declaración de herederos", required: false },
  { id: "cert_defuncion", label: "Certificado de defunción", required: false },
  { id: "acta_aceptacion", label: "Acta de aceptación de herencia", required: false },
];

const STEPS = [
  { id: 1, title: "Contacto", icon: User },
  { id: 2, title: "Imágenes", icon: ImageIcon },
  { id: 3, title: "Características", icon: Home },
  { id: 4, title: "Descripciones", icon: FileText },
  { id: 5, title: "Documentos", icon: Layers },
];

// ─── Zod schemas ────────────────────────────────────────────────────────────

const step1Schema = z.object({
  nombre_completo: z.string().min(3, "Nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
});

const step2Schema = z.object({
  id_tipo_accion: z.number({ required_error: "Selecciona el tipo de operación" }).min(1, "Selecciona el tipo de operación"),
});

const step3Schema = z.object({
  id_tipo_propiedad: z.number({ required_error: "Selecciona el tipo de propiedad" }).min(1),
  precio_propiedad: z.number({ required_error: "Ingresa el precio" }).positive(),
  id_estado: z.number({ required_error: "Selecciona el estado" }).min(1),
  id_ciudad: z.number({ required_error: "Selecciona la ciudad" }).min(1),
  direccion: z.string().min(5, "Ingresa la dirección completa"),
  titulo_propiedad: z.string().optional(),
  colonia: z.string().optional(),
  codigo_postal: z.string().optional(),
  area_propiedad: z.number().positive().optional(),
  area_construida: z.number().positive().optional(),
  habitaciones_propiedad: z.number().int().min(0).optional(),
  banios_propiedad: z.number().min(0).optional(),
  estacionamientos_propiedad: z.number().int().min(0).optional(),
  numero_plantas: z.number().int().min(0).optional(),
  referencias: z.string().optional(),
});

const step4Schema = z.object({
  descripcion_propiedad: z.string().min(30, "Describe la propiedad con al menos 30 caracteres"),
  descripcion_estado_propiedad: z.string().optional(),
  descripcion_inversion_propiedad: z.string().optional(),
});

const fullSchema = z.object({
  nombre_completo: z.string().min(3),
  email: z.string().email(),
  telefono: z.string().min(10),
  id_tipo_accion: z.number().min(1),
  id_tipo_propiedad: z.number().min(1),
  precio_propiedad: z.number().positive(),
  id_estado: z.number().min(1),
  id_ciudad: z.number().min(1),
  direccion: z.string().min(5),
  titulo_propiedad: z.string().optional(),
  colonia: z.string().optional(),
  codigo_postal: z.string().optional(),
  area_propiedad: z.number().positive().optional(),
  area_construida: z.number().positive().optional(),
  habitaciones_propiedad: z.number().int().min(0).optional(),
  banios_propiedad: z.number().min(0).optional(),
  estacionamientos_propiedad: z.number().int().min(0).optional(),
  numero_plantas: z.number().int().min(0).optional(),
  referencias: z.string().optional(),
  descripcion_propiedad: z.string().min(30),
  descripcion_estado_propiedad: z.string().optional(),
  descripcion_inversion_propiedad: z.string().optional(),
  documentos_urls: z.record(z.string()).optional(),
});

type FormData = z.infer<typeof fullSchema>;

// ─── Image state type ────────────────────────────────────────────────────────

interface PropertyImage {
  id: string;
  file: File;
  previewUrl: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function FormularioVenderPropiedad() {
  const { user, site } = useSiteUser();
  const mapboxToken = (site?.platform_config?.mapbox_token ?? "").trim();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Step 2 — Images
  const [images, setImages] = useState<PropertyImage[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Step 3 — Cascading selects
  const [estados, setEstados] = useState<{ id_estado: number; nombre_estado: string }[]>([]);
  const [ciudades, setCiudades] = useState<{ id_ciudad: number; nombre_ciudad: string }[]>([]);
  const [loadingCiudades, setLoadingCiudades] = useState(false);

  // Step 5 — Docs + amenidades
  const [esHerencia, setEsHerencia] = useState(false);
  const [documentosUrls, setDocumentosUrls] = useState<Record<string, string>>({});
  const [uploadingDocs, setUploadingDocs] = useState<Record<string, boolean>>({});
  const [amenidades, setAmenidades] = useState<{ id_amenidad: number; nombre_amenidad: string }[]>([]);
  const [selectedAmenidades, setSelectedAmenidades] = useState<number[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: {
      nombre_completo: "",
      email: "",
      telefono: "",
      titulo_propiedad: "",
      direccion: "",
      colonia: "",
      codigo_postal: "",
      referencias: "",
      descripcion_propiedad: "",
      descripcion_estado_propiedad: "",
      descripcion_inversion_propiedad: "",
      documentos_urls: {},
    },
  });

  const { register, formState: { errors }, setValue, watch, trigger, getValues } = form;

  // Draft persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.entries(parsed).forEach(([key, val]) => {
          setValue(key as keyof FormData, val as any);
        });
      }
    } catch {}
  }, []);

  const watchedValues = watch();
  useEffect(() => {
    try {
      const { documentos_urls, ...rest } = watchedValues;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {}
  }, [watchedValues]);

  // Fetch estados on mount
  useEffect(() => {
    fetchEstados().then(setEstados);
  }, []);

  // Fetch amenidades on mount
  useEffect(() => {
    fetchAmenidades().then(setAmenidades);
  }, []);

  const watchedEstado = watch("id_estado");
  useEffect(() => {
    if (!watchedEstado) return;
    setLoadingCiudades(true);
    setValue("id_ciudad", 0 as any);
    fetchCiudadesByEstado(watchedEstado)
      .then(setCiudades)
      .finally(() => setLoadingCiudades(false));
  }, [watchedEstado]);

  // ─── Step navigation ───────────────────────────────────────────────────

  const validateCurrentStep = async (): Promise<boolean> => {
    if (currentStep === 1) return trigger(["nombre_completo", "email", "telefono"]);
    if (currentStep === 2) {
      const validOperacion = await trigger(["id_tipo_accion"]);
      if (!validOperacion) return false;
      if (images.length === 0) {
        toast.error("Agrega al menos una foto de la propiedad");
        return false;
      }
      return true;
    }
    if (currentStep === 3)
      return trigger([
        "id_tipo_propiedad",
        "precio_propiedad",
        "id_estado",
        "id_ciudad",
        "direccion",
      ]);
    if (currentStep === 4) return trigger(["descripcion_propiedad"]);
    return true;
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (valid) setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  // ─── Image handlers ────────────────────────────────────────────────────

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newImages: PropertyImage[] = files.map((file) => ({
      id: `${Date.now()}_${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  // ─── Document upload ───────────────────────────────────────────────────

  const handleDocUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    docId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;
    setUploadingDocs((prev) => ({ ...prev, [docId]: true }));
    try {
      const url = await uploadSellerFile(file, user.id, "seller-inquiry-docs");
      setDocumentosUrls((prev) => {
        const updated = { ...prev, [docId]: url };
        setValue("documentos_urls", updated);
        return updated;
      });
      toast.success("Documento subido");
    } catch (err: any) {
      toast.error(err.message || "Error al subir el documento");
    } finally {
      setUploadingDocs((prev) => ({ ...prev, [docId]: false }));
    }
  };

  const handleRemoveDoc = (docId: string) => {
    setDocumentosUrls((prev) => {
      const copy = { ...prev };
      delete copy[docId];
      setValue("documentos_urls", copy);
      return copy;
    });
  };

  // ─── Final submit ──────────────────────────────────────────────────────

  const handleFormSubmit = async (data: FormData) => {
    if (!user?.id) {
      toast.error("No se pudo identificar al asesor. Recarga la página.");
      return;
    }
    if (images.length === 0) {
      toast.error("Agrega al menos una foto de la propiedad");
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      // Geocoding (non-blocking)
      const estadoNombre =
        estados.find((e) => e.id_estado === data.id_estado)?.nombre_estado ?? "";
      const ciudadNombre =
        ciudades.find((c) => c.id_ciudad === data.id_ciudad)?.nombre_ciudad ?? "";

      const coords = mapboxToken
        ? await geocodeAddress(data.direccion, ciudadNombre, estadoNombre, mapboxToken)
        : null;

      // Upload images
      const uploadedImages: { image_url: string; nombre_imagen: string; orden: number }[] = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadSellerFile(images[i].file, user.id, "seller-inquiry-images");
        uploadedImages.push({ image_url: url, nombre_imagen: images[i].file.name, orden: i });
      }

      // Build documents list from uploaded docs
      const allDocs = [...REQUIRED_DOCS, ...(esHerencia ? INHERITANCE_DOCS : [])];
      const uploadedDocs = allDocs
        .filter((d) => data.documentos_urls?.[d.id])
        .map((d) => ({
          nombre_documento: d.label,
          file_url: data.documentos_urls![d.id],
          required: d.required,
        }));

      // Insert seller inquiry
      const inquiry = await submitSellerInquiry({
        advisor_user_id: user.id,
        nombre_completo: data.nombre_completo,
        email: data.email,
        telefono: data.telefono,
        id_tipo_accion: data.id_tipo_accion,
        titulo_propiedad: data.titulo_propiedad || undefined,
        id_tipo_propiedad: data.id_tipo_propiedad,
        precio_propiedad: data.precio_propiedad,
        id_estado: data.id_estado,
        id_ciudad: data.id_ciudad,
        estado_nombre: estadoNombre,
        ciudad_nombre: ciudadNombre,
        codigo_postal: data.codigo_postal || undefined,
        colonia: data.colonia || undefined,
        direccion: data.direccion,
        referencias: data.referencias || undefined,
        latitud: coords?.lat ?? null,
        longitud: coords?.lng ?? null,
        area_propiedad: data.area_propiedad,
        area_construida: data.area_construida,
        habitaciones_propiedad: data.habitaciones_propiedad,
        banios_propiedad: data.banios_propiedad,
        estacionamientos_propiedad: data.estacionamientos_propiedad,
        numero_plantas: data.numero_plantas,
        descripcion_propiedad: data.descripcion_propiedad,
        descripcion_estado_propiedad: data.descripcion_estado_propiedad || undefined,
        descripcion_inversion_propiedad: data.descripcion_inversion_propiedad || undefined,
        es_herencia: esHerencia,
      });

      await Promise.all([
        insertSellerImages(inquiry.id, uploadedImages),
        insertSellerDocuments(inquiry.id, uploadedDocs),
        insertSellerAmenidades(inquiry.id, selectedAmenidades),
      ]);

      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err: any) {
      toast.error(err.message || "Ocurrió un error. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Success screen ────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-title font-bold text-3xl text-foreground">¡Solicitud enviada!</h2>
        <p className="text-foreground/70 max-w-md">
          Recibimos los datos de tu propiedad. El equipo de Dreams Inmobiliaria se pondrá en
          contacto contigo muy pronto.
        </p>
        <p className="text-xs text-foreground/40">Redirigiendo al inicio…</p>
      </div>
    );
  }

  const progressPct = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => currentStep > step.id && setCurrentStep(step.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                currentStep === step.id
                  ? "text-primary"
                  : currentStep > step.id
                  ? "text-primary/60 cursor-pointer"
                  : "text-foreground/30 cursor-default"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all",
                  currentStep === step.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : currentStep > step.id
                    ? "border-primary/60 bg-primary/10"
                    : "border-foreground/20 bg-transparent"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              <span className="text-[10px] font-medium hidden sm:block">{step.title}</span>
            </button>
          ))}
        </div>
        <Progress value={progressPct} className="h-1.5" />
      </div>

      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        {/* ── STEP 1: Contacto ─────────────────────────────────────────── */}
        {currentStep === 1 && (
          <StepCard title="Tus datos de contacto" subtitle="¿Cómo podemos localizarte?">
            <Field label="Nombre completo" error={errors.nombre_completo?.message}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  {...register("nombre_completo")}
                  placeholder="Nombre y apellido"
                  className="pl-9"
                />
              </div>
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Correo electrónico" error={errors.email?.message}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="tu@correo.com"
                    className="pl-9"
                  />
                </div>
              </Field>
              <Field label="Teléfono" error={errors.telefono?.message}>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    {...register("telefono")}
                    type="tel"
                    placeholder="8441234567"
                    className="pl-9"
                  />
                </div>
              </Field>
            </div>
          </StepCard>
        )}

        {/* ── STEP 2: Operación y Fotos ─────────────────────────────────── */}
        {currentStep === 2 && (
          <StepCard title="Operación y Fotos" subtitle="Selecciona la modalidad de tu propiedad y agrega imágenes que la muestren bien">
            <div className="mb-6">
              <Field label="Tipo de operación *" error={errors.id_tipo_accion?.message}>
                <Select
                  onValueChange={(val) => setValue("id_tipo_accion", Number(val), { shouldValidate: true })}
                  value={watch("id_tipo_accion") ? String(watch("id_tipo_accion")) : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de operación" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_ACCION.map((a) => (
                      <SelectItem key={a.id} value={String(a.id)}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="w-full border-2 border-dashed border-primary/30 rounded-3xl p-10 flex flex-col items-center gap-3 hover:border-primary/60 hover:bg-primary/5 transition-all"
            >
              <Upload className="w-8 h-8 text-primary/50" />
              <span className="text-sm text-foreground/60 font-medium">
                Toca para seleccionar imágenes
              </span>
              <span className="text-xs text-foreground/40">PNG, JPG, WEBP — múltiples permitidas</span>
            </button>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {images.map((img, idx) => (
                  <div key={img.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-white/20">
                    <img
                      src={img.previewUrl}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </StepCard>
        )}

        {/* ── STEP 3: Características ──────────────────────────────────── */}
        {currentStep === 3 && (
          <StepCard title="Características de la propiedad" subtitle="Datos clave para la valuación">
            <Field label="Título de la propiedad (opcional)">
              <Input
                {...register("titulo_propiedad")}
                placeholder="Ej. Casa en fraccionamiento privado"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Tipo de propiedad" error={errors.id_tipo_propiedad?.message}>
                <Select
                  onValueChange={(val) => setValue("id_tipo_propiedad", Number(val))}
                  value={watch("id_tipo_propiedad") ? String(watch("id_tipo_propiedad")) : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_PROPIEDAD.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Precio (MXN)" error={errors.precio_propiedad?.message}>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    type="number"
                    placeholder="3500000"
                    className="pl-9"
                    onChange={(e) =>
                      setValue("precio_propiedad", parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Estado" error={errors.id_estado?.message}>
                <Select
                  onValueChange={(val) => setValue("id_estado", Number(val))}
                  value={watch("id_estado") ? String(watch("id_estado")) : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((e) => (
                      <SelectItem key={e.id_estado} value={String(e.id_estado)}>
                        {e.nombre_estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Ciudad" error={errors.id_ciudad?.message}>
                <Select
                  disabled={!watch("id_estado") || loadingCiudades}
                  onValueChange={(val) => setValue("id_ciudad", Number(val))}
                  value={watch("id_ciudad") ? String(watch("id_ciudad")) : ""}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingCiudades ? "Cargando…" : !watch("id_estado") ? "Primero elige estado" : "Selecciona ciudad"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ciudades.map((c) => (
                      <SelectItem key={c.id_ciudad} value={String(c.id_ciudad)}>
                        {c.nombre_ciudad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="Dirección completa" error={errors.direccion?.message}>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  {...register("direccion")}
                  placeholder="Calle, número, fraccionamiento"
                  className="pl-9"
                />
              </div>
            </Field>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Colonia">
                <Input {...register("colonia")} placeholder="Colonia" />
              </Field>
              <Field label="Código postal">
                <Input {...register("codigo_postal")} placeholder="25000" />
              </Field>
              <Field label="Área terreno (m²)">
                <div className="relative">
                  <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    type="number"
                    placeholder="200"
                    className="pl-9"
                    onChange={(e) =>
                      setValue("area_propiedad", parseFloat(e.target.value) || undefined)
                    }
                  />
                </div>
              </Field>
              <Field label="Área construida (m²)">
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    type="number"
                    placeholder="150"
                    className="pl-9"
                    onChange={(e) =>
                      setValue("area_construida", parseFloat(e.target.value) || undefined)
                    }
                  />
                </div>
              </Field>
              <Field label="Habitaciones">
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    type="number"
                    placeholder="3"
                    className="pl-9"
                    onChange={(e) =>
                      setValue("habitaciones_propiedad", parseInt(e.target.value) || undefined)
                    }
                  />
                </div>
              </Field>
              <Field label="Baños">
                <div className="relative">
                  <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    type="number"
                    placeholder="2"
                    className="pl-9"
                    onChange={(e) =>
                      setValue("banios_propiedad", parseFloat(e.target.value) || undefined)
                    }
                  />
                </div>
              </Field>
              <Field label="Estacionamientos">
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    type="number"
                    placeholder="2"
                    className="pl-9"
                    onChange={(e) =>
                      setValue("estacionamientos_propiedad", parseInt(e.target.value) || undefined)
                    }
                  />
                </div>
              </Field>
              <Field label="Plantas / Niveles">
                <Input
                  type="number"
                  placeholder="2"
                  onChange={(e) =>
                    setValue("numero_plantas", parseInt(e.target.value) || undefined)
                  }
                />
              </Field>
            </div>

            <Field label="Referencias adicionales (opcional)">
              <Textarea
                {...register("referencias")}
                placeholder="Referencias de ubicación, características especiales, etc."
                rows={2}
              />
            </Field>
          </StepCard>
        )}

        {/* ── STEP 4: Descripciones ─────────────────────────────────────── */}
        {currentStep === 4 && (
          <StepCard title="Descripción de la propiedad" subtitle="Cuéntanos sobre el inmueble">
            <Field label="Descripción general *" error={errors.descripcion_propiedad?.message}>
              <Textarea
                {...register("descripcion_propiedad")}
                placeholder="Describe las características principales de tu propiedad, qué la hace especial, ventajas del entorno, etc."
                rows={4}
              />
            </Field>
            <Field label="Condición actual del inmueble (opcional)">
              <Textarea
                {...register("descripcion_estado_propiedad")}
                placeholder="Estado de conservación, remodelaciones recientes, instalaciones, acabados…"
                rows={3}
              />
            </Field>
            <Field label="Potencial de inversión (opcional)">
              <Textarea
                {...register("descripcion_inversion_propiedad")}
                placeholder="¿Podría rentarse? ¿Subdivisión posible? ¿Plusvalía de la zona?"
                rows={3}
              />
            </Field>
          </StepCard>
        )}

        {/* ── STEP 5: Documentos + Amenidades ──────────────────────────── */}
        {currentStep === 5 && (
          <div className="space-y-8">
            {/* Herencia toggle */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  ¿La propiedad es parte de una herencia?
                </p>
                <p className="text-xs text-foreground/50 mt-0.5">
                  Se registrará como propiedad en proceso de herencia
                </p>
              </div>
              <Switch checked={esHerencia} onCheckedChange={setEsHerencia} />
            </div>

            {/* Documents */}
            <StepCard
              title="Expediente documental"
              subtitle="Sube los documentos que tengas disponibles ahora — puedes completarlos más adelante con tu asesor"
            >
              <div className="space-y-3">
                {REQUIRED_DOCS.map((doc) => {
                  const uploaded = !!documentosUrls[doc.id];
                  const uploading = !!uploadingDocs[doc.id];
                  return (
                    <div
                      key={doc.id}
                      className={cn(
                        "flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all",
                        uploaded
                          ? "border-primary/40 bg-primary/5"
                          : "border-white/10 bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {uploaded ? (
                          <Check className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-foreground/30 shrink-0" />
                        )}
                        <span className="text-xs text-foreground/70 truncate">{doc.label}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {uploaded && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDoc(doc.id)}
                            className="text-foreground/40 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleDocUpload(e, doc.id)}
                            disabled={uploading}
                          />
                          <span
                            className={cn(
                              "text-[11px] px-3 py-1.5 rounded-full border font-medium transition-all",
                              uploading
                                ? "border-foreground/20 text-foreground/30 cursor-wait"
                                : uploaded
                                ? "border-primary/40 text-primary"
                                : "border-foreground/30 text-foreground/60 hover:border-primary hover:text-primary"
                            )}
                          >
                            {uploading ? (
                              <span className="flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" /> Subiendo
                              </span>
                            ) : uploaded ? (
                              "Reemplazar"
                            ) : (
                              "Subir"
                            )}
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </StepCard>

            {/* Amenidades — filtradas por tipo de propiedad */}
            {(() => {
              const tipoId = watch("id_tipo_propiedad");
              let ids: Set<number> | null = null;
              if (TIPOS_RESIDENCIALES.has(tipoId)) ids = IDS_AMENIDADES_RESIDENCIALES;
              else if (TIPOS_COMERCIALES.has(tipoId))  ids = IDS_AMENIDADES_COMERCIALES;
              else if (TIPOS_INDUSTRIALES.has(tipoId)) ids = IDS_AMENIDADES_INDUSTRIALES;
              const lista = ids ? amenidades.filter((a) => ids!.has(a.id_amenidad)) : [];
              if (!lista.length) return null;
              return (
              <StepCard title="Amenidades" subtitle="Selecciona las que apliquen a tu propiedad">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {lista.map((am) => {
                    const selected = selectedAmenidades.includes(am.id_amenidad);
                    return (
                      <button
                        key={am.id_amenidad}
                        type="button"
                        onClick={() =>
                          setSelectedAmenidades((prev) =>
                            selected
                              ? prev.filter((id) => id !== am.id_amenidad)
                              : [...prev, am.id_amenidad]
                          )
                        }
                        className={cn(
                          "text-left text-xs px-3 py-2 rounded-2xl border transition-all",
                          selected
                            ? "border-primary bg-primary/10 text-primary font-medium"
                            : "border-white/10 bg-white/5 text-foreground/60 hover:border-primary/40"
                        )}
                      >
                        {selected && <Check className="inline w-3 h-3 mr-1" />}
                        {am.nombre_amenidad}
                      </button>
                    );
                  })}
                </div>
              </StepCard>
              );
            })()}
          </div>
        )}

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          {currentStep < 5 ? (
            <Button type="button" onClick={handleNext} className="gap-2 rounded-full px-8">
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 rounded-full px-8 min-w-[160px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Enviar solicitud
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── Helper components ───────────────────────────────────────────────────────

function StepCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 space-y-5">
      <div>
        <h3 className="font-title font-bold text-xl text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-foreground/60 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground/70 uppercase tracking-wide">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
