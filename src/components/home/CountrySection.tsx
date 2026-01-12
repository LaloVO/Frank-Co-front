import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { countries } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function CountrySection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Explora por <span className="gold-gradient-text">Destino</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre propiedades exclusivas en los destinos más codiciados de América
          </p>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {countries.map((country, index) => (
            <Link
              key={country.code}
              to={`/propiedades?pais=${country.code}`}
              className={cn(
                "group relative overflow-hidden rounded-xl aspect-[4/3]",
                "bg-card border border-border hover:border-primary/50",
                "transition-all duration-500 hover:shadow-gold",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card" />
              
              {/* Flag Emoji */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
                {country.flag}
              </div>

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{country.flag}</span>
                  <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {country.name}
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {country.states.length} estados · {country.states.reduce((acc, s) => acc + s.cities.length, 0)} ciudades
                </p>

                <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Ver propiedades</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
