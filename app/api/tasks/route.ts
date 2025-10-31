import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "http://192.168.1.79:8081"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const categoryId = searchParams.get("categoryId")

        // Строим URL с параметрами
        const url = categoryId
            ? `${API_BASE_URL}/api/tasks?categoryId=${categoryId}`
            : `${API_BASE_URL}/api/tasks`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // Добавляем таймаут
            signal: AbortSignal.timeout(5000),
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: `API error: ${response.status}`, tasks: [] },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Ошибка при проксировании запроса к API задач:", error)

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
                tasks: []
            },
            { status: 200 }
        )
    }
}
