/**
 * Skills - grouped by domain. No fake percentage bars: a skill is listed
 * with an honest proficiency tag (core / advanced / familiar).
 */

import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI & Agents',
    icon: 'ai',
    skills: [
      { name: 'LLM', level: 'core' },
      { name: 'AI Agent', level: 'core' },
      { name: 'RAG', level: 'advanced' },
      { name: 'Multi-Agent Systems', level: 'advanced' },
      { name: 'Tool Calling', level: 'core' },
      { name: 'MCP', level: 'familiar' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics',
    icon: 'robotics',
    skills: [
      { name: 'ROS2', level: 'advanced' },
      { name: 'Navigation', level: 'advanced' },
      { name: 'SLAM', level: 'familiar' },
      { name: 'Computer Vision', level: 'advanced' },
      { name: 'Robot Control', level: 'advanced' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: 'programming',
    skills: [
      { name: 'Python', level: 'core' },
      { name: 'C++', level: 'advanced' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'JavaScript', level: 'advanced' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    icon: 'engineering',
    skills: [
      { name: 'CAD', level: 'advanced' },
      { name: 'CAE', level: 'familiar' },
      { name: 'Simulation', level: 'advanced' },
      { name: 'Manufacturing', level: 'familiar' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: 'tools',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'Docker', level: 'advanced' },
      { name: 'Linux', level: 'core' },
      { name: 'GitHub Actions', level: 'advanced' },
      { name: 'VS Code', level: 'core' },
    ],
  },
];

/** Shown on the Skills page as "Currently exploring". */
export const currentlyExploring = [
  'Agent evaluation & observability',
  'Sim-to-real transfer for robot learning',
  'On-device LLM inference',
];
