"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import type { Language, Translations } from "@/lib/i18n/translations"
import { translations } from "@/lib/i18n/translations"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("ru")

    useEffect(() => {
        // Load language from localStorage
        const savedLanguage = localStorage.getItem("language") as Language
        if (savedLanguage && translations[savedLanguage]) {
            setLanguageState(savedLanguage)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
    }

    const t = translations[language]

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
