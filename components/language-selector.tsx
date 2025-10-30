"use client"

import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/i18n/translations"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages: { code: Language; label: string; flag: string }[] = [
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "az", label: "Azərbaycan", flag: "🇦🇿" },
    { code: "kk", label: "Қазақша", flag: "🇰🇿" },
]

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage()
    const currentLang = languages.find((lang) => lang.code === language)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200 font-semibold shadow-lg px-2.5 sm:px-3 py-1.5 text-xs h-9 sm:h-10"
                >
                    <span className="text-base sm:text-lg">{currentLang?.flag}</span>
                    <span className="ml-1.5 text-xs sm:text-sm hidden xs:inline">
                        {currentLang?.code.toUpperCase()}
                    </span>
                    <span className="ml-1 sm:ml-1.5 hidden sm:inline">▼</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 sm:w-48">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`cursor-pointer ${language === lang.code ? "bg-accent font-semibold" : ""
                            }`}
                    >
                        <span className="mr-2 text-base sm:text-lg">{lang.flag}</span>
                        <span className="text-sm">{lang.label}</span>
                        {language === lang.code && <span className="ml-auto text-teal-600 font-bold">✓</span>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
