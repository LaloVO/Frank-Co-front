import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, MessageCircle } from 'lucide-react';
import { Property } from '@/types/property';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const operationLabels = {
  venta: 'Venta',
  renta: 'Renta',
  preventa: 'Pre-Venta',
};

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hola, me interesa la propiedad: ${property.title} - ${formatPrice(property.price, property.currency)}`
    );
    window.open(`https://wa.me/525555555555?text=${message}`, '_blank');
  };

  return (
    <Link
      to={`/propiedad/${property.id}`}
      className={cn(
        "group block bg-card rounded-lg overflow-hidden border border-border",
        "hover:border-primary/50 transition-all duration-300",
        "hover:shadow-gold",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Operation Badge */}
        <Badge
          className={cn(
            "absolute top-3 left-3",
            property.operationType === 'venta' && "bg-primary text-primary-foreground",
            property.operationType === 'renta' && "bg-secondary text-secondary-foreground",
            property.operationType === 'preventa' && "gold-gradient text-primary-foreground"
          )}
        >
          {operationLabels[property.operationType]}
        </Badge>

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-3 right-3 gold-gradient text-primary-foreground">
            Destacado
          </Badge>
        )}

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="absolute bottom-3 right-3 p-2 bg-green-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-700"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(property.price, property.currency)}
          </span>
          {property.operationType === 'renta' && (
            <span className="text-sm text-muted-foreground">/mes</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{property.location.city}, {property.location.state}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-3 border-t border-border">
          {property.bedrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bed size={16} />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bath size={16} />
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize size={16} />
            <span>{property.area} {property.areaUnit}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
