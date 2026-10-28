import React, { useState } from 'react';
import { X, Save, RotateCcw, Sliders } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [keywordsStr, setKeywordsStr] = useState<string>(profile.keywords.join(', '));

  if (!isOpen) return null;

  const handleTextChange = (field: keyof ProfileData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLinksChange = (linkKey: keyof ProfileData['links'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [linkKey]: value,
      },
    }));
  };

  const handleNowChange = (subKey: string, nestedField: string, value: any) => {
    setFormData((prev) => {
      const nowCopy = { ...prev.now } as any;
      if (typeof nowCopy[subKey] === 'object' && nowCopy[subKey] !== null) {
        nowCopy[subKey] = {
          ...nowCopy[subKey],
          [nestedField]: value,
        };
      } else {
        nowCopy[subKey] = value;
      }
      return {
        ...prev,
        now: nowCopy,
      };
    });
  };

  const handleRadarValueChange = (index: number, val: number) => {
    setFormData((prev) => {
      const nextVals = [...prev.radar.values];
      nextVals[index] = val;
      return {
        ...prev,
        radar: {
          ...prev.radar,
          values: nextVals,
        },
      };
    });
  };

  const handleRadarLabelChange = (index: number, label: string) => {
    setFormData((prev) => {
      const nextLabels = [...prev.radar.labels];
      nextLabels[index] = label;
      return {
        ...prev,
        radar: {
          ...prev.radar,
          labels: nextLabels,
        },
      };
    });
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedKeywords = keywordsStr
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const updatedProfile: ProfileData = {
      ...formData,
      keywords: updatedKeywords,
    };
    onSave(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                プロフィール・面接用データのカスタマイズ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                あなた自身の氏名、肩書、Now、レーダーチャート数値などを直接編集・反映できます
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Section: 基本情報 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              1. 基本情報
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  氏名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleTextChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  肩書・ポジション
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  キャッチコピー（強み・専門性の要約）
                </label>
                <textarea
                  rows={2}
                  value={formData.catchphrase}
                  onChange={(e) => handleTextChange('catchphrase', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  実務経験年数 (年)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.experienceYears}
                  onChange={(e) => handleTextChange('experienceYears', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  得意領域キーワード (カンマ区切り)
                </label>
                <input
                  type="text"
                  value={keywordsStr}
                  onChange={(e) => setKeywordsStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section: Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              2. リンク・連絡先
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={formData.links.github || ''}
                  onChange={(e) => handleLinksChange('github', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.links.linkedin || ''}
                  onChange={(e) => handleLinksChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Wantedly URL</label>
                <input
                  type="text"
                  value={formData.links.wantedly || ''}
                  onChange={(e) => handleLinksChange('wantedly', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">技術ブログ (Zenn / Qiita / note)</label>
                <input
                  type="text"
                  value={formData.links.blog || ''}
                  onChange={(e) => handleLinksChange('blog', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">メールアドレス</label>
                <input
                  type="email"
                  value={formData.links.email || ''}
                  onChange={(e) => handleLinksChange('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section: Now (現在取り組んでいること) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              3. Now（最新フォーカス領域）
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  主要プロジェクト名
                </label>
                <input
                  type="text"
                  value={formData.now.mainProject.name}
                  onChange={(e) => handleNowChange('mainProject', 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  主要PJ概要
                </label>
                <textarea
                  rows={2}
                  value={formData.now.mainProject.summary}
                  onChange={(e) => handleNowChange('mainProject', 'summary', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  直近のキャッチアップ・新技術テーマ
                </label>
                <input
                  type="text"
                  value={formData.now.learning.topic}
                  onChange={(e) => handleNowChange('learning', 'topic', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  社内改善・組織貢献タイトル
                </label>
                <input
                  type="text"
                  value={formData.now.internalContribution.title}
                  onChange={(e) => handleNowChange('internalContribution', 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section: Radar Chart values */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              4. スキルチャート（レーダーチャート6項目 &amp; スコア）
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.radar.labels.map((label, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => handleRadarLabelChange(idx, e.target.value)}
                      className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold w-2/3"
                    />
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {formData.radar.values[idx]}点
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={formData.radar.values[idx]}
                    onChange={(e) => handleRadarValueChange(idx, Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer inside form */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>初期値にリセット</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>保存して画面に反映</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
