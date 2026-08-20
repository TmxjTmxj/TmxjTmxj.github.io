/**
 * Skills - grouped by domain and grounded in your actual repositories.
 * No fake percentage bars: proficiency tags are honest labels.
 * Adjust levels to match your real comfort before shipping.
 */

import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI & Agents',
    icon: 'ai',
    skills: [
      { name: 'AI Agent', level: 'core' },
      { name: 'LLM', level: 'core' },
      { name: 'Multi-Agent Systems', level: 'core' },
      { name: 'Agent Memory', level: 'advanced' },
      { name: 'RAG', level: 'advanced' },
      { name: 'MCP', level: 'core' },
      { name: 'Tool Calling', level: 'core' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics & Embodied AI',
    icon: 'robotics',
    skills: [
      { name: 'ROS2', level: 'advanced' },
      { name: 'Gazebo Simulation', level: 'advanced' },
      { name: 'Robot Simulation', level: 'advanced' },
      { name: 'Agent-to-Robot Control', level: 'advanced' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: 'programming',
    skills: [
      { name: 'Python', level: 'core' },
      { name: 'Rust', level: 'advanced' },
      { name: 'TypeScript', level: 'familiar' },
      { name: 'JavaScript', level: 'familiar' },
      { name: 'PowerShell', level: 'familiar' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    icon: 'engineering',
    skills: [
      { name: 'CAD (SolidWorks / Creo)', level: 'advanced' },
      { name: 'CAE (Abaqus / ANSYS)', level: 'advanced' },
      { name: 'CAM / G-Code', level: 'advanced' },
      { name: 'Intelligent Manufacturing', level: 'advanced' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'tools',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'Linux', level: 'advanced' },
      { name: 'GitHub Actions', level: 'familiar' },
      { name: 'Tauri', level: 'familiar' },
      { name: 'Obsidian', level: 'advanced' },
    ],
  },
];

/** Shown on the Skills page as "Currently exploring". */
export const currentlyExploring = [
  'Embodied intelligence — agents in the physical world',
  'Tauri desktop apps for industrial O&M',
  'DeepSeek-first agent infrastructure',
];
