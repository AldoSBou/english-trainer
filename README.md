# English Trainer

Sitio HTML5 estático (sin build, sin dependencias) para reforzar cada unidad del curso de inglés.
Ábrelo con doble clic en `index.html` o sírvelo con cualquier servidor estático (`npx serve`, GitHub Pages, Netlify…).

El contenido se organiza en **ciclos** (Inglés 0-5) → **unidades** → **secciones**.

```
english-trainer/
├── index.html              # esqueleto + carga de scripts
├── css/style.css           # tokens de color (claro/oscuro), layout, componentes
├── js/engine.js            # renderizadores de actividades (flashcards, mcq, dictation…)
├── js/app.js               # menú, rutas #/ciclo/unidad/sección, XP y progreso
└── courses/
    ├── registry.js         # ciclos y sus unidades (available: true/false)
    └── ingles4/
        └── unit1.js        # datos de Inglés 4 · Unit 1
```

Rutas: `#/` (ciclos) → `#/ingles4` (unidades) → `#/ingles4/unit1` → `#/ingles4/unit1/grammar`.

## Añadir una unidad nueva

1. Crea `courses/<ciclo>/<unidad>.js` (copia uno existente) con
   `window.UNIT_DATA['ingles4/unit2'] = { ... }` — la clave es `"cicloId/unidadId"`.
2. Sustituye los datos (vocabulario, frases, preguntas). Mantén la estructura `sections[] → activities[]`.
3. En `courses/registry.js` pon `available: true` en esa unidad (y en el ciclo si es el primero) y ajusta `title` / `subtitle`.
4. En `index.html` añade `<script src="courses/<ciclo>/<unidad>.js"></script>`.

## Añadir un ciclo nuevo

En `courses/registry.js` marca el ciclo como `available: true` y rellena su array `units`.
Crea la carpeta `courses/<cicloId>/` con sus unidades. Nada más: menú, portadas y progreso se generan solos.

## Tipos de actividad (`engine.js`)

| type | Datos | Qué hace |
|------|-------|----------|
| `notes` | `html` | Explicación libre (tablas, listas). |
| `flashcards` | `cards:[{cat,w,def,ex,ask,say?}]` | Tarjetas giratorias con audio. |
| `match` | `pairs:[[a,b]], round` | Emparejar dos columnas. |
| `mcq` | `items:[{q,opts,a,why,blank?}]` o `build(util)`, `pool` | Opción múltiple; `pool` elige N al azar por ronda; `build` genera ítems dinámicos. |
| `dictation` | `sentences:[]` | Dictado con voz sintética y comparación palabra a palabra. |
| `dialog` | `lines:[[speaker,text]], questions` | Diálogo con varias voces + preguntas. |
| `speaking` | `challenges:[{t,task,model,tags}]` | Cronómetro 60 s, micrófono (Chrome), palabras objetivo. |
| `stress` | `pairs:[[label, sayText]]` | Botones de pronunciación. |
| `reading` | `paragraphs, main, infer, think` | Artículo + ideas principales + inferencia + reflexión. |
| `fix` | `items:[{bad,good,why}]` | Corrección de frases con diff. |
| `soft` | `items:[{h,a}], pattern, missing` | Reescritura que debe cumplir un patrón (regex). |
| `comment` | `checks:[{label, re | words}], min, max, need` | Texto libre con checklist automática. |
| `order` | `dialogs:[[líneas]]` | Ordenar líneas de un diálogo. |

Para un tipo nuevo: `Engine.register('miTipo', (root, act, ctx) => { ... })`.
`ctx` ofrece `score(good, pts)`, `say(text, rate)`, `sayLines([[voz, texto]])`, `toast(msg)`.

## Speaking Coach (`js/coach.js`)

Ruta `#/coach`. Cuatro pestañas: **Conversar** (chat por voz con correcciones por turno), **Evaluar** (test de 60-120 s → nivel CEFR estimado, puntuaciones, correcciones, versión mejorada, próximos pasos), **Progreso y errores** (historial + cuaderno de errores practicable) y **Ajustes IA**.

Proveedores de IA, por orden: (1) `claude` — la página abierta dentro de claude.ai usa la capacidad `sample`; (2) `key` — API key de Anthropic guardada en `localStorage` (`et-anthropic-key`, `et-anthropic-model`) y enviada directamente a `api.anthropic.com`; (3) `local` — sin IA: métricas (ppm, muletillas, variedad léxica), estimación orientativa y detector de errores típicos de hispanohablantes (`RULES`). Historial en `et-coach`.

## Método (`js/method.js`)

Ruta `#/method`. Técnicas con evidencia y su ejercicio: repaso espaciado Leitner sobre todas las flashcards (`et-srs`), shadowing con las frases de los dictados, quiz mezclado (retrieval + interleaving) con todos los `mcq`, 4-3-2 de fluidez, dictogloss y leer-y-recontar con los párrafos de las lecturas, más principios y plan semanal. Todo se alimenta solo del contenido de las unidades cargadas.

## Traductor (`js/translate.js`)

Ruta `#/translate`. Detecta el idioma (o se fija ES→EN / EN→ES), traduce y lee el resultado con la voz de la app (inglés) o una voz en español. Fuentes por orden: glosario de las unidades cargadas (al instante), IA del Coach (traducción + alternativas + nota + ejemplo), MyMemory (gratuito, sin clave; no disponible dentro de claude.ai). Botones: escuchar, lenta, frase a frase, shadowing, copiar y **Guardar en mi repaso** (`et-custom-cards`, que el Repaso inteligente incorpora como "Mis palabras"). Historial en `et-tr-hist`.

## Voz

El botón 🔊 de la barra superior abre el selector de voz. La app puntúa las voces en inglés del dispositivo y usa por defecto la más natural (neuronales "Online (Natural)" de Edge, Google US English en Chrome/Android, voces mejoradas de Apple); la elección y la velocidad se guardan en `localStorage` (`et-voice`, `et-rate`). El texto se lee por frases y los diálogos alternan dos voces.

Para mejor calidad: Windows → Microsoft Edge; Android → voces de Google instaladas; iPhone/Mac → descargar una voz mejorada en Ajustes › Accesibilidad › Contenido hablado › Voces.

## Progreso

Se guarda en `localStorage` (`et-progress`): XP total, aciertos/errores y XP por unidad (clave `"ciclo/unidad"`). Borrar los datos del sitio en el navegador lo reinicia.

## Usarlo en el celular (app instalable)

El sitio es una **PWA**: se instala como app, con icono propio, y funciona **sin conexión** gracias a `sw.js`.
Para instalarla necesita estar publicada en HTTPS (abrir `index.html` como archivo no permite instalarla).

**GitHub Pages (gratis):**
1. Sube la carpeta a un repositorio de GitHub (`git push`).
2. En el repo: *Settings → Pages → Source: Deploy from a branch → main / (root)*.
3. En un par de minutos tendrás `https://<usuario>.github.io/<repo>/`.
4. Ábrelo en el móvil: **Android/Chrome** → menú ⋮ → *Instalar app*. **iPhone/Safari** → Compartir → *Agregar a pantalla de inicio*.

Ábrela una vez con internet: a partir de ahí todas las unidades quedan guardadas y funcionan sin conexión.
Cuando subas cambios, la app los descarga en segundo plano y los muestra la siguiente vez que la abras.

Archivos de la PWA: `manifest.webmanifest`, `sw.js`, `icons/`. Al añadir unidades **no** hace falta tocar `sw.js`.

En pantallas de menos de 640 px las secciones pasan a una barra inferior con iconos y la cabecera se compacta.
