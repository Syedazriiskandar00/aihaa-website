"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Locale, translations, type TranslationKeys } from "./translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "aihaa-lang";

// Feature flag — locale persistence (localStorage read/write).
// Disabled while the UI language toggle is hidden (see Header.tsx
// SHOW_LANGUAGE_TOGGLE). Server always renders BM; client ignores any
// previously-saved "en" value so there is no post-hydration flash for
// returning visitors whose localStorage still carries EN from the old
// switcher. Flip back to `true` when the EN content pass is ready and
// the UI switcher unhides.
const ENABLE_LOCALE_PERSISTENCE = false;

const BM_HTML_LANG = "ms";
const EN_HTML_LANG = "en";

const syncHtmlLang = (locale: Locale) => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale === "bm" ? BM_HTML_LANG : EN_HTML_LANG;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bm");

  // Hydrate from storage on mount (only when persistence enabled).
  useEffect(() => {
    if (!ENABLE_LOCALE_PERSISTENCE) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "bm" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {
      // Safari Private Mode / embedded WebView throws on storage access.
      // Silent fail — in-memory state still drives the UI.
    }
  }, []);

  // Keep <html lang> in sync with the active locale. Server emits `ms`
  // in layout.tsx; this effect updates it client-side if the locale
  // ever changes at runtime.
  useEffect(() => {
    syncHtmlLang(locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (!ENABLE_LOCALE_PERSISTENCE) return;
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // Same Safari Private / WebView case — memory-only state suffices.
    }
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
