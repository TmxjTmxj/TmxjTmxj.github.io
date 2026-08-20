/**
 * Experience timeline - derived from your real public information
 * (GitHub profile: "AI Agent Builder · 独立开发者", 山东大学机械).
 * Points marked [TODO] need your own words - fill in and remove
 * `isPlaceholder`. No fabricated experience is included.
 */

import type { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    org: 'Independent Developer — AI Agent Builder',
    role: 'AI Agent Engineer',
    period: '2026 - Present',
    type: 'Project',
    location: 'Remote',
    summary:
      'Building and shipping AI agent systems end-to-end: multi-agent orchestration, layered-memory agent cores, ROS2 + MCP robot control and AI for intelligent manufacturing. 16 public repositories, all MIT-licensed.',
    points: [
      'Shipped 7+ agent systems: Hermes / Lobster agent cores, Agent Orchestrator, TMXJ Agent (Rust), Beifeng Wind Agent and the ROS2 Agent Workflow.',
      'Applied agents to intelligent manufacturing: CAD/CAE automation (SolidWorks + ANSYS via MCP), CNC/CAM + G-code simulation, ML-driven shrapnel-force prediction.',
      'Wrote the agent-dev philosophy in practice: requirements, judgment, iteration and acceptance stay human — the code is written by agents.',
      '[TODO: measurable outcomes — users, downloads, benchmarks, or time saved]',
    ],
    tech: ['Python', 'Rust', 'ROS2', 'MCP', 'LLM'],
    isPlaceholder: true,
  },
  {
    org: 'Shandong University',
    role: 'Mechanical Engineering Student',
    period: '[START_YEAR] - Present',
    type: 'Organization',
    location: 'Shandong, China',
    summary:
      'Mechanical engineering student (山大机械) — combining classical mechanics and simulation with AI agents, working toward embodied intelligence and intelligent manufacturing.',
    points: [
      '[TODO: key courses, projects or labs worth mentioning]',
      '[TODO: achievements — awards, GPA, publications if any]',
      '[TODO: how your mechanical background connects to your agent work]',
    ],
    tech: ['CAD', 'CAE', 'Simulation', 'Mechanics'],
    isPlaceholder: true,
  },
];
