import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { copy, navLinks } from '../../data/site';
import { profile } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="font-mono text-[15px] font-medium">
            <span className="text-accent">~/</span>
            {profile.name.toLowerCase().replace(/\s+/g, '-')}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">{profile.tagline}</p>
          <p className="mt-3 font-mono text-xs text-ink-muted">{copy.footer.tagline}</p>
        </div>

        {/* Nav */}
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-ink-muted transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-muted sm:flex-row">
          <p>
            © {year} {profile.name}. {copy.footer.copyright}
          </p>
          <p className="font-mono">
            {copy.footer.builtWith} · {copy.footer.hostedOn}
          </p>
        </div>
      </div>
    </footer>
  );
}
