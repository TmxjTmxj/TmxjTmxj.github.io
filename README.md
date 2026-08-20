# Developer Portfolio

A recruiter-focused developer portfolio built with **React + TypeScript + Vite**, designed for GitHub Pages (`username.github.io`). The goal: a hiring manager or engineer understands *who you are, what you build, and why they should interview you* within 20–30 seconds.

**Personal Developer Portfolio + GitHub Project Showcase + Online Resume** — project work is the centerpiece, not biography.

![Stack](https://img.shields.io/badge/React-19-0969da) ![TS](https://img.shields.io/badge/TypeScript-5-0969da) ![Vite](https://img.shields.io/badge/Vite-7-0969da) ![Tailwind](https://img.shields.io/badge/Tailwind-4-0969da)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Content Guide](#content-guide)
  - [Update Your Profile](#update-your-profile)
  - [Add a New Project](#add-a-new-project)
  - [Add Project Screenshots](#add-project-screenshots)
  - [Update Your Resume](#update-your-resume)
  - [GitHub Statistics](#github-statistics)
  - [SEO / Social Preview](#seo--social-preview)
  - [Analytics (optional)](#analytics-optional)
- [Build](#build)
- [Deploy to GitHub Pages](#deploy-to-github-pages)
- [Custom Domain](#custom-domain)
- [Project Page Repos (username.github.io/repo)](#project-page-repos-usernamesgithubiorepo)
- [Internationalization (EN / 中文)](#internationalization-en--中文)
- [Quality Checks](#quality-checks)

---

## Features

- **Hero** with a typed terminal, quick stats bar, three CTAs (Projects / Resume / GitHub)
- **Featured Projects** — large Problem → Solution → Highlights cards
- **Projects page** with full-text **search** + **category filters** (URL-synced, shareable)
- **Project Detail / Case Study** pages (`/projects/slug`): Overview, Background, Problem, Solution, Architecture (SVG/image or lazy-loaded Mermaid), My Role, Key Features, Engineering Challenges (Challenge → Analysis → Solution → Result), Results, screenshot **gallery with lightbox** (keyboard: `Esc`, `←`, `→`), repository CTA, prev/next navigation
- **Experience timeline** (Internship / Research / Project / Organization / Competition)
- **Skills** grouped by domain with honest proficiency tags — no fake percentage bars
- **GitHub statistics** section fed by the GitHub Public API — *enhancement only*; the site renders perfectly without it, and nothing is faked
- **About** (interests / working on / looking for), **Resume** page (View + Download PDF), **Contact** (mailto-based, no backend form)
- **Light / Dark / System theme**, persisted in `localStorage`, no flash on load
- **SEO**: per-route titles/descriptions, Open Graph + Twitter cards, JSON-LD Person, `sitemap.xml`, `robots.txt`, canonical URLs, generated social preview image
- **Custom 404 page** + SPA refresh recovery on GitHub Pages (deep links like `/projects/slug` survive refresh)
- **Accessibility**: semantic HTML, skip link, ARIA labels, keyboard navigation, visible focus states, `prefers-reduced-motion` respected everywhere
- **Performance**: code splitting (Mermaid only loads on pages that need it), lazy images, self-hosted variable fonts, no heavy animation libraries
- **Responsive** across 375 / 768 / 1024 / 1440+ viewports

## Tech Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | React 19 + TypeScript (strict)                |
| Build      | Vite 7                                        |
| Routing    | React Router 7 (BrowserRouter)                |
| Styling    | Tailwind CSS 4 (design tokens in `theme.css`) |
| Icons      | Lucide                                        |
| Fonts      | Inter Variable + JetBrains Mono (self-hosted) |
| Diagrams   | Mermaid (lazy-loaded, optional)               |
| Deploy     | GitHub Actions → GitHub Pages                 |

No backend, no build-time data fetching — 100% static output in `dist/`.

## Project Structure

```
├── .github/workflows/deploy.yml   # git push -> build -> deploy Pages
├── index.html                     # SEO meta, theme pre-paint, SPA recovery
├── vite.config.ts                 # base path config (VITE_BASE)
├── public/
│   ├── avatar/                    # avatar.svg (replace with your photo)
│   ├── og/og-image.png            # social share preview (regenerate after branding)
│   ├── icons/icon-512.png         # PWA icon
│   ├── resume/resume.pdf          # ← YOUR RESUME GOES HERE
│   ├── projects/<slug>/           # one folder per project
│   ├── robots.txt / sitemap.xml / manifest.webmanifest / favicon.svg
│   └── .nojekyll
├── scripts/
│   ├── postbuild.mjs              # 404.html + base-path finalization
│   ├── make-placeholder-assets.mjs  # regenerates placeholder SVGs
│   ├── make-resume.mjs            # regenerates placeholder resume.pdf
│   └── og-card.html               # source of og-image.png
└── src/
    ├── data/                      # ★ ALL content lives here
    │   ├── profile.ts             # name, links, tagline, stats, interests
    │   ├── projects.ts            # every project object
    │   ├── experience.ts          # timeline
    │   ├── skills.ts              # skill groups
    │   └── site.ts                # site URL, analytics config, ALL UI copy
    ├── components/                # layout / ui / home / projects / analytics
    ├── hooks/                     # useTheme, useTypewriter
    ├── lib/                       # seo, github API client, utils
    └── pages/                     # one file per route
```

## Local Development

```bash
npm install
npm run dev        # http://localhost:5173
```

Other commands:

```bash
npm run build      # typecheck + production build + postbuild (dist/)
npm run preview    # serve dist/ locally at http://localhost:4173
npm run lint       # ESLint
```

Requires Node ≥ 20.

## Content Guide

The site is **fully data-driven**. All recruiter-facing text lives in `src/data/*.ts` — components contain no hard-coded copy. Follow **`CONTENT_TODO.md`** as your checklist; every placeholder is listed there.

### Update Your Profile

Edit `src/data/profile.ts`:

```ts
export const profile = {
  name: 'Jane Doe',
  title: 'AI Agent / Robotics / Software Engineer',
  tagline: 'I build intelligent systems...',
  email: 'jane@example.com',
  github: 'https://github.com/janedoe',
  githubUsername: 'janedoe',   // enables the live GitHub section
  linkedin: 'https://www.linkedin.com/in/janedoe',
  location: 'Shanghai, China',
  resumeUrl: '/resume/resume.pdf',
  resumeUpdated: '2026',
  stats: [ /* hero numbers */ ],
  interests: [...], workingOn: [...], lookingFor: [...],
};
```

Also update `src/data/site.ts`:

- `siteConfig.url` → your final domain (used by canonical/OG/sitemap)
- `siteConfig.title` / `description` / `keywords` / `author`
- `index.html` → meta tags + JSON-LD (same values, static defaults)
- `public/robots.txt` + `public/sitemap.xml` → your domain

### Add a New Project

1. Drop the project's assets in `public/projects/my-project/` (see below).
2. Add one object to `src/data/projects.ts`:

```ts
{
  title: 'My Project',
  slug: 'my-project',                     // -> /projects/my-project
  description: 'One sentence: what it solves.',
  longDescription: 'Paragraph for the Overview section.',
  image: '/projects/my-project/cover.webp',
  imageAlt: 'What the cover shows',
  categories: ['robotics', 'open-source'],
  tags: ['ROS2', 'C++'],
  technologies: ['C++', 'ROS2', 'Docker'],
  github: 'https://github.com/you/my-project',
  githubRepo: 'you/my-project',           // optional: live stars/forks/lang
  demo: 'https://demo.example.com',       // optional
  docs: 'https://docs.example.com',       // optional
  featured: true,                          // true = shows on homepage
  year: '2025',
  role: 'What YOU did on it',
  background: 'Why it exists.',
  problem: 'The concrete problem.',
  solution: 'How you solved it.',
  highlights: ['Engineered highlight 1', '...'],
  architecture: { type: 'image', src: '/projects/my-project/architecture.svg', alt: '...' },
  // or: architecture: { type: 'mermaid', code: 'flowchart LR\n A-->B', caption: '...' }
  challenges: [
    { challenge: 'X', analysis: 'Why X was hard', solution: 'How', result: 'Measured outcome' },
  ],
  gallery: [{ src: '/projects/my-project/screenshot-01.webp', alt: '...', caption: '...' }],
  results: ['Measurable outcome 1', 'Measurable outcome 2'],
  status: 'active',                        // active | maintained | wip | archived
  // isPlaceholder: true,                  // remove once real
}
```

That's it — cards, filters, search, the case study page and the sitemap entry all follow automatically. Then add the `/projects/my-project` URL to `public/sitemap.xml`.

### Add Project Screenshots

Recommended per project folder (`public/projects/<slug>/`):

```
cover.webp          1200×800    card + detail cover
architecture.webp   1200×800    system diagram (or use Mermaid)
screenshot-01.webp  1200×800    UI / result
screenshot-02.webp  1200×800    terminal / simulation
```

Use **WebP/AVIF** (target < 150 KB each) and reference them from `projects.ts`. Images are lazy-loaded, so the homepage never downloads all of them at once. The `*`-suffixed `.svg` files currently in those folders are generated placeholders — replace or delete them (`npm run assets:placeholder` regenerates them).

### Update Your Resume

Replace one file:

```
public/resume/resume.pdf
```

Keep the same filename — the site links to it by name. Update `resumeUpdated` in `profile.ts`. The PDF currently shipped is a generated placeholder; see `scripts/make-resume.mjs`.

### GitHub Statistics

Set `githubUsername` in `src/data/profile.ts`. The homepage then shows live profile stats (repos, stars, followers) and top languages from the GitHub Public API (10-minute client-side cache, 6s timeout). If the API fails, the section hides itself — the rest of the site is unaffected. Set `githubRepo` on projects to decorate cards with live stars/forks/language. **No GitHub data is ever faked.**

### SEO / Social Preview

- `public/og/og-image.png` (1200×630) is generated from `scripts/og-card.html`. After replacing `[YOUR_NAME]` with your name, re-render it:

```bash
chrome --headless=new --window-size=1200,630 --screenshot=public/og/og-image.png scripts/og-card.html
```

(or open the file in a browser and screenshot it)

- Per-route titles/descriptions/OG tags are handled in `src/lib/seo.ts`.
- `public/sitemap.xml` + `public/robots.txt` use a placeholder domain — replace it, then submit the sitemap in Google Search Console.

### Analytics (optional, off by default)

In `src/data/site.ts`:

```ts
analytics: {
  enabled: false,                 // flip to true to activate
  provider: 'umami',              // 'google' | 'umami' | 'plausible'
  umamiSrc: 'https://analytics.example.com/script.js',
  umamiId: 'xxxxxxxx-xxxx-...',
  // googleId: 'G-XXXXXXXXXX',    // for provider: 'google'
  // plausibleDomain: 'example.com',
},
```

Nothing loads until you enable it — privacy and performance are unaffected by default.

## Build

```bash
npm run build
```

Runs `tsc --noEmit` (strict typecheck) → Vite production build → `scripts/postbuild.mjs`, which:

1. Finalizes the base path (`__BASE__` replacement),
2. Creates `dist/404.html` with a redirect snippet so **refreshing `/projects/slug` on GitHub Pages keeps working** (SPA deep-link recovery).

Output: `dist/` — deployable as-is.

## Deploy to GitHub Pages

**One-time setup:**

1. Create the repository on GitHub:
   - user site: repo **must** be named `<username>.github.io`
   - (or any repo name for a project page — see below)
2. Push this folder:

```bash
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

3. In the repo: **Settings → Pages → Build and deployment → Source: `GitHub Actions`**.

**Every update after that is just:**

```bash
git add .
git commit -m "update portfolio"
git push
```

The workflow (`.github/workflows/deploy.yml`) builds and deploys automatically; check progress under the repo's **Actions** tab. The site goes live at `https://<username>.github.io/`.

### Custom Domain

1. Add your domain in **Settings → Pages → Custom domain** (e.g. `yourname.dev`) — GitHub handles DNS + TLS and issues the `CNAME` file.
2. Update `siteConfig.url` in `src/data/site.ts`, plus `index.html` metas, `robots.txt` and `sitemap.xml`.

The site works identically with or without a custom domain.

### Project Page Repos (username.github.io/repo)

If the site lives in a repo other than `<username>.github.io`:

1. In the repo: **Settings → Secrets and variables → Actions → Variables**, add `VITE_BASE` = `/repo-name/`.
2. Push — the workflow passes `VITE_BASE` to the build, and base-aware links, assets, the SPA-recovery script and routing all follow automatically.

Locally: `VITE_BASE=/repo-name/ npm run build && npm run preview`.

## Internationalization (EN / 中文)

The site ships in English (better for international recruiting). All UI strings are centralized in `src/data/site.ts` (`copy`), all content in `src/data/*.ts`. Adding a language toggle later means swapping the `copy` object via a tiny context — no component changes, no string hunting.

## Quality Checks

- `npm run build` — strict TypeScript, must be error-free
- `npm run lint` — ESLint
- Lighthouse targets: Performance / Accessibility / Best Practices / SEO ≥ 90
- Responsive breakpoints verified: 375 / 768 / 1024 / 1440

## License

Choose a license for your code before going public (e.g. MIT). Your content (projects, photos, resume) remains yours.
