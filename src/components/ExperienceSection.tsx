import React from 'react';
import { Calendar, Briefcase, Sparkles } from 'lucide-react';

interface CareerExperience {
  id: string;
  period: string;
  company: string;
  department?: string;
  role?: string;
  summary: string;
  isCurrent?: boolean;
  initiative?: {
    title: string;
    challenge: string;
    action: string;
    result: string;
  };
}

const EXPERIENCES: CareerExperience[] = [
  {
    id: 'mbs',
    period: '2025年10月 - 現在 (現職 / 約1年)',
    company: '大手電機メーカー系 総合ビル管理・ファシリティ企業',
    department: '支店 業務課',
    role: '業務課 担当',
    isCurrent: true,
    summary: '昇降機の修理・保守工事に関する見積積算、営業支援、発注依頼書のデータ入力（施工日・施工条件など）、動静表の確認などを担当。',
    initiative: {
      title: '見積作成業務の工程分析と、生成AIによるWebアプリプロトタイプ作成・改善提案',
      challenge: '昇降機の修理・保守工事の見積作成において、材料単価や外注費の検索、作業時間や取替調整費の計算、積算システムへの入力確認などに多くの時間と確認の負荷がかかっていました。',
      action: '日々の見積支援を正確に行いながら作業工程を分析。生成AI（Gemini）を活用して、必要な情報を集約して計算補助を行うWebアプリのプロトタイプを自ら作成しました。社内の確認・承認手順を踏まえた上で、改善案として上長へ提案しました。',
      result: 'アイデアにとどまらず「実際に操作できるプロトタイプ画面」として具体化したことで、見積作成の効率化イメージを上長と明確に共有でき、現場発の改善推進の第一歩となりました。',
    },
  },
  {
    id: 'mitsui',
    period: '約2年半',
    company: '大手総合リース企業',
    department: '広報・IR担当',
    role: '広報・IR担当',
    summary: 'プレスリリース配信関連業務、新聞・Webメディア掲載情報の収集・クリッピング、コーポレートサイトの情報更新、広報効果測定、マイバッグ利用促進などの環境施策発信を担当。',
    initiative: {
      title: 'タイムリーな情報発信とコーポレートサイトの迅速な情報更新',
      challenge: '企業のステークホルダーに向けて、適切なタイミングで最新の企業情報や環境配慮への取り組みを正確に届ける必要がありました。',
      action: '日々のメディア掲載情報を注意深く収集・整理して社内へ共有。Webサイトの更新を迅速に行い、環境配慮施策（マイバッグ利用促進など）の情報発信にも携わりました。',
      result: '社内外をつなぐ窓口として情報発信を支え、迅速なサイト更新とステークホルダーとの信頼関係構築に貢献しました。',
    },
  },
  {
    id: 'lawlands',
    period: '約1年半',
    company: '社会課題解決型ベンチャー企業（就労支援・Web事業）',
    department: 'Web制作担当',
    role: 'Web制作・デザイン業務',
    summary: 'Web制作・デザイン関連業務およびPhotoshopを使用した画像加工・デザイン補助業務に従事。',
    initiative: {
      title: 'Photoshopによる画像加工とWebコンテンツ制作支援',
      challenge: 'Webコンテンツや画像素材において、見る人に心地よく伝わる視覚的なレイアウトや画像加工が求められていました。',
      action: '指定されたレギュレーションに沿って、写真の切り抜きや色調補正、バナー作成を行い、清潔感のある制作を心がけました。',
      result: '視覚的な情報整理の基礎とWeb制作の実務感覚を身につけ、その後のコーポレートサイト運用や現在のAIプロトタイプ作成の土台となりました。',
    },
  },
  {
    id: 'astellas',
    period: '約15年間',
    company: '国内大手製薬メーカー（東証プライム上場）',
    department: '経理部',
    role: '経理担当',
    summary: '請求書処理、伝票入力、経理関連の事務処理を担当。金額や取引情報を扱う定型業務を長期間にわたりミスなく正確に遂行。',
    initiative: {
      title: '約15年間にわたる経理事務（請求書処理・伝票入力と正確な確認の徹底）',
      challenge: '日々の請求書処理や伝票入力では、金額の誤りや取引情報の不整合が許されないため、常に慎重かつ確実な処理が求められる環境でした。',
      action: 'チェック手順を一つひとつ遵守し、取引内容と金額の照合を丁寧に行いました。少しでも疑問がある場合は関係者と落ち着いて確認を取り、ミスの未然防止に努めました。',
      result: '約15年の長きにわたり、安定して正確に業務を遂行。「数字を安心して任せられる」という誠実な信頼を築くことができました。',
    },
  },
  {
    id: 'nihon-univ',
    period: '卒業',
    company: '私立大学 経済学部 経済学科',
    summary: '経済学の基礎およびビジネス教養を修得。',
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <span className="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400">
            Career &amp; Works
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mt-0.5">
            職歴と主な取り組み
          </h2>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          実務経験の変遷と、各社で工夫・実践してきた内容
        </span>
      </div>

      <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-3 sm:ml-4 space-y-8 pl-6 sm:pl-8">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="relative space-y-3">
            {/* Timeline Pin */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#fafaf9] dark:border-[#161615] ${
                exp.isCurrent ? 'bg-emerald-600 ring-4 ring-emerald-500/20' : 'bg-stone-400 dark:bg-stone-600'
              }`}
            ></div>

            {/* Header info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                <span className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                  {exp.company}
                </span>
                {exp.department && (
                  <>
                    <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                    <span>{exp.department}</span>
                  </>
                )}
                {exp.isCurrent && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-300/60 dark:border-emerald-800">
                    現職
                  </span>
                )}
              </div>

              {/* Only render role if specified (omit for university/education) */}
              {exp.role && (
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 pt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                  <span>担当業務 : {exp.role}</span>
                </div>
              )}

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-0.5">
                {exp.summary}
              </p>
            </div>

            {/* Initiative / Key Story Card (if any) */}
            {exp.initiative && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200/90 dark:border-stone-800 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100">
                  <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>{exp.initiative.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200/70 dark:border-stone-800 space-y-1">
                    <span className="font-bold text-stone-700 dark:text-stone-300 block">
                      きっかけ・現場の課題
                    </span>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                      {exp.initiative.challenge}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200/70 dark:border-stone-800 space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 block">
                      工夫したアプローチ
                    </span>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                      {exp.initiative.action}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                      得られた変化と結果
                    </span>
                    <p className="text-stone-700 dark:text-stone-200 leading-relaxed text-[11px]">
                      {exp.initiative.result}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
