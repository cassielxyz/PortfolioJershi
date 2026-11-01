export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: string;
  responsibilities: string[];
  techStack: string[];
  highlightBadge?: string;
  architectureDetails?: {
    summary: string;
    outcomes: string[];
    keyDeliverable: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  description: string;
  longDescription?: string;
  features: string[];
  architecturePoints?: string[];
  techStack: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  gradient: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period?: string;
  score: string;
  scoreType: string;
  isHonors?: boolean;
  details: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  highlights: string[];
  skills: string[];
}
