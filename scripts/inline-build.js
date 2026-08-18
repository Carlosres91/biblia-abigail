#!/usr/bin/env node
// Genera un HTML autónomo (inline) a partir del build de Vite.
// Uso: node scripts/inline-build.js
// Salida: ../Biblia-Abigail.html

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const outFile = join(root, '..', 'Biblia-Abigail.html');

// 1. Build con Vite (opcional: si se pasa --build se ejecuta primero)
async function runBuild() {
  return new Promise((resolve, reject) => {
    console.log('Ejecutando vite build...');
    const child = spawn('npx', ['vite', 'build'], { cwd: root, stdio: 'pipe' });
    let output = '';
    child.stdout.on('data', (d) => {
      const chunk = d.toString();
      output += chunk;
      process.stdout.write(chunk);
      if (output.includes('built in')) {
        setTimeout(() => child.kill('SIGTERM'), 800);
      }
    });
    child.stderr.on('data', (d) => process.stderr.write(d.toString()));
    child.on('error', reject);
    child.on('exit', () => resolve(output));
    setTimeout(() => { child.kill('SIGKILL'); resolve(output); }, 30000);
  });
}

if (process.argv.includes('--build')) {
  await runBuild();
}

// 2. Leer index.html generado
const indexPath = join(dist, 'index.html');
if (!existsSync(indexPath)) {
  console.error('No se encontró dist/index.html después del build');
  process.exit(1);
}
let html = readFileSync(indexPath, 'utf8');

// 3. Inlinear CSS
const cssMatch = html.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/i);
if (cssMatch) {
  const cssPath = join(dist, cssMatch[1].replace(/^\//, ''));
  const css = readFileSync(cssPath, 'utf8');
  html = html.replace(cssMatch[0], `<style>${css}</style>`);
}

// 4. Inlinear JS
const jsMatch = html.match(/<script[^>]+type=["']module["'][^>]+src=["']([^"']+)["'][^>]*><\/script>/i);
if (jsMatch) {
  const jsPath = join(dist, jsMatch[1].replace(/^\//, ''));
  const js = readFileSync(jsPath, 'utf8');
  html = html.replace(jsMatch[0], `<script type="module">${js}</script>`);
}

// 5. Quitar tags que no aplican al HTML embebido (manifest, service worker, iconos)
html = html
  .replace(/<link[^>]+rel=["']manifest["'][^>]*>/gi, '')
  .replace(/<script[^>]+id=["']vite-plugin-pwa:register-sw["'][^>]*><\/script>/gi, '')
  .replace(/<link[^>]+rel=["']icon["'][^>]*>/gi, '');

// 6. Compactar espacios entre tags (estilo del HTML actual de Abigail)
html = html.replace(/>\s+</g, '><').trim();

// 7. Escribir salida
writeFileSync(outFile, html);
console.log(`\n✓ Biblia-Abigail.html generado: ${outFile}`);
console.log(`  Tamaño: ${(html.length / 1024).toFixed(1)} KB`);
