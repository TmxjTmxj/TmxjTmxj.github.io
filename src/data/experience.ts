/**
 * Experience timeline - edit this file to add your real history.
 * Every entry is a placeholder; replace and remove `isPlaceholder`.
 */

import type { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    org: '[COMPANY_01_NAME]',
    role: 'Robotics / AI Engineering Intern',
    period: '2025 - Present',
    type: 'Internship',
    location: '[CITY, COUNTRY]',
    summary:
      '[One-line summary - replace] Intern on the robotics platform team, building AI-agent tooling for robot task execution.',
    points: [
      '[RESPONSIBILITY_01] e.g. Built an LLM-agent interface that converts natural-language tasks into ROS2 action sequences.',
      '[ACHIEVEMENT_02] e.g. Reduced task-specification time from hours to minutes for the integration team.',
      '[TECHNOLOGY_03] e.g. Python, ROS2, FastAPI, LLM tool-calling, Docker.',
      '[RESULT_04] e.g. System used in weekly demos by 3 teams.',
    ],
    tech: ['Python', 'ROS2', 'LLM', 'Docker'],
    isPlaceholder: true,
  },
  {
    org: '[UNIVERSITY_NAME] - Intelligent Systems Lab',
    role: 'Undergraduate Research Assistant',
    period: '2024 - 2025',
    type: 'Research',
    location: '[CITY, COUNTRY]',
    summary:
      '[One-line summary - replace] Research on perception for autonomous robots in dynamic indoor environments.',
    points: [
      '[RESPONSIBILITY_01] e.g. Implemented a visual-inertial SLAM pipeline and evaluated it on public benchmarks.',
      '[ACHIEVEMENT_02] e.g. Improved localization accuracy by X% versus the baseline.',
      '[RESULT_03] e.g. Contributed to a workshop paper / internal technical report.',
    ],
    tech: ['C++', 'ROS2', 'OpenCV', 'GTSAM'],
    isPlaceholder: true,
  },
  {
    org: '[COMPETITION_NAME] (RoboCup / RoboMaster / equivalent)',
    role: 'Team Lead - Autonomous Navigation',
    period: '2023 - 2024',
    type: 'Competition',
    location: '[LOCATION]',
    summary:
      '[One-line summary - replace] Led the navigation sub-team of a student robotics competition team.',
    points: [
      '[RESPONSIBILITY_01] e.g. Designed the navigation stack and led 4 teammates through integration.',
      '[ACHIEVEMENT_02] e.g. Achieved top-X finish / qualified for the finals.',
      '[RESULT_03] e.g. Open-sourced parts of the stack after the season.',
    ],
    tech: ['ROS2', 'Python', 'C++', 'Gazebo'],
    isPlaceholder: true,
  },
  {
    org: '[OPEN_SOURCE_ORG]',
    role: 'Open Source Contributor / Maintainer',
    period: '2023 - Present',
    type: 'Organization',
    summary:
      '[One-line summary - replace] Contributor to open-source tooling in the AI / robotics ecosystem.',
    points: [
      '[CONTRIBUTION_01] e.g. Merged N pull requests fixing issues and adding tests.',
      '[CONTRIBUTION_02] e.g. Maintained a small package with X stars.',
      '[RESULT_03] e.g. Learned to work with maintainers across time zones and review cycles.',
    ],
    tech: ['TypeScript', 'Python', 'Git', 'CI/CD'],
    isPlaceholder: true,
  },
];
