"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface CompanyProfile {
  industry: string
  employees: string
  revenue: string
}

interface RevenueChartProps {
  companyProfile: CompanyProfile
}

export default function RevenueChartWithGap({ companyProfile }: RevenueChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-gray-500">チャートを読み込み中...</div>
      </div>
    )
  }

  // Get base revenue based on company profile - デフォルト値を確実に設定
  let baseRevenue = 850 // Default in 万円
  try {
    if (companyProfile?.revenue === "under500") baseRevenue = 350
    else if (companyProfile?.revenue === "500-1000") baseRevenue = 750
    else if (companyProfile?.revenue === "1000-5000") baseRevenue = 2500
    else if (companyProfile?.revenue === "over5000") baseRevenue = 7500
  } catch (error) {
    console.warn("Revenue calculation error, using default:", error)
    baseRevenue = 850
  }

  const aiImplementedData = [
    baseRevenue,
    Math.round(baseRevenue * 1.18),
    Math.round(baseRevenue * 1.41),
    Math.round(baseRevenue * 1.76),
  ]
  const aiNotImplementedData = [
    baseRevenue,
    Math.round(baseRevenue * 1.0),
    Math.round(baseRevenue * 0.94),
    Math.round(baseRevenue * 0.88),
  ]

  const data = {
    labels: ["現在", "1年後", "2年後", "3年後"],
    datasets: [
      {
        label: "AI導入実施",
        data: aiImplementedData,
        borderColor: "#27AE60",
        backgroundColor: "#27AE60",
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false,
      },
      {
        label: "AI未導入",
        data: aiNotImplementedData,
        borderColor: "#E74C3C",
        backgroundColor: "#E74C3C",
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false,
      },
      {
        label: "機会損失エリア",
        data: aiImplementedData,
        borderColor: "transparent",
        backgroundColor: "rgba(231, 76, 60, 0.1)",
        fill: "+1",
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
      },
      {
        label: "AI未導入（下限）",
        data: aiNotImplementedData,
        borderColor: "transparent",
        backgroundColor: "transparent",
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    plugins: {
      title: {
        display: true,
        text: "収益成長予測（万円）",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        color: "#333333",
      },
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "#333333",
          filter: (legendItem: any) => legendItem.text !== "機会損失エリア" && legendItem.text !== "AI未導入（下限）",
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.datasetIndex < 2) {
              return `${context.dataset.label}: ${Math.round(context.parsed.y).toLocaleString()}万円`
            }
            return null
          },
          afterBody: (tooltipItems: any) => {
            if (tooltipItems && tooltipItems.length > 0) {
              const index = tooltipItems[0].dataIndex
              const gap = aiImplementedData[index] - aiNotImplementedData[index]
              if (gap > 0) {
                return [`機会損失: ${Math.round(gap).toLocaleString()}万円`]
              }
            }
            return []
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "年商（万円）",
          color: "#333333",
        },
        ticks: {
          color: "#333333",
          callback: (value: any) => `${Math.round(value).toLocaleString()}万円`,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        title: {
          display: true,
          text: "期間",
          color: "#333333",
        },
        ticks: {
          color: "#333333",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  }

  return (
    <div className="relative">
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-[#E74C3C]">
        <h4 className="font-bold text-[#333333] mb-2">機会損失分析</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-sm">
          {aiImplementedData.map((implemented, index) => {
            const notImplemented = aiNotImplementedData[index]
            const gap = implemented - notImplemented
            const labels = ["現在", "1年後", "2年後", "3年後"]

            return (
              <div key={index} className="text-center p-2 bg-white/50 rounded">
                <div className="font-medium text-[#333333] text-xs md:text-sm">{labels[index]}</div>
                <div className="text-base md:text-lg font-bold text-[#E74C3C]">
                  {gap > 0 ? `+${Math.round(gap).toLocaleString()}万円` : "±0万円"}
                </div>
                <div className="text-xs text-[#333333]">{gap > 0 ? "機会損失" : "差なし"}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
