"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => setLocale("bm")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "bm"
            ? "text-gold font-semibold"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        BM
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "text-gold font-semibold"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        EN
      </button>
    </div>
  );
}
