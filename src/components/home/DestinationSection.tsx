import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface City {
    name: string;
    slug: string;
}

interface State {
    name: string;
    cities: City[];
}

interface Country {
    name: string;
    region: string;
    image: string;
    states: State[];
}

const destinations: Country[] = [
    {
        name: "United States",
        region: "North America",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTZ0FmB0qO9yZlDsZawaUftpG_EKDSW7LvED_U7GgOuyPau4XxCVqMBy9wDaxLN1jJ-SX5LepWGLDr0bJImqwJsxmO3FscvXtImrsSUkRBjccSHgNZN9wRe_MZuw7BO2AqwjnG3Q01Z8lq3D7K9qDMBiRTT-mFGhvojmkqcYsUu_EESxclV2w7znJaHnQTYqXnMdnUAarSXhF13pBZirAjn9UKHG51t3IsBs5MJPcriBqi0tLeBFWvj17bNEEe-MHK896pLI1lakU",
        states: [
            {
                name: "Florida",
                cities: [
                    { name: "Miami", slug: "miami" },
                    { name: "Orlando", slug: "orlando" },
                    { name: "Tampa", slug: "tampa" },
                ],
            },
            {
                name: "New York",
                cities: [
                    { name: "New York City", slug: "nyc" },
                    { name: "The Hamptons", slug: "hamptons" },
                ],
            },
            {
                name: "California",
                cities: [
                    { name: "Los Angeles", slug: "la" },
                    { name: "San Francisco", slug: "sf" },
                    { name: "San Diego", slug: "sd" },
                ],
            },
        ],
    },
    {
        name: "Mexico",
        region: "Latin America",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCLrGRC0I0iHzRNP69u1gPne7k13RKAnKSI6R29lNoMD3_x_hXaVd14HXzcqojIubEYUr8I-03iZlHRqAvR07MNvDOQbas-MTK6N71z_cetwk_mITJ9ahI3tSWQK-0AVN9FB3OWczssLuAItZw75yKZnSFjjqFn-9mdVKRyJEk9UyKC5Is3az_eUkmSrNZQATp59F-LN24cHblcOBLsS6jm6vjf1uhci1_CS7Yh7lpmjkiudejcNAd9XUn_YIVNLgeYdMOZe7BHlI",
        states: [
            {
                name: "Quintana Roo",
                cities: [
                    { name: "Tulum", slug: "tulum" },
                    { name: "Cancun", slug: "cancun" },
                    { name: "Playa del Carmen", slug: "playa" },
                ],
            },
            {
                name: "Baja California Sur",
                cities: [
                    { name: "Cabo San Lucas", slug: "cabo" },
                    { name: "La Paz", slug: "lapaz" },
                ],
            },
            {
                name: "CDMX",
                cities: [
                    { name: "Mexico City", slug: "cdmx" },
                    { name: "Polanco", slug: "polanco" },
                ],
            },
        ],
    },
    {
        name: "Dominican Republic",
        region: "Caribbean",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd73lA9z-__9upfxv0lYpkfDh_iVJ6jmjHvMEx6LqQ3zlPxJqVXxNVFrUjetr6lCVPHv0ahrmFngrFbcP3XIpj7Rz_CZ54M1fCDutN6sv30DECtMd7EjtZK0kZnbCZo1QVMb0ivh1wkgxRB7Uah0iajcykiKIijRei1w7bmz9zE8Eq25838jK5339TJnpK7cM8zLEGBRsMnYmM2Jo7AOBymnuBRYlt4kpG8-F7Y19WmrGFsefmtfjFc1zr1KUBMwookmzsgVv8JXU",
        states: [
            {
                name: "La Altagracia",
                cities: [
                    { name: "Punta Cana", slug: "puntacana" },
                    { name: "Cap Cana", slug: "capcana" },
                ],
            },
            {
                name: "Distrito Nacional",
                cities: [
                    { name: "Santo Domingo", slug: "santodomingo" },
                ],
            },
            {
                name: "La Romana",
                cities: [
                    { name: "Casa de Campo", slug: "casadecampo" },
                ],
            },
        ],
    },
];

export const DestinationSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedState, setSelectedState] = useState<State | null>(null);

    const handleCountryClick = (country: Country) => {
        if (selectedCountry?.name === country.name) {
            setSelectedCountry(null);
            setSelectedState(null);
        } else {
            setSelectedCountry(country);
            setSelectedState(null);
        }
    };

    const handleStateClick = (state: State) => {
        if (selectedState?.name === state.name) {
            setSelectedState(null);
        } else {
            setSelectedState(state);
        }
    };

    const handleCitySelect = (citySlug: string) => {
        navigate(`/propiedades?city=${citySlug}`);
    };

    return (
        <section className="relative w-full flex flex-col items-center justify-center py-20 px-4 md:px-8 bg-background-dark overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#e0a929]/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-16 z-10">
                <h5 className="text-[#e0a929] font-bold tracking-[0.2em] text-xs uppercase mb-4 animate-fade-in">
                    {t('hero.destination_subtitle')}
                </h5>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight animate-slide-up">
                    {t('hero.destination_title')}
                </h1>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl z-10 mb-12">
                {destinations.map((country) => (
                    <div
                        key={country.name}
                        onClick={() => handleCountryClick(country)}
                        className={`group relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:shadow-[#e0a929]/10 ${selectedCountry?.name === country.name ? 'ring-2 ring-[#e0a929]' : ''
                            }`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                            style={{ backgroundImage: `url("${country.image}")` }}
                        ></div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                            <span className="text-xs font-bold tracking-widest uppercase text-gray-300 mb-2 border-b border-[#e0a929]/50 pb-1">
                                {country.region === "North America" ? t('destinations.north_america') :
                                    country.region === "Latin America" ? t('destinations.latin_america') :
                                        t('destinations.caribbean')}
                            </span>
                            <h3 className="text-3xl font-medium text-white mb-2 group-hover:text-[#e0a929] transition-colors">
                                {country.name}
                            </h3>

                            {/* States Hint */}
                            <div className="h-8 overflow-hidden">
                                <p className="text-gray-400 text-sm font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    {country.states.map(s => s.name).slice(0, 3).join(" • ")}
                                </p>
                            </div>

                            {/* Arrow Button */}
                            <div className={`mt-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 backdrop-blur-sm group-hover:bg-[#e0a929] group-hover:border-[#e0a929] group-hover:text-black transition-all duration-300 ${selectedCountry?.name === country.name ? 'bg-[#e0a929] border-[#e0a929] text-black rotate-180' : ''
                                }`}>
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                        </div>

                        {/* Border Hover Effect */}
                        <div className="absolute inset-0 border border-white/10 group-hover:border-[#e0a929]/50 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Inline Expansion Panel */}
            {selectedCountry && (
                <div className="w-full max-w-7xl z-10 animate-slide-up">
                    <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border-2 border-[#e0a929]/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        {/* Header */}
                        <div className="text-center mb-8 pb-6 border-b border-white/10">
                            <h4 className="text-[#e0a929] font-bold tracking-[0.2em] text-xs uppercase mb-2">
                                {t('destinations.select_region')}
                            </h4>
                            <h3 className="text-2xl md:text-3xl font-light text-white">
                                {selectedCountry.name}
                            </h3>
                        </div>

                        {/* States Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {selectedCountry.states.map((state) => (
                                <button
                                    key={state.name}
                                    onClick={() => handleStateClick(state)}
                                    className={`group/state py-4 px-6 rounded-xl transition-all duration-300 text-left ${selectedState?.name === state.name
                                            ? 'bg-[#e0a929] text-black'
                                            : 'bg-white/5 hover:bg-white/10 text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`material-symbols-outlined text-xl ${selectedState?.name === state.name ? 'text-black' : 'text-[#e0a929]'
                                            }`}>
                                            map
                                        </span>
                                        <div className="flex-1">
                                            <div className="font-medium text-base">{state.name}</div>
                                            <div className={`text-xs mt-1 ${selectedState?.name === state.name ? 'text-black/70' : 'text-gray-500'
                                                }`}>
                                                {state.cities.length} {t('destinations.cities')}
                                            </div>
                                        </div>
                                        <span className={`material-symbols-outlined transition-transform ${selectedState?.name === state.name ? 'rotate-180' : ''
                                            }`}>
                                            expand_more
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Cities List */}
                        {selectedState && (
                            <div className="animate-slide-up bg-white/5 rounded-xl p-6 border border-white/10">
                                <h5 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                                    {selectedState.name} {t('destinations.cities')}
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {selectedState.cities.map((city) => (
                                        <button
                                            key={city.name}
                                            onClick={() => handleCitySelect(city.slug)}
                                            className="group/city py-3 px-4 rounded-lg bg-white/5 hover:bg-[#e0a929] text-white hover:text-black transition-all duration-300 text-left flex items-center gap-3"
                                        >
                                            <span className="material-symbols-outlined text-lg opacity-70 group-hover/city:opacity-100">
                                                location_on
                                            </span>
                                            <span className="font-medium">{city.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
