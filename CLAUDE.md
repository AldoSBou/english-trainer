# CLAUDE.md — guía para Claude Code en este repo

Lee esto primero. Para el detalle completo (historial, contrato de datos, contenido cubierto por unidad, decisiones de diseño) está `CONTEXT.md`; `README.md` es la doc para humanos. Mantén los tres actualizados cuando cambies algo que describen.

## Qué es

**English Trainer**: sitio estático (HTML5 + CSS + JS vanilla, **sin build, sin frameworks, sin dependencias en runtime**) para que Aldo (desarrollador senior, Lima, hispanohablante) refuerce su curso de inglés. Es una **PWA** (instalable y offline) desplegada en **GitHub Pages**: repo `AldoSBou/english-trainer`, URL `https://aldosbou.github.io/english-trainer/`. También está publicada como artifact de Claude (`https://claude.ai/artifact/MAzypoLR1kqSt6JuWjxPoZ`).

Jerarquía de contenido: **ciclo** (Inglés 0-5) → **unidad** → **sección** (`home, vocab, grammar, listen, speak, read, write, social`) → **actividades** tipadas. Instrucciones en **español**, práctica en **inglés**.

Estado: Inglés 3 (WeTalk Level 3) completo, 10 unidades. Inglés 4 (Evolve Digital Level 4) en curso, Units 1-8 hechas; el ciclo actual es `ingles4` (`current:true`). Inglés 0/1/2/5 aparecen como "Pronto". Además existe el ciclo **Inglés práctico** (`practico`, `number:'P'`, `practical:true`, fuera de la numeración): siete situaciones reales escritas sin material de clase, en `courses/practico/<id>.js` (aeropuerto, hotel, restaurante, reuniones, entrevistas, escrito, salud), con el mismo contrato de unidad pero gramática mínima y un `roleplay` de tres escenas cada una.

## Mapa del código

```
index.html              esqueleto + orden de <script>: registry → unidades → engine → coach → method → translate → app
css/style.css           sistema visual "Aula luminosa" (papel cálido + marino; teal avance, coral acción, ámbar racha); acento por sección vía body[data-sec]; color por ciclo vía [data-n]; móvil <640px (barra inferior)
js/engine.js            window.Engine: renderizadores por `type` + util {shuffle,pick,esc,norm,blank,diffWords,$,$$}. Los renderizadores llaman a `ctx.score(good,pts)` y, si existe, a `ctx.answer({kind,good,item,typed})` (lo usa el cuaderno de errores)
js/mastery.js           window.Mastery: dominio por actividad (et-mastery: nivel 0 nuevo · 1 visto · 2 en práctica · 3 dominado; el vocabulario toma el nivel de la caja SRS) y cuaderno de errores (et-errors) con drill que reusa los renderizadores; vista en #/method/errors
js/app.js               rutas hash, navegación (Hoy · Curso · Práctica · Coach · Perfil), pantalla Hoy (sesión diaria de 5 pasos), portada de unidad, perfil (racha, calendario, objetivo semanal), XP/progreso, voz
js/coach.js             Speaking Coach (#/coach): chat por voz, role-play libre improvisado con la IA (#/coach/roleplay: la IA hace de la otra persona, juzga cada réplica 2/1/0, da la versión natural y cierra con win/meh/fail), evaluación CEFR, cuaderno de errores, modelos por tema. IA: artifact `sample` → API key propia → reglas locales
js/method.js            Práctica (#/method): Leitner SRS, cuaderno de errores, pronunciación, lectura, shadowing, quiz mezclado, role-play (reúne los `roleplay` de todas las unidades), 4-3-2, dictogloss, read&retell, plan semanal. Expone srsStats/srsLoop (los usa Hoy)
js/pron.js              Laboratorio de pronunciación para hispanohablantes (#/method/pron): pares mínimos (10 contrastes), terminación -ed, sílaba tónica, enlaces y contracciones (usa el tipo `say`). Datos propios dentro del archivo
js/translate.js         Traductor con voz (#/translate): glosario de las unidades → IA del Coach → MyMemory
courses/registry.js     window.COURSES: ciclos y unidades (available / current / title / subtitle / xpGoal)
courses/<ciclo>/unitN.js  window.UNIT_DATA['<ciclo>/unitN'] = {source, description, map, cando?, weak?, weakLink?, sections}
courses/practico/<id>.js  unidades del ciclo práctico (misma estructura; la clave es 'practico/<id>')
manifest.webmanifest, sw.js, icons/   PWA. sw.js: stale-while-revalidate; CACHE = 'et-vN'
tools/validate-unit.js  validador estructural de una unidad   → node tools/validate-unit.js courses/ingles4/unit8.js
tools/validate-all.js   todas las unidades                     → npm run validate
tools/test-all.js       recorre las 177+ rutas en Chromium headless y falla con cualquier error de página → npm test
```

Rutas: `#/` (Hoy: sesión diaria) · `#/curso` (ciclos) · `#/<ciclo>` · `#/<ciclo>/<unidad>` · `#/<ciclo>/<unidad>/<sección>` · `#/perfil` · `#/coach/<chat|roleplay|eval|history|settings>` · `#/method/<plan|srs|errors|pron|reading|shadow|mix|roleplay|fluency|dictogloss|retell>` · `#/translate`.

Pantalla **Hoy** (portada): cinco o seis pasos (~13-16 min) armados solos con la *unidad en foco* (la última visitada del ciclo actual): repaso SRS (máx. 12 tarjetas) → 6 mcq de gramática (4 de la unidad + 2 de otras, interleaving) → [caza tus errores: drill de 6 fallos del cuaderno, solo si hay ≥3] → dictado de 3 frases → 1 reto de speaking → 6 palabras nuevas que entran al mazo SRS. Completarlos todos marca el día como sesión (racha, objetivo semanal). Las unidades siguen siendo la biblioteca de estudio alineada con la clase.

**Actividades virtuales** (`enrich()` en app.js, al arrancar): a cada unidad se le añaden ejercicios de producción generados del contenido tipado, sin tocar el archivo: `recall` "Escríbela" en vocab (desde las flashcards), `cloze` "Completa lo que oyes" en listen (desde el dictado) y `build` "Ordena la frase" en grammar (frases del dictado). Llevan `virtual:true`. Si una unidad ya define uno de esos tipos, no se duplica.

localStorage: `et-progress` (XP, aciertos por unidad y por sección en `units[k].secs`), `et-mastery` (intentos/aciertos/racha por actividad), `et-errors` (cuaderno, máx. 150), `et-reading` (lecturas cronometradas por texto), `et-days` (actividad por día: ok/bad/secs/done), `et-today` (pasos de la sesión de hoy), `et-last` (último sitio visitado), `et-prefs` (objetivo semanal), `et-cando` (checklist "Puedo…" por unidad), `et-voice`, `et-rate`, `et-coach`, `et-coach-autospeak`, `et-anthropic-key`, `et-anthropic-model`, `et-srs`, `et-custom-cards`, `et-tr-hist`; sessionStorage `et-shadow-text`, `et-rp-free` (escena que se pasa del role-play con ramas al role-play libre). No renombrar claves (romperías el progreso guardado del usuario).

## Comandos

```bash
npx --yes serve -l 8080 .        # servir en local (el SW solo se registra en http(s), no en file://)
npm run validate                 # validación estructural de todas las unidades (sin dependencias)
npm i -D playwright && npx playwright install chromium   # una sola vez
npm test                         # recorrido completo de rutas; debe terminar "errors: 0, struct issues: 0"
node --check courses/ingles4/unitN.js   # sintaxis de un archivo de unidad
```

No hay bundler ni transpilación: lo que está en el repo es lo que se sirve. No introduzcas módulos ES, TypeScript, npm en runtime ni CDNs (el artifact de Claude no puede cargar recursos externos; la PWA debe funcionar offline). La única excepción existente es Google Fonts en `index.html`.

## Contrato de una unidad (resumen; completo en CONTEXT.md §3)

```js
window.UNIT_DATA['ingles4/unitN'] = {
  source: 'Evolve · Unit N · <tema>',
  description: '<una línea en español, texto plano; solo se admiten <i> y <b>>',
  map: [['Área', 'Contenido del curso', 'Aquí practicas'], ...],   // tabla de la portada, 3 columnas
  cando: ['Contar un plan que salió mal con <i>was going to</i>', ...],  // opcional: checklist "Puedo…" (CEFR can-do) de la portada; cada ítem en infinitivo, la portada pone el "Puedo…"
  weak: ['<html: error propio detectado>'], weakLink: '…',         // solo si hay ejercicios resueltos del alumno
  sections: [
    { id:'home', label:'Inicio', render:'overview', activities:[] },   // siempre primero, sin actividades
    { id:'vocab', label:'Vocabulary', activities:[...] }, …           // vocab, grammar, listen, speak, read, write, social
  ]
};
```

Tipos de actividad (`type`): `notes` (html) · `flashcards` (cards:{cat,w,def,ex,ask,say?}) · `match` (pairs, round) · `mcq` (items:{q,opts,a,why,blank?} o `build(util)`, `pool`) · `dictation` (sentences) · `dialog` (lines:[[speaker,text]], questions) · `speaking` (challenges:{t,task,model,tags}) · `stress` (pairs:[[label,say]]) · `reading` (paragraphs, main, infer, think) · `fix` (items:{bad,good,why}) · `soft` (items:{h,a}, pattern RegExp, missing) · `comment` (checks:{label, re|words}, min, max, need) · `order` (dialogs:[["Nombre: texto"]]) · `recall` (cards como flashcards, pool) · `cloze` (sentences, gaps) · `build` (sentences) · `say` (sentences: escucha, dilo y compara con reconocimiento de voz; autoevaluación si no hay) · `timed` (paragraphs, main, infer, key: lectura cronometrada con ppm, comprensión e historial en `et-reading`) · `roleplay` (scenes:{t,you,partner,role,goal,start,nodes}: conversación con ramas; cada nodo tiene `say` de la otra persona y 3 `opts` {t, ok:2|1|0, why, next}, o `end:true, outcome:'win'|'meh'|'fail', note`; la rama sigue la opción elegida, los fallos entran al cuaderno como mcq y la frase buena se practica con Dilo). Los cinco anteriores a `roleplay` se generan solos (actividades virtuales: `say` en speak con las frases de los modelos de los retos + dictado; `timed` en read con el texto y las preguntas del `reading`); solo decláralos a mano si quieres frases o tarjetas distintas.

`cando`: las 18 unidades (Inglés 3 y 4) ya lo tienen (5-6 ítems en infinitivo con HTML ligero; la portada imprime el encabezado "Puedo…"). Todas tienen también un `roleplay` en Social. Al crear una unidad nueva, escríbelo a partir de la gramática, el vocabulario y el functional language de la unidad; el estado de las casillas vive en `et-cando`.

Reglas que el validador comprueba y que te ahorran bugs:
- En `mcq`, **`a` es el string de la opción correcta**, no un índice; sin opciones repetidas; `blank:1` ⇔ la pregunta contiene `___` (solo se sustituye la primera).
- En `reading`, cada palabra de `infer` va en `<b>…</b>` dentro de los párrafos; `main.a` es el número de párrafo.
- En `soft`, la respuesta modelo `a` debe cumplir su propio `pattern` (el engine compara en minúsculas).
- En `fix`, `good` se compara normalizado con lo que escribe el alumno: una sola corrección canónica; explica alternativas en `why`.
- En `order`, cada línea es `"Nombre: texto"`.
- Las comillas simples dentro de strings JS van escapadas (`don\'t`) o usa comillas dobles/backticks.

## Procedimiento para añadir una unidad

1. Material: Aldo manda capturas en un `.docx` (extraer imágenes de `word/document.xml` en orden) o **PDFs de resumen oficial** (Vocabulary / Grammar / Functional language summary; `pdftotext -layout`). Los PDFs no traen ejercicios del alumno → sin `weak`.
2. Crear `courses/<ciclo>/unitN.js` copiando la estructura de la unidad anterior del mismo ciclo (`courses/ingles4/unit8.js` es el ejemplar más completo, ~100 KB; 60-100 KB es el tamaño normal). Todo el vocabulario del material como flashcards; gramática con `notes` (tablas HTML) + varios `mcq`/`fix`/`soft`/`order` con frases **nuevas**; `dictation` + `dialog`; 4-5 `challenges` con modelo; lectura **original** 200-330 palabras; `comment` con checklist; social con `notes` + `order` + mcq rápido + un `roleplay` de una escena (7-10 nodos, 3 opciones por nodo con exactamente una `ok:2`, al menos una rama que desvíe y un final `meh` o `fail`; el validador comprueba la estructura). Incluir 3-4 ítems de repaso de unidades anteriores. Errores típicos de hispanohablante como `fix`.
3. `courses/registry.js`: añadir/activar la unidad (`available:true`, title, subtitle, xpGoal 600). `index.html`: `<script src="courses/<ciclo>/unitN.js">` tras la anterior.
4. `sw.js`: subir `CACHE = 'et-vN'` (fuerza a la PWA instalada a refrescar).
5. `node tools/validate-unit.js courses/<ciclo>/unitN.js` → `npm test` → actualizar `CONTEXT.md` §2 (estado) y §5 (contenido cubierto, para el repaso espaciado) y, si procede, `README.md`.
6. Commit y `git push` (Pages se publica solo). Si trabajas desde Claude (no Claude Code), además republicar el artifact con la URL existente.

Para un ciclo nuevo: carpeta `courses/<cicloId>/`, ciclo `available:true` en `registry.js` con su array `units`. Menú, portadas, progreso, SRS y quiz mezclado se generan solos a partir de `UNIT_DATA`.

## Convenciones y cuidados

- Español neutro en instrucciones y explicaciones; inglés en todo lo que el alumno practica. Tono cercano, sin infantilizar.
- Identidad "Aula luminosa" (tokens en `style.css`): papel cálido `#FAF6EE`, tinta marino `#172238`, teal `#0E7C6B` para avance, coral `#DC5540` para acción/habla, ámbar `#D98E12` para racha y logros; cada destreza tiene su color (vocab ámbar, grammar teal, listen azul, speak coral, read verde, write índigo, social ciruela); modo oscuro azul noche automático. Tipografía Fraunces (títulos) + Nunito Sans (texto). Mantener contraste AA; nada de sombras duras ni degradados saturados.
- Móvil primero en lo nuevo: probar a <640 px (tabs inferiores, cabecera compacta).
- Voz: usar `ctx.say`/`ctx.sayLines` del engine (respetan la voz y velocidad elegidas); no crear `SpeechSynthesisUtterance` sueltos.
- Nunca pongas la API key de Anthropic ni datos personales en el repo; la key vive solo en `localStorage` del navegador del usuario.
- HTML en los datos: permitido en `notes.html`, `reading.paragraphs`, `why`, `intro`, `weak`, `cando`; en `description` solo `<i>`/`<b>`; **no** en `q` de mcq (salvo `<b>` en infer), `w/def/ex` de flashcards, líneas de `dialog`/`order`.
- Al tocar `engine.js` o `app.js`, correr `npm test`: recorre todas las unidades y detecta roturas de renderizado.
- Commits en español, un tema por commit (p. ej. `Inglés 4 · Unit 9 <tema>`).

## Herramientas y voz: notas técnicas

- `Engine.register('tipo', (root, act, ctx) => {...})` para un tipo nuevo; `ctx` = `{score(good,pts), say(text,rate), sayLines([[voz,texto]]), toast(msg), answer?(info)}`. Llama siempre a `score` y, si el ejercicio tiene una respuesta concreta, a `ctx.answer({kind, good, item, typed})` con un `item` serializable que un renderizador pueda volver a mostrar (así entra al cuaderno de errores).
- Coach: proveedores en orden `claude` (capability `sample`, solo dentro de claude.ai) → `key` (fetch directo a `api.anthropic.com` con `anthropic-dangerous-direct-browser-access: true`, modelo por defecto `claude-sonnet-5`) → `local` (métricas + `RULES`, 33 regex de errores típicos). Los temas del Coach se derivan de los `speaking.challenges` de todas las unidades: cada challenge nuevo aparece ahí automáticamente; las situaciones del role-play libre salen de `FREE_SCENES` (en coach.js) más todas las escenas `roleplay` de las unidades. El role-play libre solo funciona con IA (`claude` o `key`): el prompt `RULES_RP` pide un JSON por turno `{say, ok, better, why, corrections, hint, done, outcome, note}`; el historial que se envía empieza siempre con un turno `user` ficticio para que el primer mensaje no sea del asistente (la API lo exige).
- Método: el SRS toma todas las `flashcards` + `et-custom-cards`; el quiz mezclado toma todos los `mcq`; dictogloss/retell usan `reading.paragraphs`; shadowing usa `dictation.sentences`. Es decir: **contenido bien tipado en la unidad = herramientas alimentadas gratis**.
- En tests headless hay que simular `speechSynthesis` con `Object.defineProperty(window, 'speechSynthesis', {configurable:true, value:{…}})` (asignación directa no funciona); `tools/test-all.js` ya lo hace.
