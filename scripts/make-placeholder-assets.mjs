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
/* Project definitions (real repositories, placeholder visuals)        */
/* ------------------------------------------------------------------ */
const projects = [
  {
    slug: 'ros2-agent-workflow',
    accent: '#4493f8',
    cover: {
      tag: 'mcp / ros2 / gazebo',
      title: 'ROS2 Agent Workflow',
      subtitle: 'LLM agent → MCP server → ROS2 → Gazebo robot',
      nodes: [
        [600, 330, 7, 'agent'], [300, 180, 7], [900, 180, 7], [180, 380, 7],
        [1020, 380, 7], [420, 500, 7, 'mcp'], [780, 500, 7, 'ros2'],
        [600, 590, 7, 'gazebo'], [330, 620, 5], [870, 620, 5],
      ],
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [5, 7], [6, 7], [7, 8], [7, 9], [1, 3], [2, 4]],
    },
    architecture: {
      title: 'Agent → MCP Server → ROS2 → Gazebo',
      boxes: [
        { id: 'llm', x: 60, y: 160, w: 200, h: 90, label: 'LLM Agent', sub: 'tool-calling' },
        { id: 'mcp', x: 340, y: 160, w: 200, h: 90, label: 'MCP Server', sub: 'FastMCP' },
        { id: 'ros2', x: 620, y: 160, w: 220, h: 90, label: 'ROS2 Nodes', sub: 'lyrical' },
        { id: 'gazebo', x: 920, y: 160, w: 220, h: 90, label: 'Gazebo', sub: 'simulation' },
        { id: 'robot', x: 920, y: 420, w: 220, h: 90, label: 'Robot', sub: 'physical / sim' },
        { id: 'demo', x: 60, y: 420, w: 200, h: 90, label: 'Demo Scripts', sub: 'one-click' },
        { id: 'docs', x: 340, y: 420, w: 200, h: 90, label: 'Skill Docs', sub: 'reproducible runs' },
      ],
      arrows: [
        ['llm', 'mcp', 'tool call'], ['mcp', 'ros2', 'commands'], ['ros2', 'gazebo', 'topics'],
        ['gazebo', 'robot', 'state'], ['demo', 'mcp', 'boot'], ['docs', 'llm', 'skills'],
      ],
    },
    shots: [
      {
        file: 'screenshot-01.svg',
        kind: 'dashboard',
        url: 'agent → ros2-agent-workflow / run',
        stats: [['tasks', '42'], ['success', '100%'], ['topic hz', '10 Hz'], ['nodes', '12']],
        bars: [['m1', 40], ['m2', 62], ['m3', 58], ['m4', 80], ['m5', 74], ['m6', 91]],
        sideLabel: 'agent tasks / run',
      },
      {
        file: 'screenshot-02.svg',
        kind: 'terminal',
        url: 'ssh sim ~/ros2-agent-workflow',
        lines: [
          ['cmd', '$ bash demo.sh --task "move to waypoint 4"'],
          ['out', '[mcp]   tool call: move_to(waypoint=4)'],
          ['out', '[ros2]  action accepted: /navigate'],
          ['out', '[gazebo] robot moving… 34% → 78% → 100%'],
          ['out', '[agent] task complete in 3.2 s'],
        ],
      },
    ],
  },
  {
    slug: 'agent-orchestrator',
    accent: '#a371f7',
    cover: {
      tag: 'multi_agent / orchestration',
      title: 'Agent Orchestrator',
      subtitle: 'plan → delegate → execute → collect',
      nodes: [
        [300, 300, 7, 'planner'], [600, 160, 7, 'worker-1'], [600, 300, 7, 'worker-2'],
        [600, 440, 7, 'worker-3'], [900, 300, 7, 'collector'], [300, 160, 6], [300, 440, 6],
        [150, 300, 6], [900, 160, 6], [900, 440, 6], [450, 600, 7, 'result'],
      ],
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [0, 10], [0, 5], [0, 6], [0, 7], [4, 8], [4, 9]],
    },
    architecture: null,
    shots: [
      {
        file: 'screenshot-01.svg',
        kind: 'terminal',
        url: 'orchestrator / run',
        lines: [
          ['cmd', '$ python run.py --task "build a report" --roles 6'],
          ['out', '[planner] plan: 4 steps, 3 workers'],
          ['out', '[delegate] worker-1 ← research · worker-2 ← draft · worker-3 ← data'],
          ['out', '[collect] results merged (2.1 s)'],
          ['warn', '[worker-3] failed once - isolated, retried'],
          ['out', '[done] report written: out/report.md'],
        ],
      },
      {
        file: 'screenshot-02.svg',
        kind: 'dashboard',
        url: 'orchestrator / stats',
        stats: [['runs', '312'], ['parallel', '3x'], ['isolations', '17'], ['roles', '6']],
        bars: [['r1', 62], ['r2', 71], ['r3', 66], ['r4', 84], ['r5', 88], ['r6', 91]],
        sideLabel: 'tasks / batch',
      },
    ],
  },
  {
    slug: 'beifeng-wind-agent',
    accent: '#39c5cf',
    cover: {
      tag: 'rust / rag / wind_o&m',
      title: 'Beifeng Wind Agent',
      subtitle: 'RAG hub · fault diagnosis · risk · report · Tauri',
      nodes: [
        [140, 400, 7, 'docs'], [340, 200, 7, 'index'], [340, 400, 7, 'rag'],
        [560, 300, 7, 'diagnosis'], [760, 300, 7, 'risk'], [960, 300, 7, 'report'],
        [760, 500, 7, 'tauri'], [560, 500, 7, 'benchmark'],
      ],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [3, 7], [4, 7], [6, 5]],
    },
    architecture: {
      title: 'Docs → RAG → Diagnosis / Risk → Report',
      boxes: [
        { id: 'docs', x: 60, y: 160, w: 200, h: 90, label: 'Farm Docs', sub: 'manuals · records' },
        { id: 'index', x: 340, y: 160, w: 200, h: 90, label: 'RAG Index', sub: 'embedding + retrieval' },
        { id: 'diag', x: 620, y: 160, w: 220, h: 90, label: 'Fault Diagnosis', sub: 'LLM + evidence' },
        { id: 'risk', x: 920, y: 160, w: 220, h: 90, label: 'Risk Assessment', sub: 'scoring' },
        { id: 'report', x: 620, y: 420, w: 220, h: 90, label: 'Report Generator', sub: 'automated' },
        { id: 'tauri', x: 920, y: 420, w: 220, h: 90, label: 'Tauri Desktop', sub: 'operator UI' },
        { id: 'bench', x: 340, y: 420, w: 200, h: 90, label: 'Benchmark Harness', sub: 'eval' },
      ],
      arrows: [
        ['docs', 'index', 'ingest'], ['index', 'diag', 'retrieve'], ['diag', 'risk', 'findings'],
        ['risk', 'report', 'verdict'], ['diag', 'bench', 'cases'], ['bench', 'diag', 'scores'],
        ['report', 'tauri', 'display'],
      ],
    },
    shots: [
      {
        file: 'screenshot-01.svg',
        kind: 'dashboard',
        url: 'beifeng / farm-07 / overview',
        stats: [['turbines', '36'], ['open faults', '2'], ['risk high', '1'], ['reports', '14']],
        bars: [['t01', 42], ['t02', 55], ['t03', 48], ['t04', 71], ['t05', 66], ['t06', 88]],
        sideLabel: 'health score / turbine',
      },
      {
        file: 'screenshot-02.svg',
        kind: 'terminal',
        url: 'beifeng diagnose --turbine t-17',
        lines: [
          ['cmd', '$ beifeng diagnose --turbine t-17'],
          ['out', '[rag]    retrieved 6 evidence chunks'],
          ['out', '[diag]   bearing temp anomaly (conf 0.91)'],
          ['out', '[risk]   medium - schedule inspection'],
          ['out', '[report] written: reports/t-17_2026-08-14.md'],
        ],
      },
    ],
  },
  {
    slug: 'hermes-core',
    accent: '#db61a2',
    cover: {
      tag: 'agent_core / memory',
      title: 'Hermes Agent Core',
      subtitle: 'consciousness engine · four-layer memory',
      nodes: [
        [600, 300, 7, 'consciousness'], [300, 160, 7, 'working'], [900, 160, 7, 'episodic'],
        [300, 440, 7, 'semantic'], [900, 440, 7, 'persona'], [150, 300, 6], [1050, 300, 6],
      ],
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [2, 3]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'tmxj-agent',
    accent: '#3fb950',
    cover: {
      tag: 'rust / deepseek / terminal',
      title: 'TMXJ Agent',
      subtitle: 'a DeepSeek-first terminal coding agent in Rust',
      nodes: [
        [200, 300, 7, 'plan'], [450, 200, 7, 'edit'], [700, 200, 7, 'run'],
        [950, 300, 7, 'verify'], [450, 400, 7, 'deepseek'], [700, 400, 7, 'rust'],
      ],
      edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 0], [5, 1], [5, 2]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'cnc-cam-gcode-simulator',
    accent: '#f0883e',
    cover: {
      tag: 'cnc / cam / g-code',
      title: 'CNC CAM & G-Code Simulator',
      subtitle: 'DXF → toolpaths → Fanuc G-code → 2D/3D simulation',
      nodes: [
        [140, 400, 7, 'dxf'], [340, 200, 7, 'cam'], [560, 300, 7, 'toolpath'],
        [760, 300, 7, 'g-code'], [960, 300, 7, 'sim'], [340, 500, 6], [560, 500, 6],
      ],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [2, 6]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'shrapnel-force-predictor',
    accent: '#e5534b',
    cover: {
      tag: 'ml / creo / abaqus',
      title: 'Shrapnel Force Predictor',
      subtitle: 'parametric CAD → batch simulation → ML regression (3.72%)',
      nodes: [
        [160, 300, 7, 'creo'], [400, 160, 7, 'params'], [400, 440, 7, 'dataset'],
        [640, 300, 7, 'abaqus'], [880, 300, 7, 'predict'], [400, 300, 7, 'ml'],
      ],
      edges: [[0, 1], [0, 2], [1, 5], [2, 5], [5, 3], [3, 4]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'ansys-mech-sim-cases',
    accent: '#d29922',
    cover: {
      tag: 'solidworks / ansys / mcp',
      title: 'ANSYS Mechanical Simulation Cases',
      subtitle: 'agent-driven CAD → CAE automation',
      nodes: [
        [160, 300, 7, 'solidworks'], [400, 160, 7, 'agent'], [400, 440, 7, 'mcp'],
        [640, 300, 7, 'workbench'], [880, 300, 7, 'fluent'], [880, 500, 7, 'cases'],
      ],
      edges: [[1, 0], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'lobster-core',
    accent: '#f778ba',
    cover: {
      tag: 'agent_core / harness / memory',
      title: 'Lobster Agent Core',
      subtitle: 'five-layer agent manufacturing · 1189-line harness',
      nodes: [
        [600, 300, 7, 'harness'], [300, 160, 7, 'memory'], [900, 160, 7, 'skills'],
        [300, 440, 7, 'learning'], [900, 440, 7, 'conscious'], [150, 300, 6], [1050, 300, 6],
      ],
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 3], [2, 4]],
    },
    architecture: null,
    shots: [],
  },
  {
    slug: 'software-dev-team-skill',
    accent: '#39c5cf',
    cover: {
      tag: 'multi_agent / sop / skill_pack',
      title: 'Software Dev Team Skill',
      subtitle: 'PM · Architect · Engineer · QA — virtual team by SOP',
      nodes: [
        [300, 300, 7, 'coordinator'], [600, 160, 7, 'PM'], [600, 300, 7, 'architect'],
        [600, 440, 7, 'engineer'], [900, 300, 7, 'QA'], [300, 160, 6], [300, 440, 6],
        [900, 160, 6], [900, 440, 6], [1000, 600, 6, 'gate'],
      ],
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 9], [0, 5], [0, 6]],
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
