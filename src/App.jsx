import { useState, useRef, useEffect } from "react";

// ============================================================
// ABIGAIL · אביגיל — Prototipo v18 (laboratorio)
// Enfoque principal: Profundización fuerte en análisis bíblico e histórico.
// - Análisis Crítico significativamente mejorado: mayor profundidad histórica,
//   cultural, literaria y exegética, manteniendo estricta neutralidad.
// - Prompt del sistema más exigente y estructurado.
// - Mejor integración con el Cerebro de Abigail y convicciones previas.
// - Todo sigue siendo especificación viva para la app Android real.
// El porqué del lector y el discernimiento siguen siendo el corazón.
// ============================================================

const C = {
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

const TIPOS = {
  Profecía: { bg: "#F0E3BC", fg: "#7A5E10" },
  Cumplimiento: { bg: "#DFE7C8", fg: "#4C5E1E" },
  Paralelo: { bg: "#D8DEEE", fg: "#33406B" },
  Contexto: { bg: "#EADCCB", fg: "#6E4E2A" },
  Explicación: { bg: "#E4D8EC", fg: "#5A3A78" },
};

const LIBROS = [
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

// -------------------- PASAJES (texto de muestra, parafraseado) --------------------
const PASAJES = {
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
  // === Texto real agregado en v17 (RVR1960 adaptado para demo/personal) ===
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

// -------------------- ESTUDIO ANCLADO --------------------
const ESTUDIOS = [
  {
    id: "transfig",
    titulo: "La Transfiguración: la Ley y los Profetas ante el Hijo",
    ancla: "Marcos 9:2–13",
    parrafos: [
      "En el monte, la gloria del Hijo se deja ver por un instante a través de su humanidad, y junto a él aparecen Moisés y Elías. No son figuras al azar: encarnan lo que Israel llamaba «la Ley y los Profetas», es decir, todo el Antiguo Testamento dando testimonio ante Jesús.",
      "Moisés, el legislador que recibió los mandamientos, representa la alianza y la norma divina. Elías, tenido por el mayor de los profetas, representa la voz de Dios llamando al arrepentimiento. Su aparición declara visualmente que toda la Escritura apunta a Cristo: él no vino a abolir la Ley ni los Profetas, sino a cumplirlos (Mateo 5:17). Ambos, por así decirlo, le pasan la estafeta.",
      "Pedro propone tres enramadas —ponerlos al mismo nivel— y la voz del Padre lo corrige: solo el Hijo debe ser oído. Lucas añade el detalle más hermoso: hablaban con Jesús de su «éxodo», la partida que cumpliría en Jerusalén — su muerte y resurrección, la liberación definitiva del pecado (Lucas 9:31). Los dos grandes libertadores del Antiguo Pacto consolando al Libertador.",
      "¿Y por qué precisamente Elías? Malaquías 4:5–6 prometió su regreso antes del día de Jehová, y esa promesa creó en Israel la expectativa del precursor; de ahí la pregunta de los discípulos al bajar del monte (Marcos 9:11). Jesús la declara cumplida en Juan el Bautista, que vino con el espíritu y el poder de Elías (Lucas 1:17; Mateo 11:14; Juan 1:21): no una reencarnación, sino el precursor. Un dato para el asombro: Moisés murió y Dios mismo lo sepultó (Deuteronomio 34:5–6); Elías fue llevado vivo en un torbellino (2 Reyes 2:11). La muerte vencida y los arrebatados, juntos, delante del Señor de ambos.",
    ],
    versiculos: ["mr9:4", "mr9:7", "mr9:11", "mr9:13", "mal4:5"],
  },
];

// -------------------- CADENAS INICIALES --------------------
// ancla: null = versículo entero · {ini, fin} = rango de palabras
// hastaFragTexto: frase del destino escrita a mano (cuando el pasaje no está cargado)
const CADENAS_INICIALES = [
  {
    id: 1, desdeClave: "mr9:4", desdeAncla: { ini: 4, fin: 4 },
    hastaClave: "mal4:5", hastaRef: "Malaquías 4:5–6", hastaAncla: { ini: 1, fin: 6 }, hastaFragTexto: null,
    tipo: "Profecía", estudioId: "transfig",
    porque: "La promesa del regreso de Elías antes del día de Jehová creó la expectativa del precursor. Por eso, de todos los profetas, es Elías quien está en el monte.",
  },
  {
    id: 2, desdeClave: "mr9:4", desdeAncla: { ini: 4, fin: 4 },
    hastaClave: null, hastaRef: "2 Reyes 2:11", hastaAncla: null, hastaFragTexto: "el torbellino y el carro de fuego",
    tipo: "Contexto", estudioId: "transfig",
    porque: "Elías fue llevado vivo al cielo. Representa a los Profetas — y a los que serán arrebatados sin ver muerte.",
  },
  {
    id: 7, desdeClave: "mr9:4", desdeAncla: { ini: 4, fin: 4 },
    hastaClave: null, hastaRef: "Lucas 1:17", hastaAncla: null, hastaFragTexto: "delante del Señor, en el espíritu y el poder de Elías",
    tipo: "Cumplimiento", estudioId: "transfig",
    porque: "El ángel anuncia a Juan como el precursor: iría delante del Señor con el espíritu y el poder de Elías.",
  },
  {
    id: 8, desdeClave: "mr9:4", desdeAncla: { ini: 4, fin: 4 },
    hastaClave: null, hastaRef: "Mateo 11:14", hastaAncla: null, hastaFragTexto: "aquel Elías que se esperaba",
    tipo: "Cumplimiento", estudioId: "transfig",
    porque: "Jesús lo declara sin rodeos: para quien quiera recibirlo, Juan es el Elías anunciado.",
  },
  {
    id: 9, desdeClave: "mr9:4", desdeAncla: { ini: 4, fin: 4 },
    hastaClave: null, hastaRef: "Mateo 17:10–13", hastaAncla: null, hastaFragTexto: "entendieron que hablaba de Juan el Bautista",
    tipo: "Paralelo", estudioId: "transfig",
    porque: "Relato paralelo tras la Transfiguración: Jesús explica que Elías ya vino, y los discípulos entendieron que era Juan el Bautista.",
  },
  {
    id: 3, desdeClave: "mr9:4", desdeAncla: { ini: 6, fin: 6 },
    hastaClave: null, hastaRef: "Deuteronomio 34:5–6", hastaAncla: null, hastaFragTexto: "la sepultura de Moisés por mano de Dios",
    tipo: "Contexto", estudioId: "transfig",
    porque: "Moisés murió en Nebo y Dios mismo lo sepultó. Representa la Ley; su presencia aquí muestra el poder de Dios sobre la muerte.",
  },
  {
    id: 4, desdeClave: "mr9:4", desdeAncla: { ini: 7, fin: 10 },
    hastaClave: null, hastaRef: "Lucas 9:31", hastaAncla: null, hastaFragTexto: "hablaban del éxodo que cumpliría en Jerusalén",
    tipo: "Paralelo", estudioId: "transfig",
    porque: "Lucas cuenta de qué conversaban: del «éxodo» de Jesús — su muerte y resurrección.",
  },
  {
    id: 5, desdeClave: "mr9:7", desdeAncla: { ini: 22, fin: 26 },
    hastaClave: null, hastaRef: "Mateo 5:17", hastaAncla: null, hastaFragTexto: "vino a cumplir la Ley y los Profetas, no a abolirlos",
    tipo: "Explicación", estudioId: "transfig",
    porque: "El mandato del Padre de oír al Hijo declara el cumplimiento. Por eso Moisés y Elías desaparecen y queda Jesús solo.",
  },
  {
    id: 6, desdeClave: "mr9:13", desdeAncla: { ini: 4, fin: 4 },
    hastaClave: null, hastaRef: "Mateo 11:14", hastaAncla: null, hastaFragTexto: "Juan es el Elías que se esperaba",
    tipo: "Cumplimiento", estudioId: "transfig",
    porque: "No como reencarnación, sino con el espíritu y el poder de Elías (Lucas 1:17; Juan 1:21).",
  },
];

const RESALTADOS_INICIALES = {
  "mr9:4": [ { ini: 4, fin: 4, color: C.ambar }, { ini: 6, fin: 6, color: C.ambar } ],
  "mr9:7": [ { ini: 22, fin: 26, color: C.lila } ],
};
const NOTAS_INICIALES = {
  "mr9:5": "Pedro quiere igualarlos: tres enramadas. La nube lo interrumpe — solo el Hijo.",
};

const VOLADAS = "abcdefghijklmn";
const tok = (t) => t.split(" ");
const limpia = (w) => w.replace(/[.,;:!?¿¡«»()"'—]/g, "");
const LONG_PRESS_MS = 450;
const FORM_VACIO = { libro: "", cap: "", vini: "", vfin: "", tipo: "Paralelo", porque: "", fraseDestino: "" };

// ---- almacenamiento local seguro (funciona en el teléfono; si el
// entorno lo bloquea, p. ej. una vista previa, sigue en memoria) ----
const almacen = (() => {
  try { const t = "__abigail_t"; localStorage.setItem(t, t); localStorage.removeItem(t); return localStorage; }
  catch (e) { return null; }
})();
const cargar = (k, def) => {
  if (!almacen) return def;
  try { const v = almacen.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; }
};
const guardarLocal = (k, v) => { if (almacen) { try { almacen.setItem(k, JSON.stringify(v)); } catch (e) {} } };

// ---- proveedores de IA (todos hablan el formato compatible OpenAI) ----
const PROVEEDORES = {
  gemini: { nombre: "Google Gemini", url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", modelo: "gemini-3.6-flash", key: true },
  groq: { nombre: "Groq", url: "https://api.groq.com/openai/v1/chat/completions", modelo: "openai/gpt-oss-120b", key: true },
  deepseek: { nombre: "DeepSeek", url: "https://api.deepseek.com/v1/chat/completions", modelo: "deepseek-chat", key: true },
  local: { nombre: "Local (Ollama)", url: "http://localhost:11434/v1/chat/completions", modelo: "llama3.2", key: false },
  otro: { nombre: "Otro (compatible OpenAI)", url: "", modelo: "", key: true },
};
const IA_CONF_DEF = { activo: "gemini", urlOtro: "", claves: {}, modelos: {} };

// ============================================================
export default function Abigail() {
  const [vista, setVista] = useState("leer");
  const [pasajeId, setPasajeId] = useState("jn1"); // v17: empezamos con Juan 1 (más conocido)
  const [sel, setSel] = useState(null);
  const [anclaSel, setAnclaSel] = useState(null);
  const [anclaDestino, setAnclaDestino] = useState(null);
  const [margenAbierto, setMargenAbierto] = useState(null);
  const [cadenas, setCadenas] = useState(() => cargar("abigail.cadenas", CADENAS_INICIALES));
  const [resaltados, setResaltados] = useState(() => cargar("abigail.resaltados", RESALTADOS_INICIALES));
  const [notas, setNotas] = useState(() => cargar("abigail.notas", NOTAS_INICIALES));
  const [estudioAbierto, setEstudioAbierto] = useState(null);
  const [modo, setModo] = useState("cadenas");
  const [form, setForm] = useState(FORM_VACIO);
  const [notaBorrador, setNotaBorrador] = useState("");
  const [selectorAbierto, setSelectorAbierto] = useState(false);
  const [guardadaOk, setGuardadaOk] = useState("");
  const [pasajes, setPasajes] = useState(() => ({ ...PASAJES, ...cargar("abigail.pasajes", {}) }));
  const [cargadorAbierto, setCargadorAbierto] = useState(false);
  const [cargForm, setCargForm] = useState({ libro: "", cap: "", seccion: "", texto: "" });
  const [estudios, setEstudios] = useState(() => [...ESTUDIOS, ...cargar("abigail.estudios", [])]);
  const [analisisAbierto, setAnalisisAbierto] = useState(false);
  const [anCargando, setAnCargando] = useState(false);
  const [anError, setAnError] = useState("");
  const [anDatos, setAnDatos] = useState(null);
  const [anResp, setAnResp] = useState({});
  const [iaConf, setIaConf] = useState(() => cargar("abigail.ia", IA_CONF_DEF));
  const [ajustesIAAbierto, setAjustesIAAbierto] = useState(false);
  const [iaCargando, setIaCargando] = useState(false);
  const [iaError, setIaError] = useState("");
  const [iaSugerencias, setIaSugerencias] = useState([]);
  const [iaPregunta, setIaPregunta] = useState("");
  const [iaRespuesta, setIaRespuesta] = useState("");
  const [iaPrueba, setIaPrueba] = useState("");
  const [cerebro, setCerebro] = useState(() => cargar("abigail.cerebro", { sintesis: "", actualizado: "", elementos: 0 }));
  const [cerebroMsg, setCerebroMsg] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const timerRef = useRef(null);
  const longPressRef = useRef(false);

  // Cada cambio se guarda solo, sin botones
  useEffect(() => { guardarLocal("abigail.cadenas", cadenas); }, [cadenas]);
  useEffect(() => { guardarLocal("abigail.resaltados", resaltados); }, [resaltados]);
  useEffect(() => { guardarLocal("abigail.notas", notas); }, [notas]);
  useEffect(() => {
    const propios = {};
    Object.entries(pasajes).forEach(([id, p]) => { if (!PASAJES[id]) propios[id] = p; });
    guardarLocal("abigail.pasajes", propios);
  }, [pasajes]);
  useEffect(() => { guardarLocal("abigail.ia", iaConf); }, [iaConf]);
  useEffect(() => { guardarLocal("abigail.estudios", estudios.filter((e) => e.propio)); }, [estudios]);
  useEffect(() => { guardarLocal("abigail.cerebro", cerebro); }, [cerebro]);

  const pasaje = pasajes[pasajeId] || PASAJES.mr9;
  const clave = (pid, n) => `${pid}:${n}`;
  const refDe = (k) => { if (!k) return ""; const [pid, n] = k.split(":"); const p = pasajes[pid]; return p ? `${p.corto}:${n}` : k; };
  const versiculoDe = (k) => { const [pid, n] = k.split(":"); const p = pasajes[pid]; return p ? p.versiculos.find((v) => v.n === +n) : null; };
  const aKey = (k, a) => (a ? `${k}@${a.ini}-${a.fin}` : k);
  const fragmento = (k, a) => {
    const v = versiculoDe(k); if (!v || !a) return null;
    return tok(v.t).slice(a.ini, a.fin + 1).map((w, i, arr) => (i === arr.length - 1 ? limpia(w) : w)).join(" ");
  };
  const fragDestino = (c) => (c.hastaClave && c.hastaAncla ? fragmento(c.hastaClave, c.hastaAncla) : (c.hastaFragTexto || null));

  // pasaje destino cargado según el formulario (libro + capítulo + versículo)
  const destinoCargado = () => {
    const p = Object.values(pasajes).find((p) => p.libro === form.libro && p.cap === +form.cap);
    if (!p) return null;
    const v = p.versiculos.find((v) => v.n === +form.vini);
    return v ? { p, v, k: clave(p.id, v.n) } : null;
  };

  const salientesDe = (k) => cadenas.filter((c) => c.desdeClave === k).sort((x, y) => (x.desdeAncla ? x.desdeAncla.fin : 999) - (y.desdeAncla ? y.desdeAncla.fin : 999) || x.id - y.id);
  const entrantesDe = (k) => cadenas.filter((c) => c.hastaClave === k);
  const estudiosDe = (k) => estudios.filter((e) => e.versiculos.includes(k));

  const colorPalabra = (k, i) => {
    const segs = resaltados[k] || [];
    const s = segs.find((s) => (s.ini == null ? true : i >= s.ini && i <= s.fin));
    return s ? s.color : null;
  };

  const abrirVersiculo = (k) => {
    setSel(k); setAnclaSel(null); setAnclaDestino(null); setModo("cadenas");
    setForm(FORM_VACIO); setNotaBorrador(""); setGuardadaOk("");
    setIaSugerencias([]); setIaRespuesta(""); setIaError("");
  };

  const iniciarPresion = (k) => {
    longPressRef.current = false;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      longPressRef.current = true;
      setMargenAbierto((m) => (m === k ? null : k));
      try { if (navigator.vibrate) navigator.vibrate(15); } catch (e) {}
    }, LONG_PRESS_MS);
  };
  const cancelarPresion = () => clearTimeout(timerRef.current);
  const clickVersiculo = (k) => {
    if (longPressRef.current) { longPressRef.current = false; return; }
    abrirVersiculo(k);
  };

  const tocarRango = (actual, setter, i) => {
    if (!actual) setter({ ini: i, fin: i });
    else if (actual.ini === actual.fin && i !== actual.ini) setter({ ini: Math.min(actual.ini, i), fin: Math.max(actual.ini, i) });
    else setter({ ini: i, fin: i });
  };

  const irA = (k, a = null) => {
    const [pid] = k.split(":");
    setPasajeId(pid); abrirVersiculo(k); setAnclaSel(a);
    setVista("leer"); setEstudioAbierto(null); setMargenAbierto(null);
  };

  const guardarCadena = (seguir = false) => {
    if (!form.libro || !form.cap || !form.vini || !form.porque.trim()) return;
    const dest = destinoCargado();
    const hastaRef = `${form.libro} ${form.cap}:${form.vini}${form.vfin ? "–" + form.vfin : ""}`;
    setCadenas([...cadenas, {
      id: Date.now(),
      desdeClave: sel, desdeAncla: anclaSel,
      hastaClave: dest ? dest.k : null,
      hastaRef,
      hastaAncla: dest ? anclaDestino : null,
      hastaFragTexto: dest ? null : (form.fraseDestino.trim() || null),
      tipo: form.tipo, porque: form.porque.trim(),
    }]);
    setAnclaDestino(null);
    if (seguir) {
      // sigue abierto, misma ancla de origen, formulario limpio
      setForm(FORM_VACIO);
      setGuardadaOk(hastaRef);
    } else {
      setGuardadaOk("");
      setModo("cadenas");
    }
  };

  const guardarNota = () => {
    const nk = aKey(sel, anclaSel);
    const nx = { ...notas };
    if (notaBorrador.trim()) nx[nk] = notaBorrador.trim(); else delete nx[nk];
    setNotas(nx); setModo("cadenas");
  };

  const resaltar = (color) => {
    const segs = [...(resaltados[sel] || [])];
    const rx = { ...resaltados };
    if (!color) {
      rx[sel] = anclaSel ? segs.filter((s) => s.ini != null && (s.fin < anclaSel.ini || s.ini > anclaSel.fin)) : [];
      if (rx[sel].length === 0) delete rx[sel];
    } else {
      rx[sel] = [...segs, anclaSel ? { ...anclaSel, color } : { ini: null, fin: null, color }];
    }
    setResaltados(rx);
  };

  // ---- cargador de pasajes: parte el texto pegado en versículos ----
  const parsearVersiculos = (texto) => {
    const uno = " " + texto.replace(/\r/g, " ").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    let partes = uno.split(/\s(\d{1,3})[\s.):]+/);
    let vs = [];
    for (let i = 1; i < partes.length; i += 2) {
      const n = parseInt(partes[i], 10);
      const cuerpo = (partes[i + 1] || "").trim();
      if (n > 0 && n < 200 && cuerpo) vs.push({ n, t: cuerpo });
    }
    if (vs.length <= 1) {
      // formato "pegado": 16Porque de tal manera…
      partes = uno.split(/(\d{1,3})(?=[A-ZÁÉÍÓÚÑ¿¡«"'])/);
      vs = [];
      for (let i = 1; i < partes.length; i += 2) {
        const n = parseInt(partes[i], 10);
        const cuerpo = (partes[i + 1] || "").trim();
        if (n > 0 && n < 200 && cuerpo) vs.push({ n, t: cuerpo });
      }
    }
    return vs;
  };

  const vistaPreviaCarga = cargadorAbierto ? parsearVersiculos(cargForm.texto) : [];

  const guardarPasaje = () => {
    const vs = parsearVersiculos(cargForm.texto);
    if (!cargForm.libro || !cargForm.cap || vs.length === 0) return;
    const slug = cargForm.libro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    const id = "u_" + slug + "_" + cargForm.cap;
    const nuevo = {
      id,
      titulo: `${cargForm.libro} ${cargForm.cap}`,
      corto: `${cargForm.libro} ${cargForm.cap}`,
      libro: cargForm.libro,
      cap: +cargForm.cap,
      seccion: cargForm.seccion.trim() || "Pasaje del lector",
      versiculos: vs,
    };
    setPasajes({ ...pasajes, [id]: nuevo });
    setPasajeId(id);
    setCargadorAbierto(false);
    setCargForm({ libro: "", cap: "", seccion: "", texto: "" });
    setSel(null); setMargenAbierto(null);
  };

  // ---- El Consejo de IA: cliente unificado (la clave vive solo en tu dispositivo) ----
  const llamarIA = async (mensajes, provId = iaConf.activo, jsonMode = false) => {
    const p = PROVEEDORES[provId] || PROVEEDORES.gemini;
    const url = provId === "otro" ? (iaConf.urlOtro || "").trim() : p.url;
    if (!url) throw new Error("Configura la URL del proveedor en ✦ IA");
    const key = ((iaConf.claves || {})[provId] || "").trim();
    if (p.key && !key) throw new Error("Falta la clave API — agrégala tocando ✦ IA (arriba a la derecha)");
    const headers = { "Content-Type": "application/json" };
    if (key) headers.Authorization = "Bearer " + key;
    const cuerpo = { model: (iaConf.modelos || {})[provId] || p.modelo, messages: mensajes, temperature: 0.4 };
    if (jsonMode) cuerpo.response_format = { type: "json_object" };
    let res = await fetch(url, { method: "POST", headers, body: JSON.stringify(cuerpo) });
    if (!res.ok && jsonMode && (res.status === 400 || res.status === 422)) {
      // el proveedor no acepta modo JSON: reintento sin exigirlo (el reparador se encarga)
      delete cuerpo.response_format;
      res = await fetch(url, { method: "POST", headers, body: JSON.stringify(cuerpo) });
    }
    if (!res.ok) throw new Error("Error " + res.status + " de " + p.nombre + " — revisa clave y modelo en ✦ IA");
    const data = await res.json();
    return (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
  };

  // proveedores que integran el comité: todos los que tengan clave (y el local solo si es el activo)
  const proveedoresListos = () => Object.keys(PROVEEDORES).filter((id) => {
    if (id === "local") return iaConf.activo === "local";
    if (id === "otro") return (iaConf.urlOtro || "").trim() !== "" && ((iaConf.claves || {}).otro || "").trim() !== "";
    return ((iaConf.claves || {})[id] || "").trim() !== "";
  });

  // reparador: extrae el JSON de la respuesta y endereza errores comunes
  const parsearJSONSeguro = (txt) => {
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
      (x) => x.replace(/[""«»]/g, "'").replace(/[\u2018\u2019]/g, "'"),
      (x) => x.replace(/,\s*([}\]])/g, "$1"),
    ];
    for (const f of arreglos) {
      s = f(s);
      try { return JSON.parse(s); } catch (e) {}
    }
    throw new Error("El consejero devolvió un formato torcido — repite el intento o cambia de proveedor en ✦ IA");
  };

  // ---- memoria de discernimiento: las convicciones ya respondidas por el lector ----
  const conviccionesLector = () => {
    const lista = [];
    estudios.filter((e) => e.propio).forEach((e) => {
      (e.discernimiento || []).forEach((d) => {
        if ((d.respuesta || "").trim()) lista.push({ ancla: e.ancla, pregunta: String(d.pregunta).slice(0, 120), respuesta: String(d.respuesta).trim().slice(0, 200) });
      });
    });
    return lista.slice(-12);
  };

  // ---- el Cerebro de Abigail: todo el estudio del lector, destilado ----
  const materialCerebro = () => {
    const partes = [];
    estudios.filter((e) => e.propio).forEach((e) => {
      (e.discernimiento || []).forEach((d) => { if ((d.respuesta || "").trim()) partes.push(`CONVICCIÓN [${e.ancla}] ${d.pregunta} → ${String(d.respuesta).trim()}`); });
    });
    cadenas.forEach((c) => { if (c.porque) partes.push(`CADENA${c.sugeridaIA ? " (aceptada de IA)" : ""} ${refDe(c.desdeClave)} ⟶ ${c.hastaRef}: ${c.porque}`); });
    Object.entries(notas).forEach(([k, t]) => partes.push(`NOTA [${refDe(k.split("@")[0])}] ${t}`));
    estudios.filter((e) => e.propio).forEach((e) => partes.push(`ESTUDIO: ${e.titulo}`));
    Object.values(pasajes).forEach((p) => { if (!PASAJES[p.id]) partes.push(`LEYENDO: ${p.titulo}`); });
    return partes;
  };

  const actualizarCerebro = async () => {
    setCerebroMsg("… sintetizando todo tu estudio");
    try {
      const material = materialCerebro();
      if (material.length === 0) { setCerebroMsg("Aún no hay material — estudia un poco primero"); return; }
      const sys = "Eres el archivista fiel de un estudioso de la Biblia Reina-Valera 1960. Sintetizas su perfil de estudio SOLO con el material que te entrego. No inventes ni añadas doctrina ajena. Destila con precisión histórica y teológica: identifica temas centrales, cadenas intertextuales que el lector ha trazado, convicciones ya formadas, patrones de razonamiento y preguntas que ya ha resuelto. Sé compacto y fiel. Responde ÚNICAMENTE un objeto JSON válido.";
      const usr = 'Material completo del lector (cadenas, estudios, notas, convicciones, pasajes leídos):\n"""' + material.join("\n") + '"""\n\nProduce exactamente:\n{"sintesis":"perfil compacto (máx 250 palabras). Incluye: (1) convicciones centrales ya discernidas con sus anclas, (2) temas históricos/teológicos que más estudia, (3) cómo conecta pasajes (cadenas), (4) preguntas ya resueltas. Usa referencias concretas cuando sea posible."}';
      const txt = await llamarIA([{ role: "system", content: sys }, { role: "user", content: usr }], iaConf.activo, true);
      const d = parsearJSONSeguro(txt);
      if (!d.sintesis) throw new Error("La síntesis llegó vacía — intenta de nuevo");
      setCerebro({ sintesis: String(d.sintesis), actualizado: new Date().toISOString(), elementos: material.length });
      setCerebroMsg("✓ Cerebro actualizado con " + material.length + " elementos");
    } catch (e) { setCerebroMsg("✗ " + (e.message || "no pude sintetizar")); }
  };

  const bloqueConvicciones = () => {
    if (iaConf.usarDiscernimiento === false) return "";
    const trozos = [];
    if (cerebro.sintesis) trozos.push(" CEREBRO DEL LECTOR (síntesis fiel de todo su estudio; respétala, no repitas lo ya resuelto, construye sobre esto): " + cerebro.sintesis);
    const frescas = conviccionesLector().slice(-8);
    if (frescas.length > 0) trozos.push(" ÚLTIMAS CONVICCIONES: " + frescas.map((c) => `[${c.ancla}] ${c.pregunta} → ${c.respuesta}`).join(" · "));
    return trozos.join("");
  };

  const contextoAncla = () => {
    const v = versiculoDe(sel);
    const frag = anclaSel ? fragmento(sel, anclaSel) : null;
    return `El lector estudia ${refDe(sel)}, cuyo texto de trabajo dice: "${v ? v.t : ""}". ` +
      (frag ? `Marcó como ancla la expresión «${frag}».` : "El ancla es el versículo completo.");
  };

  const sugerirConcordancias = async () => {
    const lista = proveedoresListos();
    if (lista.length === 0) { setIaError("Agrega al menos una clave en ✦ IA (arriba a la derecha)"); return; }
    setIaCargando(true); setIaError(""); setIaSugerencias([]);
    const sys = "Eres un asistente de estudio bíblico serio y preciso, basado en la Biblia Reina-Valera 1960. Sugieres concordancias (referencias cruzadas) verificables, ancladas al texto y su contexto histórico/literario. Prefieres conexiones reales del Antiguo y Nuevo Testamento. Respondes ÚNICAMENTE un arreglo JSON válido, sin texto adicional ni marcas de código.";
    const usr = contextoAncla() + ' Sugiere de 3 a 5 concordancias precisas y útiles para esa ancla. Usa nombre completo del libro en español (ej: "Malaquías 4:5"). Tipos permitidos: Profecía, Cumplimiento, Paralelo, Contexto, Explicación. Cada una debe tener un "porque" de 1-2 frases que explique el vínculo textual o histórico. Formato exacto: {"sugerencias":[{"referencia":"Libro Cap:Vers","tipo":"Profecía|Cumplimiento|Paralelo|Contexto|Explicación","porque":"una o dos frases"}]}' + bloqueConvicciones();
    const resultados = await Promise.allSettled(lista.map(async (id) => {
      const txt = await llamarIA([{ role: "system", content: sys }, { role: "user", content: usr }], id, true);
      const d = parsearJSONSeguro(txt);
      const arr = Array.isArray(d) ? d : (d.sugerencias || d.concordancias || []);
      return { id, arr: Array.isArray(arr) ? arr.filter((s) => s && s.referencia && s.porque) : [] };
    }));
    const mapa = new Map();
    const fallos = [];
    resultados.forEach((r, idx) => {
      if (r.status === "fulfilled") {
        r.value.arr.forEach((s) => {
          const kRef = normalizaLibro(s.referencia);
          const prev = mapa.get(kRef);
          if (prev) {
            const nom = PROVEEDORES[r.value.id].nombre;
            if (!prev.consejeros.includes(nom)) prev.consejeros.push(nom);
            if (String(s.porque || "").length > String(prev.porque || "").length) prev.porque = s.porque;
          } else {
            mapa.set(kRef, { ...s, consejeros: [PROVEEDORES[r.value.id].nombre] });
          }
        });
      } else {
        fallos.push(PROVEEDORES[lista[idx]].nombre);
      }
    });
    const fusion = [...mapa.values()].sort((a, b) => b.consejeros.length - a.consejeros.length);
    setIaSugerencias(fusion);
    if (fusion.length === 0 && fallos.length === 0) setIaError("El comité no devolvió sugerencias — intenta de nuevo");
    if (fallos.length > 0) setIaError("Sin respuesta de: " + fallos.join(", "));
    setIaCargando(false);
  };

  const preguntarIA = async () => {
    if (!iaPregunta.trim()) return;
    setIaCargando(true); setIaError(""); setIaRespuesta("");
    try {
      const sys = "Eres un compañero de estudio bíblico basado en la Reina-Valera 1960: claro, reverente y conciso (máximo tres párrafos cortos). Cita referencias como Libro Cap:Vers.";
      const txt = await llamarIA([{ role: "system", content: sys }, { role: "user", content: contextoAncla() + bloqueConvicciones() + " Pregunta del lector: " + iaPregunta.trim() }]);
      setIaRespuesta(txt);
    } catch (e) { setIaError(e.message || "No pude responder"); }
    setIaCargando(false);
  };

  const normalizaLibro = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
  const aceptarSugerencia = (s) => {
    const m = String(s.referencia).match(/^\s*([123]?\s?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*)\s+(\d+)[:.](\d+)/);
    let hastaClave = null;
    if (m) {
      const lib = LIBROS.find((l) => normalizaLibro(l) === normalizaLibro(m[1]));
      if (lib) {
        const p = Object.values(pasajes).find((p) => p.libro === lib && p.cap === +m[2]);
        if (p && p.versiculos.some((v) => v.n === +m[3])) hastaClave = clave(p.id, +m[3]);
      }
    }
    setCadenas([...cadenas, {
      id: Date.now() + Math.random(),
      desdeClave: sel, desdeAncla: anclaSel,
      hastaClave, hastaRef: String(s.referencia), hastaAncla: null, hastaFragTexto: null,
      tipo: TIPOS[s.tipo] ? s.tipo : "Paralelo", porque: String(s.porque), sugeridaIA: true,
    }]);
    setIaSugerencias(iaSugerencias.filter((x) => x !== s));
  };

  const probarIA = async () => {
    setIaPrueba("… probando");
    try { await llamarIA([{ role: "user", content: "Responde únicamente: listo" }]); setIaPrueba("✓ Conexión correcta"); }
    catch (e) { setIaPrueba("✗ " + (e.message || "falló")); }
  };

  // ---- Análisis crítico v18: profundidad histórica, cultural y exegética ----
  // REGLAS ESTRICTAS:
  // - IA propone, lector decide. Nunca tomes partido doctrinal.
  // - Separa claramente: (1) LO QUE EL TEXTO DICE (observable en el pasaje RVR1960), (2) CONTEXTO factual (histórico, cultural, literario verificable), (3) PUNTOS ABIERTOS donde las tradiciones difieren (presenta sin favoritismo), (4) PREGUNTAS DE DISCERNIMIENTO que avancen sobre las convicciones ya guardadas.
  // - Solo hechos históricos/culturales seguros. Si es conjetura, dilo. Cita contexto del siglo I, geografía, costumbres judías, imperio romano, literatura intertestamentaria y del AT cuando sea relevante y verificable.
  // - Exégesis anclada al texto: estructura, repeticiones, palabras clave en español del pasaje, progresión, inclusiones, quiasmos, actores, tiempo, lugar.
  // - Respeta el Cerebro y últimas convicciones: no repitas preguntas ya respondidas; construye sobre ellas.
  // - Respuesta SOLO JSON válido. Sin preámbulos, sin moralizar, sin aplicaciones devocionales.
  const analizarPasaje = async () => {
    setAnCargando(true); setAnError(""); setAnDatos(null); setAnResp({});
    try {
      const cuerpo = pasaje.versiculos.map((v) => v.n + " " + v.t).join(" ");
      const sys = "Eres un exegeta riguroso y neutral especializado en la Biblia Reina-Valera 1960. Tu única tarea es ayudar al lector a escudriñar. REGLA SUPREMA: distingue siempre (A) lo que el texto DICE (palabras, estructura, acciones, personajes presentes en el pasaje) de (B) interpretaciones, doctrinas y aplicaciones humanas. Nunca presentes como 'lo que dice el texto' lo que es enseñanza de una tradición específica. Cuando las grandes corrientes cristianas (patrística, medieval, reforma, moderna, pentecostal, etc.) o lecturas judías difieren, expón las posiciones principales con honestidad y sin tomar partido. Formula preguntas para que el lector discierna delante de Dios y de la Escritura. Si recibes convicciones ya discernidas por el lector, respétalas, no las repitas y formula preguntas nuevas que profundicen. Usa SOLO hechos históricos y culturales verificables del mundo bíblico (siglo I, Palestina, judaísmo del Segundo Templo, imperio romano, geografía, costumbres, intertextualidad con AT). Señala cuando algo es conjetura académica. Responde ÚNICAMENTE un objeto JSON válido, sin texto fuera de las llaves, sin ```.";
      const usr = `Analiza con profundidad el pasaje ${pasaje.titulo} — ${pasaje.seccion}.

TEXTO COMPLETO DE TRABAJO (Reina-Valera 1960):
"${cuerpo}"

INSTRUCCIONES DE SALIDA (JSON estricto):
Produce un objeto con esta estructura exacta:
{
  "loQueElTextoDice": "Descripción densa y precisa de lo que el texto dice literalmente: estructura del pasaje, personajes, acciones, secuencia, palabras clave repetidas o significativas tal como aparecen en español, progresión argumental o narrativa, inclusiones, contrastes. Cita expresiones concretas del texto. 3-6 oraciones densas.",
  "contextoHistorico": "Contexto histórico y cultural factual verificable: época, lugar, costumbres judías del periodo, trasfondo político (Herodes, Roma, prefectos), prácticas religiosas, expectativas mesiánicas, geografía relevante. Solo hechos; indica si es reconstrucción probable.",
  "contextoLiterario": "Contexto literario e intertextual: género del pasaje, relación con el libro completo, ecos o citas del Antiguo Testamento (con referencia), paralelos cercanos en otros evangelios o epístolas, estructura retórica. Señala anclajes textuales claros.",
  "puntosAbiertos": [
    {
      "tema": "Breve título del punto donde las interpretaciones difieren (ej: 'Identidad de Elías en el pasaje')",
      "lecturas": [
        "Lectura A — quiénes la sostienen tradicionalmente y argumento breve basado en texto o tradición",
        "Lectura B — quiénes la sostienen y argumento breve",
        "Lectura C (si existe) — ..."
      ]
    }
  ],
  "preguntasDiscernimiento": [
    "Pregunta 1 que invite al lector a comparar el texto con otros pasajes y formar su propia convicción",
    "Pregunta 2 que avance más allá de lo ya respondido en su estudio previo",
    "..."
  ]
}

REQUISITOS DE CALIDAD:
- Incluye al menos 3 puntos abiertos relevantes cuando sea pertinente.
- Genera entre 4 y 6 preguntas de discernimiento agudas.
- Las preguntas deben invitar a leer más Escritura, no a opinar subjetivamente.
- Aprovecha el bloque de CEREBRO Y CONVICCIONES que viene después para no repetir lo ya resuelto.
` + bloqueConvicciones();

      const txt = await llamarIA([{ role: "system", content: sys }, { role: "user", content: usr }], iaConf.activo, true);
      const raw = parsearJSONSeguro(txt);

      // Normalización v18 → forma que consume la UI actual (no destructivo)
      const d = {
        observacion: raw.loQueElTextoDice || raw.observacion || raw.texto || "",
        contexto: [raw.contextoHistorico, raw.contextoLiterario, raw.contexto]
          .filter(Boolean)
          .join(" | ") || raw.contexto || "",
        interpretaciones: raw.puntosAbiertos || raw.interpretaciones || raw.puntos || [],
        preguntas: raw.preguntasDiscernimiento || raw.preguntas || raw.preguntasDeDiscernimiento || []
      };

      if (!d.observacion || !d.preguntas || d.preguntas.length === 0) {
        throw new Error("Respuesta incompleta del consejero — intenta de nuevo o cambia de proveedor");
      }
      setAnDatos(d);
    } catch (e) { setAnError(e.message || "No pude analizar el pasaje"); }
    setAnCargando(false);
  };

  const guardarAnalisis = () => {
    if (!anDatos) return;
    const parrafos = [
      "LO QUE EL TEXTO DICE — " + anDatos.observacion,
      "CONTEXTO — " + anDatos.contexto,
      ...(anDatos.interpretaciones || []).map((it) => "PUNTO ABIERTO · " + it.tema + " — " + (it.lecturas || []).join(" · ")),
    ];
    const discernimiento = (anDatos.preguntas || []).map((p, i) => ({ pregunta: p, respuesta: (anResp[i] || "").trim() }));
    const nuevo = {
      id: "a_" + Date.now(),
      titulo: "Análisis: " + pasaje.titulo,
      ancla: pasaje.titulo,
      parrafos,
      discernimiento,
      versiculos: pasaje.versiculos.map((v) => clave(pasaje.id, v.n)),
      propio: true,
      asistidoIA: true,
    };
    setEstudios([...estudios, nuevo]);
    setAnalisisAbierto(false); setAnDatos(null); setAnResp({});
    setEstudioAbierto(nuevo);
  };

  const exportarEstudio = () => {
    const propios = {};
    Object.entries(pasajes).forEach(([id, p]) => { if (!PASAJES[id]) propios[id] = p; });
    const datos = { app: "abigail", version: 14, exportado: new Date().toISOString(), cadenas, resaltados, notas, pasajes: propios, estudios: estudios.filter((e) => e.propio), cerebro };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "abigail-estudio.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const importarEstudio = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (d.cadenas) setCadenas(d.cadenas);
        if (d.resaltados) setResaltados(d.resaltados);
        if (d.notas) setNotas(d.notas);
        if (d.pasajes) setPasajes((prev) => ({ ...prev, ...d.pasajes }));
        if (d.estudios) setEstudios((prev) => [...prev.filter((e) => !d.estudios.some((x) => x.id === e.id)), ...d.estudios]);
        if (d.cerebro && d.cerebro.sintesis) setCerebro(d.cerebro);
      } catch (err) {}
    };
    r.readAsText(f);
    e.target.value = "";
  };

  const notasDelVersiculo = (k) => Object.entries(notas)
    .filter(([nk]) => nk === k || nk.startsWith(k + "@"))
    .map(([nk, texto]) => {
      const m = nk.match(/@(\d+)-(\d+)$/);
      return { ancla: m ? { ini: +m[1], fin: +m[2] } : null, texto };
    });

  const dest = destinoCargado();

  // ---------------------------------------------------------- UI
  return (
    <div style={{ background: C.noche, minHeight: "100vh", color: C.claro, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="mx-auto relative" style={{ maxWidth: 480, minHeight: "100vh", paddingBottom: 120 }}>

        {/* ===== CABECERA ===== */}
        <header className="px-5 pt-6 pb-3 sticky top-0 z-20" style={{ background: `linear-gradient(${C.noche} 82%, transparent)` }}>
          <div className="flex items-end justify-between">
            <div>
              <div style={{ color: C.oroClaro, fontSize: 26, fontFamily: "Georgia, serif", lineHeight: 1 }}>אביגיל</div>
              <div style={{ letterSpacing: "0.35em", fontSize: 11, color: C.claroSuave, marginTop: 4 }}>BIBLIA DE ESTUDIO RV1960</div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                style={{ fontSize: 20, color: C.oroClaro, background: "none", border: "none", padding: "4px 8px" }}
                aria-label="Buscar pasaje"
              >
                🔎
              </button>
              <button onClick={() => { setAjustesIAAbierto(true); setIaPrueba(""); }} style={{ fontSize: 10, color: C.oroClaro, background: "none", border: `1px solid ${C.purpura}`, borderRadius: 999, padding: "4px 10px", fontWeight: 700 }}>
                ✦ IA · {(PROVEEDORES[iaConf.activo] || PROVEEDORES.gemini).nombre}
              </button>
            </div>
          </div>
          <div className="mt-4 relative">
            <button onClick={() => setSelectorAbierto(!selectorAbierto)} className="w-full flex items-center justify-between px-4 py-2 rounded-full" style={{ background: C.nocheAlta, border: `1px solid ${C.purpura}`, color: C.claro }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 15 }}>{pasaje.titulo} <span style={{ color: C.claroSuave, fontSize: 12 }}>· {pasaje.seccion}</span></span>
              <span style={{ color: C.oro }}>{selectorAbierto ? "▴" : "▾"}</span>
            </button>

            {/* Buscador rápido (v17) */}
            {searchOpen && (
              <div className="absolute left-0 right-0 mt-2 z-40" style={{ background: C.nocheAlta, border: `1px solid ${C.purpura}`, borderRadius: 12, padding: 12 }}>
                <input
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar libro o capítulo (ej: Juan 1, Salmos 23...)"
                  className="w-full px-4 py-3 rounded-xl text-base"
                  style={{ background: C.papel, color: C.tinta, border: `1px solid ${C.papelBorde}` }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchTerm) {
                      const term = searchTerm.toLowerCase().trim();
                      const found = Object.values(pasajes).find(p => 
                        p.titulo.toLowerCase().includes(term) || 
                        p.corto.toLowerCase().includes(term)
                      );
                      if (found) {
                        setPasajeId(found.id);
                        setSearchOpen(false);
                        setSearchTerm("");
                        setSel(null);
                        setMargenAbierto(null);
                      }
                    }
                  }}
                />
                <div className="mt-3 text-xs text-center" style={{ color: C.claroSuave }}>
                  Presiona Enter para ir • Toca fuera para cerrar
                </div>
              </div>
            )}

            {selectorAbierto && (
              <div className="absolute left-0 right-0 mt-1 rounded-2xl overflow-hidden z-30" style={{ background: C.nocheAlta, border: `1px solid ${C.purpura}` }}>
                {Object.values(pasajes).map((p) => (
                  <button key={p.id} onClick={() => { setPasajeId(p.id); setSelectorAbierto(false); setSel(null); setMargenAbierto(null); setSearchOpen(false); }} className="w-full text-left px-4 py-3" style={{ fontFamily: "Georgia, serif", color: p.id === pasajeId ? C.oroClaro : C.claro, background: p.id === pasajeId ? C.purpura : "transparent" }}>
                    {p.titulo} <span style={{ fontSize: 12, color: C.claroSuave }}>· {p.seccion}</span>
                  </button>
                ))}
                <button onClick={() => { setSelectorAbierto(false); setCargadorAbierto(true); setSearchOpen(false); }} className="w-full text-left px-4 py-3" style={{ color: C.oroClaro, borderTop: `1px solid ${C.purpura}`, fontSize: 14, fontWeight: 700 }}>
                  ＋ Agregar pasaje · pega el texto de tu Biblia
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ===== VISTA LEER ===== */}
        {vista === "leer" && (
          <main className="px-4 mt-1">
            <div className="rounded-lg px-5 pt-6 pb-8" style={{ background: C.papel, color: C.tinta, border: `1px solid ${C.papelBorde}`, boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}>
              <div className="text-center mb-5">
                <div style={{ fontFamily: "Georgia, serif", fontSize: 13, letterSpacing: "0.25em", color: C.tintaSuave }}>{pasaje.titulo.toUpperCase()}</div>
                <div className="mx-auto mt-2" style={{ width: 46, height: 2, background: C.oro }} />
                <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13, color: C.tintaSuave, marginTop: 8 }}>{pasaje.seccion}</div>
                <button onClick={() => { setAnalisisAbierto(true); setAnError(""); }} className="mt-3 px-4 py-1 rounded-full" style={{ border: `1px solid ${C.oro}`, color: "#7A5E10", fontSize: 11, fontWeight: 700, background: "transparent" }}>
                  ✦ Análisis crítico del pasaje
                </button>
              </div>

              <div
                style={{ fontFamily: "Georgia, serif", fontSize: 17, lineHeight: 1.95, userSelect: "none", WebkitUserSelect: "none", touchAction: "pan-y" }}
                onContextMenu={(e) => e.preventDefault()}
              >
                {pasaje.versiculos.map((v) => {
                  const k = clave(pasaje.id, v.n);
                  const palabras = tok(v.t);
                  const sal = salientesDe(k);
                  const ent = entrantesDe(k);
                  const notasV = notasDelVersiculo(k);
                  const seleccionado = sel === k;
                  const letraDe = new Map(sal.map((c, i) => [c.id, VOLADAS[i] || "•"]));
                  return (
                    <span key={v.n} id={`v-${k}`}>
                      <span
                        onClick={() => clickVersiculo(k)}
                        onPointerDown={() => iniciarPresion(k)}
                        onPointerUp={cancelarPresion}
                        onPointerLeave={cancelarPresion}
                        onPointerMove={cancelarPresion}
                        role="button"
                        style={{ cursor: "pointer" }}
                      >
                        <sup style={{ color: C.oro, fontWeight: 700, fontSize: 11, marginRight: 3 }}>{v.n}</sup>
                        {palabras.map((w, i) => {
                          const col = colorPalabra(k, i);
                          const enAncla = seleccionado && anclaSel && i >= anclaSel.ini && i <= anclaSel.fin;
                          return (
                            <span key={i}>
                              <span style={{
                                background: col || "transparent",
                                borderRadius: 3,
                                padding: col ? "1px 1px" : 0,
                                boxShadow: enAncla ? `0 2px 0 ${C.oro}` : (seleccionado && !anclaSel ? `0 2px 0 ${C.papelBorde}` : "none"),
                              }}>{w}</span>
                              {sal.filter((c) => c.desdeAncla && c.desdeAncla.fin === i).map((c) => (
                                <sup key={c.id} style={{ color: C.oro, fontWeight: 700, fontSize: 10, marginLeft: 1 }}>{letraDe.get(c.id)}</sup>
                              ))}
                              {ent.filter((c) => c.hastaAncla && c.hastaAncla.fin === i).map((c) => (
                                <sup key={"e" + c.id} style={{ color: "#8A6A20", fontWeight: 700, fontSize: 10, marginLeft: 1 }}>↩</sup>
                              ))}
                              {notasV.filter((n) => n.ancla && n.ancla.fin === i).map((n, j) => (
                                <sup key={"n" + j} style={{ color: C.tintaSuave, fontSize: 10, marginLeft: 1 }}>✎</sup>
                              ))}
                              {" "}
                            </span>
                          );
                        })}
                        {sal.filter((c) => !c.desdeAncla).map((c) => (
                          <sup key={c.id} style={{ color: C.oro, fontWeight: 700, fontSize: 10 }}>{letraDe.get(c.id)}</sup>
                        ))}
                        {ent.filter((c) => !c.hastaAncla).map((c) => (
                          <sup key={"e" + c.id} style={{ color: "#8A6A20", fontWeight: 700, fontSize: 10 }}>↩</sup>
                        ))}
                        {notasV.some((n) => !n.ancla) && <sup style={{ color: C.tintaSuave, fontSize: 10 }}>✎</sup>}
                      </span>{" "}

                      {margenAbierto === k && (
                        <span style={{ display: "block", margin: "8px 0 12px 14px", paddingLeft: 12, borderLeft: `2px solid ${C.oro}` }}>
                          <span style={{ display: "block", fontSize: 9, letterSpacing: "0.2em", color: C.tintaSuave, fontFamily: "system-ui, sans-serif", marginBottom: 4 }}>
                            CONCORDANCIA · {refDe(k)}
                          </span>
                          {sal.length + ent.length === 0 && (
                            <span style={{ display: "block", fontSize: 12.5, color: C.tintaSuave }}>Sin cadenas todavía. Toca el versículo y usa ⛓ Enlazar.</span>
                          )}
                          {sal.map((c) => (
                            <span key={c.id} style={{ display: "block", fontSize: 12.5, lineHeight: 1.7 }}>
                              <sup style={{ color: C.oro, fontWeight: 700 }}>{letraDe.get(c.id)}</sup>{" "}
                              <button
                                onClick={(e) => { e.stopPropagation(); c.hastaClave ? irA(c.hastaClave, c.hastaAncla) : abrirVersiculo(k); }}
                                style={{ fontFamily: "Georgia, serif", fontSize: 12.5, color: C.tinta, textDecoration: c.hastaClave ? "underline" : "none", background: "none", border: "none", padding: 0, cursor: "pointer" }}
                              >
                                {c.hastaRef}
                              </button>{" "}
                              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: (TIPOS[c.tipo] || TIPOS.Paralelo).fg, fontFamily: "system-ui, sans-serif" }}>
                                {c.tipo.toUpperCase()}
                              </span>
                              {c.desdeAncla && <span style={{ color: C.tintaSuave, fontSize: 11 }}> · «{fragmento(k, c.desdeAncla)}»</span>}
                            </span>
                          ))}
                          {ent.map((c) => (
                            <span key={"e" + c.id} style={{ display: "block", fontSize: 12.5, lineHeight: 1.7 }}>
                              <sup style={{ color: "#8A6A20", fontWeight: 700 }}>↩</sup>{" "}
                              <button
                                onClick={(e) => { e.stopPropagation(); irA(c.desdeClave, c.desdeAncla); }}
                                style={{ fontFamily: "Georgia, serif", fontSize: 12.5, color: C.tinta, textDecoration: "underline", background: "none", border: "none", padding: 0, cursor: "pointer" }}
                              >
                                desde {refDe(c.desdeClave)}
                              </button>{" "}
                              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: (TIPOS[c.tipo] || TIPOS.Paralelo).fg, fontFamily: "system-ui, sans-serif" }}>
                                {c.tipo.toUpperCase()}
                              </span>
                            </span>
                          ))}
                          <span style={{ display: "block", marginTop: 4 }}>
                            <button onClick={(e) => { e.stopPropagation(); abrirVersiculo(k); }} style={{ fontSize: 11, color: "#7A5E10", background: "none", border: "none", padding: 0, textDecoration: "underline", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                              panel completo ›
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); abrirVersiculo(k); setModo("enlazar"); }} style={{ fontSize: 11, color: "#7A5E10", background: "none", border: "none", padding: 0, marginLeft: 12, textDecoration: "underline", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                              ＋ enlazar
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setMargenAbierto(null); }} style={{ fontSize: 11, color: C.tintaSuave, background: "none", border: "none", padding: 0, marginLeft: 12, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
                              cerrar ✕
                            </button>
                          </span>
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>

              <div className="mt-7 pt-4" style={{ borderTop: `1px solid ${C.papelBorde}`, fontSize: 10.5, color: C.tintaSuave, lineHeight: 1.6 }}>
                Texto de muestra (paráfrasis del prototipo). La app final mostrará el texto RVR1960 con licencia de las Sociedades Bíblicas. <b>Toca</b> un versículo para el panel completo · <b>mantenlo presionado</b> para su concordancia al margen.
              </div>
            </div>
          </main>
        )}

        {/* ===== VISTA CADENAS ===== */}
        {vista === "cadenas" && (
          <main className="px-4 mt-1">
            <div className="rounded-lg px-5 py-6" style={{ background: C.papel, color: C.tinta, border: `1px solid ${C.papelBorde}`, boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 13, letterSpacing: "0.25em", color: C.tintaSuave, textAlign: "center" }}>MIS CADENAS</div>
              <div className="mx-auto mt-2 mb-4" style={{ width: 46, height: 2, background: C.oro }} />
              <div className="flex gap-2 mb-4">
                <button onClick={exportarEstudio} className="flex-1 py-2 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 12, fontWeight: 700 }}>
                  Exportar estudio ⇩
                </button>
                <label className="flex-1 py-2 rounded-full text-center" style={{ border: `1px solid ${C.oro}`, color: "#7A5E10", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  Importar ⇧
                  <input type="file" accept="application/json,.json" onChange={importarEstudio} style={{ display: "none" }} />
                </label>
              </div>
              {cadenas.map((c) => {
                const frag = fragmento(c.desdeClave, c.desdeAncla);
                const fragHasta = fragDestino(c);
                return (
                  <button key={c.id} onClick={() => irA(c.desdeClave, c.desdeAncla)} className="w-full text-left mb-3 px-4 py-3 rounded-lg" style={{ background: "#FFFDF6", border: `1px solid ${C.papelBorde}` }}>
                    <div className="flex items-center justify-between gap-2">
                      <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700 }}>
                        {refDe(c.desdeClave)} <span style={{ color: C.oro }}>⟶</span> {c.hastaRef}
                      </div>
                      <Chip tipo={c.tipo} />
                    </div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 13, color: "#4A4156", marginTop: 3 }}>
                      {frag ? <>«{frag}»</> : <em>versículo completo</em>}
                      {fragHasta && <> <span style={{ color: C.oro }}>⟶</span> «{fragHasta}»</>}
                    </div>
                    <div style={{ fontSize: 12.5, color: C.tintaSuave, marginTop: 4, lineHeight: 1.55 }}>{c.porque}</div>
                  </button>
                );
              })}
              <div style={{ fontSize: 10.5, color: C.tintaSuave, marginTop: 8, lineHeight: 1.6 }}>
                Cada cadena guarda su ancla exacta en ambos lados: palabra, frase o versículo. Todo queda guardado en este dispositivo automáticamente; con "Exportar estudio" respaldas tu trabajo en un archivo JSON — el mismo que luego trasplantaremos a la app real.
              </div>
            </div>
          </main>
        )}

        {/* ===== SHEET DEL VERSÍCULO ===== */}
        {sel && vista === "leer" && (() => {
          const v = versiculoDe(sel);
          const palabras = tok(v.t);
          const sal = salientesDe(sel);
          const ent = entrantesDe(sel);
          const letraDe = new Map(sal.map((c, i) => [c.id, VOLADAS[i] || "•"]));
          const notasV = notasDelVersiculo(sel);
          return (
            <div className="fixed left-0 right-0 bottom-0 z-40">
              <div className="mx-auto relative" style={{ maxWidth: 480 }}>
                <div className="absolute" style={{ top: -26, right: 28, width: 22, height: 40, background: `linear-gradient(${C.oro}, ${C.oroClaro})`, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)", boxShadow: "0 4px 10px rgba(0,0,0,0.35)" }} />
                <div className="rounded-t-2xl px-5 pt-4 pb-5 overflow-y-auto" style={{ background: C.papel, color: C.tinta, maxHeight: "72vh", boxShadow: "0 -14px 40px rgba(0,0,0,0.55)", borderTop: `3px solid ${C.oro}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 16 }}>{refDe(sel)}</div>
                    <button onClick={() => setSel(null)} aria-label="Cerrar" className="px-3 py-1 rounded-full" style={{ background: C.tinta, color: C.papel, fontSize: 12 }}>Cerrar ✕</button>
                  </div>

                  <div className="px-3 py-3 rounded-lg mb-3" style={{ background: "#FFFDF6", border: `1px solid ${C.papelBorde}` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.tintaSuave }}>ELIGE EL ANCLA (ORIGEN)</div>
                      <button onClick={() => setAnclaSel(null)} className="px-2 py-1 rounded-full" style={{ fontSize: 10.5, border: `1px solid ${anclaSel ? C.papelBorde : C.oro}`, color: anclaSel ? C.tintaSuave : "#7A5E10", fontWeight: anclaSel ? 400 : 700 }}>
                        todo el versículo
                      </button>
                    </div>
                    <div className="flex flex-wrap" style={{ gap: 4 }}>
                      {palabras.map((w, i) => {
                        const activa = anclaSel && i >= anclaSel.ini && i <= anclaSel.fin;
                        return (
                          <button key={i} onClick={() => tocarRango(anclaSel, setAnclaSel, i)} className="px-2 py-1 rounded-md" style={{ fontFamily: "Georgia, serif", fontSize: 13.5, background: activa ? C.noche : "transparent", color: activa ? C.oroClaro : C.tinta, border: `1px solid ${activa ? C.noche : C.papelBorde}` }}>{limpia(w) || w}</button>
                        );
                      })}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.tintaSuave, marginTop: 8 }}>
                      Ancla actual: {anclaSel ? <b style={{ color: "#7A5E10" }}>«{fragmento(sel, anclaSel)}»</b> : <b>versículo completo</b>}
                      {anclaSel && anclaSel.ini === anclaSel.fin && <span> · toca otra palabra para extender a una frase</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span style={{ fontSize: 11, color: C.tintaSuave }}>Resaltar:</span>
                    <BotonColor color={C.ambar} onClick={() => resaltar(C.ambar)} />
                    <BotonColor color={C.lila} onClick={() => resaltar(C.lila)} />
                    <button onClick={() => resaltar(null)} className="px-2 py-1 rounded-full" style={{ fontSize: 11, border: `1px solid ${C.papelBorde}`, color: C.tintaSuave }}>quitar</button>
                    <div className="flex-1" />
                    <BotonAccion activo={modo === "enlazar"} onClick={() => setModo(modo === "enlazar" ? "cadenas" : "enlazar")}>⛓ Enlazar</BotonAccion>
                    <BotonAccion activo={modo === "anotar"} onClick={() => { setModo(modo === "anotar" ? "cadenas" : "anotar"); setNotaBorrador(notas[aKey(sel, anclaSel)] || ""); }}>✎ Anotar</BotonAccion>
                    <BotonAccion activo={modo === "ia"} onClick={() => { setModo(modo === "ia" ? "cadenas" : "ia"); setIaError(""); }}>✦ Consejo</BotonAccion>
                  </div>

                  {/* ---- Formulario nueva cadena: libro + cap + versículo + frase destino ---- */}
                  {modo === "enlazar" && (
                    <div className="mb-4 px-4 py-4 rounded-lg" style={{ background: "#FFFDF6", border: `1px dashed ${C.oro}` }}>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Nueva cadena</div>
                      <div style={{ fontSize: 11.5, color: C.tintaSuave, marginBottom: 10 }}>
                        Desde: {anclaSel ? <>«{fragmento(sel, anclaSel)}»</> : "versículo completo"} ({refDe(sel)})
                      </div>

                      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: C.tintaSuave, marginBottom: 4 }}>ENLAZAR CON</div>
                      <select value={form.libro} onChange={(e) => { setForm({ ...form, libro: e.target.value }); setAnclaDestino(null); }} className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }}>
                        <option value="">— Elige el libro —</option>
                        {LIBROS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                      <div className="flex gap-2 mb-2">
                        <input value={form.cap} onChange={(e) => { setForm({ ...form, cap: e.target.value.replace(/\D/g, "") }); setAnclaDestino(null); }} placeholder="Cap." inputMode="numeric" className="w-full px-3 py-2 rounded-md" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
                        <input value={form.vini} onChange={(e) => { setForm({ ...form, vini: e.target.value.replace(/\D/g, "") }); setAnclaDestino(null); }} placeholder="Vers." inputMode="numeric" className="w-full px-3 py-2 rounded-md" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
                        <input value={form.vfin} onChange={(e) => setForm({ ...form, vfin: e.target.value.replace(/\D/g, "") })} placeholder="al v. (opc.)" inputMode="numeric" className="w-full px-3 py-2 rounded-md" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
                      </div>

                      {/* Ancla del destino: seleccionable si el pasaje está cargado, escrita si no */}
                      {dest ? (
                        <div className="px-3 py-3 rounded-md mb-2" style={{ background: C.papel, border: `1px solid ${C.papelBorde}` }}>
                          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: C.tintaSuave, marginBottom: 4 }}>
                            FRASE U ORACIÓN DEL DESTINO · {form.libro} {form.cap}:{form.vini} <span style={{ fontWeight: 400 }}>(opcional — toca sus palabras)</span>
                          </div>
                          <div className="flex flex-wrap" style={{ gap: 4 }}>
                            {tok(dest.v.t).map((w, i) => {
                              const activa = anclaDestino && i >= anclaDestino.ini && i <= anclaDestino.fin;
                              return (
                                <button key={i} onClick={() => tocarRango(anclaDestino, setAnclaDestino, i)} className="px-2 py-1 rounded-md" style={{ fontFamily: "Georgia, serif", fontSize: 12.5, background: activa ? C.noche : "transparent", color: activa ? C.oroClaro : C.tinta, border: `1px solid ${activa ? C.noche : C.papelBorde}` }}>{limpia(w) || w}</button>
                              );
                            })}
                          </div>
                          {anclaDestino && (
                            <div style={{ fontSize: 11, color: "#7A5E10", marginTop: 6 }}>«{fragmento(dest.k, anclaDestino)}»</div>
                          )}
                        </div>
                      ) : (
                        form.libro && form.cap && form.vini && (
                          <input value={form.fraseDestino} onChange={(e) => setForm({ ...form, fraseDestino: e.target.value })} placeholder="Frase u oración del destino (opcional, escríbela)" className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
                        )
                      )}

                      <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }}>
                        {Object.keys(TIPOS).map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <textarea value={form.porque} onChange={(e) => setForm({ ...form, porque: e.target.value })} placeholder="¿Por qué la enlazas? Este es el corazón de Abigail…" rows={3} className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
                      {guardadaOk && (
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#4C5E1E", background: "#DFE7C8", borderRadius: 8, padding: "7px 10px", marginBottom: 8 }}>
                          ✓ Cadena guardada → {guardadaOk}. La ancla sigue lista para la siguiente.
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button onClick={() => guardarCadena(true)} className="flex-1 py-2 rounded-full" style={{ border: `1px solid ${C.oro}`, color: "#7A5E10", fontSize: 12.5, fontWeight: 700, opacity: form.libro && form.cap && form.vini && form.porque.trim() ? 1 : 0.45 }}>
                          ＋ Guardar y agregar otra
                        </button>
                        <button onClick={() => guardarCadena(false)} className="flex-1 py-2 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 12.5, fontWeight: 700, opacity: form.libro && form.cap && form.vini && form.porque.trim() ? 1 : 0.45 }}>
                          Guardar y cerrar
                        </button>
                      </div>
                    </div>
                  )}

                  {modo === "anotar" && (
                    <div className="mb-4 px-4 py-4 rounded-lg" style={{ background: "#FFFDF6", border: `1px dashed ${C.oro}` }}>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Nota al margen</div>
                      <div style={{ fontSize: 11.5, color: C.tintaSuave, marginBottom: 8 }}>
                        Sobre: {anclaSel ? <>«{fragmento(sel, anclaSel)}»</> : "el versículo completo"} ({refDe(sel)})
                      </div>
                      <textarea value={notaBorrador} onChange={(e) => setNotaBorrador(e.target.value)} rows={3} placeholder="Tu apunte de estudio…" className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
                      <button onClick={guardarNota} className="w-full py-2 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 13, fontWeight: 700 }}>Guardar nota</button>
                    </div>
                  )}

                  {/* ---- El Consejo de IA ---- */}
                  {modo === "ia" && (
                    <div className="mb-4 px-4 py-4 rounded-lg" style={{ background: "#FFFDF6", border: `1px dashed ${C.oro}` }}>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>✦ El Consejo</div>
                      <div style={{ fontSize: 11.5, color: C.tintaSuave, marginBottom: 8 }}>
                        Sobre: {anclaSel ? <>«{fragmento(sel, anclaSel)}»</> : "el versículo completo"} ({refDe(sel)}) · {(PROVEEDORES[iaConf.activo] || PROVEEDORES.gemini).nombre}
                      </div>
                      <button onClick={sugerirConcordancias} disabled={iaCargando} className="w-full py-2 rounded-full mb-1" style={{ background: C.noche, color: C.oroClaro, fontSize: 12.5, fontWeight: 700, opacity: iaCargando ? 0.5 : 1 }}>
                        {iaCargando ? "El comité está deliberando…" : "✦ Sugerir concordancias"}
                      </button>
                      <div style={{ fontSize: 10, color: C.tintaSuave, textAlign: "center", marginBottom: 8 }}>
                        {(() => { const l = proveedoresListos(); return l.length > 1 ? "Comité: " + l.map((id) => PROVEEDORES[id].nombre).join(" · ") : l.length === 1 ? "Consejero: " + PROVEEDORES[l[0]].nombre : "Sin consejeros — agrega una clave en ✦ IA"; })()}
                      </div>
                      <div className="flex gap-2 mb-2">
                        <input value={iaPregunta} onChange={(e) => setIaPregunta(e.target.value)} placeholder="O pregunta algo sobre este pasaje…" className="flex-1 px-3 py-2 rounded-md" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 13.5 }} />
                        <button onClick={preguntarIA} disabled={iaCargando} className="px-3 py-2 rounded-full" style={{ border: `1px solid ${C.oro}`, color: "#7A5E10", fontSize: 12, fontWeight: 700 }}>Preguntar</button>
                      </div>
                      {iaError && <div style={{ fontSize: 12, color: "#8A3030", marginBottom: 6, fontWeight: 700 }}>{iaError}</div>}
                      {iaRespuesta && (
                        <div className="px-3 py-2 rounded-md mb-2" style={{ background: C.papel, border: `1px solid ${C.papelBorde}`, fontFamily: "Georgia, serif", fontSize: 13.5, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{iaRespuesta}</div>
                      )}
                      {iaSugerencias.map((s, i) => (
                        <div key={i} className="px-3 py-2 rounded-md mb-2" style={{ background: C.papel, border: `1px solid ${C.papelBorde}` }}>
                          <div className="flex items-center justify-between gap-2">
                            <div style={{ fontFamily: "Georgia, serif", fontSize: 13.5, fontWeight: 700 }}>{s.referencia}</div>
                            <Chip tipo={TIPOS[s.tipo] ? s.tipo : "Paralelo"} />
                          </div>
                          <div style={{ fontSize: 12.5, color: "#4A4156", marginTop: 3, lineHeight: 1.5 }}>{s.porque}</div>
                          {s.consejeros && s.consejeros.length > 0 && (
                            <div style={{ fontSize: 10, marginTop: 4, fontWeight: 700, color: s.consejeros.length > 1 ? "#4C5E1E" : C.tintaSuave }}>
                              Proponen: {s.consejeros.join(" · ")}{s.consejeros.length > 1 ? " — coincidencia del comité ✓" : ""}
                            </div>
                          )}
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => aceptarSugerencia(s)} className="px-3 py-1 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 11.5, fontWeight: 700 }}>✓ Aceptar</button>
                            <button onClick={() => setIaSugerencias(iaSugerencias.filter((x) => x !== s))} className="px-3 py-1 rounded-full" style={{ border: `1px solid ${C.papelBorde}`, color: C.tintaSuave, fontSize: 11.5 }}>✕ Descartar</button>
                          </div>
                        </div>
                      ))}
                      <div style={{ fontSize: 10, color: C.tintaSuave, lineHeight: 1.5, marginTop: 4 }}>
                        La IA propone; tú decides. Verifica cada referencia en tu Biblia antes de aceptarla — las aceptadas quedan marcadas ✦ IA.
                      </div>
                    </div>
                  )}

                  {modo === "cadenas" && notasV.map((n, j) => (
                    <div key={j} className="mb-3 px-4 py-3 rounded-lg" style={{ background: "#FFFDF6", borderLeft: `3px solid ${C.oro}` }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: C.tintaSuave }}>
                        NOTA {n.ancla ? <>· «{fragmento(sel, n.ancla)}»</> : "· versículo completo"}
                      </div>
                      <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 14, marginTop: 3 }}>{n.texto}</div>
                    </div>
                  ))}

                  {modo === "cadenas" && (
                    <>
                      {sal.length + ent.length === 0 && (
                        <div style={{ fontSize: 13, color: C.tintaSuave, lineHeight: 1.6 }}>
                          Este versículo aún no tiene cadenas. Elige un ancla arriba y usa <b>⛓ Enlazar</b>.
                        </div>
                      )}
                      {sal.map((c) => (
                        <TarjetaCadena key={c.id} letra={letraDe.get(c.id)} titulo={c.hastaRef} frag={fragmento(c.desdeClave, c.desdeAncla)} fragOtro={fragDestino(c)} c={c}
                          onIr={c.hastaClave ? () => irA(c.hastaClave, c.hastaAncla) : null}
                          onEstudio={c.estudioId ? () => setEstudioAbierto(estudios.find((e) => e.id === c.estudioId)) : null} />
                      ))}
                      {ent.map((c) => (
                        <TarjetaCadena key={"e" + c.id} letra="↩" titulo={<>desde <u>{refDe(c.desdeClave)}</u></>} frag={fragDestino(c)} fragOtro={fragmento(c.desdeClave, c.desdeAncla)} c={c}
                          onIr={() => irA(c.desdeClave, c.desdeAncla)}
                          onEstudio={c.estudioId ? () => setEstudioAbierto(estudios.find((e) => e.id === c.estudioId)) : null} />
                      ))}
                      {estudiosDe(sel).map((e) => (
                        <button key={e.id} onClick={() => setEstudioAbierto(e)} className="w-full text-left px-4 py-3 rounded-lg mt-1" style={{ background: C.noche, color: C.claro }}>
                          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: C.oroClaro }}>✦ ESTUDIO ANCLADO</div>
                          <div style={{ fontFamily: "Georgia, serif", fontSize: 15, marginTop: 3 }}>{e.titulo}</div>
                          <div style={{ fontSize: 11, color: C.claroSuave, marginTop: 2 }}>{e.ancla} · toca para leerlo completo</div>
                        </button>
                      ))}
                      <button onClick={() => { setModo("enlazar"); setGuardadaOk(""); }} className="w-full py-2 rounded-full mt-3" style={{ border: `1px dashed ${C.oro}`, color: "#7A5E10", fontSize: 12.5, fontWeight: 700, background: "transparent" }}>
                        ＋ Agregar cadena a este versículo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ===== MODAL ANÁLISIS CRÍTICO ===== */}
        {analisisAbierto && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(20,12,36,0.82)" }} onClick={() => setAnalisisAbierto(false)}>
            <div className="w-full rounded-t-2xl px-5 pt-5 pb-8 overflow-y-auto" style={{ maxWidth: 480, maxHeight: "92vh", background: C.papel, color: C.tinta, borderTop: `3px solid ${C.oro}` }} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: C.tintaSuave }}>✦ ANÁLISIS CRÍTICO · {pasaje.titulo}</div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 19, marginTop: 4, marginBottom: 6 }}>Escudriñar el pasaje</h2>
              <div style={{ fontSize: 11.5, color: C.tintaSuave, lineHeight: 1.6, marginBottom: 10 }}>
                El análisis separa lo que el texto dice de las interpretaciones humanas. Donde las tradiciones difieren, la IA no decide: te presenta las lecturas y te pregunta — tu discernimiento es lo que queda guardado.
              </div>
              {iaConf.usarDiscernimiento !== false && (cerebro.sintesis || conviccionesLector().length > 0) && (
                <div style={{ fontSize: 10.5, color: "#7A5E10", fontWeight: 700, marginBottom: 8 }}>
                  ✦ {cerebro.sintesis ? "Con el Cerebro de Abigail (síntesis de " + cerebro.elementos + " elementos)" : "Con tu discernimiento previo: " + conviccionesLector().length + " respuestas"} — no se te preguntará lo ya resuelto.
                </div>
              )}
              {!anDatos && (
                <button onClick={analizarPasaje} disabled={anCargando} className="w-full py-2 rounded-full mb-2" style={{ background: C.noche, color: C.oroClaro, fontSize: 13, fontWeight: 700, opacity: anCargando ? 0.5 : 1 }}>
                  {anCargando ? "Escudriñando…" : "✦ Iniciar análisis (" + (PROVEEDORES[iaConf.activo] || PROVEEDORES.gemini).nombre + ")"}
                </button>
              )}
              {anError && <div style={{ fontSize: 12, color: "#8A3030", fontWeight: 700, marginBottom: 8 }}>{anError}</div>}
              {anDatos && (
                <div>
                  <Seccion titulo="LO QUE EL TEXTO DICE" nota="observable en el pasaje">{anDatos.observacion}</Seccion>
                  <Seccion titulo="CONTEXTO" nota="histórico y literario">{anDatos.contexto}</Seccion>
                  {(anDatos.interpretaciones || []).map((it, i) => (
                    <div key={i} className="px-3 py-2 rounded-md mb-2" style={{ background: "#FFFDF6", borderLeft: `3px solid ${C.papelBorde}` }}>
                      <div style={{ fontSize: 9.5, letterSpacing: "0.15em", color: "#8A6A20", fontWeight: 700 }}>PUNTO ABIERTO · interpretaciones, no son el texto</div>
                      <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700, marginTop: 2 }}>{it.tema}</div>
                      {(it.lecturas || []).map((l, j) => (
                        <div key={j} style={{ fontSize: 12.5, color: "#4A4156", marginTop: 3, lineHeight: 1.5 }}>· {l}</div>
                      ))}
                    </div>
                  ))}
                  <div style={{ fontSize: 9.5, letterSpacing: "0.15em", color: C.tintaSuave, fontWeight: 700, margin: "10px 0 6px" }}>DISCERNIMIENTO DEL LECTOR · tus respuestas son el análisis que se guarda</div>
                  {(anDatos.preguntas || []).map((p, i) => (
                    <div key={i} className="mb-2">
                      <div style={{ fontFamily: "Georgia, serif", fontSize: 13.5, fontWeight: 700, marginBottom: 3 }}>{p}</div>
                      <textarea value={anResp[i] || ""} onChange={(e) => setAnResp({ ...anResp, [i]: e.target.value })} rows={2} placeholder="Tu respuesta, con la Escritura delante…" className="w-full px-3 py-2 rounded-md" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 13, fontFamily: "Georgia, serif" }} />
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => { setAnDatos(null); setAnResp({}); }} className="flex-1 py-2 rounded-full" style={{ border: `1px solid ${C.tinta}`, fontSize: 12.5 }}>Repetir</button>
                    <button onClick={guardarAnalisis} className="flex-1 py-2 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 12.5, fontWeight: 700 }}>Guardar como estudio</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== MODAL AJUSTES DE IA ===== */}
        {ajustesIAAbierto && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(20,12,36,0.82)" }} onClick={() => setAjustesIAAbierto(false)}>
            <div className="w-full rounded-t-2xl px-5 pt-5 pb-8 overflow-y-auto" style={{ maxWidth: 480, maxHeight: "90vh", background: C.papel, color: C.tinta, borderTop: `3px solid ${C.oro}` }} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: C.tintaSuave }}>✦ AJUSTES DE IA</div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 19, marginTop: 4, marginBottom: 10 }}>El Consejo de Abigail</h2>
              <select value={iaConf.activo} onChange={(e) => { setIaConf({ ...iaConf, activo: e.target.value }); setIaPrueba(""); }} className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }}>
                {Object.entries(PROVEEDORES).map(([id, p]) => <option key={id} value={id}>{p.nombre}</option>)}
              </select>
              {iaConf.activo === "otro" && (
                <input value={iaConf.urlOtro || ""} onChange={(e) => setIaConf({ ...iaConf, urlOtro: e.target.value })} placeholder="URL del endpoint (…/v1/chat/completions)" className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 13 }} />
              )}
              {(PROVEEDORES[iaConf.activo] || PROVEEDORES.gemini).key && (
                <input type="password" value={(iaConf.claves || {})[iaConf.activo] || ""} onChange={(e) => setIaConf({ ...iaConf, claves: { ...(iaConf.claves || {}), [iaConf.activo]: e.target.value } })} placeholder="Clave API del proveedor" className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
              )}
              <input value={(iaConf.modelos || {})[iaConf.activo] || ""} onChange={(e) => setIaConf({ ...iaConf, modelos: { ...(iaConf.modelos || {}), [iaConf.activo]: e.target.value } })} placeholder={"Modelo (predeterminado: " + ((PROVEEDORES[iaConf.activo] || PROVEEDORES.gemini).modelo || "escribe el tuyo") + ")"} className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
              <label className="flex items-center gap-2 mb-2" style={{ fontSize: 12.5, color: C.tinta }}>
                <input type="checkbox" checked={iaConf.usarDiscernimiento !== false} onChange={(e) => setIaConf({ ...iaConf, usarDiscernimiento: e.target.checked })} />
                Usar mi discernimiento previo en análisis y preguntas
              </label>
              <div className="px-3 py-3 rounded-md mb-2" style={{ background: "#FFFDF6", border: `1px solid ${C.papelBorde}` }}>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.tintaSuave, marginBottom: 4 }}>CEREBRO DE ABIGAIL</div>
                <div style={{ fontSize: 11.5, color: C.tintaSuave, lineHeight: 1.5, marginBottom: 6 }}>
                  {cerebro.sintesis
                    ? <>Síntesis de {cerebro.elementos} elementos{materialCerebro().length > cerebro.elementos ? <> · <b style={{ color: "#7A5E10" }}>{materialCerebro().length - cerebro.elementos} nuevos sin sintetizar</b></> : <> · al día</>}</>
                    : <>Sin sintetizar aún — reúne cadenas, notas y convicciones, y actualízalo para que las IAs entren sabiéndolo todo.</>}
                </div>
                <button onClick={actualizarCerebro} className="w-full py-2 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 12, fontWeight: 700 }}>✦ Actualizar cerebro ahora</button>
                {cerebroMsg && <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 6, color: cerebroMsg.startsWith("✓") ? "#4C5E1E" : cerebroMsg.startsWith("✗") ? "#8A3030" : C.tintaSuave }}>{cerebroMsg}</div>}
              </div>
              <button onClick={probarIA} className="w-full py-2 rounded-full mb-2" style={{ border: `1px solid ${C.oro}`, color: "#7A5E10", fontSize: 12.5, fontWeight: 700 }}>Probar conexión</button>
              {iaPrueba && <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, color: iaPrueba.startsWith("✓") ? "#4C5E1E" : "#8A3030" }}>{iaPrueba}</div>}
              <div style={{ fontSize: 10.5, color: C.tintaSuave, lineHeight: 1.6, marginBottom: 10 }}>
                Claves gratuitas: Gemini en aistudio.google.com/apikey · Groq en console.groq.com/keys · DeepSeek (de pago, muy económico) en platform.deepseek.com. El comité: si guardas claves de varios, "Sugerir concordancias" los consulta a todos a la vez y marca las coincidencias; la pregunta libre usa el proveedor activo. Tu clave se guarda solo en este dispositivo y Abigail habla directo con tu proveedor — nunca pasa por un servidor nuestro.
              </div>
              <button onClick={() => setAjustesIAAbierto(false)} className="w-full py-2 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 13, fontWeight: 700 }}>Listo</button>
            </div>
          </div>
        )}

        {/* ===== MODAL AGREGAR PASAJE ===== */}
        {cargadorAbierto && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(20,12,36,0.82)" }} onClick={() => setCargadorAbierto(false)}>
            <div className="w-full rounded-t-2xl px-5 pt-5 pb-8 overflow-y-auto" style={{ maxWidth: 480, maxHeight: "90vh", background: C.papel, color: C.tinta, borderTop: `3px solid ${C.oro}` }} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: C.tintaSuave }}>＋ AGREGAR PASAJE</div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 19, marginTop: 4, marginBottom: 10 }}>Pega un capítulo de tu Biblia</h2>
              <select value={cargForm.libro} onChange={(e) => setCargForm({ ...cargForm, libro: e.target.value })} className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }}>
                <option value="">— Elige el libro —</option>
                {LIBROS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              <div className="flex gap-2 mb-2">
                <input value={cargForm.cap} onChange={(e) => setCargForm({ ...cargForm, cap: e.target.value.replace(/\D/g, "") })} placeholder="Capítulo" inputMode="numeric" className="w-full px-3 py-2 rounded-md" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
                <input value={cargForm.seccion} onChange={(e) => setCargForm({ ...cargForm, seccion: e.target.value })} placeholder="Sección (opcional)" className="w-full px-3 py-2 rounded-md" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 14 }} />
              </div>
              <textarea value={cargForm.texto} onChange={(e) => setCargForm({ ...cargForm, texto: e.target.value })} rows={7} placeholder={"Pega aquí el capítulo con sus números de versículo.\nEj.: 1 En el principio… 2 Y la tierra…"} className="w-full px-3 py-2 rounded-md mb-2" style={{ border: `1px solid ${C.papelBorde}`, background: "#FFF", fontSize: 13.5, fontFamily: "Georgia, serif" }} />
              {cargForm.texto.trim() !== "" && (
                <div className="px-3 py-2 rounded-md mb-2" style={{ background: "#FFFDF6", border: `1px solid ${C.papelBorde}`, maxHeight: 150, overflowY: "auto" }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.2em", color: C.tintaSuave, marginBottom: 4 }}>
                    VISTA PREVIA · {vistaPreviaCarga.length} versículos detectados
                  </div>
                  {vistaPreviaCarga.slice(0, 6).map((v) => (
                    <div key={v.n} style={{ fontFamily: "Georgia, serif", fontSize: 12.5, marginBottom: 3 }}>
                      <sup style={{ color: C.oro, fontWeight: 700 }}>{v.n}</sup> {v.t.slice(0, 80)}{v.t.length > 80 ? "…" : ""}
                    </div>
                  ))}
                  {vistaPreviaCarga.length > 6 && <div style={{ fontSize: 11, color: C.tintaSuave }}>… y {vistaPreviaCarga.length - 6} más</div>}
                  {vistaPreviaCarga.length === 0 && <div style={{ fontSize: 12, color: C.tintaSuave }}>No detecto versículos todavía — revisa que el texto traiga sus números.</div>}
                </div>
              )}
              <div style={{ fontSize: 10.5, color: C.tintaSuave, lineHeight: 1.5, marginBottom: 10 }}>
                El texto lo tomas de tu propia Biblia, para tu uso personal en este dispositivo. Queda guardado junto a tus cadenas y entra en el respaldo de Exportar.
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCargadorAbierto(false)} className="flex-1 py-2 rounded-full" style={{ border: `1px solid ${C.tinta}`, fontSize: 13 }}>Cancelar</button>
                <button onClick={guardarPasaje} className="flex-1 py-2 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 13, fontWeight: 700, opacity: cargForm.libro && cargForm.cap && vistaPreviaCarga.length > 0 ? 1 : 0.45 }}>
                  Guardar pasaje
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== MODAL ESTUDIO ===== */}
        {estudioAbierto && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(20,12,36,0.82)" }} onClick={() => setEstudioAbierto(null)}>
            <div className="w-full rounded-t-2xl px-6 pt-6 pb-8 overflow-y-auto" style={{ maxWidth: 480, maxHeight: "88vh", background: C.papel, color: C.tinta, borderTop: `3px solid ${C.oro}` }} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: C.tintaSuave }}>✦ ESTUDIO · {estudioAbierto.ancla}</div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, lineHeight: 1.3, marginTop: 6 }}>{estudioAbierto.titulo}</h2>
              <div className="mt-1 mb-4" style={{ width: 46, height: 2, background: C.oro }} />
              {estudioAbierto.asistidoIA && (
                <div style={{ fontSize: 10, color: "#7A5E10", fontWeight: 700, marginBottom: 10 }}>✦ Análisis asistido por IA — las respuestas de discernimiento son del lector</div>
              )}
              {estudioAbierto.parrafos.map((p, i) => (
                <p key={i} style={{ fontFamily: "Georgia, serif", fontSize: 15.5, lineHeight: 1.8, marginBottom: 14 }}>{p}</p>
              ))}
              {(estudioAbierto.discernimiento || []).map((d, i) => (
                <div key={"d" + i} className="px-3 py-2 rounded-md mb-3" style={{ background: "#FFFDF6", borderLeft: `3px solid ${C.oro}` }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700 }}>{d.pregunta}</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontStyle: d.respuesta ? "normal" : "italic", color: d.respuesta ? C.tinta : C.tintaSuave, marginTop: 3 }}>
                    {d.respuesta || "— sin respuesta aún —"}
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: C.tintaSuave, marginTop: 10 }}>VERSÍCULOS DE ESTA CADENA</div>
              <div className="flex flex-wrap gap-2 mt-2 mb-5">
                {estudioAbierto.versiculos.map((k) => (
                  <button key={k} onClick={() => irA(k)} className="px-3 py-1 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 12, fontFamily: "Georgia, serif" }}>{refDe(k)}</button>
                ))}
              </div>
              <button onClick={() => setEstudioAbierto(null)} className="w-full py-2 rounded-full" style={{ border: `1px solid ${C.tinta}`, fontSize: 13 }}>Volver a la lectura</button>
            </div>
          </div>
        )}

        {/* ===== BARRA INFERIOR ===== */}
        <nav className="fixed bottom-0 left-0 right-0 z-30">
          <div className="mx-auto flex" style={{ maxWidth: 480, background: C.nocheAlta, borderTop: `1px solid ${C.purpura}` }}>
            <TabInferior activo={vista === "leer"} onClick={() => { setVista("leer"); setSearchOpen(false); }} etiqueta="Leer" icono="📖" />
            <TabInferior activo={vista === "cadenas"} onClick={() => { setVista("cadenas"); setSel(null); setMargenAbierto(null); setSearchOpen(false); }} etiqueta={`Cadenas (${cadenas.length})`} icono="⛓" />
          </div>
        </nav>
      </div>
    </div>
  );
}

// -------------------- piezas pequeñas --------------------
function TarjetaCadena({ letra, titulo, frag, fragOtro, c, onIr, onEstudio }) {
  return (
    <div className="mb-3 px-4 py-3 rounded-lg" style={{ background: "#FFFDF6", border: `1px solid ${C.papelBorde}` }}>
      <div className="flex items-center justify-between gap-2">
        <div style={{ fontFamily: "Georgia, serif", fontSize: 14.5, fontWeight: 700 }}>
          <span style={{ color: C.oro }}>{letra}</span> {titulo}
        </div>
        <div className="flex items-center" style={{ gap: 4 }}>
          {c.sugeridaIA && <span style={{ fontSize: 8.5, fontWeight: 700, color: "#7A5E10", border: `1px solid ${C.oro}`, borderRadius: 999, padding: "2px 6px", whiteSpace: "nowrap" }}>✦ IA</span>}
          <Chip tipo={c.tipo} />
        </div>
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 13, color: "#4A4156", marginTop: 3 }}>
        {frag ? <>«{frag}»</> : <em>versículo completo</em>}
        {fragOtro && <> <span style={{ color: C.oro }}>⟶</span> «{fragOtro}»</>}
      </div>
      <div style={{ fontSize: 13, color: "#4A4156", marginTop: 5, lineHeight: 1.6 }}>{c.porque}</div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {onIr ? (
          <button onClick={onIr} className="px-3 py-1 rounded-full" style={{ background: C.noche, color: C.oroClaro, fontSize: 12 }}>Ir al pasaje →</button>
        ) : (
          <span className="px-3 py-1 rounded-full" style={{ background: C.papelBorde, color: C.tintaSuave, fontSize: 11 }}>pasaje no cargado en el demo</span>
        )}
        {onEstudio && (
          <button onClick={onEstudio} className="px-3 py-1 rounded-full" style={{ border: `1px solid ${C.oro}`, color: "#7A5E10", fontSize: 12 }}>Ver estudio ✦</button>
        )}
      </div>
    </div>
  );
}

function Seccion({ titulo, nota, children }) {
  return (
    <div className="px-3 py-2 rounded-md mb-2" style={{ background: "#FFFDF6", borderLeft: `3px solid ${C.oro}` }}>
      <div style={{ fontSize: 9.5, letterSpacing: "0.15em", color: C.tintaSuave, fontWeight: 700 }}>{titulo} · {nota}</div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 13.5, lineHeight: 1.65, marginTop: 3 }}>{children}</div>
    </div>
  );
}

function Chip({ tipo }) {
  const c = TIPOS[tipo] || TIPOS.Paralelo;
  return (
    <span className="px-2 py-1 rounded-full" style={{ background: c.bg, color: c.fg, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{tipo.toUpperCase()}</span>
  );
}

function BotonColor({ color, onClick }) {
  return <button onClick={onClick} aria-label="Color de resaltado" style={{ width: 24, height: 24, borderRadius: 999, background: color, border: `1px solid ${C.papelBorde}` }} />;
}

function BotonAccion({ activo, onClick, children }) {
  return (
    <button onClick={onClick} className="px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 700, background: activo ? C.noche : "transparent", color: activo ? C.oroClaro : C.tinta, border: `1px solid ${activo ? C.noche : C.papelBorde}` }}>{children}</button>
  );
}

function TabInferior({ activo, onClick, etiqueta, icono }) {
  return (
    <button onClick={onClick} className="flex-1 py-3 flex flex-col items-center gap-1" style={{ color: activo ? C.oroClaro : C.claroSuave }}>
      <span style={{ fontSize: 16 }}>{icono}</span>
      <span style={{ fontSize: 11, fontWeight: activo ? 700 : 400, letterSpacing: "0.05em" }}>{etiqueta}</span>
      <span style={{ width: 28, height: 2, background: activo ? C.oro : "transparent", borderRadius: 2 }} />
    </button>
  );
}
