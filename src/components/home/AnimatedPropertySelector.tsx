import React, { useState, useEffect } from 'react';
import { MousePointer2, CheckCircle2, Sparkles, MapPin, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
  tag: string;
}

const DEMO_PROPERTIES: SlideProperty[] = [
  {
    id: '1',
    title: 'Penthouse Reserva Real',
    location: 'Polanco, CDMX',
    price: '$18,500,000 MXN',
    type: 'Departamento de Lujo',
    tag: 'Pre-Venta Exclusiva',
    image: 'https://images.unsplash.com/photo-1600596542815-e32870110044?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Residencia Los Olivos',
    location: 'San Pedro Garza García, NL',
    price: '$24,000,000 MXN',
    type: 'Casa Residencial',
    tag: 'Entrega Inmediata',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Villa Vista Alta',
    location: 'Valle de Bravo, EdoMex',
    price: '$14,800,000 MXN',
    type: 'Villa de Campo',
    tag: 'Oportunidad Inversión',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Torre Horizon Suite',
    location: 'Puerto Vallarta, Jal',
    price: '$9,200,000 MXN',
    type: 'Condo Frente al Mar',
    tag: 'Alta Rentabilidad',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
  },
];

export function AnimatedPropertySelector() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorState, setCursorState] = useState<'idle' | 'moving' | 'clicking' | 'selected'>('idle');

  useEffect(() => {
    // Loop de animación por cada slide:
    // 0s: slide visible, cursor en reposo
    // 1.5s: cursor se mueve hacia la tarjeta / botón de selección
    // 2.5s: click (cursor presiona)
    // 2.8s: estado seleccionado con check y glow
    // 4.5s: cambio al siguiente slide y reinicio del estado del cursor

    const timeline = [
      setTimeout(() => setCursorState('moving'), 1200),
      setTimeout(() => setCursorState('clicking'), 2200),
      setTimeout(() => setCursorState('selected'), 2500),
      setTimeout(() => {
        setCursorState('idle');
        setCurrentIndex((prev) => (prev + 1) % DEMO_PROPERTIES.length);
      }, 4200),
    ];

    return () => timeline.forEach((t) => clearTimeout(t));
  }, [currentIndex]);

  const currentProp = DEMO_PROPERTIES[currentIndex];

  return (
    <div className="w-full max-w-lg aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100/30 bg-[#002d43] group select-none">
      {/* Imágen de fondo en carrusel con transición suave */}
      {DEMO_PROPERTIES.map((prop, index) => (
        <div
          key={prop.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        >
          <img
            src={prop.image}
            alt={prop.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002d43] via-[#002d43]/30 to-black/20" />
        </div>
      ))}

      {/* Indicadores superiores de carrusel */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex gap-1.5">
          {DEMO_PROPERTIES.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                i === currentIndex ? 'w-6 bg-[#867027]' : 'w-1.5 bg-white/40'
              )}
            />
          ))}
        </div>
        <span className="bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
          <Sparkles className="size-3 text-[#867027]" />
          Match Inteligente
        </span>
      </div>

      {/* Tarjeta de Información de la Propiedad en la parte inferior */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div
          className={cn(
            'bg-white/95 backdrop-blur-md rounded-xl p-4 transition-all duration-300 border shadow-lg',
            cursorState === 'selected'
              ? 'border-[#867027] ring-2 ring-[#867027]/40 shadow-[#867027]/20'
              : 'border-white/50'
          )}
        >
          <div className="flex justify-between items-start mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#867027] bg-[#867027]/10 px-2 py-0.5 rounded">
              {currentProp.tag}
            </span>
            <span className="text-xs font-extrabold text-[#002d43]">
              {currentProp.price}
            </span>
          </div>

          <h3 className="font-bold text-[#002d43] text-sm md:text-base leading-tight">
            {currentProp.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <MapPin className="size-3 text-[#867027]" />
            <span>{currentProp.location}</span>
          </div>

          {/* Botón de simulación de selección */}
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-[11px] text-gray-500 font-medium">
              {currentProp.type}
            </span>
            <div
              className={cn(
                'id-select-btn px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1.5',
                cursorState === 'selected'
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : cursorState === 'clicking'
                  ? 'bg-[#867027] text-white scale-95'
                  : 'bg-[#002d43] text-white'
              )}
            >
              {cursorState === 'selected' ? (
                <>
                  <CheckCircle2 className="size-3.5" />
                  <span>Seleccionada</span>
                </>
              ) : (
                <span>Seleccionar Inmueble</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cursor Animado en Loop */}
      <div
        className={cn(
          'absolute z-30 pointer-events-none transition-all duration-1000 ease-in-out',
          cursorState === 'idle' && 'top-[25%] left-[80%] opacity-0 scale-95',
          cursorState === 'moving' && 'top-[83%] left-[64%] opacity-100 scale-100',
          cursorState === 'clicking' && 'top-[83%] left-[64%] opacity-100 scale-90',
          cursorState === 'selected' && 'top-[83%] left-[64%] opacity-0 scale-110'
        )}
      >
        <div className="relative">
          <MousePointer2 className="size-7 text-[#867027] fill-[#867027] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
          {cursorState === 'clicking' && (
            <span className="absolute -top-1 -left-1 size-9 rounded-full border-2 border-[#867027] animate-ping" />
          )}
        </div>
      </div>
    </div>
  );
}
