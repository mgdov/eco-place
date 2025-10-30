"use client"

import type { PollutionReport } from "@/types/report"
import { pollutionTypeConfig, statusConfig, sourceConfig } from "@/lib/pollution-types"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ReportCardProps {
  report: PollutionReport
  onStatusChange?: (reportId: string, newStatus: PollutionReport["status"]) => void
}

export function ReportCard({ report, onStatusChange }: ReportCardProps) {
  const { t } = useLanguage()
  const pollutionConfig = pollutionTypeConfig[report.pollutionType]
  const statusInfo = statusConfig[report.status]
  const sourceInfo = sourceConfig[report.source]

  const handleTakeAction = () => {
    if (report.status === "new") {
      onStatusChange?.(report.id, "in-progress")
    } else if (report.status === "in-progress") {
      onStatusChange?.(report.id, "completed")
    }
  }

  return (
    <Card className="border-2 border-border shadow-lg hover:shadow-2xl transition-all duration-300 bg-card p-0 overflow-hidden">
      {/* Photo */}
      <div className="relative h-[calc(100%-40px)] min-h-[200px] bg-muted">
        <Image
          src={report.photoUrl || "/placeholder.svg"}
          alt={`Загрязнение: ${pollutionConfig.label}`}
          fill
          className="object-cover"
        />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm ${pollutionConfig.color}`}>
            <span className="mr-1.5">{pollutionConfig.icon}</span>
            {t.pollutionTypes[report.pollutionType]}
          </div>

          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm ${statusInfo.color}`}>
            {t.statuses[report.status]}
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Description */}
        {report.description && (
          <p className="text-xs text-foreground leading-relaxed line-clamp-2">{report.description}</p>
        )}

        {/* Coordinates */}
        <div className="flex items-start gap-2 text-sm bg-gradient-to-br from-accent to-accent/50 rounded-xl p-3 border border-border shadow-sm">
          <span className="text-primary text-base mt-0.5">📍</span>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-xs text-muted-foreground truncate mb-1">
              {report.coordinates.latitude.toFixed(4)}, {report.coordinates.longitude.toFixed(4)}
            </div>
            <a
              href={`https://www.google.com/maps?q=${report.coordinates.latitude},${report.coordinates.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold text-xs underline inline-flex items-center gap-1 transition-colors"
            >
              {t.openOnMap}
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 bg-accent px-3 py-2 rounded-lg border border-border shadow-sm">
            <span className="text-base">{sourceInfo.icon}</span>
            <span className="font-semibold text-xs text-foreground truncate">{t.sources[report.source]}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-accent px-3 py-2 rounded-lg border border-border shadow-sm">
            <span className="text-base">📅</span>
            <span className="font-semibold text-xs text-foreground">
              {new Date(report.reportedAt).toLocaleDateString("ru-RU")}
            </span>
          </div>
          {report.reportedBy && (
            <div className="flex items-center gap-1.5 bg-accent px-3 py-2 rounded-lg border border-border shadow-sm col-span-2 sm:col-span-1">
              <span className="text-base">👤</span>
              <span className="truncate font-semibold text-xs text-foreground">{report.reportedBy}</span>
            </div>
          )}
          {report.assignedTo && (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-2 rounded-lg font-bold shadow-md col-span-2 sm:col-span-1">
              <span className="text-base">✓</span>
              <span className="truncate text-xs">{report.assignedTo}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {report.status === "new" && (
            <Button
              onClick={handleTakeAction}
              className="flex-1 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 text-xs"
            >
              {t.takeToWork}
            </Button>
          )}
          {report.status === "in-progress" && (
            <Button
              onClick={handleTakeAction}
              className="flex-1 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-xs"
            >
              {t.markCompleted}
            </Button>
          )}
          {report.status === "completed" && (
            <div className="flex-1 h-10 flex items-center justify-center text-xs bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 font-bold rounded-lg border-2 border-emerald-300 shadow-sm">
              {t.cleanupCompleted}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
