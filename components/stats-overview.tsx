"use client"

import type { PollutionReport } from "@/types/report"
import { useLanguage } from "@/contexts/language-context"
import { Card } from "@/components/ui/card"

interface StatsOverviewProps {
  reports: PollutionReport[]
}

export function StatsOverview({ reports }: StatsOverviewProps) {
  const { t } = useLanguage()
  const totalReports = reports.length
  const newReports = reports.filter((r) => r.status === "new").length
  const inProgress = reports.filter((r) => r.status === "in-progress").length
  const completed = reports.filter((r) => r.status === "completed").length

  const stats = [
    {
      label: t.totalReports,
      value: totalReports,
      icon: "📊",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      label: t.newReports,
      value: newReports,
      icon: "🆕",
      gradient: "from-teal-500 to-teal-600",
      iconBg: "bg-teal-100",
      textColor: "text-teal-700",
    },
    {
      label: t.inProgress,
      value: inProgress,
      icon: "⚙️",
      gradient: "from-amber-500 to-amber-600",
      iconBg: "bg-amber-100",
      textColor: "text-amber-700",
    },
    {
      label: t.completed,
      value: completed,
      icon: "✅",
      gradient: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-100",
      textColor: "text-emerald-700",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="bg-card border border-border shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div
                  className={`text-3xl sm:text-4xl font-bold mb-1 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
              <div
                className={`${stat.iconBg} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
