"use client"

import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/i18n/translations"
import { Button } from "@/components/ui/button"

const languages: { code: Language; label: string; flag: string }[] = [
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "az", label: "Azərbaycan", flag: "🇦🇿" },
    { code: "kk", label: "Қазақша", flag: "🇰🇿" },
]

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="flex gap-2">
            {languages.map((lang) => (
                <Button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    variant={language === lang.code ? "default" : "outline"}
                    size="sm"
                    className={`
            ${language === lang.code
                            ? "bg-white text-teal-600 hover:bg-white/90"
                            : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                        }
            backdrop-blur-sm transition-all duration-200 font-semibold shadow-lg px-3 py-1.5 text-xs
          `}
                >
                    <span className="mr-1.5">{lang.flag}</span>
                    <span className="hidden sm:inline">{lang.label}</span>
                </Button>
            ))}
        </div>
    )
}
