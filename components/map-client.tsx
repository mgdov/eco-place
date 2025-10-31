"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import type { PollutionReport } from "@/types/report"
import { pollutionTypeConfig, statusConfig } from "@/lib/pollution-types"
import { useLanguage } from "@/contexts/language-context"
import "leaflet/dist/leaflet.css"

interface MapClientProps {
    reports: PollutionReport[]
}

// Функция для создания кастомной иконки на основе типа загрязнения
const createCustomIcon = (emoji: string, color: string) => {
    const isNew = color.includes("blue")
    const isInProgress = color.includes("yellow")
    const isCompleted = color.includes("green")

    let bgColor = "#3b82f6" // blue
    if (isInProgress) bgColor = "#eab308" // yellow
    if (isCompleted) bgColor = "#10b981" // green

    return L.divIcon({
        className: "custom-marker",
        html: `
      <div style="
        background-color: ${bgColor};
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          font-size: 20px;
        ">${emoji}</div>
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    })
}

export default function MapClient({ reports }: MapClientProps) {
    const { t } = useLanguage()

    // Центр карты - Каспийское море, район Дагестана
    const center: [number, number] = [42.9849, 47.5047]

    return (
        <div className="w-full h-[350px] sm:h-[500px] rounded-xl overflow-hidden border-2 border-border shadow-lg relative z-0">
            <MapContainer center={center} zoom={10} className="w-full h-full" zoomControl={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {reports.map((report) => {
                    const pollutionConfig = pollutionTypeConfig[report.pollutionType] ?? pollutionTypeConfig["other"]
                    const statusInfo = statusConfig[report.status] ?? statusConfig["new"]

                    return (
                        <Marker
                            key={report.id}
                            position={[report.coordinates.latitude, report.coordinates.longitude]}
                            icon={createCustomIcon(pollutionConfig.icon, statusInfo.color)}
                        >
                            <Popup className="custom-popup" maxWidth={300}>
                                <div className="p-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{pollutionConfig.icon}</span>
                                        <div>
                                            <div className="font-bold text-sm">{t.pollutionTypes[report.pollutionType]}</div>
                                            <div className={`text-xs font-semibold ${statusInfo.color.split(" ")[0]}`}>
                                                {t.statuses[report.status]}
                                            </div>
                                        </div>
                                    </div>

                                    {report.description && (
                                        <p className="text-xs text-gray-700 mb-2 line-clamp-2">{report.description}</p>
                                    )}

                                    <div className="text-xs text-gray-600 space-y-1">
                                        <div className="flex items-center gap-1">
                                            <span>📍</span>
                                            <span className="font-mono">
                                                {report.coordinates.latitude.toFixed(4)}, {report.coordinates.longitude.toFixed(4)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>📅</span>
                                            <span>{new Date(report.reportedAt).toLocaleDateString("ru-RU")}</span>
                                        </div>
                                        {report.reportedBy && (
                                            <div className="flex items-center gap-1">
                                                <span>👤</span>
                                                <span>{report.reportedBy}</span>
                                            </div>
                                        )}
                                    </div>

                                    <a
                                        href={`https://www.google.com/maps?q=${report.coordinates.latitude},${report.coordinates.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                                    >
                                        {t.openOnMap} →
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </div>
    )
}
