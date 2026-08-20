// Verifies zh/en rendering by launching headless Chrome with different
// language preferences and checking the rendered DOM.
import { execFileSync } from 'node:child_process';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'http://localhost:4173/';

function dumpDom(lang, url = URL) {
  return execFileSync(
    CHROME,
    ['--headless=new', '--disable-gpu', `--lang=${lang}`, '--virtual-time-budget=12000', '--dump-dom', url],
    { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 },
  );
}

const zh = dumpDom('zh-CN');
const en = dumpDom('en-US');

const checks = [
  ['zh home', zh, ['你好，我是', '查看项目', '代表作品', '我不手写传统代码', '接受实习与全职机会', 'AI Agent 工程师 · 智能制造', '<html lang="zh"']],
  ['en home', en, ['Hi, I’m', 'View Projects', 'Selected work', 'command AI agents that land intelligent manufacturing', 'AI Agent Engineer · Intelligent Manufacturing', '<html lang="en"']],
];

let failed = 0;
for (const [label, dom, needles] of checks) {
  console.log(`--- ${label} ---`);
  for (const n of needles) {
    const ok = dom.includes(n);
    if (!ok) failed++;
    console.log(`${ok ? '✓' : '✗'} ${n}`);
  }
}

// Language toggle button must exist in both languages.
const zhToggle = zh.includes('切换语言');
const enToggle = en.includes('Switch language');
console.log(`toggle zh: ${zhToggle} · toggle en: ${enToggle}`);
if (!zhToggle || !enToggle) failed++;

// Project detail page in zh.
const zhDetail = dumpDom('zh-CN', 'http://localhost:4173/projects/ros2-agent-workflow');
for (const n of ['工程难点', '防伪证据', '49.6 s', '送药巡诊机器人赛项', '成果']) {
  const ok = zhDetail.includes(n);
  if (!ok) failed++;
  console.log(`${ok ? '✓' : '✗'} zh detail: ${n}`);
}

console.log(failed === 0 ? '\nALL I18N CHECKS PASSED' : `\n${failed} CHECKS FAILED`);
process.exit(failed === 0 ? 0 : 1);
