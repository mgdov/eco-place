"use client"

import { useEffect, useState } from "react"
import type { PollutionReport, PollutionType, ReportStatus, ReportSource } from "@/types/report"
import { fetchReports, updateReportStatus } from "@/lib/mock-data"
import { ReportCard } from "@/components/report-card"
import { ReportFilters } from "@/components/report-filters"
import { StatsOverview } from "@/components/stats-overview"
import { ReportsMap } from "@/components/reports-map"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { t } = useLanguage()
  const [reports, setReports] = useState<PollutionReport[]>([])
  const [filteredReports, setFilteredReports] = useState<PollutionReport[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [filters, setFilters] = useState<{
    pollutionTypes: PollutionType[]
    sources: ReportSource[]
  }>({
    pollutionTypes: [],
    sources: [],
  })

  useEffect(() => {
    loadReports()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [reports, filters])

  const loadReports = async () => {
    setLoading(true)
    try {
      const data = await fetchReports()
      setReports(data)
    } catch (error) {
      console.error("Ошибка загрузки отчетов:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...reports]

    if (filters.pollutionTypes.length > 0) {
      filtered = filtered.filter((r) => filters.pollutionTypes.includes(r.pollutionType))
    }

    if (filters.sources.length > 0) {
      filtered = filtered.filter((r) => filters.sources.includes(r.source))
    }

    setFilteredReports(filtered)
  }

  const handleStatusChange = async (reportId: string, newStatus: ReportStatus) => {
    try {
      await updateReportStatus(reportId, newStatus)

      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId
            ? { ...report, status: newStatus, completedAt: newStatus === "completed" ? new Date() : report.completedAt }
            : report,
        ),
      )
    } catch (error) {
      console.error("Ошибка обновления статуса:", error)
    }
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-4 animate-bounce">🌊</div>
          <div className="text-base sm:text-lg font-medium text-foreground">{t.loadingReports}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-header sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl shrink-0">🌊</div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-white truncate">
                  {t.appName}
                </h1>
                <p className="text-[10px] sm:text-xs lg:text-sm text-white/90 font-medium truncate hidden xs:block">
                  {t.volunteerPanel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <LanguageSelector />
              <Button
                onClick={loadReports}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200 px-2.5 sm:px-3 lg:px-4 xl:px-6 font-semibold shadow-lg h-9 sm:h-10"
              >
                <span className="text-lg sm:text-xl">🔄</span>
                <span className="hidden xl:inline ml-2">{t.refresh}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="space-y-6 sm:space-y-8">
          {/* Stats */}
          <section>
            <StatsOverview reports={reports} />
          </section>

          {/* Filters */}
          <section>
            <ReportFilters onFilterChange={handleFilterChange} />
          </section>

          {/* Reports List */}
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                {t.reportsTitle}
                <span className="text-sm sm:text-base font-bold px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full bg-primary text-primary-foreground shadow-sm">
                  {filteredReports.length}
                </span>
              </h2>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setViewMode("list")}
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  className="font-semibold flex-1 sm:flex-initial"
                >
                  <span className="mr-1 sm:mr-2">📋</span>
                  <span className="text-xs sm:text-sm">{t.listView}</span>
                </Button>
                <Button
                  onClick={() => setViewMode("map")}
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  className="font-semibold flex-1 sm:flex-initial"
                >
                  <span className="mr-1 sm:mr-2">🗺️</span>
                  <span className="text-xs sm:text-sm">{t.mapView}</span>
                </Button>
              </div>
            </div>

            {filteredReports.length === 0 ? (
              <div className="text-center py-12 sm:py-16 bg-accent rounded-2xl border-2 border-dashed border-border">
                <div className="text-5xl sm:text-6xl mb-4">🔍</div>
                <p className="text-lg sm:text-xl font-semibold text-foreground mb-2">{t.noReportsFound}</p>
                <p className="text-sm text-muted-foreground">{t.tryChangingFilters}</p>
              </div>
            ) : viewMode === "map" ? (
              <ReportsMap reports={filteredReports} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-card border-t border-border mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
            <span className="text-xl sm:text-2xl shrink-0">🌊</span>
            <p className="text-xs sm:text-sm font-medium text-foreground text-center sm:text-left">{t.systemDescription}</p>
          </div>
          <p className="text-xs text-muted-foreground">{t.developedFor}</p>
        </div>
      </footer>
    </div>
  )
}
