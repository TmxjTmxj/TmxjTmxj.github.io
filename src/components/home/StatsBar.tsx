/** Quick metrics under the hero - config-driven (src/data/profile.ts). */
import { useProfile } from '../../i18n/use-content';

export function StatsBar() {
  const profile = useProfile();
  return (
    <section aria-label="Quick stats" className="border-b border-line bg-surface">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="relative pl-4">
            <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-[3px] bg-accent/15" aria-hidden="true" />
            <p className="metric-num">{stat.value}</p>
            <p className="metric-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
