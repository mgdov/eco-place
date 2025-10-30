"use client"

import type { PollutionReport } from "@/types/report"
import { pollutionTypeConfig, statusConfig, sourceConfig } from "@/lib/pollution-types"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"
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
    <div className="h-full flex flex-col group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Large Image - Fixed Height */}
      <div className="relative w-full h-64 bg-muted overflow-hidden shrink-0">
        <Image
          src={report.photoUrl || "/placeholder.svg"}
          alt={t.pollutionTypes[report.pollutionType]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl ${pollutionConfig.color} shadow-lg border border-white/30`}>
            <span className="mr-1">{pollutionConfig.icon}</span>
            {t.pollutionTypes[report.pollutionType]}
          </div>

          <div className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl ${statusInfo.color} shadow-lg border border-white/30`}>
            {t.statuses[report.status]}
          </div>
        </div>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="flex items-center gap-2 text-white/90 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">{new Date(report.reportedAt).toLocaleDateString("ru-RU")}</span>
            <span className="mx-1">•</span>
            <span className="flex items-center gap-1">
              {sourceInfo.icon}
              <span className="hidden xs:inline">{t.sources[report.source]}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content - Flexible with fixed structure */}
      <div className="flex-1 flex flex-col p-4">
        {/* Description - Fixed height with clamp */}
        <div className="h-11 mb-3">
          {report.description && (
            <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
              {report.description}
            </p>
          )}
        </div>

        {/* Location - Fixed */}
        <a
          href={`https://www.google.com/maps?q=${report.coordinates.latitude},${report.coordinates.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 p-3 bg-accent/40 hover:bg-accent/60 rounded-xl transition-colors group/location mb-3"
        >
          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="font-mono text-xs text-muted-foreground mb-0.5">
              {report.coordinates.latitude.toFixed(4)}, {report.coordinates.longitude.toFixed(4)}
            </div>
            <div className="text-xs text-primary font-semibold group-hover/location:underline">
              {t.openOnMap} →
            </div>
          </div>
        </a>

        {/* People - Fixed height */}
        <div className="h-8 mb-3 flex items-center">
          {(report.reportedBy || report.assignedTo) && (
            <div className="flex flex-wrap gap-2 text-xs">
              {report.reportedBy && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/50 rounded-full border border-border/50">
                  <span className="text-muted-foreground">👤</span>
                  <span className="font-medium text-foreground truncate max-w-[120px]">{report.reportedBy}</span>
                </div>
              )}
              {report.assignedTo && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full border border-teal-500/30 font-semibold">
                  <span>✓</span>
                  <span className="truncate max-w-[120px]">{report.assignedTo}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action - Always at bottom */}
        <div className="mt-auto">
          {report.status === "new" && (
            <Button
              onClick={handleTakeAction}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              <span className="mr-2">🤝</span>
              {t.takeToWork}
            </Button>
          )}
          {report.status === "in-progress" && (
            <Button
              onClick={handleTakeAction}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              <span className="mr-2">✅</span>
              {t.markCompleted}
            </Button>
          )}
          {report.status === "completed" && (
            <div className="w-full py-3 px-4 text-center bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
              <span className="mr-2">🎉</span>
              {t.cleanupCompleted}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
