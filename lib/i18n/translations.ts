export type Language = "ru" | "en" | "az" | "kk"

export interface Translations {
    // Header
    appName: string
    volunteerPanel: string
    refresh: string

    // Stats
    totalReports: string
    completed: string

    // Filters
    filters: string
    pollutionType: string
    source: string
    resetFilters: string
    allTypes: string
    allSources: string
    selected: string

    // Pollution Types
    pollutionTypes: {
        "bio-waste": string
        plastic: string
        glass: string
        oil: string
        "human-trash": string
        seaweed: string
        other: string
    }

    // Statuses
    statuses: {
        new: string
        completed: string
    }

    // Sources
    sources: {
        "mobile-app": string
        "telegram-bot": string
    }

    // Report Card
    openOnMap: string
    markCompleted: string
    cleanupCompleted: string
    reportedBy: string

    // Reports List
    reportsTitle: string
    noReportsFound: string
    tryChangingFilters: string

    // Map
    mapView: string
    listView: string
    viewOnMap: string

    // Footer
    systemDescription: string
    developedFor: string

    // Loading
    loadingReports: string
}

export const translations: Record<Language, Translations> = {
    ru: {
        appName: "Eco-Place",
        volunteerPanel: "Панель волонтера",
        refresh: "Обновить",

        totalReports: "Всего отчетов",
        completed: "Выполнено",

        filters: "Фильтры",
        pollutionType: "Тип загрязнения",
        source: "Источник",
        resetFilters: "Сбросить фильтры",
        allTypes: "Все типы",
        allSources: "Все источники",
        selected: "выбрано",

        pollutionTypes: {
            "bio-waste": "Биомусор",
            plastic: "Пластик",
            glass: "Стекло",
            oil: "Нефть/Мазут",
            "human-trash": "Бытовой мусор",
            seaweed: "Водоросли",
            other: "Другое",
        },

        statuses: {
            new: "Новый",
            completed: "Выполнено",
        },

        sources: {
            "mobile-app": "Мобильное приложение",
            "telegram-bot": "Telegram бот",
        },

        openOnMap: "Открыть на карте",
        markCompleted: "Отметить выполненным",
        cleanupCompleted: "✓ Уборка завершена",
        reportedBy: "Сообщил",

        reportsTitle: "Отчеты о загрязнениях",
        noReportsFound: "Отчетов не найдено",
        tryChangingFilters: "Попробуйте изменить фильтры или обновить данные",

        mapView: "Карта",
        listView: "Список",
        viewOnMap: "Показать на карте",

        systemDescription: "Система мониторинга загрязнений побережья Каспийского моря",
        developedFor: "Разработано для хакатона 2025",

        loadingReports: "Загрузка отчетов...",
    },

    en: {
        appName: "Eco-Place",
        volunteerPanel: "Volunteer Dashboard",
        refresh: "Refresh",

        totalReports: "Total Reports",
        completed: "Completed",

        filters: "Filters",
        pollutionType: "Pollution Type",
        source: "Source",
        resetFilters: "Reset Filters",
        allTypes: "All types",
        allSources: "All sources",
        selected: "selected",

        pollutionTypes: {
            "bio-waste": "Bio-waste",
            plastic: "Plastic",
            glass: "Glass",
            oil: "Oil/Tar",
            "human-trash": "Human Waste",
            seaweed: "Seaweed",
            other: "Other",
        },

        statuses: {
            new: "New",
            completed: "Completed",
        },

        sources: {
            "mobile-app": "Mobile App",
            "telegram-bot": "Telegram Bot",
        },

        openOnMap: "Open on Map",
        markCompleted: "Mark as Completed",
        cleanupCompleted: "✓ Cleanup Completed",
        reportedBy: "Reported by",

        reportsTitle: "Pollution Reports",
        noReportsFound: "No Reports Found",
        tryChangingFilters: "Try changing filters or refresh data",

        mapView: "Map",
        listView: "List",
        viewOnMap: "View on Map",

        systemDescription: "Caspian Sea Coast Pollution Monitoring System",
        developedFor: "Developed for Hackathon 2025",

        loadingReports: "Loading reports...",
    },

    az: {
        appName: "Eco-Place",
        volunteerPanel: "Könüllü Paneli",
        refresh: "Yenilə",

        totalReports: "Ümumi Hesabatlar",
        completed: "Tamamlandı",

        filters: "Filtrlər",
        pollutionType: "Çirklənmə Növü",
        source: "Mənbə",
        resetFilters: "Filtrləri Sıfırla",
        allTypes: "Bütün növlər",
        allSources: "Bütün mənbələr",
        selected: "seçildi",

        pollutionTypes: {
            "bio-waste": "Bio-tullantı",
            plastic: "Plastik",
            glass: "Şüşə",
            oil: "Neft/Mazut",
            "human-trash": "Məişət Tullantısı",
            seaweed: "Yosun",
            other: "Digər",
        },

        statuses: {
            new: "Yeni",
            completed: "Tamamlandı",
        },

        sources: {
            "mobile-app": "Mobil Tətbiq",
            "telegram-bot": "Telegram Bot",
        },

        openOnMap: "Xəritədə Aç",
        markCompleted: "Tamamlandı kimi İşarələ",
        cleanupCompleted: "✓ Təmizlik Tamamlandı",
        reportedBy: "Bildirən",

        reportsTitle: "Çirklənmə Hesabatları",
        noReportsFound: "Hesabat Tapılmadı",
        tryChangingFilters: "Filtrləri dəyişdirməyi və ya məlumatları yeniləməyi cəhd edin",

        mapView: "Xəritə",
        listView: "Siyahı",
        viewOnMap: "Xəritədə Göstər",

        systemDescription: "Xəzər Dənizi Sahil Çirklənməsi Monitorinq Sistemi",
        developedFor: "Hackathon 2025 üçün hazırlanmışdır",

        loadingReports: "Hesabatlar yüklənir...",
    },

    kk: {
        appName: "Eco-Place",
        volunteerPanel: "Волонтер Панелі",
        refresh: "Жаңарту",

        totalReports: "Барлық Есептер",
        completed: "Аяқталды",

        filters: "Сүзгілер",
        pollutionType: "Ластану Түрі",
        source: "Көз",
        resetFilters: "Сүзгілерді Қалпына Келтіру",
        allTypes: "Барлық түрлер",
        allSources: "Барлық көздер",
        selected: "таңдалды",

        pollutionTypes: {
            "bio-waste": "Био-қалдық",
            plastic: "Пластик",
            glass: "Шыны",
            oil: "Мұнай/Мазут",
            "human-trash": "Тұрмыстық Қалдық",
            seaweed: "Балдырлар",
            other: "Басқа",
        },

        statuses: {
            new: "Жаңа",
            completed: "Аяқталды",
        },

        sources: {
            "mobile-app": "Мобильді Қосымша",
            "telegram-bot": "Telegram Бот",
        },

        openOnMap: "Картада Ашу",
        markCompleted: "Орындалды деп Белгілеу",
        cleanupCompleted: "✓ Тазалау Аяқталды",
        reportedBy: "Хабарлаған",

        reportsTitle: "Ластану Есептері",
        noReportsFound: "Есептер Табылмады",
        tryChangingFilters: "Сүзгілерді өзгертіп көріңіз немесе деректерді жаңартыңыз",

        mapView: "Карта",
        listView: "Тізім",
        viewOnMap: "Картада Көрсету",

        systemDescription: "Каспий Теңізі Жағалауының Ластануын Бақылау Жүйесі",
        developedFor: "Hackathon 2025 үшін әзірленген",

        loadingReports: "Есептер жүктелуде...",
    },
}
