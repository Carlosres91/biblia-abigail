#!/usr/bin/env node
// Pruebas funcionales de Biblia Abigail sin navegador, usando happy-dom.
// Uso: node scripts/test-functional.js

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Window } from 'happy-dom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const appFile = join(root, '..', 'Biblia-Abigail.html');

const html = readFileSync(appFile, 'utf8');

const window = new Window({
  url: 'http://localhost/?test=1',
  settings: {
    disableJavaScriptFileLoading: false,
    disableJavaScriptEvaluation: false,
    enableFileSystemHttpRequests: false,
  }
});

window.document.write(html);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

const results = [];
let passed = 0;

async function runTest(name, fn) {
  try {
    const bridge = await waitForBridge();
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
    await sleep(300);
    if (bridge.getState().pasajeId !== 'mr9') throw new Error('No cambió a mr9');
    bridge.seleccionarPasaje('rm8');
    await sleep(300);
    if (bridge.getState().pasajeId !== 'rm8') throw new Error('No cambió a rm8');
    bridge.seleccionarPasaje('jn1');
    await sleep(300);
    if (bridge.getState().pasajeId !== 'jn1') throw new Error('No volvió a jn1');
    return 'Navegación mr9 → rm8 → jn1 OK';
  },

  versiculo: async (bridge) => {
    bridge.seleccionarPasaje('jn1');
    await sleep(300);
    bridge.abrirVersiculo('jn1:1');
    await sleep(300);
    if (bridge.getState().sel !== 'jn1:1') throw new Error('No seleccionó jn1:1');
    return 'Selección de versículo OK';
  },

  cadena: async (bridge) => {
    bridge.seleccionarPasaje('jn1');
    await sleep(300);
    const antes = bridge.getCadenas().length;
    bridge.guardarCadena({
      desdeClave: 'jn1:1', desdeAncla: null,
      hastaClave: 'jn1:14', hastaRef: 'Juan 1:14', hastaAncla: null,
      hastaFragTexto: null, tipo: 'Paralelo', porque: 'Test desde happy-dom'
    });
    await sleep(300);
    if (bridge.getCadenas().length !== antes + 1) throw new Error('Cadena no se agregó');
    return `Cadena creada. Total: ${bridge.getCadenas().length}`;
  },

  nota: async (bridge) => {
    bridge.guardarNota('jn1:1', null, 'Nota de prueba happy-dom');
    await sleep(200);
    if (!bridge.getNotas()['jn1:1']) throw new Error('Nota no guardada');
    return 'Nota guardada en jn1:1';
  },

  contexto: async (bridge) => {
    bridge.guardarContexto('jn1:1', null, 'Contexto histórico de prueba');
    await sleep(200);
    if (!bridge.getVrContextos()['jn1:1']) throw new Error('Contexto no guardado');
    return 'Contexto histórico guardado';
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
    const original = window.URL.createObjectURL;
    window.URL.createObjectURL = (blob) => {
      const reader = new window.FileReader();
      reader.onload = () => { captured = reader.result; };
      reader.readAsText(blob);
      return original(blob);
    };
    bridge.exportarEstudio();
    await sleep(500);
    window.URL.createObjectURL = original;
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
