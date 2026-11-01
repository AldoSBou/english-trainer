# English Trainer

Sitio HTML5 estático (sin build, sin dependencias) para reforzar cada unidad del curso de inglés.
Ábrelo con doble clic en `index.html` o sírvelo con cualquier servidor estático (`npx serve`, GitHub Pages, Netlify…).

El contenido se organiza en **ciclos** (Inglés 0-5) → **unidades** → **secciones**.

```
english-trainer/
├── index.html              # esqueleto + carga de scripts
├── css/style.css           # tokens de color (claro/oscuro), layout, componentes
├── js/engine.js            # renderizadores de actividades (flashcards, mcq, dictation…)
├── js/app.js               # navegación, pantalla Hoy (sesión diaria), portada de unidad, perfil, XP y progreso
└── courses/
    ├── registry.js         # ciclos y sus unidades (available: true/false)
    └── ingles4/
        └── unit1.js        # datos de Inglés 4 · Unit 1
```

Rutas: `#/` (Hoy) · `#/curso` (ciclos) → `#/ingles4` (unidades) → `#/ingles4/unit1` → `#/ingles4/unit1/grammar` · `#/perfil`.

## Hoy: la sesión diaria

La portada es **Hoy**: una sesión de unos 13 minutos en cinco pasos cortos, armada sola con la unidad en foco (la última que visitaste del ciclo actual): repaso espaciado de las palabras que tocan, seis preguntas de gramática mezclando la unidad actual con otras anteriores, tres frases al dictado, un reto de speaking con modelo y seis palabras nuevas que entran al repaso. Completar los cinco pasos cuenta como sesión del día: alimenta la racha, el calendario de práctica y el objetivo semanal que eliges en **Perfil**. Las unidades siguen siendo la biblioteca para estudiar al ritmo de la clase; lo que practicas en ellas también suma al progreso y al calendario.

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
| `roleplay` | `scenes:[{t, you, partner, role, goal, start, nodes}]` | Conversación con ramas: la otra persona habla, eliges tu réplica entre tres, la dices en voz alta y la historia sigue por la rama elegida (finales `win` / `meh` / `fail`). |

Para un tipo nuevo: `Engine.register('miTipo', (root, act, ctx) => { ... })`.
`ctx` ofrece `score(good, pts)`, `say(text, rate)`, `sayLines([[voz, texto]])`, `toast(msg)`.

## Speaking Coach (`js/coach.js`)

Ruta `#/coach`. Cinco pestañas: **Conversar** (chat por voz con correcciones por turno), **Role-play libre** (improvisa una situación real con la IA haciendo de la otra persona, con humor amable, normal o difícil: cada réplica tuya recibe un veredicto, la versión que diría un nativo para escucharla y decirla, correcciones y una pista si te atascas; la escena termina en objetivo conseguido, a medias o torcido, y desde ahí pides el informe completo), **Evaluar** (test de 60-120 s → nivel CEFR estimado, puntuaciones, correcciones, versión mejorada, próximos pasos), **Progreso y errores** (historial + cuaderno de errores practicable) y **Ajustes IA**.

Proveedores de IA, por orden: (1) `claude` — la página abierta dentro de claude.ai usa la capacidad `sample`; (2) `key` — API key de Anthropic guardada en `localStorage` (`et-anthropic-key`, `et-anthropic-model`) y enviada directamente a `api.anthropic.com`; (3) `local` — sin IA: métricas (ppm, muletillas, variedad léxica), estimación orientativa y detector de errores típicos de hispanohablantes (`RULES`). Historial en `et-coach`.

## Dominio y cuaderno de errores (`js/mastery.js`)

Cada actividad acumula intentos, aciertos y racha, y de ahí sale su nivel: nuevo, visto, en práctica o dominado (tres aciertos seguidos con buena precisión). El vocabulario toma el nivel de su caja en el repaso espaciado. Lo ves en la portada de cada unidad (barra de vocabulario y chips por punto de gramática) y en Perfil › Por destreza. Cada fallo concreto (una pregunta, una frase del dictado, una corrección, una palabra que no supiste escribir) entra al **cuaderno de errores** (`#/method/errors`), donde puedes volver a practicarlos con el mismo tipo de ejercicio; acertarlos los borra. Cuando hay tres o más, la sesión de Hoy añade el paso "Caza tus errores".

Además, cada unidad recibe automáticamente cuatro ejercicios de producción generados de su propio contenido: **Escríbela** (lee el significado y escribe la palabra), **Completa lo que oyes** (cloze con audio), **Ordena la frase** (constructor de frases) y **Dilo** (escucha una frase del modelo, dila y compara con tu voz). La portada de cada unidad de Inglés 4 incluye un checklist **Puedo…** con lo que deberías saber hacer al terminarla.

## Lectura cronometrada

En Reading de cada unidad (pestaña **Lectura cronometrada**) y en Práctica › Lectura (`#/method/reading`, con los textos de todas las unidades). El texto se destapa al pulsar "Empezar a leer"; al terminar ves tus palabras por minuto con una banda orientativa y respondes las preguntas de comprensión del texto sin mirarlo. Lo que cuenta es el producto: ppm × comprensión. Cada texto guarda tu historial (`et-reading`) y te anima a releerlo dos o tres veces seguidas, que es la técnica con más evidencia para ganar fluidez lectora.

## Examen simulado

En Práctica › **Examen** (`#/method/exam`). Veinte preguntas de un ciclo o de todo lo que tienes cargado: gramática y uso, vocabulario (incluidas preguntas armadas a partir de las flashcards) y tres frases de dictado. Quince minutos, sin pistas ni correcciones hasta el final y sin volver atrás. El informe trae nota, nivel orientativo, desglose por área y por unidad (las más flojas primero) y la lista de fallos con la respuesta correcta; esos fallos pasan al cuaderno de errores. El historial guarda cada intento con su mejor nota y la media reciente.

## Mis temas: unidades generadas con IA

En Curso › **Mis temas** (`#/mistemas`). Escribes un tema o una situación concreta ("una retro difícil con mi equipo", "cita con el dentista", "presentar mi tesis en cinco minutos"), eliges nivel (B1, B2 o C1) y la IA del Coach genera en uno a tres minutos una unidad completa con la misma estructura que las del curso: vocabulario con audio y emparejar, la gramática que la situación exige con práctica y corrección de errores, dictado y diálogo con preguntas, retos de speaking con modelo, una lectura original con comprensión, una tarea de escritura con checklist y, en Social English, frases clave, un diálogo para ordenar y un role-play con ramas. La unidad se guarda en tu navegador y entra sola al repaso espaciado, al quiz mezclado, al examen simulado, a Práctica › Role-play y al Coach. Necesita IA conectada (Claude dentro de claude.ai o tu API key en Ajustes IA). Puedes eliminar cualquier tema desde la misma portada.

## Role-play con ramas

En Social English de cada unidad de Inglés 3 y 4 (pestaña **Role-play**, 18 escenas) y en Práctica › Role-play (`#/method/roleplay`, con las escenas de todas las unidades). Una situación real con el lenguaje funcional de la unidad: la otra persona habla con la voz alternativa; eliges tu réplica entre tres (la más natural, una correcta pero mejorable y un error típico), ves el porqué, dices la frase buena en voz alta con reconocimiento de voz y la conversación sigue por la rama de lo que elegiste. Hay finales buenos, regulares y malos: repetir la escena por otra rama es parte del ejercicio. Los fallos entran al cuaderno de errores. Al terminar, **Improvisarla con la IA** abre la misma situación en el role-play libre del Coach (`#/coach/roleplay`), donde ya no hay opciones: dices lo que tú dirías y la IA reacciona, corrige y decide cómo acaba. Ahí también hay ocho situaciones propias (banco por teléfono, videollamada con mala conexión, small talk, pedir un aumento, explicar un problema técnico, negociar una fecha, devolver un coche de alquiler, defender la tesis) y puedes describir la tuya.

## Inglés práctico (`courses/practico/`)

Un ciclo aparte, fuera de la numeración del instituto, con situaciones reales: aeropuerto y vuelo, hotel y transporte, restaurante y comida (también desde el lado de quien atiende), reuniones y stand-ups de un equipo de software, entrevistas y networking, inglés escrito de trabajo (correos, Slack, revisiones de PR, incidentes), compras, farmacia y salud, teléfono y videollamadas, small talk y socializar, y banco y trámites. Cada situación es una unidad completa: frasebook con audio, la gramática mínima que la situación exige, errores típicos de hispanohablante, dictado y diálogo, retos de speaking, una lectura realista, una escritura útil y tres role-plays con ramas. Todo entra al repaso SRS, al quiz mezclado y a Práctica › Role-play.

## Pronunciación (`js/pron.js`)

Ruta `#/method/pron`. Laboratorio pensado para hispanohablantes: **pares mínimos** (sheep/ship, berry/very, jet/yet, ship/chip, cat/cut, they/day, bad/bat, eyes/ice, hear/ear, pool/pull: oyes una palabra, eliges cuál fue y luego la dices), **terminación -ed** (/t/, /d/ o /ɪd/), **sílaba tónica** (toca la sílaba fuerte) y **enlaces y contracciones** (habla conectada con Dilo).

## Práctica (`js/method.js`)

Ruta `#/method`. Técnicas con evidencia y su ejercicio: repaso espaciado Leitner sobre todas las flashcards (`et-srs`), shadowing con las frases de los dictados, quiz mezclado (retrieval + interleaving) con todos los `mcq`, 4-3-2 de fluidez, dictogloss y leer-y-recontar con los párrafos de las lecturas, más principios y plan semanal. Todo se alimenta solo del contenido de las unidades cargadas.

## Traductor (`js/translate.js`)

Ruta `#/translate`. Detecta el idioma (o se fija ES→EN / EN→ES), traduce y lee el resultado con la voz de la app (inglés) o una voz en español. Fuentes por orden: glosario de las unidades cargadas (al instante), IA del Coach (traducción + alternativas + nota + ejemplo), MyMemory (gratuito, sin clave; no disponible dentro de claude.ai). Botones: escuchar, lenta, frase a frase, shadowing, copiar y **Guardar en mi repaso** (`et-custom-cards`, que el Repaso inteligente incorpora como "Mis palabras"). Historial en `et-tr-hist`.

## Voz

El botón 🔊 de la barra superior abre el selector de voz. La app puntúa las voces en inglés del dispositivo y usa por defecto la más natural (neuronales "Online (Natural)" de Edge, Google US English en Chrome/Android, voces mejoradas de Apple); la elección y la velocidad se guardan en `localStorage` (`et-voice`, `et-rate`). El texto se lee por frases y los diálogos alternan dos voces.

Para mejor calidad: Windows → Microsoft Edge; Android → voces de Google instaladas; iPhone/Mac → descargar una voz mejorada en Ajustes › Accesibilidad › Contenido hablado › Voces.

## Desarrollo y pruebas

No hay build. Para validar contenido y recorrer el sitio automáticamente:

```bash
npm run validate      # estructura de todas las unidades (node puro)
npm i -D playwright && npx playwright install chromium   # una vez
npm test              # abre todas las rutas en Chromium headless; falla si hay errores de página
```

`CLAUDE.md` resume lo necesario para trabajar en el repo con Claude Code; `CONTEXT.md` tiene el detalle completo.

## Progreso

Se guarda en `localStorage`: `et-progress` (XP total, aciertos/errores por unidad y por sección), `et-days` (actividad de cada día: aciertos, minutos activos, sesión completa), `et-today` (pasos de la sesión de hoy), `et-last` (último sitio visitado), `et-prefs` (objetivo semanal), `et-cando` (checklist "Puedo…"), `et-mastery` (dominio por actividad) y `et-errors` (cuaderno de errores). En **Perfil › Voz y datos** puedes borrarlo todo.

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
