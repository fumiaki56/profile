import React from 'react';
import { Calendar, Briefcase, Sparkles, BookOpen } from 'lucide-react';
import { CareerItem } from '../types/portfolio';

interface ExperienceSectionProps {
  career: CareerItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ career }) => {
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
          実務経験の変遷と、各社で工夫・実践してきた内容（社名等は一部伏せて記載）
        </span>
      </div>

      <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-3 sm:ml-4 space-y-8 pl-6 sm:pl-8">
        {career.map((exp, index) => (
          <div key={exp.id || `${exp.company}-${index}`} className="relative space-y-3">
            {/* Timeline Pin */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#fafaf9] dark:border-[#161615] ${
                exp.isCurrent
                  ? 'bg-emerald-600 ring-4 ring-emerald-500/20'
                  : exp.isLearning
                    ? 'bg-amber-500 dark:bg-amber-400'
                    : 'bg-stone-400 dark:bg-stone-600'
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
                {exp.isLearning && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 rounded-full border border-amber-300/60 dark:border-amber-800">
                    スキル習得期
                  </span>
                )}
              </div>

              {/* Only render role if specified (omit for university/education) */}
              {exp.title && (
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 pt-0.5">
                  {exp.isLearning ? (
                    <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                  )}
                  <span>{exp.isLearning ? '学習内容' : '担当業務'} : {exp.title}</span>
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
                  <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
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
