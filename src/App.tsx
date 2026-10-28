import { useState, useEffect } from 'react';
import { PRESET_PROFILES } from './data/presets';
import { ProfileData } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ExportModal } from './components/ExportModal';
import { EditProfileModal } from './components/EditProfileModal';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const savedCustom = localStorage.getItem('interview_portfolio_custom_data_v7');
    if (savedCustom) {
      try {
        return JSON.parse(savedCustom);
      } catch {
        return PRESET_PROFILES.backend;
      }
    }
    return PRESET_PROFILES.backend;
  });

  const [activeTab, setActiveTab] = useState<'skills' | 'experience'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#skills') {
      return 'skills';
    }
    return 'experience';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('interview_portfolio_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Sync dark class on root html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('interview_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('interview_portfolio_theme', 'light');
    }
  }, [isDark]);

  // Sync tab with URL hash
  const handleSelectTab = (tab: 'skills' | 'experience') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab === 'skills' ? '#skills' : '#experience';
    }
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleSaveCustomProfile = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
    localStorage.setItem('interview_portfolio_custom_data_v7', JSON.stringify(updatedProfile));
  };

  const handleResetProfile = () => {
    localStorage.removeItem('interview_portfolio_custom_data_v7');
    const basePreset = PRESET_PROFILES.backend;
    setProfile(basePreset);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 dark:bg-[#161615] dark:text-stone-100 transition-colors duration-200">
      {/* Top Navigation with Page Switcher */}
      <Navbar
        name="Profile"
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenEdit={() => setIsEditModalOpen(true)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* 1. 職歴と主な取り組みページ (左側の第一タブ) */}
        {activeTab === 'experience' && (
          <div className="animate-in fade-in duration-200 space-y-10">
            <Hero profile={profile} />
            <ExperienceSection />
          </div>
        )}

        {/* 2. スキル・強みページ (右側の第二タブ): スキル・強みのみを表示 */}
        {activeTab === 'skills' && (
          <div className="animate-in fade-in duration-200">
            <SkillsSection
              radar={profile.radar}
              skills={profile.skills}
              isDark={isDark}
            />
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-16 border-t border-stone-200/80 dark:border-stone-800 py-8 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500"></span>
            <span>{profile.title} — Portfolio &amp; Profile</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              単一ファイルHTMLを保存
            </button>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              プロフィール編集
            </button>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <a href="#hero" className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
              上部へ戻る
            </a>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        profile={profile}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveCustomProfile}
        onReset={handleResetProfile}
      />
    </div>
  );
}
