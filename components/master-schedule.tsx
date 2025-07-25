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
    title: "実装スケジュール（4週間）",
    phases: [
      { name: "Week 1", tasks: ["要件整理", "システム設定"], status: "ready" },
      { name: "Week 2", tasks: ["機能開発", "テスト導入"], status: "ready" },
      { name: "Week 3", tasks: ["調整・検証", "ユーザーテスト"], status: "ready" },
      { name: "Week 4", tasks: ["本格運用", "効果測定"], status: "ready" },
    ],
  },
  medium: {
    title: "実装スケジュール（8週間）",
    phases: [
      { name: "Month 1前半", tasks: ["要件定義", "基盤構築"], status: "ready" },
      { name: "Month 1後半", tasks: ["AI機能開発", "データ連携"], status: "ready" },
      { name: "Month 2前半", tasks: ["システム統合", "テスト実施"], status: "ready" },
      { name: "Month 2後半", tasks: ["本格稼働", "運用開始"], status: "ready" },
    ],
  },
  large: {
    title: "実装スケジュール（6ヶ月）",
    phases: [
      { name: "Month 1-2", tasks: ["AI基盤構築", "戦略策定"], status: "ready" },
      { name: "Month 3-4", tasks: ["各部門統合", "機能開発"], status: "ready" },
      { name: "Month 5-6", tasks: ["AIモデル開発", "検証・運用"], status: "ready" },
    ],
  },
}


export default function MasterSchedule({ level }: MasterScheduleProps) {
  const schedule = scheduleData[level]

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
      <h4 className="font-bold text-[#333333] mb-4 flex items-center">
        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-2"></div>
        {schedule.title}
      </h4>
      <div className="space-y-3">
        {schedule.phases.map((phase, index) => (
          <div key={index} className="flex items-center p-3 bg-white/70 rounded-lg border border-white/50">
            <div className="flex-shrink-0 w-20 text-sm font-bold text-[#333333]">
              {phase.name}
            </div>
            <div className="flex-1 ml-4">
              <div className="flex flex-wrap gap-2">
                {phase.tasks.map((task, taskIndex) => (
                  <Badge 
                    key={taskIndex} 
                    variant="outline" 
                    className="bg-blue-100 text-blue-800 border-blue-200 text-xs"
                  >
                    {task}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-white/50 rounded-lg">
        <div className="text-xs text-[#666666] text-center">
          📋 段階的な実装でリスクを最小化し、確実な成果を実現
        </div>
      </div>
    </div>
  )
}
