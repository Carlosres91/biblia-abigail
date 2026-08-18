# Biblia Abigail RV1960

**Una Biblia de estudio donde el "porqué" de cada concordancia es el corazón.**

Esta es la versión de **laboratorio** (prototipo web React + Vite). Sirve como:
- Herramienta real de estudio (funciona en Termux, navegador y como PWA instalable)
- Especificación viva de diseño, UX y modelo de datos para la **app Android real** ("Biblia-AbigailRV 1960")

### Características principales (v17)
- Lectura inmersiva con estética púrpura noche, oro y papel pergamino
- Cadenas bidireccionales con **ancla precisa** (palabra/frase/versículo) + letras voladas
- Margen por toque largo, panel de versículo, resaltados, anotaciones
- **Cerebro de Abigail** — síntesis fiel de todo tu estudio
- Análisis crítico estratificado (texto dice · contexto · puntos abiertos neutrales · preguntas de discernimiento)
- Comité de IA multiproveedor (Gemini, Groq, DeepSeek, Ollama...) con claves solo en tu dispositivo
- Cargador de pasajes (pega capítulos de tu Biblia)
- Export/Import completo (`abigail-estudio.json`)
- PWA completa (instalable, offline, manifest bonito)

**Texto incluido**: pasajes reales de Reina-Valera 1960 (Juan 1, Romanos 8, Salmos 23, Mateo 5, Marcos 9, Malaquías 4) + sistema para agregar más.

### Reglas de la casa (no negociables)
- La IA **propone**; el lector **decide**. Nada entra sin aceptación explícita (marcado ✦ IA).
- Nunca confundir doctrina humana con "lo que el texto dice".
- Neutralidad en puntos donde las tradiciones difieren.
- Claves API solo en el dispositivo del usuario.
- Texto RVR1960 solo para uso personal o con licencia. La versión propia del autor (del texto original + RV1909) será la de fábrica.

### Cómo usar el laboratorio
```bash
cd abigail
npm install
npm run dev
```
Abre http://localhost:5173 (o la IP de tu Termux con `--host`).

Compilar para producción/PWA:
```bash
npm run build
```
La carpeta `dist/` contiene todo listo (incluye service worker).

### Estructura
- `src/App.jsx` → Todo el código (una sola pieza, ~1400 líneas)
- `vite.config.js` → React + VitePWA
- `public/` → iconos y assets
- `dist/` → build listo para GitHub Pages o hosting

### Próximos pasos (hoja de ruta)
1. Subir este laboratorio a GitHub (ya hecho en este paso).
2. Recuperar el código fuente de la app Android real y añadirlo al repo.
3. Avanzar el **Taller de Traducción** (versión propia libre del autor).
4. Cadenas temáticas (estilo Thompson), buscador avanzado del estudio, más pasajes.
5. Desplegar en GitHub Pages para que cualquiera pueda probarla.

Hecha con reverencia y amor por la Palabra.

— Carlos  
Agosto 2026
