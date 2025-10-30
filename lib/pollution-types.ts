import type { PollutionType } from "@/types/report"

// Конфигурация типов загрязнений для UI
export const pollutionTypeConfig: Record<
  PollutionType,
  {
    label: string
    color: string
    icon: string
  }
> = {
  "bio-waste": {
    label: "Биомусор",
    color: "bg-amber-500 text-white border-amber-600",
    icon: "🦭",
  },
  plastic: {
    label: "Пластик",
    color: "bg-red-500 text-white border-red-600",
    icon: "🥤",
  },
  glass: {
    label: "Стекло",
    color: "bg-purple-500 text-white border-purple-600",
    icon: "🍾",
  },
  oil: {
    label: "Нефть/Мазут",
    color: "bg-gray-800 text-white border-gray-900",
    icon: "🛢️",
  },
  "human-trash": {
    label: "Бытовой мусор",
    color: "bg-orange-500 text-white border-orange-600",
    icon: "🗑️",
  },
  seaweed: {
    label: "Водоросли",
    color: "bg-emerald-500 text-white border-emerald-600",
    icon: "🌊",
  },
  other: {
    label: "Другое",
    color: "bg-slate-500 text-white border-slate-600",
    icon: "❓",
  },
}

// Конфигурация статусов для UI
export const statusConfig = {
  new: {
    label: "Новый",
    color: "bg-blue-500 text-white border-blue-600",
  },
  completed: {
    label: "Выполнено",
    color: "bg-green-500 text-white border-green-600",
  },
}

// Конфигурация источников для UI
export const sourceConfig = {
  "mobile-app": {
    label: "Мобильное приложение",
    icon: "📱",
  },
  "telegram-bot": {
    label: "Telegram бот",
    icon: "✈️",
  },
}
