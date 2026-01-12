import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/LanguageToggle";

const PropertyDetail = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "Property Detail Deep View - EstateGold";
        document.documentElement.classList.add("dark");
    }, []);

    return (
        <div className="bg-background-light dark:bg-[#211c11] font-display text-[#111418] dark:text-white transition-colors duration-200">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e6e8eb] dark:border-b-[#463c25] px-10 py-3 bg-white dark:bg-[#211d12]">
                    <div className="flex items-center gap-4 text-[#111418] dark:text-white cursor-pointer" onClick={() => navigate("/")}>
                        <div className="size-8 text-[#e0a929]">
                            <span className="material-symbols-outlined text-3xl">real_estate_agent</span>
                        </div>
                        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                            Homepty
                        </h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <div className="hidden md:flex items-center gap-9">
                            <span
                                className="text-[#111418] dark:text-white text-sm font-medium leading-normal hover:text-[#e0a929] transition-colors cursor-pointer"
                                onClick={() => navigate("/propiedades")}
                            >
                                {t('nav.properties')}
                            </span>
                            <span
                                className="text-[#111418] dark:text-white text-sm font-medium leading-normal hover:text-[#e0a929] transition-colors cursor-pointer"
                                onClick={() => navigate("/hub")}
                            >
                                {t('nav.hub')}
                            </span>
                            <a
                                className="text-[#111418] dark:text-white text-sm font-medium leading-normal hover:text-[#e0a929] transition-colors"
                                href="#"
                            >
                                {t('nav.agents')}
                            </a>
                            <a
                                className="text-[#111418] dark:text-white text-sm font-medium leading-normal hover:text-[#e0a929] transition-colors"
                                href="#"
                            >
                                {t('nav.about')}
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <LanguageToggle />
                            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] dark:bg-[#463c25] text-[#111418] dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#e4e7eb] dark:hover:bg-[#5a4d30] transition-colors">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </button>
                            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] dark:bg-[#463c25] text-[#111418] dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#e4e7eb] dark:hover:bg-[#5a4d30] transition-colors">
                                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            {/* Breadcrumbs */}
                            <div className="flex flex-wrap gap-2 px-4 py-2 mb-2">
                                <span className="text-[#637588] dark:text-[#c6b795] text-sm font-medium leading-normal hover:underline cursor-pointer" onClick={() => navigate("/")}>
                                    {t('detail.home')}
                                </span>
                                <span className="text-[#637588] dark:text-[#c6b795] text-sm font-medium leading-normal">/</span>
                                <span className="text-[#637588] dark:text-[#c6b795] text-sm font-medium leading-normal hover:underline cursor-pointer" onClick={() => navigate("/propiedades")}>
                                    {t('detail.listings')}
                                </span>
                                <span className="text-[#637588] dark:text-[#c6b795] text-sm font-medium leading-normal">/</span>
                                <span className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
                                    Villa Serenity in The Hills
                                </span>
                            </div>
                            {/* Page Heading */}
                            <div className="flex flex-wrap justify-between gap-3 px-4 pb-6">
                                <div className="flex min-w-72 flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                                            Villa Serenity in The Hills
                                        </h1>
                                        <span className="bg-[#e0a929]/20 text-[#e0a929] dark:text-[#f0cd75] px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                            {t('properties.for_sale')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#637588] dark:text-[#c6b795]">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                        <p className="text-base font-normal leading-normal">1234 Gold Canyon Dr, Beverly Hills, CA 90210</p>
                                    </div>
                                </div>
                                <div className="flex items-end md:items-center gap-3">
                                    <button className="group flex items-center justify-center rounded-lg size-10 bg-transparent border border-[#dce0e5] dark:border-[#463c25] text-[#111418] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2c2618] transition-colors">
                                        <span className="material-symbols-outlined group-hover:text-[#e0a929] transition-colors">share</span>
                                    </button>
                                    <button className="group flex items-center justify-center rounded-lg size-10 bg-transparent border border-[#dce0e5] dark:border-[#463c25] text-[#111418] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2c2618] transition-colors">
                                        <span className="material-symbols-outlined group-hover:text-red-500 transition-colors">favorite</span>
                                    </button>
                                </div>
                            </div>
                            {/* Image Grid (Hero) */}
                            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 px-4 h-[400px] md:h-[500px] mb-8">
                                {/* Main Image */}
                                <div className="col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
                                    <div
                                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIiwbHix_we1fxVdPsk5xRIYm_wAlmG1dwHE8fa1Jmf3Xgm0PgKiUb1oWwxdrQQIYomXwSSk6Z_P58bxmpiJfdQg9RIFuyveV88yyNIYwcYFP7m_JRRz1BCsThxxVAwZoBi7iuxnydrAdrh9l8AE5uQxXS4lJZq3MNWdzbjRv4MB2IdNu3Zur1P_o8AMm54QcjEfDLnwRcaZ7xDhm608RtEsGyqiMnkGYf-c-guimwqUe5ikSKdfUOsEXyHrpLBwjsyB6euPLSbjQ")',
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                                {/* Side Images */}
                                <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden rounded-xl cursor-pointer">
                                    <div
                                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5UPsPBLKOT_a0r03usq9EidTYAaqfPXszunt35hHl2XyumDmNIE8YzLObQ096kJbWZz1xPXJ8Arc8Wg-FfOc1Z35M__3rMLsSLtfTP0To7qT4igvELP84iGfAZEUI4YDs24jNi_P5sZRU-M-TKV1JA2i_BNk5PX5ZRJNLJN978jnwrsiZSp0l2KrDjhwc5E7oeoTBFiqvk5fkFLc-qQ6WguccE3owkMGoavqYoohUgup41NlxXoNr1aL6E-idxxBGnUh4HfV366Y")',
                                        }}
                                    ></div>
                                </div>
                                <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden rounded-xl cursor-pointer">
                                    <div
                                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNsy6yPPLml0qT3N6PI7UsUD1hcEZyomRUojWK30Vr2wf7B_r2zvbZLJWitGehTOt9d9OCeacps0QJ8LLQgj3b_I9Sju2puDKN3V7cCV6GsgxwSapmI0vRqx3S1sBRJVYr80LG93EF3V50BcgJg1QlLOL67VIghzh4-SYIkXXdd9DkkcQEdx0k-2UcyMl7uYushAxE-EU0KsFCMtjeOnDu_Y8nNwXqj2bl373XTSgAsWLtnjnLnCr29wTMSXlC9cO_iJzOjCYZOz0")',
                                        }}
                                    ></div>
                                </div>
                                <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden rounded-xl cursor-pointer">
                                    <div
                                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSCRc75DkGnTu5odRqaDz0UbU8T0R18I-lbsSmbTccXLJpEvXGTtOsAdJEk-I2uB3mzPvnaWeIHIynmLYTPJtZqGHnrA8vM8vegI7LP9J3Q-tJClJZaH0tANXYMM2pFyAKW2QhruZUb9_keLGW8et1xADaWG1N4iqR4OSXudlvwLrrx9vQQ8PV7EIrCqoStnDjmaru1aF7dUxr7pCWnSVncVgvZAqvVb88U6Jch1UBypQeN4um2UgrBa64R0xYhdsbwssEql9hCMA")',
                                        }}
                                    ></div>
                                </div>
                            </div>
                            {/* Content Split */}
                            <div className="flex flex-col lg:flex-row gap-8 px-4">
                                {/* Left Column: Details */}
                                <div className="flex-1 flex flex-col gap-8">
                                    {/* Key Metrics Row */}
                                    <div className="grid grid-cols-4 gap-4 p-5 rounded-xl bg-[#f0f2f4] dark:bg-[#2c2618] border border-transparent dark:border-[#463c25]">
                                        <div className="flex flex-col items-center gap-1 text-center">
                                            <span className="material-symbols-outlined text-[#e0a929] text-[28px]">bed</span>
                                            <span className="text-[#111418] dark:text-white font-bold text-lg">4</span>
                                            <span className="text-xs text-[#637588] dark:text-[#c6b795] uppercase tracking-wide">
                                                {t('properties.beds')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 text-center border-l border-[#dce0e5] dark:border-[#463c25]">
                                            <span className="material-symbols-outlined text-[#e0a929] text-[28px]">shower</span>
                                            <span className="text-[#111418] dark:text-white font-bold text-lg">5</span>
                                            <span className="text-xs text-[#637588] dark:text-[#c6b795] uppercase tracking-wide">
                                                {t('properties.baths')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 text-center border-l border-[#dce0e5] dark:border-[#463c25]">
                                            <span className="material-symbols-outlined text-[#e0a929] text-[28px]">square_foot</span>
                                            <span className="text-[#111418] dark:text-white font-bold text-lg">450</span>
                                            <span className="text-xs text-[#637588] dark:text-[#c6b795] uppercase tracking-wide">{t('properties.sqft')}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 text-center border-l border-[#dce0e5] dark:border-[#463c25]">
                                            <span className="material-symbols-outlined text-[#e0a929] text-[28px]">garage_home</span>
                                            <span className="text-[#111418] dark:text-white font-bold text-lg">3</span>
                                            <span className="text-xs text-[#637588] dark:text-[#c6b795] uppercase tracking-wide">Parking</span>
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-[#111418] dark:text-white text-xl font-bold">{t('detail.about_property')}</h3>
                                        <div className="text-[#637588] dark:text-[#a8a192] text-base leading-relaxed">
                                            <p>
                                                Experience the pinnacle of luxury living in this architectural masterpiece nestled in the
                                                prestigious hills. This villa offers breathtaking panoramic views, seamlessly blending indoor
                                                and outdoor living spaces. Every detail has been meticulously crafted to provide an unparalleled
                                                lifestyle of comfort and elegance.
                                            </p>
                                            <p className="mt-4">
                                                Featuring a state-of-the-art chef's kitchen, a private infinity pool, and a home theater, this
                                                property is designed for entertaining. The master suite is a sanctuary of its own with a
                                                spa-inspired bath and dual walk-in closets. Located minutes from world-class dining and
                                                shopping.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Amenities */}
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-[#111418] dark:text-white text-xl font-bold">{t('detail.amenities')}</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                                            <div className="flex items-center gap-2 text-[#111418] dark:text-[#e0e0e0]">
                                                <span className="material-symbols-outlined text-[#e0a929] text-[20px]">check_circle</span>
                                                <span>Infinity Pool</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#111418] dark:text-[#e0e0e0]">
                                                <span className="material-symbols-outlined text-[#e0a929] text-[20px]">check_circle</span>
                                                <span>Home Theater</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#111418] dark:text-[#e0e0e0]">
                                                <span className="material-symbols-outlined text-[#e0a929] text-[20px]">check_circle</span>
                                                <span>Smart Home System</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#111418] dark:text-[#e0e0e0]">
                                                <span className="material-symbols-outlined text-[#e0a929] text-[20px]">check_circle</span>
                                                <span>Wine Cellar</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#111418] dark:text-[#e0e0e0]">
                                                <span className="material-symbols-outlined text-[#e0a929] text-[20px]">check_circle</span>
                                                <span>Private Gym</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#111418] dark:text-[#e0e0e0]">
                                                <span className="material-symbols-outlined text-[#e0a929] text-[20px]">check_circle</span>
                                                <span>3-Car Garage</span>
                                            </div>
                                        </div>
                                        <button className="text-[#e0a929] font-medium text-sm self-start hover:underline mt-2">
                                            {t('detail.show_all_amenities')}
                                        </button>
                                    </div>
                                </div>
                                {/* Right Column: Sticky Action Card */}
                                <div className="lg:w-[380px] flex-none">
                                    <div className="sticky top-6 flex flex-col gap-6">
                                        <div className="bg-white dark:bg-[#2c2618] rounded-xl p-6 shadow-lg border border-[#dce0e5] dark:border-[#463c25] dark:shadow-[0_4px_20px_rgba(224,169,41,0.05)]">
                                            <div className="mb-6">
                                                <p className="text-[#637588] dark:text-[#c6b795] text-sm font-medium mb-1">{t('detail.price')}</p>
                                                <h2 className="text-[#111418] dark:text-white text-4xl font-black tracking-tight text-[#e0a929]">
                                                    $5,400,000
                                                </h2>
                                                <p className="text-[#637588] dark:text-[#a8a192] text-sm mt-1">{t('properties.price_per_sqm')}</p>
                                            </div>
                                            <div className="flex flex-col gap-4 mb-6">
                                                <button className="flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-[#e0a929] hover:bg-[#c99520] text-white font-bold transition-all shadow-lg shadow-[#e0a929]/20">
                                                    {t('detail.contact_whatsapp')}
                                                </button>
                                                <button className="flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-transparent border-2 border-[#e0a929]/50 text-[#e0a929] dark:text-[#f0cd75] font-bold hover:bg-[#e0a929]/10 transition-colors">
                                                    {t('detail.request_tour')}
                                                </button>
                                            </div>
                                            <div className="pt-6 border-t border-[#dce0e5] dark:border-[#463c25]">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className="size-12 rounded-full bg-cover bg-center"
                                                        style={{
                                                            backgroundImage:
                                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqPBws8hgaorDopiL-X17PuBsQ4IdkdAsAFRSi7scscpRoWvlL5KwrlbxFhX7NSsoPOzUZ3lo6j4BPnPp0VKpf8AQ7f7-ndmfl86z_Ou9_RU2mmAnl8kflWJ7xYlsKZ_insRUzE69jvrMuRC_lh7exm_Ynx4mFCYbt8S_twic3vf4UeJBZJH1ra51vA_OPnGFYQNsj77HmpQqNclptFJBYD3YB9_liTpRATAegAMxICFqk-4rf-qTvfuMVqsGDfV9MIOLIpi95Md0")',
                                                        }}
                                                    ></div>
                                                    <div>
                                                        <p className="text-[#111418] dark:text-white font-bold">Sarah Jenkins</p>
                                                        <p className="text-[#637588] dark:text-[#c6b795] text-xs">{t('detail.agent')}</p>
                                                    </div>
                                                    <button className="ml-auto flex items-center justify-center size-8 rounded-full bg-[#f0f2f4] dark:bg-[#463c25] hover:bg-[#e4e7eb] dark:hover:bg-[#5a4d30] text-[#e0a929] transition-colors">
                                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <footer className="py-10 px-4 mt-8 flex flex-col md:flex-row justify-between items-center text-[#637588] dark:text-[#6d6453] border-t border-[#e6e8eb] dark:border-[#463c25]">
                        <div className="flex gap-2 items-center mb-4 md:mb-0 cursor-pointer" onClick={() => navigate("/")}>
                            <div className="size-6 text-[#e0a929]">
                                <span className="material-symbols-outlined text-2xl">real_estate_agent</span>
                            </div>
                            <span className="font-bold text-[#111418] dark:text-white uppercase tracking-tight">Homepty</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <a className="hover:text-[#e0a929] transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <a className="hover:text-[#e0a929] transition-colors" href="#">
                                Terms of Service
                            </a>
                            <a className="hover:text-[#e0a929] transition-colors" href="#">
                                Contact Support
                            </a>
                        </div>
                        <p className="text-xs mt-4 md:mt-0">© 2024 Homepty Real Estate.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
