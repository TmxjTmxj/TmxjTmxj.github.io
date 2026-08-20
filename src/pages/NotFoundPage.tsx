/** 404 - styled to match the rest of the site. */
import { useI18n } from '../i18n/context';
import { useProfile } from '../i18n/use-content';
import { usePageMeta } from '../lib/seo';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const { t } = useI18n();
  const profile = useProfile();

  usePageMeta({
    title: t.seo.notFoundTitle(profile.name),
    description: 'Page not found',
    path: '/404',
    author: profile.name,
  });

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center pb-20 pt-28 text-center">
      <p className="font-mono text-7xl font-bold text-accent sm:text-8xl" aria-hidden="true">
        {t.notFound.title}
      </p>
      <h1 className="mt-4 text-xl font-semibold">{t.notFound.message}</h1>
      <p className="mt-2 font-mono text-sm text-ink-muted">
        $ cd ~ &amp;&amp; rm -rf /this/route
      </p>
      <Button to="/" size="lg" className="mt-8">
        {t.notFound.backHome}
      </Button>
    </div>
  );
}
