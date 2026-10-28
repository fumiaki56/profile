import React from 'react';
import { BookOpen, Mail, Award, Compass } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeroProps {
  profile: ProfileData;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="hero" className="pt-4 pb-6 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Natural Greeting & Profile */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>実務経験 約{profile.experienceYears}年</span>
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>私立大学 経済学部卒</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>オンライン面接・自己紹介用</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            {profile.name}
          </h1>

          <p className="text-base sm:text-lg font-medium text-emerald-800 dark:text-emerald-400">
            {profile.title}
          </p>

          <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base max-w-2xl">
            {profile.catchphrase}
          </p>

          {/* Keywords (Clean typographic unboxed keywords) */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-300">
            <span className="text-stone-400 dark:text-stone-500">大切にしているキーワード :</span>
            {profile.keywords.map((kw, i) => (
              <React.Fragment key={kw}>
                <span className="text-stone-800 dark:text-stone-200 font-semibold">
                  # {kw}
                </span>
                {i < profile.keywords.length - 1 && (
                  <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Links & Qualifications */}
          <div className="pt-3 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            {profile.links.blog && (
              <a
                href={profile.links.blog}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>ブログ ({profile.links.blog.replace('https://', '')})</span>
              </a>
            )}
            {profile.links.email && (
              <a
                href={`mailto:${profile.links.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-mono text-xs"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{profile.links.email}</span>
              </a>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 rounded-xl">
              <Award className="w-3.5 h-3.5 text-stone-500" />
              <span>保有資格: 危険物取扱者 乙4 / 三陸特</span>
            </span>
          </div>
        </div>

        {/* Right Column: Friendly 30-Second Human Overview */}
        <div className="lg:col-span-4 bg-white/80 dark:bg-stone-900/70 border border-stone-200/90 dark:border-stone-800/90 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
              <span>はじめに / 私の強み</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
              Overview
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            国内大手製薬メーカー（東証プライム上場）での約15年間の経理事務を通じて培った「数字を扱う上での正確性」と、現職（大手電機メーカー系 総合ビル管理企業）で見積積算を担当しながら<strong>生成AI（Gemini）を活用してWebアプリプロトタイプを作成・上長へ改善提案した実行力</strong>が私の特徴です。
          </p>

          <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
            <span>大切にしている姿勢 : 堅実な実務 × 自発的な工夫</span>
          </div>
        </div>
      </div>
    </section>
  );
};
