#!/usr/bin/env node
// Pruebas funcionales de Biblia Abigail sin navegador, usando jsdom.
// Uso: node scripts/test-functional.js

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const appFile = join(root, '..', 'Biblia-Abigail.html');

const html = readFileSync(appFile, 'utf8');

const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', (e) => {
  // Ignorar el CDN de Tailwind (no disponible sin red); reportar el resto
  const msg = e.detail?.message || e.message || '';
  if (!msg.includes('tailwindcss')) console.error('JSDOM:', msg.slice(0, 300));
});

const dom = new JSDOM(html, {
  url: 'http://localhost/?test=1',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole,
});

const window = dom.window;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Espera activa hasta que una condición se cumpla (React en jsdom tarda
// variable en renderizar; un sleep fijo produce falsos negativos)
async function waitFor(cond, msg, timeout = 3000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try { if (cond()) return; } catch (e) { /* reintentar */ }
    await sleep(100);
  }
  throw new Error(msg || 'waitFor: timeout');
}

async function waitForBridge(timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (window.__ABIGAIL_TEST__ && window.__ABIGAIL_TEST__.getState) {
      return window.__ABIGAIL_TEST__;
    }
    await sleep(200);
  }
  throw new Error('La app no expuso __ABIGAIL_TEST__');
}

// Proxy "vivo": cada llamada se resuelve contra el __ABIGAIL_TEST__ actual.
// Necesario porque la app recrea el puente en cada render de React; guardar
// una referencia vieja devolvería estado obsoleto (clausuras antiguas).
function liveBridge() {
  return new Proxy({}, {
    get: (_, prop) => {
      const b = window.__ABIGAIL_TEST__;
      if (!b) return undefined;
      const v = b[prop];
      return typeof v === 'function' ? (...args) => b[prop](...args) : v;
    },
  });
}

const results = [];
let passed = 0;

async function runTest(name, fn) {
  try {
    await waitForBridge();
    const bridge = liveBridge();
    bridge.resetLocalStorage();
    await sleep(300);
    const msg = await fn(bridge);
    results.push({ name, status: 'PASS', msg });
    passed++;
    console.log(`✓ ${name}: ${msg}`);
  } catch (e) {
    results.push({ name, status: 'FAIL', msg: e.message });
    console.log(`✗ ${name}: ${e.message}`);
  }
}

const tests = {
  render: async (bridge) => {
    const st = bridge.getState();
    if (!st || !st.pasajeId) throw new Error('No se pudo leer estado');
    const rootEl = window.document.getElementById('root');
    if (!rootEl || !rootEl.textContent) throw new Error('#root vacío');
    const versiculos = bridge.dom.versiculos();
    if (versiculos.length === 0) throw new Error('No hay versículos renderizados');
    return `Pasaje activo: ${st.pasajeId}. Versículos DOM: ${versiculos.length}`;
  },

  navegacion: async (bridge) => {
    bridge.seleccionarPasaje('mr9');
    await waitFor(() => bridge.getState().pasajeId === 'mr9', 'No cambió a mr9');
    bridge.seleccionarPasaje('rm8');
    await waitFor(() => bridge.getState().pasajeId === 'rm8', 'No cambió a rm8');
    bridge.seleccionarPasaje('jn1');
    await waitFor(() => bridge.getState().pasajeId === 'jn1', 'No volvió a jn1');
    return 'Navegación mr9 → rm8 → jn1 OK';
  },

  versiculo: async (bridge) => {
    bridge.seleccionarPasaje('jn1');
    await waitFor(() => bridge.getState().pasajeId === 'jn1', 'No cargó jn1');
    bridge.abrirVersiculo('jn1:1');
    await waitFor(() => bridge.getState().sel === 'jn1:1', 'No seleccionó jn1:1');
    return 'Selección de versículo OK';
  },

  cadena: async (bridge) => {
    bridge.seleccionarPasaje('jn1');
    await waitFor(() => bridge.getState().pasajeId === 'jn1', 'No cargó jn1');
    const antes = bridge.getCadenas().length;
    bridge.guardarCadena({
      desdeClave: 'jn1:1', desdeAncla: null,
      hastaClave: 'jn1:14', hastaRef: 'Juan 1:14', hastaAncla: null,
      hastaFragTexto: null, tipo: 'Paralelo', porque: 'Test desde jsdom'
    });
    await waitFor(() => bridge.getCadenas().length === antes + 1, 'Cadena no se agregó');
    return `Cadena creada. Total: ${bridge.getCadenas().length}`;
  },

  nota: async (bridge) => {
    bridge.guardarNota('jn1:1', null, 'Nota de prueba jsdom');
    await waitFor(() => !!bridge.getNotas()['jn1:1'], 'Nota no guardada');
    return 'Nota guardada en jn1:1';
  },

  contexto: async (bridge) => {
    bridge.guardarContexto('jn1:1', null, 'Contexto histórico de prueba');
    await waitFor(() => !!bridge.getVrContextos()['jn1:1'], 'Contexto no guardado');
    return 'Contexto histórico guardado';
  },

  masivo: async (bridge) => {
    // Con la Biblia integrada, importar un capítulo existente lo sobrescribe
    const n = bridge.guardarMasivo('Juan 5\n1 Texto de prueba cinco. 2 Segunda línea de prueba.\nHechos 2\n1 Texto hechos uno. 2 Texto hechos dos.');
    if (n !== 2) throw new Error(`se importaron ${n}, se esperaban 2`);
    await waitFor(() => bridge.getState().pasajes['u_juan_5']?.versiculos?.[0]?.t.includes('Texto de prueba'), 'Juan 5 no se actualizó');
    await waitFor(() => bridge.getState().pasajes['u_hechos_2']?.versiculos?.length === 2, 'Hechos 2 no se actualizó');
    return 'Importación masiva OK (sobreescribe capítulos existentes)';
  },

  persistencia: async (bridge) => {
    bridge.guardarNota('jn1:1', null, 'Persistencia test');
    await sleep(300);
    const raw = window.localStorage.getItem('abigail.notas');
    if (!raw) throw new Error('localStorage vacío');
    const notas = JSON.parse(raw);
    if (!notas['jn1:1']) throw new Error('No persistió');
    return 'Persistencia OK';
  },

  exportar: async (bridge) => {
    let captured = null;
    // jsdom no implementa createObjectURL/revokeObjectURL: sustituir por stubs
    const origCreate = window.URL.createObjectURL;
    const origRevoke = window.URL.revokeObjectURL;
    window.URL.createObjectURL = (blob) => {
      const reader = new window.FileReader();
      reader.onload = () => { captured = reader.result; };
      reader.readAsText(blob);
      return 'blob:mock';
    };
    window.URL.revokeObjectURL = () => {};
    bridge.exportarEstudio();
    await sleep(500);
    window.URL.createObjectURL = origCreate;
    window.URL.revokeObjectURL = origRevoke;
    if (!captured) throw new Error('No se capturó export');
    const data = JSON.parse(captured);
    if (!data.app || data.app !== 'abigail') throw new Error('Export inválido');
    return `Export OK. Versión: ${data.version}`;
  }
};

async function main() {
  console.log('Cargando Biblia Abigail en happy-dom...');
  console.log(`Archivo: ${appFile}`);

  try {
    await waitForBridge();
    console.log('Puente __ABIGAIL_TEST__ detectado\n');
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }

  for (const [name, fn] of Object.entries(tests)) {
    await runTest(name, fn);
  }

  console.log('\n=== Resumen ===');
  console.log(`Pasaron: ${passed}/${results.length}`);
  process.exit(passed === results.length ? 0 : 1);
}

main();
