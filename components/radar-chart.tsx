"use client"

import { useEffect, useRef } from "react"

interface RadarChartProps {
  data: number[]
  color: string
  title: string
}

export default function RadarChart({ data, color, title }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas setup
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Labels
    const labels = ["組織体制", "技術スキル", "投資予算", "業務課題", "戦略方針"]
    const angleStep = (2 * Math.PI) / labels.length

    // Draw grid circles
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = "#374151"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const labelRadius = radius + 20
      const x = centerX + Math.cos(angle) * labelRadius
      const y = centerY + Math.sin(angle) * labelRadius

      ctx.fillText(labels[i], x, y)
    }

    // Draw data polygon
    ctx.strokeStyle = color
    ctx.fillStyle = color + "33" // Add transparency
    ctx.lineWidth = 2

    ctx.beginPath()
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = Math.max(0, Math.min(100, data[i])) // Clamp between 0-100
      const dataRadius = (radius * value) / 100
      const x = centerX + Math.cos(angle) * dataRadius
      const y = centerY + Math.sin(angle) * dataRadius

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = color
    for (let i = 0; i < data.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = Math.max(0, Math.min(100, data[i]))
      const dataRadius = (radius * value) / 100
      const x = centerX + Math.cos(angle) * dataRadius
      const y = centerY + Math.sin(angle) * dataRadius

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Draw scale labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    for (let i = 1; i <= 5; i++) {
      const scaleRadius = (radius * i) / 5
      const value = (i * 20).toString()
      ctx.fillText(value, centerX + 5, centerY - scaleRadius)
    }
  }, [data, color])

  return <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
}
