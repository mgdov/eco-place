import type { PollutionReport } from "@/types/report"

// Моковые данные для демонстрации
// В продакшене эти данные будут приходить с бэкенда через API
export const mockReports: PollutionReport[] = []

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
