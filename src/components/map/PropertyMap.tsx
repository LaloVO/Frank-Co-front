import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { X, Bed, Bath, Square } from 'lucide-react';
import { formatPrice } from '@/lib/cbf';

export interface MapProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  priceValue: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  coordinates: { lat: number; lng: number };
}

interface PropertyMapProps {
  properties: MapProperty[];
  mapboxToken: string;
  initialCenter?: { lat: number; lng: number };
}

const PropertyMap = ({ properties, mapboxToken, initialCenter }: PropertyMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const boundsFitRef = useRef(false);
  const [selected, setSelected] = useState<MapProperty | null>(null);

  useEffect(() => {
    if (!containerRef.current || !mapboxToken) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    boundsFitRef.current = false;

    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-99.1332, 19.4326],
      zoom: 11,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!boundsFitRef.current) {
            map.flyTo({
              center: [pos.coords.longitude, pos.coords.latitude],
              zoom: 12,
              duration: 1200,
            });
          }
        },
        () => {}
      );
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapboxToken]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      properties.forEach((prop) => {
        const el = document.createElement('button');
        Object.assign(el.style, {
          background: 'transparent',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
        });

        const inner = document.createElement('span');
        inner.textContent = prop.price;
        Object.assign(inner.style, {
          display: 'block',
          background: '#002d43',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          transition: 'transform 0.15s, background 0.15s',
          whiteSpace: 'nowrap',
          transformOrigin: 'center',
        });
        el.appendChild(inner);

        el.addEventListener('mouseenter', () => {
          inner.style.transform = 'scale(1.08)';
          inner.style.background = '#867027';
        });
        el.addEventListener('mouseleave', () => {
          inner.style.transform = 'scale(1)';
          inner.style.background = '#002d43';
        });
        el.addEventListener('click', () => setSelected(prop));

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([prop.coordinates.lng, prop.coordinates.lat])
          .addTo(map);
        markersRef.current.push(marker);
      });

      if (properties.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        properties.forEach((p) =>
          bounds.extend([p.coordinates.lng, p.coordinates.lat])
        );
        boundsFitRef.current = true;
        map.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
      } else if (properties.length === 1) {
        boundsFitRef.current = true;
        map.flyTo({
          center: [properties[0].coordinates.lng, properties[0].coordinates.lat],
          zoom: 13,
          duration: 900,
        });
      } else if (initialCenter) {
        boundsFitRef.current = true;
        map.flyTo({
          center: [initialCenter.lng, initialCenter.lat],
          zoom: 13,
          duration: 900,
        });
      }
    };

    if (map.loaded()) {
      renderMarkers();
    } else {
      map.once('load', renderMarkers);
    }
  }, [properties, initialCenter]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {selected && (
        <div className="absolute bottom-6 left-4 w-72 z-20">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="relative">
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-36 object-cover"
                />
              ) : (
                <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  Sin imagen
                </div>
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white font-bold text-sm">{selected.price}</span>
              </div>
            </div>
            <div className="p-3">
              <p className="font-bold text-[#002d43] text-sm mb-1 line-clamp-1">{selected.title}</p>
              <p className="text-xs text-gray-500 mb-2">{selected.location}</p>
              <div className="flex gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {selected.bedrooms}</span>
                <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {selected.bathrooms}</span>
                <span className="flex items-center gap-1"><Square className="w-3 h-3" /> {selected.sqm}m²</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!mapboxToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
          <p className="text-sm text-gray-500">Configurando mapa…</p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
