"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GanttTask {
  id: string
  name: string
  startWeek: number
  duration: number
  category: "planning" | "development" | "testing" | "deployment" | "training"
  dependencies?: string[]
}

interface GanttChartProps {
  level: "small" | "medium" | "large"
}

const ganttData = {
  small: {
    title: "小規模投資プラン（4週間）",
    totalWeeks: 4,
    tasks: [
      { id: "req", name: "要件定義", startWeek: 1, duration: 1, category: "planning" as const },
      { id: "env", name: "環境構築", startWeek: 1, duration: 1, category: "development" as const },
      {
        id: "minutes",
        name: "議事録機能開発",
        startWeek: 2,
        duration: 1,
        category: "development" as const,
        dependencies: ["req"],
      },
      {
        id: "faq",
        name: "FAQ機能開発",
        startWeek: 2,
        duration: 1,
        category: "development" as const,
        dependencies: ["env"],
      },
      {
        id: "doc",
        name: "文書支援開発",
        startWeek: 3,
        duration: 1,
        category: "development" as const,
        dependencies: ["minutes"],
      },
      { id: "test", name: "テスト", startWeek: 3, duration: 1, category: "testing" as const, dependencies: ["faq"] },
      {
        id: "deploy",
        name: "デプロイ",
        startWeek: 4,
        duration: 1,
        category: "deployment" as const,
        dependencies: ["test"],
      },
      {
        id: "training",
        name: "研修",
        startWeek: 4,
        duration: 1,
        category: "training" as const,
        dependencies: ["deploy"],
      },
    ],
  },
  medium: {
    title: "中規模投資プラン（8週間）",
    totalWeeks: 8,
    tasks: [
      { id: "req", name: "要件定義", startWeek: 1, duration: 2, category: "planning" as const },
      {
        id: "arch",
        name: "アーキテクチャ設計",
        startWeek: 2,
        duration: 1,
        category: "planning" as const,
        dependencies: ["req"],
      },
      { id: "env", name: "開発環境構築", startWeek: 2, duration: 1, category: "development" as const },
      {
        id: "doc_adv",
        name: "高度文書生成開発",
        startWeek: 3,
        duration: 2,
        category: "development" as const,
        dependencies: ["arch"],
      },
      {
        id: "process",
        name: "プロセス自動化開発",
        startWeek: 3,
        duration: 2,
        category: "development" as const,
        dependencies: ["env"],
      },
      {
        id: "comm",
        name: "コミュニケーション支援",
        startWeek: 5,
        duration: 2,
        category: "development" as const,
        dependencies: ["doc_adv"],
      },
      {
        id: "analytics",
        name: "データ分析機能",
        startWeek: 5,
        duration: 2,
        category: "development" as const,
        dependencies: ["process"],
      },
      {
        id: "integration",
        name: "統合テスト",
        startWeek: 6,
        duration: 2,
        category: "testing" as const,
        dependencies: ["comm"],
      },
      {
        id: "deploy",
        name: "本番デプロイ",
        startWeek: 8,
        duration: 1,
        category: "deployment" as const,
        dependencies: ["integration"],
      },
      {
        id: "training",
        name: "全社研修",
        startWeek: 8,
        duration: 1,
        category: "training" as const,
        dependencies: ["deploy"],
      },
    ],
  },
  large: {
    title: "大規模投資プラン（24週間）",
    totalWeeks: 24,
    tasks: [
      { id: "strategy", name: "戦略策定", startWeek: 1, duration: 3, category: "planning" as const },
      { id: "analysis", name: "業務分析", startWeek: 2, duration: 4, category: "planning" as const },
      {
        id: "arch",
        name: "システム設計",
        startWeek: 4,
        duration: 3,
        category: "planning" as const,
        dependencies: ["strategy"],
      },
      {
        id: "ai_base",
        name: "AI基盤構築",
        startWeek: 6,
        duration: 6,
        category: "development" as const,
        dependencies: ["arch"],
      },
      {
        id: "pipeline",
        name: "データパイプライン",
        startWeek: 8,
        duration: 4,
        category: "development" as const,
        dependencies: ["analysis"],
      },
      {
        id: "business_ai",
        name: "業務最適化AI",
        startWeek: 10,
        duration: 8,
        category: "development" as const,
        dependencies: ["ai_base"],
      },
      {
        id: "decision_ai",
        name: "経営判断AI",
        startWeek: 12,
        duration: 6,
        category: "development" as const,
        dependencies: ["pipeline"],
      },
      {
        id: "customer_ai",
        name: "顧客価値AI",
        startWeek: 14,
        duration: 6,
        category: "development" as const,
        dependencies: ["business_ai"],
      },
      {
        id: "integration",
        name: "システム統合",
        startWeek: 16,
        duration: 4,
        category: "development" as const,
        dependencies: ["decision_ai"],
      },
      {
        id: "custom_ai",
        name: "独自AIモデル",
        startWeek: 18,
        duration: 4,
        category: "development" as const,
        dependencies: ["customer_ai"],
      },
      {
        id: "sys_test",
        name: "システムテスト",
        startWeek: 19,
        duration: 3,
        category: "testing" as const,
        dependencies: ["integration"],
      },
      {
        id: "perf_test",
        name: "性能テスト",
        startWeek: 21,
        duration: 2,
        category: "testing" as const,
        dependencies: ["custom_ai"],
      },
      {
        id: "uat",
        name: "受入テスト",
        startWeek: 22,
        duration: 2,
        category: "testing" as const,
        dependencies: ["sys_test"],
      },
      {
        id: "deploy",
        name: "段階デプロイ",
        startWeek: 23,
        duration: 2,
        category: "deployment" as const,
        dependencies: ["perf_test"],
      },
      {
        id: "training",
        name: "全社研修",
        startWeek: 21,
        duration: 4,
        category: "training" as const,
        dependencies: ["uat"],
      },
    ],
  },
}

const categoryColors = {
  planning: { bg: "bg-[#84E67F]", text: "text-[#333333]", border: "border-[#70CE68]" },
  development: { bg: "bg-[#27AE60]", text: "text-white", border: "border-[#70CE68]" },
  testing: { bg: "bg-[#F9A826]", text: "text-[#333333]", border: "border-[#E74C3C]" },
  deployment: { bg: "bg-[#9B59B6]", text: "text-white", border: "border-[#70CE68]" },
  training: { bg: "bg-[#E74C3C]", text: "text-white", border: "border-[#F9A826]" },
}

const categoryNames = {
  planning: "計画",
  development: "開発",
  testing: "テスト",
  deployment: "デプロイ",
  training: "研修",
}

export default function GanttChart({ level }: GanttChartProps) {
  const project = ganttData[level]
  const weeksPerRow = Math.min(12, project.totalWeeks) // 最大12週間を1行に表示

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg text-[#333333]">{project.title} - ガントチャート</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categoryNames).map(([key, name]) => {
            const colors = categoryColors[key as keyof typeof categoryColors]
            return (
              <Badge key={key} className={`${colors.bg} ${colors.text} ${colors.border}`}>
                {name}
              </Badge>
            )
          })}
        </div>

        {/* Gantt Chart */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Time Header */}
            <div className="grid grid-cols-[200px_1fr] gap-2 mb-2">
              <div className="font-bold text-sm p-2 bg-[#F2F4F4] rounded text-[#333333]">タスク</div>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${project.totalWeeks}, 1fr)` }}>
                {Array.from({ length: project.totalWeeks }, (_, i) => (
                  <div key={i} className="font-bold text-xs p-1 bg-[#F2F4F4] rounded text-center text-[#333333]">
                    W{i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            {project.tasks.map((task, index) => {
              const colors = categoryColors[task.category]
              return (
                <div key={task.id} className="grid grid-cols-[200px_1fr] gap-2 mb-2">
                  <div className="p-2 bg-white border rounded flex items-center">
                    <Badge className={`${colors.bg} ${colors.text} mr-2 text-xs`}>{categoryNames[task.category]}</Badge>
                    <span className="text-sm font-medium text-[#333333]">{task.name}</span>
                  </div>

                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${project.totalWeeks}, 1fr)` }}>
                    {Array.from({ length: project.totalWeeks }, (_, weekIndex) => {
                      const weekNumber = weekIndex + 1
                      const isActive = weekNumber >= task.startWeek && weekNumber < task.startWeek + task.duration
                      const isStart = weekNumber === task.startWeek
                      const isEnd = weekNumber === task.startWeek + task.duration - 1

                      return (
                        <div
                          key={weekIndex}
                          className={`p-1 border rounded text-center text-xs min-h-[32px] flex items-center justify-center ${
                            isActive
                              ? `${colors.bg} ${colors.text} border-2 ${colors.border}`
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          {isActive && (
                            <div className="font-bold">
                              {isStart && isEnd ? "●" : isStart ? "◀" : isEnd ? "▶" : "━"}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-[#84E67F]/10 to-[#27AE60]/10 rounded-lg border border-[#70CE68]/30">
          <h4 className="font-bold text-sm mb-3 text-[#333333]">プロジェクト概要</h4>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-[#27AE60]">{project.totalWeeks}週間</div>
              <div className="text-[#666666]">総期間</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#27AE60]">{project.tasks.length}個</div>
              <div className="text-[#666666]">総タスク数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#27AE60]">
                {Math.max(
                  ...project.tasks.map(
                    (t) =>
                      project.tasks.filter(
                        (other) =>
                          other.startWeek < t.startWeek + t.duration && other.startWeek + other.duration > t.startWeek,
                      ).length,
                  ),
                )}
                個
              </div>
              <div className="text-[#666666]">最大並行タスク</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#27AE60]">
                {Math.round((project.tasks.reduce((sum, task) => sum + task.duration, 0) / project.totalWeeks) * 100)}%
              </div>
              <div className="text-[#666666]">リソース効率</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
