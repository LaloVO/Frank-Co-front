import { useEffect, useState } from "react";

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Sync with existing class if present
        const isDarkTheme = document.documentElement.classList.contains("dark");
        setIsDark(isDarkTheme);
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-14 h-7 rounded-full bg-gray-200 dark:bg-[#e0a929]/20 border border-gray-300 dark:border-[#e0a929]/30 p-1 transition-all duration-500 hover:shadow-[0_0_15px_rgba(224,169,41,0.2)] group"
        >
            <div
                className={`absolute left-1 flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-[#e0a929] shadow-md transition-all duration-500 transform ${isDark ? "translate-x-7" : "translate-x-0"
                    }`}
            >
                <span className="material-symbols-outlined text-[14px] text-[#e0a929] dark:text-[#0a0a0a] transition-all duration-500">
                    {isDark ? "dark_mode" : "light_mode"}
                </span>
            </div>
            <div className="flex justify-between w-full px-1">
                <span className="material-symbols-outlined text-[14px] text-gray-400 opacity-100 dark:opacity-0 transition-opacity duration-300">
                    light_mode
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#e0a929] opacity-0 dark:opacity-100 transition-opacity duration-300">
                    dark_mode
                </span>
            </div>
        </button>
    );
};
