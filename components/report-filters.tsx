"use client"

import { useState } from "react"
import type { PollutionType, ReportSource } from "@/types/report"
import { pollutionTypeConfig, sourceConfig } from "@/lib/pollution-types"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface ReportFiltersProps {
  onFilterChange: (filters: {
    pollutionTypes: PollutionType[]
    sources: ReportSource[]
  }) => void
}

export function ReportFilters({ onFilterChange }: ReportFiltersProps) {
  const { t } = useLanguage()
  const [selectedTypes, setSelectedTypes] = useState<PollutionType[]>([])
  const [selectedSources, setSelectedSources] = useState<ReportSource[]>([])

  const toggleType = (type: PollutionType) => {
    const newTypes = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type]
    setSelectedTypes(newTypes)
    onFilterChange({ pollutionTypes: newTypes, sources: selectedSources })
  }

  const toggleSource = (source: ReportSource) => {
    const newSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source]
    setSelectedSources(newSources)
    onFilterChange({ pollutionTypes: selectedTypes, sources: newSources })
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedSources([])
    onFilterChange({ pollutionTypes: [], sources: [] })
  }

  const hasActiveFilters = selectedTypes.length > 0 || selectedSources.length > 0

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 space-y-4 shadow-card">
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

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Тип загрязнения */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:flex-1 justify-between font-semibold"
            >
              <span className="flex items-center gap-2">
                🏷️ {t.pollutionType}
                {selectedTypes.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                    {selectedTypes.length}
                  </span>
                )}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>{t.pollutionType}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(pollutionTypeConfig) as PollutionType[]).map((type) => {
              const config = pollutionTypeConfig[type]
              return (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                >
                  <span className="mr-2">{config.icon}</span>
                  {t.pollutionTypes[type]}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Источник */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:flex-1 justify-between font-semibold"
            >
              <span className="flex items-center gap-2">
                📱 {t.source}
                {selectedSources.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                    {selectedSources.length}
                  </span>
                )}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>{t.source}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(sourceConfig) as ReportSource[]).map((source) => {
              const config = sourceConfig[source]
              return (
                <DropdownMenuCheckboxItem
                  key={source}
                  checked={selectedSources.includes(source)}
                  onCheckedChange={() => toggleSource(source)}
                >
                  <span className="mr-2">{config.icon}</span>
                  {t.sources[source]}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
