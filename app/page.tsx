"use client"

import { useState } from "react"
import {
  Building,
  BarChartIcon as ChartBar,
  ClipboardCheck,
  Radar,
  AlertTriangle,
  TrendingUp,
  RouteIcon as Road,
  FlaskRoundIcon as Flask,
  Settings,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import "chart.js/auto"
import MasterSchedule from "@/components/master-schedule"
import IndustryRanking from "@/components/industry-ranking"
import RevenueChartWithGap from "@/components/revenue-chart-with-gap"
import HighResRadarChart from "@/components/high-res-radar-chart"
import GanttChart from "@/components/gantt-chart"

interface CompanyProfile {
  industry: string
  employees: string
  revenue: string
}

interface QuestionOption {
  text: string
  internal: number
  poc: number
  education: number
}

interface Question {
  id: number
  category: string
  question: string
  options: QuestionOption[]
}

const questions: Question[] = [
  {
    id: 1,
    category: "組織・体制",
    question: "現在、会社の重要な判断はどのように決めていますか？",
    options: [
      { text: "社長が直接決める", internal: 3, poc: 4, education: 2 },
      { text: "部門長が相談して決める", internal: 4, poc: 3, education: 3 },
      { text: "現場の担当者がそれぞれ判断", internal: 2, poc: 3, education: 4 },
      { text: "外部の専門家に相談して決める", internal: 2, poc: 4, education: 3 },
    ],
  },
  {
    id: 2,
    category: "組織・体制",
    question: "人手不足で困っている業務はありますか？",
    options: [
      { text: "とても困っている（慢性的な人手不足）", internal: 4, poc: 4, education: 3 },
      { text: "やや困っている（繁忙期に不足）", internal: 3, poc: 4, education: 3 },
      { text: "特に困っていない", internal: 2, poc: 2, education: 2 },
      { text: "人は足りているが効率が悪い", internal: 3, poc: 4, education: 4 },
    ],
  },
  {
    id: 3,
    category: "組織・体制",
    question: "新しい仕組みを導入する時、従業員の反応は？",
    options: [
      { text: "積極的に取り組む", internal: 4, poc: 3, education: 3 },
      { text: "説明があれば理解してくれる", internal: 3, poc: 4, education: 4 },
      { text: "時間をかけて慣れていく", internal: 2, poc: 3, education: 4 },
      { text: "変化を嫌がる傾向がある", internal: 2, poc: 2, education: 4 },
    ],
  },
  {
    id: 4,
    category: "組織・体制",
    question: "社内の情報共有はどのように行っていますか？",
    options: [
      { text: "システムを使って効率的に", internal: 4, poc: 3, education: 2 },
      { text: "メールや会議で定期的に", internal: 3, poc: 4, education: 3 },
      { text: "必要な時に口頭で", internal: 2, poc: 3, education: 4 },
      { text: "あまり共有できていない", internal: 2, poc: 4, education: 4 },
    ],
  },
  {
    id: 5,
    category: "組織・体制",
    question: "会議や打ち合わせについて、最も困っていることは？",
    options: [
      { text: "議事録作成に毎回1-2時間かかる", internal: 3, poc: 4, education: 3 },
      { text: "決定事項が関係者に正確に伝わらない", internal: 3, poc: 4, education: 4 },
      { text: "会議の内容を後で思い出せない", internal: 2, poc: 4, education: 3 },
      { text: "アクションアイテムの管理が曖昧", internal: 3, poc: 4, education: 3 },
    ],
  },
  {
    id: 6,
    category: "技術・スキル",
    question: "パソコンやデジタル機器について、従業員のスキルは？",
    options: [
      { text: "みんな得意で、新しいツールもすぐ覚える", internal: 4, poc: 3, education: 2 },
      { text: "基本的な操作はできる", internal: 3, poc: 4, education: 3 },
      { text: "必要最小限の操作のみ", internal: 2, poc: 3, education: 4 },
      { text: "苦手な人が多い", internal: 2, poc: 2, education: 4 },
    ],
  },
  {
    id: 7,
    category: "技術・スキル",
    question: "データの管理・活用について、現在の状況は？",
    options: [
      { text: "システムでしっかり管理・分析している", internal: 4, poc: 3, education: 2 },
      { text: "基本的なデータは管理している", internal: 3, poc: 4, education: 3 },
      { text: "エクセルで管理している", internal: 2, poc: 4, education: 3 },
      { text: "ほとんど管理できていない", internal: 2, poc: 3, education: 4 },
    ],
  },
  {
    id: 8,
    category: "技術・スキル",
    question: "社内の報告・連絡・相談（ホウレンソウ）で困っていることは？",
    options: [
      { text: "口頭での報告が多く、記録が残らない", internal: 3, poc: 4, education: 4 },
      { text: "同じ質問を何度も受ける", internal: 3, poc: 4, education: 3 },
      { text: "情報が特定の人に集中してしまう", internal: 3, poc: 3, education: 4 },
      { text: "緊急度・重要度の判断が人によって違う", internal: 2, poc: 4, education: 4 },
    ],
  },
  {
    id: 9,
    category: "技術・スキル",
    question: "業務の標準化について、現在の状況は？",
    options: [
      { text: "ほとんどの業務が標準化されている", internal: 4, poc: 3, education: 2 },
      { text: "主要な業務は標準化されている", internal: 3, poc: 4, education: 3 },
      { text: "一部は標準化されている", internal: 2, poc: 4, education: 4 },
      { text: "ほとんど個人のやり方に任せている", internal: 2, poc: 3, education: 4 },
    ],
  },
  {
    id: 10,
    category: "技術・スキル",
    question: "新しい技術や知識の習得について、どう考えますか？",
    options: [
      { text: "積極的に取り入れて競争力を高めたい", internal: 4, poc: 3, education: 3 },
      { text: "必要に応じて少しずつ取り入れたい", internal: 3, poc: 4, education: 4 },
      { text: "従業員のスキルアップから始めたい", internal: 2, poc: 3, education: 4 },
      { text: "現状維持で十分", internal: 2, poc: 2, education: 2 },
    ],
  },
  {
    id: 11,
    category: "投資・予算",
    question: "業務改善のための投資についてどう考えますか？",
    options: [
      { text: "効果が確実なら大きく投資したい", internal: 4, poc: 3, education: 3 },
      { text: "小さく始めて効果を確認してから拡大", internal: 3, poc: 4, education: 3 },
      { text: "なるべく費用をかけずに改善したい", internal: 2, poc: 3, education: 4 },
      { text: "投資は慎重に検討したい", internal: 2, poc: 4, education: 3 },
    ],
  },
  {
    id: 12,
    category: "投資・予算",
    question: "新しい仕組みの導入で重視することは？",
    options: [
      { text: "長期的な競争力強化", internal: 4, poc: 2, education: 3 },
      { text: "短期間での効果実感", internal: 2, poc: 4, education: 2 },
      { text: "従業員のスキルアップ", internal: 3, poc: 3, education: 4 },
      { text: "失敗リスクの最小化", internal: 2, poc: 4, education: 3 },
    ],
  },
  {
    id: 13,
    category: "投資・予算",
    question: "IT関連の投資について、これまでの経験は？",
    options: [
      { text: "投資して大きな効果があった", internal: 4, poc: 3, education: 2 },
      { text: "投資して一定の効果があった", internal: 3, poc: 4, education: 3 },
      { text: "投資したが効果が不明確だった", internal: 2, poc: 4, education: 4 },
      { text: "ほとんど投資していない", internal: 2, poc: 3, education: 4 },
    ],
  },
  {
    id: 14,
    category: "投資・予算",
    question: "投資の判断をする時、最も重視する要素は？",
    options: [
      { text: "将来的な成長性", internal: 4, poc: 2, education: 3 },
      { text: "具体的な数値効果", internal: 3, poc: 4, education: 2 },
      { text: "従業員の成長・満足度", internal: 3, poc: 3, education: 4 },
      { text: "導入のしやすさ", internal: 2, poc: 4, education: 3 },
    ],
  },
  {
    id: 15,
    category: "投資・予算",
    question: "予算の規模感として、年間どの程度なら投資できますか？",
    options: [
      { text: "1000万円以上", internal: 4, poc: 3, education: 3 },
      { text: "500万円-1000万円", internal: 4, poc: 4, education: 3 },
      { text: "100万円-500万円", internal: 3, poc: 4, education: 4 },
      { text: "100万円未満", internal: 2, poc: 3, education: 4 },
    ],
  },
  {
    id: 16,
    category: "業務課題",
    question: "毎日の事務作業で最も時間がかかるのは？",
    options: [
      { text: "書類作成・整理", internal: 3, poc: 4, education: 3 },
      { text: "電話・メール対応", internal: 3, poc: 4, education: 3 },
      { text: "売上や在庫の管理・集計", internal: 4, poc: 4, education: 2 },
      { text: "報告書やレポート作成", internal: 3, poc: 4, education: 3 },
    ],
  },
  {
    id: 17,
    category: "業務課題",
    question: "お客様対応で改善したいことは？",
    options: [
      { text: "問い合わせへの返答を早くしたい", internal: 3, poc: 4, education: 3 },
      { text: "サービス品質を安定させたい", internal: 4, poc: 3, education: 4 },
      { text: "顧客情報をもっと活用したい", internal: 4, poc: 3, education: 3 },
      { text: "クレーム対応を効率化したい", internal: 3, poc: 4, education: 4 },
    ],
  },
  {
    id: 18,
    category: "業務課題",
    question: "人材に関する課題で最も深刻なのは？",
    options: [
      { text: "経験豊富な人の技術が属人化している", internal: 4, poc: 3, education: 4 },
      { text: "新人の教育に時間がかかる", internal: 3, poc: 3, education: 4 },
      { text: "業務の引き継ぎがうまくいかない", internal: 3, poc: 4, education: 4 },
      { text: "人材確保が困難", internal: 3, poc: 4, education: 3 },
    ],
  },
  {
    id: 19,
    category: "業務課題",
    question: "品質管理について、現在の課題は？",
    options: [
      { text: "品質基準が属人的で統一されていない", internal: 4, poc: 3, education: 4 },
      { text: "チェック工程に時間がかかりすぎる", internal: 3, poc: 4, education: 3 },
      { text: "ミスの原因分析が十分できていない", internal: 3, poc: 4, education: 4 },
      { text: "特に大きな問題はない", internal: 2, poc: 2, education: 2 },
    ],
  },
  {
    id: 20,
    category: "業務課題",
    question: "競合他社と比べて、最も改善が必要だと感じる点は？",
    options: [
      { text: "サービス・製品の差別化", internal: 4, poc: 3, education: 3 },
      { text: "業務のスピード・効率性", internal: 3, poc: 4, education: 3 },
      { text: "従業員のスキル・知識", internal: 3, poc: 3, education: 4 },
      { text: "顧客満足度", internal: 3, poc: 4, education: 4 },
    ],
  },
  {
    id: 21,
    category: "戦略・方針",
    question: "会社の将来について、どのような方針をお持ちですか？",
    options: [
      { text: "独自性を活かして競争優位を築きたい", internal: 4, poc: 3, education: 3 },
      { text: "着実に業務改善を進めて成長したい", internal: 3, poc: 4, education: 3 },
      { text: "従業員と共に持続的に発展したい", internal: 3, poc: 3, education: 4 },
      { text: "安定した経営を維持したい", internal: 2, poc: 3, education: 3 },
    ],
  },
  {
    id: 22,
    category: "戦略・方針",
    question: "新しい技術導入に対する考えは？",
    options: [
      { text: "競争力の核として積極的に取り入れたい", internal: 4, poc: 3, education: 2 },
      { text: "効果を確認しながら段階的に導入したい", internal: 3, poc: 4, education: 3 },
      { text: "従業員が理解してから導入したい", internal: 2, poc: 3, education: 4 },
      { text: "必要最小限に留めたい", internal: 2, poc: 2, education: 3 },
    ],
  },
  {
    id: 23,
    category: "戦略・方針",
    question: "5年後の会社のイメージは？",
    options: [
      { text: "業界のリーダーとして認められている", internal: 4, poc: 3, education: 3 },
      { text: "効率的で収益性の高い会社になっている", internal: 3, poc: 4, education: 2 },
      { text: "従業員が成長し、活気のある会社になっている", internal: 3, poc: 3, education: 4 },
      { text: "安定して事業を継続している", internal: 2, poc: 3, education: 3 },
    ],
  },
  {
    id: 24,
    category: "戦略・方針",
    question: "成功の指標として、最も重視するのは？",
    options: [
      { text: "技術力・専門性の向上", internal: 4, poc: 2, education: 3 },
      { text: "売上・利益の向上", internal: 3, poc: 4, education: 2 },
      { text: "従業員の満足度・成長", internal: 3, poc: 3, education: 4 },
      { text: "お客様からの評価", internal: 3, poc: 4, education: 4 },
    ],
  },
  {
    id: 25,
    category: "戦略・方針",
    question: "変化の激しい時代に対応するため、最も大切だと思うのは？",
    options: [
      { text: "独自の強みを磨き続けること", internal: 4, poc: 3, education: 3 },
      { text: "迅速に変化に対応できること", internal: 3, poc: 4, education: 3 },
      { text: "組織全体の学習能力を高めること", internal: 3, poc: 3, education: 4 },
      { text: "リスクを避けて安定を保つこと", internal: 2, poc: 3, education: 3 },
    ],
  },
]

export default function LLMDiagnosticSystem() {
  const [currentSection, setCurrentSection] = useState<"profile" | "questions" | "results">("profile")
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    industry: "",
    employees: "",
    revenue: "",
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [investmentLevel, setInvestmentLevel] = useState("")

  const handleStartDiagnosis = () => {
    if (!companyProfile.industry || !companyProfile.employees || !companyProfile.revenue) {
      alert("すべての項目を選択してください。")
      return
    }
    setCurrentSection("questions")
  }

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      alert("選択肢を選んでください。")
      return
    }

    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: Number.parseInt(selectedAnswer),
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer("")
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      const prevAnswer = answers[questions[currentQuestion - 1].id]
      setSelectedAnswer(prevAnswer?.toString() || "")
    }
  }

  const handleShowResults = () => {
    if (!selectedAnswer) {
      alert("選択肢を選んでください。")
      return
    }

    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: Number.parseInt(selectedAnswer),
    }))

    setCurrentSection("results")
  }

  // スコア計算
  const calculateScores = () => {
    let internalScore = 0,
      pocScore = 0,
      educationScore = 0

    questions.forEach((question) => {
      const answerIndex = answers[question.id]
      if (answerIndex !== undefined) {
        const option = question.options[answerIndex]
        internalScore += option.internal
        pocScore += option.poc
        educationScore += option.education
      }
    })

    return { internalScore, pocScore, educationScore }
  }

  const { internalScore, pocScore, educationScore } = calculateScores()
  const maxScore = Math.max(internalScore, pocScore, educationScore)

  let recommendedApproach = ""
  if (maxScore === internalScore) {
    recommendedApproach = "AI内製化"
  } else if (maxScore === pocScore) {
    recommendedApproach = "PoC開発"
  } else {
    recommendedApproach = "教育プログラム"
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const getIndustryName = (industry: string) => {
    const names: Record<string, string> = {
      manufacturing: "製造業",
      service: "サービス業",
      retail: "小売業",
      construction: "建設業",
      logistics: "物流業",
    }
    return names[industry] || "労働集約型"
  }

  const calculateCategoryScores = (type: "internal" | "poc" | "education") => {
    const categories = {
      組織体制: [1, 2, 3, 4, 5],
      技術スキル: [6, 7, 8, 9, 10],
      投資予算: [11, 12, 13, 14, 15],
      業務課題: [16, 17, 18, 19, 20],
      戦略方針: [21, 22, 23, 24, 25],
    }

    const scores: number[] = []
    Object.values(categories).forEach((questionIds) => {
      let categoryScore = 0
      let count = 0
      questionIds.forEach((id) => {
        if (answers[id] !== undefined) {
          const question = questions.find((q) => q.id === id)
          if (question) {
            const option = question.options[answers[id]]
            categoryScore += option[type]
            count++
          }
        }
      })
      // スコアを0-100の範囲に正規化（4点満点を100点満点に変換）
      const normalizedScore = count > 0 ? (categoryScore / count) * 25 : 0
      scores.push(Math.min(100, Math.max(0, normalizedScore)))
    })

    return scores
  }

  if (currentSection === "profile") {
    return (
      <div className="min-h-screen bg-[#F2F4F4] py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#333333] mb-4">LLM導入調査</h1>
            <h2 className="text-3xl font-bold text-[#27AE60] mb-2">戦略診断システム</h2>
            <p className="text-[#666666]">あなたの会社に最適なAI導入アプローチを診断します</p>
          </div>

          {/* 企業プロファイル設定 */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-[#333333]">
                <Building className="mr-3 text-[#27AE60]" />
                企業プロファイル設定
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-sm font-medium text-[#666666] mb-2 block">業界・ドメイン</Label>
                  <Select
                    value={companyProfile.industry}
                    onValueChange={(value) => setCompanyProfile((prev) => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">製造業</SelectItem>
                      <SelectItem value="service">サービス業</SelectItem>
                      <SelectItem value="retail">小売業</SelectItem>
                      <SelectItem value="construction">建設業</SelectItem>
                      <SelectItem value="logistics">物流業</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#666666] mb-2 block">従業員数</Label>
                  <Select
                    value={companyProfile.employees}
                    onValueChange={(value) => setCompanyProfile((prev) => ({ ...prev, employees: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under50">50名未満</SelectItem>
                      <SelectItem value="50-100">50-100名</SelectItem>
                      <SelectItem value="100-300">100-300名</SelectItem>
                      <SelectItem value="over300">300名以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#666666] mb-2 block">年商</Label>
                  <Select
                    value={companyProfile.revenue}
                    onValueChange={(value) => setCompanyProfile((prev) => ({ ...prev, revenue: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under500">5億円未満</SelectItem>
                      <SelectItem value="500-1000">5-10億円</SelectItem>
                      <SelectItem value="1000-5000">10-50億円</SelectItem>
                      <SelectItem value="over5000">50億円以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button onClick={handleStartDiagnosis} className="px-8 py-3 bg-[#27AE60] hover:bg-[#70CE68]">
                  診断を開始する
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentSection === "questions") {
    const question = questions[currentQuestion]

    return (
      <div className="min-h-screen bg-[#F2F4F4] py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <CardTitle className="text-2xl text-[#333333]">戦略的LLM導入診断</CardTitle>
                <div className="text-sm text-[#666666]">{currentQuestion + 1}/25問完了</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#84E67F] to-[#27AE60] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Badge variant="secondary" className="mr-3">
                    {question.category}
                  </Badge>
                  <span className="text-sm text-[#666666]">Q{question.id}</span>
                </div>
                <h4 className="text-xl font-bold text-[#333333] mb-6">{question.question}</h4>
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {question.options.map((option, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedAnswer(i.toString())}
                      >
                        <RadioGroupItem value={i.toString()} id={`option-${i}`} />
                        <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                  前の質問
                </Button>
                {currentQuestion < questions.length - 1 ? (
                  <Button onClick={handleNextQuestion}>次の質問</Button>
                ) : (
                  <Button onClick={handleShowResults} className="bg-[#27AE60] hover:bg-[#70CE68]">
                    診断結果を見る
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Results section
  return (
    <div className="min-h-screen bg-[#F2F4F4] py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* LLM導入成熟度ランキング */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-[#333333]">
              <ChartBar className="mr-3 text-[#27AE60]" />
              LLM導入成熟度ランキング - SDLC戦略診断プラットフォーム
            </CardTitle>
          </CardHeader>
          <CardContent>
            <IndustryRanking industry={companyProfile.industry} />
          </CardContent>
        </Card>

        {/* エグゼクティブサマリー */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-[#333333]">
              <ClipboardCheck className="mr-3 text-[#84E67F]" />
              エグゼクティブサマリー
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recommendedApproach === "PoC開発" && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Flask className="text-blue-600 text-2xl mr-3" />
                  <h4 className="text-xl font-bold text-blue-800">PoC開発が最適です</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-[#333333] mb-2">なぜこの方法が良いのか</h5>
                    <ul className="text-sm text-[#666666] space-y-1">
                      <li>• 小さく始めて効果を確認できます</li>
                      <li>• 失敗しても損失が少なく済みます</li>
                      <li>• 従業員の皆さんも安心して取り組めます</li>
                      <li>• 成功したら本格的に拡大できます</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#333333] mb-2">期待される効果</h5>
                    <ul className="text-sm text-[#666666] space-y-1">
                      <li>• 月間の事務作業時間を20%削減</li>
                      <li>• 年間で約180万円のコスト削減</li>
                      <li>• お客様対応の品質向上</li>
                      <li>• 従業員の負担軽減</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {recommendedApproach === "AI内製化" && (
              <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Settings className="text-purple-600 text-2xl mr-3" />
                  <h4 className="text-xl font-bold text-purple-800">AI内製化が最適です</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-[#333333] mb-2">なぜこの方法が良いのか</h5>
                    <ul className="text-sm text-[#666666] space-y-1">
                      <li>• 独自の競争優位性を確立できます</li>
                      <li>• 長期的に大きな効果が期待できます</li>
                      <li>• 会社独自のノウハウを蓄積できます</li>
                      <li>• 外部依存から脱却できます</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#333333] mb-2">期待される効果</h5>
                    <ul className="text-sm text-[#666666] space-y-1">
                      <li>• 全社生産性を40%向上</li>
                      <li>• 年間で約480万円のコスト削減</li>
                      <li>• 競合他社との差別化実現</li>
                      <li>• 技術資産の構築</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {recommendedApproach === "教育プログラム" && (
              <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-green-600 text-2xl mr-3" />
                  <h4 className="text-xl font-bold text-green-800">教育プログラムが最適です</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-[#333333] mb-2">なぜこの方法が良いのか</h5>
                    <ul className="text-sm text-[#666666] space-y-1">
                      <li>• 従業員のスキルアップから始められます</li>
                      <li>• 組織全体の理解が深まります</li>
                      <li>• 無理のないペースで進められます</li>
                      <li>• 持続的な成長基盤を作れます</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#333333] mb-2">期待される効果</h5>
                    <ul className="text-sm text-[#666666] space-y-1">
                      <li>• 従業員の技術理解度向上</li>
                      <li>• 年間で約120万円の効率化</li>
                      <li>• 組織全体の変革準備</li>
                      <li>• 学習文化の醸成</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{maxScore}</div>
                  <div className="text-sm font-medium text-[#666666]">適性スコア</div>
                  <div className="text-xs text-[#999999] mt-1">100点満点中</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {maxScore >= 90 ? "エキスパート" :
                     maxScore >= 70 ? "上級者" :
                     maxScore >= 50 ? "中級者" :
                     maxScore >= 30 ? "初級者" : "入門者"}
                  </div>
                  <div className="text-sm font-medium text-[#666666]">現在のレベル</div>
                  <div className="text-xs text-[#999999] mt-1">AI導入成熟度</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {recommendedApproach === "PoC開発" ? "2-4ヶ月" :
                     recommendedApproach === "AI内製化" ? "6-12ヶ月" : "3-6ヶ月"}
                  </div>
                  <div className="text-sm font-medium text-[#666666]">推奨期間</div>
                  <div className="text-xs text-[#999999] mt-1">導入完了まで</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 適性分析 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-[#333333]">
              <Radar className="mr-3 text-[#9B59B6]" />
              適性分析（3つのアプローチ別）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white border-2 border-purple-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-[#333333] mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  AI内製化適性
                </h4>
                <div className="h-80 flex items-center justify-center">
                  <HighResRadarChart data={calculateCategoryScores("internal")} color="#8b5cf6" title="内製化適性" />
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-700 mb-1">
                    {Math.round(calculateCategoryScores("internal").reduce((a, b) => a + b, 0) / 5)}点
                  </div>
                  <div className="text-sm text-purple-600 font-medium">
                    {Math.round(calculateCategoryScores("internal").reduce((a, b) => a + b, 0) / 5) >= 80 ? "エキスパート" :
                     Math.round(calculateCategoryScores("internal").reduce((a, b) => a + b, 0) / 5) >= 60 ? "上級者" :
                     Math.round(calculateCategoryScores("internal").reduce((a, b) => a + b, 0) / 5) >= 40 ? "中級者" :
                     Math.round(calculateCategoryScores("internal").reduce((a, b) => a + b, 0) / 5) >= 20 ? "初級者" : "入門者"}
                  </div>
                </div>
              </div>
              <div className="text-center bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-[#333333] mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  PoC適性
                </h4>
                <div className="h-80 flex items-center justify-center">
                  <HighResRadarChart data={calculateCategoryScores("poc")} color="#3b82f6" title="PoC適性" />
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700 mb-1">
                    {Math.round(calculateCategoryScores("poc").reduce((a, b) => a + b, 0) / 5)}点
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {Math.round(calculateCategoryScores("poc").reduce((a, b) => a + b, 0) / 5) >= 80 ? "エキスパート" :
                     Math.round(calculateCategoryScores("poc").reduce((a, b) => a + b, 0) / 5) >= 60 ? "上級者" :
                     Math.round(calculateCategoryScores("poc").reduce((a, b) => a + b, 0) / 5) >= 40 ? "中級者" :
                     Math.round(calculateCategoryScores("poc").reduce((a, b) => a + b, 0) / 5) >= 20 ? "初級者" : "入門者"}
                  </div>
                </div>
              </div>
              <div className="text-center bg-white border-2 border-green-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-[#333333] mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  教育プログラム適性
                </h4>
                <div className="h-80 flex items-center justify-center">
                  <HighResRadarChart data={calculateCategoryScores("education")} color="#10b981" title="教育適性" />
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {Math.round(calculateCategoryScores("education").reduce((a, b) => a + b, 0) / 5)}点
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {Math.round(calculateCategoryScores("education").reduce((a, b) => a + b, 0) / 5) >= 80 ? "エキスパート" :
                     Math.round(calculateCategoryScores("education").reduce((a, b) => a + b, 0) / 5) >= 60 ? "上級者" :
                     Math.round(calculateCategoryScores("education").reduce((a, b) => a + b, 0) / 5) >= 40 ? "中級者" :
                     Math.round(calculateCategoryScores("education").reduce((a, b) => a + b, 0) / 5) >= 20 ? "初級者" : "入門者"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ペインポイント分析 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-[#333333]">
              <AlertTriangle className="mr-3 text-[#E74C3C]" />
              ペインポイント分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recommendedApproach === "PoC開発" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    特定されたペインポイント
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>会議後の議事録作成に毎回2時間かかる</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>同じような質問に何度も回答している</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>マニュアル作成・更新が追いついていない</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>報告書作成に時間がかかりすぎる</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                    <Flask className="mr-2 h-5 w-5" />
                    PoC開発による解決策
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>議事録自動生成で2時間→5分に短縮</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>FAQ自動応答で重複質問を80%削減</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>文書テンプレート自動生成機能</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>報告書作成支援で70%時間削減</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 収益成長予測 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-[#333333]">
              <TrendingUp className="mr-3 text-[#84E67F]" />
              収益成長予測（実施 vs 未実施）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-[#333333] mb-2">機会損失分析</h4>
                <p className="text-sm text-[#666666] mb-4">
                  AI導入による収益改善効果と、未実施による機会損失の比較分析
                </p>
              </div>
              <div className="h-96">
                <RevenueChartWithGap companyProfile={companyProfile} />
              </div>
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h5 className="font-bold text-orange-800 mb-2">重要ポイント</h5>
                <p className="text-sm text-orange-700">
                  未実施の場合、3年間で約2,400万円の機会損失が発生する可能性があります。
                  早期導入により競合優位性を確保することが重要です。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 投資計画・ロードマップ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-[#333333]">
              <Road className="mr-3 text-[#27AE60]" />
              投資計画・ロードマップ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label className="block text-sm font-medium text-[#666666] mb-2">投資規模を選択してください</Label>
              <Select value={investmentLevel} onValueChange={setInvestmentLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">小規模（50万円-100万円）</SelectItem>
                  <SelectItem value="medium">中規模（100万円-300万円）</SelectItem>
                  <SelectItem value="large">大規模（500万円以上）</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {investmentLevel === "small" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-xl font-bold text-blue-800 mb-4">小規模投資プラン（50万円-100万円）</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-[#333333] mb-3">具体的機能・できること</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• 議事録自動生成機能</li>
                      <li>• 簡易FAQ自動応答</li>
                      <li>• 基本的な文書作成支援</li>
                      <li>• メール対応テンプレート</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#333333] mb-3">期待効果</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• 議事録作成時間：2時間→10分</li>
                      <li>• FAQ対応時間：月20時間→5時間</li>
                      <li>• 年間効果：約180万円削減</li>
                      <li>• 投資回収：4ヶ月</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded border">
                  <h5 className="font-bold text-[#333333] mb-2">実装スケジュール（2-4週間）</h5>
                  <div className="text-sm">
                    <p>
                      <strong>Week 1:</strong> 要件整理・システム設定
                    </p>
                    <p>
                      <strong>Week 2:</strong> テスト導入・調整
                    </p>
                    <p>
                      <strong>Week 3-4:</strong> 本格運用・効果測定
                    </p>
                  </div>
                </div>
                <MasterSchedule level="small" />
                <GanttChart level="small" />
              </div>
            )}

            {investmentLevel === "medium" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-xl font-bold text-green-800 mb-4">中規模投資プラン（100万円-300万円）</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-[#333333] mb-3">具体的機能・できること</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• 高度文書自動生成</li>
                      <li>• 業務プロセス自動化</li>
                      <li>• 高度コミュニケーション支援</li>
                      <li>• データ分析・レポート自動化</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#333333] mb-3">期待効果</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• 事務作業全体：40%効率化</li>
                      <li>• 顧客対応品質：30%向上</li>
                      <li>• 年間効果：約480万円削減</li>
                      <li>• 投資回収：6ヶ月</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded border">
                  <h5 className="font-bold text-[#333333] mb-2">実装スケジュール（1-2ヶ月）</h5>
                  <div className="text-sm">
                    <p>
                      <strong>Month 1:</strong> システム構築・データ連携
                    </p>
                    <p>
                      <strong>Month 2:</strong> 全社テスト・本格稼働
                    </p>
                  </div>
                </div>
                <MasterSchedule level="medium" />
                <GanttChart level="medium" />
              </div>
            )}

            {investmentLevel === "large" && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-xl font-bold text-purple-800 mb-4">大規模投資プラン（500万円以上）</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-[#333333] mb-3">具体的機能・できること</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• 業務全体最適化AI</li>
                      <li>• 経営判断支援AI</li>
                      <li>• 顧客価値創造AI</li>
                      <li>• 独自AIモデル開発</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#333333] mb-2">期待効果</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• 全社生産性：60%向上</li>
                      <li>• 新規事業創出：年間300万円</li>
                      <li>• 年間効果：約1,200万円創出</li>
                      <li>• 投資回収：8ヶ月</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded border">
                  <h5 className="font-bold text-[#333333] mb-2">実装スケジュール（3-6ヶ月）</h5>
                  <div className="text-sm">
                    <p>
                      <strong>Month 1-2:</strong> AI基盤システム構築
                    </p>
                    <p>
                      <strong>Month 3-4:</strong> 各部門システム統合
                    </p>
                    <p>
                      <strong>Month 5-6:</strong> 独自AIモデル開発・検証
                    </p>
                  </div>
                </div>
                <MasterSchedule level="large" />
                <GanttChart level="large" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
