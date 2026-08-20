/**
 * Site-wide configuration + ALL UI copy.
 *
 * Every user-facing string on the site lives in `copy` (or in profile.ts /
 * projects.ts / experience.ts / skills.ts). Components never hard-code text,
 * which keeps the codebase ready for a future EN / 中文 toggle:
 * swap this object for a translated one via a tiny i18n context.
 */

export const siteConfig = {
  /** Final site URL (GitHub Pages user site). */
  url: 'https://tmxjtmxj.github.io',
  title: '天漠雪佳 · AI Agent Engineer',
  description:
    'Portfolio of 天漠雪佳 (TmxjTmxj) — AI Agent Engineer building multi-agent systems, ROS2 + MCP robot control and AI for intelligent manufacturing.',
  keywords: [
    'AI Agent Engineer',
    'AI Agent',
    'ROS2',
    'MCP',
    'Intelligent Manufacturing',
    'Rust',
    'Python',
    'Portfolio',
  ],
  author: '天漠雪佳',
  language: 'en',
  ogImage: '/og/og-image.png',

  /**
   * Analytics - OFF by default. Nothing is loaded until you flip
   * `enabled: true` and configure a provider.
   *  - google:  Google Analytics 4 measurement id (G-XXXXXXX)
   *  - umami:   umamiSrc (script url) + umamiId (website id)
   *  - plausible: plausibleDomain + src (defaults to plausible.io script)
   */
  analytics: {
    enabled: false,
    provider: 'none' as 'none' | 'google' | 'umami' | 'plausible',
    googleId: '',
    umamiSrc: '',
    umamiId: '',
    plausibleDomain: '',
  },
};

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
] as const;

/** Categories shown in the project filter, in display order. */
export const categoryLabels: Record<string, string> = {
  'ai-agents': 'AI / Agents',
  robotics: 'Robotics',
  engineering: 'Engineering',
  software: 'Software',
  research: 'Research',
  'open-source': 'Open Source',
};

export const copy = {
  nav: {
    menuLabel: 'Open menu',
    closeLabel: 'Close menu',
    themeLabel: 'Switch color theme',
  },
  hero: {
    greeting: 'Hi, I’m',
    role: 'AI Agent / Robotics / Software Engineer',
    ctaProjects: 'View Projects',
    ctaResume: 'Resume',
    ctaGithub: 'GitHub',
    availability: 'Open to internships & full-time roles',
    location: 'Based in',
  },
  home: {
    featuredLabel: 'Featured Projects',
    featuredTitle: 'Selected work',
    featuredSubtitle:
      'AI agents, ROS2 robotics, engineering software and intelligent manufacturing — built end-to-end, open sourced on GitHub.',
    viewAll: 'View all projects',
    experienceLabel: 'Experience',
    experienceTitle: 'Where I’ve worked',
    skillsLabel: 'Skills',
    skillsTitle: 'What I work with',
    githubLabel: 'Open Source',
    githubTitle: 'GitHub activity',
    aboutLabel: 'About',
    aboutTitle: 'About me',
    contactLabel: 'Contact',
    contactTitle: 'Let’s connect',
  },
  projects: {
    title: 'Projects',
    subtitle:
      'AI agents, ROS2 robotics, engineering software and intelligent manufacturing — all open source on GitHub.',
    searchPlaceholder: 'Search projects…',
    searchLabel: 'Search projects by name, technology, category or description',
    filterLabel: 'Filter projects by category',
    all: 'All',
    results: 'projects',
    emptyTitle: 'No projects match',
    emptyText: 'Try a different search term or category.',
    reset: 'Clear filters',
    viewProject: 'View Project',
    viewCaseStudy: 'Case Study',
    github: 'GitHub',
    demo: 'Live Demo',
    docs: 'Documentation',
    placeholderBadge: 'Placeholder',
    archived: 'Archived',
    wip: 'In progress',
    maintained: 'Maintained',
    active: 'Active',
  },
  detail: {
    back: 'All projects',
    overview: 'Overview',
    background: 'Background',
    problem: 'Problem',
    solution: 'Solution',
    architecture: 'Architecture',
    architectureCaption: 'System architecture',
    role: 'My Role',
    techStack: 'Tech Stack',
    keyFeatures: 'Key Features',
    challenges: 'Engineering Challenges',
    challengeSteps: ['Challenge', 'Analysis', 'Solution', 'Result'],
    screenshots: 'Screenshots & Demo',
    results: 'Results',
    repository: 'Repository',
    repositoryCta: 'View source on GitHub',
    quickFacts: 'Quick facts',
    roleFact: 'Role',
    yearFact: 'Year',
    statusFact: 'Status',
    categoryFact: 'Category',
    stackFact: 'Stack',
    nextProject: 'Next project',
    prevProject: 'Previous project',
    openGallery: 'Open image gallery',
  },
  experience: {
    title: 'Experience',
    subtitle:
      'Internships, research, competitions and organizations - what I did and what it achieved.',
    techLabel: 'Tech',
  },
  skills: {
    title: 'Skills',
    subtitle:
      'Technologies I use to ship real systems - grouped by domain, not by made-up percentages.',
    exploringLabel: 'Currently exploring',
    level: { core: 'Core', advanced: 'Advanced', familiar: 'Working knowledge' },
  },
  about: {
    title: 'About',
    intro:
      'I am an engineer interested in building intelligent systems that connect AI, software and physical machines.',
    interestsTitle: 'My interests',
    workingTitle: 'What I’m working on',
    lookingTitle: 'What I’m looking for',
    resumeCta: 'See my resume',
  },
  resume: {
    title: 'Resume',
    subtitle:
      'One page, recruiter-ready. The PDF lives at /public/resume/resume.pdf - drop in a new file to update it.',
    view: 'View Resume',
    download: 'Download PDF',
    updated: 'Last updated:',
    tipTitle: 'How to update',
    tip: 'Replace public/resume/resume.pdf with your own PDF (same file name) and the site updates on the next deploy.',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Interested in working together?',
    cta: 'Let’s connect.',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    location: 'Location',
    resume: 'Resume',
    openEmail: 'Send an email',
    openGithub: 'Open GitHub profile',
    openLinkedin: 'Open LinkedIn profile',
    responseNote: 'I usually reply within 1-2 business days.',
  },
  githubSection: {
    repos: 'Public repos',
    stars: 'Total stars',
    followers: 'Followers',
    following: 'Following',
    topLanguages: 'Top languages',
    visitProfile: 'Visit GitHub profile',
    unconfigured:
      'Connect your GitHub in src/data/profile.ts (githubUsername) to show real statistics here.',
    unavailable: 'GitHub statistics are temporarily unavailable.',
  },
  footer: {
    tagline: 'AI Agent × Intelligent Manufacturing',
    builtWith: 'Built with React + TypeScript',
    hostedOn: 'Hosted on GitHub Pages',
    copyright: 'All rights reserved.',
  },
  notFound: {
    title: '404',
    message: 'Looks like this page got lost.',
    backHome: 'Back Home',
  },
  skipLink: 'Skip to main content',
  lightbox: {
    close: 'Close (Esc)',
    prev: 'Previous image',
    next: 'Next image',
  },
  terminal: {
    // Typed lines in the hero terminal (prefix `$` is added automatically).
    lines: [
      'whoami',
      'AI Agent Engineer · Intelligent Manufacturing',
      'cat interests.txt',
      'AI Agents · Intelligent Manufacturing · Embodied Intelligence · ROS2',
      'cat location.txt',
      'Shandong University · China',
      'cat status.txt',
      'Open to opportunities',
    ],
  },
} as const;
