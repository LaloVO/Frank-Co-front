import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/button';
import { mockProperties } from '@/data/mockData';

export function FeaturedProperties() {
  const featuredProperties = mockProperties.filter(p => p.featured).slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Propiedades <span className="gold-gradient-text">Destacadas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Selección curada de las mejores propiedades disponibles
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0 text-primary hover:text-primary/80"
            asChild
          >
            <Link to="/propiedades" className="flex items-center">
              Ver todas
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
