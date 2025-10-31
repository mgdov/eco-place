import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "http://192.168.1.79:8081"

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(5000),
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: `API error: ${response.status}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Ошибка при обновлении задачи:", error)

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        )
    }
}
