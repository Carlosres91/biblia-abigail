#!/usr/bin/env node
// Build de producción de Abigail: vite build + service worker propio.
//
// ¿Por qué no workbox? En Termux/Android, vite-plugin-pwa genera todo el
// build pero el proceso de workbox se queda colgado para siempre sin emitir
// sw.js. Como la app es pequeña (un JS, un CSS, dos SVG), usamos un SW
// sencillo de precache + cache-first escrito a mano.
//
// Uso: node scripts/build.js   (sustituye a "vite build")

import { spawn } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const BASE = '/biblia-abigail/';

function generarSW() {
  const assets = readdirSync(join(dist, 'assets')).map((f) => `assets/${f}`);
  const estaticos = ['index.html', 'manifest.webmanifest', 'favicon.svg', 'icons.svg'];
  const precache = [BASE, ...[...estaticos, ...assets].map((f) => BASE + f)];
  const version = new Date().toISOString();

  const sw = `// Biblia Abigail — service worker (precache + cache-first)
// Generado por scripts/build.js el ${version}
const CACHE = 'abigail-${version}';
const PRECACHE = ${JSON.stringify(precache, null, 2)};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copia = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copia));
      return res;
    }).catch(() => caches.match('${BASE}index.html')))
  );
});
`;

  writeFileSync(join(dist, 'sw.js'), sw);
  console.log(`✓ sw.js generado (${precache.length} archivos en precache)`);
}

const child = spawn('npx', ['vite', 'build'], { cwd: root });
let out = '';
child.stdout.on('data', (d) => {
  out += d.toString();
  process.stdout.write(d);
  if (out.includes('built in')) setTimeout(() => child.kill('SIGKILL'), 1500);
});
child.stderr.on('data', (d) => process.stderr.write(d));
setTimeout(() => child.kill('SIGKILL'), 120000).unref(); // red de seguridad
child.on('exit', () => {
  if (!out.includes('built in')) {
    console.error('✗ vite build no terminó correctamente');
    process.exit(1);
  }
  generarSW();
  // vite deja procesos hijo con el stdout abierto; sin esto el wrapper
  // no sale nunca aunque el trabajo ya terminó
  process.exit(0);
});
