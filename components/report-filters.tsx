"use client"

import { useState, useEffect } from "react"
import type { PollutionType, ReportSource } from "@/types/report"
import { pollutionTypeConfig, sourceConfig } from "@/lib/pollution-types"
import { fetchCategories, type Category } from "@/lib/api/categories"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Check } from "lucide-react"

interface ReportFiltersProps {
  onFilterChange: (filters: {
    pollutionTypes: PollutionType[]
    sources: ReportSource[]
  }) => void
  onCategoryChange?: (categoryId: string | undefined) => void
}

export function ReportFilters({ onFilterChange, onCategoryChange }: ReportFiltersProps) {
  const { t } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined)
  const [selectedTypes, setSelectedTypes] = useState<PollutionType[]>([])
  const [selectedSources, setSelectedSources] = useState<ReportSource[]>([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoadingCategories(true)
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (error) {
      console.error("Не удалось загрузить категории:", error)
      // При ошибке используем пустой массив, fallback к статическим категориям
      setCategories([])
    } finally {
      setLoadingCategories(false)
    }
  }

  const toggleCategory = (categoryId: string) => {
    const newCategoryId = selectedCategoryId === categoryId ? undefined : categoryId
    setSelectedCategoryId(newCategoryId)
    onCategoryChange?.(newCategoryId)
  }

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
    setSelectedCategoryId(undefined)
    onFilterChange({ pollutionTypes: [], sources: [] })
    onCategoryChange?.(undefined)
  }

  const hasActiveFilters = selectedTypes.length > 0 || selectedSources.length > 0 || selectedCategoryId !== undefined

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
              const isSelected = selectedTypes.includes(type)
              return (
                <DropdownMenuItem
                  key={type}
                  onClick={() => toggleType(type)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center w-full">
                    <div className="w-4 h-4 mr-2 flex items-center justify-center">
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                    <span className="mr-2">{config.icon}</span>
                    <span>{t.pollutionTypes[type]}</span>
                  </div>
                </DropdownMenuItem>
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
