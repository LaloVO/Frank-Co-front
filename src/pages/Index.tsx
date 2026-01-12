import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DestinationSection } from "@/components/home/DestinationSection";
import { LanguageToggle } from "@/components/LanguageToggle";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [operationType, setOperationType] = useState("sale");

  useEffect(() => {
    document.title = "RIASARANA";
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="bg-background-light dark:bg-[#0a0a0a] text-[#111] dark:text-white font-display overflow-x-hidden antialiased selection:bg-[#e0a929] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 text-[#e0a929]">
              <span className="material-symbols-outlined text-3xl">real_estate_agent</span>
            </div>
            <h1 className="text-white text-xl font-bold tracking-tight uppercase">Homepty</h1>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <span
              className="text-sm font-semibold tracking-wide text-gray-300 hover:text-[#e0a929] transition-colors uppercase cursor-pointer"
              onClick={() => navigate("/propiedades")}
            >
              {t('nav.geoNavigation')}
            </span>
            <span
              className="text-sm font-semibold tracking-wide text-gray-300 hover:text-[#e0a929] transition-colors uppercase cursor-pointer"
              onClick={() => navigate("/hub")}
            >
              {t('nav.hub')}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <LanguageToggle />
            {/* Mobile Menu Icon */}
            <button className="md:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0a0a] z-10"></div>
          <img
            alt="Modern luxury villa with pool at dusk"
            className="w-full h-full object-cover object-center transform scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzE3D5hc9BCx0vgFbnMrq4_baY9DKwviNi-Y-MU1il3zCwMkCM-l_pLOPYwId4-xSlAJEBbE5x65LnLwosQfKHlgM2GDu5GJDMr8EoOwzEolZgec8dLH6fYCjg071D6QNwPa3DxlXTxFbSfQqqHKl-Rm8bn6AcKNTTgokFSfda_QIopI_Q1bhGwjGzmu-O5tcCqI-LUf_9Z-zFTiyhtlYSujLWujAyBsrw3k_JXxU01fCOrRx9_MuMJV8WrP7GVx11G4qIYqjilyQ"
          />
        </div>
        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[1200px] px-6 flex flex-col items-center gap-10 animate-fade-in pt-16">
          {/* Hero Text */}
          <div className="text-center space-y-4">
            <h2 className="text-[#e0a929] font-medium tracking-[0.2em] uppercase text-sm md:text-base">
              {t('hero.subtitle')}
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight">
              {t('hero.title1')} <br /> <span className="font-semibold">{t('hero.title2')}</span>
            </h1>
          </div>
          {/* Search Module */}
          <div className="w-full max-w-[960px] bg-[#121212]/65 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 mt-4 shadow-2xl shadow-black/50">
            {/* Search Form */}
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              {/* Operation Type Segmented Control */}
              <div className="flex justify-start">
                <div className="inline-flex bg-[#1a1a1a] rounded-lg p-1 border border-white/5">
                  <label className="relative flex items-center justify-center px-6 py-2 cursor-pointer group">
                    <input
                      checked={operationType === "sale"}
                      onChange={() => setOperationType("sale")}
                      className="peer sr-only"
                      name="operation"
                      type="radio"
                      value="sale"
                    />
                    <span className="text-sm font-semibold text-gray-400 peer-checked:text-black z-10 relative transition-colors duration-200 uppercase tracking-wide">
                      {t('search.sale')}
                    </span>
                    <div className="absolute inset-0 bg-[#e0a929] rounded-md opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></div>
                  </label>
                  <label className="relative flex items-center justify-center px-6 py-2 cursor-pointer group">
                    <input
                      checked={operationType === "rent"}
                      onChange={() => setOperationType("rent")}
                      className="peer sr-only"
                      name="operation"
                      type="radio"
                      value="rent"
                    />
                    <span className="text-sm font-semibold text-gray-400 peer-checked:text-black z-10 relative transition-colors duration-200 uppercase tracking-wide">
                      {t('search.rent')}
                    </span>
                    <div className="absolute inset-0 bg-[#e0a929] rounded-md opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></div>
                  </label>
                  <label className="relative flex items-center justify-center px-6 py-2 cursor-pointer group">
                    <input
                      checked={operationType === "presale"}
                      onChange={() => setOperationType("presale")}
                      className="peer sr-only"
                      name="operation"
                      type="radio"
                      value="presale"
                    />
                    <span className="text-sm font-semibold text-gray-400 peer-checked:text-black z-10 relative transition-colors duration-200 uppercase tracking-wide">
                      {t('search.presale')}
                    </span>
                    <div className="absolute inset-0 bg-[#e0a929] rounded-md opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></div>
                  </label>
                </div>
              </div>
              {/* Inputs Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end animate-fade-in">
                {/* Location Input */}
                <div className={operationType === "presale" ? "md:col-span-3 flex flex-col gap-2" : "md:col-span-5 flex flex-col gap-2"}>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t('search.location')}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-500 group-focus-within:text-[#e0a929] transition-colors">
                        location_on
                      </span>
                    </div>
                    <input
                      className="w-full h-14 bg-[#1a1a1a] border border-white/10 rounded-lg pl-12 pr-4 text-white placeholder-gray-600 focus:ring-1 focus:ring-[#e0a929] focus:border-[#e0a929] transition-all text-base"
                      placeholder={t('search.location_placeholder')}
                      type="text"
                    />
                  </div>
                </div>
                {/* Property Type Dropdown */}
                <div className={operationType === "presale" ? "md:col-span-3 flex flex-col gap-2" : "md:col-span-4 flex flex-col gap-2"}>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t('search.property_type')}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-500 group-focus-within:text-[#e0a929] transition-colors">
                        home_work
                      </span>
                    </div>
                    <select className="w-full h-14 bg-[#1a1a1a] border border-white/10 rounded-lg pl-12 pr-10 text-white focus:ring-1 focus:ring-[#e0a929] focus:border-[#e0a929] transition-all appearance-none cursor-pointer text-base">
                      <option disabled value="">
                        {t('search.select_type')}
                      </option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="villa">Villa</option>
                      <option value="loft">Loft</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-500">expand_more</span>
                    </div>
                  </div>
                </div>
                {/* Delivery Date (Only for Pre-Sale) */}
                {operationType === "presale" && (
                  <div className="md:col-span-3 flex flex-col gap-2 animate-slide-up">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t('search.delivery_date')}</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-500 group-focus-within:text-[#e0a929] transition-colors">
                          calendar_month
                        </span>
                      </div>
                      <select className="w-full h-14 bg-[#1a1a1a] border border-white/10 rounded-lg pl-12 pr-10 text-white focus:ring-1 focus:ring-[#e0a929] focus:border-[#e0a929] transition-all appearance-none cursor-pointer text-base">
                        <option value="">{t('search.select_date')}</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027+">2027+</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-500">expand_more</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Search Button */}
                <div className="md:col-span-3">
                  <button
                    className="w-full h-14 bg-[#e0a929] hover:bg-[#c99520] text-black font-bold text-base uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-[0_0_15px_rgba(224,169,41,0.3)] hover:shadow-[0_0_20px_rgba(224,169,41,0.5)]"
                    type="button"
                    onClick={() => navigate("/propiedades")}
                  >
                    <span className="material-symbols-outlined">search</span>
                    {t('search.search_button')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block text-white/50">
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Geographic Navigation Section */}
      <DestinationSection />

      {/* HUB / Blog Section */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h3 className="text-[#e0a929] font-bold tracking-[0.15em] uppercase text-sm mb-3">{t('hub.title')}</h3>
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">{t('hub.subtitle')}</h2>
            </div>
            <a
              className="group flex items-center gap-2 text-white/70 hover:text-[#e0a929] transition-colors pb-1 border-b border-transparent hover:border-[#e0a929]"
              href="#"
            >
              <span className="text-sm font-semibold uppercase tracking-wider">{t('hub.view_all')}</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
          {/* Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {/* Blog Post 1 */}
            <article className="group cursor-pointer flex flex-col gap-4">
              <div className="overflow-hidden rounded-lg aspect-[4/5] relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                <img
                  alt="Modern minimalist interior living room"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARabiGrgLZaMd8FxoxEcG849TSX8MIoAQjvwpZXNPtrOpNg2QhJ3ad3C-pIc33g9mhDpn5vUOKqt4sJCE_PEw4sNDzcKD49oOY8z5-i2UXrtNZBbu70Wyl3C4h33kB0jgVNJcC3d551Q0jycMU9oP5cAApDgsRgOzP_yLfR5eZj2sc7WVdiXPWTUVudUvzk8nHGPR0ZeL2q2_c5SbnPD6i_mJT1TGjtNGoCVDf2iKKM96r4iV4Gs8lvBGUUHa-CYBTkhiSqLXFE30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#e0a929]/80">
                  <span>Interior Design</span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span className="text-white/40">Oct 24, 2023</span>
                </div>
                <h3 className="text-xl text-white font-medium leading-snug group-hover:text-[#e0a929] transition-colors">
                  Embracing Minimalism in Modern Penthouses
                </h3>
              </div>
            </article>
            {/* Blog Post 2 */}
            <article className="group cursor-pointer flex flex-col gap-4">
              <div className="overflow-hidden rounded-lg aspect-[4/5] relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                <img
                  alt="Luxurious dark themed home office"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHCczjSWSBrJ_AvCyPUYKzoLjxjP2WPfqwQERY6WPVDta08hGI5bVpEJjouFMYrF2pUnraOCEctIn2iB-8QtkuBz-rSr_s-Xm2DLhCdHYrsBmCZvywjYQsQ_QFAGTcekmXhbJJe2oXqw1AAdlEC2OfkzLJen5P2SqxFtT9A91HAe9oWzm60KeL8hWdDIm5zGAh-QbZ5PrY4VhuOcqL42_FZAY8n5oZto4tu2rJf1emarzMNadn2hGWYX-oIma7B5H2QebPu5-94Cw"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#e0a929]/80">
                  <span>Lifestyle</span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span className="text-white/40">Oct 20, 2023</span>
                </div>
                <h3 className="text-xl text-white font-medium leading-snug group-hover:text-[#e0a929] transition-colors">
                  The Rise of the Home Executive Suite
                </h3>
              </div>
            </article>
            {/* Blog Post 3 */}
            <article className="group cursor-pointer flex flex-col gap-4">
              <div className="overflow-hidden rounded-lg aspect-[4/5] relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                <img
                  alt="Abstract architectural detail of modern building"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfl2Siyrzg0iPN3OjftRjLrQWhgf-JL10P57F3ibJAoyBD-Rf5L3jyw6fXWAcCD8_U0HmSFdBm4twZzoSc9lziCPFvpOb9gcYkyqYAGDegA-D8aQaNk8B1wPQ0jqJ-VojqpJ30xlCrwe4A_iORmcC1BjFllAHCG9yRR-n56uA6MhgVjlYItPTrO4xpO873OR6vja94W0VcFLqSQGifSGa970aZIZ-wOyoxbEU2jOEBQyK8mVcPcwydB-o-dx4cLWoVBiA2zI7jLGA"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#e0a929]/80">
                  <span>Architecture</span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span className="text-white/40">Oct 15, 2023</span>
                </div>
                <h3 className="text-xl text-white font-medium leading-snug group-hover:text-[#e0a929] transition-colors">
                  Sustainable Materials in Luxury Real Estate
                </h3>
              </div>
            </article>
            {/* Blog Post 4 */}
            <article className="group cursor-pointer flex flex-col gap-4">
              <div className="overflow-hidden rounded-lg aspect-[4/5] relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                <img
                  alt="Sunset view from a high rise balcony"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbLpTAEUoE-VhEIxTW8-yG9hAzjnxku6Z8OXaOtN4Zk7lVkuie403_3hBf7bC5HDFi1bJy5CjfwyZ8AWpICBaGS40h8HR9tKjXfpS5rlS0o30fQ0JnskC9ZFGfTgxQLl9uMRkBR2-E-m-TRh72qjwsKdIdyW--YaRPDQsZ6AqfAnZtZT8jK-MRfie4bq_0_l9sgAuyXbDLUk2PeMYJwkOVMWkRAx29KROMyz2hAFCtF0CzzV5cNgPXIZvq6A2DqNWssH7I8YeDF8Q"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#e0a929]/80">
                  <span>Market Trends</span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span className="text-white/40">Oct 12, 2023</span>
                </div>
                <h3 className="text-xl text-white font-medium leading-snug group-hover:text-[#e0a929] transition-colors">
                  Q4 2023 Global Property Market Analysis
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#e0a929] text-3xl">real_estate_agent</span>
                <h4 className="text-white text-xl font-bold uppercase tracking-tight">Homepty</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {t('footer.description')}
              </p>
              <div className="flex gap-4">
                <a
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e0a929] hover:text-black flex items-center justify-center transition-all text-white"
                  href="#"
                >
                  <span className="text-sm font-bold">IG</span>
                </a>
                <a
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e0a929] hover:text-black flex items-center justify-center transition-all text-white"
                  href="#"
                >
                  <span className="text-sm font-bold">LI</span>
                </a>
                <a
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e0a929] hover:text-black flex items-center justify-center transition-all text-white"
                  href="#"
                >
                  <span className="text-sm font-bold">TW</span>
                </a>
              </div>
            </div>
            {/* Links */}
            <div>
              <h5 className="text-white font-bold uppercase tracking-wider text-sm mb-6">{t('footer.discover')}</h5>
              <ul className="space-y-4">
                <li>
                  <a className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors" href="/propiedades">
                    {t('nav.geoNavigation')}
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors cursor-pointer" onClick={() => navigate("/hub")}>
                    {t('nav.hub')}
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors" href="#">
                    {t('nav.properties')}
                  </a>
                </li>
              </ul>
            </div>
            {/* Links */}
            <div>
              <h5 className="text-white font-bold uppercase tracking-wider text-sm mb-6">{t('footer.company')}</h5>
              <ul className="space-y-4">
                <li>
                  <a className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors" href="#">
                    {t('nav.about')}
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors" href="#">
                    {t('nav.agents')}
                  </a>
                </li>
              </ul>
            </div>
            {/* Newsletter */}
            <div>
              <h5 className="text-white font-bold uppercase tracking-wider text-sm mb-6">{t('footer.stay_informed')}</h5>
              <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for exclusive updates.</p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e0a929] transition-colors"
                  placeholder={t('footer.newsletter_placeholder')}
                  type="email"
                />
                <button className="bg-white text-black font-bold uppercase tracking-wider text-xs px-4 py-3 rounded hover:bg-[#e0a929] transition-colors">
                  {t('footer.subscribe')}
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2024 Homepty Real Estate. {t('footer.rights')}</p>
            <div className="flex gap-6">
              <a className="text-gray-500 hover:text-white text-xs transition-colors" href="#">
                {t('footer.privacy')}
              </a>
              <a className="text-gray-500 hover:text-white text-xs transition-colors" href="#">
                {t('footer.terms')}
              </a>
              <a className="text-gray-500 hover:text-white text-xs transition-colors" href="#">
                {t('footer.sitemap')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;