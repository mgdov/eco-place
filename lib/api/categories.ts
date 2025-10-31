// API для работы с категориями загрязнений

export interface Category {
    _id: string
    name: string
    description?: string
}

export interface CategoriesResponse {
    categories: Category[]
    error?: string
}

// Используем относительный путь к Next.js API Route вместо прямого обращения к внешнему API
const API_URL = "/api/categories"

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // Кэширование отключено для получения свежих данных
            cache: "no-store",
        })

        if (!response.ok) {
            console.warn(`API returned status: ${response.status}`)
            return []
        }

        const data: CategoriesResponse = await response.json()

        if (data.error) {
            console.warn("API returned error:", data.error)
        }

        return data.categories || []
    } catch (error) {
        console.error("Ошибка при загрузке категорий:", error)
        // Возвращаем пустой массив вместо throw, чтобы UI не ломался
        return []
    }
}