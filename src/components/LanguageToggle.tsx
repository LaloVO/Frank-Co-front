import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
            <button
                onClick={() => toggleLanguage("en")}
                className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${i18n.language.startsWith("en")
                        ? "bg-[#e0a929] text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
            >
                ENG
            </button>
            <button
                onClick={() => toggleLanguage("es")}
                className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${i18n.language.startsWith("es")
                        ? "bg-[#e0a929] text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
            >
                ESP
            </button>
        </div>
    );
};
