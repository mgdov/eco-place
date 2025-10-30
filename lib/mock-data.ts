import type { PollutionReport } from "@/types/report"

// Моковые данные для демонстрации
// В продакшене эти данные будут приходить с бэкенда через API
export const mockReports: PollutionReport[] = [
  {
    id: "1",
    pollutionType: "plastic",
    photoUrl: "/plastic-waste-on-beach.jpg",
    coordinates: {
      latitude: 42.9849,
      longitude: 47.5047,
    },
    source: "mobile-app",
    status: "new",
    description: "Большое скопление пластиковых бутылок и пакетов на берегу",
    reportedAt: new Date("2025-01-28T10:30:00"),
    reportedBy: "Пользователь #1234",
  },
  {
    id: "2",
    pollutionType: "oil",
    photoUrl: "/oil-spill-on-water.jpg",
    coordinates: {
      latitude: 43.0234,
      longitude: 47.4789,
    },
    source: "telegram-bot",
    status: "new",
    description: "Нефтяное пятно на поверхности воды у берега",
    reportedAt: new Date("2025-01-28T09:15:00"),
    reportedBy: "@telegram_user",
  },
  {
    id: "3",
    pollutionType: "bio-waste",
    photoUrl: "/dead-seal-on-beach.jpg",
    coordinates: {
      latitude: 42.9165,
      longitude: 47.5121,
    },
    source: "mobile-app",
    status: "new",
    description: "Туша тюленя на берегу, требуется утилизация",
    reportedAt: new Date("2025-01-27T16:45:00"),
    reportedBy: "Пользователь #5678",
  },
  {
    id: "4",
    pollutionType: "human-trash",
    photoUrl: "/trash-and-garbage-on-beach.jpg",
    coordinates: {
      latitude: 43.0023,
      longitude: 47.4955,
    },
    source: "telegram-bot",
    status: "new",
    description: "Мусор после пикника - бутылки, упаковки, окурки",
    reportedAt: new Date("2025-01-26T14:20:00"),
    reportedBy: "@eco_activist",
  },
  {
    id: "5",
    pollutionType: "glass",
    photoUrl: "/broken-glass-bottles-on-sand.jpg",
    coordinates: {
      latitude: 42.9450,
      longitude: 47.5180,
    },
    source: "mobile-app",
    status: "new",
    description: "Разбитые стеклянные бутылки, опасно для людей и животных",
    reportedAt: new Date("2025-01-28T08:00:00"),
    reportedBy: "Пользователь #9012",
  },
  {
    id: "6",
    pollutionType: "seaweed",
    photoUrl: "/seaweed-washed-up-on-shore.jpg",
    coordinates: {
      latitude: 42.9650,
      longitude: 47.5020,
    },
    source: "telegram-bot",
    status: "new",
    description: "Большое количество водорослей выброшено на берег",
    reportedAt: new Date("2025-01-28T07:30:00"),
    reportedBy: "@beach_patrol",
  },
]

// Функция для получения всех отчетов (заглушка для API)
export async function fetchReports(): Promise<PollutionReport[]> {
  // TODO: Заменить на реальный API запрос
  // Пример: const response = await fetch('/api/reports');
  // return response.json();

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReports), 500)
  })
}

// Функция для обновления статуса отчета (заглушка для API)
export async function updateReportStatus(reportId: string, status: PollutionReport["status"]): Promise<void> {
  // TODO: Заменить на реальный API запрос
  // Пример: await fetch(`/api/reports/${reportId}`, {
  //   method: 'PATCH',
  //   body: JSON.stringify({ status })
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Обновлен статус отчета ${reportId} на ${status}`)
      resolve()
    }, 300)
  })
}
