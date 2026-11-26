import { ProfileData } from '../types/portfolio';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateStandaloneHtml(profile: ProfileData): string {
  const radarLabels = JSON.stringify(profile.radar.labels);
  const radarValues = JSON.stringify(profile.radar.values);
  const qualificationsSummary =
    profile.qualificationsSummary ||
    '日商簿記2級 / 英検2級 / 危険物取扱者 乙4';

  const careerHtml = profile.career
    .map((exp) => {
      const pinClass = exp.isCurrent
        ? 'bg-emerald-600 ring-4 ring-emerald-500/20'
        : exp.isLearning
          ? 'bg-amber-500 dark:bg-amber-400'
          : 'bg-stone-400 dark:bg-stone-600';

      const initiativeHtml = exp.initiative
        ? `
          <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200/90 dark:border-stone-800 space-y-3 shadow-xs">
            <div class="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100">
              <i data-lucide="sparkles" class="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0"></i>
              <span>${escapeHtml(exp.initiative.title)}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200/70 dark:border-stone-800 space-y-1">
                <span class="font-bold text-stone-700 dark:text-stone-300 block">きっかけ・現場の課題</span>
                <p class="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                  ${escapeHtml(exp.initiative.challenge)}
                </p>
              </div>

              <div class="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200/70 dark:border-stone-800 space-y-1">
                <span class="font-bold text-emerald-800 dark:text-emerald-400 block">工夫したアプローチ</span>
                <p class="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                  ${escapeHtml(exp.initiative.action)}
                </p>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1">
                <span class="font-bold text-emerald-800 dark:text-emerald-300 block">得られた変化と結果</span>
                <p class="text-stone-700 dark:text-stone-200 leading-relaxed text-[11px]">
                  ${escapeHtml(exp.initiative.result)}
                </p>
              </div>
            </div>
          </div>`
        : '';

      return `
        <div class="relative space-y-3">
          <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#fafaf9] dark:border-[#161615] ${pinClass}"></div>

          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span class="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                <span>${escapeHtml(exp.period)}</span>
              </span>
              <span aria-hidden="true" class="text-stone-300 dark:text-stone-700">·</span>
              <span class="font-bold text-stone-800 dark:text-stone-200 text-sm">${escapeHtml(exp.company)}</span>
              ${
                exp.department
                  ? `<span aria-hidden="true" class="text-stone-300 dark:text-stone-700">·</span><span>${escapeHtml(exp.department)}</span>`
                  : ''
              }
              ${
                exp.isCurrent
                  ? `<span class="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-300/60 dark:border-emerald-800">現職</span>`
                  : ''
              }
              ${
                exp.isLearning
                  ? `<span class="px-2 py-0.5 text-[11px] font-semibold bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 rounded-full border border-amber-300/60 dark:border-amber-800">スキル習得期</span>`
                  : ''
              }
            </div>

            ${
              exp.title
                ? `<div class="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 pt-0.5">
              <i data-lucide="${exp.isLearning ? 'book-open' : 'briefcase'}" class="w-3.5 h-3.5 ${exp.isLearning ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}"></i>
              <span>${exp.isLearning ? '学習内容' : '担当業務'} : ${escapeHtml(exp.title)}</span>
            </div>`
                : ''
            }

            <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-0.5">
              ${escapeHtml(exp.summary)}
            </p>
          </div>
          ${initiativeHtml}
        </div>`;
    })
    .join('\n');

  const strengthsHtml =
    profile.strengths && profile.strengths.length > 0
      ? `
      <div class="bg-white dark:bg-stone-900/80 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="sparkles" class="w-4 h-4 text-emerald-700 dark:text-emerald-400"></i>
            <h3 class="text-sm font-bold text-stone-900 dark:text-stone-100">強み・仕事で大切にしている4つの軸</h3>
          </div>
          <span class="text-[11px] font-mono text-stone-400">Core Strengths</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          ${profile.strengths
            .map(
              (item) => `
            <div class="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 space-y-1.5">
              <div class="font-bold text-stone-900 dark:text-stone-100">${escapeHtml(item.title)}</div>
              <p class="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">${escapeHtml(item.description)}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>`
      : '';

  return `<!DOCTYPE html>
<html lang="ja" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(profile.name)} - ${escapeHtml(profile.title)}</title>
  <meta name="description" content="${escapeHtml(profile.catchphrase)}">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; letter-spacing: -0.01em; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
  </style>
</head>
<body class="bg-[#fafaf9] text-stone-900 dark:bg-[#161615] dark:text-stone-100 min-h-screen transition-colors duration-200">

  <!-- Top Navigation with Page Switcher -->
  <header class="sticky top-0 z-40 bg-[#fafaf9]/90 dark:bg-[#161615]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
      <a href="#hero" class="text-base font-semibold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-500"></span>
        <span>${escapeHtml(profile.name)}</span>
        <span class="text-xs font-normal text-stone-400 dark:text-stone-500 hidden sm:inline">/ Portfolio</span>
      </a>

      <!-- Page Switcher Tabs: 職歴と主な取り組み (左), スキル・強み (右) -->
      <nav class="flex items-center p-1 rounded-xl bg-stone-200/70 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-800 text-xs font-medium">
        <button id="nav-btn-experience" onclick="switchPage('experience')" class="px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs">
          職歴と主な取り組み
        </button>
        <button id="nav-btn-skills" onclick="switchPage('skills')" class="px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200">
          スキル・強み
        </button>
      </nav>

      <div class="flex items-center gap-2.5 shrink-0">
        <button onclick="window.print()" class="px-3 py-1.5 text-xs font-medium rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors flex items-center gap-1.5">
          <i data-lucide="printer" class="w-3.5 h-3.5 text-stone-500"></i>
          <span class="hidden sm:inline">印刷 / PDF</span>
        </button>
        <button onclick="toggleDarkMode()" class="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors" title="テーマ切り替え">
          <i data-lucide="moon" class="w-4 h-4 dark:hidden"></i>
          <i data-lucide="sun" class="w-4 h-4 hidden dark:inline"></i>
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-6 py-10 space-y-10">

    <!-- 1. Hero Section (ファーストビュー・職歴ページで表示) -->
    <section id="hero" class="pt-4 pb-6 border-b border-stone-200/80 dark:border-stone-800/80">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-8 space-y-4">
          <div class="flex items-center gap-3 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span class="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
              <i data-lucide="compass" class="w-3.5 h-3.5"></i>
              <span>実務経験 約${profile.experienceYears}年</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>私立大学 経済学部卒</span>
            <span aria-hidden="true">·</span>
            <span>オンライン面接・自己紹介用</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            ${escapeHtml(profile.name)}
          </h1>

          <p class="text-base sm:text-lg font-medium text-emerald-800 dark:text-emerald-400">
            ${escapeHtml(profile.title)}
          </p>

          <p class="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base max-w-2xl">
            ${escapeHtml(profile.catchphrase)}
          </p>

          <!-- Keywords -->
          <div class="pt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-300">
            <span class="text-stone-400 dark:text-stone-500">大切にしているキーワード :</span>
            ${profile.keywords.map(kw => `<span class="text-stone-800 dark:text-stone-200 font-semibold"># ${escapeHtml(kw)}</span>`).join('<span class="text-stone-300 dark:text-stone-700">/</span>')}
          </div>

          <!-- Links -->
          <div class="pt-3 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            ${profile.links.blog ? `<a href="${escapeHtml(profile.links.blog)}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"><i data-lucide="book-open" class="w-3.5 h-3.5 text-emerald-600"></i><span>ブログ (${escapeHtml(profile.links.blog.replace('https://', ''))})</span></a>` : ''}
            ${profile.links.email ? `<a href="mailto:${escapeHtml(profile.links.email)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-mono text-xs"><i data-lucide="mail" class="w-3.5 h-3.5 text-stone-400"></i><span>${escapeHtml(profile.links.email)}</span></a>` : ''}
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 rounded-xl">
              <i data-lucide="award" class="w-3.5 h-3.5 text-stone-500 shrink-0"></i>
              <span>保有資格: ${escapeHtml(qualificationsSummary)}</span>
            </span>
          </div>
        </div>

        <!-- 30-Second Overview Card -->
        <div class="lg:col-span-4 bg-white/80 dark:bg-stone-900/70 border border-stone-200/90 dark:border-stone-800/90 rounded-2xl p-5 space-y-3 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-stone-600 dark:text-stone-400">はじめに / 私の強み</span>
            <span class="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Overview</span>
          </div>
          <p class="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            大手製薬メーカーでの約15年の経理実務で磨いた「正確な事務処理力」を基盤に、Web制作・EC広告運用・広報IRと幅広い分野を経験してきた適応力が強みです。現職では昇降機の修理・保守工事に関する<strong>見積書作成や発注データの入力などの支店業務支援</strong>を担当しています。
          </p>
          <div class="pt-2.5 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
            大切にしている姿勢 : 堅実な実務 × 丁寧な確認と継続的な学び
          </div>
        </div>
      </div>
    </section>

    <!-- Page: 職歴と主な取り組み (ExperienceSection) -->
    <section id="page-experience" class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <span class="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400">Career &amp; Works</span>
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mt-0.5">職歴と主な取り組み</h2>
        </div>
        <span class="text-xs text-stone-500 dark:text-stone-400">実務経験の変遷と、各社で工夫・実践してきた内容（社名等は一部伏せて記載）</span>
      </div>

      <div class="relative border-l-2 border-stone-200 dark:border-stone-800 ml-3 sm:ml-4 space-y-8 pl-6 sm:pl-8">
        ${careerHtml}
      </div>
    </section>

    <!-- Page: スキル・強み (SkillsSection) -->
    <section id="page-skills" class="space-y-6 hidden">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <span class="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400">Skills &amp; Capabilities</span>
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mt-0.5">スキル・強み</h2>
        </div>
        <span class="text-xs text-stone-500 dark:text-stone-400">経理・支店業務支援・広報・Web制作・広告運用と保有資格の体系</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div class="lg:col-span-5 bg-white dark:bg-stone-900/80 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-bold text-stone-900 dark:text-stone-100">スキル総合バランス</h3>
              <span class="text-xs text-stone-400">レーダーチャート</span>
            </div>
            <div class="relative w-full aspect-square max-h-[320px] mx-auto flex items-center justify-center">
              <canvas id="standaloneRadarChart"></canvas>
            </div>
          </div>
          <p class="text-xs text-stone-500 dark:text-stone-400 text-center mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80">
            正確な事務処理力と、デジタル活用・改善推進力のバランスを可視化しています。
          </p>
        </div>

        <div class="lg:col-span-7 bg-white dark:bg-stone-900/80 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div class="space-y-2.5">
            <div class="flex items-center gap-1.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-700"></i>
              <h4 class="text-xs font-bold text-stone-900 dark:text-stone-100">実務・事務処理・広報スキル</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${profile.skills.ready.map(s => `
                <div class="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40">
                  <div class="font-semibold text-stone-900 dark:text-stone-100">${escapeHtml(s.name)}</div>
                  <div class="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">${escapeHtml(s.note || '')}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center gap-1.5">
              <i data-lucide="wrench" class="w-4 h-4 text-stone-500"></i>
              <h4 class="text-xs font-bold text-stone-900 dark:text-stone-100">Web制作・デジタルマーケティング・ツール</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${profile.skills.experienced.map(s => `
                <div class="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40">
                  <div class="font-semibold text-stone-900 dark:text-stone-100">${escapeHtml(s.name)}</div>
                  <div class="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">${escapeHtml(s.note || '')}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center gap-1.5">
              <i data-lucide="award" class="w-4 h-4 text-emerald-700"></i>
              <h4 class="text-xs font-bold text-stone-900 dark:text-stone-100">保有資格</h4>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${profile.skills.learning.map(s => `
                <div class="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40">
                  <div class="font-semibold text-stone-900 dark:text-stone-100">${escapeHtml(s.name)}</div>
                  <div class="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">${escapeHtml(s.note || '')}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      ${strengthsHtml}
    </section>

  </main>

  <footer class="mt-16 border-t border-stone-200/80 dark:border-stone-800 py-8 text-center text-xs text-stone-500 dark:text-stone-400">
    <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>${escapeHtml(profile.title)} - Portfolio &amp; Profile</div>
      <div>Designed for clean presentation &amp; screen sharing</div>
    </div>
  </footer>

  <script>
    lucide.createIcons();

    function toggleDarkMode() {
      document.documentElement.classList.toggle('dark');
      updateChartTheme();
    }

    let currentTab = 'experience';
    function switchPage(tab) {
      currentTab = tab;
      const hero = document.getElementById('hero');
      const pageExp = document.getElementById('page-experience');
      const pageSkills = document.getElementById('page-skills');

      const navExp = document.getElementById('nav-btn-experience');
      const navSkills = document.getElementById('nav-btn-skills');

      const activeNavClasses = ['bg-white', 'dark:bg-stone-800', 'text-emerald-800', 'dark:text-emerald-300', 'font-bold', 'shadow-xs'];
      const inactiveNavClasses = ['text-stone-600', 'dark:text-stone-400'];

      if (tab === 'experience') {
        if (hero) hero.classList.remove('hidden');
        pageExp.classList.remove('hidden');
        pageSkills.classList.add('hidden');

        navExp.classList.add(...activeNavClasses);
        navExp.classList.remove(...inactiveNavClasses);
        navSkills.classList.remove(...activeNavClasses);
        navSkills.classList.add(...inactiveNavClasses);
      } else {
        if (hero) hero.classList.add('hidden');
        pageExp.classList.add('hidden');
        pageSkills.classList.remove('hidden');

        navSkills.classList.add(...activeNavClasses);
        navSkills.classList.remove(...inactiveNavClasses);
        navExp.classList.remove(...activeNavClasses);
        navExp.classList.add(...inactiveNavClasses);

        if (!radarChartInstance) {
          initRadarChart();
        }
      }
    }

    let radarChartInstance = null;
    function initRadarChart() {
      const ctx = document.getElementById('standaloneRadarChart');
      if (!ctx) return;
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#d6d3d1' : '#44403c';
      const gridColor = isDark ? 'rgba(214, 211, 209, 0.12)' : 'rgba(120, 113, 108, 0.18)';

      radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ${radarLabels},
          datasets: [{
            label: 'スキル総合評価',
            data: ${radarValues},
            backgroundColor: 'rgba(46, 125, 90, 0.22)',
            borderColor: '#2e7d5a',
            borderWidth: 2,
            pointBackgroundColor: '#2e7d5a',
            pointRadius: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            r: {
              angleLines: { color: gridColor },
              grid: { color: gridColor },
              pointLabels: {
                color: textColor,
                font: { family: 'Plus Jakarta Sans', size: 11, weight: 600 }
              },
              ticks: { display: false, stepSize: 20 },
              suggestedMin: 50,
              suggestedMax: 100
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    }

    function updateChartTheme() {
      if (!radarChartInstance) return;
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#d6d3d1' : '#44403c';
      const gridColor = isDark ? 'rgba(214, 211, 209, 0.12)' : 'rgba(120, 113, 108, 0.18)';
      radarChartInstance.options.scales.r.pointLabels.color = textColor;
      radarChartInstance.options.scales.r.grid.color = gridColor;
      radarChartInstance.options.scales.r.angleLines.color = gridColor;
      radarChartInstance.update();
    }

    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.hash === '#skills') {
        switchPage('skills');
      }
    });
  </script>
</body>
</html>`;
}
