// v3 verification: whole-card clickability + live AgentNet + gradient accents.
import { execFileSync } from 'node:child_process';
const C = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const B = 'http://localhost:4173';
const dump = (url, lang = 'en', wait = 10000) =>
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

// Home: stretched featured card link + AgentNet canvas + gradient role.
const home = dump(`${B}/`);
check('home v3', home, [
  'stretched', 'text-gradient', '<canvas', 'spec-index', 'progress-bar', 'card-accent',
]);

// Projects: every card is a stretched link (10 cards => >= 10 "stretched").
const proj = dump(`${B}/projects`);
const stretchedCount = (proj.match(/class="stretched"/g) || []).length;
console.log(`--- projects ---`);
console.log(`stretched links on projects page: ${stretchedCount} (expect >= 10)`);
if (stretchedCount < 10) fail++;
console.log(`raised controls present: ${proj.includes('class="raised')}`);
if (!proj.includes('class="raised')) fail++;

// Detail: Gallery buttons + prev/next links still present.
const det = dump(`${B}/projects/ros2-agent-workflow`);
check('detail nav intact', det, ['aria-label="Open image gallery', 'Project navigation', 'View source on GitHub']);

console.log(fail === 0 ? '\nALL V3 CHECKS PASSED' : `\n${fail} CHECKS FAILED`);
