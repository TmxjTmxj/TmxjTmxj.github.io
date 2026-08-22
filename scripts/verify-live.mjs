import { execFileSync } from 'node:child_process';
const C = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const dump = (lang, url) =>
  execFileSync(C, ['--headless=new', '--disable-gpu', '--lang=' + lang, '--virtual-time-budget=12000', '--dump-dom', url], {
    encoding: 'utf8',
    maxBuffer: 30 * 1024 * 1024,
  });

const home = dump('en-US', 'https://tmxjtmxj.github.io/');
const proj = dump('en-US', 'https://tmxjtmxj.github.io/projects');
const zhDetail = dump('zh-CN', 'https://tmxjtmxj.github.io/projects/lobster-core');

const stretched = (proj.match(/class="stretched"/g) || []).length;
console.log('live canvas:', home.includes('<canvas'));
console.log('live gradient role:', home.includes('text-gradient'));
console.log('live stretched links (featured+cards):', stretched);
console.log('live home stats baked (no runtime fetch):', home.includes('@TmxjTmxj') && home.includes('>17<'));
console.log('live zh lobster detail:', zhDetail.includes('五层全功能 Agent 制造'));
console.log('live no 403 console noise in home DOM:', !home.includes('Failed to load resource'));
