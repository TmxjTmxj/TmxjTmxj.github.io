// DOM verification of the v2 redesign + content additions.
import { execFileSync } from 'node:child_process';
const C = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const B = 'http://localhost:4173';
const dump = (url, lang = 'en', wait = 12000) =>
  execFileSync(C, ['--headless=new', '--disable-gpu', `--lang=${lang}`, `--virtual-time-budget=${wait}`, '--dump-dom', url], {
    encoding: 'utf8',
    maxBuffer: 60 * 1024 * 1024,
  });

let fail = 0;
const check = (label, dom, needles) => {
  console.log(`--- ${label} ---`);
  for (const n of needles) {
    const ok = dom.includes(n);
    if (!ok) fail++;
    console.log(`${ok ? '✓' : '✗'} ${n}`);
  }
};

const home = dump(`${B}/`);
check('home design v2', home, [
  'spec-index', '01', 'Hi, I', 'border-l border-t border-line-strong', 'READY', 'progress-bar',
  'metric-num', 'metric-label', 'tmxjtmxj@portfolio', 'spec ./intelligent-systems', 'card-accent', 'spec-rule',
]);
const full = dump(`${B}/`, 'en', 6000);
check('home sections', full, ['01', '02', '03', '04', '05', 'spec-rule']);

const proj = dump(`${B}/projects`);
check('projects (10)', proj, [
  'Lobster Agent Core', 'Software Dev Team Skill', 'ROS2 Agent Workflow',
  'Search projects', '10 projects',
]);

const contact = dump(`${B}/contact`);
console.log(`--- contact ---`);
console.log(`linkedin hidden: ${!contact.includes('linkedin.com')}`);
if (contact.includes('linkedin.com')) fail++;
console.log(`email shown: ${contact.includes('yztmxj@163.com')}`);
if (!contact.includes('yztmxj@163.com')) fail++;

const resume = dump(`${B}/resume`);
console.log(`--- resume ---`);
console.log(`contact strip: ${resume.includes('github.com/TmxjTmxj')}`);
if (!resume.includes('github.com/TmxjTmxj')) fail++;

const zo = dump(`${B}/projects/lobster-core`, 'zh-CN');
check('lobster zh detail', zo, ['五层全功能 Agent 制造', '1189 行总控 Harness', '缰绳工程']);

console.log(fail === 0 ? '\nALL REDESIGN CHECKS PASSED' : `\n${fail} CHECKS FAILED`);
