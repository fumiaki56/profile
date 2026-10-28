export interface QuantitativeMetric {
  label: string;
  value: string;
}

export interface ProjectStar {
  id: string;
  title: string;
  period: string;
  role: string;
  metrics: QuantitativeMetric[];
  situation: string; // 課題・背景 (Problem)
  task: string;      // 自身の役割・目標 (Task)
  action: string;    // 具体的なアプローチ・施策 (Action)
  result: string;    // 成果・定量的インパクト (Result)
  keyTakeaway?: string; // (任意)
  techTags: string[];
}

export interface SkillItem {
  name: string;
  note?: string;
  tagColor?: string;
}

export interface SkillStackGroup {
  ready: SkillItem[];       // 即戦力 / 設計・リード可能
  experienced: SkillItem[]; // 実務経験あり
  learning: SkillItem[];    // キャッチアップ中 / 検証中
}

export interface CareerItem {
  period: string;
  company: string;
  department: string;
  title: string;
  summary: string;
  highlightAchievements: string[];
}

export interface ProfileData {
  id: string;
  roleLabel: string;
  name: string;
  title: string;
  catchphrase: string;
  experienceYears: number;
  keywords: string[];
  links: {
    github?: string;
    linkedin?: string;
    wantedly?: string;
    blog?: string;
    email?: string;
  };
  now: {
    focusTitle: string;
    mainProject: {
      name: string;
      role: string;
      summary: string;
      tech: string[];
    };
    learning: {
      topic: string;
      reason: string;
      practicalApplication: string;
    };
    internalContribution: {
      title: string;
      outcome: string;
    };
  };
  radar: {
    labels: string[];
    values: number[]; // 0 - 100
  };
  skills: SkillStackGroup;
  projects: ProjectStar[];
  career: CareerItem[];
}
