import React from 'react';
import { Link } from 'react-router-dom';
import {
    Bed,
    Lock,
    SlidersHorizontal,
    Building2,
    ChevronLeft,
    MapPin,
    Bath,
    Square
} from 'lucide-react';

const PropertyListings = () => {
    const properties = [
        {
            id: 1,
            title: "Edificio Ámbar",
            location: "Colonia del Valle, CDMX",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1LRZElbquxmVIdcy3BaYV1ipOa0hZpAxqPizQsidSoyXqopqEiwkCH96Hdm2S55NiTW71zqcOzBgqsmMfyGBDsBfVb08pvPVOsandzN_qghOibaEHSc4PLe7u6SrkW64VHDZZN-4S_32CnqUKaJyyXUAmIAln1aJcdGhJgiKTKCFAUCfJkvSk2Ep7L9nYcC3XBhTzj-UyJlzPhgGy0jjfJ0Y6Lv_CUCcyqCwzP0XliO425BLCkXYxzVFp3AZQnT7rTHvYAaR3Q",
            badge: "Entrega inmediata",
            beds: "1",
            baths: "1",
            sqft: "65m²",
            price: "$2,670,000 MXN"
        },
        {
            id: 2,
            title: "Torre Olivo",
            location: "Santa Fe, CDMX",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2E0OCwMtwKFfbKAqezwkLEsOMNSjlqXCzy__IGMAs42CL9dTdt-Lbtgus2F5tCawCaX2Skipe5uIxLD7PXlM3z0R4mg075ZkOXgzh52YdCruAYGU_uJSACsiekLvYmXoI2heFEbca0glhcOXBYra2OlXbefAfkBkIj9JgLpTZpYiwBhc3rTQDIY1TPPqAUmKeie_LeSpbihNTEcuZW3gnVBJ2zQWTMYGMF0XtHULKR7sdgJO9_pM80DurMSXzTZIVAA651c8-Zw",
            badge: "Entrega inmediata",
            beds: "2-3",
            baths: "2",
            sqft: "110m²",
            price: "$4,020,000 MXN"
        },
        {
            id: 3,
            title: "Residencial Skyline",
            location: "Reforma, CDMX",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZo4fspkECAvDQKVDD5IbcU7pUvw8mSmHglQ5tBHIYlvGJkoLI3edK5PdA4ZCXeLR5hnb3vpg19DX-_kZcwxD444jG9X_J1BXoyfl_ajoqMNu_xTOFSWpOQ-HptpZTQGpn1jh4kp3HjyrL0LBnNKJDMoIlDnIa0b9D5XY40zuNsI3sSdmkCSm5yrxC9gS4Aay-Ha5H0LJEKQLG0xn80UZW8qyHzCeXppZp-MsU1k6IrPqb47js3tUMSRqmjztUCwqpsj5hjLqISg",
            badge: "Entrega a 14 meses",
            beds: "1-3",
            baths: "1.5",
            sqft: "85m²",
            price: "$1,890,000 MXN"
        },
        {
            id: 4,
            title: "Lofts San Ángel",
            location: "San Ángel, CDMX",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP8qLwnCmbcKHOueq_lceZSopAaj8j6-i5pOK6x29kEShALV13SEEqMjP5JJ4prkTP3ggBpvJJ8pViXxgXGXTf12mUksXvIrN5BpVI6dKSIzc1r-34wpMwJfAMO9Vhn2KOvuFMB2g_5KELANiTwlDkc8rHF_-_1Z4Gk2J2T3mnnIAJSf156R1Ba49GiMTPbb3Q1GWiaHAErIwUgrqvtcuhhSvdPc2dPrBQoiXq95RsGFvF_Nr5x5DyNTXmrwq_GG5lko25kteukA",
            badge: "Entrega a 14 meses",
            beds: "1-2",
            baths: "1",
            sqft: "70m²",
            price: "$3,150,000 MXN"
        },
        {
            id: 5,
            title: "Modern View",
            location: "Interlomas, CDMX",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuHAj9A9fSzHp7PB8JPGurFdl_EJwkRj6A5gVtyUDd0iA4PwSeqGeVoVzlmds7KoM8sDZBIfLaWjfIQlAsy21y0YYOuy5tAsxV7p2pcYLTvdy6wKcCeG7snW8KKByWYKFzgKPROXuUCfDr-zqM_sv3TDwdHGQ7BlEGdr7S82tIP5lPRW5wF-B4hDPxpOevMteMJtaLifSJpLB1trGiiDLm1Bb3J1RnDOo8ZT0KqgUWBzrBnJx1igOKRw5FDlpaFz8UAAeNY_wMvw",
            badge: "Entrega a 4 meses",
            beds: "1-3",
            baths: "2.5",
            sqft: "145m²",
            price: "$5,200,000 MXN"
        },
        {
            id: 6,
            title: "Park Residence",
            location: "Condesa, CDMX",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCan17laKf0v7m0vFnDcKmBNb2GgccdTX7TGLIjCHNsM4ad2Qt8WoTzWMUfSombCv9gffOzMPzLBDN57Ji_nkGfF9JsZ7smuP4yKNvmv3YrnfyJnBhAjZlsrlAlhs5NZamQdFDIOeZbPqsuA9fhMRUCQ1KecS4GmlTy-7SCdK7oAUdTzHTm_fg1JvbMjWwhQizipluMgplK6eihBVNLNkxVcCJyYWsomCnZ624c2KkiUvvHDhiTW4bkKFlNQAII9OF9itSXsTXq6Q",
            badge: "Entrega inmediata",
            beds: "2",
            baths: "2",
            sqft: "95m²",
            price: "$3,800,000 MXN"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#143f61] font-sans transition-colors duration-200">
            {/* Header */}
            <header className="bg-[#002d43] text-white w-full shadow-md sticky top-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-1 hover:text-[#867027] transition-colors">
                            <ChevronLeft className="size-5" />
                            <Building2 className="size-6" />
                        </Link>
                        <h1 className="text-sm md:text-xl font-semibold tracking-tight">
                            Tu depa ideal está a un filtro de distancia
                        </h1>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-200 transition-colors group">
                        Filtrar
                        <SlidersHorizontal className="size-5 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {properties.map((prop) => (
                        <Link
                            to={`/propiedad/${prop.id}`}
                            key={prop.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group border border-gray-100 dark:border-gray-700 block"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={prop.image}
                                    alt="Property"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-[#D9F955] text-[#002d43] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm">
                                        {prop.badge}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="bg-white text-[#143f61] px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                                        <Bed className="size-4" /> {prop.beds}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow justify-between">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#002d43] mb-1">{prop.title}</h3>
                                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                                        <MapPin className="size-4" /> {prop.location}
                                    </p>
                                    <div className="flex gap-4 text-gray-500 text-sm border-t border-gray-100 pt-4">
                                        <span className="flex items-center gap-1"><Bed className="size-4" /> {prop.beds}</span>
                                        <span className="flex items-center gap-1"><Bath className="size-4" /> {prop.baths}</span>
                                        <span className="flex items-center gap-1"><Square className="size-4" /> {prop.sqft}</span>
                                    </div>
                                </div>
                                <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                                    <span className="text-sm text-gray-500 font-medium">Desde</span>
                                    <span className="text-lg font-bold text-[#002d43]">{prop.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Floating WhatsApp Button */}
            <a
                href="#"
                className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
                <svg fill="currentColor" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                </svg>
            </a>
        </div>
    );
};

export default PropertyListings;
