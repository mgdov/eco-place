import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"
import "leaflet/dist/leaflet.css"
import "./globals.css"

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  title: "Eco-Place | Панель волонтера",
  description: "Система мониторинга загрязнений побережья Каспийского моря",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${notoSans.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
