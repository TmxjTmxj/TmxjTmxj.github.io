// Simulates GitHub Pages' static behavior to verify SPA 404 recovery:
// unknown path -> serves 404.html (with redirect script)
// then the app's restore script must be present in index.html.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const mime = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2',
  '.json': 'application/json', '.pdf': 'application/pdf', '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(dist, urlPath === '/' ? 'index.html' : urlPath);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const notFound = path.join(dist, '404.html');
    if (fs.existsSync(notFound)) {
      file = notFound;
      res.statusCode = 404; // GitHub Pages serves 404.html with a 404 status
    } else {
      res.statusCode = 404;
      res.end('missing');
      return;
    }
  }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});

server.listen(4199, async () => {
  const get = (p) =>
    new Promise((ok) => {
      http.get('http://localhost:4199' + p, (r) => {
        let b = '';
        r.on('data', (c) => (b += c));
        r.on('end', () => ok({ code: r.statusCode, body: b }));
      });
    });

  const r1 = await get('/projects/ai-agent-robot-control');
  console.log('1) deep link /projects/ai-agent-robot-control ->', r1.code);
  console.log('   redirect script present:', r1.body.includes('~and~'));
  console.log('   app root present:', r1.body.includes('id="root"'));

  const r2 = await get('/?p=/projects/ai-agent-robot-control');
  console.log('2) recovered URL /?p=/projects/... ->', r2.code);
  console.log('   restore script present:', r2.body.includes('base + decoded'));
  console.log('   __BASE__ leftover:', r2.body.includes('__BASE__'));

  const r3 = await get('/projects/x/y/z');
  console.log('3) nested unknown path ->', r3.code, '| redirect present:', r3.body.includes('~and~'));

  const r4 = await get('/');
  console.log('4) home ->', r4.code, '| no redirect script injected:', !r4.body.includes('~and~'));

  server.close();
});
