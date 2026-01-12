export type OperationType = 'venta' | 'renta' | 'preventa';

export type PropertyType = 
  | 'casa' 
  | 'departamento' 
  | 'terreno' 
  | 'oficina' 
  | 'local' 
  | 'bodega';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'USD' | 'MXN' | 'DOP';
  operationType: OperationType;
  propertyType: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  areaUnit: 'm2' | 'ft2';
  location: {
    country: string;
    state: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  amenities: string[];
  featured: boolean;
  previewDeliveryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  states: State[];
}

export interface State {
  code: string;
  name: string;
  cities: City[];
}

export interface City {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  publishedAt: string;
}
