"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations, Language, TranslationKeys } from "@/lib/translations"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const SUPPORTED_LANGUAGES: Language[] = ["en", "it", "de", "es", "fr"]

// Google Translate expects: /<source>/<target>
const GT_COOKIE_MAP: Record<Language, string> = {
    en: "/en/en",
    it: "/en/it",
    de: "/en/de",
    es: "/en/es",
    fr: "/en/fr",
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>("en")

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language | null
        if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
            setLanguageState(savedLang)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)

        // Google Translate cookie logic
        const googtrans = GT_COOKIE_MAP[lang] ?? "/en/en"

        // Set cookie for current domain and all subdomains for robustness
        document.cookie = `googtrans=${googtrans}; path=/;`

        // Also try to set it for the base domain to ensure it works across subdomains (like dev tunnels)
        try {
            const hostname = window.location.hostname;
            const parts = hostname.split('.');
            if (parts.length >= 2) {
                const baseDomain = parts.slice(-2).join('.');
                document.cookie = `googtrans=${googtrans}; path=/; domain=.${baseDomain}`;
            }

            // Specifically handle dev tunnels if detected
            if (hostname.includes('devtunnels.ms')) {
                document.cookie = `googtrans=${googtrans}; path=/; domain=.devtunnels.ms`;
            }
        } catch (e) {
            console.error("Error setting cookie:", e);
        }

        // Reload to apply translation
        window.location.reload()
    }

    const t = translations[language]

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
