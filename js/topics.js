/* ===========================================================
   topics.js — "Mis temas": unidades generadas con IA.
   Escribes un tema o una situación y la IA del Coach produce
   una unidad completa con el mismo contrato que las del curso
   (vocab, grammar, listen, speak, read, write, social + role-play).
   Se guarda en localStorage ('et-topics') como JSON plano y se
   instala al arrancar en COURSES (ciclo custom) y UNIT_DATA, así
   entra sola al SRS, al quiz mezclado, al examen y al Coach.
   =========================================================== */
window.Topics = (() => {
  const { $, $$, esc, shuffle, pick } = Engine.util;
  const KEY = 'et-topics';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const save = l => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) { } };
  const strip = h => String(h || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const lite = h => String(h || '').replace(/<(?!\/?(i|b)\b)[^>]*>/g, '');                 // solo <i>/<b>
  const safe = h => String(h || '').replace(/<\s*(script|style|iframe|img|link|meta)[^>]*>[\s\S]*?(<\/\1>|$)/gi, '').replace(/\son\w+="[^"]*"/gi, '').replace(/javascript:/gi, '');
  const S = x => (typeof x === 'string' ? x.trim() : '');
  const arr = x => Array.isArray(x) ? x : [];
  const slug = t => strip(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 36) || 'tema';
  const courseOf = () => (window.COURSES || []).find(c => c.custom);

  /* ---------------- saneado de piezas ---------------- */
  function mcqItems(items, { needBlank = false } = {}) {
    const out = []; const seen = new Set();
    arr(items).forEach(it => {
      if (!it) return; const q = S(it.q), opts = [...new Set(arr(it.opts).map(S).filter(Boolean))], a = S(it.a);
      if (!q || opts.length < 2 || !opts.includes(a) || seen.has(q)) return; if (needBlank && !q.includes('___')) return;
      seen.add(q); out.push({ q: strip(q).replace(/\s+/g, ' '), opts, a, why: lite(S(it.why)) || 'Es la forma natural en este contexto.', blank: q.includes('___') ? 1 : 0 });
    });
    return out;
  }
  function scene(sc) {
    if (!sc || typeof sc !== 'object' || !sc.nodes || typeof sc.nodes !== 'object') return null;
    const N = {}; Object.entries(sc.nodes).forEach(([id, n]) => { if (n && S(n.say)) N[id] = n; });
    const ids = Object.keys(N); if (ids.length < 3) return null;
    let endId = ids.find(id => N[id].end);
    if (!endId) { endId = '_end'; N[endId] = { say: 'Thanks, that works for me.', end: true, outcome: 'win', note: 'La conversación llegó a su fin.' }; ids.push(endId); }
    const nodes = {};
    for (const id of ids) {
      const n = N[id], say = strip(n.say);
      if (n.end) { nodes[id] = { say, end: true, outcome: ['win', 'meh', 'fail'].includes(n.outcome) ? n.outcome : 'win', note: lite(S(n.note)) || '' }; continue; }
      let opts = arr(n.opts).filter(o => o && S(o.t)).map(o => ({ t: strip(o.t).replace(/&/g, 'and'), ok: [0, 1, 2].includes(+o.ok) ? +o.ok : 1, why: lite(S(o.why)) || '', next: N[o.next] ? o.next : endId }));
      const seen = new Set(); opts = opts.filter(o => !seen.has(o.t) && seen.add(o.t));
      if (opts.length < 2) { nodes[id] = { say, end: true, outcome: 'meh', note: '' }; continue; }
      const twos = opts.filter(o => o.ok === 2); if (twos.length !== 1) { opts.forEach(o => { if (o.ok === 2) o.ok = 1; }); (opts.find(o => o.ok === 1) || opts[0]).ok = 2; }
      opts.forEach(o => { if (!o.why) o.why = o.ok === 2 ? 'Es la forma más natural y adecuada aquí.' : o.ok === 1 ? 'Se entiende, pero hay una forma más natural.' : 'Suena a traducción literal o resulta brusco.'; });
      nodes[id] = { say, opts };
    }
    const start = N[sc.start] && !N[sc.start].end ? sc.start : ids.find(id => !nodes[id].end); if (!start) return null;
    // poda: solo nodos alcanzables desde start
    const reach = new Set(); const walk = id => { if (reach.has(id) || !nodes[id]) return; reach.add(id); (nodes[id].opts || []).forEach(o => walk(o.next)); }; walk(start);
    const pruned = {}; reach.forEach(id => pruned[id] = nodes[id]);
    if (![...reach].some(id => pruned[id].end)) return null;
    return { t: strip(sc.t) || 'Role-play', you: strip(sc.you) || 'Tú', partner: strip(sc.partner) || 'La otra persona', role: strip(sc.role) || '', goal: lite(S(sc.goal)) || 'Resolver la situación con naturalidad.', start, nodes: pruned };
  }

  /* ---------------- de JSON generado a unidad con el contrato del curso ---------------- */
  function build(t) {
    const g = t.gen || {}, core = g.core || {}, sk = g.skills || {}, so = g.social || {};
    const topic = t.topic, title = t.title;
    const cards = arr(core.cards).filter(c => c && S(c.w) && S(c.def)).map(c => ({ cat: strip(c.cat) || 'Vocabulario', w: strip(c.w), def: strip(c.def), ex: strip(c.ex) || strip(c.w) + '.', ask: strip(c.ask) || '' }));
    const vocab = [];
    if (cards.length) vocab.push({ label: 'Flashcards', type: 'flashcards', eyebrow: 'Flashcards con audio', title: 'Toca la tarjeta para girarla', intro: `Vocabulario generado para <b>${esc(topic)}</b>. Anverso: la expresión. Reverso: significado y una frase real. Pulsa 🔊 para oír la pronunciación.`, cards });
    if (cards.length >= 6) vocab.push({ label: 'Empareja', type: 'match', eyebrow: 'Expresión ↔ Significado', title: 'Empareja la expresión con su significado', intro: 'Toca una expresión y luego su significado.', pairs: pick(cards, Math.min(10, cards.length)).map(c => [c.w, c.def]), round: Math.min(6, cards.length) });

    const grammar = [];
    const gr = core.grammar || {};
    if (S(gr.notes)) grammar.push({ label: 'Teoría', type: 'notes', html: `<div class="eyebrow">Gramática en contexto</div><h2>${esc(strip(gr.title) || 'Lo que esta situación exige')}</h2>${safe(gr.notes)}` });
    const gItems = mcqItems(gr.items); if (gItems.length) grammar.push({ label: 'Practica', type: 'mcq', eyebrow: 'Elige la opción correcta', title: strip(gr.title) || 'Practica', intro: 'Frases nuevas sobre el tema. Lee la explicación después de cada una.', items: gItems, pool: Math.min(8, gItems.length) });
    const fix = arr(core.fix).filter(f => f && S(f.bad) && S(f.good) && S(f.bad) !== S(f.good)).map(f => ({ bad: strip(f.bad), good: strip(f.good), why: lite(S(f.why)) || '' }));
    if (fix.length) grammar.push({ label: 'Corrige', type: 'fix', eyebrow: 'Errores típicos', title: 'Corrige la frase', intro: 'Errores habituales de hispanohablantes en esta situación. Escribe la frase corregida completa.', items: fix });

    const listen = [];
    const sents = arr(core.dictation).map(strip).filter(s => s && s.split(' ').length >= 4);
    if (sents.length >= 4) listen.push({ label: 'Dictado', type: 'dictation', eyebrow: 'Dictation', title: 'Escucha y escribe exactamente lo que oyes', intro: 'Repite las veces que quieras y baja la velocidad si hace falta.', sentences: sents });
    const dl = sk.dialog || {}, lines = arr(dl.lines).filter(l => Array.isArray(l) && S(l[0]) && S(l[1])).map(l => [strip(l[0]), strip(l[1])]), dq = mcqItems(dl.questions);
    if (lines.length >= 4 && dq.length) listen.push({ label: 'Diálogo', type: 'dialog', eyebrow: 'Listening', title: strip(dl.title) || 'Escucha el diálogo y responde', intro: 'Escúchalo entero antes de responder; la transcripción está disponible si la necesitas.', lines, questions: dq });

    const speak = [];
    const ch = arr(sk.challenges).filter(c => c && S(c.t) && S(c.task) && S(c.model)).map(c => ({ t: strip(c.t), task: lite(S(c.task)), model: strip(c.model), tags: arr(c.tags).map(strip).filter(Boolean).slice(0, 6) }));
    ch.forEach(c => { if (!c.tags.length) c.tags = ['because', 'for example']; });
    if (ch.length) speak.push({ label: 'Retos', type: 'speaking', eyebrow: 'Speaking challenge', challenges: ch });

    const read = [];
    const rd = sk.reading || {}; let paras = arr(rd.paragraphs).map(p => esc(strip(p))).filter(Boolean);
    if (paras.length >= 3) {
      const infer = [];
      arr(rd.infer).forEach(it => {
        if (!it || !S(it.w)) return; const w = strip(it.w); const pi = paras.findIndex(p => new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(p)); if (pi < 0) return;
        paras[pi] = paras[pi].replace(new RegExp('\\b(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'i'), '<b>$1</b>');
        const m = paras[pi].match(/<b>(.*?)<\/b>/); const word = m ? m[1] : w;
        const [it2] = mcqItems([{ q: `What does <b>${word}</b> mean here?`, opts: it.opts, a: it.a, why: it.why }]); if (it2) { it2.q = `What does <b>${word}</b> mean here?`; infer.push(it2); }
      });
      const main = arr(rd.main).filter(m => m && S(m.q) && +m.a >= 1 && +m.a <= paras.length).map(m => ({ q: strip(m.q), opts: paras.map((_, i) => String(i + 1)), a: String(+m.a), why: lite(S(m.why)) || `Párrafo ${+m.a}.` }));
      read.push({ label: 'Lectura', type: 'reading', eyebrow: 'Reading', title: strip(rd.title) || title, intro: 'Lee una vez para la idea general y otra para los detalles. Las palabras en negrita se preguntan después.', paragraphs: paras, main: main.length ? main : undefined, infer: infer.length ? infer : undefined, think: lite(S(rd.think)) || 'What would you do in this situation, and why?' });
    }

    const write = [];
    const wr = sk.writing || {}, checks = arr(wr.checks).filter(c => c && S(c.label) && arr(c.words).some(S)).map(c => ({ label: lite(S(c.label)), words: arr(c.words).map(w => strip(w).toLowerCase()).filter(Boolean) }));
    if (checks.length >= 3) write.push({ label: 'Escribe', type: 'comment', eyebrow: 'Writing task', title: strip(wr.title) || 'Escribe tu texto', intro: lite(S(wr.task)) || 'Escribe 80-120 palabras sobre el tema.', placeholder: strip(wr.placeholder) || '', min: 80, max: 140, need: Math.max(2, checks.length - 1), checks });

    const social = [];
    if (S(so.phrases)) social.push({ label: 'Frases clave', type: 'notes', html: `<div class="eyebrow">Functional language</div><h2>Lo que se dice en esta situación</h2>${safe(so.phrases)}` });
    const dialogs = arr(so.order).map(d => arr(d).map(strip).filter(l => /^[^:]+:\s+\S/.test(l))).filter(d => d.length >= 3);
    if (dialogs.length) social.push({ label: 'Ordena', type: 'order', eyebrow: 'Ordena el diálogo', title: 'Pon las líneas en orden', intro: 'Toca las líneas en el orden en que ocurrirían.', dialogs });
    const sc = scene(so.scene); if (sc) social.push({ label: 'Role-play', type: 'roleplay', eyebrow: 'Role-play con ramas', title: sc.t, intro: 'La otra persona habla; tú eliges tu réplica y la conversación sigue por la rama que elegiste.', scenes: [sc] });

    const sec = (id, label, activities) => ({ id, label, activities });
    return {
      source: `Mis temas · ${title}`, description: lite(S(core.description)) || `Unidad generada con IA sobre: ${topic}.`,
      map: [['Vocabulario', `${cards.length} expresiones`, 'Flashcards, emparejar y Escríbela'], ['Gramática', strip(gr.title) || 'Lo que exige la situación', 'Opción múltiple, corregir y ordenar'], ['Listening', `${sents.length} frases de dictado${lines.length ? ' y un diálogo' : ''}`, 'Dictado, cloze y comprensión'], ['Speaking', `${ch.length} retos con modelo`, 'Retos, Dilo y Coach'], ['Reading', paras.length ? 'Texto original' : '—', 'Lectura y lectura cronometrada'], ['Writing', checks.length ? 'Texto con checklist' : '—', 'Escribe y analiza'], ['Social', sc ? 'Role-play con ramas' : 'Frases clave', 'Frases, ordenar y role-play']],
      cando: arr(core.cando).map(c => lite(S(c))).filter(Boolean).slice(0, 6),
      generated: true, topic, level: t.level, created: t.created,
      sections: [{ id: 'home', label: 'Inicio', render: 'overview', activities: [] }, sec('vocab', 'Vocabulary', vocab), sec('grammar', 'Grammar', grammar), sec('listen', 'Listening', listen), sec('speak', 'Speaking', speak), sec('read', 'Reading', read), sec('write', 'Writing', write), sec('social', 'Social English', social)].filter(s => s.render || s.activities.length),
    };
  }

  /* ---------------- instalación al arrancar ---------------- */
  function install() {
    const c = courseOf(); if (!c) return;
    const list = load();
    c.units = list.map((t, i) => ({ id: t.id, number: i + 1, title: t.title, subtitle: t.subtitle || '', available: true, xpGoal: 300 }));
    list.forEach(t => { try { window.UNIT_DATA[c.id + '/' + t.id] = build(t); } catch (e) { console.warn('Mis temas: no se pudo construir', t.id, e); } });
    // tras generar, la app se recarga para instalar la unidad (actividades virtuales, menú) y abre el tema nuevo
    try { const open = sessionStorage.getItem('et-topics-open'); if (open) { sessionStorage.removeItem('et-topics-open'); if (list.some(t => t.id === open)) location.hash = '#/' + c.id + '/' + open; } } catch (e) { }
  }

  /* ---------------- generación con la IA del Coach ---------------- */
  const LEVELS = { B1: 'B1 (intermediate): simple but correct sentences, frequent vocabulary, present/past/future, basic modals', B2: 'B2 (upper-intermediate): richer vocabulary, phrasal verbs, conditionals, passive, relative clauses, natural register', C1: 'C1 (advanced): idiomatic and precise, nuanced register, collocations, discourse markers' };
  const P_CORE = (topic, lvl) => `You are writing self-study material for an adult Spanish speaker (Peru, software developer) learning English. Topic / situation chosen by the student: "${topic}". Target level: ${LEVELS[lvl] || LEVELS.B2}.
Instructions and explanations in neutral Spanish; everything the student practices in English. Make it specific and realistic for this topic, not generic.
Reply with ONLY a JSON object:
{"title": "<título corto en español, máx. 5 palabras>",
 "subtitle": "<una línea en español que resuma la situación>",
 "description": "<una línea en español>",
 "cando": ["<6 ítems en infinitivo, en español, de lo que podrá hacer: p. ej. 'Explicar un retraso sin excusas'>"],
 "cards": [{"cat": "<categoría corta en español>", "w": "<palabra o expresión en inglés>", "def": "<significado en español, breve>", "ex": "<frase de ejemplo en inglés, natural, 8-16 palabras>", "ask": "<pregunta corta en español para que la use en su vida>"}],
 "grammar": {"title": "<el punto gramatical o funcional más útil para este tema, en español>", "notes": "<explicación en español con HTML sencillo (<p>, <ul><li>, <table><tr><td>, <b>, <i>), 150-220 palabras, con ejemplos en inglés sobre el tema>",
   "items": [{"q": "<frase en inglés sobre el tema con un hueco ___>", "opts": ["<3 opciones>"], "a": "<la correcta, idéntica a una de opts>", "why": "<en español, máx. 20 palabras>"}]},
 "fix": [{"bad": "<frase en inglés con UN error típico de hispanohablante en este tema>", "good": "<la frase corregida, una sola corrección canónica>", "why": "<en español, máx. 20 palabras>"}],
 "dictation": ["<frases en inglés sobre el tema, 7-14 palabras cada una, útiles para decir o entender>"]}
Quantities: cards 22-26 (group them in 4-6 categories; mix single words, collocations and whole phrases), grammar.items 8, fix 5, dictation 8. All strings plain text except grammar.notes. No duplicate words. JSON must be valid: escape quotes inside strings.`;
  const P_SKILLS = (topic, lvl, words) => `Same project: self-study English material for an adult Spanish speaker (Peru, software developer). Topic / situation: "${topic}". Target level: ${LEVELS[lvl] || LEVELS.B2}. Reuse this vocabulary naturally where it fits: ${words}.
Reply with ONLY a JSON object:
{"dialog": {"title": "<título en español>", "lines": [["<Nombre>", "<línea en inglés>"]], "questions": [{"q": "<pregunta de comprensión en inglés>", "opts": ["<3 opciones en inglés>"], "a": "<la correcta>", "why": "<cita breve de la línea que lo dice>"}]},
 "challenges": [{"t": "<título corto en inglés>", "task": "<consigna en español: qué debe contar y qué expresiones usar>", "model": "<respuesta modelo en inglés, primera persona, 60-90 palabras, 5-7 frases, sin listas>", "tags": ["<3-5 expresiones en inglés que debería usar>"]}],
 "reading": {"title": "<título en inglés>", "paragraphs": ["<4 párrafos en inglés, 60-80 palabras cada uno: un texto original y realista sobre el tema (artículo, correo, historia o guía)>"], "main": [{"q": "<una idea del texto, en inglés>", "a": <número del párrafo que la contiene, 1-4>}], "infer": [{"w": "<una palabra o expresión que aparece literalmente en el texto y se puede deducir por contexto>", "opts": ["<3 significados posibles en español>"], "a": "<el correcto>", "why": "<en español, máx. 15 palabras>"}], "think": "<pregunta abierta en inglés para opinar>"},
 "writing": {"title": "<título en español>", "task": "<consigna en español: tipo de texto (correo, mensaje, reseña, informe…), destinatario, qué incluir; 80-120 palabras>", "placeholder": "<arranque sugerido en inglés>", "checks": [{"label": "<qué debe incluir, en español>", "words": ["<2-5 palabras o expresiones en inglés, en minúsculas, que evidencian que lo incluyó>"]}]}}
Quantities: dialog.lines 8-12 with exactly two speakers, dialog.questions 3, challenges 3, reading.main 3, reading.infer 3, writing.checks 5. Plain text everywhere. JSON must be valid.`;
  const P_SOCIAL = (topic, lvl) => `Same project: self-study English material for an adult Spanish speaker (Peru, software developer). Topic / situation: "${topic}". Target level: ${LEVELS[lvl] || LEVELS.B2}.
Reply with ONLY a JSON object:
{"phrases": "<HTML en español con las 10-12 frases clave en inglés para esta situación, agrupadas por momento (empezar, pedir, reaccionar, cerrar…) en <h3> y <ul><li><b>frase en inglés</b> — matiz en español</li>>",
 "order": [["<Nombre: línea en inglés>", "..."]],
 "scene": {"t": "<título de la escena en español>", "you": "<quién es el estudiante en la escena, español>", "partner": "<nombre y rol de la otra persona, español>", "role": "<cómo es y qué quiere la otra persona, español>", "goal": "<objetivo del estudiante, en español, una frase>", "start": "n1",
   "nodes": {"n1": {"say": "<línea de la otra persona en inglés>", "opts": [{"t": "<réplica en inglés>", "ok": 2, "why": "<por qué es la más natural, español>", "next": "n2"}, {"t": "<réplica correcta pero mejorable>", "ok": 1, "why": "<español>", "next": "n2b"}, {"t": "<réplica con un error típico o inadecuada>", "ok": 0, "why": "<español>", "next": "n2c"}]}, "...": {}, "end_win": {"say": "<cierre de la otra persona>", "end": true, "outcome": "win", "note": "<2 frases en español: qué consiguió y qué recordar>"}, "end_meh": {"say": "...", "end": true, "outcome": "meh", "note": "..."}, "end_fail": {"say": "...", "end": true, "outcome": "fail", "note": "..."}}}}
Rules for the scene: 7-9 nodes in total including 3 endings (win, meh, fail); every non-ending node has exactly 3 opts with exactly one "ok": 2, one "ok": 1 and one "ok": 0; every "next" must be a key in nodes; at least one branch must drift to a worse ending; no HTML and no "&" in say/t. order: 2 dialogues of 5-7 lines each, in the correct order, each line formatted "Name: text". JSON must be valid.`;

  async function generate(topic, level, onStep) {
    const AI = window.Coach && Coach.AI; if (!AI) throw { code: 'not_granted' };
    await AI.init(); if (AI.provider === 'local') throw { code: 'not_granted' };
    const ask = (p, max) => AI.chat([{ role: 'user', content: p }], { json: true, tier: 'default', max });
    onStep(1); const core = await ask(P_CORE(topic, level), 7000);
    const words = arr(core.cards).map(c => c && c.w).filter(Boolean).slice(0, 20).join(', ');
    onStep(2); const skills = await ask(P_SKILLS(topic, level, words), 7000);
    onStep(3); const social = await ask(P_SOCIAL(topic, level), 6000);
    const title = strip(core.title) || strip(topic).slice(0, 40);
    const list = load(); let id = slug(title); if (list.some(t => t.id === id)) id = id + '-' + (list.length + 1);
    const t = { id, title, subtitle: strip(core.subtitle) || '', topic: strip(topic), level, created: Date.now(), gen: { core, skills, social } };
    const unit = build(t); const n = unit.sections.reduce((s, x) => s + x.activities.length, 0);
    if (!unit.sections.some(s => s.id === 'vocab') || n < 5) throw { code: 'invalid_json', message: 'La IA devolvió un contenido incompleto' };
    list.unshift(t); save(list);
    return { id, title, activities: n };
  }
  function remove(id) { save(load().filter(t => t.id !== id)); }

  /* ---------------- panel en la portada del ciclo "Mis temas" ---------------- */
  function panel(view, ctx, c) {
    const list = load(); const AI = window.Coach && Coach.AI;
    const box = document.createElement('div');
    box.innerHTML = `<div class="card tp-card"><div class="eyebrow">Generar con IA</div><h2>¿Qué quieres estudiar hoy?</h2>
      <p class="muted small intro">Escribe un tema o una situación concreta y la IA crea una unidad completa: vocabulario con audio, la gramática que exige, dictado y diálogo, retos de speaking con modelo, una lectura original, una tarea de escritura y un role-play con ramas. Entra al repaso espaciado, al quiz mezclado, al examen y al Coach como cualquier otra unidad.</p>
      <div class="ai-state small" id="tpState">Comprobando la IA…</div>
      <div class="row"><input type="text" id="tpTopic" placeholder="p. ej. Explicar una caída del sistema al comité · Llevar el coche al taller en EE. UU. · Negociar con un proveedor por correo" style="flex:1;min-width:240px" maxlength="160"><label class="small">Nivel <select id="tpLevel"><option>B1</option><option selected>B2</option><option>C1</option></select></label><button class="btn" id="tpGo">Generar unidad</button></div>
      <div class="chips" style="margin-top:8px" id="tpIdeas">${['Una retro difícil con mi equipo', 'Cita con el dentista en inglés', 'Presentar mi tesis en cinco minutos', 'Dar feedback a un junior', 'Comprar un pasaje de tren en Europa', 'Explicar la arquitectura de mi sistema'].map(x => `<button class="chip small">${x}</button>`).join('')}</div>
      <div class="fb" id="tpFb"></div>
      ${list.length ? `<div class="eyebrow" style="margin-top:14px">Tus temas</div><div class="tp-list">${list.map(t => `<div class="tp-item"><a href="#/${c.id}/${t.id}"><b>${esc(t.title)}</b> <span class="small muted">· ${esc(t.level || 'B2')} · ${new Date(t.created).toLocaleDateString('es-PE')}</span><br><span class="small muted">${esc(t.topic)}</span></a><button class="lnk tp-del" data-id="${esc(t.id)}">Eliminar</button></div>`).join('')}</div>` : ''}
    </div>`;
    const anchor = $('.unit-cards', view); view.insertBefore(box.firstChild, anchor);
    const st = $('#tpState', view), fb = $('#tpFb', view), go = $('#tpGo', view), inp = $('#tpTopic', view);
    if (AI) AI.init().then(p => { st.innerHTML = p === 'local' ? '⚠️ <b>Sin IA conectada.</b> Generar unidades necesita Claude o una API key: configúrala en <a href="#/coach/settings">Ajustes IA</a>.' : `✅ IA: <b>${AI.label()}</b> · la generación tarda entre uno y tres minutos.`; }); else st.textContent = 'El Coach no está cargado.';
    $('#tpIdeas', view).onclick = e => { const b = e.target.closest('.chip'); if (b) { inp.value = b.textContent; inp.focus(); } };
    go.onclick = async () => {
      const topic = inp.value.trim(); if (topic.length < 6) { ctx.toast('Describe un poco más el tema'); return; }
      go.disabled = true; inp.disabled = true; fb.className = 'fb show good';
      const steps = ['', 'Paso 1 de 3 · vocabulario, gramática y dictado…', 'Paso 2 de 3 · diálogo, speaking, lectura y escritura…', 'Paso 3 de 3 · frases clave y role-play…'];
      try {
        const r = await generate(topic, $('#tpLevel', view).value, k => { fb.innerHTML = `⏳ ${steps[k]} <span class="muted small">(no cierres la página)</span>`; });
        fb.innerHTML = `✅ <b>${esc(r.title)}</b> lista con ${r.activities} actividades. Abriendo…`;
        try { sessionStorage.setItem('et-topics-open', r.id); } catch (e) { } setTimeout(() => location.reload(), 400);
      } catch (e) {
        fb.className = 'fb show wrong'; fb.innerHTML = e && e.code === 'not_granted' ? 'No hay IA conectada. Configura tu API key en <a href="#/coach/settings">Ajustes IA</a>.' : e && e.code === 'invalid_json' ? 'La respuesta de la IA llegó incompleta o en un formato inesperado. Vuelve a intentarlo (a veces basta con repetir).' : 'No se pudo generar la unidad: ' + esc((e && (e.message || e.code)) || 'error desconocido');
        go.disabled = false; inp.disabled = false;
      }
    };
    $$('.tp-del', view).forEach(b => b.onclick = () => { if (b.dataset.arm) { remove(b.dataset.id); location.hash = '#/' + c.id; location.reload(); } else { b.dataset.arm = 1; b.textContent = '¿Seguro? Pulsa otra vez'; setTimeout(() => { delete b.dataset.arm; b.textContent = 'Eliminar'; }, 4000); } });
  }

  return { install, generate, remove, panel, build, load };
})();
