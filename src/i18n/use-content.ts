/**
 * Localized content selectors.
 * ---------------------------------------------------------------
 * English data (src/data/*.ts) is the single source of truth; when the
 * active language is zh, the overrides in src/i18n/zh-content.ts are
 * shallow-merged on top. Components consume content ONLY through these
 * hooks, so switching language re-renders the whole tree consistently.
 */
import { useMemo } from 'react';
import { useI18n } from './context';
import { profile as enProfile } from '../data/profile';
import {
  projects as enProjects,
  featuredProjects as enFeatured,
  getProject as getEnProject,
  allCategories as enCategories,
} from '../data/projects';
import { experiences as enExperiences } from '../data/experience';
import {
  skillGroups as enSkillGroups,
  currentlyExploring as enExploring,
} from '../data/skills';
import {
  zhProfile,
  zhProjects,
  zhExperiences,
  zhSkillGroups,
  zhExploring,
} from './zh-content';
import type { Project, ExperienceItem, SkillGroup, Category } from '../types';

export function useProfile() {
  const { lang } = useI18n();
  return useMemo(() => {
    if (lang === 'zh') return { ...enProfile, ...zhProfile };
    return enProfile;
  }, [lang]);
}

export function useProjects(): Project[] {
  const { lang } = useI18n();
  return useMemo(() => {
    if (lang === 'en') return enProjects;
    return enProjects.map((p) => ({ ...p, ...(zhProjects[p.slug] ?? {}) }));
  }, [lang]);
}

export function useFeaturedProjects(): Project[] {
  const { lang } = useI18n();
  return useMemo(() => {
    if (lang === 'en') return enFeatured;
    return enFeatured.map((p) => ({ ...p, ...(zhProjects[p.slug] ?? {}) }));
  }, [lang]);
}

export function useProject(slug: string | undefined): Project | undefined {
  const { lang } = useI18n();
  return useMemo(() => {
    const base = slug ? getEnProject(slug) : undefined;
    if (!base) return undefined;
    if (lang === 'en') return base;
    return { ...base, ...(zhProjects[base.slug] ?? {}) };
  }, [lang, slug]);
}

export function useAllCategories(): Category[] {
  return enCategories; // category keys are language-neutral
}

export function useExperiences(): ExperienceItem[] {
  const { lang } = useI18n();
  return lang === 'zh' ? zhExperiences : enExperiences;
}

export function useSkillGroups(): SkillGroup[] {
  const { lang } = useI18n();
  return lang === 'zh' ? zhSkillGroups : enSkillGroups;
}

export function useCurrentlyExploring(): string[] {
  const { lang } = useI18n();
  return lang === 'zh' ? zhExploring : enExploring;
}
