"use client"

import { useEffect, useRef } from "react"

interface RadarChartProps {
  data: number[]
  color: string
  title: string
}

export default function HighResRadarChart({ data, color, title }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 固定サイズで安定化
    const size = 350
    canvas.width = size
    canvas.height = size
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 80 // マージンを大きく取る

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Enable anti-aliasing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    // Labels - 重複を避けるため位置を調整
    const labels = ["組織体制", "技術スキル", "投資予算", "業務課題", "戦略方針"]
    const angleStep = (2 * Math.PI) / labels.length

    // Validate and normalize data
    const normalizedData = data.map((value) => {
      if (typeof value !== "number" || isNaN(value)) return 0
      return Math.max(0, Math.min(100, value))
    })

    // Ensure we have 5 data points
    while (normalizedData.length < 5) {
      normalizedData.push(0)
    }

    // Draw grid circles
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw grid lines
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1
    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw labels - 重複を避けるため位置を慎重に計算
    ctx.fillStyle = "#1f2937"
    ctx.font = "bold 14px system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    for (let i = 0; i < labels.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const labelRadius = radius + 40 // ラベル位置をさらに外側に
      let x = centerX + Math.cos(angle) * labelRadius
      let y = centerY + Math.sin(angle) * labelRadius

      // 位置調整 - 重複を避ける
      if (i === 0) {
        // 組織体制 (上)
        y -= 5
      } else if (i === 1) {
        // 技術スキル (右上)
        x += 10
        y -= 5
      } else if (i === 2) {
        // 投資予算 (右下)
        x += 10
        y += 5
      } else if (i === 3) {
        // 業務課題 (左下)
        x -= 10
        y += 5
      } else if (i === 4) {
        // 戦略方針 (左上)
        x -= 10
        y -= 5
      }

      // テキストを描画
      ctx.fillStyle = "#1f2937"
      ctx.fillText(labels[i], x, y)
    }

    // Draw data polygon if we have valid data
    if (normalizedData.some((val) => val > 0)) {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, color + "60")
      gradient.addColorStop(1, color + "20")

      ctx.strokeStyle = color
      ctx.fillStyle = gradient
      ctx.lineWidth = 3
      ctx.lineJoin = "round"
      ctx.lineCap = "round"

      ctx.beginPath()
      for (let i = 0; i < normalizedData.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = normalizedData[i]
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
      for (let i = 0; i < normalizedData.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = normalizedData[i]
        const dataRadius = (radius * value) / 100
        const x = centerX + Math.cos(angle) * dataRadius
        const y = centerY + Math.sin(angle) * dataRadius

        ctx.beginPath()
        ctx.arc(x, y, 5, 0, 2 * Math.PI)
        ctx.fill()

        // Add value labels - 重複を避けるため位置調整
        ctx.fillStyle = "#1f2937"
        ctx.font = "bold 12px system-ui"
        ctx.textAlign = "center"

        // ラベル位置を調整
        let labelX = x
        let labelY = y - 15

        // 中心に近い場合は外側に表示
        if (dataRadius < radius * 0.3) {
          const labelAngle = angle
          labelX = centerX + Math.cos(labelAngle) * (radius * 0.4)
          labelY = centerY + Math.sin(labelAngle) * (radius * 0.4) - 10
        }

        ctx.fillText(Math.round(value).toString(), labelX, labelY)
        ctx.fillStyle = color
      }
    }

    // Draw scale labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px system-ui, -apple-system, sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    for (let i = 1; i <= 5; i++) {
      const scaleRadius = (radius * i) / 5
      const value = (i * 20).toString()

      ctx.fillStyle = "#6b7280"
      ctx.fillText(value, centerX + 7, centerY - scaleRadius)
    }

    // Draw center point
    ctx.fillStyle = "#374151"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
    ctx.fill()

    // Add title
    ctx.fillStyle = "#1f2937"
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(title, centerX, 20)
  }, [data, color, title])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  )
}
