import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "http://176.88.248.139:8081"

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}/complete`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
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
        console.error("Ошибка при отметке задачи выполненной:", error)

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        )
    }
}
