// Downloads real project images from the GitHub repos into
// public/projects/<slug>/ with portfolio-friendly names.
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const base = 'https://raw.githubusercontent.com/TmxjTmxj';
const outRoot = path.resolve('public/projects');

const plan = [
  {
    repo: 'ros2-agent-workflow',
    files: [
      ['assets/banner.svg', 'cover.svg'],
      ['assets/architecture.svg', 'architecture.svg'],
      ['assets/hospital-camera-final.png', 'screenshot-01.png'],
      ['assets/hospital-camera-initial.png', 'screenshot-02.png'],
      ['assets/safety-state-machine.svg', 'screenshot-03.svg'],
      ['assets/hospital-route.svg', 'screenshot-04.svg'],
    ],
  },
  {
    repo: 'beifeng-wind-agent',
    files: [
      ['apps/desktop/screenshots/p7.3b/04-chat-agent.png', 'cover.png'],
      ['apps/desktop/screenshots/p7.4/01-live-inspector.png', 'screenshot-01.png'],
      ['apps/desktop/screenshots/p7.4/02-agent-console-events.png', 'screenshot-02.png'],
      ['apps/desktop/screenshots/p7.4/03-system-monitor.png', 'screenshot-03.png'],
      ['apps/desktop/screenshots/p7.4/04-conversation-tree-artifacts.png', 'screenshot-04.png'],
      ['apps/desktop/screenshots/p7.3b/01-startup-home.png', 'screenshot-05.png'],
    ],
  },
  {
    repo: 'cnc-cam-gcode-simulator',
    files: [
      ['docs/screenshots/overview.png', 'cover.png'],
      ['docs/screenshots/3d_milling.png', 'screenshot-01.png'],
      ['docs/screenshots/milling_workflow.png', 'screenshot-02.png'],
      ['docs/screenshots/3d_turning.png', 'screenshot-03.png'],
      ['docs/screenshots/turning_workflow.png', 'screenshot-04.png'],
    ],
  },
  {
    repo: 'shrapnel-force-predictor',
    files: [
      ['model_analysis.png', 'cover.png'],
      ['model_analysis.png', 'screenshot-01.png'],
    ],
  },
  {
    repo: 'ansys-mech-sim-cases',
    files: [
      ['figures/turbine_blade/equivalent_stress.png', 'cover.png'],
      ['figures/bearing6205/contact_pressure.png', 'screenshot-01.png'],
      ['figures/bearing6205/hertz_comparison.png', 'screenshot-02.png'],
      ['figures/bearing6205/mesh_convergence.png', 'screenshot-03.png'],
      ['figures/cylinder_coaxiality/equivalent_stress.png', 'screenshot-04.png'],
      ['figures/turbine_blade/boundary_conditions.png', 'screenshot-05.png'],
    ],
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          fs.writeFileSync(dest, Buffer.concat(chunks));
          resolve(Buffer.concat(chunks).length);
        });
      })
      .on('error', reject);
  });
}

let total = 0;
for (const { repo, files } of plan) {
  const dir = path.join(outRoot, repo);
  fs.mkdirSync(dir, { recursive: true });
  for (const [src, name] of files) {
    try {
      const bytes = await download(`${base}/${repo}/main/${src}`, path.join(dir, name));
      total += bytes;
      console.log(`✓ ${repo}/${name} (${(bytes / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.log(`✗ ${repo}/${name}: ${e.message}`);
    }
  }
}
console.log(`Done. ${(total / 1024 / 1024).toFixed(2)} MB downloaded.`);
