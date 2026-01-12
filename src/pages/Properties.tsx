import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

const Properties = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [viewState, setViewState] = useState({
        longitude: -80.19179,
        latitude: 25.76168,
        zoom: 12
    });

    useEffect(() => {
        document.title = "Property Search Map View";

        // Initial theme check
        setIsDarkMode(document.documentElement.classList.contains("dark"));

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setIsDarkMode(document.documentElement.classList.contains("dark"));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-white dark:bg-[#0f0f0f] text-[#111] dark:text-white font-display h-screen flex flex-col overflow-hidden transition-colors duration-500">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-[#333333] bg-white dark:bg-[#141414] px-6 py-3 z-20 shrink-0 transition-colors duration-500">
                <div className="flex items-center gap-4 text-[#111] dark:text-white cursor-pointer" onClick={() => navigate("/")}>
                    <div className="size-8 flex items-center justify-center text-[#e0a929]">
                        <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                            domain
                        </span>
                    </div>
                    <h2 className="text-[#111] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Homepty</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="hidden md:flex items-center gap-9">
                        <span className="text-gray-500 dark:text-gray-300 hover:text-[#e0a929] transition-colors text-sm font-medium leading-normal cursor-pointer" onClick={() => navigate("/propiedades")}>
                            {t('nav.properties')}
                        </span>
                        <span className="text-gray-500 dark:text-gray-300 hover:text-[#e0a929] transition-colors text-sm font-medium leading-normal cursor-pointer" onClick={() => navigate("/hub")}>
                            {t('nav.hub')}
                        </span>
                        <a className="text-gray-500 dark:text-gray-300 hover:text-[#e0a929] transition-colors text-sm font-medium leading-normal" href="#">
                            {t('nav.agents')}
                        </a>
                        <a className="text-gray-500 dark:text-gray-300 hover:text-[#e0a929] transition-colors text-sm font-medium leading-normal" href="#">
                            {t('nav.about')}
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-1"></div>
                        <LanguageToggle />
                        <button className="flex items-center justify-center gap-2 text-sm font-bold text-[#e0a929] hover:text-[#c99520] transition-colors">
                            <span className="material-symbols-outlined text-lg">favorite</span>
                        </button>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-gray-200 dark:border-[#333333]"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGhAZyaSW4HGQmJO3o7KJoWMG6H7B1-N6LM_JvoclwjPACYj6eedcDFPe6hF3RHamBdqTFfYK0a1zm1WIJQwYPgWYnIrq3rAANDu2lLz8BbC6ZimpFhXGWTr37uTrl2x_30N8InYMuLVonoBvNwRLQYS8FtF3LvKm6XaKLJTdWTPd4WFwr7muAPdLhQtwmMiUYX0wpO-ORzJ3gaZf2DlW9g729m8gedWe-0jg_MMxojLH20fENWkNeuZXy1Vb5X3MkbEKbNQjz0vU")',
                            }}
                        ></div>
                    </div>
                </div>
            </header>

            {/* Main Content Split View */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Left Panel: Property List (40%) */}
                <div className="w-full lg:w-[40%] flex flex-col bg-gray-50 dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-[#333333] overflow-hidden relative z-10 shadow-2xl transition-colors duration-500">
                    {/* Sticky Filters Header */}
                    <div className="shrink-0 p-4 border-b border-gray-200 dark:border-[#333333] bg-white/80 dark:bg-[#141414]/95 backdrop-blur-sm z-10 sticky top-0 transition-colors duration-500">
                        <div className="flex gap-3 flex-wrap">
                            <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:border-[#e0a929]/50 transition-colors pl-4 pr-3 group">
                                <p className="text-gray-600 dark:text-gray-200 text-sm font-medium">Price Range</p>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#e0a929] text-lg">
                                    expand_more
                                </span>
                            </button>
                            <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:border-[#e0a929]/50 transition-colors pl-4 pr-3 group">
                                <p className="text-gray-600 dark:text-gray-200 text-sm font-medium">{t('search.property_type')}</p>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#e0a929] text-lg">
                                    expand_more
                                </span>
                            </button>
                            <button className="flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:border-[#e0a929]/50 transition-colors pl-4 pr-3 group">
                                <p className="text-gray-600 dark:text-gray-200 text-sm font-medium">Operation</p>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#e0a929] text-lg">
                                    expand_more
                                </span>
                            </button>
                            <button className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:bg-[#e0a929]/20 text-gray-400 hover:text-[#e0a929] transition-colors">
                                <span className="material-symbols-outlined">tune</span>
                            </button>
                        </div>
                        <div className="mt-6 mb-2 flex justify-between items-end">
                            <h3 className="text-[#111] dark:text-white text-2xl font-bold leading-tight">Luxury Homes in Miami</h3>
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">124 {t('search.search_button')}</span>
                        </div>
                    </div>
                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-10">
                            {/* Property Card 1 */}
                            <div
                                onClick={() => navigate("/propiedad/1")}
                                className="group relative flex flex-col rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-transparent hover:border-[#e0a929]/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] overflow-hidden cursor-pointer"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCLrGRC0I0iHzRNP69u1gPne7k13RKAnKSI6R29lNoMD3_x_hXaVd14HXzcqojIubEYUr8I-03iZlHRqAvR07MNvDOQbas-MTK6N71z_cetwk_mITJ9ahI3tSWQK-0AVN9FB3OWczssLuAItZw75yKZnSFjjqFn-9mdVKRyJEk9UyKC5Is3az_eUkmSrNZQATp59F-LN24cHblcOBLsS6jm6vjf1uhci1_CS7Yh7lpmjkiudejcNAd9XUn_YIVNLgeYdMOZe7BHlI")',
                                        }}
                                    ></div>
                                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                                        {t('properties.featured')}
                                    </div>
                                    {/* WhatsApp Button */}
                                    <button
                                        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 z-10 shadow-lg"
                                        title="Contact on WhatsApp"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chat</span>
                                    </button>
                                </div>
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-[#111] dark:text-white font-bold text-lg group-hover:text-[#e0a929] transition-colors">
                                            $5,400,000
                                        </h3>
                                        <div className="flex items-center gap-1 text-[#e0a929] text-xs font-bold border border-[#e0a929]/20 bg-[#e0a929]/10 px-2 py-1 rounded">
                                            {t('properties.for_sale')}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm truncate">123 Ocean Drive, Miami Beach, FL</p>
                                    <div className="h-px bg-[#333333] my-1 w-full"></div>
                                    <div className="flex items-center justify-between text-gray-400 text-xs mt-1">
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[#e0a929] text-[16px]">bed</span>{" "}
                                            <span className="font-medium text-gray-300">4 {t('properties.beds')}</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[#e0a929] text-[16px]">bathtub</span>{" "}
                                            <span className="font-medium text-gray-300">5 {t('properties.baths')}</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[#e0a929] text-[16px]">square_foot</span>{" "}
                                            <span className="font-medium text-gray-300">3,200 {t('properties.sqft')}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* More cards can be added here following the same structure */}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Map View (60%) */}
                <div className="hidden lg:block lg:w-[60%] h-full bg-gray-100 dark:bg-[#111] relative overflow-hidden transition-colors duration-500">
                    <Map
                        {...viewState}
                        onMove={(evt) => setViewState(evt.viewState)}
                        style={{ width: "100%", height: "100%" }}
                        mapStyle={isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"}
                        mapboxAccessToken="pk.eyJ1IjoibGFsb3ZvIiwiYSI6ImNtNW5waGY1bzAydDMybXB4OGs0cjN2eDEifQ.k-fNf2JpL5mC_M9_u2v0zA"
                    />
                    {/* Floating Search Area Button */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                        <button className="flex items-center gap-2 bg-white/90 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] text-[#111] dark:text-white px-4 py-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-white dark:hover:text-black transition-all font-medium text-sm">
                            <span className="material-symbols-outlined text-base">refresh</span>
                            Search this area
                        </button>
                    </div>
                    {/* Map Controls */}
                    <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
                        <button className="bg-white/90 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] text-[#111] dark:text-white p-2 rounded-lg hover:bg-[#e0a929]/10 transition-colors shadow-lg">
                            <span className="material-symbols-outlined block">add</span>
                        </button>
                        <button className="bg-white/90 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] text-[#111] dark:text-white p-2 rounded-lg hover:bg-[#e0a929]/10 transition-colors shadow-lg">
                            <span className="material-symbols-outlined block">remove</span>
                        </button>
                        <button className="bg-white/90 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] text-[#111] dark:text-white p-2 rounded-lg hover:bg-[#e0a929]/10 transition-colors shadow-lg mt-2">
                            <span className="material-symbols-outlined block">my_location</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties;