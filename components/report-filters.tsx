"use client"

import { useState } from "react"
import type { PollutionType, ReportStatus, ReportSource } from "@/types/report"
import { pollutionTypeConfig, statusConfig, sourceConfig } from "@/lib/pollution-types"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

interface ReportFiltersProps {
  onFilterChange: (filters: {
    pollutionTypes: PollutionType[]
    statuses: ReportStatus[]
    sources: ReportSource[]
  }) => void
}

export function ReportFilters({ onFilterChange }: ReportFiltersProps) {
  const { t } = useLanguage()
  const [selectedTypes, setSelectedTypes] = useState<PollutionType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<ReportStatus[]>([])
  const [selectedSources, setSelectedSources] = useState<ReportSource[]>([])

  const toggleType = (type: PollutionType) => {
    const newTypes = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type]
    setSelectedTypes(newTypes)
    onFilterChange({ pollutionTypes: newTypes, statuses: selectedStatuses, sources: selectedSources })
  }

  const toggleStatus = (status: ReportStatus) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status]
    setSelectedStatuses(newStatuses)
    onFilterChange({ pollutionTypes: selectedTypes, statuses: newStatuses, sources: selectedSources })
  }

  const toggleSource = (source: ReportSource) => {
    const newSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source]
    setSelectedSources(newSources)
    onFilterChange({ pollutionTypes: selectedTypes, statuses: selectedStatuses, sources: newSources })
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedStatuses([])
    setSelectedSources([])
    onFilterChange({ pollutionTypes: [], statuses: [], sources: [] })
  }

  const hasActiveFilters = selectedTypes.length > 0 || selectedStatuses.length > 0 || selectedSources.length > 0

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🔍</span>
          {t.filters}
        </h3>
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 font-semibold transition-colors"
          >
            ✕ {t.resetFilters}
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Тип загрязнения */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
            {t.pollutionType}
          </h4>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(pollutionTypeConfig) as PollutionType[]).map((type) => {
              const config = pollutionTypeConfig[type]
              const isSelected = selectedTypes.includes(type)
              return (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border-2 transition-all duration-200 ${isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : `${config.color} hover:border-primary/50 hover:scale-105`
                    }`}
                >
                  <span className="mr-1.5">{config.icon}</span>
                  {t.pollutionTypes[type]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Статус */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3 uppercase tracking-wider">{t.status}</h4>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(statusConfig) as ReportStatus[]).map((status) => {
              const config = statusConfig[status]
              const isSelected = selectedStatuses.includes(status)
              return (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border-2 transition-all duration-200 ${isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : `${config.color} hover:border-primary/50 hover:scale-105`
                    }`}
                >
                  {t.statuses[status]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Источник */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3 uppercase tracking-wider">{t.source}</h4>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(sourceConfig) as ReportSource[]).map((source) => {
              const config = sourceConfig[source]
              const isSelected = selectedSources.includes(source)
              return (
                <button
                  key={source}
                  onClick={() => toggleSource(source)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border-2 transition-all duration-200 ${isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : "bg-accent text-accent-foreground border-border hover:border-primary/50 hover:scale-105"
                    }`}
                >
                  <span className="mr-1.5">{config.icon}</span>
                  {t.sources[source]}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
