import React, { useEffect, useRef } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { CheckCircle2, Award, Wrench } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

// Register Chart.js components
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SkillsSectionProps {
  radar: ProfileData['radar'];
  skills: ProfileData['skills'];
  isDark: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  radar,
  skills,
  isDark,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const textColor = isDark ? '#d6d3d1' : '#44403c';
    const gridColor = isDark ? 'rgba(214, 211, 209, 0.12)' : 'rgba(120, 113, 108, 0.18)';

    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: radar.labels,
        datasets: [
          {
            label: 'スキル総合評価',
            data: radar.values,
            backgroundColor: 'rgba(46, 125, 90, 0.22)',
            borderColor: '#2e7d5a',
            borderWidth: 2,
            pointBackgroundColor: '#2e7d5a',
            pointBorderColor: isDark ? '#1c1917' : '#ffffff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: '#2e7d5a',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 500,
        },
        scales: {
          r: {
            angleLines: {
              color: gridColor,
            },
            grid: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor,
              font: {
                family: 'Plus Jakarta Sans',
                size: 11,
                weight: 600,
              },
              callback: (label) => label,
            },
            ticks: {
              display: false,
              stepSize: 20,
            },
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => ` バランス目安: ${context.raw}点 / 100点`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [radar, isDark]);

  return (
    <section id="skills" className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <span className="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400">
            Skills &amp; Capabilities
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mt-0.5">
            スキル・強み
          </h2>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          実務処理能力と、AI活用・保有資格の体系
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Chart.js Radar Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900/80 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                スキル総合バランス
              </h3>
              <span className="text-xs text-stone-400">レーダーチャート</span>
            </div>

            <div className="relative w-full aspect-square max-h-[320px] mx-auto flex items-center justify-center">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 text-center mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80">
            正確な事務処理力と、自発的な改善推進力のバランスを可視化しています。
          </p>
        </div>

        {/* Right: Pure Skills without Career duplication */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900/80 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          {/* Category 1: 業務推進・事務処理スキル */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                実務・事務処理スキル
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skills.ready.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40"
                >
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    {skill.name}
                  </div>
                  {skill.note && (
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                      {skill.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: デジタル・Web・業務改善スキル */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-stone-500" />
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                デジタル・Web・業務改善スキル
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skills.experienced.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40"
                >
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    {skill.name}
                  </div>
                  {skill.note && (
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                      {skill.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Category 3: AI活用・保有資格 */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                AI活用・保有資格
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skills.learning.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40"
                >
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    {skill.name}
                  </div>
                  {skill.note && (
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                      {skill.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
