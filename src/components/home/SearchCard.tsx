import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Building2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { OperationType, PropertyType } from '@/types/property';

const propertyTypes = [
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'local', label: 'Local Comercial' },
  { value: 'bodega', label: 'Bodega' },
];

const operationTypes = [
  { value: 'venta', label: 'Venta' },
  { value: 'renta', label: 'Renta' },
  { value: 'preventa', label: 'Pre-Venta' },
];

export function SearchCard() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('');
  const [operationType, setOperationType] = useState<OperationType | ''>('');
  const [showPreventaModal, setShowPreventaModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleOperationChange = (value: string) => {
    setOperationType(value as OperationType);
    if (value === 'preventa') {
      setShowPreventaModal(true);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('ubicacion', location);
    if (propertyType) params.set('tipo', propertyType);
    if (operationType) params.set('operacion', operationType);
    if (deliveryDate) params.set('entrega', deliveryDate);
    
    navigate(`/propiedades?${params.toString()}`);
  };

  const handlePreventaConfirm = () => {
    setShowPreventaModal(false);
  };

  return (
    <>
      <div className="bg-card/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Ubicación
            </Label>
            <Input
              placeholder="Ciudad, Estado o País"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-background border-border focus:border-primary"
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Home size={16} className="text-primary" />
              Tipo de Propiedad
            </Label>
            <Select value={propertyType} onValueChange={(v) => setPropertyType(v as PropertyType)}>
              <SelectTrigger className="bg-background border-border focus:border-primary">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Operation Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building2 size={16} className="text-primary" />
              Operación
            </Label>
            <Select value={operationType} onValueChange={handleOperationChange}>
              <SelectTrigger className="bg-background border-border focus:border-primary">
                <SelectValue placeholder="Seleccionar operación" />
              </SelectTrigger>
              <SelectContent>
                {operationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button 
              onClick={handleSearch}
              className="w-full gold-gradient text-primary-foreground hover:opacity-90 h-10"
            >
              <Search size={18} className="mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {/* Pre-Venta Modal */}
      <Dialog open={showPreventaModal} onOpenChange={setShowPreventaModal}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="text-primary" />
              Fecha de Entrega Estimada
            </DialogTitle>
            <DialogDescription>
              Para propiedades en pre-venta, ¿cuándo esperas recibir tu propiedad?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Fecha estimada de entrega</Label>
              <Input
                type="month"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="bg-background border-border"
                min={new Date().toISOString().slice(0, 7)}
              />
            </div>
            <Button 
              onClick={handlePreventaConfirm}
              className="w-full gold-gradient text-primary-foreground"
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
