/** Home preview of skill groups - compact chips per domain + link. */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { copy } from '../../data/site';
import { skillGroups } from '../../data/skills';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Badge } from '../ui/Badge';

export function SkillsPreview() {
  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="skills-preview-title">
      <Reveal>
        <SectionHeading
          id="skills-preview-title"
          label="skills"
          title={copy.home.skillsTitle}
        />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delayMs={i * 60}>
            <div className="card card-hover h-full p-5">
              <h3 className="font-mono text-sm font-medium text-accent">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 text-center">
        <Link
          to="/skills"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          {copy.home.viewAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
