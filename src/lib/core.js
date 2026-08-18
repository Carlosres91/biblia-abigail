// ============================================================
// ABIGAIL · Núcleo de lógica pura (testeable sin React)
// ============================================================

export const C = {
  noche: "#241B36",
  nocheAlta: "#32264C",
  purpura: "#3A2C55",
  oro: "#C9A227",
  oroClaro: "#E3C567",
  papel: "#F7F1E3",
  papelBorde: "#E2D6BC",
  tinta: "#2C2338",
  tintaSuave: "#6B6076",
  claro: "#F1E9DA",
  claroSuave: "#BFB3D0",
  ambar: "#F3E2AC",
  lila: "#E4D9F2",
};

export const TIPOS = {
  Profecía: { bg: "#F0E3BC", fg: "#7A5E10" },
  Cumplimiento: { bg: "#DFE7C8", fg: "#4C5E1E" },
  Paralelo: { bg: "#D8DEEE", fg: "#33406B" },
  Contexto: { bg: "#EADCCB", fg: "#6E4E2A" },
  Explicación: { bg: "#E4D8EC", fg: "#5A3A78" },
};

export const LIBROS = [
  "Génesis","Éxodo","Levítico","Números","Deuteronomio","Josué","Jueces","Rut",
  "1 Samuel","2 Samuel","1 Reyes","2 Reyes","1 Crónicas","2 Crónicas","Esdras","Nehemías",
  "Ester","Job","Salmos","Proverbios","Eclesiastés","Cantares","Isaías","Jeremías",
  "Lamentaciones","Ezequiel","Daniel","Oseas","Joel","Amós","Abdías","Jonás","Miqueas",
  "Nahúm","Habacuc","Sofonías","Hageo","Zacarías","Malaquías",
  "Mateo","Marcos","Lucas","Juan","Hechos","Romanos","1 Corintios","2 Corintios",
  "Gálatas","Efesios","Filipenses","Colosenses","1 Tesalonicenses","2 Tesalonicenses",
  "1 Timoteo","2 Timoteo","Tito","Filemón","Hebreos","Santiago","1 Pedro","2 Pedro",
  "1 Juan","2 Juan","3 Juan","Judas","Apocalipsis",
];

export const PASAJES = {
  mr9: {
    id: "mr9",
    titulo: "San Marcos 9",
    corto: "Marcos 9",
    libro: "Marcos",
    cap: 9,
    seccion: "La transfiguración",
    versiculos: [
      { n: 2, t: "Seis días después, Jesús tomó consigo a Pedro, a Jacobo y a Juan, los llevó aparte a un monte alto, y delante de ellos fue transformada su apariencia." },
      { n: 3, t: "Sus vestiduras se volvieron resplandecientes, de una blancura que ningún lavador en la tierra podría igualar." },
      { n: 4, t: "Y se les aparecieron Elías y Moisés, que conversaban con Jesús." },
      { n: 5, t: "Entonces Pedro le dijo: Maestro, qué bueno es estar aquí; levantemos tres enramadas, una para ti, otra para Moisés y otra para Elías." },
      { n: 6, t: "No sabía qué decir, porque el temor los había sobrecogido." },
      { n: 7, t: "Vino una nube que los cubrió con su sombra, y desde la nube una voz declaró que Jesús es el Hijo amado, y mandó oírle a él." },
      { n: 8, t: "De pronto, al mirar alrededor, ya no vieron a nadie con ellos, sino a Jesús solo." },
      { n: 9, t: "Mientras bajaban del monte, les ordenó no contar a nadie lo visto, hasta que el Hijo del Hombre resucitara de entre los muertos." },
      { n: 10, t: "Ellos guardaron aquello entre sí, discutiendo qué significaría eso de resucitar de los muertos." },
      { n: 11, t: "Y le preguntaron: ¿Por qué dicen los escribas que primero debe venir Elías?" },
      { n: 12, t: "Él respondió: Elías en verdad viene primero y lo restaura todo. ¿Y cómo está escrito del Hijo del Hombre? Que debe padecer mucho y ser tenido en nada." },
      { n: 13, t: "Pero les digo que Elías ya vino, e hicieron con él cuanto quisieron, tal como está escrito de él." },
    ],
  },
  mal4: {
    id: "mal4",
    titulo: "Malaquías 4",
    corto: "Malaquías 4",
    libro: "Malaquías",
    cap: 4,
    seccion: "El envío de Elías",
    versiculos: [
      { n: 5, t: "Miren: yo les envío al profeta Elías antes de que venga el día grande y temible de Jehová." },
      { n: 6, t: "Él volverá el corazón de los padres hacia los hijos, y el de los hijos hacia los padres, para que la tierra no sea herida con maldición." },
    ],
  },
  jn1: {
    id: "jn1",
    titulo: "San Juan 1",
    corto: "Juan 1",
    libro: "Juan",
    cap: 1,
    seccion: "El Verbo hecho carne",
    versiculos: [
      { n: 1, t: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios." },
      { n: 2, t: "Este era en el principio con Dios." },
      { n: 3, t: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho fue hecho." },
      { n: 4, t: "En él estaba la vida, y la vida era la luz de los hombres." },
      { n: 5, t: "La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella." },
      { n: 14, t: "Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad." },
    ],
  },
  rm8: {
    id: "rm8",
    titulo: "Romanos 8",
    corto: "Romanos 8",
    libro: "Romanos",
    cap: 8,
    seccion: "Vida en el Espíritu",
    versiculos: [
      { n: 1, t: "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús, los que no andan conforme a la carne, sino conforme al Espíritu." },
      { n: 2, t: "Porque la ley del Espíritu de vida en Cristo Jesús me ha librado de la ley del pecado y de la muerte." },
      { n: 28, t: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados." },
      { n: 38, t: "Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir," },
      { n: 39, t: "ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro." },
    ],
  },
  sal23: {
    id: "sal23",
    titulo: "Salmos 23",
    corto: "Salmos 23",
    libro: "Salmos",
    cap: 23,
    seccion: "El Señor es mi pastor",
    versiculos: [
      { n: 1, t: "Jehová es mi pastor; nada me faltará." },
      { n: 2, t: "En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará." },
      { n: 3, t: "Confortará mi alma; me guiará por sendas de justicia por amor de su nombre." },
      { n: 4, t: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento." },
      { n: 6, t: "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días." },
    ],
  },
  mt5: {
    id: "mt5",
    titulo: "San Mateo 5",
    corto: "Mateo 5",
    libro: "Mateo",
    cap: 5,
    seccion: "El Sermón del Monte",
    versiculos: [
      { n: 3, t: "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos." },
      { n: 6, t: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados." },
      { n: 14, t: "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder." },
      { n: 16, t: "Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos." },
    ],
  },
};

export const VOLADAS = "abcdefghijklmn";
export const LONG_PRESS_MS = 450;
export const FORM_VACIO = { libro: "", cap: "", vini: "", vfin: "", tipo: "Paralelo", porque: "", fraseDestino: "" };

// -------------------- utilidades de texto --------------------
export const tok = (t) => t.split(" ");
export const limpia = (w) => w.replace(/[.,;:!?¿¡«»()"'—]/g, "");
export const normalizaLibro = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");

// -------------------- referencias y fragmentos --------------------
export const clave = (pid, n) => `${pid}:${n}`;
export const aKey = (k, a) => (a ? `${k}@${a.ini}-${a.fin}` : k);
export const ctxKey = (k, ancla) =>
  ancla && ancla.ini != null ? `${k}@${ancla.ini}-${ancla.fin}` : k;
export const refDe = (k, pasajes) => {
  if (!k) return "";
  const [pid, n] = k.split(":");
  const p = pasajes[pid];
  return p ? `${p.corto}:${n}` : k;
};
export const versiculoDe = (k, pasajes) => {
  const [pid, n] = k.split(":");
  const p = pasajes[pid];
  return p ? p.versiculos.find((v) => v.n === +n) : null;
};
export const versiculoDeClave = (k, pasajes) => versiculoDe(k, pasajes);
export const fragmento = (k, a, pasajes) => {
  const v = versiculoDe(k, pasajes);
  if (!v || !a) return null;
  return tok(v.t).slice(a.ini, a.fin + 1).map((w, i, arr) => (i === arr.length - 1 ? limpia(w) : w)).join(" ");
};
export const fragDestino = (c, pasajes) =>
  c.hastaClave && c.hastaAncla ? fragmento(c.hastaClave, c.hastaAncla, pasajes) : (c.hastaFragTexto || null);

// -------------------- parseo de texto pegado --------------------
export function parsearVersiculos(texto) {
  const uno = " " + texto.replace(/\r/g, " ").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  let partes = uno.split(/\s(\d{1,3})[\s.):]+/);
  let vs = [];
  for (let i = 1; i < partes.length; i += 2) {
    const n = parseInt(partes[i], 10);
    const cuerpo = (partes[i + 1] || "").trim();
    if (n > 0 && n < 200 && cuerpo) vs.push({ n, t: cuerpo });
  }
  if (vs.length <= 1) {
    partes = uno.split(/(\d{1,3})(?=[A-ZÁÉÍÓÚÑ¿¡«"'])/);
    vs = [];
    for (let i = 1; i < partes.length; i += 2) {
      const n = parseInt(partes[i], 10);
      const cuerpo = (partes[i + 1] || "").trim();
      if (n > 0 && n < 200 && cuerpo) vs.push({ n, t: cuerpo });
    }
  }
  return vs;
}

// -------------------- reparador de JSON de IA --------------------
export function parsearJSONSeguro(txt) {
  let t = String(txt).replace(/```json|```/g, "").trim();
  const iObj = t.indexOf("{"), iArr = t.indexOf("[");
  let abre = "{", cierra = "}";
  if (iArr >= 0 && (iObj < 0 || iArr < iObj)) { abre = "["; cierra = "]"; }
  const ini = t.indexOf(abre), fin = t.lastIndexOf(cierra);
  if (ini < 0 || fin < 0) throw new Error("El consejero no devolvió JSON — intenta de nuevo");
  let s = t.slice(ini, fin + 1);
  const arreglos = [
    (x) => x,
    (x) => x.replace(/[\r\n\t]+/g, " "),
    (x) => x.replace(/[""«»]/g, "'").replace(/[‘’]/g, "'"),
    (x) => x.replace(/,\s*([}\]])/g, "$1"),
  ];
  for (const f of arreglos) {
    s = f(s);
    try { return JSON.parse(s); } catch (e) {}
  }
  throw new Error("El consejero devolvió un formato torcido — repite el intento o cambia de proveedor en ✦ IA");
}

// -------------------- filtros de cadenas y notas --------------------
export const salientesDe = (k, cadenas) =>
  cadenas.filter((c) => c.desdeClave === k).sort((x, y) => (x.desdeAncla ? x.desdeAncla.fin : 999) - (y.desdeAncla ? y.desdeAncla.fin : 999) || x.id - y.id);
export const entrantesDe = (k, cadenas) => cadenas.filter((c) => c.hastaClave === k);
export const estudiosDe = (k, estudios) => estudios.filter((e) => e.versiculos.includes(k));
export const colorPalabra = (k, i, resaltados) => {
  const segs = resaltados[k] || [];
  const s = segs.find((s) => (s.ini == null ? true : i >= s.ini && i <= s.fin));
  return s ? s.color : null;
};
export const notasDelVersiculo = (k, notas) => Object.entries(notas)
  .filter(([nk]) => nk === k || nk.startsWith(k + "@"))
  .map(([nk, texto]) => {
    const m = nk.match(/@(\d+)-(\d+)$/);
    return { ancla: m ? { ini: +m[1], fin: +m[2] } : null, texto };
  });

// -------------------- memoria y cerebro --------------------
export const conviccionesLector = (estudios) => {
  const lista = [];
  estudios.filter((e) => e.propio).forEach((e) => {
    (e.discernimiento || []).forEach((d) => {
      if ((d.respuesta || "").trim()) lista.push({ ancla: e.ancla, pregunta: String(d.pregunta).slice(0, 120), respuesta: String(d.respuesta).trim().slice(0, 200) });
    });
  });
  return lista.slice(-12);
};

export const materialCerebro = ({ pasajes, estudios, cadenas, notas, vrContextos }) => {
  const partes = [];
  const MAX = 4200;
  let chars = 0;
  const push = (s) => {
    if (chars + s.length > MAX) return false;
    partes.push(s);
    chars += s.length + 1;
    return true;
  };

  estudios.filter((e) => e.propio).forEach((e) => {
    (e.discernimiento || []).forEach((d) => {
      const r = (d.respuesta || "").trim();
      if (r) {
        push(`CONVICCIÓN [${e.ancla}] ${String(d.pregunta).slice(0,110)} → ${r.slice(0,180)}`);
      }
    });
    if (e.parrafos && e.parrafos.length) {
      const head = e.parrafos.slice(0, 2).map(p => p.slice(0, 160)).join(" | ");
      push(`ESTUDIO [${e.ancla}] ${e.titulo}: ${head}`);
    }
  });

  cadenas.forEach((c) => {
    if (c.porque) {
      const tipo = c.tipo ? ` (${c.tipo})` : "";
      const ia = c.sugeridaIA ? " [aceptada de IA]" : "";
      push(`CADENA${ia}${tipo} ${refDe(c.desdeClave, pasajes)} ⟶ ${c.hastaRef}: ${String(c.porque).slice(0,140)}`);
    }
  });

  Object.entries(notas).forEach(([k, t]) => {
    push(`NOTA [${refDe(k.split("@")[0], pasajes)}] ${String(t).slice(0,120)}`);
  });

  Object.values(pasajes).forEach((p) => {
    if (!PASAJES[p.id]) push(`LEYENDO: ${p.titulo}`);
  });

  estudios.filter((e) => e.propio).slice(-6).forEach((e) => {
    push(`TÍTULO ESTUDIO: ${e.titulo} (${e.ancla})`);
  });

  Object.entries(vrContextos).slice(-12).forEach(([ck, c]) => {
    push(`CONTEXTO HISTÓRICO [${c.ref || ck}] ${String(c.texto || "").slice(0, 160)}`);
  });

  return partes;
};

export const materialSignature = ({ estudios, cadenas, notas }) => {
  let conv = 0, cad = 0, not = 0, est = 0;
  estudios.filter((e) => e.propio).forEach((e) => {
    (e.discernimiento || []).forEach((d) => { if ((d.respuesta || "").trim()) conv++; });
    if (e.parrafos && e.parrafos.length) est++;
  });
  cadenas.forEach((c) => { if (c.porque) cad++; });
  Object.keys(notas).forEach(() => not++);
  return { conv, cad, not, est, total: conv + cad + not + est };
};

// ============================================================
// MOCK DE IA (para pruebas sin API key)
// ============================================================

/**
 * Devuelve una respuesta simulada de IA según el tipo de prompt.
 * Útil para probar la app sin gastar API keys ni depender de internet.
 */
export function mockIA(mensajes, tipo = "auto") {
  const userContent = mensajes.find((m) => m.role === "user")?.content || "";
  const sysContent = mensajes.find((m) => m.role === "system")?.content || "";

  // Detectar tipo de prompt por contenido
  if (tipo === "auto") {
    if (sysContent.includes("historiador") || userContent.includes("contexto histórico")) {
      tipo = "contextoHistorico";
    } else if (sysContent.includes("exegeta") || userContent.includes("Analiza") || userContent.includes("analiza")) {
      tipo = "analisisV18";
    } else if (sysContent.includes("archivista") || userContent.includes("MATERIAL")) {
      tipo = "cerebro";
    } else if (userContent.includes("Responde solamente") || userContent.includes("CONECTADO")) {
      tipo = "ping";
    } else {
      tipo = "general";
    }
  }

  switch (tipo) {
    case "contextoHistorico":
      return "Contexto histórico simulado: En el siglo I, Palestina estaba bajo dominio romano. El judaísmo del Segundo Templo esperaba un Mesías. Los evangelios fueron escritos décadas después de los eventos. Este versículo refleja el contexto del judaísmo helenístico.";

    case "analisisV18":
      return JSON.stringify({
        loQueElTextoDice: "El texto describe un evento narrativo con estructura clara.",
        contextoHistorico: "Siglo I, contexto del judaísmo del Segundo Templo.",
        contextoLiterario: "Género narrativo, posible paralelo con tradición profética.",
        puntosAbiertos: [
          { tema: "Identidad de personajes", lecturas: ["Lectura A", "Lectura B"] },
          { tema: "Cronología del evento", lecturas: ["Lectura C"] },
        ],
        preguntasDiscernimiento: [
          "¿Cómo se relaciona este texto con otros pasajes?",
          "¿Qué tradiciones interpretativas existen?",
        ],
      });

    case "cerebro":
      return JSON.stringify({
        sintesis: "Perfil del lector: estudia conexiones intertextuales, busca contexto histórico y prefiere análisis neutral.",
      });

    case "ping":
      return "CONECTADO";

    default:
      return "Respuesta simulada de IA para pruebas.";
  }
}

/**
 * Valida si una respuesta de IA parece tener el formato correcto.
 */
export function validarRespuestaIA(texto, tipo = "auto") {
  if (!texto || texto.length < 10) return { ok: false, razon: "Texto vacío o muy corto" };

  if (tipo === "auto") {
    if (texto.startsWith("{") || texto.startsWith("[")) tipo = "json";
    else if (texto.length > 40) tipo = "texto";
  }

  if (tipo === "json") {
    try {
      const parsed = parsearJSONSeguro(texto);
      if (parsed.loQueElTextoDice || parsed.contextoHistorico || parsed.sintesis) {
        return { ok: true, tipo: "json", parsed };
      }
      return { ok: true, tipo: "json", parsed, warning: "JSON válido pero sin campos esperados" };
    } catch (e) {
      return { ok: false, razon: "No es JSON válido: " + e.message };
    }
  }

  if (tipo === "contextoHistorico") {
    const tieneHistoria = /siglo|Herodes|romano|judaísmo|templo|geograf|costumbre/i.test(texto);
    const noTieneMoral = !/aplica|debes|debemos|amor de Dios|salvación|pecado/i.test(texto);
    return {
      ok: tieneHistoria && noTieneMoral,
      tipo: "contextoHistorico",
      tieneHistoria,
      noTieneMoral,
    };
  }

  return { ok: true, tipo: "texto" };
}

// ============================================================
// SNAPSHOT DE ESTADO (para comparar versiones)
// ============================================================

/**
 * Genera un snapshot serializable del estado de la app.
 * Se puede comparar entre versiones para detectar cambios.
 */
export function crearSnapshot({ pasajes, estudios, cadenas, notas, resaltados, cerebro, vrContextos }) {
  return {
    version: 18,
    timestamp: new Date().toISOString(),
    pasajes: Object.keys(pasajes).sort(),
    totalVersiculos: Object.values(pasajes).reduce((acc, p) => acc + p.versiculos.length, 0),
    cadenas: cadenas.length,
    notas: Object.keys(notas).length,
    resaltados: Object.keys(resaltados).length,
    estudios: estudios.length,
    estudiosPropios: estudios.filter((e) => e.propio).length,
    cerebro: {
      tieneSintesis: !!cerebro.sintesis,
      elementos: cerebro.elementos || 0,
    },
    vrContextos: Object.keys(vrContextos).length,
    hash: generarHashSimple({ pasajes, estudios, cadenas, notas, resaltados, cerebro, vrContextos }),
  };
}

function generarHashSimple(obj) {
  const str = JSON.stringify(obj, Object.keys(obj).sort());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(16);
}

/**
 * Compara dos snapshots y devuelve diferencias.
 */
export function compararSnapshots(antiguo, nuevo) {
  const diffs = [];
  if (!antiguo || !nuevo) return ["snapshot inválido"];

  if (antiguo.hash === nuevo.hash) return ["sin cambios"];

  const campos = ["totalVersiculos", "cadenas", "notas", "resaltados", "estudios", "estudiosPropios", "vrContextos"];
  for (const campo of campos) {
    if (antiguo[campo] !== nuevo[campo]) {
      diffs.push(`${campo}: ${antiguo[campo]} → ${nuevo[campo]}`);
    }
  }

  if (antiguo.pasajes.join(",") !== nuevo.pasajes.join(",")) {
    const agregados = nuevo.pasajes.filter((p) => !antiguo.pasajes.includes(p));
    const eliminados = antiguo.pasajes.filter((p) => !nuevo.pasajes.includes(p));
    if (agregados.length) diffs.push(`pasajes agregados: ${agregados.join(", ")}`);
    if (eliminados.length) diffs.push(`pasajes eliminados: ${eliminados.join(", ")}`);
  }

  return diffs.length ? diffs : ["cambios internos sin alterar conteos"];
}
