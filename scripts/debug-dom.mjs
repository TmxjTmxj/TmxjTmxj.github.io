import { execFileSync } from 'node:child_process';
const C = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const dump = (url, w) =>
  execFileSync(C, ['--headless=new', '--disable-gpu', `--virtual-time-budget=${w}`, '--dump-dom', url], {
    encoding: 'utf8',
    maxBuffer: 30 * 1024 * 1024,
  });

const det = dump('http://localhost:4173/projects/ros2-agent-workflow', 12000);
console.log('detail bytes:', det.length);
console.log('has root:', det.includes('id="root"'));
const m = det.match(/<title>(.*?)<\/title>/);
console.log('title:', m && m[1]);
console.log('first300:', det.slice(0, 300).replace(/\s+/g, ' '));
console.log('contains ROS2:', det.includes('ROS2'), '| Overview:', det.includes('Overview'), '| 工程难点:', det.includes('Fail-closed'));

const proj = dump('http://localhost:4173/projects', 8000);
console.log('projects bytes:', proj.length, '| Search:', proj.includes('Search projects'), '| ROS2:', proj.includes('ROS2 Agent Workflow'));
