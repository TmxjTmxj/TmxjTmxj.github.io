/**
 * Home page - assembled in the exact order a recruiter scans:
 * who → what I build → best projects → experience → skills →
 * open source → about → contact.
 */
import { usePageMeta } from '../lib/seo';
import { siteConfig } from '../data/site';
import { Hero } from '../components/home/Hero';
import { StatsBar } from '../components/home/StatsBar';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { ExperiencePreview } from '../components/home/ExperiencePreview';
import { SkillsPreview } from '../components/home/SkillsPreview';
import { GitHubStats } from '../components/home/GitHubStats';
import { AboutPreview } from '../components/home/AboutPreview';
import { ContactSection } from '../components/home/ContactSection';

export function HomePage() {
  usePageMeta({
    title: siteConfig.title,
    description: siteConfig.description,
    path: '/',
    image: siteConfig.ogImage,
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
