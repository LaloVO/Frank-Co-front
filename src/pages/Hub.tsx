import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

const Hub = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        document.title = "Homepty HUB | Insights & Lifestyle";
        document.documentElement.classList.add("dark");
    }, []);

    const categories = [
        { id: "all", label: "All Stories" },
        { id: "market", label: "Market Trends" },
        { id: "interior", label: "Interior Design" },
        { id: "lifestyle", label: "Lifestyle" },
        { id: "architecture", label: "Architecture" },
    ];

    const articles = [
        {
            id: 1,
            category: "interior",
            categoryLabel: "Interior Design",
            date: "Oct 24, 2023",
            title: "Embracing Minimalism in Modern Penthouses",
            excerpt: "How clean lines and open spaces are redefining luxury living in urban centers.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARabiGrgLZaMd8FxoxEcG849TSX8MIoAQjvwpZXNPtrOpNg2QhJ3ad3C-pIc33g9mhDpn5vUOKqt4sJCE_PEw4sNDzcKD49oOY8z5-i2UXrtNZBbu70Wyl3C4h33kB0jgVNJcC3d551Q0jycMU9oP5cAApDgsRgOzP_yLfR5eZj2sc7WVdiXPWTUVudUvzk8nHGPR0ZeL2q2_c5SbnPD6i_mJT1TGjtNGoCVDf2iKKM96r4iV4Gs8lvBGUUHa-CYBTkhiSqLXFE30",
        },
        {
            id: 2,
            category: "lifestyle",
            categoryLabel: "Lifestyle",
            date: "Oct 20, 2023",
            title: "The Rise of the Home Executive Suite",
            excerpt: "Designing work environments that balance professional productivity with residential comfort.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHCczjSWSBrJ_AvCyPUYKzoLjxjP2WPfqwQERY6WPVDta08hGI5bVpEJjouFMYrF2pUnraOCEctIn2iB-8QtkuBz-rSr_s-Xm2DLhCdHYrsBmCZvywjYQsQ_QFAGTcekmXhbJJe2oXqw1AAdlEC2OfkzLJen5P2SqxFtT9A91HAe9oWzm60KeL8hWdDIm5zGAh-QbZ5PrY4VhuOcqL42_FZAY8n5oZto4tu2rJf1emarzMNadn2hGWYX-oIma7B5H2QebPu5-94Cw",
        },
        {
            id: 3,
            category: "architecture",
            categoryLabel: "Architecture",
            date: "Oct 15, 2023",
            title: "Sustainable Materials in Luxury Real Estate",
            excerpt: "From recycled ocean plastic to carbon-neutral concrete, luxury gets a green makeover.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfl2Siyrzg0iPN3OjftRjLrQWhgf-JL10P57F3ibJAoyBD-Rf5L3jyw6fXWAcCD8_U0HmSFdBm4twZzoSc9lziCPFvpOb9gcYkyqYAGDegA-D8aQaNk8B1wPQ0jqJ-VojqpJ30xlCrwe4A_iORmcC1BjFllAHCG9yRR-n56uA6MhgVjlYItPTrO4xpO873OR6vja94W0VcFLqSQGifSGa970aZIZ-wOyoxbEU2jOEBQyK8mVcPcwydB-o-dx4cLWoVBiA2zI7jLGA",
        },
        {
            id: 4,
            category: "market",
            categoryLabel: "Market Trends",
            date: "Oct 12, 2023",
            title: "Q4 2023 Global Property Market Analysis",
            excerpt: "Expert insights into emerging investment opportunities across major global markets.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbLpTAEUoE-VhEIxTW8-yG9hAzjnxku6Z8OXaOtN4Zk7lVkuie403_3hBf7bC5HDFi1bJy5CjfwyZ8AWpICBaGS40h8HR9tKjXfpS5rlS0o30fQ0JnskC9ZFGfTgxQLl9uMRkBR2-E-m-TRh72qjwsKdIdyW--YaRPDQsZ6AqfAnZtZT8jK-MRfie4bq_0_l9sgAuyXbDLUk2PeMYJwkOVMWkRAx29KROMyz2hAFCtF0CzzV5cNgPXIZvq6A2DqNWssH7I8YeDF8Q",
        },
        {
            id: 5,
            category: "lifestyle",
            categoryLabel: "Lifestyle",
            date: "Oct 05, 2023",
            title: "The Art of the Waterfront Garden",
            excerpt: "How to landscape coastal properties for maximum visual impact and environmental resilience.",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 6,
            category: "market",
            categoryLabel: "Market Trends",
            date: "Sep 28, 2023",
            title: "Luxury Real Estate in the Age of AI",
            excerpt: "How machine learning is transforming property valuation and personalized home searches.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        }
    ];

    const filteredArticles = activeCategory === "all"
        ? articles
        : articles.filter(article => article.category === activeCategory);

    return (
        <div className="bg-white dark:bg-[#0a0a0a] text-[#111] dark:text-white font-display overflow-x-hidden antialiased selection:bg-[#e0a929] selection:text-white transition-colors duration-500 min-h-screen flex flex-col">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
                <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-8 h-8 text-[#e0a929]">
                            <span className="material-symbols-outlined text-3xl">real_estate_agent</span>
                        </div>
                        <h1 className="text-[#111] dark:text-white text-xl font-bold tracking-tight uppercase">Homepty</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <span
                            className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-300 hover:text-[#e0a929] transition-colors uppercase cursor-pointer"
                            onClick={() => navigate("/propiedades")}
                        >
                            {t('nav.geoNavigation')}
                        </span>
                        <span
                            className="text-sm font-semibold tracking-wide text-[#e0a929] transition-colors uppercase cursor-pointer"
                            onClick={() => navigate("/hub")}
                        >
                            {t('nav.hub')}
                        </span>
                        <span
                            className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-300 hover:text-[#e0a929] transition-colors uppercase cursor-pointer"
                            onClick={() => navigate("/propiedades")}
                        >
                            {t('nav.properties')}
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <ThemeToggle />
                        <div className="w-px h-6 bg-gray-200 dark:bg-white/10"></div>
                        <LanguageToggle />
                        <button className="md:hidden text-[#111] dark:text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-[1440px] mx-auto text-center space-y-6">
                    <h2 className="text-[#e0a929] font-bold tracking-[0.2em] uppercase text-sm md:text-base animate-slide-up">
                        {t('hub.title')}
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#111] dark:text-white leading-tight tracking-tight animate-fade-in">
                        {t('hub.subtitle')}
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
                        Explore the latest in luxury real estate, architecture, and interior design from our global collective of experts.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="px-6 py-10 border-y border-gray-100 dark:border-white/5 overflow-x-auto">
                <div className="max-w-[1440px] mx-auto flex justify-center gap-8 min-w-max">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`text-sm font-bold uppercase tracking-widest transition-all relative pb-2 ${activeCategory === category.id
                                    ? "text-[#e0a929]"
                                    : "text-gray-400 hover:text-[#111] dark:hover:text-white"
                                }`}
                        >
                            {category.label}
                            {activeCategory === category.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e0a929] animate-scale-x" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Article Grid */}
            <section className="flex-1 py-16 px-6">
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredArticles.map((article, index) => (
                            <article
                                key={article.id}
                                className="group cursor-pointer flex flex-col gap-6 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="overflow-hidden rounded-xl aspect-[16/10] relative shadow-lg dark:shadow-none">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                                    <img
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        src={article.image}
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md text-[#111] dark:text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10">
                                            {article.categoryLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-xs font-bold uppercase tracking-widest text-[#e0a929]/80">
                                        {article.date}
                                    </div>
                                    <h3 className="text-2xl text-[#111] dark:text-white font-medium leading-tight group-hover:text-[#e0a929] transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                    <div className="pt-2 flex items-center gap-2 text-[#e0a929] font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                        Read Article
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-gray-50 dark:bg-[#050505] py-24 px-6 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-[600px] mx-auto text-center space-y-8">
                    <div className="w-12 h-12 bg-[#e0a929]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-[#e0a929]">mail</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-light text-[#111] dark:text-white">{t('footer.stay_informed')}</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Subscribe to receive our curated selection of luxury real estate insights directly in your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-6 py-4 text-[#111] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#e0a929] transition-all"
                            placeholder={t('footer.newsletter_placeholder')}
                            type="email"
                        />
                        <button className="bg-[#e0a929] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-lg hover:bg-[#c99520] transition-colors shadow-lg shadow-[#e0a929]/20">
                            {t('footer.subscribe')}
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-[#050505] pt-20 pb-10 px-6 border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#e0a929] text-3xl">real_estate_agent</span>
                                <h4 className="text-[#111] dark:text-white text-xl font-bold uppercase tracking-tight">Homepty</h4>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                                {t('footer.description')}
                            </p>
                        </div>
                        <div>
                            <h5 className="text-[#111] dark:text-white font-bold uppercase tracking-wider text-sm mb-6">{t('footer.discover')}</h5>
                            <ul className="space-y-4">
                                <li><a onClick={() => navigate("/propiedades")} className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors cursor-pointer">{t('nav.geoNavigation')}</a></li>
                                <li><a onClick={() => navigate("/hub")} className="text-[#e0a929] text-sm transition-colors cursor-pointer">{t('nav.hub')}</a></li>
                                <li><a onClick={() => navigate("/propiedades")} className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors cursor-pointer">{t('nav.properties')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-[#111] dark:text-white font-bold uppercase tracking-wider text-sm mb-6">{t('footer.company')}</h5>
                            <ul className="space-y-4">
                                <li><a className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors cursor-pointer" href="#">{t('nav.about')}</a></li>
                                <li><a className="text-gray-400 hover:text-[#e0a929] text-sm transition-colors cursor-pointer" href="#">{t('nav.agents')}</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h5 className="text-[#111] dark:text-white font-bold uppercase tracking-wider text-sm mb-0">Follow Us</h5>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-[#e0a929] hover:text-black flex items-center justify-center transition-all text-[#111] dark:text-white" href="#">IG</a>
                                <a className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-[#e0a929] hover:text-black flex items-center justify-center transition-all text-[#111] dark:text-white" href="#">LI</a>
                                <a className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-[#e0a929] hover:text-black flex items-center justify-center transition-all text-[#111] dark:text-white" href="#">TW</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">© 2024 Homepty Real Estate. {t('footer.rights')}</p>
                        <div className="flex gap-6">
                            <a className="text-gray-500 hover:text-[#e0a929] text-xs transition-colors" href="#">{t('footer.privacy')}</a>
                            <a className="text-gray-500 hover:text-[#e0a929] text-xs transition-colors" href="#">{t('footer.terms')}</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Hub;
