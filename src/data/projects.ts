/**
 * Projects - real GitHub repositories (TmxjTmxj).
 * ------------------------------------------------------------
 * Titles, descriptions, links, technologies, categories and highlights
 * come from your actual repositories. Narrative fields (background /
 * problem / solution / challenges / results) that are still marked
 * [TODO] need your own words - fill them in and remove `isPlaceholder`.
 * Full checklist: CONTENT_TODO.md
 *
 * Add a new project = add one object here + drop images into
 * public/projects/<slug>/. Nothing else to change.
 */

import type { Project } from '../types';

const GH = 'https://github.com/TmxjTmxj';

export const projects: Project[] = [
  {
    title: 'ROS2 Agent Workflow',
    slug: 'ros2-agent-workflow',
    description:
      'Control a ROS2 robot (lyrical) and Gazebo simulation through the MCP protocol — an MCP server, one-click demo scripts and skill docs that let AI agents drive robots end-to-end.',
    longDescription:
      'An agent-to-robot bridge: an MCP server exposes ROS2 control capabilities to LLM agents, so a simulated robot can be driven end-to-end by an AI agent. Ships one-click demo scripts and skill documentation that make the whole agent→robot workflow reproducible.',
    image: '/projects/ros2-agent-workflow/cover.svg',
    imageAlt: 'MCP agent controlling a ROS2 robot in Gazebo simulation',
    categories: ['ai-agents', 'robotics'],
    tags: ['MCP', 'ROS2', 'Gazebo', 'AI Agent'],
    technologies: ['Python', 'ROS2', 'Gazebo', 'MCP', 'FastMCP'],
    github: `${GH}/ros2-agent-workflow`,
    githubRepo: 'TmxjTmxj/ros2-agent-workflow',
    featured: true,
    year: '2026',
    role: 'Sole developer — MCP server, one-click demo scripts and skill documentation',
    background:
      '[TODO: your background — why you built an agent-driven ROS2 workflow, e.g. the gap between natural-language tasking and ROS2 operation]',
    problem:
      '[TODO: the concrete problem — e.g. operating ROS2 robots requires hand-written launch files and per-task scripts]',
    solution:
      '[TODO: how it solves the problem — e.g. an MCP server exposes ROS2 tools to LLM agents, with Gazebo simulation as the safe test environment]',
    highlights: [
      'MCP server bridging LLM agents to ROS2 (lyrical)',
      'One-click demo scripts for the full agent → robot workflow',
      'Skill documentation for reproducible runs',
      'Gazebo simulation for safe, repeatable testing',
    ],
    architecture: {
      type: 'image',
      src: '/projects/ros2-agent-workflow/architecture.svg',
      alt: 'LLM agent → MCP server → ROS2 nodes → Gazebo robot',
      caption: 'Agent → MCP Server → ROS2 → Gazebo',
    },
    gallery: [
      { src: '/projects/ros2-agent-workflow/screenshot-01.svg', alt: 'Agent run dashboard with ROS2 node state', caption: 'Replace with a real screenshot' },
      { src: '/projects/ros2-agent-workflow/screenshot-02.svg', alt: 'Terminal output of the MCP + ROS2 demo script', caption: 'Replace with a real screenshot' },
    ],
    status: 'active',
    isPlaceholder: true,
  },
  {
    title: 'Agent Orchestrator',
    slug: 'agent-orchestrator',
    description:
      'A lightweight multi-agent orchestration framework — plan → delegate → execute → collect, with 6 agent roles, 11 role definitions, 5 skills, parallel execution and failure isolation.',
    longDescription:
      'A small runtime that turns LLM agents into a coordinated team: a plan → delegate → execute → collect pipeline with six built-in agent roles, eleven role definitions and five skills. Work runs in parallel and failures are isolated per worker.',
    image: '/projects/agent-orchestrator/cover.svg',
    imageAlt: 'Orchestrator coordinating multiple agent roles',
    categories: ['ai-agents', 'software', 'open-source'],
    tags: ['Multi-Agent', 'Orchestration', 'LLM', 'Python'],
    technologies: ['Python', 'LLM', 'Multi-Agent'],
    github: `${GH}/agent-orchestrator`,
    githubRepo: 'TmxjTmxj/agent-orchestrator',
    featured: true,
    year: '2026',
    role: 'Creator — orchestration pipeline, agent roles, failure isolation',
    background:
      '[TODO: your background — why the existing agent frameworks did not fit your needs]',
    problem:
      '[TODO: the concrete problem — e.g. coordinating multiple LLM agents reliably without a heavy framework]',
    solution:
      '[TODO: how it solves it — e.g. a lightweight plan→delegate→execute→collect pipeline with typed roles and failure isolation]',
    highlights: [
      'plan → delegate → execute → collect pipeline',
      '6 agent roles + 11 role definitions + 5 skills',
      'Parallel execution with failure isolation',
    ],
    architecture: {
      type: 'mermaid',
      code: `flowchart LR
  T[Task] --> P[Planner]
  P --> D{Delegate}
  D --> W1[Worker 1]
  D --> W2[Worker 2]
  D --> W3[Worker 3]
  W1 --> C[Collector]
  W2 --> C
  W3 --> C
  C --> R[Result]
  W1 -.failure isolated.-> C`,
      caption: 'plan → delegate → execute → collect (from the repo description)',
    },
    gallery: [
      { src: '/projects/agent-orchestrator/screenshot-01.svg', alt: 'Agent run trace with role messages', caption: 'Replace with a real screenshot' },
      { src: '/projects/agent-orchestrator/screenshot-02.svg', alt: 'Run statistics dashboard', caption: 'Replace with a real screenshot' },
    ],
    status: 'active',
    isPlaceholder: true,
  },
  {
    title: 'Beifeng Wind Agent',
    slug: 'beifeng-wind-agent',
    description:
      'A Rust-powered AI agent for wind-farm operations & maintenance: RAG knowledge hub, fault diagnosis, risk assessment, report generation, a benchmark harness and a Tauri desktop app.',
    longDescription:
      'An industrial AI agent for wind-farm O&M written in Rust: a RAG knowledge hub over farm documentation, fault-diagnosis and risk-assessment pipelines, automated report generation, a benchmark harness to evaluate the agent itself, and a Tauri desktop application.',
    image: '/projects/beifeng-wind-agent/cover.svg',
    imageAlt: 'Wind farm O&M agent pipeline',
    categories: ['ai-agents', 'engineering', 'research'],
    tags: ['RAG', 'Rust', 'Wind Energy', 'O&M', 'Tauri'],
    technologies: ['Rust', 'Tauri', 'RAG', 'LLM'],
    github: `${GH}/beifeng-wind-agent`,
    githubRepo: 'TmxjTmxj/beifeng-wind-agent',
    featured: true,
    year: '2026',
    role: 'Sole developer — RAG hub, diagnosis & risk pipelines, report generation, benchmark harness, Tauri app',
    background:
      '[TODO: your background — why wind-farm O&M needs an agent, e.g. domain knowledge is scattered and diagnosis is expert-dependent]',
    problem:
      '[TODO: the concrete problem — e.g. fault diagnosis and risk assessment require domain experts and take hours per case]',
    solution:
      '[TODO: how it solves it — e.g. a RAG knowledge hub plus diagnosis/risk/report pipelines, with a benchmark harness to measure agent quality]',
    highlights: [
      'RAG knowledge hub over wind-farm documentation',
      'Fault diagnosis + risk assessment pipelines',
      'Automated report generation',
      'Benchmark harness for agent evaluation',
      'Tauri desktop app',
    ],
    architecture: {
      type: 'image',
      src: '/projects/beifeng-wind-agent/architecture.svg',
      alt: 'Documents → RAG index → diagnosis/risk → report',
      caption: 'Docs → RAG → Diagnosis / Risk → Report',
    },
    gallery: [
      { src: '/projects/beifeng-wind-agent/screenshot-01.svg', alt: 'Wind farm O&M agent dashboard', caption: 'Replace with a real screenshot' },
      { src: '/projects/beifeng-wind-agent/screenshot-02.svg', alt: 'Fault diagnosis terminal output', caption: 'Replace with a real screenshot' },
    ],
    status: 'active',
    isPlaceholder: true,
  },
  {
    title: 'Hermes Agent Core',
    slug: 'hermes-core',
    description:
      'An agent core with a consciousness engine, four-layer memory, a tavern-style personality interface and a cross-agent memory bridge.',
    longDescription:
      'The core runtime of the Hermes agent: a consciousness engine that drives reasoning loops, four-layer memory (from working context to long-term knowledge), a personality interface, and a memory bridge that lets multiple agents share what they know.',
    image: '/projects/hermes-core/cover.svg',
    imageAlt: 'Hermes agent core with layered memory',
    categories: ['ai-agents', 'research'],
    tags: ['Agent Core', 'Memory', 'LLM', 'Python'],
    technologies: ['Python', 'LLM', 'Agent Memory'],
    github: `${GH}/hermes-core`,
    githubRepo: 'TmxjTmxj/hermes-core',
    featured: false,
    year: '2026',
    role: 'Creator — consciousness engine, four-layer memory, personality interface, memory bridge',
    background: '[TODO: your background — why a custom agent core instead of an existing framework]',
    problem: '[TODO: the concrete problem — e.g. stateless LLM agents forget context between sessions]',
    solution: '[TODO: how it solves it — e.g. four-layer memory + a cross-agent memory bridge]',
    highlights: [
      'Consciousness engine driving the reasoning loop',
      'Four-layer memory architecture',
      'Tavern-style personality interface',
      'Cross-agent memory bridge',
    ],
    status: 'active',
    isPlaceholder: true,
  },
  {
    title: 'TMXJ Agent',
    slug: 'tmxj-agent',
    description:
      'A DeepSeek-first terminal coding agent built in Rust. Fork of Claw Code.',
    longDescription:
      'A terminal coding agent optimized for DeepSeek models, written in Rust (fork of Claw Code). Lets an AI agent plan, edit, run and verify code directly in the terminal.',
    image: '/projects/tmxj-agent/cover.svg',
    imageAlt: 'TMXJ Agent terminal coding agent',
    categories: ['ai-agents', 'software', 'open-source'],
    tags: ['Rust', 'DeepSeek', 'CLI', 'Coding Agent'],
    technologies: ['Rust', 'DeepSeek', 'CLI'],
    github: `${GH}/tmxj-agent`,
    githubRepo: 'TmxjTmxj/tmxj-agent',
    featured: false,
    year: '2026',
    role: 'Maintainer — DeepSeek-first configuration and tooling (fork of Claw Code)',
    background: '[TODO: your background — why DeepSeek-first]',
    problem: '[TODO: the concrete problem — e.g. terminal coding agents tuned for other providers underperform with DeepSeek models]',
    solution: '[TODO: how it solves it — e.g. DeepSeek-first prompts and tool configuration in Rust]',
    highlights: [
      'DeepSeek-first terminal coding agent',
      'Built in Rust',
      'Plan → edit → run → verify loop in the terminal',
    ],
    status: 'maintained',
    isPlaceholder: true,
  },
  {
    title: 'CNC CAM & G-Code Simulator',
    slug: 'cnc-cam-gcode-simulator',
    description:
      'Desktop software for CNC CAM and G-code simulation: DXF import, CAM toolpath generation, Fanuc G-code output and 2D/3D simulation for milling and turning modes.',
    longDescription:
      'A desktop application covering the CNC pipeline end-to-end: import DXF geometry, generate CAM toolpaths, emit Fanuc G-code and simulate the result in 2D/3D — supporting both milling and turning modes.',
    image: '/projects/cnc-cam-gcode-simulator/cover.svg',
    imageAlt: 'DXF import to G-code simulation pipeline',
    categories: ['engineering', 'software'],
    tags: ['CNC', 'CAM', 'G-Code', 'Simulation'],
    technologies: ['Python', 'DXF', 'CAM', 'G-Code', '2D/3D Simulation'],
    github: `${GH}/cnc-cam-gcode-simulator`,
    githubRepo: 'TmxjTmxj/cnc-cam-gcode-simulator',
    featured: false,
    year: '2026',
    role: 'Sole developer — DXF import, CAM toolpaths, Fanuc G-code generation, 2D/3D simulation',
    background: '[TODO: your background — why a desktop CAM/G-code tool]',
    problem: '[TODO: the concrete problem — e.g. CAM toolchains are heavy and expensive for learning and small jobs]',
    solution: '[TODO: how it solves it — e.g. an all-in-one desktop flow from DXF to simulated G-code]',
    highlights: [
      'DXF import',
      'CAM toolpath generation',
      'Fanuc G-code output',
      '2D/3D simulation, milling + turning modes',
    ],
    status: 'maintained',
    isPlaceholder: true,
  },
  {
    title: 'Shrapnel Force Predictor',
    slug: 'shrapnel-force-predictor',
    description:
      'A machine-learning system that predicts shrapnel spring force: Creo parametric modeling + batch Abaqus simulation + multi-model regression — 3.72% accuracy gap vs. simulation.',
    longDescription:
      'ML replaces repeated simulation: parametric models are built in Creo, batch simulations run in Abaqus to build a dataset, and multiple regression models are trained to predict shrapnel force directly — reaching a prediction error of 3.72% versus simulation.',
    image: '/projects/shrapnel-force-predictor/cover.svg',
    imageAlt: 'Parametric model → batch simulation → ML prediction',
    categories: ['engineering', 'research'],
    tags: ['ML', 'Abaqus', 'Creo', 'CAE'],
    technologies: ['Python', 'Creo', 'Abaqus', 'ML Regression'],
    github: `${GH}/shrapnel-force-predictor`,
    githubRepo: 'TmxjTmxj/shrapnel-force-predictor',
    featured: false,
    year: '2026',
    role: 'Sole developer — parametric modeling, batch simulation pipeline, model training & evaluation',
    background: '[TODO: your background — why predict instead of simulate]',
    problem: '[TODO: the concrete problem — e.g. each Abaqus run takes too long for design iteration]',
    solution: '[TODO: how it solves it — e.g. Creo + Abaqus generate a dataset, ML models predict force in milliseconds]',
    highlights: [
      'Creo parametric modeling',
      'Batch Abaqus simulation pipeline',
      'Multi-model regression with comparison',
    ],
    results: [
      'Prediction error within 3.72% of Abaqus simulation results',
      '[TODO: dataset size, models compared, prediction speedup]',
    ],
    status: 'maintained',
    isPlaceholder: true,
  },
  {
    title: 'ANSYS Mechanical Simulation Cases',
    slug: 'ansys-mech-sim-cases',
    description:
      'Structural analysis of typical components: SolidWorks parametric modeling + ANSYS Workbench/Fluent simulation (turbine blades, cylinder coaxiality, rolling bearings), automated end-to-end by a Codex AI agent through an MCP toolchain.',
    longDescription:
      'A library of mechanical analysis cases — turbine blades, cylinder coaxiality, rolling bearings — where SolidWorks parametric models are driven into ANSYS Workbench/Fluent simulations. The whole loop is automated end-to-end by a Codex AI agent through an MCP toolchain.',
    image: '/projects/ansys-mech-sim-cases/cover.svg',
    imageAlt: 'SolidWorks model automated into ANSYS simulation',
    categories: ['engineering', 'ai-agents'],
    tags: ['ANSYS', 'SolidWorks', 'MCP', 'AI Automation'],
    technologies: ['SolidWorks', 'ANSYS Workbench', 'Fluent', 'MCP'],
    github: `${GH}/ansys-mech-sim-cases`,
    githubRepo: 'TmxjTmxj/ansys-mech-sim-cases',
    featured: false,
    year: '2026',
    role: 'Author — parametric models, simulation setups, MCP-driven end-to-end automation',
    background: '[TODO: your background — why automate CAE workflows with agents]',
    problem: '[TODO: the concrete problem — e.g. manual CAD→CAE workflows are repetitive and error-prone]',
    solution: '[TODO: how it solves it — e.g. an AI agent drives SolidWorks + ANSYS through MCP tools end-to-end]',
    highlights: [
      'Turbine blade / cylinder coaxiality / rolling bearing cases',
      'SolidWorks parametric modeling',
      'ANSYS Workbench + Fluent simulation',
      'End-to-end automation by a Codex AI agent via MCP',
    ],
    status: 'maintained',
    isPlaceholder: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const allCategories = [
  ...new Set(projects.flatMap((p) => p.categories)),
] as Project['categories'];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
