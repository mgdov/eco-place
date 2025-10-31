import { NextResponse } from "next/server"

const API_BASE_URL = "http://176.88.248.139:8081"

export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // Добавляем таймаут
            signal: AbortSignal.timeout(5000),
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: `API error: ${response.status}`, categories: [] },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Ошибка при проксировании запроса к API категорий:", error)

        // Возвращаем пустой массив категорий при ошибке
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
                categories: []
            },
            { status: 200 } // Возвращаем 200, чтобы клиент получил пустой массив
        )
    }
}
