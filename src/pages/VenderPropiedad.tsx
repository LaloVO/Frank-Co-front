import { Header } from "@/components/layout/Header";
import FormularioVenderPropiedad from "@/components/home/FormularioVenderPropiedad";
import { useSiteUser } from "@/hooks/useSiteUser";
import { Building2, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function VenderPropiedad() {
  const { user, site } = useSiteUser();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8] font-sans">
      <Header />

      <main className="flex-grow pt-10 pb-20 text-[#002d43] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-[#002d43] tracking-tight">
              Vende tu <span className="text-[#867027]">Propiedad</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-gray-600 max-w-xl mx-auto mt-3 leading-relaxed">
              Comparte los datos de tu inmueble. Nuestro equipo evaluará tu propiedad y te presentará una estrategia de venta personalizada en menos de 24 horas.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            <FormularioVenderPropiedad />
          </div>
        </div>
      </main>

      {/* Footer Frank style */}
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
}
