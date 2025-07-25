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
      { rank: 3, level: "A級", company: "ソニー", score: 85, color: "from-blue-500 to-blue-600" },
      { rank: 4, level: "B級", company: "三菱電機", score: 76, color: "from-green-500 to-green-600" },
      { rank: 5, level: "B級", company: "日立製作所", score: 74, color: "from-green-500 to-green-600" },
      { rank: 6, level: "B級", company: "富士通", score: 72, color: "from-green-500 to-green-600" },
      {
        rank: 7,
        level: "C級",
        company: "あなたの会社",
        score: 65,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 8, level: "C級", company: "中堅製造業A", score: 58, color: "from-yellow-400 to-yellow-500" },
      { rank: 9, level: "D級", company: "中堅製造業B", score: 52, color: "from-red-400 to-red-500" },
      { rank: 10, level: "D級", company: "改善要製造業", score: 45, color: "from-red-400 to-red-500" },
    ],
  },
  service: {
    name: "サービス業",
    companies: [
      { rank: 1, level: "S級", company: "ソフトバンク", score: 94, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "楽天グループ", score: 87, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "A級", company: "NTTドコモ", score: 84, color: "from-blue-500 to-blue-600" },
      { rank: 4, level: "B級", company: "リクルート", score: 74, color: "from-green-500 to-green-600" },
      { rank: 5, level: "B級", company: "サイバーエージェント", score: 71, color: "from-green-500 to-green-600" },
      { rank: 6, level: "B級", company: "DeNA", score: 69, color: "from-green-500 to-green-600" },
      {
        rank: 7,
        level: "C級",
        company: "あなたの会社",
        score: 63,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 8, level: "C級", company: "中堅サービス業A", score: 56, color: "from-yellow-400 to-yellow-500" },
      { rank: 9, level: "D級", company: "中堅サービス業B", score: 50, color: "from-red-400 to-red-500" },
      { rank: 10, level: "D級", company: "改善要サービス業", score: 42, color: "from-red-400 to-red-500" },
    ],
  },
  retail: {
    name: "小売業",
    companies: [
      { rank: 1, level: "S級", company: "セブン&アイ", score: 92, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "イオン", score: 85, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "A級", company: "ファーストリテイリング", score: 82, color: "from-blue-500 to-blue-600" },
      { rank: 4, level: "B級", company: "ヨドバシカメラ", score: 73, color: "from-green-500 to-green-600" },
      { rank: 5, level: "B級", company: "ビックカメラ", score: 70, color: "from-green-500 to-green-600" },
      { rank: 6, level: "B級", company: "ドン・キホーテ", score: 68, color: "from-green-500 to-green-600" },
      {
        rank: 7,
        level: "C級",
        company: "あなたの会社",
        score: 62,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 8, level: "C級", company: "中堅小売業A", score: 55, color: "from-yellow-400 to-yellow-500" },
      { rank: 9, level: "D級", company: "中堅小売業B", score: 48, color: "from-red-400 to-red-500" },
      { rank: 10, level: "D級", company: "改善要小売業", score: 41, color: "from-red-400 to-red-500" },
    ],
  },
  construction: {
    name: "建設業",
    companies: [
      { rank: 1, level: "S級", company: "大林組", score: 89, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "鹿島建設", score: 82, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "A級", company: "清水建設", score: 80, color: "from-blue-500 to-blue-600" },
      { rank: 4, level: "B級", company: "大成建設", score: 71, color: "from-green-500 to-green-600" },
      { rank: 5, level: "B級", company: "竹中工務店", score: 69, color: "from-green-500 to-green-600" },
      { rank: 6, level: "B級", company: "戸田建設", score: 67, color: "from-green-500 to-green-600" },
      {
        rank: 7,
        level: "C級",
        company: "あなたの会社",
        score: 60,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 8, level: "C級", company: "中堅建設業A", score: 53, color: "from-yellow-400 to-yellow-500" },
      { rank: 9, level: "D級", company: "中堅建設業B", score: 46, color: "from-red-400 to-red-500" },
      { rank: 10, level: "D級", company: "改善要建設業", score: 39, color: "from-red-400 to-red-500" },
    ],
  },
  logistics: {
    name: "物流業",
    companies: [
      { rank: 1, level: "S級", company: "ヤマトHD", score: 91, color: "from-purple-500 to-purple-600" },
      { rank: 2, level: "A級", company: "日本郵政", score: 84, color: "from-blue-500 to-blue-600" },
      { rank: 3, level: "A級", company: "佐川急便", score: 81, color: "from-blue-500 to-blue-600" },
      { rank: 4, level: "B級", company: "日本通運", score: 72, color: "from-green-500 to-green-600" },
      { rank: 5, level: "B級", company: "福山通運", score: 70, color: "from-green-500 to-green-600" },
      { rank: 6, level: "B級", company: "センコー", score: 68, color: "from-green-500 to-green-600" },
      {
        rank: 7,
        level: "C級",
        company: "あなたの会社",
        score: 61,
        color: "from-yellow-400 to-yellow-500",
        current: true,
      },
      { rank: 8, level: "C級", company: "中堅物流業A", score: 54, color: "from-yellow-400 to-yellow-500" },
      { rank: 9, level: "D級", company: "中堅物流業B", score: 47, color: "from-red-400 to-red-500" },
      { rank: 10, level: "D級", company: "改善要物流業", score: 40, color: "from-red-400 to-red-500" },
    ],
  },
}

export default function IndustryRanking({ industry }: IndustryRankingProps) {
  const ranking = industryRankings[industry as keyof typeof industryRankings] || industryRankings.manufacturing

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#84E67F]/20 to-[#27AE60]/20 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-bold text-[#333333] mb-4">{ranking.name}デジタル変革成熟度評価</h4>
        <div className="space-y-3">
          {ranking.companies.map((item) => (
            <div
              key={item.rank}
              className={`relative flex items-center p-4 rounded-lg bg-gradient-to-r ${item.color} ${item.current ? "ring-4 ring-[#F9A826] ring-offset-2" : ""}`}
            >
              <div className="flex items-center w-full">
                <div className="text-3xl font-bold text-white mr-4">#{item.rank}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-white">{item.company}</div>
                      <div className="text-sm text-white/90">{item.level}</div>
                    </div>
                    <div className="text-2xl font-bold text-white">{item.score}点</div>
                  </div>
                </div>
              </div>
              {item.current && (
                <div className="absolute -top-2 -right-2 bg-[#F9A826] text-white text-xs font-bold px-3 py-1 rounded-full">
                  あなたはここ！
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 横配置でモダンなレイアウトに変更 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 成熟度レベル詳細 - コンパクトなカード形式 */}
        <div className="bg-white border-2 border-[#27AE60]/20 rounded-xl p-6 shadow-lg">
          <h5 className="font-bold text-xl text-[#333333] mb-6 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-[#84E67F] to-[#27AE60] rounded mr-3"></div>
            成熟度レベル
          </h5>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-500">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="font-bold text-purple-800 text-sm">S級 (90-100点)</div>
                <div className="text-xs text-purple-600">AI戦略リーダー・業界変革者</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="font-bold text-blue-800 text-sm">A級 (80-89点)</div>
                <div className="text-xs text-blue-600">AI活用先進企業・スケール段階</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="font-bold text-green-800 text-sm">B級 (70-79点)</div>
                <div className="text-xs text-green-600">AI導入推進企業・実装段階</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-500">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="font-bold text-yellow-800 text-sm">C級 (60-69点)</div>
                <div className="text-xs text-yellow-600">AI検討段階企業・探索段階</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-l-4 border-red-500">
              <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="font-bold text-red-800 text-sm">D級 (40-59点)</div>
                <div className="text-xs text-red-600">デジタル化要改善企業・基礎段階</div>
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
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                  目標
                </div>
                <h6 className="font-bold text-blue-800 text-sm">B級到達目標: 76点以上</h6>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-blue-700">業務プロセスの標準化完了</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-blue-700">データ活用基盤の構築</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-blue-700">従業員のデジタルスキル向上</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                  実行
                </div>
                <h6 className="font-bold text-green-800 text-sm">推奨アクション</h6>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-700">PoC開発による効果実証</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-700">段階的なAI機能導入</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-700">組織変革の準備</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
