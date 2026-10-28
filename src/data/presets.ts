import { ProfileData } from '../types/portfolio';

export const PRESET_PROFILES: Record<string, ProfileData> = {
  backend: {
    id: 'backend',
    roleLabel: '業務改善・営業事務 / 生成AI活用',
    name: 'プロフィール & ポートフォリオ',
    title: '業務改善・営業事務 / 生成AI活用担当',
    catchphrase: '約15年の経理実務で培った正確な事務処理力を土台に、生成AIを活用して現場の「困りごと」を動くWebプロトタイプとして形にし、業務改善を提案・推進しています。',
    experienceYears: 20,
    keywords: ['生成AIによる業務改善', '見積積算・営業事務', '経理実務15年 (請求書/伝票)', 'Web制作・広報発信'],
    links: {
      blog: 'https://fu-mi-blog.com',
      email: 'admin@fu-mi-blog.com',
    },
    now: {
      focusTitle: '見積作成の確認負荷を減らすための工程分析と、生成AIを活用したWebアプリプロトタイプの作成・提案',
      mainProject: {
        name: '昇降機保守工事の見積作成をサポートするWebアプリ（プロトタイプ）',
        role: '業務課 担当 / 業務分析・AIプロトタイプ作成・改善提案',
        summary: '日々の昇降機修理・保守見積における材料単価や外注費の検索、作業時間や取替調整費の計算負担を軽減するため、AIに指示を出して情報集約と計算補助を行うプロトタイプ画面を作成し、上長へ改善案を提案しました。',
        tech: ['生成AI (Gemini)', 'Webプロトタイプ作成', '見積積算', '業務工程の分析'],
      },
      learning: {
        topic: '日常業務の工程整理と、生成AIによる作業ステップの省力化検証',
        reason: '検索・計算・転記などの二重確認を無理なく減らし、現場の手順に沿った使いやすい仕組みをつくるため。',
        practicalApplication: '材料単価や外注費をスムーズに確認・入力できる画面構成を検討し、社内共有を行っています。',
      },
      internalContribution: {
        title: '発注依頼書の施工データ入力と、関係者間でのスムーズな情報共有',
        outcome: '施工日や施工条件などの正確なデータ入力を徹底し、営業担当者やフィールドサービス（FS）との円滑な連携を支えています。',
      },
    },
    radar: {
      labels: ['正確な事務・データ処理', '生成AI活用・プロトタイプ', '業務の工程分析・課題発見', '見積積算・原価確認', '情報発信・Webサイト更新', '周囲との丁寧な連携'],
      values: [96, 90, 88, 92, 84, 88],
    },
    skills: {
      ready: [
        { name: '経理事務・伝票照合', note: '請求書の金額・取引情報の精査、伝票入力、ミスの未然防止' },
        { name: '見積積算・原価確認', note: '材料費・外注費の確認、取替調整費や作業時間の計算支援' },
        { name: 'データ入力・営業支援', note: '発注依頼書の施工条件データ入力、動静表の確認共有' },
        { name: '広報・IR関連実務', note: 'プレスリリース配信、メディア掲載収集、効果測定' },
      ],
      experienced: [
        { name: 'コーポレートサイト情報更新', note: '社内外向けの情報整理、お知らせ・環境施策の発信' },
        { name: 'Web制作・Photoshop画像加工', note: '写真の切り抜き・色調補正・バナー作成、レイアウト調整' },
        { name: '業務フローの整理・課題分析', note: '作業工程の分解、手順の可視化と改善ポイントの整理' },
        { name: '定型業務の正確な継続遂行', note: '長年の実務を通じた確認手順の徹底と信頼構築' },
      ],
      learning: [
        { name: '生成AIプロトタイプ作成 (Gemini)', note: '現場の困りごとをAIに伝えてWeb画面を試作・上長へ改善提案' },
        { name: '危険物取扱者 乙種第4類', note: '国家資格（基礎物理化学・法令・危険物の安全管理）' },
        { name: '第三級陸上特殊無線技士', note: '国家資格（電波法規・無線通信の基礎知識）' },
      ],
    },
    projects: [],
    career: [
      {
        period: '2025年10月 - 現在 (約1年)',
        company: '大手電機メーカー系 総合ビル管理・ファシリティ企業',
        department: '支店 業務課',
        title: '業務課 担当',
        summary: '昇降機の修理・保守工事に関する見積積算、営業支援、発注依頼書のデータ入力（施工日・施工条件など）、動静表の確認などを担当。現場の作業負荷に着目し、生成AIを活用したWebアプリプロトタイプを作成して上長へ改善提案を実施。',
        highlightAchievements: [],
      },
      {
        period: '約2年半',
        company: '大手総合リース企業',
        department: '広報・IR担当',
        title: '広報・IR担当',
        summary: 'プレスリリース配信関連業務、新聞・Webメディア掲載情報の収集・クリッピング、コーポレートサイトの情報更新、広報効果測定、環境施策の発信などを担当。',
        highlightAchievements: [],
      },
      {
        period: '約1年半',
        company: '社会課題解決型ベンチャー企業（就労支援・Web事業）',
        department: 'Web制作担当',
        title: 'Web制作・デザイン業務',
        summary: 'Web制作・デザイン関連業務およびPhotoshopを使用した画像加工・デザイン補助業務に従事。',
        highlightAchievements: [],
      },
      {
        period: '約15年間',
        company: '国内大手製薬メーカー（東証プライム上場）',
        department: '経理部',
        title: '経理担当',
        summary: '請求書処理、伝票入力、経理関連の事務処理を担当。金額や取引情報を扱う定型業務を長期間にわたりミスなく正確に遂行。',
        highlightAchievements: [],
      },
      {
        period: '卒業',
        company: '私立大学 経済学部',
        department: '経済学科',
        title: '',
        summary: '経済学の基礎およびビジネス教養を修得。',
        highlightAchievements: [],
      },
    ],
  },
};
