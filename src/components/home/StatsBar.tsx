/** Quick metrics under the hero - fully config-driven (src/data/profile.ts). */
import { useProfile } from '../../i18n/use-content';

export function StatsBar() {
  const profile = useProfile();
  return (
    <section aria-label="Quick stats" className="border-b border-line bg-surface">
      <div className="container-page grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-mono text-3xl font-semibold text-ink sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
