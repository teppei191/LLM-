"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  name: string
  duration: string
  startWeek: number
  endWeek: number
  category: "planning" | "development" | "testing" | "deployment" | "training"
}

interface MasterScheduleProps {
  level: "small" | "medium" | "large"
}

const scheduleData = {
  small: {
    title: "小規模投資プラン マスタースケジュール（4週間）",
    totalWeeks: 4,
    tasks: [
      { name: "要件定義・システム設計", duration: "1週間", startWeek: 1, endWeek: 1, category: "planning" as const },
      { name: "開発環境構築", duration: "0.5週間", startWeek: 1, endWeek: 1, category: "development" as const },
      { name: "議事録自動生成機能開発", duration: "1週間", startWeek: 2, endWeek: 2, category: "development" as const },
      { name: "FAQ自動応答機能開発", duration: "1週間", startWeek: 2, endWeek: 2, category: "development" as const },
      { name: "文書作成支援機能開発", duration: "0.5週間", startWeek: 3, endWeek: 3, category: "development" as const },
      { name: "システムテスト", duration: "0.5週間", startWeek: 3, endWeek: 3, category: "testing" as const },
      { name: "ユーザー受入テスト", duration: "0.5週間", startWeek: 3, endWeek: 3, category: "testing" as const },
      { name: "本番環境デプロイ", duration: "0.5週間", startWeek: 4, endWeek: 4, category: "deployment" as const },
      { name: "ユーザー研修", duration: "0.5週間", startWeek: 4, endWeek: 4, category: "training" as const },
      { name: "効果測定・調整", duration: "継続", startWeek: 4, endWeek: 4, category: "testing" as const },
    ],
  },
  medium: {
    title: "中規模投資プラン マスタースケジュール（8週間）",
    totalWeeks: 8,
    tasks: [
      { name: "要件定義・設計", duration: "2週間", startWeek: 1, endWeek: 2, category: "planning" as const },
      { name: "開発環境構築", duration: "1週間", startWeek: 2, endWeek: 2, category: "development" as const },
      { name: "AI機能開発", duration: "3週間", startWeek: 3, endWeek: 5, category: "development" as const },
      { name: "システム統合", duration: "2週間", startWeek: 6, endWeek: 7, category: "development" as const },
      { name: "テスト・検証", duration: "1週間", startWeek: 7, endWeek: 7, category: "testing" as const },
      { name: "本番デプロイ", duration: "1週間", startWeek: 8, endWeek: 8, category: "deployment" as const },
      { name: "研修・運用開始", duration: "1週間", startWeek: 8, endWeek: 8, category: "training" as const },
    ],
  },
  large: {
    title: "大規模投資プラン マスタースケジュール（24週間）",
    totalWeeks: 24,
    tasks: [
      {
        name: "戦略策定・ロードマップ作成",
        duration: "2週間",
        startWeek: 1,
        endWeek: 2,
        category: "planning" as const,
      },
      { name: "詳細要件定義・業務分析", duration: "3週間", startWeek: 2, endWeek: 4, category: "planning" as const },
      {
        name: "システムアーキテクチャ設計",
        duration: "2週間",
        startWeek: 4,
        endWeek: 5,
        category: "planning" as const,
      },
      { name: "AI基盤システム構築", duration: "4週間", startWeek: 6, endWeek: 9, category: "development" as const },
      {
        name: "データパイプライン構築",
        duration: "3週間",
        startWeek: 8,
        endWeek: 10,
        category: "development" as const,
      },
      { name: "業務最適化AI開発", duration: "6週間", startWeek: 10, endWeek: 15, category: "development" as const },
      { name: "経営判断支援AI開発", duration: "4週間", startWeek: 12, endWeek: 15, category: "development" as const },
      { name: "顧客価値創造AI開発", duration: "4週間", startWeek: 14, endWeek: 17, category: "development" as const },
      { name: "各部門システム統合", duration: "3週間", startWeek: 16, endWeek: 18, category: "development" as const },
      { name: "独自AIモデル開発", duration: "4週間", startWeek: 18, endWeek: 21, category: "development" as const },
      { name: "システム統合テスト", duration: "2週間", startWeek: 19, endWeek: 20, category: "testing" as const },
      {
        name: "パフォーマンス・負荷テスト",
        duration: "1週間",
        startWeek: 21,
        endWeek: 21,
        category: "testing" as const,
      },
      { name: "セキュリティテスト", duration: "1週間", startWeek: 21, endWeek: 21, category: "testing" as const },
      { name: "ユーザー受入テスト", duration: "2週間", startWeek: 22, endWeek: 23, category: "testing" as const },
      { name: "段階的本番デプロイ", duration: "2週間", startWeek: 23, endWeek: 24, category: "deployment" as const },
      {
        name: "全社研修・チェンジマネジメント",
        duration: "4週間",
        startWeek: 21,
        endWeek: 24,
        category: "training" as const,
      },
      { name: "効果測定・継続改善", duration: "継続", startWeek: 24, endWeek: 24, category: "testing" as const },
    ],
  },
}

const categoryColors = {
  planning: "bg-[#84E67F] text-[#333333] border-[#70CE68]",
  development: "bg-[#27AE60] text-white border-[#70CE68]",
  testing: "bg-[#F9A826] text-[#333333] border-[#E74C3C]",
  deployment: "bg-[#9B59B6] text-white border-[#70CE68]",
  training: "bg-[#E74C3C] text-white border-[#F9A826]",
}

const categoryNames = {
  planning: "計画",
  development: "開発",
  testing: "テスト",
  deployment: "デプロイ",
  training: "研修",
}

export default function MasterSchedule({ level }: MasterScheduleProps) {
  const schedule = scheduleData[level]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{schedule.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(categoryNames).map(([key, name]) => (
            <Badge key={key} variant="outline" className={categoryColors[key as keyof typeof categoryColors]}>
              {name}
            </Badge>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div
              className="grid grid-cols-[300px_repeat(var(--weeks),1fr)] gap-1 mb-2"
              style={{ "--weeks": schedule.totalWeeks } as any}
            >
              <div className="font-bold text-sm p-2 bg-gray-100 rounded">タスク名</div>
              {Array.from({ length: schedule.totalWeeks }, (_, i) => (
                <div key={i} className="font-bold text-xs p-2 bg-gray-100 rounded text-center">
                  W{i + 1}
                </div>
              ))}
            </div>

            {/* Tasks */}
            {schedule.tasks.map((task, index) => (
              <div
                key={index}
                className="grid grid-cols-[300px_repeat(var(--weeks),1fr)] gap-1 mb-1"
                style={{ "--weeks": schedule.totalWeeks } as any}
              >
                <div className="p-2 bg-white border rounded flex items-center">
                  <Badge variant="outline" className={`${categoryColors[task.category]} mr-2 text-xs`}>
                    {categoryNames[task.category]}
                  </Badge>
                  <span className="text-sm font-medium">{task.name}</span>
                </div>
                {Array.from({ length: schedule.totalWeeks }, (_, weekIndex) => {
                  const weekNumber = weekIndex + 1
                  const isActive = weekNumber >= task.startWeek && weekNumber <= task.endWeek
                  const isStart = weekNumber === task.startWeek
                  const isEnd = weekNumber === task.endWeek

                  return (
                    <div
                      key={weekIndex}
                      className={`p-1 border rounded text-center text-xs ${
                        isActive ? `${categoryColors[task.category]} border-2` : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {isActive && (
                        <div className="h-4 flex items-center justify-center">
                          {level === "medium" ? (
                            // 中規模プランでは記号なし、シンプルなバー表示
                            <div className="w-full h-2 bg-current rounded"></div>
                          ) : (
                            // 小規模・大規模プランでは従来の記号表示
                            <span>{isStart && isEnd ? "●" : isStart ? "◀" : isEnd ? "▶" : "━"}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-bold text-sm mb-2">プロジェクト概要</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">総期間:</span> {schedule.totalWeeks}週間
            </div>
            <div>
              <span className="font-medium">総タスク数:</span> {schedule.tasks.length}個
            </div>
            <div>
              <span className="font-medium">並行作業:</span> 最大3タスク
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
