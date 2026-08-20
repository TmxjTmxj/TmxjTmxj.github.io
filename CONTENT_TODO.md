# CONTENT TODO — replace every placeholder before going live

This checklist maps 1:1 to the placeholders in the code. Work top to bottom:
every item below is currently a `[PLACEHOLDER]` or template content in the repo.
Check it off after you replace it.

## 1. Identity (src/data/profile.ts + src/data/site.ts)

- [ ] Name — `profile.name` / `firstName` (also in `index.html` meta, JSON-LD)
- [ ] Professional title — `profile.title`
- [ ] One-sentence tagline — `profile.tagline`
- [ ] Long description — `profile.description`
- [ ] Email — `profile.email` (navbar, footer, contact page)
- [ ] GitHub URL — `profile.github`
- [ ] GitHub username — `profile.githubUsername` (enables live stats section)
- [ ] LinkedIn URL — `profile.linkedin`
- [ ] Location — `profile.location`
- [ ] Availability line — `profile.availability`
- [ ] Hero quick stats — `profile.stats` (projects / repos / technologies / years)
- [ ] Interests — `profile.interests`
- [ ] What I'm working on — `profile.workingOn`
- [ ] Target roles — `profile.lookingFor`
- [ ] Resume last-updated date — `profile.resumeUpdated`
- [ ] `siteConfig.url` → your real domain (used by canonical/OG/sitemap)
- [ ] `siteConfig.title` / `description` / `keywords` / `author` in `src/data/site.ts`
- [ ] `index.html` — `<title>`, meta description/keywords/author, og:*, twitter:*, JSON-LD (same values)
- [ ] `public/robots.txt` — your domain in the Sitemap line
- [ ] `public/sitemap.xml` — replace `your-github-username.github.io` everywhere
- [ ] `public/manifest.webmanifest` — name / short_name

## 2. Avatar & Branding

- [ ] Real photo or logo → `public/avatar/avatar.svg` (About + home About preview)
- [ ] `public/favicon.svg` — optional: your own mark
- [ ] `public/icons/icon-512.png` — optional: regenerate from your mark
- [ ] `public/og/og-image.png` — re-render `scripts/og-card.html` after you set your name/role (see README § SEO)

## 3. Resume

- [ ] Replace `public/resume/resume.pdf` with your real resume PDF (same filename)

## 4. Projects (src/data/projects.ts)

All 6 projects are template placeholders — replace them with real work,
or delete what you don't have. Per project:

### Project 01 — AI-Agent Robot Control System (`ai-agent-robot-control`)
- [ ] title / slug / description / longDescription
- [ ] categories / tags / technologies
- [ ] github / githubRepo / demo / docs
- [ ] year / role
- [ ] background / problem / solution
- [ ] highlights (4 items)
- [ ] challenges (2 items: challenge / analysis / solution / result)
- [ ] results (3 items)
- [ ] cover + architecture + 2 screenshots → `public/projects/ai-agent-robot-control/`
- [ ] remove `isPlaceholder: true`

### Project 02 — Multi-Agent Task Orchestration (`multi-agent-orchestration`)
- [ ] title / slug / description / longDescription
- [ ] categories / tags / technologies
- [ ] github / githubRepo / demo / docs
- [ ] year / role
- [ ] background / problem / solution
- [ ] highlights (4) / challenges (1) / results (2)
- [ ] cover + 2 screenshots → `public/projects/multi-agent-orchestration/`
- [ ] remove `isPlaceholder: true`

### Project 03 — SLAM Navigation Stack (`slam-navigation-stack`)
- [ ] title / slug / description / longDescription
- [ ] categories / tags / technologies
- [ ] github / githubRepo / demo / docs
- [ ] year / role
- [ ] background / problem / solution
- [ ] highlights (4) / challenges (1) / results (2)
- [ ] cover + architecture + 2 screenshots → `public/projects/slam-navigation-stack/`
- [ ] remove `isPlaceholder: true`

### Project 04 — Engineering Data Pipeline (`engineering-data-pipeline`)
- [ ] title / slug / description / longDescription
- [ ] categories / tags / technologies
- [ ] github / demo / docs
- [ ] year / role
- [ ] background / problem / solution
- [ ] highlights / challenges / results
- [ ] cover + gallery → `public/projects/engineering-data-pipeline/`
- [ ] remove `isPlaceholder: true`

### Project 05 — LLM RAG Knowledge Assistant (`llm-rag-assistant`)
- [ ] title / slug / description / longDescription
- [ ] categories / tags / technologies
- [ ] github / demo / docs
- [ ] year / role
- [ ] background / problem / solution
- [ ] highlights / results
- [ ] cover + gallery → `public/projects/llm-rag-assistant/`
- [ ] remove `isPlaceholder: true`

### Project 06 — CAD/CAE Automation Toolkit (`cad-cae-automation`)
- [ ] title / slug / description / longDescription
- [ ] categories / tags / technologies
- [ ] github / demo / docs
- [ ] year / role
- [ ] background / problem / solution
- [ ] highlights / results
- [ ] cover → `public/projects/cad-cae-automation/`
- [ ] remove `isPlaceholder: true`

- [ ] Add every final project slug to `public/sitemap.xml`

## 5. Experience (src/data/experience.ts)

- [ ] Experience 01 (Internship) — org / role / period / location / summary / points / tech
- [ ] Experience 02 (Research) — org / role / period / location / summary / points / tech
- [ ] Experience 03 (Competition) — org / role / period / location / summary / points / tech
- [ ] Experience 04 (Organization) — org / role / period / summary / points / tech
- [ ] Remove `isPlaceholder: true` from every real entry

## 6. Skills (src/data/skills.ts)

- [ ] Review every skill + proficiency level (`core` / `advanced` / `familiar`) against reality
- [ ] Update `currentlyExploring` with what you're actually learning

## 7. Contact & Socials

- [ ] Email / GitHub / LinkedIn verified on `/contact` and the footer
- [ ] Location — real city/region, or remove

## 8. Deployment & Go-live

- [ ] Create the GitHub repo (`<username>.github.io`) and push
- [ ] Settings → Pages → Source: **GitHub Actions**
- [ ] Verify Actions run → site live at `https://<username>.github.io`
- [ ] Test a hard refresh on `/projects/<slug>` (404 recovery must work)
- [ ] Optional: custom domain (Settings → Pages → Custom domain) + update `siteConfig.url`
- [ ] Optional: Google Search Console — submit `sitemap.xml`
- [ ] Optional: analytics — `siteConfig.analytics` (off by default)
- [ ] Optional: LICENSE file

## 9. Quality checklist (after filling in content)

- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes
- [ ] Check 375 / 768 / 1024 / 1440 widths (DevTools responsive mode)
- [ ] Test Dark / Light / System toggle
- [ ] Test search + category filters on `/projects`
- [ ] Test lightbox keyboard controls on a project detail page
- [ ] Lighthouse ≥ 90 on Performance / Accessibility / Best Practices / SEO
