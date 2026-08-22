/**
 * Projects - real GitHub repositories (TmxjTmxj).
 * ------------------------------------------------------------
 * Titles, descriptions, links, technologies, categories, narratives,
 * metrics and images all come from your actual repositories + READMEs.
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
      'An open-source framework that lets AI agents (Codex / Claude / any MCP client) safely and reproducibly control ROS2 robots — validated on a full RoboCup hospital-delivery mission.',
    longDescription:
      'An agent-to-actuator framework: an AI agent drives a ROS2 robot through the MCP protocol at task-level intent ("deliver medicine from the pharmacy to ward 2") instead of low-level commands. Built from a real competition task — the China Robot Competition & RoboCup medicine-delivery robot event — and abstracted into a general, safe, reproducible framework: bounded MCP tools, a fail-closed safety gateway, declarative robot profiles and machine-verifiable acceptance evidence.',
    image: '/projects/ros2-agent-workflow/cover.svg',
    imageAlt: 'ROS2 Agent Workflow banner - MCP agent controlling a hospital AMR in Gazebo',
    categories: ['ai-agents', 'robotics'],
    tags: ['MCP', 'ROS2', 'Gazebo', 'AI Agent', 'Safety'],
    technologies: ['Python', 'ROS2', 'Gazebo', 'MCP', 'FastMCP'],
    github: `${GH}/ros2-agent-workflow`,
    githubRepo: 'TmxjTmxj/ros2-agent-workflow',
    featured: true,
    year: '2026',
    role: 'Sole developer — framework design, MCP server, fail-closed safety gateway, hospital AMR reference case, independent acceptance verification',
    background:
      'The project started as a real competition task: let an agent complete the hospital-delivery simulation of the China Robot Competition & RoboCup medicine-delivery event. The task was then generalized into a reusable framework — the competition is the case study, the framework is the product.',
    problem:
      'An LLM agent issuing raw robot commands is unsafe and unreproducible: unrestricted actions can crash hardware, every run behaves differently, and there is no way to verify that an agent actually completed the task rather than claiming it did.',
    solution:
      'A three-layer design: (1) an MCP server exposes bounded, type-safe task tools (discover, validate, arm, run, status, emergency-stop, observe, evidence) — never a raw shell; (2) a fail-closed safety gateway enforces activation permits, heartbeat monitoring and an E-stop latch with full audit logging; (3) an independent acceptance monitor observes ROS topics and generates machine-verifiable JSON evidence plus camera screenshots, so results cannot be forged.',
    highlights: [
      'Task-level intent ("deliver medicine to ward 2") instead of low-level commands',
      'Fail-closed safety: activation permits + heartbeat + E-stop latch + full audit',
      'Declarative robot/task profiles with validated safety boundaries',
      'Anti-forgery evidence: independent acceptance monitor, JSON report + camera proof',
      'Full hospital AMR reference case in Gazebo, one-command reproduction',
    ],
    architecture: {
      type: 'image',
      src: '/projects/ros2-agent-workflow/architecture.svg',
      alt: 'Agent → MCP server → safety gateway → ROS2 adapters → Gazebo hospital world',
      caption: 'Agent → MCP Server → Safety Gateway → ROS2 → Gazebo',
    },
    challenges: [
      {
        challenge: 'Making LLM-driven robot control safe enough to trust',
        analysis:
          'An agent that can move a robot can also crash it. Unbounded tool access means a single bad call becomes a hardware accident, and "trust the model" is not an engineering strategy.',
        solution:
          'A fail-closed safety kernel: every motion command must carry a valid activation permit, a heartbeat monitor faults the system on silence, an E-stop latch refuses all subsequent activation once triggered, and every transition is written to a persistent JSONL audit trail.',
        result: 'Zero collisions across the acceptance mission (12,831 contact messages tracked), and any anomaly terminates into a safe stop instead of an accident.',
      },
      {
        challenge: 'Proving the agent really finished the task (anti-forgery)',
        analysis:
          'Controller self-reported status cannot be trusted — an agent could claim success without moving. Verification had to come from independent observation of the ROS graph itself.',
        solution:
          'An acceptance monitor runs outside the controller: it checks the three-segment route endpoint errors, the publisher GID of every /cmd_vel message, forbidden-collision detection and decodable before/after camera screenshots, then emits a schema-validated JSON acceptance report.',
        result: 'Machine-verifiable acceptance_report.json with validation_errors: [] — every metric sourced from independent topic observation, shipped with the repo.',
      },
    ],
    gallery: [
      { src: '/projects/ros2-agent-workflow/screenshot-01.png', alt: 'Hospital AMR camera view at mission completion', caption: 'Camera evidence - mission complete' },
      { src: '/projects/ros2-agent-workflow/screenshot-02.png', alt: 'Hospital AMR camera view at mission start', caption: 'Camera evidence - mission start' },
      { src: '/projects/ros2-agent-workflow/screenshot-03.svg', alt: 'Fail-closed safety state machine diagram', caption: 'Safety state machine' },
      { src: '/projects/ros2-agent-workflow/screenshot-04.svg', alt: 'Three-segment hospital delivery route', caption: 'Hospital delivery route' },
    ],
    results: [
      'Mission completed in 49.6 s (limit: 180 s)',
      'Endpoint errors 0.325 / 0.337 / 0.341 m (limit: ≤ 0.50 m)',
      'Stop drift 0.0088 m (limit: ≤ 0.02 m)',
      '0 collisions across 12,831 tracked contact messages',
      '322 automated tests passing; every task went through 5 code-review cycles',
    ],
    status: 'active',
  },
  {
    title: 'Agent Orchestrator',
    slug: 'agent-orchestrator',
    description:
      'A lightweight multi-agent orchestration framework — plan → delegate → execute → collect — with 6 agent roles, 11 role definitions, parallel execution, failure isolation and token-sensitive context passing.',
    longDescription:
      'A small, readable orchestration runtime (576-line core) that turns LLM agents into a coordinated team: a central orchestrator plans, delegates in parallel, executes with per-agent failure isolation and collects results — while every sub-agent receives only its focused task, never the full context. Ships 11 professional agent role cards (orchestrator, plan-runner, code-explorer, code-executor, reviewers, security investigators) distilled from OpenCode Orchestrator configurations.',
    image: '/projects/agent-orchestrator/cover.svg',
    imageAlt: 'Agent Orchestrator coordinating six agent roles in parallel',
    categories: ['ai-agents', 'software', 'open-source'],
    tags: ['Multi-Agent', 'Orchestration', 'LLM', 'Python'],
    technologies: ['Python', 'LLM', 'Multi-Agent'],
    github: `${GH}/agent-orchestrator`,
    githubRepo: 'TmxjTmxj/agent-orchestrator',
    featured: true,
    year: '2026',
    role: 'Creator — orchestration pipeline, agent roles, failure isolation, skills',
    background:
      'Existing agent frameworks either lock you into a vendor or grow into platforms too large to understand. This project distills the minimal coordination primitives from OpenCode Orchestrator configurations into a framework you can read in an afternoon.',
    problem:
      'Coordinating multiple LLM agents reliably is hard: one failing worker must not sink the run, context bloat burns tokens and degrades quality, and read/write responsibilities blur without explicit roles.',
    solution:
      'A four-step pipeline — plan → delegate → execute → collect — with six built-in roles, strict read/write separation (code-explorer reads, code-executor writes), ThreadPoolExecutor parallelism, safe execution wrappers with timeouts and per-agent failure isolation, and task status tracking across the full lifecycle.',
    highlights: [
      'plan → delegate → execute → collect pipeline (576-line readable core)',
      '6 agent roles + 11 role definition cards with read/write separation',
      'Parallel execution (ThreadPoolExecutor) with failure isolation',
      'Token-sensitive: sub-agents receive only focused tasks, never full context',
      'Approval gating: non-trivial tasks are planned and approved before implementation',
    ],
    architecture: {
      type: 'mermaid',
      code: `flowchart LR
  T[Task] --> O[Orchestrator]
  O --> P[plan]
  P --> D{delegate}
  D --> W1[code-explorer]
  D --> W2[code-executor]
  D --> W3[plan-runner]
  W1 --> C[collect]
  W2 --> C
  W3 --> C
  C --> V[review & verify]
  V --> R[Result]
  W2 -.failure isolated, retried.-> C`,
      caption: 'plan → delegate → execute → collect with isolated workers',
    },
    challenges: [
      {
        challenge: 'Reliability when workers fail mid-run',
        analysis:
          'LLM sub-agents fail for many reasons — bad outputs, API errors, timeouts. Without isolation, one failure aborts the entire orchestrated run.',
        solution:
          'Every task runs through a safe execution wrapper with exception capture and timeout control; failures are isolated per agent and recorded in the task lifecycle (pending → running → completed/failed), so the run continues and the report shows exactly what failed.',
        result: '4/4 integration tests pass, including the parallel-delegation and full-pipeline runs.',
      },
    ],
    results: [
      '4/4 integration tests passing: parallel delegation, spec critique, code review, full pipeline',
      'Read/write duties strictly separated across explorer and executor roles',
    ],
    status: 'active',
  },
  {
    title: 'Beifeng Wind Agent',
    slug: 'beifeng-wind-agent',
    description:
      'A Rust-powered AI agent for wind-farm operations & maintenance: RAG knowledge hub, fault-graph diagnosis, rule-based safety, report generation, a 99.3% benchmark harness and a Tauri desktop workstation.',
    longDescription:
      'A specialized wind-turbine O&M agent built on a Claw Code–style Rust runtime: a local RAG "Wind Knowledge Hub" over fault cases, manuals and regulations with hybrid retrieval (vector + keyword + metadata); a lightweight component–symptom–cause fault graph; rule-based diagnosis and risk assessment; templated Markdown inspection reports; a 100-query benchmark harness with regression baselines; and a Tauri 2 desktop workstation (React + TypeScript) that ties it all together — with safety boundaries enforced at the prompt, rule and tool level.',
    image: '/projects/beifeng-wind-agent/cover.png',
    imageAlt: 'Beifeng Wind Agent desktop workstation - chat with the O&M agent',
    categories: ['ai-agents', 'engineering', 'research'],
    tags: ['RAG', 'Rust', 'Wind Energy', 'O&M', 'Tauri'],
    technologies: ['Rust', 'Tauri', 'RAG', 'LLM'],
    github: `${GH}/beifeng-wind-agent`,
    githubRepo: 'TmxjTmxj/beifeng-wind-agent',
    featured: true,
    year: '2026',
    role: 'Sole developer — Rust agent runtime, Wind Knowledge Hub (RAG + fault graph), safety layer, report generation, benchmark harness, Tauri workstation',
    background:
      'Wind-farm O&M knowledge lives scattered across fault cases, inspection manuals and regulations, and diagnosis quality depends on individual experts. The idea: adapt a general agent runtime to the wind domain and give field engineers an assistant that always answers with structure — 判断 → 原因 → 排查 → 建议 → 安全风险 → 补充数据 — and never bypasses safety.',
    problem:
      'Two hard requirements collide: domain diagnosis needs deep, retrievable wind knowledge, while a safety-critical industry needs strict boundaries. A generic chatbot fails both.',
    solution:
      'A domain stack on top of a provider-agnostic Rust runtime: hybrid RAG over the knowledge hub, a fault graph for structured diagnosis, a rule-based safety layer with human-confirmation gates for high-risk operations, templated report generation, and a 100-query / 10-category benchmark harness that measures the agent itself — all exposed through a Tauri 2 desktop workstation for local-first use.',
    highlights: [
      'Wind Knowledge Hub: hybrid retrieval (vector + keyword + metadata)',
      'Component–symptom–cause fault graph with risk levels',
      'Rule-based safety layer: forbidden actions + human-confirmation gates',
      'Benchmark harness: 100 queries, 10 categories, 99.3% overall',
      'Tauri 2 desktop workstation (React + TypeScript)',
    ],
    architecture: {
      type: 'image',
      src: '/projects/beifeng-wind-agent/architecture.svg',
      alt: 'Tauri desktop → Rust runtime → Wind Knowledge Hub → domain assets',
      caption: 'Desktop → Runtime → RAG / Fault Graph → Reports',
    },
    challenges: [
      {
        challenge: 'Safety boundaries for an agent in a safety-critical industry',
        analysis:
          'Wind-turbine O&M involves high-risk remote operations (shutdown, reset, pitch/yaw override, interlock bypass). An LLM assistant must never initiate these on its own.',
        solution:
          'Defense in depth at three levels: the system prompt forbids high-risk actions, rule-based gates require explicit human confirmation before any such operation, and the tool layer refuses to expose dangerous capabilities. Every answer also includes an explicit safety-risk section.',
        result: 'The agent acts strictly as an assistant for qualified engineers — it never executes or recommends high-risk remote operations without human confirmation.',
      },
      {
        challenge: 'Measuring whether the agent is actually good at its domain',
        analysis:
          'Without evaluation, prompt changes silently regress diagnosis quality. A benchmark needed to cover the full O&M task range and stay reproducible.',
        solution:
          'A 100-query, 10-category evaluation pipeline with regression baselines: each run scores the agent against stored expected answer structures, so every prompt or retrieval change is measured, not felt.',
        result: '99.3% overall benchmark score, with the harness shipped in-repo so anyone can re-run it.',
      },
    ],
    gallery: [
      { src: '/projects/beifeng-wind-agent/screenshot-01.png', alt: 'Live inspector with tool calls, knowledge hits and risk assessment', caption: 'Live inspector' },
      { src: '/projects/beifeng-wind-agent/screenshot-02.png', alt: 'Agent console with event timeline', caption: 'Agent console' },
      { src: '/projects/beifeng-wind-agent/screenshot-03.png', alt: 'System monitor: runtime, RAG and memory health', caption: 'System monitor' },
      { src: '/projects/beifeng-wind-agent/screenshot-04.png', alt: 'Conversation tree with artifacts', caption: 'Conversation tree & artifacts' },
      { src: '/projects/beifeng-wind-agent/screenshot-05.png', alt: 'Desktop workstation startup home', caption: 'Workstation home' },
    ],
    results: [
      '99.3% overall on the 100-query, 10-category benchmark harness',
      'Cross-platform Tauri 2 workstation: Windows / Linux / macOS',
      'Real diagnosis walkthrough and generated sample report shipped in-repo',
    ],
    status: 'active',
  },
  {
    title: 'Hermes Agent Core',
    slug: 'hermes-core',
    description:
      'A deep rework of an open-source agent into "a secretary with consciousness, memory and personality": a needs-driven consciousness engine, four-layer memory, a tavern-style personality interface and a cross-agent memory bridge.',
    longDescription:
      'A personal deep-modification practice on an open-source agent framework: on top of a standard agent loop, Hermes adds a needs-driven consciousness engine (five needs, emotion gradients, physiology, self-model, goal tree), a four-layer memory system (SQLite FTS5 session history, ChromaDB vector memory, Markdown file memory, Obsidian as physical fallback), an HTTP tavern personality interface with bidirectional memory sync, and a cross-agent memory bridge that shares memory with its sibling project lobster-core.',
    image: '/projects/hermes-core/cover.svg',
    imageAlt: 'Hermes Agent Core - consciousness engine with four-layer memory',
    categories: ['ai-agents', 'research'],
    tags: ['Agent Core', 'Memory', 'LLM', 'Python'],
    technologies: ['Python', 'LLM', 'ChromaDB', 'SQLite', 'Agent Memory'],
    github: `${GH}/hermes-core`,
    githubRepo: 'TmxjTmxj/hermes-core',
    featured: false,
    year: '2026',
    role: 'Creator — consciousness engine, four-layer memory, tavern interface, cross-agent memory bridge',
    background:
      'Standard agents are conversation tools: every session starts from zero. The experiment: what does an agent need to become a continuous existence — memory across sessions, a personality that evolves, and a self-model?',
    problem:
      'Stateless LLM agents forget everything between sessions and have no internal state driving behavior. Continuity, personality and shared knowledge between agents all have to be built by hand.',
    solution:
      'A stacked architecture: the consciousness engine ticks needs → emotions → physiology → self-model → goals each loop; the four-layer memory system gives short/medium/long/permanent storage with unified queries and automatic sync; the tavern HTTP interface exposes the personality with memory-bridged context; and the cross-agent bridge syncs memory with other agents by sequence numbers and tag retrieval.',
    highlights: [
      'Needs-driven consciousness engine: 5 needs, emotion gradients, goal tree',
      'Four-layer memory: SQLite FTS5 / ChromaDB / Markdown / Obsidian fallback',
      'Tavern personality interface with bidirectional memory sync',
      'Cross-agent memory bridge shared with lobster-core',
    ],
    status: 'active',
  },
  {
    title: 'TMXJ Agent',
    slug: 'tmxj-agent',
    description:
      'A DeepSeek-first terminal coding agent built in Rust — a friendly fork of Claw Code with first-class DeepSeek V4 reasoning support, full agentic tool use and session persistence.',
    longDescription:
      'A Rust CLI coding agent retargeted for DeepSeek models: DEEPSEEK_API_KEY / DEEPSEEK_MODEL environment routing, DeepSeek V4 reasoning_content protocol with deepseek-reasoner thinking display, a multi-provider layer (Anthropic, OpenAI, xAI/Grok, DashScope Qwen/Kimi, Ollama, local gateways), the full tool suite (bash, file ops, search, sub-agents, todos, MCP client/server, skills, plugins), agentic workflows (/plan, /review, /advisor, /team, /cron) and session persistence with auto-compact and cost tracking.',
    image: '/projects/tmxj-agent/cover.svg',
    imageAlt: 'TMXJ Agent - DeepSeek-first terminal coding agent in Rust',
    categories: ['ai-agents', 'software', 'open-source'],
    tags: ['Rust', 'DeepSeek', 'CLI', 'Coding Agent'],
    technologies: ['Rust', 'DeepSeek', 'CLI'],
    github: `${GH}/tmxj-agent`,
    githubRepo: 'TmxjTmxj/tmxj-agent',
    featured: false,
    year: '2026',
    role: 'Maintainer — DeepSeek-first provider routing, reasoning-protocol support and tooling (friendly fork of Claw Code)',
    background:
      'Most terminal coding agents are tuned for a single Western provider. DeepSeek models use their own reasoning protocol (V4 reasoning_content) and behave differently under generic routing — they deserved first-class support.',
    problem:
      'Using DeepSeek models through agents built for other providers loses the reasoning trace, breaks streaming details and leaves model selection to guesswork.',
    solution:
      'A friendly fork of Claw Code retargeted for DeepSeek: dedicated env routing, native DeepSeek V4 reasoning_content parsing with thinking display, plus a multi-provider layer so the agent still works with Anthropic, OpenAI, Grok, Qwen/Kimi and local gateways.',
    highlights: [
      'DeepSeek-first: env routing + V4 reasoning_content protocol',
      'deepseek-reasoner thinking display in the terminal',
      'Full tool suite: bash, file ops, search, sub-agents, MCP, plugins',
      'Session persistence: resume, auto-compact, cost tracking',
    ],
    status: 'maintained',
  },
  {
    title: 'CNC CAM & G-Code Simulator',
    slug: 'cnc-cam-gcode-simulator',
    description:
      'Engineering-grade desktop software for CNC CAM and G-code simulation: DXF import, CAM toolpath generation with cutter-radius offset, Fanuc-style G-code output and 2D/3D simulation for both milling and turning.',
    longDescription:
      'A PySide6 desktop application covering the CNC pipeline end-to-end: DXF import (LINE / ARC / CIRCLE / LWPOLYLINE with layer filtering), a CAM parameter panel, toolpath generation with cutter-radius compensation, dual milling (G17) and turning (G18) modes with correct coordinate mapping, Fanuc-style G-code output (G0-G3, G17/G18/G21/G90, M3/M5/M30, arc approximation or native G2/G3), and 2D/3D simulation canvases with dynamic material removal, real-time coordinates and machining-time estimation.',
    image: '/projects/cnc-cam-gcode-simulator/cover.jpg',
    imageAlt: 'CNC CAM G-Code Simulator main interface',
    categories: ['engineering', 'software'],
    tags: ['CNC', 'CAM', 'G-Code', 'Simulation', 'PySide6'],
    technologies: ['Python', 'PySide6', 'DXF', 'G-Code', '2D/3D Simulation'],
    github: `${GH}/cnc-cam-gcode-simulator`,
    githubRepo: 'TmxjTmxj/cnc-cam-gcode-simulator',
    featured: false,
    year: '2026',
    role: 'Sole developer — DXF parser, CAM toolpaths, Fanuc G-code generation, 2D/3D simulation canvases',
    background:
      'Industrial CAM toolchains are heavy, expensive and opaque — overkill for learning, small jobs and quick verification. The goal was an all-in-one local desktop flow: drawing in, toolpaths out, simulated before any metal is cut.',
    problem:
      'Turning a DXF drawing into correct, runnable G-code involves fiddly details: cutter-radius offset, milling vs. turning plane conventions (G17 vs. G18), and coordinate remapping (DXF X → lathe Z, DXF Y → lathe X diameter). Getting any of these wrong produces scrap.',
    solution:
      'A dedicated CAM layer handles the mapping explicitly: contour toolpaths with cutter-radius compensation, plane-aware code generation for both modes, coordinate zeroing to the workpiece origin, and 2D/3D simulation canvases that replay the exact generated G-code — including lathe rotary-section display with mirrored centerline — so the output is verified visually before export.',
    highlights: [
      'DXF import: LINE / ARC / CIRCLE / LWPOLYLINE with layer filtering',
      'CAM toolpaths with cutter-radius compensation',
      'Dual-mode G-code: G17 milling + G18 turning with correct remapping',
      '2D/3D simulation: material removal, real-time coordinates, time estimation',
      '44 automated tests passing',
    ],
    challenges: [
      {
        challenge: 'Correct turning-mode coordinate mapping',
        analysis:
          'In turning, the DXF drawing plane is not the machine plane: DXF X maps to lathe Z, and DXF Y must be converted to lathe X as a diameter, or the generated G-code is geometrically wrong.',
        solution:
          'A dedicated G18 mode maps DXF X → lathe Z and converts DXF Y by radius-to-diameter scaling, with the 3D simulation rendering the lathe part as a revolved section mirrored about the centerline so the mapping is visible.',
        result: 'Milling and turning workflows both verified end-to-end in the shipped 3D simulations.',
      },
    ],
    gallery: [
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-01.jpg', alt: '3D milling simulation with material removal', caption: '3D milling simulation' },
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-02.png', alt: 'Milling workflow', caption: 'Milling workflow' },
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-03.jpg', alt: '3D turning simulation', caption: '3D turning simulation' },
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-04.png', alt: 'Turning workflow', caption: 'Turning workflow' },
    ],
    results: [
      'Full DXF → toolpath → G-code → simulation loop in one desktop app',
      '44 automated tests passing',
      'One-click Windows executable packaging',
    ],
    status: 'maintained',
  },
  {
    title: 'Shrapnel Force Predictor',
    slug: 'shrapnel-force-predictor',
    description:
      'A machine-learning system that predicts shrapnel spring force from part dimensions — Creo parametric batch modeling + Abaqus simulation + 7-model regression, with 3.72% average accuracy difference. My first AI project, built as a hand-assembled pipeline.',
    longDescription:
      'A complete CAD → CAE → ML pipeline for industrial part force prediction: 200 random parameter sets generated with a 4:3:3 partition strategy, parametric batch modeling in Creo, per-part Abaqus simulation to extract maximum force (210-record dataset), then seven regression models (linear, ridge, lasso, random forest, gradient boosting, SVR, neural network) compared with cross-validation. The best model is serialized and served through an interactive predictor (single / Excel batch / manual entry) that turns "any part dimensions" into "force value" in seconds.',
    image: '/projects/shrapnel-force-predictor/cover.png',
    imageAlt: 'Shrapnel force predictor model evaluation visualization',
    categories: ['engineering', 'research'],
    tags: ['ML', 'Abaqus', 'Creo', 'CAE', 'Regression'],
    technologies: ['Python', 'Creo', 'Abaqus', 'ML Regression'],
    github: `${GH}/shrapnel-force-predictor`,
    githubRepo: 'TmxjTmxj/shrapnel-force-predictor',
    featured: false,
    year: '2026',
    role: 'Sole developer — parameter generation, Creo batch modeling, Abaqus simulation runs, model training & evaluation, interactive predictor',
    background:
      'My first AI work — there was no ready-made agent, only a hand-built pipeline: one part template, parameter-driven batch generation of 200 variants in Creo, then manual per-part simulation in Abaqus. The question was simple: can a trained model replace repeated simulation for force prediction?',
    problem:
      'Every design change on the shrapnel part previously required a full Abaqus simulation run. With only 210 simulation records available, a model had to generalize well enough to make prediction useful — not just fit the training set.',
    solution:
      'A pipeline from data to deployment: parameter sets generated with a 4:3:3 strategy (overlap / unique / edge regions), batch parametric CAD modeling, simulation to extract maximum force per part, then seven regression models trained and compared with cross-validation. The best model is persisted and served interactively for single, Excel-batch and manual predictions.',
    highlights: [
      '200 parametric variants generated (4:3:3 overlap/unique/edge split)',
      'Creo parametric batch modeling + per-part Abaqus simulation',
      '7 regression models compared with cross-validation',
      'Interactive prediction: single / Excel batch / manual entry',
    ],
    challenges: [
      {
        challenge: 'Generalizing from a small simulation dataset',
        analysis:
          'Only 210 simulation records existed, and each record cost a full Abaqus run. Overfitting would make predictions useless on unseen dimensions.',
        solution:
          'Train seven model families with cross-validation, compare error and R², select the best performer, and validate on an independent 12-part holdout set with reported per-part accuracy differences.',
        result: '3.72% average accuracy difference on the independent validation set.',
      },
    ],
    gallery: [
      { src: '/projects/shrapnel-force-predictor/screenshot-01.png', alt: 'Model comparison and residual analysis plots', caption: 'Model evaluation & residuals' },
    ],
    results: [
      '3.72% average prediction accuracy difference vs. simulation',
      '7-model benchmark: linear / ridge / lasso / random forest / GBM / SVR / neural network',
      'Trained model shipped in-repo — predictions run offline in seconds',
    ],
    status: 'maintained',
  },
  {
    title: 'ANSYS Mechanical Simulation Cases',
    slug: 'ansys-mech-sim-cases',
    description:
      'Three mechanical component simulation cases — turbine blade, hydraulic cylinder coaxiality, deep-groove ball bearing — modeled in SolidWorks and simulated in ANSYS Workbench/Fluent, automated end-to-end by a Codex AI agent through MCP with zero GUI interaction.',
    longDescription:
      'A library of structural analysis cases covering the three classic analysis types: a turbine blade under 12000 rpm centrifugal load + 0.2 MPa pressure, a hydraulic cylinder coaxiality analysis under 5000 N radial load, and a 6205 deep-groove ball bearing with 18 nonlinear contact pairs compared against Hertz theory. Every case follows the same automated chain — SolidWorks parametric modeling → STEP export → ANSYS Workbench import → meshing with convergence verification → boundary conditions → solve → DPF post-processing → engineering report — driven end-to-end by a Codex AI agent through MCP servers.',
    image: '/projects/ansys-mech-sim-cases/cover.jpg',
    imageAlt: 'Turbine blade equivalent stress contour',
    categories: ['engineering', 'ai-agents'],
    tags: ['ANSYS', 'SolidWorks', 'MCP', 'CAE', 'AI Automation'],
    technologies: ['SolidWorks', 'ANSYS Workbench', 'Fluent', 'MCP'],
    github: `${GH}/ansys-mech-sim-cases`,
    githubRepo: 'TmxjTmxj/ansys-mech-sim-cases',
    featured: false,
    year: '2026',
    role: 'Author — parametric models, simulation setups, MCP-driven end-to-end automation, engineering reports',
    background:
      'CAD-to-CAE workflows are repetitive, GUI-bound and error-prone — and their results are only as honest as the person reading them. This project tests how far an AI agent can drive the entire chain (SolidWorks → ANSYS → report) through MCP tooling, with engineering rigor as the non-negotiable part.',
    problem:
      'Two problems at once: automating a full CAE pipeline without GUI interaction, and reporting simulation results honestly — distinguishing converged results from mesh-sensitive singularities instead of hiding them.',
    solution:
      'A Codex AI agent drives SolidWorks via API and ANSYS via MCP servers through the full chain. Every case includes 3-4 level mesh convergence verification, theory cross-checks (Hertz contact theory for the bearing), and a written engineering report that explicitly classifies singular stress peaks as non-converged instead of presenting them as design values.',
    highlights: [
      '3 classic cases: turbine blade · cylinder coaxiality · rolling bearing',
      'End-to-end CAD → CAE → report automation by AI agent via MCP',
      'Mesh convergence verification (3-4 levels) in every case',
      'Hertz theory cross-validation of bearing contact pressure',
      'Honest reporting: singular peaks flagged, not hidden',
    ],
    challenges: [
      {
        challenge: 'Separating converged results from mesh-sensitive singularities',
        analysis:
          'The blade model showed a 272.4 MPa peak at a zero-fillet geometry point that refused to converge as the mesh refined — presenting it as the design stress would be wrong, and deleting it would be dishonest.',
        solution:
          'Multi-level mesh convergence verification with explicit classification: results that stabilize within 5% across refinements are reported as converged design values; geometry-singular peaks that grow with refinement are flagged as non-converged artifacts and excluded from design conclusions.',
        result: 'Blade design stress reported as 196.7 MPa (safety factor ≈ 5.24) with the 272.4 MPa singularity explicitly documented as a mesh-sensitive peak.',
      },
    ],
    gallery: [
      { src: '/projects/ansys-mech-sim-cases/screenshot-01.jpg', alt: 'Bearing contact pressure contour', caption: 'Bearing contact pressure' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-02.png', alt: 'FEA vs Hertz theory comparison', caption: 'Hertz theory comparison' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-03.png', alt: 'Mesh convergence study', caption: 'Mesh convergence' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-04.jpg', alt: 'Cylinder equivalent stress', caption: 'Cylinder coaxiality' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-05.jpg', alt: 'Turbine blade boundary conditions', caption: 'Blade boundary conditions' },
    ],
    results: [
      'Turbine blade: 196.7 MPa max stress (SF ≈ 5.24), converged',
      'Cylinder coaxiality change: 0.0557 mm (least-squares fit of 71,392 bore nodes)',
      'Bearing: 18 nonlinear contact pairs, FEA/Hertz = 4.909 / 7.385 GPa with stated limitations',
      'Three full engineering reports (PDF) with input checks, solution checks and limitation statements',
    ],
    status: 'maintained',
  },
  {
    title: 'Lobster Agent Core',
    slug: 'lobster-core',
    description:
      'A five-layer agent building framework — harness engineering with a 1189-line master harness: memory layering, skill factory, learning loop, consciousness engine and task system, plus subagent delegation and command security auditing.',
    longDescription:
      'A deep rework of an open-source agent framework centered on a 1189-line master harness: layered prompt hierarchy, auto-updating user profile, hybrid full-text memory search (FTS5 exact → LIKE fuzzy → LLM semantic), a skill catalog, standardized subagent delegation, command security auditing, session freezing with drift detection, and thinking-chain injection. Underneath sits a three-tier memory system (L1 identity, L2 scene context, L3 ChromaDB vector memory), a consciousness engine, a self-evolving learning loop, an async task system and message/model routing — the "worker agent" counterpart to the Hermes core.',
    image: '/projects/lobster-core/cover.svg',
    imageAlt: 'Lobster Agent Core - five-layer harness engineering',
    categories: ['ai-agents', 'research'],
    tags: ['Agent Core', 'Harness', 'Memory', 'LLM', 'Python'],
    technologies: ['Python', 'ChromaDB', 'SQLite', 'LLM', 'Agent Memory'],
    github: `${GH}/lobster-core`,
    githubRepo: 'TmxjTmxj/lobster-core',
    featured: false,
    year: '2026',
    role: 'Creator — 1189-line harness, three-tier memory, learning loop, task system, security audit',
    background:
      'Standard agents drift: they forget context, run unbounded conversations and have no way to learn from their own failures. The harness approach imposes engineering discipline on the loop itself.',
    problem:
      'Long sessions degrade — context bloat, no memory of user preferences, no audit trail for commands, and no mechanism to codify what worked into a reusable skill.',
    solution:
      'A master harness that wraps the entire loop: three-tier memory (identity / scene / vector), automatic user-profile learning and memory compaction, command security auditing with configurable rejection, drift detection against a baseline, and a learning loop that records outcomes and auto-creates skills — with subagent delegation standardized and every cross-agent message routed through the orchestrator.',
    highlights: [
      '1189-line master harness wrapping the full agent loop',
      'Three-tier memory: L1 identity / L2 scene / L3 vector (ChromaDB)',
      'Skill factory: outcomes recorded, skills auto-created from wins',
      'Command security audit + session freeze + drift detection',
      'Consciousness engine + async task system + message/model routing',
    ],
    status: 'active',
  },
  {
    title: 'Software Dev Team Skill',
    slug: 'software-dev-team-skill',
    description:
      'A multi-agent SOP skill pack that turns Claude Code / workbuddy into a disciplined virtual dev team — PM, Architect, Engineer & QA, with workflow routing, feedback loops and an IS_PASS quality gate.',
    longDescription:
      'A skill pack (SKILL.md + references + agent definitions) that decomposes a software request into a virtual team collaboration: a coordinator routes work across a Product Manager, Architect, Engineer and QA — each with a distinct persona, tight responsibility boundaries and strict output templates. Four workflow routes (quick mode, BugFix, standard SOP, partial workflows), a requirement-clarification mechanism, explicit feedback loops, an IS_PASS quality gate before QA, and industrial reference specs for coding, scaffolding and test strategy. Ships bilingual (中文 / English).',
    image: '/projects/software-dev-team-skill/cover.svg',
    imageAlt: 'Software Dev Team Skill - multi-agent SOP pack',
    categories: ['ai-agents', 'software', 'open-source'],
    tags: ['Multi-Agent', 'SOP', 'Skill Pack', 'Claude Code', 'workbuddy'],
    technologies: ['SKILL.md', 'Multi-Agent', 'Claude Code', 'workbuddy'],
    github: `${GH}/software-dev-team-skill`,
    githubRepo: 'TmxjTmxj/software-dev-team-skill',
    featured: false,
    year: '2026',
    role: 'Creator — team model, workflow routing, feedback loops, quality gate, reference specs',
    background:
      'The insight that a single AI assistant no longer has to write everything alone: a software request can be decomposed into a disciplined team where the code is a team output produced by SOP. "代码不是一个人写的，是 SOP 产出的团队成果。"',
    problem:
      'Single-assistant development produces inconsistent results — no requirements doc, no design, no QA gate, and no way to keep a multi-agent run reproducible and quality-controlled.',
    solution:
      'An SOP that formalizes roles: the PM writes the PRD, the architect designs and decomposes tasks, the engineer implements, QA verifies — all routed by a coordinator. Roles carry personas and strict templates, workflows auto-route by request size/type, feedback loops return defects to the correct role, and an IS_PASS gate must be green before code reaches QA.',
    highlights: [
      '5 roles with distinct personas + strict output templates',
      '4 workflow routes: quick, BugFix, standard SOP, partial',
      'Feedback loops: QA→engineer, architect→PM, engineer→architect',
      'IS_PASS global consistency gate before QA',
      'Industrial reference specs: coding standards, scaffolding, QA strategy',
    ],
    status: 'maintained',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const allCategories = [
  ...new Set(projects.flatMap((p) => p.categories)),
] as Project['categories'];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
