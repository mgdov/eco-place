// API для работы с задачами (отчетами о загрязнениях)

export interface Task {
    _id: string
    title?: string
    description?: string
    location?: {
        latitude: number
        longtitude: number // Опечатка в API сервера
    }
    categories?: Array<{
        _id: string
        name: string
    }>
    author?: {
        _id: string
        telegramId?: number
        username?: string
    }
    from?: string // Источник: "mobile-app" или "telegram-bot"
    isCompleted: boolean
    isAccepted: boolean
    media?: string[]
    history?: Array<{
        action: string
        user: string
        timestamp: string
        _id: string
    }>
    createdAt?: string
    updatedAt?: string
}

export interface TasksResponse {
    tasks: Task[]
    error?: string
}

// Используем относительный путь к Next.js API Route
const API_URL = "/api/tasks"

export async function fetchTasks(categoryId?: string): Promise<Task[]> {
    try {
        const url = categoryId ? `${API_URL}?categoryId=${categoryId}` : API_URL

        const response = await fetch(url, {
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

        const data: TasksResponse = await response.json()

        if (data.error) {
            console.warn("API returned error:", data.error)
        }

        return data.tasks || []
    } catch (error) {
        console.error("Ошибка при загрузке задач:", error)
        return []
    }
}

export async function updateTaskStatus(taskId: string, isCompleted: boolean): Promise<void> {
    try {
        // Если задача отмечается выполненной, используем специальный endpoint
        if (isCompleted) {
            const response = await fetch(`${API_URL}/${taskId}/complete`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to mark task as completed: ${response.status}`)
            }
        } else {
            // Для других изменений статуса используем обычный PATCH
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isCompleted }),
            })

            if (!response.ok) {
                throw new Error(`Failed to update task status: ${response.status}`)
            }
        }
    } catch (error) {
        console.error("Ошибка при обновлении статуса задачи:", error)
        throw error
    }
}
