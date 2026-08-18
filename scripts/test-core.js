#!/usr/bin/env node
// Pruebas de la lógica pura de Abigail (core.js), sin navegador ni React.
// Uso: node scripts/test-core.js

import {
  tok, limpia, normalizaLibro,
  parsearVersiculos, parsearJSONSeguro,
  clave, aKey, ctxKey, refDe, versiculoDe, fragmento,
  salientesDe, entrantesDe, estudiosDe, colorPalabra, notasDelVersiculo,
  conviccionesLector, materialCerebro, materialSignature,
  PASAJES, TIPOS, LIBROS
} from '../src/lib/core.js';

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}

function eq(a, b, msg) {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    throw new Error(`${msg}\n  esperado: ${JSON.stringify(b)}\n  recibido: ${JSON.stringify(a)}`);
  }
}

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`✓ ${name}`);
  } catch (e) {
    failed++;
    console.error(`✗ ${name}: ${e.message}`);
  }
}

// ============================================================
// utilidades de texto
// ============================================================
await test('tok divide palabras', () => {
  eq(tok('a b c'), ['a','b','c']);
});

await test('limpia quita puntuación', () => {
  assert(limpia('palabra.') === 'palabra');
  assert(limpia('«cita»') === 'cita');
});

await test('normalizaLibro quita acentos y minúsculas', () => {
  assert(normalizaLibro('Éxodo') === 'exodo');
  assert(normalizaLibro('1 Juan') === '1juan');
});

// ============================================================
// parseo de versículos
// ============================================================
await test('parsearVersiculos formato "1 Texto. 2 Texto..."', () => {
  const vs = parsearVersiculos('1 En el principio. 2 Y la tierra. 3 Y dijo Dios.');
  assert(vs.length === 3, `se esperaban 3, hay ${vs.length}`);
  assert(vs[0].n === 1 && vs[0].t.includes('En el principio'));
});

await test('parsearVersiculos formato pegado "1En el principio 2Y la tierra"', () => {
  const vs = parsearVersiculos('1En el principio 2Y la tierra');
  assert(vs.length === 2, `se esperaban 2, hay ${vs.length}`);
});

// ============================================================
// JSON seguro
// ============================================================
await test('parsearJSONSeguro con markdown', () => {
  const d = parsearJSONSeguro('```json\n{"ok":true}\n```');
  assert(d.ok === true);
});

await test('parsearJSONSeguro con texto extra', () => {
  const d = parsearJSONSeguro('Aquí está:\n{"a":1}');
  assert(d.a === 1);
});

// ============================================================
// referencias y fragmentos
// ============================================================
await test('clave genera pid:n', () => {
  assert(clave('jn1', 1) === 'jn1:1');
});

await test('aKey con ancla', () => {
  assert(aKey('jn1:1', {ini:1, fin:3}) === 'jn1:1@1-3');
  assert(aKey('jn1:1', null) === 'jn1:1');
});

await test('refDe con pasajes', () => {
  assert(refDe('jn1:1', PASAJES) === 'Juan 1:1');
  assert(refDe('mr9:4', PASAJES) === 'Marcos 9:4');
});

await test('versiculoDe encuentra texto', () => {
  const v = versiculoDe('jn1:1', PASAJES);
  assert(v && v.n === 1);
});

await test('fragmento extrae palabras', () => {
  const f = fragmento('jn1:1', {ini:0, fin:3}, PASAJES);
  assert(f && f.includes('En el principio'));
});

// ============================================================
// filtros de cadenas
// ============================================================
const cadenas = [
  { id: 1, desdeClave: 'mr9:4', desdeAncla: {ini:4, fin:4}, hastaClave: 'mal4:5', hastaRef: 'Malaquías 4:5', tipo: 'Profecía', porque: 'test' },
  { id: 2, desdeClave: 'jn1:1', desdeAncla: null, hastaClave: 'jn1:14', hastaRef: 'Juan 1:14', tipo: 'Paralelo', porque: 'test2' },
];

await test('salientesDe filtra por origen', () => {
  assert(salientesDe('mr9:4', cadenas).length === 1);
  assert(salientesDe('jn1:1', cadenas).length === 1);
});

await test('entrantesDe filtra por destino', () => {
  assert(entrantesDe('mal4:5', cadenas).length === 1);
  assert(entrantesDe('jn1:14', cadenas).length === 1);
});

const estudios = [
  { id: 'e1', titulo: 'Estudio 1', ancla: 'Marcos 9:4', versiculos: ['mr9:4'], propio: true, parrafos: ['p1'], discernimiento: [] },
];

await test('estudiosDe encuentra estudios', () => {
  assert(estudiosDe('mr9:4', estudios).length === 1);
});

// ============================================================
// resaltados y notas
// ============================================================
const resaltados = { 'jn1:1': [{ ini: 1, fin: 3, color: '#ff0000' }] };

await test('colorPalabra devuelve color en rango', () => {
  assert(colorPalabra('jn1:1', 2, resaltados) === '#ff0000');
  assert(colorPalabra('jn1:1', 5, resaltados) === null);
});

const notas = { 'jn1:1': 'nota completa', 'jn1:1@1-2': 'nota parcial' };

await test('notasDelVersiculo incluye ambas', () => {
  const ns = notasDelVersiculo('jn1:1', notas);
  assert(ns.length === 2);
  assert(ns.some(n => n.ancla === null));
  assert(ns.some(n => n.ancla && n.ancla.ini === 1));
});

// ============================================================
// cerebro y convicciones
// ============================================================
const estudiosConConv = [
  { id: 'e2', titulo: 'Estudio 2', ancla: 'Juan 1:1', versiculos: ['jn1:1'], propio: true, parrafos: ['p'], discernimiento: [
    { pregunta: '¿Qué es el Verbo?', respuesta: 'Es Cristo' },
  ]},
];

await test('conviccionesLector devuelve respuestas', () => {
  const c = conviccionesLector(estudiosConConv);
  assert(c.length === 1);
  assert(c[0].respuesta === 'Es Cristo');
});

await test('materialCerebro compila elementos', () => {
  const mat = materialCerebro({
    pasajes: PASAJES,
    estudios: estudiosConConv,
    cadenas,
    notas,
    vrContextos: { 'jn1:1': { texto: 'contexto', ref: 'Juan 1:1' } },
  });
  assert(mat.length > 0);
  assert(mat.some(s => s.includes('CONVICCIÓN')));
  assert(mat.some(s => s.includes('CADENA')));
  assert(mat.some(s => s.includes('NOTA')));
  assert(mat.some(s => s.includes('CONTEXTO HISTÓRICO')));
});

await test('materialSignature cuenta elementos', () => {
  const sig = materialSignature({ estudios: estudiosConConv, cadenas, notas });
  assert(sig.conv === 1, `conv=${sig.conv}`);
  assert(sig.cad === 2, `cad=${sig.cad}`);
  assert(sig.not === 2, `not=${sig.not}`);
  assert(sig.est === 1, `est=${sig.est}`);
  assert(sig.total === 6, `total=${sig.total}`);
});

// ============================================================
// resumen
// ============================================================
console.log('\n=== Resumen ===');
console.log(`Pasaron: ${passed}, fallaron: ${failed}`);
process.exit(failed === 0 ? 0 : 1);
