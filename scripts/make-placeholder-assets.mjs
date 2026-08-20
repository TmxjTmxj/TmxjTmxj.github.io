/**
 * Placeholder asset generator.
 * ---------------------------------------------------------------
 * Generates consistent, engineering-styled SVG assets (covers,
 * architecture diagrams, screenshots) for every placeholder project.
 * Run:  npm run assets:placeholder
 * Replace the generated files with real WebP/PNG screenshots when
 * you fill in your projects (see CONTENT_TODO.md).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'projects');

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ------------------------------------------------------------------ */
/* Cover: dark engineering topology with title                         */
/* ------------------------------------------------------------------ */
function cover({ tag, title, subtitle, accent, nodes, edges }) {
  const nodeEls = nodes
    .map(
      (n, i) => `
  <circle cx="${n[0]}" cy="${n[1]}" r="${n[2] ?? 7}" fill="${accent}22" stroke="${accent}" stroke-width="1.5"/>
  <circle cx="${n[0]}" cy="${n[1]}" r="2.5" fill="${accent}"/>${
    n[3]
      ? `
  <text x="${n[0]}" y="${n[1] - 14}" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">${esc(n[3])}</text>`
      : ''
  }${i === 0 ? `
  <circle cx="${n[0]}" cy="${n[1]}" r="14" fill="none" stroke="${accent}" stroke-width="1" opacity="0.35"/>` : ''}`,
    )
    .join('');
  const edgeEls = edges
    .map(([a, b]) => {
      const p1 = nodes[a];
      const p2 = nodes[b];
      return `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${accent}" stroke-width="1" opacity="0.3"/>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${esc(title)}">
  <rect width="1200" height="800" fill="#0d1117"/>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#21262d" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#grid)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>
  <text x="60" y="64" font-family="monospace" font-size="16" fill="${accent}">${esc(tag)}</text>
  <text x="1140" y="64" text-anchor="end" font-family="monospace" font-size="14" fill="#8b949e">placeholder asset</text>
  ${edgeEls}
  ${nodeEls}
  <rect x="60" y="610" width="6" height="52" fill="${accent}"/>
  <text x="86" y="648" font-family="Inter, system-ui, sans-serif" font-size="40" font-weight="700" fill="#e6edf3">${esc(title)}</text>
  <text x="88" y="688" font-family="monospace" font-size="17" fill="#8b949e">${esc(subtitle)}</text>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Architecture: light flow diagram, boxes + arrows                    */
/* ------------------------------------------------------------------ */
function architecture({ title, accent, boxes, arrows }) {
  const boxEls = boxes
    .map(
      (b) => `
  <g>
    <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="10" fill="${b.fill ?? '#ffffff'}" stroke="${b.stroke ?? '#d0d7de'}" stroke-width="1.5"/>
    <text x="${b.x + b.w / 2}" y="${b.y + b.h / 2 - (b.sub ? 10 : 0)}" text-anchor="middle" font-family="monospace" font-size="15" font-weight="600" fill="#1f2328">${esc(b.label)}</text>${
    b.sub
      ? `
    <text x="${b.x + b.w / 2}" y="${b.y + b.h / 2 + 14}" text-anchor="middle" font-family="monospace" font-size="11" fill="#59636e">${esc(b.sub)}</text>`
      : ''
  }</g>`,
    )
    .join('');
  const arrowEls = arrows
    .map(([from, to, label]) => {
      const a = boxes.find((b) => b.id === from);
      const c = boxes.find((b) => b.id === to);
      if (!a || !c) return '';
      const x1 = a.x + a.w / 2;
      const y1 = a.y + a.h / 2;
      const x2 = c.x + c.w / 2;
      const y2 = c.y + c.h / 2;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      return `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${accent}" stroke-width="2" marker-end="url(#arrow)"/>
  ${
    label
      ? `<text x="${midX}" y="${midY - 8}" text-anchor="middle" font-family="monospace" font-size="11" fill="#59636e">${esc(label)}</text>`
      : ''
  }`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${esc(title)}">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${accent}"/>
    </marker>
  </defs>
  <rect width="1200" height="800" fill="#f6f8fa"/>
  <text x="60" y="60" font-family="monospace" font-size="15" fill="${accent}">// system-architecture</text>
  <text x="60" y="92" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="700" fill="#1f2328">${esc(title)}</text>
  ${boxEls}
  ${arrowEls}
  <text x="60" y="760" font-family="monospace" font-size="12" fill="#59636e">placeholder diagram - replace with the real architecture</text>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Browser-frame wrappers for screenshots                              */
/* ------------------------------------------------------------------ */
function browserFrame({ accent, inner, url }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${esc(url)}">
  <rect width="1200" height="800" fill="#0d1117"/>
  <rect x="60" y="50" width="1080" height="700" rx="12" fill="#161b22" stroke="#30363d"/>
  <rect x="60" y="50" width="1080" height="40" rx="12" fill="#21262d"/>
  <rect x="60" y="78" width="1080" height="12" fill="#21262d"/>
  <circle cx="88" cy="70" r="6" fill="#f85149"/>
  <circle cx="110" cy="70" r="6" fill="#d29922"/>
  <circle cx="132" cy="70" r="6" fill="#3fb950"/>
  <rect x="160" y="58" width="880" height="24" rx="6" fill="#0d1117" stroke="#30363d"/>
  <text x="176" y="75" font-family="monospace" font-size="13" fill="#8b949e">${esc(url)}</text>
  ${inner}
</svg>`;
}

function terminalShot({ url, accent, lines }) {
  const body = lines
    .map((l, i) => {
      const [tone, text] = l;
      const color = tone === 'cmd' ? '#3fb950' : tone === 'out' ? '#e6edf3' : tone === 'warn' ? '#d29922' : '#8b949e';
      return `<text x="100" y="${150 + i * 30}" font-family="monospace" font-size="15" fill="${color}">${esc(text)}</text>`;
    })
    .join('');
  return browserFrame({
    url,
    accent,
    inner: `<rect x="84" y="114" width="1032" height="612" rx="8" fill="#010409"/>
${body}
<text x="100" y="${150 + lines.length * 30 + 8}" font-family="monospace" font-size="15" fill="#3fb950">▊</text>`,
  });
}

function dashboardShot({ url, accent, stats, bars, sideLabel }) {
  const statEls = stats
    .map(([label, value], i) => {
      const x = 104 + i * 250;
      return `<rect x="${x}" y="140" width="226" height="84" rx="8" fill="#1c2128" stroke="#30363d"/>
  <text x="${x + 18}" y="170" font-family="monospace" font-size="12" fill="#8b949e">${esc(label)}</text>
  <text x="${x + 18}" y="202" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="700" fill="${accent}">${esc(value)}</text>`;
    })
    .join('');
  const max = Math.max(...bars.map((b) => b[1]));
  const barEls = bars
    .map(([label, value], i) => {
      const h = (value / max) * 320;
      const x = 140 + i * 130;
      return `<rect x="${x}" y="${600 - h}" width="56" height="${h}" rx="4" fill="${accent}" opacity="${0.45 + (i / bars.length) * 0.5}"/>
  <text x="${x + 28}" y="${620}" text-anchor="middle" font-family="monospace" font-size="12" fill="#8b949e">${esc(label)}</text>`;
    })
    .join('');
  return browserFrame({
    url,
    accent,
    inner: `${statEls}
  <rect x="104" y="250" width="780" height="430" rx="8" fill="#161b22" stroke="#30363d"/>
  <text x="124" y="284" font-family="monospace" font-size="13" fill="#8b949e">${esc(sideLabel)}</text>
  ${barEls}
  <rect x="908" y="250" width="208" height="430" rx="8" fill="#161b22" stroke="#30363d"/>
  <text x="926" y="284" font-family="monospace" font-size="13" fill="#8b949e">status</text>
  <circle cx="950" cy="320" r="5" fill="#3fb950"/><text x="966" y="325" font-family="monospace" font-size="12" fill="#e6edf3">running</text>
  <circle cx="950" cy="350" r="5" fill="#3fb950"/><text x="966" y="355" font-family="monospace" font-size="12" fill="#e6edf3">connected</text>
  <circle cx="950" cy="380" r="5" fill="#d29922"/><text x="966" y="385" font-family="monospace" font-size="12" fill="#e6edf3">planning</text>`,
  });
}

/* ------------------------------------------------------------------ */
/* Project definitions                                                */
/* ------------------------------------------------------------------ */
const projects = [
  {
    slug: 'ai-agent-robot-control',
    accent: '#4493f8',
    cover: {
      tag: 'ai_agents / ros2 / cv',
      title: 'AI-Agent Robot Control',
      subtitle: 'natural language → validated task graph → real-time control',
      nodes: [
        [600, 330, 7, 'agent'], [300, 180, 7], [900, 180, 7], [180, 380, 7],
        [1020, 380, 7], [420, 500, 7, 'planner'], [780, 500, 7, 'supervisor'],
        [600, 590, 7, 'ros2'], [330, 620, 5], [870, 620, 5],
      ],
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [5, 7], [6, 7], [7, 8], [7, 9], [1, 3], [2, 4]],
    },
    architecture: {
      title: 'Agent → Planner → Runtime',
      boxes: [
        { id: 'llm', x: 60, y: 160, w: 200, h: 90, label: 'LLM Agent', sub: 'tool-calling' },
        { id: 'validate', x: 340, y: 160, w: 200, h: 90, label: 'Schema Validator', sub: 'safety limits' },
        { id: 'planner', x: 620, y: 160, w: 200, h: 90, label: 'Task Planner', sub: 'task graph' },
        { id: 'super', x: 620, y: 420, w: 200, h: 90, label: 'Supervisor', sub: '50 Hz loop' },
        { id: 'ros2', x: 900, y: 160, w: 220, h: 90, label: 'ROS2 Nodes', sub: 'actions / topics' },
        { id: 'robot', x: 900, y: 420, w: 220, h: 90, label: 'Robot Hardware', sub: 'perception + actuators' },
        { id: 'percep', x: 340, y: 420, w: 200, h: 90, label: 'Perception', sub: 'camera + LiDAR' },
        { id: 'user', x: 60, y: 420, w: 200, h: 90, label: 'Operator', sub: 'natural language' },
      ],
      arrows: [
        ['user', 'llm', 'task'], ['llm', 'validate', 'tool call'], ['validate', 'planner', 'validated'],
        ['planner', 'ros2', 'plan'], ['ros2', 'robot', 'commands'], ['percep', 'super', 'state'],
        ['super', 'ros2', 'replan'], ['robot', 'percep', 'sensor data'],
      ],
    },
    shots: [
      {
        file: 'screenshot-01.svg',
        kind: 'dashboard',
        url: 'app.robot-control.local/ops',
        stats: [['tasks done', '128'], ['success rate', '96.4%'], ['avg latency', '180 ms'], ['uptime', '99.2%']],
        bars: [['mon', 42], ['tue', 58], ['wed', 51], ['thu', 72], ['fri', 66], ['sat', 30]],
        sideLabel: 'tasks completed / day',
      },
      {
        file: 'screenshot-02.svg',
        kind: 'terminal',
        url: 'ssh robot@cell-03 ~/ros2 launch control',
        lines: [
          ['cmd', '$ ros2 launch control stack.launch.py'],
          ['out', '[INFO] supervisor: task graph validated (12 nodes)'],
          ['out', '[INFO] planner: executing move_to(waypoint_4)'],
          ['out', '[INFO] perception: obstacle detected, replanning...'],
          ['out', '[INFO] planner: new path accepted in 180 ms'],
          ['warn', '[WARN] battery 32% - returning to dock'],
          ['out', '[INFO] mission complete: 5/5 tasks'],
        ],
      },
    ],
  },
  {
    slug: 'multi-agent-orchestration',
    accent: '#a371f7',
    cover: {
      tag: 'multi_agent / llm / oss',
      title: 'Multi-Agent Orchestration',
      subtitle: 'typed messages · shared memory · reproducible evals',
      nodes: [
        [300, 300, 7, 'orchestrator'], [600, 160, 7, 'planner'], [600, 300, 7, 'worker-1'],
        [600, 440, 7, 'worker-2'], [900, 300, 7, 'memory'], [300, 160, 6], [300, 440, 6],
        [150, 300, 6], [900, 160, 6], [900, 440, 6], [450, 600, 7, 'checkpoint'],
      ],
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [0, 10], [0, 5], [0, 6], [0, 7], [4, 8], [4, 9]],
    },
    architecture: null,
    shots: [
      {
        file: 'screenshot-01.svg',
        kind: 'terminal',
        url: 'orchestration.dev/runs/4f2c9',
        lines: [
          ['cmd', '$ agent run --task "research + summarize" --trace'],
          ['out', '[orchestrator] → planner: plan(3 steps)  [msg#1]'],
          ['out', '[planner]    → worker-1: research(topic) [msg#2]'],
          ['out', '[worker-1]   → memory: write(episodic)   [msg#3]'],
          ['out', '[worker-2]   → orchestrator: draft        [msg#4]'],
          ['warn', '[checkpoint] human approval requested'],
          ['out', '[run] ok · 4 agents · 6 msgs · 2.1s'],
        ],
      },
      {
        file: 'screenshot-02.svg',
        kind: 'dashboard',
        url: 'orchestration.dev/evals',
        stats: [['runs', '312'], ['pass rate', '91%'], ['regressions', '2'], ['avg tokens', '8.4k']],
        bars: [['v0.9', 84], ['v1.0', 88], ['v1.1', 86], ['v1.2', 91], ['v1.3', 93], ['v1.4', 90]],
        sideLabel: 'eval score / version',
      },
    ],
  },
  {
    slug: 'slam-navigation-stack',
    accent: '#3fb950',
    cover: {
      tag: 'slam / ros2 / mpc',
      title: 'SLAM Navigation Stack',
      subtitle: 'sense → map → plan → control at 100 Hz',
      nodes: [
        [180, 220, 6], [360, 150, 6], [560, 120, 6], [760, 150, 6], [940, 210, 6],
        [300, 380, 6], [520, 340, 6], [740, 340, 6], [940, 420, 6],
        [620, 540, 7, 'robot'], [220, 540, 6], [1020, 540, 6],
      ],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [6, 9], [8, 9], [9, 10], [5, 9], [3, 7]],
    },
    architecture: {
      title: 'Sense → Map → Plan → Control',
      boxes: [
        { id: 'sens', x: 60, y: 160, w: 200, h: 90, label: 'Sensors', sub: 'IMU · camera · LiDAR' },
        { id: 'slam', x: 340, y: 160, w: 220, h: 90, label: 'VIO SLAM', sub: 'pose graph + loop closure' },
        { id: 'map', x: 640, y: 160, w: 200, h: 90, label: 'Map', sub: 'occupancy grid' },
        { id: 'gplan', x: 340, y: 420, w: 220, h: 90, label: 'Global Planner', sub: 'path repair' },
        { id: 'mpc', x: 640, y: 420, w: 200, h: 90, label: 'MPC Controller', sub: '100 Hz' },
        { id: 'act', x: 920, y: 420, w: 220, h: 90, label: 'Actuators', sub: 'drive train' },
        { id: 'loc', x: 920, y: 160, w: 220, h: 90, label: 'Localization', sub: 'pose estimate' },
      ],
      arrows: [
        ['sens', 'slam', 'frames'], ['slam', 'map', 'map'], ['slam', 'loc', 'pose'],
        ['map', 'gplan', 'costmap'], ['loc', 'gplan', 'pose'], ['gplan', 'mpc', 'path'],
        ['mpc', 'act', 'cmd_vel'], ['sens', 'mpc', 'obstacles'],
      ],
    },
    shots: [
      {
        file: 'screenshot-01.svg',
        kind: 'dashboard',
        url: 'rviz2 / navigation',
        stats: [['pose error', '3.2 cm'], ['loop rate', '100 Hz'], ['paths', '47'], ['collisions', '0']],
        bars: [['r1', 92], ['r2', 95], ['r3', 88], ['r4', 97], ['r5', 94], ['r6', 99]],
        sideLabel: 'navigation success / run',
      },
      {
        file: 'screenshot-02.svg',
        kind: 'terminal',
        url: 'gazebo world indoor_office.world',
        lines: [
          ['cmd', '$ ros2 launch nav stack_sim.launch.py'],
          ['out', '[slam] initialized: 240 features, 0.12s'],
          ['out', '[slam] loop closure detected (match 0.97)'],
          ['out', '[planner] global path: 18.4 m, 6 segments'],
          ['out', '[mpc] tracking error: 2.1 cm @ 100 Hz'],
          ['warn', '[mpc] dynamic obstacle predicted, braking'],
          ['out', '[nav] goal reached in 41.2 s'],
        ],
      },
    ],
  },
  {
    slug: 'engineering-data-pipeline',
    accent: '#f0883e',
    cover: {
      tag: 'digital_twin / etl / cad_cae',
      title: 'Engineering Data Pipeline',
      subtitle: 'heterogeneous exports → one live digital twin',
      nodes: [
        [140, 400, 7, 'cad'], [340, 200, 7, 'cae'], [340, 400, 7, 'telemetry'], [140, 200, 7, 'csv'],
        [560, 300, 7, 'normalize'], [760, 300, 7, 'api'], [960, 300, 7, 'dashboard'],
      ],
      edges: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 5], [5, 6]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'llm-rag-assistant',
    accent: '#db61a2',
    cover: {
      tag: 'rag / llm / citations',
      title: 'RAG Knowledge Assistant',
      subtitle: 'hybrid retrieval · reranking · cited answers',
      nodes: [
        [140, 300, 7, 'query'], [360, 160, 7, 'bm25'], [360, 300, 7, 'vector'], [360, 440, 7, 'rerank'],
        [620, 300, 7, 'llm'], [860, 300, 7, 'answer'], [860, 180, 6, 'cite-1'], [860, 420, 6, 'cite-2'],
      ],
      edges: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5], [5, 6], [5, 7]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'cad-cae-automation',
    accent: '#39c5cf',
    cover: {
      tag: 'cad / cae / automation',
      title: 'CAD/CAE Automation',
      subtitle: 'parameters in → validated results out',
      nodes: [
        [160, 300, 7, 'params'], [400, 160, 7, 'cad'], [400, 440, 7, 'mesh'],
        [640, 300, 7, 'cae'], [880, 300, 7, 'results'], [400, 300, 7, 'variants'],
      ],
      edges: [[0, 1], [0, 2], [1, 5], [2, 5], [5, 3], [3, 4]],
    },
    architecture: null,
    shots: [],
  },
];

/* ------------------------------------------------------------------ */
/* Generate                                                            */
/* ------------------------------------------------------------------ */
for (const p of projects) {
  const dir = join(outDir, p.slug);
  mkdirSync(dir, { recursive: true });

  writeFileSync(
    join(dir, 'cover.svg'),
    cover({ accent: p.accent, ...p.cover }),
  );

  if (p.architecture) {
    writeFileSync(
      join(dir, 'architecture.svg'),
      architecture({ accent: p.accent, ...p.architecture }),
    );
  }

  for (const shot of p.shots) {
    const svg =
      shot.kind === 'terminal'
        ? terminalShot({ url: shot.url, accent: p.accent, lines: shot.lines })
        : dashboardShot({
            url: shot.url,
            accent: p.accent,
            stats: shot.stats,
            bars: shot.bars,
            sideLabel: shot.sideLabel,
          });
    writeFileSync(join(dir, shot.file), svg);
  }

  console.log(`✓ public/projects/${p.slug}/`);
}
console.log('Done. Replace these SVGs with real screenshots (WebP/PNG) when filling in projects.');
