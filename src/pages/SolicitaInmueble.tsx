import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";

const SolicitaInmueble = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <main className="min-h-screen bg-background pt-24 pb-16">
        {/* Header */}
        <section className="text-center px-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[#002d43] mb-4">
            Solicita tu{" "}
            <span className="text-[#867027]">Inmueble Ideal</span>
          </h1>
          <p className="text-[#4b5563] text-sm max-w-xl mx-auto leading-relaxed">
            Completa tu perfil en 6 pasos. Nuestro equipo analizará tu
            expediente y te contactará con las mejores opciones.
          </p>
        </section>

        {/* Formulario */}
        <section className="px-4">
          <FormularioMultiStep onSubmitComplete={() => navigate("/")} />
        </section>
      </main>
    </Layout>
  );
};

export default SolicitaInmueble;
