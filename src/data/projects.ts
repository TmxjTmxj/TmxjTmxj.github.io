/**
 * Projects - the heart of the portfolio.
 * ------------------------------------------------------------
 * Add a new project = add one object here + drop images into
 * public/projects/<slug>/. Nothing else to change.
 *
 * Every current entry is a PLACEHOLDER demonstrating the required
 * Problem -> Solution -> Engineering -> Result depth. Replace each
 * field with your real project and remove `isPlaceholder: true`.
 * (Full checklist: CONTENT_TODO.md)
 */

import type { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'AI-Agent Robot Control System',
    slug: 'ai-agent-robot-control',
    description:
      'An AI-agent-driven ROS2 control stack that converts natural-language tasks into executable robotic workflows - integrating perception, planning and real-time control.',
    longDescription:
      'A complete agent-to-actuator pipeline: an LLM agent decomposes a natural-language task into structured goals, a planner maps them to ROS2 actions, and a runtime supervisor executes, monitors and recovers from failures in real time.',
    image: '/projects/ai-agent-robot-control/cover.svg',
    imageAlt: 'Architecture diagram of the AI-agent robot control system',
    categories: ['ai-agents', 'robotics'],
    tags: ['AI Agent', 'ROS2', 'Computer Vision', 'LLM', 'Python'],
    technologies: ['Python', 'ROS2', 'FastAPI', 'LLM', 'OpenCV', 'Docker'],
    github: 'https://github.com/your-github-username/your-repo',
    githubRepo: '',
    demo: '',
    docs: '',
    featured: true,
    year: '2025',
    role: 'Sole developer - agent design, ROS2 integration, perception pipeline, evaluation',
    background:
      '[Replace with your real background] Robotic deployments usually require hand-written launch files and mission scripts that break when the task changes. The goal was a system where an operator simply describes the task in plain language.',
    problem:
      '[Replace with your real problem] Translating unstructured natural-language instructions into safe, verifiable robot actions - while keeping latency low enough for real-time control.',
    solution:
      '[Replace with your real solution] A three-layer architecture: (1) an LLM agent with tool-calling converts instructions into a validated task graph, (2) a planner compiles the graph into ROS2 action sequences, (3) a supervisor node monitors execution and replans on failure.',
    highlights: [
      'Natural language → ROS2 action graph with schema-validated tool calling',
      'Runtime supervisor detects failures and replans autonomously',
      'Perception module fuses camera + LiDAR for obstacle detection',
      'End-to-end latency under 200 ms from command to actuation',
    ],
    architecture: {
      type: 'image',
      src: '/projects/ai-agent-robot-control/architecture.svg',
      alt: 'Three-layer architecture: LLM agent, planner, ROS2 runtime',
      caption: 'Agent → Planner → ROS2 runtime → Robot',
    },
    challenges: [
      {
        challenge: '[CHALLENGE_01] Hallucinated or invalid robot commands',
        analysis:
          'LLM output is non-deterministic; free-form tool calls produced action parameters that violated the robot’s kinematic and safety limits.',
        solution:
          'Tool schemas encode ROS2 message constraints, and a validation layer rejects out-of-range commands before they reach the planner.',
        result: 'Invalid-command rate dropped from ~12% to 0% in the test suite.',
      },
      {
        challenge: '[CHALLENGE_02] Real-time constraint vs. LLM latency',
        analysis:
          'A full LLM round-trip (1-3 s) is too slow for reactive control loops.',
        solution:
          'Decoupled planning from execution: the agent plans asynchronously while a deterministic supervisor runs the control loop at 50 Hz.',
        result: 'Control loop stays deterministic under variable LLM latency.',
      },
    ],
    gallery: [
      { src: '/projects/ai-agent-robot-control/screenshot-01.svg', alt: 'Task dashboard with agent conversation and robot state', caption: 'Operator dashboard' },
      { src: '/projects/ai-agent-robot-control/screenshot-02.svg', alt: 'Terminal output of the ROS2 runtime supervisor', caption: 'Runtime supervisor logs' },
    ],
    results: [
      '[RESULT_01] Replace with measurable outcome (e.g. task success rate, latency, accuracy)',
      '[RESULT_02] e.g. 10x faster task specification vs. hand-written missions',
      '[RESULT_03] e.g. deployed on real hardware / simulation benchmark',
    ],
    status: 'wip',
    isPlaceholder: true,
  },
  {
    title: 'Multi-Agent Task Orchestration Framework',
    slug: 'multi-agent-orchestration',
    description:
      'An open-source framework for coordinating teams of LLM agents with shared memory, structured messaging and reproducible evaluation.',
    longDescription:
      'A lightweight orchestration layer that turns single-purpose LLM agents into a coordinated team: typed message passing between agents, shared scratchpad memory, human-in-the-loop checkpoints and a built-in evaluation harness.',
    image: '/projects/multi-agent-orchestration/cover.svg',
    imageAlt: 'Node graph of cooperating agents',
    categories: ['ai-agents', 'software', 'open-source'],
    tags: ['Multi-Agent', 'LLM', 'Open Source', 'TypeScript'],
    technologies: ['TypeScript', 'Node.js', 'LLM APIs', 'Vitest', 'Docker'],
    github: 'https://github.com/your-github-username/your-repo',
    githubRepo: '',
    demo: '',
    docs: '',
    featured: true,
    year: '2025',
    role: 'Creator & maintainer - core runtime, message protocol, evaluation suite',
    background:
      '[Replace with your real background] Existing agent frameworks either over-abstract or lock you into one vendor. This project explores the minimum set of primitives needed to build reliable multi-agent systems.',
    problem:
      '[Replace with your real problem] Multi-agent runs are notoriously non-deterministic: conversations drift, context grows unbounded, and there is no standard way to measure whether a "better" prompt actually helps.',
    solution:
      '[Replace with your real solution] A small typed runtime: agents communicate via a schema-validated message bus, memory is explicit and tiered (working / episodic / semantic), and every run is replayable against a versioned eval suite.',
    highlights: [
      'Schema-validated inter-agent messaging',
      'Tiered shared memory with automatic summarization',
      'Human-in-the-loop approval checkpoints',
      'Reproducible eval harness with regression tracking',
    ],
    architecture: {
      type: 'mermaid',
      code: `flowchart LR
  U[User Task] --> O[Orchestrator]
  O --> A1[Planner Agent]
  O --> A2[Worker Agent 1]
  O --> A3[Worker Agent 2]
  A1 --> M[(Shared Memory)]
  A2 --> M
  A3 --> M
  O --> H{Human Checkpoint}
  H -->|approve| R[Result]
  H -->|revise| O`,
      caption: 'Orchestrator → typed message bus → tiered shared memory',
    },
    challenges: [
      {
        challenge: '[CHALLENGE_01] Context drift in long multi-agent runs',
        analysis:
          'Conversation transcripts grow linearly and agent performance degrades as context approaches the model window.',
        solution:
          'Tiered memory: working memory holds the current task, episodic memory stores summaries, semantic memory is a searchable index. Summarization is triggered by token budget, not message count.',
        result: 'Sustained performance over 50+ step tasks where the baseline drifted.',
      },
    ],
    gallery: [
      { src: '/projects/multi-agent-orchestration/screenshot-01.svg', alt: 'Agent run trace with typed messages', caption: 'Run trace viewer' },
      { src: '/projects/multi-agent-orchestration/screenshot-02.svg', alt: 'Evaluation dashboard comparing prompt versions', caption: 'Eval dashboard' },
    ],
    results: [
      '[RESULT_01] Replace with real metrics (stars, downloads, adoption)',
      '[RESULT_02] e.g. eval suite catches regressions across prompt changes',
    ],
    status: 'active',
    isPlaceholder: true,
  },
  {
    title: 'SLAM-Based Autonomous Navigation Stack',
    slug: 'slam-navigation-stack',
    description:
      'A ROS2 navigation stack combining visual-inertial SLAM with model-predictive control for indoor autonomous robots.',
    longDescription:
      'An end-to-end autonomous navigation system: visual-inertial SLAM builds and maintains a map, a global planner produces collision-free paths, and a local MPC controller tracks them at speed while avoiding dynamic obstacles.',
    image: '/projects/slam-navigation-stack/cover.svg',
    imageAlt: 'Robot trajectory over a SLAM map',
    categories: ['robotics', 'engineering'],
    tags: ['SLAM', 'Navigation', 'ROS2', 'C++'],
    technologies: ['C++', 'ROS2', 'GTSAM', 'OpenCV', 'Gazebo', 'CMake'],
    github: 'https://github.com/your-github-username/your-repo',
    githubRepo: '',
    demo: '',
    docs: '',
    featured: true,
    year: '2024',
    role: 'Core developer - localization module, planner integration, simulation benchmarks',
    background:
      '[Replace with your real background] Indoor robots operating in changing environments need maps that stay accurate and paths that stay safe - this project was the navigation backbone for a mobile-robot platform.',
    problem:
      '[Replace with your real problem] Localization drift in low-texture indoor scenes plus planner latency that caused near-miss collisions with moving people.',
    solution:
      '[Replace with your real solution] Tightly-coupled visual-inertial SLAM with loop closure, a global planner that repairs paths online, and an MPC local controller running at 100 Hz with dynamic-obstacle prediction.',
    highlights: [
      'Visual-inertial SLAM with loop closure and relocalization',
      'MPC local controller at 100 Hz with obstacle prediction',
      'Simulation-to-hardware transfer validated in Gazebo and on robot',
      'Sub-5 cm localization accuracy in cluttered indoor scenes',
    ],
    architecture: {
      type: 'image',
      src: '/projects/slam-navigation-stack/architecture.svg',
      alt: 'Sensors → SLAM → global planner → MPC controller → actuators',
      caption: 'Sense → Map → Plan → Control',
    },
    challenges: [
      {
        challenge: '[CHALLENGE_01] Localization drift in feature-poor corridors',
        analysis:
          'Long, textureless corridors caused the visual frontend to lose tracking.',
        solution:
          'Fused IMU preintegration with visual residuals and added periodic loop-closure checks against a pose graph.',
        result: 'Drift reduced below 0.5% of distance traveled in test runs.',
      },
    ],
    gallery: [
      { src: '/projects/slam-navigation-stack/screenshot-01.svg', alt: 'RViz view of map, robot and planned path', caption: 'RViz navigation view' },
      { src: '/projects/slam-navigation-stack/screenshot-02.svg', alt: 'Gazebo simulation environment', caption: 'Gazebo simulation' },
    ],
    results: [
      '[RESULT_01] Replace with real numbers (localization error, success rate)',
      '[RESULT_02] e.g. 95%+ navigation success rate across N runs',
    ],
    status: 'maintained',
    isPlaceholder: true,
  },
  {
    title: 'Engineering Data Pipeline & Digital Twin',
    slug: 'engineering-data-pipeline',
    description:
      'A data pipeline that turns CAD, CAE and sensor exports into a live digital twin for manufacturing process monitoring.',
    longDescription:
      'Ingests heterogeneous engineering data (CAD assemblies, CAE result files, machine telemetry), normalizes it into a common schema, and streams it into a web-based digital twin of the production cell.',
    image: '/projects/engineering-data-pipeline/cover.svg',
    imageAlt: 'Pipeline from CAD/CAE files to a live dashboard',
    categories: ['engineering', 'software'],
    tags: ['Digital Twin', 'Data Pipeline', 'CAD', 'CAE'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker', 'TimescaleDB'],
    github: '',
    githubRepo: '',
    demo: '',
    docs: '',
    featured: false,
    year: '2024',
    role: 'Backend developer - ingestion, schema design, API, dashboard integration',
    background:
      '[Replace with your real background] Engineering data was scattered across file shares and formats; process decisions were made from stale exports.',
    problem:
      '[Replace with your real problem] Unifying CAD/CAE exports and machine telemetry into one queryable, up-to-date view without disrupting existing workflows.',
    solution:
      '[Replace with your real solution] A file-watcher ingestion service converts exports into a normalized schema, a FastAPI service exposes it, and a React dashboard visualizes the production cell state in near real time.',
    highlights: [
      'Format-agnostic ingestion for CAD / CAE / CSV / OPC-UA',
      'Near-real-time telemetry via TimescaleDB continuous aggregates',
      'Web dashboard with drill-down from cell to single part',
    ],
    challenges: [
      {
        challenge: '[CHALLENGE_01] Heterogeneous formats and inconsistent units',
        analysis: 'Exports from different tools disagreed on units, coordinate frames and naming.',
        solution: 'A normalization layer with per-source adapters and explicit unit/transform metadata.',
        result: 'Single-source-of-truth schema adopted by downstream consumers.',
      },
    ],
    gallery: [],
    results: [
      '[RESULT_01] Replace with real numbers (data latency, adoption)',
      '[RESULT_02] e.g. report generation time reduced from hours to minutes',
    ],
    status: 'maintained',
    isPlaceholder: true,
  },
  {
    title: 'LLM RAG Knowledge Assistant',
    slug: 'llm-rag-assistant',
    description:
      'A retrieval-augmented generation assistant over technical documentation with cited, auditable answers.',
    longDescription:
      'A RAG system for engineering documentation: hybrid retrieval (lexical + vector) over versioned docs, reranking, and answers that always cite their sources - so engineers can trust and verify every claim.',
    image: '/projects/llm-rag-assistant/cover.svg',
    imageAlt: 'Question in, cited answer out',
    categories: ['ai-agents', 'research'],
    tags: ['RAG', 'LLM', 'Embeddings', 'Search'],
    technologies: ['Python', 'LangChain', 'pgvector', 'FastAPI', 'Streamlit'],
    github: '',
    githubRepo: '',
    demo: '',
    docs: '',
    featured: false,
    year: '2024',
    role: 'Researcher & developer - retrieval pipeline, evaluation, UI',
    background:
      '[Replace with your real background] Finding answers across thousands of versioned engineering documents was slow; naive LLM answers were unverifiable.',
    problem:
      '[Replace with your real problem] Retrieval quality - answers must be correct for versioned technical content and always traceable to a source.',
    solution:
      '[Replace with your real solution] Hybrid retrieval combining BM25 and dense embeddings, cross-encoder reranking, and a citation layer that links every answer span to the exact document version.',
    highlights: [
      'Hybrid BM25 + vector retrieval with reranking',
      'Version-aware indexing for changing docs',
      'Every answer cites retrievable sources',
    ],
    gallery: [],
    results: [
      '[RESULT_01] Replace with real evaluation numbers (hit rate, answer accuracy)',
      '[RESULT_02] e.g. answer citation accuracy near 100% on eval set',
    ],
    status: 'archived',
    isPlaceholder: true,
  },
  {
    title: 'CAD/CAE Automation Toolkit',
    slug: 'cad-cae-automation',
    description:
      'An open-source Python toolkit that automates parametric CAD generation and CAE simulation loops.',
    longDescription:
      'Scriptable parametric design: generate CAD variants from parameters, mesh them, run CAE simulations headlessly, and collect results - enabling design-space exploration without manual clicking.',
    image: '/projects/cad-cae-automation/cover.svg',
    imageAlt: 'Parametric part variants feeding a simulation loop',
    categories: ['engineering', 'software', 'open-source'],
    tags: ['CAD', 'CAE', 'Automation', 'Python'],
    technologies: ['Python', 'CadQuery', 'OpenMDAO', 'NumPy', 'GitHub Actions'],
    github: '',
    githubRepo: '',
    demo: '',
    docs: '',
    featured: false,
    year: '2023',
    role: 'Author - parameterization API, simulation driver, CI examples',
    background:
      '[Replace with your real background] Design iterations meant hours of manual CAD edits and simulation setup for every variant.',
    problem:
      '[Replace with your real problem] Turning design parameters into validated simulation results automatically and reproducibly.',
    solution:
      '[Replace with your real solution] A parameter-driven generator produces CAD via CadQuery, a driver runs headless CAE jobs in containers, and results are aggregated into comparison tables and plots.',
    highlights: [
      'Parametric CAD generation from plain config files',
      'Headless simulation loop, parallel across variants',
      'Reproducible runs via Docker + GitHub Actions',
    ],
    gallery: [],
    results: [
      '[RESULT_01] Replace with real numbers (variants/day, time saved)',
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
