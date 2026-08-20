/**
 * Post-build step for GitHub Pages SPA routing:
 *  1. Copies dist/index.html -> dist/404.html (GitHub Pages serves this
 *     file for unknown paths, so refreshes on /projects/foo still load).
 *  2. Injects a redirect snippet into 404.html that bounces the unknown
 *     path to /?p=<path>; the restore snippet already present in
 *     index.html then rewrites the URL before React renders.
 *  3. Replaces the __BASE__ placeholder in the built index.html with the
 *     real base path, so both snippets work on username.github.io (/) and
 *     project pages (/repo/).
 */
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const indexHtml = join(dist, 'index.html');
const notFoundHtml = join(dist, '404.html');

// '' for a user site (/), '/repo' for a project page.
const base = (process.env.VITE_BASE || '').replace(/\/+$/, '');

const redirectScript = `<script>(function(l){var b='${base}';var p=l.pathname;if(b&&p.indexOf(b)===0){p=p.slice(b.length)||'/';}l.replace(l.protocol+'//'+l.hostname+(l.port?':'+l.port:'')+b+'/?p='+p.slice(1).replace(/&/g,'~and~')+(l.search?'&q='+l.search.slice(1).replace(/&/g,'~and~'):'')+l.hash);})(window.location)</script>`;

let html = readFileSync(indexHtml, 'utf8');

// 1. Finalize the base path in the built index.html.
html = html.replaceAll('__BASE__', base);
writeFileSync(indexHtml, html);

// 2. 404.html = the app + the redirect snippet (runs first).
copyFileSync(indexHtml, notFoundHtml);
let html404 = readFileSync(notFoundHtml, 'utf8');
html404 = html404.replace('<head>', `<head>${redirectScript}`);
writeFileSync(notFoundHtml, html404);

console.log(`✓ postbuild: base="${base || '/'}"`);
console.log('✓ dist/404.html ready (SPA refresh recovery on GitHub Pages)');
