import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            "nav": {
                "properties": "Properties",
                "geoNavigation": "Geo-navigation",
                "hub": "HUB",
                "about": "About",
                "agents": "Agents",
                "locations": "Locations",
                "journal": "Journal",
                "buy": "Buy",
                "rent": "Rent",
                "sell": "Sell",
                "favorites": "Favorites"
            },
            "hero": {
                "subtitle": "Exclusive Living Redefined",
                "title1": "Find Your Place",
                "title2": "In The World",
                "destination_subtitle": "Select your Destination",
                "destination_title": "Discover exceptional homes worldwide."
            },
            "search": {
                "sale": "Sale",
                "rent": "Rent",
                "presale": "Pre-Sale",
                "location": "Location",
                "location_placeholder": "Enter City, Zip, or Address",
                "property_type": "Property Type",
                "select_type": "Select Type",
                "search_button": "Search",
                "delivery_date": "Delivery Date",
                "select_date": "Select Date",
                "found": "{{count}} properties found in"
            },
            "destinations": {
                "select_region": "Select Region",
                "cities": "Cities",
                "north_america": "North America",
                "latin_america": "Latin America",
                "caribbean": "Caribbean"
            },
            "properties": {
                "map_view": "Map View",
                "featured": "Featured",
                "beds": "Beds",
                "baths": "Baths",
                "sqft": "sqft",
                "price_per_sqm": "$12,000 / sq m",
                "for_sale": "FOR SALE",
                "for_rent": "FOR RENT"
            },
            "detail": {
                "home": "Home",
                "listings": "Listings",
                "about_property": "About this property",
                "amenities": "Amenities",
                "show_all_amenities": "Show all amenities",
                "price": "Price",
                "contact_whatsapp": "Contact via WhatsApp",
                "request_tour": "Request a Tour",
                "agent": "Senior Estate Agent"
            },
            "hub": {
                "title": "From The Hub",
                "subtitle": "The Edit",
                "view_all": "View All Articles"
            },
            "footer": {
                "description": "Redefining luxury real estate with curated properties and world-class service. Find your place in the world.",
                "discover": "Discover",
                "company": "Company",
                "stay_informed": "Stay Informed",
                "newsletter_placeholder": "Your email address",
                "subscribe": "Subscribe",
                "rights": "All rights reserved.",
                "privacy": "Privacy Policy",
                "terms": "Terms of Service",
                "sitemap": "Sitemap"
            }
        }
    },
    es: {
        translation: {
            "nav": {
                "properties": "Propiedades",
                "geoNavigation": "Geonavegación",
                "hub": "HUB",
                "about": "Nosotros",
                "agents": "Asesores",
                "locations": "Ubicaciones",
                "journal": "Revista",
                "buy": "Comprar",
                "rent": "Rentar",
                "sell": "Vender",
                "favorites": "Favoritos"
            },
            "hero": {
                "subtitle": "Vida Exclusiva Redefinida",
                "title1": "Encuentra tu lugar",
                "title2": "En el mundo",
                "destination_subtitle": "Selecciona tu destino",
                "destination_title": "Descubre hogares excepcionales en todo el mundo."
            },
            "search": {
                "sale": "Venta",
                "rent": "Renta",
                "presale": "Pre-venta",
                "location": "Ubicación",
                "location_placeholder": "Ciudad, C.P. o Dirección",
                "property_type": "Tipo de Propiedad",
                "select_type": "Seleccionar Tipo",
                "search_button": "Buscar",
                "delivery_date": "Fecha de Entrega",
                "select_date": "Seleccionar Fecha",
                "found": "{{count}} propiedades encontradas en"
            },
            "destinations": {
                "select_region": "Seleccionar Región",
                "cities": "Ciudades",
                "north_america": "Norteamérica",
                "latin_america": "Latinoamérica",
                "caribbean": "El Caribe"
            },
            "properties": {
                "map_view": "Vista de Mapa",
                "featured": "Destacado",
                "beds": "Recs",
                "baths": "Baños",
                "sqft": "m²",
                "price_per_sqm": "$12,000 / m²",
                "for_sale": "EN VENTA",
                "for_rent": "EN RENTA"
            },
            "detail": {
                "home": "Inicio",
                "listings": "Listados",
                "about_property": "Acerca de esta propiedad",
                "amenities": "Amenidades",
                "show_all_amenities": "Ver todas las amenidades",
                "price": "Precio",
                "contact_whatsapp": "Contactar por WhatsApp",
                "request_tour": "Solicitar Recorrido",
                "agent": "Asesor Senior"
            },
            "hub": {
                "title": "Desde el Hub",
                "subtitle": "La Edición",
                "view_all": "Ver todos los artículos"
            },
            "footer": {
                "description": "Redefiniendo el sector inmobiliario de lujo con propiedades curadas y un servicio de clase mundial. Encuentra tu lugar en el mundo.",
                "discover": "Descubrir",
                "company": "Empresa",
                "stay_informed": "Mantente Informado",
                "newsletter_placeholder": "Tu correo electrónico",
                "subscribe": "Suscribirse",
                "rights": "Todos los derechos reservados.",
                "privacy": "Política de Privacidad",
                "terms": "Términos de Servicio",
                "sitemap": "Mapa del sitio"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "es",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
