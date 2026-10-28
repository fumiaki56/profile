import React from 'react';
import { Sun, Moon, Download, Edit3 } from 'lucide-react';

interface NavbarProps {
  name: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenExport: () => void;
  onOpenEdit: () => void;
  activeTab: 'experience' | 'skills';
  onSelectTab: (tab: 'experience' | 'skills') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  isDark,
  onToggleTheme,
  onOpenExport,
  onOpenEdit,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fafaf9]/90 dark:bg-[#161615]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand wordmark */}
        <a
          href="#hero"
          className="text-base font-semibold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500"></span>
          <span>{name}</span>
          <span className="text-xs font-normal text-stone-400 dark:text-stone-500 hidden sm:inline">
            / Portfolio
          </span>
        </a>

        {/* Page Switcher Tabs: 職歴と主な取り組み (左), スキル・強み (右) */}
        <nav className="flex items-center p-1 rounded-xl bg-stone-200/70 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-800 text-xs font-medium">
          <button
            onClick={() => onSelectTab('experience')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'experience'
                ? 'bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            職歴と主な取り組み
          </button>
          <button
            onClick={() => onSelectTab('skills')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'skills'
                ? 'bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            スキル・強み
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenEdit}
            className="px-2.5 py-1.5 text-xs font-medium rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            title="プロフィール内容を編集"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">編集</span>
          </button>

          <button
            onClick={onOpenExport}
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
            title="1ファイル形式のHTMLコードを出力・保存"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">HTML保存</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
            aria-label="テーマ切り替え"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
