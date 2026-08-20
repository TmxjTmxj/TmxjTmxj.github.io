/**
 * Shared domain types for the portfolio data layer.
 * Every piece of recruiter-facing content is typed here.
 */

export type Category =
  | 'ai-agents'
  | 'robotics'
  | 'engineering'
  | 'software'
  | 'research'
  | 'open-source';

export type ProjectStatus = 'active' | 'maintained' | 'wip' | 'archived';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

/** Problem -> Analysis -> Solution -> Result, one card each. */
export interface Challenge {
  challenge: string;
  analysis: string;
  solution: string;
  result: string;
}

export interface ProjectArchitecture {
  type: 'image' | 'mermaid';
  /** Path to image/svg (when type === 'image') */
  src?: string;
  alt?: string;
  /** Mermaid source (when type === 'mermaid') */
  code?: string;
  caption?: string;
}

export interface Project {
  title: string;
  slug: string;
  /** One sentence: what the project solves. */
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  categories: Category[];
  tags: string[];
  technologies: string[];
  github?: string;
  /** "owner/repo" - enables GitHub API enhancement (stars/forks/language). */
  githubRepo?: string;
  demo?: string;
  docs?: string;
  featured: boolean;
  year: string;
  role: string;
  /** Why the project exists. */
  background: string;
  problem: string;
  solution: string;
  highlights: string[];
  architecture?: ProjectArchitecture;
  challenges?: Challenge[];
  gallery?: GalleryImage[];
  /** Measurable outcomes. */
  results?: string[];
  status?: ProjectStatus;
  /** Marks template content that must be replaced with real data. */
  isPlaceholder?: boolean;
}

export type ExperienceType =
  | 'Internship'
  | 'Research'
  | 'Project'
  | 'Organization'
  | 'Competition';

export interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  type: ExperienceType;
  location?: string;
  summary: string;
  /** Responsibility / achievement / result bullets. */
  points: string[];
  tech?: string[];
  link?: string;
  isPlaceholder?: boolean;
}

export type SkillLevel = 'core' | 'advanced' | 'familiar';

export interface Skill {
  name: string;
  level?: SkillLevel;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Lucide icon key, resolved in the Skills components. */
  icon: 'ai' | 'robotics' | 'programming' | 'engineering' | 'tools';
  skills: Skill[];
}

export interface ProfileStat {
  value: string;
  label: string;
}
