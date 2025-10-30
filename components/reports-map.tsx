"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import type { PollutionReport } from "@/types/report"
import { pollutionTypeConfig } from "@/lib/pollution-types"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

const MapComponent = dynamic(() => import("@/components/map-client"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[500px] bg-accent rounded-xl flex items-center justify-center">
            <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <div className="text-sm text-muted-foreground">Загрузка карты...</div>
            </div>
        </div>
    ),
})

interface ReportsMapProps {
    reports: PollutionReport[]
}

export function ReportsMap({ reports }: ReportsMapProps) {
    const { t } = useLanguage()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Card className="w-full h-[500px] bg-accent rounded-xl flex items-center justify-center border-2 border-border">
                <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div className="text-sm text-muted-foreground">Загрузка карты...</div>
                </div>
            </Card>
        )
    }

    return (
        <div className="w-full">
            <MapComponent reports={reports} />
        </div>
    )
}
