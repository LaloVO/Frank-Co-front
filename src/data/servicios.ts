import {
  Landmark,
  TrendingUp,
  Home,
  FileText,
  ShieldCheck,
  Calculator,
  Scale,
  ClipboardList,
  LucideIcon,
} from 'lucide-react';

export type ServicioCta = 'homepty' | 'whatsapp' | 'whatsapp-gratuito';

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
  tienePaquetes: boolean;
  paquetes?: string[];
  cta: ServicioCta;
}

export const paquetesEstandar = ['Sesión única', 'Mensual', 'Anual'];

export const servicios: Servicio[] = [
  {
    id: 'financiera',
    titulo: 'Asesoría Financiera',
    descripcion:
      'Salir de deudas, finanzas sanas y control de presupuesto, con acompañamiento y consultoría personalizada.',
    icono: Landmark,
    tienePaquetes: true,
    paquetes: paquetesEstandar,
    cta: 'whatsapp',
  },
  {
    id: 'inversiones',
    titulo: 'Asesoría en Inversiones',
    descripcion:
      'Libertad financiera e instrumentos de inversión adaptados a tu perfil y objetivos.',
    icono: TrendingUp,
    tienePaquetes: true,
    paquetes: paquetesEstandar,
    cta: 'whatsapp',
  },
  {
    id: 'inmobiliaria',
    titulo: 'Asesoría Inmobiliaria',
    descripcion:
      'Compra, venta y renta de inmuebles, con el respaldo de la plataforma de Homepty.',
    icono: Home,
    tienePaquetes: false,
    cta: 'homepty',
  },
  {
    id: 'infonavit-productos',
    titulo: 'Productos y Programas de Infonavit',
    descripcion: 'Asesoría y gestoría de tus productos y programas disponibles ante Infonavit.',
    icono: FileText,
    tienePaquetes: true,
    paquetes: paquetesEstandar,
    cta: 'whatsapp',
  },
  {
    id: 'retiro-seguros',
    titulo: 'Retiro y Seguros',
    descripcion:
      'Asesoría para el retiro, seguros de autos y seguros de gastos médicos mayores.',
    icono: ShieldCheck,
    tienePaquetes: true,
    paquetes: paquetesEstandar,
    cta: 'whatsapp',
  },
  {
    id: 'contable',
    titulo: 'Asesoría Contable',
    descripcion: 'Acompañamiento contable personalizado para tus finanzas personales o negocio.',
    icono: Calculator,
    tienePaquetes: true,
    paquetes: paquetesEstandar,
    cta: 'whatsapp',
  },
  {
    id: 'juridica',
    titulo: 'Asesoría Jurídica',
    descripcion: 'Acompañamiento legal en materia penal, civil, mercantil y familiar.',
    icono: Scale,
    tienePaquetes: true,
    paquetes: paquetesEstandar,
    cta: 'whatsapp',
  },
  {
    id: 'infonavit-afore',
    titulo: 'Trámites de Infonavit y AFORE',
    descripcion:
      'Orientación gratuita en tus trámites de Infonavit y AFORE. Sesión introductoria sin costo.',
    icono: ClipboardList,
    tienePaquetes: false,
    cta: 'whatsapp-gratuito',
  },
];
