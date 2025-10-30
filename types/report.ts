// Типы загрязнений
export type PollutionType =
  | "bio-waste" // Биомусор (тюлени, медузы и т.д.)
  | "plastic" // Пластиковые материалы
  | "glass" // Стеклянные материалы
  | "oil" // Выбросы нефти и мазута
  | "human-trash" // Мусор оставленный людьми
  | "seaweed" // Водоросли и выбросы с моря
  | "other" // Другое

// Статус отчета
export type ReportStatus =
  | "new" // Новый отчет
  | "completed" // Убрано

// Источник отчета
export type ReportSource =
  | "mobile-app" // Мобильное приложение
  | "telegram-bot" // Телеграм бот

// Координаты местоположения
export interface Coordinates {
  latitude: number
  longitude: number
}

// Основная структура отчета о загрязнении
export interface PollutionReport {
  id: string
  pollutionType: PollutionType
  photoUrl: string
  coordinates: Coordinates
  source: ReportSource
  status: ReportStatus
  description?: string
  reportedAt: Date
  reportedBy?: string // ID пользователя или имя
  completedAt?: Date
  assignedTo?: string // ID волонтера
}

// Фильтры для отчетов
export interface ReportFilters {
  pollutionType?: PollutionType[]
  status?: ReportStatus[]
  source?: ReportSource[]
  dateFrom?: Date
  dateTo?: Date
}
