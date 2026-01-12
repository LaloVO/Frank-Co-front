import { Property, Country, BlogPost, Video } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Penthouse de Lujo en Polanco',
    description: 'Espectacular penthouse con vista panorámica a la ciudad, acabados de primera calidad y amenidades exclusivas.',
    price: 12500000,
    currency: 'MXN',
    operationType: 'venta',
    propertyType: 'departamento',
    bedrooms: 4,
    bathrooms: 4,
    area: 450,
    areaUnit: 'm2',
    location: {
      country: 'MX',
      state: 'CDMX',
      city: 'Ciudad de México',
      address: 'Av. Presidente Masaryk 123, Polanco',
      lat: 19.4326,
      lng: -99.1332
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    amenities: ['Gimnasio', 'Piscina', 'Seguridad 24/7', 'Estacionamiento'],
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Casa Moderna en Miami Beach',
    description: 'Residencia contemporánea frente al mar con diseño de autor y acabados premium.',
    price: 3500000,
    currency: 'USD',
    operationType: 'venta',
    propertyType: 'casa',
    bedrooms: 5,
    bathrooms: 6,
    area: 6500,
    areaUnit: 'ft2',
    location: {
      country: 'US',
      state: 'FL',
      city: 'Miami',
      address: '1234 Ocean Drive, Miami Beach',
      lat: 25.7617,
      lng: -80.1918
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    amenities: ['Vista al mar', 'Piscina infinity', 'Cine privado', 'Muelle'],
    featured: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Departamento en Punta Cana',
    description: 'Exclusivo departamento en desarrollo de pre-venta con acceso a playa privada.',
    price: 450000,
    currency: 'USD',
    operationType: 'preventa',
    propertyType: 'departamento',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    areaUnit: 'm2',
    location: {
      country: 'DO',
      state: 'La Altagracia',
      city: 'Punta Cana',
      address: 'Cap Cana, Punta Cana',
      lat: 18.4167,
      lng: -68.9833
    },
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800'
    ],
    amenities: ['Club de playa', 'Campo de golf', 'Marina', 'Spa'],
    featured: true,
    previewDeliveryDate: '2025-12-01',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: '4',
    title: 'Loft Industrial en Roma Norte',
    description: 'Loft con techos altos y diseño industrial, ideal para profesionales creativos.',
    price: 35000,
    currency: 'MXN',
    operationType: 'renta',
    propertyType: 'departamento',
    bedrooms: 1,
    bathrooms: 2,
    area: 120,
    areaUnit: 'm2',
    location: {
      country: 'MX',
      state: 'CDMX',
      city: 'Ciudad de México',
      address: 'Calle Orizaba 42, Roma Norte',
      lat: 19.4199,
      lng: -99.1619
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    amenities: ['Terraza', 'Estacionamiento', 'Pet friendly'],
    featured: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '5',
    title: 'Terreno en Valle de Guadalupe',
    description: 'Terreno ideal para desarrollo vinícola con vistas espectaculares.',
    price: 8500000,
    currency: 'MXN',
    operationType: 'venta',
    propertyType: 'terreno',
    area: 25000,
    areaUnit: 'm2',
    location: {
      country: 'MX',
      state: 'BC',
      city: 'Ensenada',
      address: 'Ruta del Vino, Valle de Guadalupe',
      lat: 32.1073,
      lng: -116.5997
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    amenities: ['Pozo de agua', 'Acceso pavimentado', 'Electricidad'],
    featured: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '6',
    title: 'Oficina Premium en Santa Fe',
    description: 'Espacio corporativo de primer nivel en el distrito financiero.',
    price: 85000,
    currency: 'MXN',
    operationType: 'renta',
    propertyType: 'oficina',
    area: 350,
    areaUnit: 'm2',
    location: {
      country: 'MX',
      state: 'CDMX',
      city: 'Ciudad de México',
      address: 'Torre Arcos, Santa Fe',
      lat: 19.3659,
      lng: -99.2624
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    amenities: ['Helipuerto', 'Salas de juntas', 'Concierge', 'Gimnasio'],
    featured: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  }
];

export const countries: Country[] = [
  {
    code: 'MX',
    name: 'México',
    flag: '🇲🇽',
    states: [
      {
        code: 'CDMX',
        name: 'Ciudad de México',
        cities: [
          { code: 'cdmx', name: 'Ciudad de México', lat: 19.4326, lng: -99.1332 }
        ]
      },
      {
        code: 'BC',
        name: 'Baja California',
        cities: [
          { code: 'tijuana', name: 'Tijuana', lat: 32.5149, lng: -117.0382 },
          { code: 'ensenada', name: 'Ensenada', lat: 31.8667, lng: -116.5997 }
        ]
      },
      {
        code: 'JAL',
        name: 'Jalisco',
        cities: [
          { code: 'guadalajara', name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
          { code: 'pvallarta', name: 'Puerto Vallarta', lat: 20.6534, lng: -105.2253 }
        ]
      },
      {
        code: 'QR',
        name: 'Quintana Roo',
        cities: [
          { code: 'cancun', name: 'Cancún', lat: 21.1619, lng: -86.8515 },
          { code: 'playa', name: 'Playa del Carmen', lat: 20.6296, lng: -87.0739 },
          { code: 'tulum', name: 'Tulum', lat: 20.2114, lng: -87.4654 }
        ]
      }
    ]
  },
  {
    code: 'US',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    states: [
      {
        code: 'FL',
        name: 'Florida',
        cities: [
          { code: 'miami', name: 'Miami', lat: 25.7617, lng: -80.1918 },
          { code: 'orlando', name: 'Orlando', lat: 28.5383, lng: -81.3792 }
        ]
      },
      {
        code: 'TX',
        name: 'Texas',
        cities: [
          { code: 'houston', name: 'Houston', lat: 29.7604, lng: -95.3698 },
          { code: 'austin', name: 'Austin', lat: 30.2672, lng: -97.7431 }
        ]
      },
      {
        code: 'CA',
        name: 'California',
        cities: [
          { code: 'la', name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
          { code: 'sandiego', name: 'San Diego', lat: 32.7157, lng: -117.1611 }
        ]
      }
    ]
  },
  {
    code: 'DO',
    name: 'República Dominicana',
    flag: '🇩🇴',
    states: [
      {
        code: 'LA',
        name: 'La Altagracia',
        cities: [
          { code: 'puntacana', name: 'Punta Cana', lat: 18.5601, lng: -68.3725 },
          { code: 'bavaro', name: 'Bávaro', lat: 18.6818, lng: -68.4528 }
        ]
      },
      {
        code: 'DN',
        name: 'Distrito Nacional',
        cities: [
          { code: 'santodomingo', name: 'Santo Domingo', lat: 18.4861, lng: -69.9312 }
        ]
      }
    ]
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guía Completa para Invertir en Bienes Raíces en 2024',
    excerpt: 'Descubre las mejores estrategias para maximizar tu inversión inmobiliaria este año.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    author: {
      name: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    category: 'Inversión',
    tags: ['inversión', 'bienes raíces', '2024'],
    publishedAt: '2024-01-15',
    readTime: 8
  },
  {
    id: '2',
    title: 'Pre-Venta vs Compra: ¿Cuál es la Mejor Opción?',
    excerpt: 'Analizamos los pros y contras de cada modalidad para ayudarte a tomar la mejor decisión.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    author: {
      name: 'Ana García',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    category: 'Educación',
    tags: ['preventa', 'compra', 'consejos'],
    publishedAt: '2024-01-12',
    readTime: 6
  },
  {
    id: '3',
    title: 'Los Mejores Destinos para Invertir en el Caribe',
    excerpt: 'Explora las oportunidades de inversión en República Dominicana y la Riviera Maya.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    author: {
      name: 'Roberto Díaz',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    category: 'Mercado',
    tags: ['caribe', 'inversión', 'playa'],
    publishedAt: '2024-01-10',
    readTime: 10
  },
  {
    id: '4',
    title: 'Cómo Financiar tu Primera Propiedad',
    excerpt: 'Todo lo que necesitas saber sobre hipotecas, créditos y opciones de financiamiento.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    author: {
      name: 'María Torres',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    category: 'Finanzas',
    tags: ['hipoteca', 'financiamiento', 'primera compra'],
    publishedAt: '2024-01-08',
    readTime: 12
  },
  {
    id: '5',
    title: 'Tendencias de Diseño Interior 2024',
    excerpt: 'Las últimas tendencias que están transformando los espacios residenciales.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
    author: {
      name: 'Laura Ramírez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    category: 'Diseño',
    tags: ['diseño', 'interiores', 'tendencias'],
    publishedAt: '2024-01-05',
    readTime: 7
  },
  {
    id: '6',
    title: 'El Mercado Inmobiliario de Miami: Oportunidades',
    excerpt: 'Por qué Miami sigue siendo uno de los destinos favoritos para inversores latinos.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
    author: {
      name: 'David Hernández',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    category: 'Mercado',
    tags: ['miami', 'estados unidos', 'inversión'],
    publishedAt: '2024-01-03',
    readTime: 9
  },
  {
    id: '7',
    title: 'Aspectos Legales al Comprar Propiedad en México',
    excerpt: 'Una guía completa sobre los requisitos legales para extranjeros.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    author: {
      name: 'Patricia Velázquez',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100'
    },
    category: 'Legal',
    tags: ['legal', 'méxico', 'extranjeros'],
    publishedAt: '2024-01-01',
    readTime: 11
  },
  {
    id: '8',
    title: 'Rentabilidad de Airbnb vs Renta Tradicional',
    excerpt: 'Comparamos ambos modelos para propiedades de inversión.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    author: {
      name: 'Fernando López',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100'
    },
    category: 'Inversión',
    tags: ['airbnb', 'renta', 'rentabilidad'],
    publishedAt: '2023-12-28',
    readTime: 8
  }
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Tour Virtual: Penthouse de Lujo en Polanco',
    description: 'Recorre este espectacular penthouse con vistas a Chapultepec.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Guía de Inversión en República Dominicana',
    description: 'Todo lo que necesitas saber antes de invertir en Punta Cana.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    publishedAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Mercado Inmobiliario Miami 2024',
    description: 'Análisis del mercado y mejores zonas para invertir.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
    publishedAt: '2024-01-05'
  },
  {
    id: '4',
    title: 'Pre-Venta: Ventajas y Consideraciones',
    description: 'Aprende cómo funciona el proceso de pre-venta inmobiliaria.',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    publishedAt: '2024-01-01'
  }
];
