/**
 * Generates a minimal valid single-page placeholder PDF at
 * public/resume/resume.pdf (no dependencies). Replace that file with your
 * real resume PDF - the site links to it by name only.
 * Run:  npm run resume:placeholder
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'resume', 'resume.pdf');

const escText = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

const lines = [
  { font: 'F2', size: 22, y: 742, text: '[YOUR_NAME]' },
  { font: 'F1', size: 12, y: 722, text: 'AI Agent / Robotics / Software Engineer' },
  { font: 'F1', size: 10, y: 704, text: '[YOUR_EMAIL]  |  github.com/your-github-username  |  [YOUR_LOCATION]' },
  { font: 'F2', size: 11, y: 664, text: 'PLACEHOLDER RESUME' },
  { font: 'F1', size: 10, y: 646, text: 'This file is a placeholder. Replace public/resume/resume.pdf with your real resume PDF.' },
  { font: 'F2', size: 12, y: 606, text: 'Summary' },
  { font: 'F1', size: 10, y: 590, text: 'Engineer focused on AI agents, robotics and engineering software.' },
  { font: 'F2', size: 12, y: 550, text: 'Experience' },
  { font: 'F1', size: 10, y: 534, text: '[COMPANY_01] - Robotics / AI Engineering Intern (2025 - Present)' },
  { font: 'F1', size: 10, y: 520, text: '[UNIVERSITY] Intelligent Systems Lab - Research Assistant (2024 - 2025)' },
  { font: 'F2', size: 12, y: 480, text: 'Skills' },
  { font: 'F1', size: 10, y: 464, text: 'Python · C++ · TypeScript · ROS2 · LLM / AI Agents · Computer Vision · Docker · Linux' },
  { font: 'F2', size: 12, y: 424, text: 'Projects' },
  { font: 'F1', size: 10, y: 408, text: 'AI-Agent Robot Control System - natural language to ROS2 task execution' },
  { font: 'F1', size: 10, y: 394, text: 'Multi-Agent Task Orchestration Framework - typed messaging, shared memory, evals' },
  { font: 'F2', size: 12, y: 354, text: 'Education' },
  { font: 'F1', size: 10, y: 338, text: '[UNIVERSITY_NAME], [DEGREE] in [MAJOR] ([GRAD_YEAR])' },
];

let stream = '';
for (const l of lines) {
  stream += `BT /${l.font} ${l.size} Tf 50 ${l.y} Td (${escText(l.text)}) Tj ET\n`;
}
stream += `BT /F1 8 Tf 50 60 Td (Generated placeholder - replace with your real resume PDF) Tj ET\n`;

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`,
];

let pdf = '%PDF-1.4\n';
const offsets = [0];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}
const xrefPos = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

mkdirSync(join(root, 'public', 'resume'), { recursive: true });
writeFileSync(out, pdf, 'binary');
console.log(`✓ ${out} (${Buffer.byteLength(pdf)} bytes)`);
