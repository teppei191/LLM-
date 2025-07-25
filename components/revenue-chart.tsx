"use client"

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
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface CompanyProfile {
  industry: string
  employees: string
  revenue: string
}

interface RevenueChartProps {
  companyProfile: CompanyProfile
}

export default function RevenueChart({ companyProfile }: RevenueChartProps) {
  // Get base revenue based on company profile
  let baseRevenue = 850 // Default in 万円
  if (companyProfile.revenue === "under500") baseRevenue = 350
  else if (companyProfile.revenue === "500-1000") baseRevenue = 750
  else if (companyProfile.revenue === "1000-5000") baseRevenue = 2500
  else if (companyProfile.revenue === "over5000") baseRevenue = 7500

  const data = {
    labels: ["現在", "1年後", "2年後", "3年後"],
    datasets: [
      {
        label: "AI導入実施",
        data: [baseRevenue, baseRevenue * 1.18, baseRevenue * 1.41, baseRevenue * 1.76],
        borderColor: "#27AE60",
        backgroundColor: "#27AE60",
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: "AI未導入",
        data: [baseRevenue, baseRevenue * 1.0, baseRevenue * 0.94, baseRevenue * 0.88],
        borderColor: "#E74C3C",
        backgroundColor: "#E74C3C",
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 2,
    plugins: {
      title: {
        display: true,
        text: "収益成長予測（万円）",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${Math.round(context.parsed.y).toLocaleString()}万円`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "年商（万円）",
        },
        ticks: {
          callback: (value: any) => `${Math.round(value).toLocaleString()}万円`,
        },
      },
      x: {
        title: {
          display: true,
          text: "期間",
        },
      },
    },
  }

  return <Line data={data} options={options} />
}
