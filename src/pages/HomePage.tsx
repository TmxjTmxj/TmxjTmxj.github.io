/**
 * Home page - assembled in the exact order a recruiter scans:
 * who → what I build → best projects → experience → skills →
 * open source → about → contact.
 */
import { useI18n } from '../i18n/context';
import { useProfile } from '../i18n/use-content';
import { usePageMeta } from '../lib/seo';
import { Hero } from '../components/home/Hero';
import { StatsBar } from '../components/home/StatsBar';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { ExperiencePreview } from '../components/home/ExperiencePreview';
import { SkillsPreview } from '../components/home/SkillsPreview';
import { GitHubStats } from '../components/home/GitHubStats';
import { AboutPreview } from '../components/home/AboutPreview';
import { ContactSection } from '../components/home/ContactSection';

export function HomePage() {
  const { t } = useI18n();
  const profile = useProfile();

  usePageMeta({
    title: t.seo.homeTitle,
    description: t.seo.homeDescription,
    path: '/',
    image: '/og/og-image.png',
    author: profile.name,
  });

  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedProjects />
      <ExperiencePreview />
      <SkillsPreview />
      <GitHubStats />
      <AboutPreview />
      <ContactSection />
    </>
  );
}
