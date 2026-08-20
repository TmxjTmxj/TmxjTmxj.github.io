/** Skills - grouped cards with honest proficiency tags, no fake percentages. */
import { Bot, BrainCircuit, Code2, DraftingCompass, Wrench } from 'lucide-react';
import type { ComponentType } from 'react';
import { copy, siteConfig } from '../data/site';
import { skillGroups, currentlyExploring } from '../data/skills';
import type { SkillGroup, SkillLevel } from '../types';
import { usePageMeta } from '../lib/seo';
import { Badge } from '../components/ui/Badge';
import { Reveal } from '../components/ui/Reveal';

const groupIcons: Record<SkillGroup['icon'], ComponentType<{ className?: string }>> = {
  ai: BrainCircuit,
  robotics: Bot,
  programming: Code2,
  engineering: DraftingCompass,
  tools: Wrench,
};

export function SkillsPage() {
  usePageMeta({
    title: `Skills · ${siteConfig.author}`,
    description: 'Technologies and domains: AI agents, robotics, programming, engineering and tooling.',
    path: '/skills',
    image: siteConfig.ogImage,
  });

  return (
    <div className="container-page pb-20 pt-28 sm:pt-32">
      <header className="max-w-2xl">
        <p className="section-label mb-2">skills</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.skills.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{copy.skills.subtitle}</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = groupIcons[group.icon];
          return (
            <Reveal key={group.id} delayMs={i * 60}>
              <div className="card card-hover h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-accent-soft p-2.5 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-bold tracking-tight">{group.title}</h2>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-3">
                      <span className="text-[15px] text-ink-soft">{skill.name}</span>
                      {skill.level && (
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                          {copy.skills.level[skill.level as SkillLevel]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}

        <Reveal delayMs={skillGroups.length * 60}>
          <div className="card h-full border-dashed p-6">
            <p className="section-label mb-3">{copy.skills.exploringLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {currentlyExploring.map((topic) => (
                <Badge key={topic}>{topic}</Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
