import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920',
    title: 'Propiedades Exclusivas',
    subtitle: 'Descubre tu próximo hogar de lujo',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920',
    title: 'Inversiones Premium',
    subtitle: 'Las mejores oportunidades en México, USA y RD',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920',
    title: 'Pre-Venta Exclusiva',
    subtitle: 'Accede a desarrollos antes que nadie',
  },
];

interface HeroCarouselProps {
  children?: React.ReactNode;
}

export function HeroCarousel({ children }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mt-8">
          {children}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/30 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/30 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Siguiente slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "bg-foreground/30 hover:bg-foreground/50"
            )}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
