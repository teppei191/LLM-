"use client"

interface IndustryRankingProps {
  industry: string
}

const industryRankings = {
  manufacturing: {
    name: "製造業",
    companies: [
      { rank: 1, level: "S級", company: "トヨタ自動車", score: 95, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "パナソニック", score: 88, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "B級", company: "三菱電機", score: 76, color: "from-green-500 to-green-600" },
      {
        rank: 4,
        level: "C級",
        company: "あなたの会社",
        score: 65,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 5, level: "D級", company: "改善要製造業", score: 45, color: "from-red-400 to-red-500" },
    ],
  },
  service: {
    name: "サービス業",
    companies: [
      { rank: 1, level: "S級", company: "ソフトバンク", score: 94, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "楽天グループ", score: 87, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "B級", company: "リクルート", score: 74, color: "from-green-500 to-green-600" },
      {
        rank: 4,
        level: "C級",
        company: "あなたの会社",
        score: 63,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 5, level: "D級", company: "改善要サービス業", score: 42, color: "from-red-400 to-red-500" },
    ],
  },
  retail: {
    name: "小売業",
    companies: [
      { rank: 1, level: "S級", company: "セブン&アイ", score: 92, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "イオン", score: 85, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "B級", company: "ファーストリテイリング", score: 73, color: "from-green-500 to-green-600" },
      {
        rank: 4,
        level: "C級",
        company: "あなたの会社",
        score: 62,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 5, level: "D級", company: "改善要小売業", score: 41, color: "from-red-400 to-red-500" },
    ],
  },
  construction: {
    name: "建設業",
    companies: [
      { rank: 1, level: "S級", company: "大林組", score: 89, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "鹿島建設", score: 82, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "B級", company: "清水建設", score: 71, color: "from-green-500 to-green-600" },
      {
        rank: 4,
        level: "C級",
        company: "あなたの会社",
        score: 60,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 5, level: "D級", company: "改善要建設業", score: 39, color: "from-red-400 to-red-500" },
    ],
  },
  logistics: {
    name: "物流業",
    companies: [
      { rank: 1, level: "S級", company: "ヤマトHD", score: 91, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "日本郵政", score: 84, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "B級", company: "佐川急便", score: 72, color: "from-green-500 to-green-600" },
      {
        rank: 4,
        level: "C級",
        company: "あなたの会社",
        score: 61,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 5, level: "D級", company: "改善要物流業", score: 40, color: "from-red-400 to-red-500" },
    ],
  },
}

export default function IndustryRanking({ industry }: IndustryRankingProps) {
  const ranking = industryRankings[industry as keyof typeof industryRankings] || industryRankings.manufacturing

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#84E67F]/20 to-[#27AE60]/20 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-bold text-[#333333] mb-4">{ranking.name}デジタル変革成熟度評価</h4>
        <div className="grid md:grid-cols-5 gap-4">
          {ranking.companies.map((item) => (
            <div
              key={item.rank}
              className={`relative p-4 rounded-lg bg-gradient-to-br ${item.color} ${item.current ? "ring-4 ring-[#F9A826] ring-offset-2" : ""}`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">#{item.rank}</div>
                <div className="text-lg font-bold text-white mb-2">{item.level}</div>
                <div className="text-sm text-white mb-2">{item.company}</div>
                <div className="text-xl font-bold text-white">{item.score}点</div>
              </div>
              {item.current && (
                <div className="absolute -top-3 -right-3 bg-[#F9A826] text-white text-xs font-bold px-2 py-1 rounded-full">
                  あなたはここ！
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 縦配置レイアウトに変更 */}
      <div className="space-y-8">
        {/* 成熟度レベル詳細 - マッキンゼー風の定義に変更 */}
        <div className="bg-white border-2 border-[#27AE60]/20 rounded-xl p-6 shadow-lg">
          <h5 className="font-bold text-xl text-[#333333] mb-6 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-[#84E67F] to-[#27AE60] rounded mr-3"></div>
            {ranking.name}デジタル変革成熟度レベル詳細
          </h5>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-500">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-4 mt-1 flex-shrink-0"></div>
              <div>
                <div className="font-bold text-purple-800 text-lg">S級 (90-100点): デジタル・ネイティブ</div>
                <div className="text-purple-700 font-medium">AI戦略リーダー・業界変革者</div>
                <div className="text-sm text-purple-600 mt-2">
                  • 全社的なAI戦略とガバナンス体制が確立
                  <br />• 独自のAIケイパビリティで競争優位を創出
                  <br />• データドリブンな意思決定が組織文化として定着
                  <br />• 業界エコシステム全体のデジタル変革を牽引
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 mt-1 flex-shrink-0"></div>
              <div>
                <div className="font-bold text-blue-800 text-lg">A級 (80-89点): デジタル・アドバンスド</div>
                <div className="text-blue-700 font-medium">AI活用先進企業・スケール段階</div>
                <div className="text-sm text-blue-600 mt-2">
                  • 複数部門でAI活用が本格稼働
                  <br />• ROI実証済みのAIユースケースを拡張中
                  <br />• データ品質とセキュリティ管理が高水準
                  <br />• 従業員のデジタルスキルが組織全体で向上
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 mt-1 flex-shrink-0"></div>
              <div>
                <div className="font-bold text-green-800 text-lg">B級 (70-79点): デジタル・プログレッシブ</div>
                <div className="text-green-700 font-medium">AI導入推進企業・実装段階</div>
                <div className="text-sm text-green-600 mt-2">
                  • 特定領域でAIパイロットプロジェクトが成功
                  <br />• データ基盤とアナリティクス能力を構築中
                  <br />• デジタル人材の採用・育成に積極投資
                  <br />• 業務プロセスの標準化・自動化が進行中
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-500">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-4 mt-1 flex-shrink-0"></div>
              <div>
                <div className="font-bold text-yellow-800 text-lg">C級 (60-69点): デジタル・エクスプローラー</div>
                <div className="text-yellow-700 font-medium">AI検討段階企業・探索段階</div>
                <div className="text-sm text-yellow-600 mt-2">
                  • AI導入の戦略検討とPoC実験を開始
                  <br />• 基本的なデジタルツールの活用は進んでいる
                  <br />• 一部部門でデータ活用の取り組みを実施
                  <br />• 経営層のデジタル変革への理解が向上中
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-l-4 border-red-500">
              <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-4 mt-1 flex-shrink-0"></div>
              <div>
                <div className="font-bold text-red-800 text-lg">D級 (40-59点): デジタル・ビギナー</div>
                <div className="text-red-700 font-medium">デジタル化要改善企業・基礎段階</div>
                <div className="text-sm text-red-600 mt-2">
                  • 基本的なIT化・ペーパーレス化から着手が必要
                  <br />• 業務プロセスが属人化・非効率な状態
                  <br />• デジタルスキルの組織的な底上げが急務
                  <br />• 経営層のデジタル変革への意識改革が必要
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 次のレベルへの道筋 */}
        <div className="bg-white border-2 border-[#84E67F]/20 rounded-xl p-6 shadow-lg">
          <h5 className="font-bold text-xl text-[#333333] mb-6 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-[#F9A826] to-[#E74C3C] rounded mr-3"></div>
            次のレベルへの道筋
          </h5>
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  目標
                </div>
                <h6 className="font-bold text-blue-800 text-lg">B級到達目標: 76点以上</h6>
              </div>
              <div className="grid md:grid-cols-1 gap-3">
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-blue-700 font-medium">業務プロセスの標準化完了</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-blue-700 font-medium">データ活用基盤の構築</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-blue-700 font-medium">従業員のデジタルスキル向上</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  実行
                </div>
                <h6 className="font-bold text-green-800 text-lg">推奨アクション</h6>
              </div>
              <div className="grid md:grid-cols-1 gap-3">
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-700 font-medium">PoC開発による効果実証</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-700 font-medium">段階的なAI機能導入</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-700 font-medium">組織変革の準備</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
