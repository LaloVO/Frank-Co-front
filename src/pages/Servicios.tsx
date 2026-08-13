import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useSiteUser } from '@/hooks/useSiteUser';
import { Servicio, servicios } from '@/data/servicios';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=1800&auto=format&fit=crop';

function useContactLink(mensaje: string) {
  const { user } = useSiteUser();

  if (user?.telefono_usuario) {
    return {
      href: `https://wa.me/${user.telefono_usuario.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`,
      icon: MessageCircle,
      label: 'Iniciar conversación',
    };
  }

  if (user?.email_usuario) {
    return {
      href: `mailto:${user.email_usuario}?subject=${encodeURIComponent('Interés en asesoría')}&body=${encodeURIComponent(mensaje)}`,
      icon: Mail,
      label: 'Escribir por correo',
    };
  }

  return null;
}

function ServiceAction({ servicio }: { servicio: Servicio }) {
  const contacto = useContactLink(
    servicio.cta === 'whatsapp-gratuito'
      ? `Hola, me gustaría orientación gratuita sobre ${servicio.titulo}.`
      : `Hola, me interesa la ${servicio.titulo}. ¿Podemos platicar?`,
  );

  if (servicio.cta === 'homepty') {
    return (
      <div className="flex flex-wrap gap-3">
        <Button asChild className="frank-primary-button h-12 rounded-none px-6">
          <Link to="/solicita-inmueble">
            Buscar propiedad <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-none border-white/30 bg-transparent px-6 text-white hover:bg-white hover:text-[#002d43]">
          <Link to="/vender-propiedad">Vender propiedad</Link>
        </Button>
      </div>
    );
  }

  if (!contacto) return null;

  return (
    <Button asChild className="frank-primary-button h-12 rounded-none px-6">
      <a href={contacto.href} target="_blank" rel="noopener noreferrer">
        <contacto.icon className="mr-2 size-4" />
        {contacto.label}
      </a>
    </Button>
  );
}

function ServiceStage({ servicio, index }: { servicio: Servicio; index: number }) {
  const Icon = servicio.icono;

  return (
    <article key={servicio.id} className="service-stage" aria-live="polite">
      <div className="service-stage__heading">
        <div className="service-stage__icon" aria-hidden="true">
          <Icon />
        </div>
        <h2>{servicio.titulo}</h2>
      </div>
      <span className="service-stage__position" aria-label={`Servicio ${index + 1} de ${servicios.length}`}>
        {String(index + 1).padStart(2, '0')} / {String(servicios.length).padStart(2, '0')}
      </span>
      <p>{servicio.descripcion}</p>

      {servicio.paquetes?.length ? (
        <div className="service-stage__formats">
          <span className="service-stage__label">Modalidades disponibles</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {servicio.paquetes.map((paquete) => (
              <span key={paquete} className="inline-flex items-center gap-2 text-sm text-white/80">
                <Check className="size-4 text-[#d7ba58]" /> {paquete}
              </span>
            ))}
          </div>
        </div>
      ) : servicio.cta === 'whatsapp-gratuito' ? (
        <div className="service-stage__formats">
          <span className="service-stage__label">Primera orientación</span>
          <p className="!text-base !text-white/80">Sesión introductoria sin costo.</p>
        </div>
      ) : null}

      <div className="mt-auto pt-8">
        <ServiceAction servicio={servicio} />
      </div>
    </article>
  );
}

export default function Servicios() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = servicios[activeIndex];

  return (
    <Layout>
      <div className="frank-services-page">
        <section className="services-hero">
          <div className="services-hero__grid" aria-hidden="true" />
          <div className="services-hero__glow" aria-hidden="true" />

          <div className="services-shell services-hero__content">
            <div className="services-hero__copy">
              <h1 className="services-reveal" style={{ '--delay': '80ms' } as CSSProperties}>
                Una decisión<br />
                <span>mueve todo.</span>
              </h1>
              <p className="services-reveal" style={{ '--delay': '160ms' } as CSSProperties}>
                Finanzas, inversión, patrimonio y protección no viven por separado.
                Elige el punto donde quieres comenzar.
              </p>
              <a href="#explorar-servicios" className="services-hero__jump services-reveal" style={{ '--delay': '240ms' } as CSSProperties}>
                Explorar el sistema <ArrowDown className="size-4" />
              </a>
            </div>

            <div className="services-hero__visual services-reveal" style={{ '--delay': '160ms' } as CSSProperties}>
              <div className="services-hero__image-wrap">
                <img src={HERO_IMAGE} alt="Arquitectura contemporánea vista desde abajo" />
                <div className="services-hero__image-overlay" />
                <div className="services-hero__image-caption">
                  <span>Un solo punto de entrada</span>
                  <strong>08 áreas de asesoría</strong>
                </div>
              </div>
              <div className="services-orbit" aria-hidden="true">
                <span className="services-orbit__ring" />
                <span className="services-orbit__dot" />
                <span className="services-orbit__label">PATRIMONIO</span>
              </div>
            </div>
          </div>

          <div className="services-marquee" aria-hidden="true">
            <div>
              FINANZAS <span>◆</span> INVERSIÓN <span>◆</span> INMUEBLES <span>◆</span> PROTECCIÓN <span>◆</span>
              FINANZAS <span>◆</span> INVERSIÓN <span>◆</span> INMUEBLES <span>◆</span> PROTECCIÓN <span>◆</span>
            </div>
          </div>
        </section>

        <section id="explorar-servicios" className="services-explorer">
          <div className="services-shell">
            <header className="services-explorer__header">
              <div>
                <h2>Servicios que trabajan<br />como un sistema.</h2>
              </div>
              <p>
                Explora cada área. La conversación comienza en tu necesidad actual y continúa
                con el acompañamiento que corresponda.
              </p>
            </header>

            <div className="services-explorer__layout">
              <div className="services-index" aria-label="Áreas de asesoría">
                {servicios.map((servicio, index) => {
                  const Icon = servicio.icono;
                  const selected = index === activeIndex;

                  return (
                    <button
                      key={servicio.id}
                      type="button"
                      className="service-index-item"
                      data-active={selected}
                      aria-pressed={selected}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="service-index-item__number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="service-index-item__icon"><Icon /></span>
                      <span className="service-index-item__title">{servicio.titulo}</span>
                      <ArrowRight className="service-index-item__arrow" />
                    </button>
                  );
                })}
              </div>

              <div className="services-stage-wrap">
                <ServiceStage servicio={activeService} index={activeIndex} />
              </div>
            </div>
          </div>
        </section>

        <section className="services-closing">
          <div className="services-shell services-closing__inner">
            <h2>Empieza por contarnos<br />qué quieres cambiar.</h2>
            <p>Selecciona el servicio más cercano a tu necesidad. Desde ahí iniciamos la conversación.</p>
            <ServiceAction servicio={activeService} />
          </div>
        </section>
      </div>
    </Layout>
  );
}
