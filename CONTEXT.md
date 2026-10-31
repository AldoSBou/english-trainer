# CONTEXT.md — Contexto de continuación para cualquier modelo/IA

> Pega este archivo (o adjunta el zip del proyecto) al inicio de una conversación nueva junto con el .docx de la siguiente unidad. Contiene todo lo necesario para seguir ampliando la web sin perder el hilo.

## 1. Quién y para qué

- Usuario: **Aldo**, desarrollador senior Java/Spring Boot (Lima, Perú). Hispanohablante. Sigue un curso de inglés con material **Evolve** (Cambridge), nivel intermedio.
- Por cada unidad del curso comparte un **.docx con capturas de pantalla** de la plataforma (vocabulario, notas de gramática, ejercicios resueltos, diálogos, lecturas, tareas de writing/speaking). Las imágenes hay que **extraerlas del .docx y leerlas** (`unzip` → `word/media/*.png`) porque casi no hay texto plano.
- Objetivo: una **web HTML5 de refuerzo** ("English Trainer") con un **menú de unidades que se va complementando** a medida que avanza el curso. Tono: profesor innovador, contenido interactivo que no aburra, cubriendo gramática, vocabulario, speaking, reading, listening y writing.
- Instrucciones en **español**, contenido de práctica en **inglés**. Explicaciones breves en español. Cada acierto suma XP.

## 2. Estado actual del proyecto

Sitio estático sin build ni dependencias externas (solo Google Fonts: Outfit + Nunito). Es una PWA pensada también para el celular: en < 640 px las secciones van en una barra inferior con iconos (`.section-tabs`), la cabecera de unidad se compacta (`.unit-head.compact`) y las sub-actividades se deslizan en una fila.

Jerarquía: **ciclo (Inglés 0-5) → unidad → sección**. El curso presencial de Aldo se organiza en ciclos numerados; el material entregado hasta ahora pertenece a **Inglés 4**.

```
english-trainer/
├── index.html                  esqueleto; carga registry.js, <unidades>, engine.js, app.js
├── css/style.css               tokens claro/oscuro, layout (sidebar acordeón + contenido)
├── js/engine.js                renderizadores de actividades por `type` (ver §3)
├── js/coach.js                 Speaking Coach (#/coach): chat por voz + evaluación CEFR + cuaderno de errores + panel 'Modelo y frases de apoyo' por tema (modelo de las unidades o generado por IA, frase a frase, shadowing, STARTERS). IA: sample (claude.ai) → API key propia → local (métricas + RULES de errores típicos). Expone window.Speech.listen
├── js/translate.js             Traductor con voz (#/translate): detect(), glosario de UNIT_DATA, IA del Coach → MyMemory; guarda 'et-custom-cards' que method.js suma al mazo SRS
├── js/method.js                Método (#/method): Leitner SRS, shadowing, quiz mezclado, 4-3-2, dictogloss, read&retell, plan. Se alimenta solo de UNIT_DATA
├── js/app.js                   menú, rutas hash, XP/progreso (localStorage 'et-progress'), voz: ranking de voces (voiceScore), selector #voicePanel, lectura por frases, prefs 'et-voice'/'et-rate'
├── courses/registry.js         window.COURSES = [{id,number,title,subtitle,available,current,units:[{id,number,title,subtitle,available,xpGoal}]}]
├── courses/ingles3/unit1..10.js  window.UNIT_DATA['ingles3/unitN'] = {...}
├── courses/ingles4/unit1.js    window.UNIT_DATA['ingles4/unit1'] = {source, description, map, weak, weakLink, sections}
├── manifest.webmanifest, sw.js, icons/   PWA: instalable en el móvil y offline (stale-while-revalidate; no hay que listar unidades)
├── tools/                      validate-unit.js (una unidad), validate-all.js (todas), test-all.js (recorrido de rutas con Playwright)
├── package.json                solo scripts: npm run validate · npm test (devDependency playwright)
├── CLAUDE.md                   guía corta para Claude Code (comandos, contrato, procedimiento, convenciones)
├── README.md                   cómo añadir ciclos/unidades, tabla de tipos y cómo instalar en el móvil
└── CONTEXT.md                  este archivo
```

Rutas: `#/` (ciclos + herramientas) · `#/coach/<tab>` · `#/method/<tab>` · `#/translate` · `#/ingles4` (unidades del ciclo) · `#/ingles4/unit1` (portada) · `#/ingles4/unit1/grammar` (sección).
Progreso por unidad en `S.units["ingles4/unit1"]`.

- **Ciclos**: `ingles0`…`ingles5`. Activos: **Inglés 3** (WeTalk Level 3, 10 unidades completas) e **Inglés 4** (`current:true`, Units 1-8 de Evolve). `ingles0/1/2/5` son "Próximamente" hasta que Aldo comparta su material.
- **Inglés 3 completo**: U1 Getting to know people · U2 So much stuff · U3 Getting around · U4 How surprising! · U5 And then… · U6 Impact · U7 Entertain us · U8 Getting there · U9 Study and work · U10 Materials & production.
- **Inglés 4 (Units 1-8)** (Evolve): U1 Accomplishments & qualities · U2 Trends & food · U3 What's it worth? · U4 Famous faces · U5 Stories & broken plans · U6 Good works · U7 Spread the word · U8 Work & wishes. (U7 y U8 construidas desde los PDF de resumen oficial, sin `weak`.)
- Repo GitHub: `AldoSBou/english-trainer` (público, Pages activo en https://aldosbou.github.io/english-trainer/). La carpeta del PC es el clon; tras cambios: commit en la carpeta y `git push` (Aldo) o pedir acceso al repo.
- El material de Inglés 4 puede llegar también como PDFs de resumen oficial (Vocabulary / Grammar / Functional language summary): son texto plano (`pdftotext -layout`), sin ejercicios del alumno → sin `weak`; la unidad se construye entera a partir de los resúmenes.
- El material de Aldo llega en dos formatos: WeTalk (carpeta con un .docx por unidad) y Evolve. Ambos son capturas de la misma plataforma.
- Publicado como artifact de Claude: `https://claude.ai/artifact/MAzypoLR1kqSt6JuWjxPoZ` — si se republica desde Claude, **actualizar esa URL** (pasar `url`), no crear otro artifact. Se publica `index.html` con `capabilities: {sample: {}}` (para el Coach) y `files` = css/style.css, js/engine.js, js/coach.js, js/method.js, js/translate.js, js/app.js, courses/registry.js, cada courses/<ciclo>/<unidad>.js, manifest.webmanifest, sw.js e icons/*.png.
- Se entrega también un `english-trainer.zip` con todo el proyecto.

## 3. Contrato de datos de una unidad (lo único que cambia entre unidades)

```js
window.UNIT_DATA['<cicloId>/unitN'] = {
  source: 'Evolve · Unit N · <tema>',
  description: '<una línea en español>',
  map:  [[ 'Área', 'Contenido del curso', 'Aquí practicas' ], ...],   // tabla de la portada
  weak: [ '<html: error propio detectado>', ... ],                      // opcional
  weakLink: 'Trabájalos en <b>Writing › …</b>',                         // opcional
  sections: [
    { id:'home',    label:'Inicio',   render:'overview', activities:[] },  // siempre primero
    { id:'vocab',   label:'Vocabulary',     activities:[ {label, type, ...} ] },
    { id:'grammar', label:'Grammar',        activities:[...] },
    { id:'listen',  label:'Listening',      activities:[...] },
    { id:'speak',   label:'Speaking',       activities:[...] },
    { id:'read',    label:'Reading',        activities:[...] },
    { id:'write',   label:'Writing',        activities:[...] },
    { id:'social',  label:'Social English', activities:[...] },
  ]
};
```

Tipos de actividad ya implementados en `engine.js` (campos comunes opcionales: `label`, `eyebrow`, `title`, `intro`):

| type | campos | uso |
|---|---|---|
| `notes` | `html` | notas de gramática, tablas, listas de frases |
| `flashcards` | `cards:[{cat,w,def,ex,ask,say?}]` | tarjetas con audio (speechSynthesis) |
| `match` | `pairs:[[a,b]], round` | emparejar (adj↔noun, verbo↔objeto…) |
| `mcq` | `items:[{q,opts,a,why,blank?}]` **o** `build({shuffle,pick,esc,blank})`, `pool` | opción múltiple; `blank:1` convierte `___` en hueco; `pool:n` toma n al azar por ronda |
| `dictation` | `sentences:[]` | dictado con voz y diff palabra a palabra |
| `dialog` | `lines:[[speaker,text]], questions:[mcq items]` | diálogo multivoz + comprensión |
| `speaking` | `challenges:[{t,task,model,tags}]` | cronómetro 60 s, micrófono (webkitSpeechRecognition), palabras objetivo |
| `stress` | `pairs:[[etiqueta, textoAPronunciar]]` | sílaba tónica |
| `reading` | `paragraphs:[html], main:[mcq], infer:[mcq], think:'html'` | lectura + ideas principales + inferir + reflexión |
| `fix` | `items:[{bad,good,why}]` | corrección de frases (idealmente las del propio alumno) |
| `soft` | `items:[{h,a}], pattern:/regex/, explain, missing` | reescritura que debe cumplir un patrón |
| `comment` | `checks:[{label, re \| words}], min, max, need, placeholder` | texto libre con checklist automática |
| `order` | `dialogs:[[líneas "Nombre: texto"]]` | ordenar diálogo |

Nuevo tipo: `Engine.register('tipo', (root, act, ctx) => {...})` con `ctx.score(good,pts)`, `ctx.say(text,rate)`, `ctx.sayLines([[voz,texto]])`, `ctx.toast(msg)`.

## 4. Procedimiento para añadir la Unidad N (checklist)

1. Extraer y **leer todas las imágenes** del .docx en orden (`unzip -o UnitN.docx -d x`; el orden está en `word/document.xml` por `r:embed`). Anotar: listas de vocabulario, notas de gramática con ejemplos, functional language, lectura, tareas de writing y speaking, y **los errores que cometió el alumno** en ejercicios (respuestas marcadas ✘ o frases suyas escritas).
2. Crear `courses/<cicloId>/unitN.js` copiando la estructura de `courses/ingles4/unit1.js` y cambiando la clave a `window.UNIT_DATA['<cicloId>/unitN']`. Si es un ciclo nuevo (Inglés 0/1/2/3/5), crear su carpeta y marcar el ciclo `available:true` en `courses/registry.js` con su array `units`. Reglas de contenido:
   - Vocabulario: flashcards con definición en español + ejemplo en inglés + pregunta personal; match; mcq contextual (situación → palabra).
   - Gramática: `notes` con tabla (tiempo/uso/ejemplo del curso/pista), luego 2-3 `mcq` (identificar, elegir forma, trampa típica) con frases **nuevas**, no las del curso.
   - Listening: `dictation` con 10-12 frases de la unidad + `dialog` con 3-4 preguntas.
   - Speaking: 4-5 `challenges` alineados con las tareas de speaking del curso + `stress`.
   - Reading: texto **original** (150-250 palabras) sobre el mismo tema del curso, con palabras en `<b>` para inferir + main ideas + infer.
   - Writing: `fix` con las frases reales del alumno; `soft` u otro patrón funcional de la unidad; `comment` con checklist.
   - Social English: `notes` con las frases por situación + `order` + `mcq` de respuesta rápida.
   - Incluir en `weak` los errores detectados, y meter ejercicios que los ataquen.
   - Repaso espaciado: en cada unidad nueva, incluir en algún `mcq`/`dictation` 3-4 ítems de unidades anteriores.
3. `courses/registry.js`: poner `available:true`, `title`, `subtitle`, `xpGoal` en esa unidad.
4. `index.html`: añadir `<script src="courses/<cicloId>/unitN.js"></script>` tras la anterior.
5. `node tools/validate-unit.js courses/<cicloId>/unitN.js` y `npm test` (recorre todas las rutas en Chromium headless; debe acabar con `errors: 0`); subir `CACHE` en `sw.js`; actualizar §2 y §5 de este archivo; commit + push (o republicar el artifact con la URL existente si se trabaja desde Claude).

## 5. Contenido cubierto hasta ahora (para el repaso espaciado)

**Inglés 3 (WeTalk Level 3)** — U1 preguntas de información (which/whose/how) e indirectas; personalidad y datos personales. U2 present perfect (ever/never/for/since/already/yet); posesiones y tecnología. U3 artículos y modales de consejo (should/could/would); viajes y direcciones. U4 adjetivos -ed/-ing y futuros (will / going to / present continuous); voluntariado. U5 past simple vs past continuous con when/while; perder y encontrar cosas. U6 cuantificadores count/non-count, condicionales reales, adverbios de modo; problemas urbanos. U7 used to y (not) as… as; música, cine y TV; rechazar invitaciones. U8 present perfect continuous; progreso y logros. U9 modales de necesidad/permiso/prohibición; estudios y trabajo. U10 pasiva de presente y pasado; materiales y producción.


**Inglés 4 · Unit 1** — Vocabulario: *break a record, face your fear, get a lot of likes, have a sense of humor, rise to a challenge, run a business, run a marathon, set a goal for yourself, take pride in something, tell a joke, win a medal, work with your hands*; pares *ambitious/ambition, confident/confidence, creative/creativity, curious/curiosity, enthusiastic/enthusiasm, experienced/experience, independent/independence, polite/politeness, qualified/qualification(s), responsible/responsibility, successful/success, truthful/truthfulness*. Gramática: simple present/past, present perfect, present/past continuous, present perfect continuous; stative verbs (*think, want, need, know*). Functional: *I don't think we've met before / You're new here, right? / Is this your first day? / Do you know anyone here? / Let me introduce you to… / Have you met…? / Do you two know each other? / We go way back*; *meet* vs *know*. Writing: comentario a un artículo, suavizar con *a bit / a little*. Reading: lenguaje corporal en entrevistas (*stressful, count, still, tap*).

**Inglés 4 · U2 (Trends & food)** — condicionales reales (if + presente → will/going to/might/imperativo), time clauses (after/until/when/as soon as/once, presente en la subordinada); tendencias (*be all the rage, go out of style, be a thing of the past, gain/lose popularity…*), alimentos y verbos de cocina (*chop, fry, stir, rinse, boil, barbecue*); ofrecer comida. Error propio: invirtió la regla de las time clauses.

**Inglés 4 · U3 (What's it worth?)** — too / (not) enough; modificar comparaciones (*a bit / way / a whole lot*, *nearly / nowhere near as… as*, *by far*); valor y dinero (*be worth it, can't afford, cost of living, standard of living, take advantage of, rely on…*); disculparse y explicar (*I can't tell you how sorry I am*); reseña de producto. Errores propios: *quality of life* por *standard of living*; *made an effect* → *has an effect*; *how I am sorry* → *how sorry I am*.

**Inglés 4 · U4 (Famous faces)** — modales de especulación (must / might / may / could / can't / must not; nunca *can*); relative clauses de sujeto y objeto (who/which/that/where, omisión del pronombre); publicidad (*ad, advertise, brand, commercial, logo, merchandise, slogan, sponsor, status symbol, fashion statement*), gente de los medios (*celebrity, comedian, designer, DJ, entertainer, filmmaker, hero, icon, model, movie producer, performer, audience*); intercambiar y discutir opiniones con énfasis (*As I see it… / That's a good point, but… / I couldn't disagree more*).

**Inglés 4 · U5 (Stories & broken plans)** — past perfect (forma, marcadores *already/never/by the time/before*, contraste con past simple y present perfect); *was/were going to* y *was/were supposed to* (plan fallido + *but*, no omitir *be*); tipos de historia (*coming-of-age, family saga, feel-good, hard-luck, horror, human interest, love story, mystery, personal tragedy, success story, tall tale, tearjerker*); phrasal verbs de planes (*be held up, cheer up, end up, get together, give up on, go ahead, look forward to, hang out with, let down, make up, mess up, split up*); reaccionar a problemas y malas noticias (*There must be some kind of mistake / I'd like to speak to the manager / Well, it is what it is*), *party of six*.

**Inglés 4 · U6 (Good works)** — pasiva de presente y pasado (preguntas, negativas, *by*), pasiva con modales (*might/can/will/must be + participio*); voluntariado (*bring together, connect with, donate, get involved with, help out, join, pass on, take care of, take part in, volunteer*), gratitud y familias de palabras (*appreciate/appreciation/appreciative, grateful/gratitude, kind/kindness, thoughtful, rewarding, lend a helping hand, act of kindness*); ofrecer, aceptar y rechazar ayuda, *I insist*, *cut the line*.

**Inglés 4 · U7 (Spread the word)** — reported statements (say/explain/mention/comment sin objeto; tell/inform con objeto; backshift presente→pasado, pasado→past perfect; sin cambio para hechos, hábitos y futuro; órdenes y sugerencias con *told/persuaded + objeto + to-infinitive*); reported questions (orden de afirmación, sin do/does/did, *if* para sí/no); comunicación (*catch up with, comment, congratulate on, contact, criticize, explain, gossip, inform of, keep in touch with, mention, persuade, reply to, report, respond to*); comunicación online (*clickbait, geo-tag, hashtag, lifecaster, lurker, meme, newsfeed, podcaster, profile, status update, tag, timeline, trending topic*); contar conversaciones y noticias (*Apparently… / He was like… / I heard that… / Well, turns out… / What happened was… / You'll never believe what…*), retomar el hilo (*As I was saying… / Where was I? Oh yeah…*), comillas irónicas e *I'm like*.

**Inglés 4 · U8 (Work & wishes)** — second conditional (*if + past, would/might + verbo*; *were* para todas las personas, *was* informal); *I wish* + past (presente), + past perfect (arrepentimiento), + could, + was/were going to; *wish* vs *hope*; contraste con el first conditional de U2; trabajos (*challenging, desk job, dream job, freelance, full-time, government job, high-paying, main job, part-time, permanent, second job, stressful, temporary, tiring, tough*); work/life balance (*always connected, assignments, busy schedule, chill out, commitment, downtime, family life, lecture, me time, office hours, seminar, social life, time off, 9-to-5*); valorar opciones y animar o advertir (*Have you tried…? / If I were in your shoes, I'd… / Maybe you could… / You might want to… / It can't hurt / You've got nothing to lose / I wouldn't do that if I were you / You don't want to do that!*), *I guess I could…*.

**Errores propios del alumno (Inglés 4 · U1)**: "I was being to NYC twice" → *I've been*; "I haven't time" → *I don't have time*; *participate in* / *take pride in* (no *on*); *watch* → *look at* (una medalla); "publication" → *post*; "I'd want" → *I'd like*.

## 6. Decisiones de diseño (mantener)

- Paleta viva: violeta `#6D28D9`, magenta `#FF2E88`, cian, lima, oro `#FFB020`; cada sección tiene su color (`body[data-sec]`: vocab magenta, grammar violeta, listen azul, speak naranja, read verde, write índigo, social turquesa) y cada ciclo el suyo (`data-n`). Modo oscuro violeta profundo. Fuentes: Outfit (títulos) + Nunito (texto).
- Nada de frameworks ni bundlers; todo vanilla JS, un archivo por unidad dentro de la carpeta de su ciclo. Progreso solo en `localStorage`.
- No repetir literalmente los ejercicios del curso: crear variantes nuevas que refuercen el mismo punto.
