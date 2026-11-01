/* ===========================================================
   method.js — Método: técnicas de aprendizaje de idiomas con
   evidencia, cada una con un ejercicio que usa el contenido
   de las unidades ya cargadas.
     · Repaso espaciado (Leitner)      · Shadowing
     · Práctica de recuperación mixta  · 4-3-2 (fluidez)
     · Dictogloss                      · Leer y recontar
     · Plan semanal + principios
   =========================================================== */
window.Method = (() => {
  const { $, $$, esc, shuffle, pick, norm, diffWords } = Engine.util;
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
  const strip = h => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const STOP = new Set('the a an and or but so because of to in on at for with from by about as into like through after over between out against during without before under around among is are was were be been being have has had do does did will would can could should may might must this that these those there here it its they them their he she his her we our you your i my me not no yes very really just also then than when while where which who what how if'.split(' '));
  const content = t => norm(t).split(' ').filter(w => w.length > 3 && !STOP.has(w));

  /* ---------- material agregado de todas las unidades ---------- */
  function units() { const out = []; for (const c of COURSES.filter(c => c.available)) for (const u of c.units.filter(u => u.available)) { const d = UNIT_DATA[c.id + '/' + u.id]; if (d) out.push({ c, u, d, key: c.id + '/' + u.id, label: `${c.title} · U${u.number}` }); } return out; }
  function acts(type) { const out = []; units().forEach(x => x.d.sections.forEach(s => s.activities.forEach(a => { if (a.type === type) out.push({ ...x, a, sec: s.id }); }))); return out; }
  const cards = () => [...acts('flashcards').flatMap(x => x.a.cards.map(cd => ({ ...cd, id: x.key + '|' + cd.w, unit: x.label }))), ...load('et-custom-cards', []).map(m => ({ w: m.w, def: m.def, ex: m.ex || '', id: 'mine|' + m.w, unit: 'Mis palabras (traductor)' }))];
  const sentences = () => acts('dictation').flatMap(x => x.a.sentences.map(s => ({ s, unit: x.label })));
  const paragraphs = () => acts('reading').flatMap(x => x.a.paragraphs.map((p, i) => ({ text: strip(p), title: x.a.title, unit: x.label, i })));
  function quizItems() { const util = { shuffle, pick, esc, blank: s => esc(s).replace('___', '<span class="blank">…</span>') }; const out = []; acts('mcq').forEach(x => { try { const items = typeof x.a.build === 'function' ? x.a.build(util) : x.a.items.map(it => ({ ...it, q: it.blank ? util.blank(it.q) : it.q, blank: 0 })); items.forEach(it => out.push({ ...it, ctx: x.label + ' · ' + (x.a.title || x.sec) })); } catch (e) { } }); return out; }
  const weakAll = () => units().filter(x => x.d.weak?.length).map(x => ({ label: x.label, key: x.key, weak: x.d.weak }));

  /* ---------- mini reconocimiento ---------- */
  const rec = (opts) => window.Speech ? Speech.listen(opts) : null;
  const canRec = () => !!(window.Speech && Speech.supported);
  function matchScore(said, target) { // % de palabras del objetivo dichas en orden
    const A = norm(said).split(' ').filter(Boolean), B = norm(target).split(' ').filter(Boolean); let i = 0, hit = 0;
    for (const w of B) { const j = A.indexOf(w, i); if (j >= 0) { hit++; i = j + 1; } }
    return B.length ? Math.round(hit / B.length * 100) : 0;
  }
  const why = (title, body) => `<details class="why"><summary>¿Por qué funciona? <span class="muted">${title}</span></summary><p class="small">${body}</p></details>`;

  /* ================= 1. REPASO ESPACIADO ================= */
  const INTERVALS = [0, 1, 2, 4, 7, 15, 30]; // días por caja (1..6)
  const srsToday = () => Math.floor(Date.now() / 864e5);
  /* estado del mazo: tarjetas pendientes hoy, nuevas (nunca vistas) y reparto por cajas */
  function srsStats() {
    const all = cards(), st = load('et-srs', {}), today = srsToday();
    const state = id => st[id] || { box: 1, due: today };
    const due = all.filter(c => state(c.id).due <= today);
    const fresh = all.filter(c => !st[c.id]);
    const counts = [1, 2, 3, 4, 5, 6].map(b => all.filter(c => state(c.id).box === b).length);
    return { all, due, fresh, counts, total: all.length, seen: all.length - fresh.length };
  }
  /* bucle de tarjetas (lo usa el Repaso completo y la sesión de "Hoy") */
  function srsLoop(box, ctx, opts = {}) {
    const st = load('et-srs', {}), today = srsToday();
    const state = id => st[id] || { box: 1, due: today };
    let due = shuffle(srsStats().due); if (opts.limit) due = due.slice(0, opts.limit);
    let i = 0, ok = 0, ko = 0;
    function draw() {
      if (i >= due.length) {
        box.innerHTML = `<div class="hint">${due.length ? `¡Repaso terminado! ${ok} bien, ${ko} para reforzar.` : 'No hay nada pendiente ahora mismo. Mañana tendrás nuevas tarjetas.'}</div>`;
        if (opts.onDone) opts.onDone({ ok, ko, n: due.length }); return;
      }
      const c = due[i], s = state(c.id);
      box.innerHTML = `<div class="flash"><div class="inner"><div class="face front"><div class="eyebrow">${esc(c.unit)} · caja ${s.box}</div><div class="word">${esc(c.w)}</div><p class="muted small">¿Sabes qué significa y cómo se usa? Piénsalo antes de girar.</p></div>
        <div class="face back"><p style="font-weight:700">${esc(c.def)}</p><p class="small">“${esc(c.ex || '')}”</p></div></div></div>
        <div class="row" style="margin-top:12px"><button class="btn ghost s-show">Girar</button><button class="btn ghost s-say">🔊</button><span style="flex:1"></span><button class="btn bad s-no" hidden>✘ No lo sabía</button><button class="btn ok s-yes" hidden>✔ Lo sabía</button></div><p class="small muted" style="margin-top:6px">${i + 1} / ${due.length}</p>`;
      const fl = $('.flash', box); const reveal = () => { fl.classList.add('flipped'); $('.s-no', box).hidden = $('.s-yes', box).hidden = false; };
      fl.onclick = reveal; $('.s-show', box).onclick = reveal; $('.s-say', box).onclick = () => ctx.say((c.say || c.w.replace(' / ', ', ')) + '. ' + (c.ex || ''));
      const grade = good => { const b = good ? Math.min(6, s.box + 1) : 1; st[c.id] = { box: b, due: today + INTERVALS[b] }; save('et-srs', st); good ? ok++ : ko++; ctx.score(good, good ? 6 : 0); if (opts.onGrade) opts.onGrade(ok, ko); i++; draw(); };
      $('.s-yes', box).onclick = () => grade(true); $('.s-no', box).onclick = () => grade(false);
    }
    draw();
    return due.length;
  }
  function renderSRS(root, ctx) {
    const { due, counts, total } = srsStats();
    root.innerHTML = `<div class="card"><div class="eyebrow">Spaced repetition · sistema Leitner</div><h2>Repaso inteligente de vocabulario</h2>
      <p class="muted small intro">Cada palabra vive en una caja. Si la sabes, sube de caja y tarda más en volver (1 → 2 → 4 → 7 → 15 → 30 días). Si fallas, vuelve a la caja 1. Repasas justo antes de olvidar, que es cuando más se fija.</p>
      ${why('Cepeda et al. 2006; Ebbinghaus', 'Repasar espaciado en el tiempo produce el doble de retención a largo plazo que repasar lo mismo de golpe (efecto de espaciado). Recordar activamente antes de ver la respuesta refuerza más que releer (efecto de test).')}
      <div class="boxes">${counts.map((n, k) => `<div class="box b${k + 1}"><b>${n}</b><span>caja ${k + 1}<br><small>${INTERVALS[k + 1]} d</small></span></div>`).join('')}</div>
      <div class="row between" style="margin:12px 0"><span><b id="srsDue">${due.length}</b> tarjetas para hoy · ${total} en total</span><span class="small muted" id="srsScore"></span></div>
      <div id="srsCard"></div></div>`;
    srsLoop($('#srsCard', root), ctx, { onGrade: (ok, ko) => { $('#srsScore', root).textContent = `${ok} ✔ · ${ko} ✘`; } });
  }

  /* ================= 2. SHADOWING ================= */
  function renderShadow(root, ctx) {
    let bank = sentences(); const custom = sessionStorage.getItem('et-shadow-text');
    if (custom) { bank = custom.match(/[^.!?]+[.!?]+/g)?.map(s => ({ s: s.trim(), unit: 'Tu respuesta mejorada' })) || bank; sessionStorage.removeItem('et-shadow-text'); }
    bank = custom ? bank : shuffle(bank); let i = 0, r = null;
    root.innerHTML = `<div class="card"><div class="eyebrow">Shadowing · imitación simultánea</div><h2>Escucha y repite pegado a la voz</h2>
      <p class="muted small intro">1) Escucha la frase. 2) Vuelve a reproducirla y habla <b>a la vez</b>, imitando ritmo, acento y entonación. 3) Grábate y compara. Tres repeticiones por frase; después pasa a la siguiente.</p>
      ${why('Kadota 2019; Hamada 2016', 'Repetir en voz alta casi simultáneamente automatiza la percepción y la producción de los sonidos y el ritmo del inglés; mejora la fluidez y la comprensión auditiva más que solo escuchar.')}
      ${custom ? '<div class="hint">Practicando las frases de tu <b>respuesta mejorada</b> del coach.</div>' : ''}
      <div class="prompt-box"><div class="eyebrow" id="shUnit"></div><p class="big-sent" id="shText"></p></div>
      <div class="row" style="margin-top:10px"><button class="btn sh-play">▶ Escuchar</button><button class="btn ghost sh-slow">🐢 Lenta</button><button class="btn ghost sh-echo">🔁 Eco (2×)</button>${canRec() ? '<button class="btn ghost sh-rec">🎤 Grabar mi repetición</button>' : ''}<button class="btn ghost sh-next" style="margin-left:auto">Siguiente →</button></div>
      <div class="fb" id="shFb"></div></div>`;
    const draw = () => { const it = bank[i % bank.length]; $('#shText', root).textContent = it.s; $('#shUnit', root).textContent = it.unit; $('#shFb', root).className = 'fb'; };
    draw();
    const cur = () => bank[i % bank.length].s;
    $('.sh-play', root).onclick = () => ctx.say(cur(), 1);
    $('.sh-slow', root).onclick = () => ctx.say(cur(), 0.75);
    $('.sh-echo', root).onclick = () => { ctx.say(cur(), 1); setTimeout(() => ctx.say(cur(), 1), 2600 + cur().length * 55); };
    $('.sh-next', root).onclick = () => { i++; draw(); };
    const rb = $('.sh-rec', root); if (rb) rb.onclick = () => {
      if (r) { r.stop(); return; } rb.textContent = '⏹ Detener'; rb.classList.add('rec'); const fb = $('#shFb', root); fb.className = 'fb show good'; fb.textContent = 'Escuchando… repite la frase.';
      r = rec({ continuous: false, onText: t => { fb.textContent = t; }, onEnd: said => { r = null; rb.textContent = '🎤 Grabar mi repetición'; rb.classList.remove('rec'); const p = matchScore(said, cur()); fb.className = 'fb show ' + (p >= 80 ? 'good' : 'wrong'); fb.innerHTML = `<b>${p}%</b> de coincidencia.<br><span class="diff">${diffWords(said, cur())}</span>${p < 80 ? '<p class="small muted">Vuelve a escuchar y fíjate en las palabras marcadas.</p>' : ''}`; ctx.score(p >= 80, 8); }, onError: () => { r = null; rb.textContent = '🎤 Grabar mi repetición'; rb.classList.remove('rec'); ctx.toast('No se pudo usar el micrófono'); } });
    };
  }

  /* ================= 3. RECUPERACIÓN MIXTA ================= */
  function renderMix(root, ctx) {
    const pool = quizItems();
    root.innerHTML = `<div class="card"><div class="eyebrow">Retrieval practice · interleaving</div><h2>Quiz mezclado de todas las unidades</h2>
      <p class="muted small intro">10 preguntas al azar de todas las unidades que tienes cargadas, sin avisarte de qué tema es cada una. Tener que <i>decidir</i> qué regla aplica es lo que hace que se fije.</p>
      ${why('Roediger & Karpicke 2006; Rohrer 2012', 'Recuperar de memoria (hacer test) fija más que releer, y mezclar temas (interleaving) mejora la transferencia a situaciones nuevas frente a practicar bloques de un solo tema.')}
      <p class="small muted">${pool.length} preguntas disponibles.</p><div id="mixBox"></div></div>`;
    Engine.renderers.mcq($('#mixBox', root), { items: pool, pool: 10 }, ctx);
  }

  /* ================= EXAMEN SIMULADO ================= */
  const EXAM_BANDS = { ingles3: ['A2', 'A2+', 'B1', 'B1+'], ingles4: ['B1', 'B1+', 'B2', 'B2+'], practico: ['B1', 'B1+', 'B2', 'B2+'], all: ['A2+', 'B1', 'B1+', 'B2'] };
  const EXAM_AREA = { grammar: 'Gramática', vocab: 'Vocabulario', listen: 'Listening', social: 'Social English' };
  function examPool(cid) {
    const util = { shuffle, pick, esc, blank: s => esc(s).replace('___', '<span class="blank">…</span>') };
    const gram = [], vocab = [], dict = [];
    units().filter(x => cid === 'all' || x.c.id === cid).forEach(x => x.d.sections.forEach(s => s.activities.forEach(a => {
      if (a.type === 'mcq' && !a.virtual) { try { const items = typeof a.build === 'function' ? a.build(util) : a.items.map(it => ({ ...it, q: it.blank ? util.blank(it.q) : it.q })); items.forEach(it => (s.id === 'vocab' ? vocab : gram).push({ kind: 'mcq', area: s.id === 'vocab' ? 'vocab' : s.id === 'social' ? 'social' : 'grammar', q: it.q, opts: it.opts, a: it.a, why: it.why || '', unit: x.label, key: x.key, sec: s.id })); } catch (e) { } }
      if (a.type === 'flashcards' && a.cards.length >= 4) a.cards.forEach(c => { if (!c.def) return; let others = pick(a.cards.filter(o => o.w !== c.w && o.cat === c.cat), 3); if (others.length < 3) others = others.concat(pick(a.cards.filter(o => o.w !== c.w && !others.includes(o)), 3 - others.length)); if (others.length < 3) return; vocab.push({ kind: 'mcq', area: 'vocab', q: `¿Qué palabra o expresión significa <i>“${esc(c.def)}”</i>?`, opts: [c.w, ...others.map(o => o.w)], a: c.w, why: c.ex ? `<i>${esc(c.ex)}</i>` : '', unit: x.label, key: x.key, sec: 'vocab' }); });
      if (a.type === 'dictation' && !a.virtual) a.sentences.forEach(s => dict.push({ kind: 'dict', area: 'listen', s, unit: x.label, key: x.key, sec: 'listen' }));
    })));
    return { gram, vocab, dict };
  }
  function buildExam(cid, n = 20) {
    const { gram, vocab, dict } = examPool(cid);
    const spread = (list, k) => { const by = {}; shuffle(list).forEach(it => (by[it.key] ||= []).push(it)); const out = []; let more = true; while (out.length < k && more) { more = false; for (const key of shuffle(Object.keys(by))) { if (out.length >= k) break; const it = by[key].pop(); if (it) { out.push(it); more = true; } } } return out; };
    const nd = Math.min(3, dict.length), nv = Math.min(5, vocab.length), ng = Math.min(n - nd - nv, gram.length);
    return shuffle([...spread(gram, ng), ...spread(vocab, nv), ...spread(dict, nd)]);
  }
  function renderExam(root, ctx) {
    const LIMIT = 15 * 60, N = 20; let H = load('et-exams', []);
    const scopes = [['all', 'Todo'], ...COURSES.filter(c => c.available && c.units.some(u => u.available && UNIT_DATA[c.id + '/' + u.id])).map(c => [c.id, c.title])];
    const scopeLabel = k => k === 'all' ? 'Todo' : (COURSES.find(c => c.id === k)?.title || k);
    let scope = scopes.some(s => s[0] === H[0]?.scope) ? H[0].scope : (COURSES.find(c => c.current && c.available)?.id || 'all');
    let items = [], i = 0, answers = [], secs = 0, tmr = null;
    const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    const bar = (v, max) => `<div class="cbar"><i style="width:${max ? Math.round(v / max * 100) : 0}%"></i></div>`;
    function setup() {
      clearInterval(tmr); H = load('et-exams', []);
      root.innerHTML = `<div class="card"><div class="eyebrow">Examen simulado · ${N} preguntas</div><h2>Mide dónde estás, como en un examen</h2>
        <p class="muted small intro">Veinte preguntas mezcladas de un ciclo o de todo lo que tienes cargado: gramática y uso, vocabulario y tres frases de dictado. Sin pistas ni correcciones hasta el final y con 15 minutos de tiempo. Al terminar: nota, nivel orientativo, desglose por área y por unidad, y tus fallos pasan al cuaderno de errores.</p>
        ${why('Roediger & Karpicke 2006; Bjork 1994', 'Un test sin feedback inmediato y con tiempo es una "dificultad deseable": obliga a recuperar sin apoyos y muestra lo que sabes de verdad. El informe posterior convierte cada fallo en material de repaso.')}
        <div class="eyebrow" style="margin-top:12px">Alcance</div><div class="chips" id="exScope">${scopes.map(([k, l]) => `<button class="chip ${k === scope ? 'sel' : ''}" data-k="${k}">${esc(l)}</button>`).join('')}</div>
        <p class="small muted" id="exPoolInfo"></p>
        <div class="row" style="margin-top:10px"><button class="btn" id="exStart">Empezar examen</button><span class="small muted">15 min · sin volver atrás · se guarda en tu historial</span></div></div>
        ${H.length ? `<div class="card"><div class="eyebrow">Historial</div><h2>Tus exámenes</h2><div class="scroll-x"><table class="table"><thead><tr><th>Fecha</th><th>Alcance</th><th>Nota</th><th>Nivel</th><th>Tiempo</th></tr></thead><tbody>${H.slice(0, 12).map(h => `<tr><td>${new Date(h.date).toLocaleDateString('es-PE')}</td><td>${esc(scopeLabel(h.scope))}</td><td><b>${h.score}/${h.total}</b> · ${h.pct}%</td><td><b>${esc(h.cefr)}</b></td><td>${fmt(h.secs)}</td></tr>`).join('')}</tbody></table></div>${H.length > 1 ? `<p class="small muted">Mejor nota: <b>${Math.max(...H.map(h => h.pct))}%</b> · media de los últimos ${Math.min(H.length, 5)}: <b>${Math.round(H.slice(0, 5).reduce((s, h) => s + h.pct, 0) / Math.min(H.length, 5))}%</b></p>` : ''}</div>` : ''}`;
      const info = () => { const p = examPool(scope); $('#exPoolInfo', root).textContent = `Banco disponible: ${p.gram.length} preguntas de gramática y uso, ${p.vocab.length} de vocabulario y ${p.dict.length} frases de dictado.`; };
      info();
      $('#exScope', root).onclick = e => { const c = e.target.closest('.chip'); if (!c) return; scope = c.dataset.k; $$('#exScope .chip', root).forEach(x => x.classList.toggle('sel', x === c)); info(); };
      $('#exStart', root).onclick = () => {
        items = buildExam(scope, N); if (items.length < 10) { ctx.toast('No hay suficientes preguntas en este alcance'); return; }
        i = 0; answers = []; secs = 0; question();
        tmr = setInterval(() => { secs++; const t = $('#exTimer', root); if (t) { t.textContent = fmt(Math.max(LIMIT - secs, 0)); t.style.color = LIMIT - secs <= 60 ? 'var(--bad)' : ''; } if (secs >= LIMIT) report(true); }, 1000);
      };
    }
    function question() {
      const it = items[i]; let chosen = null, plays = 0;
      root.innerHTML = `<div class="card"><div class="row between"><div><div class="eyebrow">Examen · ${esc(scopeLabel(scope))}</div><h3 style="margin:0">Pregunta ${i + 1} de ${items.length}</h3></div><div class="timer" id="exTimer">${fmt(LIMIT - secs)}</div></div>
        <div class="bar" style="margin:10px 0 14px"><i style="width:${Math.round(i / items.length * 100)}%"></i></div>
        <p class="small muted" style="margin:0 0 6px">${EXAM_AREA[it.area] || ''}</p>
        ${it.kind === 'mcq' ? `<div class="q">${it.q}</div><div class="opts" id="exOpts">${shuffle(it.opts).map(o => `<button class="opt">${o}</button>`).join('')}</div>`
          : `<div class="q">Escucha y escribe la frase.</div><div class="row"><button class="btn ghost" id="exPlay">▶ Escuchar</button><button class="btn ghost" id="exSlow">🐢 Lenta</button><span class="small muted">Máximo tres escuchas.</span></div><textarea id="exText" style="margin-top:10px;min-height:70px" placeholder="Escribe exactamente lo que oyes…"></textarea>`}
        <div class="row" style="margin-top:12px"><button class="btn" id="exNext" ${it.kind === 'mcq' ? 'disabled' : ''}>${i + 1 === items.length ? 'Terminar' : 'Siguiente →'}</button><button class="lnk" id="exSkip">Saltar</button><button class="lnk" id="exQuit" style="margin-left:auto">Abandonar</button></div></div>`;
      if (it.kind === 'mcq') $('#exOpts', root).onclick = e => { const b = e.target.closest('.opt'); if (!b) return; $$('#exOpts .opt', root).forEach(x => x.classList.toggle('sel', x === b)); chosen = b.innerHTML; $('#exNext', root).disabled = false; };
      else { const play = r => { if (plays >= 3) { ctx.toast('Ya la escuchaste tres veces'); return; } plays++; ctx.say(it.s, r); }; $('#exPlay', root).onclick = () => play(1); $('#exSlow', root).onclick = () => play(0.8); play(1); setTimeout(() => $('#exText', root)?.focus(), 50); }
      const go = skip => { const typed = it.kind === 'dict' ? ($('#exText', root)?.value || '').trim() : null; const good = !skip && (it.kind === 'mcq' ? chosen === it.a : !!typed && matchScore(typed, it.s) >= 85); answers.push({ it, chosen: skip ? null : (it.kind === 'mcq' ? chosen : typed), good }); i++; if (i >= items.length) report(false); else question(); };
      $('#exNext', root).onclick = () => go(false); $('#exSkip', root).onclick = () => go(true);
      $('#exQuit', root).onclick = () => { clearInterval(tmr); if (window.speechSynthesis) speechSynthesis.cancel(); setup(); };
    }
    function report(timeout) {
      clearInterval(tmr); if (window.speechSynthesis) speechSynthesis.cancel();
      while (answers.length < items.length) answers.push({ it: items[answers.length], chosen: null, good: false });
      const score = answers.filter(a => a.good).length, total = items.length, pct = Math.round(score / total * 100);
      const cefr = (EXAM_BANDS[scope] || EXAM_BANDS.all)[pct < 45 ? 0 : pct < 65 ? 1 : pct < 85 ? 2 : 3];
      const by = f => { const m = {}; answers.forEach(a => { const k = f(a.it); m[k] ||= { ok: 0, n: 0 }; m[k].n++; if (a.good) m[k].ok++; }); return Object.entries(m); };
      const areas = by(it => EXAM_AREA[it.area] || it.area), byUnit = by(it => it.unit).sort((a, b) => (a[1].ok / a[1].n) - (b[1].ok / b[1].n));
      const wrong = answers.filter(a => !a.good);
      wrong.forEach(a => { const it = a.it; if (it.kind === 'mcq') Mastery.miss({ kind: 'mcq', item: { q: it.q, opts: it.opts, a: it.a, why: it.why, ctx: it.unit }, unit: it.key, sec: it.sec, label: 'Examen' }); else Mastery.miss({ kind: 'dictation', item: { s: it.s }, unit: it.key, sec: 'listen', label: 'Examen', typed: a.chosen || '' }); });
      answers.forEach(a => Mastery.record(Mastery.idFor(a.it.key, a.it.sec, { label: 'Examen' }), a.good));
      H.unshift({ date: Date.now(), scope, score, total, pct, cefr, secs }); H = H.slice(0, 40); save('et-exams', H);
      ctx.score(true, score * 2);
      const verdict = pct >= 85 ? 'Excelente: dominas este alcance. Sube de ciclo o prueba con "Todo".' : pct >= 65 ? 'Bien: tienes la base. Repasa las unidades más flojas de abajo y repite en una semana.' : pct >= 45 ? 'A medias: hay lagunas claras. Trabaja el cuaderno de errores y el repaso inteligente antes de repetir.' : 'Flojo por ahora: vuelve a las unidades señaladas y haz sus ejercicios de gramática y vocabulario.';
      root.innerHTML = `<div class="card report"><div class="rep-head"><div><div class="eyebrow">Examen · ${esc(scopeLabel(scope))}</div><h2>${score} de ${total} · ${pct}%</h2></div><div class="cefr">${esc(cefr)}<small>nivel orientativo</small></div></div>
        ${timeout ? '<p class="small" style="color:var(--bad)">Se acabó el tiempo: las preguntas sin responder cuentan como fallo.</p>' : ''}
        <p>${verdict}</p>
        <div class="stat" style="margin:12px 0"><div><b>${score}</b><span class="small muted">aciertos</span></div><div><b>${wrong.length}</b><span class="small muted">fallos</span></div><div><b>${answers.filter(a => a.chosen === null).length}</b><span class="small muted">saltadas</span></div><div><b>${fmt(secs)}</b><span class="small muted">tiempo</span></div></div>
        <h3>Por área</h3><div class="scores">${areas.map(([k, v]) => `<div><span class="small"><b>${esc(k)}</b> ${v.ok}/${v.n}</span>${bar(v.ok, v.n)}</div>`).join('')}</div>
        <h3 style="margin-top:14px">Por unidad <span class="muted small" style="font-family:var(--font-body);font-weight:700">· las más flojas primero</span></h3><div class="scores">${byUnit.map(([k, v]) => `<div><span class="small"><b>${esc(k)}</b> ${v.ok}/${v.n}</span>${bar(v.ok, v.n)}</div>`).join('')}</div>
        ${wrong.length ? `<h3 style="margin-top:14px">Lo que fallaste</h3><ol class="small ex-wrong">${wrong.map(a => a.it.kind === 'mcq' ? `<li><div>${a.it.q}</div><div>${a.chosen !== null ? `<span class="del">${a.chosen}</span> → ` : '<span class="muted">(sin responder)</span> → '}<span class="ins">${a.it.a}</span></div>${a.it.why ? `<div class="muted">${a.it.why}</div>` : ''}<div class="muted">${esc(a.it.unit)}</div></li>` : `<li><div>Dictado: <b>${esc(a.it.s)}</b></div>${a.chosen ? `<div class="diff">${diffWords(a.chosen, a.it.s)}</div>` : '<div class="muted">(sin responder)</div>'}<div class="muted">${esc(a.it.unit)}</div></li>`).join('')}</ol>` : '<p>Sin fallos. 🎯</p>'}
        <div class="row" style="margin-top:14px"><button class="btn" id="exAgain">Otro examen</button>${wrong.length ? '<a class="btn ghost" href="#/method/errors">Repasar mis fallos</a>' : ''}<a class="btn ghost" href="#/method/srs">Repaso inteligente</a></div></div>`;
      $('#exAgain', root).onclick = setup;
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setup();
  }

  /* ================= 4. 4-3-2 ================= */
  function renderFluency(root, ctx) {
    const topics = (window.Coach ? Coach.topics() : []); let topic = pick(topics.length ? topics : [{ t: 'My typical day', task: '' }], 1)[0];
    let round = 0, r = null, tmr = null, secs = 0, express = true, results = [];
    const plan = () => express ? [90, 60, 45] : [240, 180, 120];
    root.innerHTML = `<div class="card"><div class="eyebrow">4-3-2 · fluidez por repetición</div><h2>La misma historia, cada vez más rápido</h2>
      <p class="muted small intro">Cuenta lo mismo tres veces seguidas con menos tiempo cada vez. Al repetir, dejas de buscar palabras y empiezas a hablar. Mide tus palabras por minuto en cada ronda.</p>
      ${why('Nation 1989; de Jong & Perfetti 2011', 'Repetir el mismo contenido bajo presión de tiempo aumenta la velocidad y reduce pausas y errores; la mejora se transfiere a temas nuevos.')}
      <div class="prompt-box"><div class="eyebrow">Tema</div><h3 id="flTopic"></h3><p class="small" id="flTask"></p><button class="lnk" id="flOther">Otro tema →</button></div>
      <div class="row" style="margin:10px 0"><label class="small"><input type="checkbox" id="flExpress" checked> Versión express (1:30 · 1:00 · 0:45)</label></div>
      <div class="rounds" id="flRounds"></div>
      <div class="row" style="margin-top:10px"><div class="timer" id="flTimer">1:30</div>${canRec() ? '<button class="btn fl-rec">🎤 Ronda 1</button>' : '<span class="small muted">Este navegador no tiene reconocimiento de voz: usa el cronómetro y cuenta tus palabras mentalmente.</span>'}<button class="btn ghost" id="flTimerOnly">⏱ Solo cronómetro</button></div>
      <textarea id="flText" style="margin-top:10px" placeholder="Transcripción de la ronda actual"></textarea></div>`;
    const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    const draw = () => { $('#flTopic', root).textContent = topic.t; $('#flTask', root).textContent = topic.task || ''; $('#flRounds', root).innerHTML = [0, 1, 2].map(k => `<div class="round ${k < round ? 'done' : k === round ? 'cur' : ''}"><b>Ronda ${k + 1}</b><span>${fmt(plan()[k])}</span>${results[k] ? `<em>${results[k].words} palabras · <b>${results[k].wpm} ppm</b></em>` : ''}</div>`).join(''); $('#flTimer', root).textContent = fmt(plan()[Math.min(round, 2)]); const b = $('.fl-rec', root); if (b) b.textContent = round < 3 ? '🎤 Ronda ' + (round + 1) : '🔁 Empezar de nuevo'; };
    draw();
    $('#flOther', root).onclick = () => { topic = pick(topics.filter(x => x !== topic), 1)[0] || topic; round = 0; results = []; draw(); };
    $('#flExpress', root).onchange = e => { express = e.target.checked; draw(); };
    function finish(words) { const dur = plan()[round]; const n = words.trim() ? words.trim().split(/\s+/).length : 0; results[round] = { words: n, wpm: Math.round(n / (Math.min(secs, dur) / 60 || 1)) }; round++; if (round === 3) { const gain = results[2].wpm - results[0].wpm; ctx.toast(gain > 0 ? `+${gain} ppm de la ronda 1 a la 3 🔥` : 'Ronda 3 terminada'); ctx.score(true, 25); } draw(); }
    function startTimer(onDone) { secs = 0; const dur = plan()[round]; clearInterval(tmr); tmr = setInterval(() => { secs++; $('#flTimer', root).textContent = fmt(Math.max(dur - secs, 0)); if (secs >= dur) { clearInterval(tmr); onDone(); } }, 1000); }
    $('#flTimerOnly', root).onclick = () => { if (round >= 3) { round = 0; results = []; draw(); } startTimer(() => { const t = $('#flText', root).value; finish(t); ctx.toast('¡Tiempo!'); }); };
    const rb = $('.fl-rec', root); if (rb) rb.onclick = () => {
      if (r) { r.stop(); return; } if (round >= 3) { round = 0; results = []; draw(); }
      const ta = $('#flText', root); ta.value = ''; rb.textContent = '⏹ Terminar ronda'; rb.classList.add('rec');
      startTimer(() => r?.stop());
      r = rec({ onText: t => { ta.value = t; }, onEnd: said => { r = null; clearInterval(tmr); rb.classList.remove('rec'); finish(said || ta.value); }, onError: () => { r = null; clearInterval(tmr); rb.classList.remove('rec'); draw(); ctx.toast('No se pudo usar el micrófono'); } });
    };
  }

  /* ================= 5. DICTOGLOSS ================= */
  function renderDictogloss(root, ctx) {
    const paras = paragraphs().filter(p => p.text.split(' ').length >= 35); let cur = pick(paras, 1)[0];
    root.innerHTML = `<div class="card"><div class="eyebrow">Dictogloss · reconstrucción</div><h2>Escucha dos veces y reconstruye el texto</h2>
      <p class="muted small intro">No es un dictado: escucha a velocidad normal, toma solo notas de palabras clave y luego <b>reconstruye</b> el párrafo con tus palabras. Compara con el original y fíjate en la gramática que te faltó.</p>
      ${why('Wajnryb 1990; Swain 1985 (output hypothesis)', 'Tener que producir el texto te obliga a notar los huecos entre lo que entiendes y lo que sabes decir; esa "notación" es la que dispara el aprendizaje de gramática.')}
      <div class="prompt-box"><div class="eyebrow" id="dgUnit"></div><p class="small muted">Párrafo de <b id="dgTitle"></b> · <span id="dgLen"></span> palabras</p><button class="lnk" id="dgOther">Otro párrafo →</button></div>
      <div class="row" style="margin-top:10px"><button class="btn dg-play">▶ Escuchar (1ª vez)</button><button class="btn ghost dg-play2">▶ Escuchar (2ª vez)</button><button class="btn ghost dg-slow">🐢 Una vez lenta</button></div>
      <textarea id="dgNotes" style="margin-top:10px;min-height:60px" placeholder="Notas: solo palabras clave mientras escuchas…"></textarea>
      <textarea id="dgText" style="margin-top:8px;min-height:120px" placeholder="Ahora reconstruye el párrafo completo aquí…"></textarea>
      <div class="row" style="margin-top:8px"><button class="btn dg-check">Comparar</button></div><div class="fb" id="dgFb"></div></div>`;
    const draw = () => { $('#dgUnit', root).textContent = cur.unit; $('#dgTitle', root).textContent = cur.title || 'Reading'; $('#dgLen', root).textContent = cur.text.split(' ').length; $('#dgFb', root).className = 'fb'; $('#dgText', root).value = ''; $('#dgNotes', root).value = ''; };
    draw();
    $('#dgOther', root).onclick = () => { cur = pick(paras.filter(p => p !== cur), 1)[0] || cur; draw(); };
    $('.dg-play', root).onclick = $('.dg-play2', root).onclick = () => ctx.say(cur.text, 1);
    $('.dg-slow', root).onclick = () => ctx.say(cur.text, 0.8);
    $('.dg-check', root).onclick = () => { const mine = $('#dgText', root).value.trim(); if (mine.split(/\s+/).length < 10) { ctx.toast('Escribe un poco más'); return; } const keys = [...new Set(content(cur.text))], said = new Set(content(mine)); const hit = keys.filter(k => said.has(k)); const p = Math.round(hit.length / keys.length * 100); const fb = $('#dgFb', root); fb.className = 'fb show ' + (p >= 60 ? 'good' : 'wrong'); fb.innerHTML = `<b>${p}%</b> de las ideas clave recuperadas (${hit.length}/${keys.length}).<h3 style="margin-top:10px">Original</h3><p class="small">${esc(cur.text)}</p><h3 style="margin-top:10px">Diferencias palabra a palabra</h3><p class="small diff">${diffWords(mine, cur.text)}</p><p class="small muted">Palabras clave que no usaste: ${keys.filter(k => !said.has(k)).slice(0, 12).map(esc).join(', ') || 'ninguna'}.</p>`; ctx.score(p >= 60, 15); };
  }

  /* ================= 6. LEER Y RECONTAR ================= */
  function renderRetell(root, ctx) {
    const paras = paragraphs().filter(p => p.text.split(' ').length >= 30); let cur = pick(paras, 1)[0], r = null, tmr = null, left = 45;
    root.innerHTML = `<div class="card"><div class="eyebrow">Read & retell · input → output</div><h2>Lee 45 segundos y cuéntalo con tus palabras</h2>
      <p class="muted small intro">Lee el párrafo con atención; cuando se oculte, cuéntalo en voz alta como si se lo explicaras a un amigo. No se trata de memorizar frases, sino de expresar las ideas.</p>
      ${why('Krashen (comprehensible input) + Swain (output)', 'Leer textos ligeramente por encima de tu nivel nutre el vocabulario y las estructuras; recontarlos enseguida convierte ese input pasivo en lengua que sabes producir.')}
      <div class="prompt-box"><div class="eyebrow" id="rtUnit"></div><p id="rtText" class="article"></p><div class="row between"><span class="small muted">Se ocultará en <b id="rtLeft">45</b> s</span><button class="lnk" id="rtOther">Otro párrafo →</button></div></div>
      <div class="row" style="margin-top:10px"><button class="btn rt-start">Empezar a leer</button>${canRec() ? '<button class="btn ghost rt-rec" disabled>🎤 Recontar</button>' : ''}<button class="btn ghost rt-show" hidden>Ver texto otra vez</button></div>
      <textarea id="rtSaid" style="margin-top:10px" placeholder="Tu versión (por voz o escrita)"></textarea>
      <div class="row" style="margin-top:8px"><button class="btn rt-check">Comparar ideas</button></div><div class="fb" id="rtFb"></div></div>`;
    const txt = $('#rtText', root), draw = () => { $('#rtUnit', root).textContent = cur.unit + ' · ' + (cur.title || ''); txt.textContent = cur.text; txt.hidden = false; $('#rtFb', root).className = 'fb'; $('#rtSaid', root).value = ''; left = 45; $('#rtLeft', root).textContent = left; clearInterval(tmr); };
    draw();
    $('#rtOther', root).onclick = () => { cur = pick(paras.filter(p => p !== cur), 1)[0] || cur; draw(); };
    $('.rt-start', root).onclick = () => { left = 45; clearInterval(tmr); tmr = setInterval(() => { left--; $('#rtLeft', root).textContent = left; if (left <= 0) { clearInterval(tmr); txt.hidden = true; $('.rt-show', root).hidden = false; const b = $('.rt-rec', root); if (b) b.disabled = false; ctx.toast('¡Ahora cuéntalo!'); } }, 1000); };
    $('.rt-show', root).onclick = () => { txt.hidden = false; };
    const rb = $('.rt-rec', root); if (rb) rb.onclick = () => { if (r) { r.stop(); return; } rb.textContent = '⏹ Detener'; rb.classList.add('rec'); r = rec({ onText: t => { $('#rtSaid', root).value = t; }, onEnd: () => { r = null; rb.textContent = '🎤 Recontar'; rb.classList.remove('rec'); }, onError: () => { r = null; rb.textContent = '🎤 Recontar'; rb.classList.remove('rec'); } }); };
    $('.rt-check', root).onclick = () => { const mine = $('#rtSaid', root).value.trim(); if (mine.split(/\s+/).length < 8) { ctx.toast('Cuenta un poco más'); return; } const keys = [...new Set(content(cur.text))], said = new Set(content(mine)), hit = keys.filter(k => said.has(k)), p = Math.round(hit.length / keys.length * 100); const fb = $('#rtFb', root); fb.className = 'fb show ' + (p >= 40 ? 'good' : 'wrong'); fb.innerHTML = `<b>${p}%</b> de las ideas clave (${hit.length}/${keys.length}). ${p >= 40 ? '¡Bien! Recontar con tus palabras es más valioso que repetir literalmente.' : 'Vuelve a leer y fíjate en las ideas principales, no en las frases exactas.'}<p class="small muted" style="margin-top:6px">Ideas que no mencionaste: ${keys.filter(k => !said.has(k)).slice(0, 10).map(esc).join(', ') || 'ninguna'}.</p>${window.Coach && Coach.AI.provider !== 'local' ? '<p class="small">Para feedback de gramática sobre tu versión, pégala en <a href="#/coach/eval">Coach › Evaluar</a>.</p>' : ''}`; ctx.score(p >= 40, 15); };
  }

  /* ================= 6b. LECTURA CRONOMETRADA ================= */
  function renderReading(root, ctx, sub) {
    const texts = acts('reading').map(x => ({ x, key: x.d.source || x.key, title: x.a.title || x.u.title, words: x.a.paragraphs.map(p => strip(p)).join(' ').split(' ').length }));
    const H = load('et-reading', {}), all = Object.values(H).flat();
    const bestOf = k => (H[k] || []).reduce((m, h) => Math.max(m, h.wpm), 0);
    const last5 = all.slice().sort((a, b) => a.d - b.d).slice(-5), avg = last5.length ? Math.round(last5.reduce((s, h) => s + h.wpm, 0) / last5.length) : 0, bestAll = all.reduce((m, h) => Math.max(m, h.wpm), 0);
    let cur = texts.find(t => t.key === sub) || texts.filter(t => !H[t.key]).slice(-1)[0] || texts[texts.length - 1];
    root.innerHTML = `<div class="card"><div class="eyebrow">Reading fluency · lectura cronometrada</div><h2>Lee más rápido sin perder comprensión</h2>
      <p class="muted small intro">Elige un texto de tus unidades, léelo contra el reloj y responde sin mirar. Medimos palabras por minuto y comprensión; lo que vale es el producto de las dos. Repite el mismo texto dos o tres veces seguidas: la velocidad que ganas se transfiere a textos nuevos.</p>
      ${why('Nation 2009; Grabe 2009', 'Dedicar una parte del tiempo a leer material fácil (98 % de palabras conocidas) a velocidad automatiza el reconocimiento de palabras y libera atención para comprender; la lectura repetida y cronometrada es la técnica con más evidencia para ganar fluidez lectora.')}
      <div class="stat" style="margin:12px 0"><div><b>${bestAll || '—'}</b><span class="small muted">mejor marca (ppm)</span></div><div><b>${avg || '—'}</b><span class="small muted">media últimas 5</span></div><div><b>${all.length}</b><span class="small muted">lecturas hechas</span></div><div><b>${texts.length}</b><span class="small muted">textos disponibles</span></div></div>
      <div class="eyebrow" style="margin:6px 0 8px">Texto</div><div class="chips rd-pick">${texts.map(t => `<button class="chip ${t === cur ? 'sel' : ''}" data-k="${esc(t.key)}" title="${t.words} palabras">${esc(t.x.label)} · ${esc(t.title)}${bestOf(t.key) ? ` · ${bestOf(t.key)} ppm` : ''}</button>`).join('')}</div></div>
      <div class="rd-host" style="margin-top:18px"></div>`;
    $$('.rd-pick .chip', root).forEach(b => b.onclick = () => renderReading(root, ctx, b.dataset.k));
    if (cur) Engine.renderers.timed($('.rd-host', root), { eyebrow: cur.x.label, title: cur.title, intro: `${cur.words} palabras · ${cur.x.u.title}`, paragraphs: cur.x.a.paragraphs, main: cur.x.a.main || [], infer: cur.x.a.infer || [], key: cur.key }, { ...ctx, score: (g, p) => { ctx.score(g, p); if (window.Mastery) Mastery.record('practice|read|Lectura cronometrada', g); } });
  }

  /* ================= 7. PLAN Y PRINCIPIOS ================= */
  function renderPlan(root, ctx) {
    const w = weakAll();
    root.innerHTML = `<div class="card"><div class="eyebrow">Cómo estudiar · lo que dice la investigación</div><h2>Ocho principios que sí funcionan</h2>
      <div class="grid2" style="margin-top:12px">
        ${[['Poco y a diario', 'Quince minutos cada día valen más que dos horas el domingo. La memoria se consolida durmiendo entre sesiones.'],
      ['Recupera, no releas', 'Antes de mirar la respuesta, intenta producirla. Cada recuperación con esfuerzo refuerza la huella (efecto de test).'],
      ['Espacia los repasos', 'Repasa justo antes de olvidar: 1, 2, 4, 7, 15, 30 días. El Repaso inteligente lo hace por ti.'],
      ['Mezcla temas', 'Alternar gramáticas distintas obliga a elegir la regla correcta, que es lo que pasa cuando hablas de verdad.'],
      ['Habla desde el primer día', 'El output te muestra tus huecos. Un minuto hablando con errores enseña más que diez escuchando en silencio.'],
      ['Input un poco por encima', 'Lee y escucha material que entiendas al 80-90 %. Ni tan fácil que aburra ni tan difícil que bloquee.'],
      ['Aprende en bloques (chunks)', 'Memoriza <i>take pride in</i>, no <i>pride</i>. Las collocations salen enteras al hablar y evitan traducir palabra a palabra.'],
      ['Corrige con foco', 'No intentes arreglarlo todo: elige 2-3 errores personales, cázalos durante una semana y pasa a los siguientes.']].map(([t, b]) => `<div class="opt-card"><h3>${t}</h3><p class="small">${b}</p></div>`).join('')}
      </div></div>
      <div class="card"><div class="eyebrow">Rutina sugerida · 15-25 min al día</div><h2>Plan semanal</h2>
      <div class="scroll-x"><table class="table"><thead><tr><th>Día</th><th>Bloque fijo (5 min)</th><th>Bloque principal (10-15 min)</th><th>Extra (5 min)</th></tr></thead><tbody>
        <tr><td><b>Lun</b></td><td>Repaso inteligente</td><td>Unidad actual › Grammar + Vocabulary</td><td>Shadowing (5 frases)</td></tr>
        <tr><td><b>Mar</b></td><td>Repaso inteligente</td><td>Coach › Conversar (un tema)</td><td>Cuaderno de errores</td></tr>
        <tr><td><b>Mié</b></td><td>Repaso inteligente</td><td>Unidad actual › Listening + Reading</td><td>Dictogloss</td></tr>
        <tr><td><b>Jue</b></td><td>Repaso inteligente</td><td>4-3-2 con un tema del curso</td><td>Shadowing</td></tr>
        <tr><td><b>Vie</b></td><td>Repaso inteligente</td><td>Unidad actual › Writing + Social English</td><td>Quiz mezclado</td></tr>
        <tr><td><b>Sáb</b></td><td>Repaso inteligente</td><td>Coach › Evaluar (test de 90 s) y leer el informe</td><td>Leer y recontar</td></tr>
        <tr><td><b>Dom</b></td><td>Repaso inteligente</td><td>Libre: serie/podcast en inglés con subtítulos en inglés</td><td>—</td></tr>
      </tbody></table></div>
      <div class="hint" style="margin-top:12px">Regla de oro: si un día solo tienes 5 minutos, haz el <b>Repaso inteligente</b>. Es lo único que se estropea si se salta.</div></div>
      ${w.length ? `<div class="card"><div class="eyebrow">Tus puntos débiles · detectados en el curso</div><h2>Errores propios por unidad</h2>${w.map(x => `<h3 style="margin-top:10px">${esc(x.label)}</h3><ul class="small" style="padding-left:18px">${x.weak.map(e => `<li>${e}</li>`).join('')}</ul><a class="lnk" href="#/${x.key}/write">Practicarlos en Writing →</a>`).join('')}</div>` : ''}`;
  }

  /* ================= ROLE-PLAY CON RAMAS ================= */
  function roleplays() { const out = []; for (const [k, d] of Object.entries(window.UNIT_DATA || {})) d.sections.forEach(s => s.activities.forEach(a => { if (a.type === 'roleplay') (a.scenes || []).forEach(sc => out.push({ unit: k, sec: s.id, act: a, scene: sc })); })); return out; }
  function renderRoleplay(root, ctx) {
    const all = roleplays();
    const unitShort = k => { const [c, u] = k.split('/'); const co = (window.COURSES || []).find(x => x.id === c), un = co?.units.find(x => x.id === u); return co && un ? `${co.practical ? 'Práctico' : co.title.replace('Inglés ', 'I')} · ${co.practical ? '' : 'U'}${un.number}` : k; };
    root.innerHTML = `<div class="card"><div class="eyebrow" style="color:var(--coral)">Role-play · conversación con ramas</div><h2>Elige qué decir y vive las consecuencias</h2>
      <p class="muted small intro">Situaciones reales con el lenguaje funcional de cada unidad. La otra persona habla; tú eliges tu réplica entre tres, ves por qué una suena más natural, la dices en voz alta y la conversación sigue por la rama que elegiste. Repite la escena por otra rama: no todas acaban bien. ¿Quieres hablar sin opciones? Prueba el <a href="#/coach/roleplay">role-play libre con la IA</a> del Coach.</p>
      ${why('Thornbury 2005; Nation & Newton 2009', 'Elegir la fórmula adecuada para una situación social concreta (pragmática) y decirla en voz alta transfiere las frases de la clase al uso real mucho mejor que memorizarlas en lista. Ver las consecuencias de una réplica torpe fija el matiz (suave / claro / fuerte).')}
      ${all.length ? `<div class="chips rp-pick">${all.map((x, i) => `<button class="chip" data-i="${i}"><b>${esc(unitShort(x.unit))}</b>${esc(x.scene.t)}</button>`).join('')}</div><div id="rpBox" style="margin-top:14px"></div>` : '<p class="small muted">Ninguna unidad define role-plays todavía.</p>'}</div>`;
    const show = i => {
      const x = all[i]; $$('.rp-pick .chip', root).forEach((c, j) => c.classList.toggle('sel', j === i));
      const id = Mastery.idFor(x.unit, x.sec, x.act);
      const rctx = { ...ctx, score: (g, p) => { ctx.score(g, p); Mastery.record(id, g); }, answer: info => { if (!info.good) Mastery.miss({ ...info, unit: x.unit, sec: x.sec, label: x.act.label || 'Role-play' }); } };
      Engine.renderers.roleplay($('#rpBox', root), { ...x.act, eyebrow: '', title: '', intro: '', scenes: [x.scene] }, rctx);
    };
    $$('.rp-pick .chip', root).forEach(c => c.onclick = () => show(+c.dataset.i));
    if (all.length) show(0);
  }

  /* ================= montaje ================= */
  const TABS = [['plan', 'Principios y plan', renderPlan], ['srs', 'Repaso inteligente', renderSRS], ['errors', 'Cuaderno de errores', (r, c) => Mastery.renderErrors(r, c)], ['pron', 'Pronunciación', (r, c) => Pron.render(r, c)], ['reading', 'Lectura', renderReading],['shadow', 'Shadowing', renderShadow], ['mix', 'Quiz mezclado', renderMix], ['exam', 'Examen', renderExam], ['roleplay', 'Role-play', renderRoleplay], ['fluency', '4-3-2', renderFluency], ['dictogloss', 'Dictogloss', renderDictogloss], ['retell', 'Leer y recontar', renderRetell]];
  function render(view, ctx, sub) {
    const active = TABS.find(t => t[0] === sub) || TABS[0];
    view.innerHTML = `<nav class="crumbs"><a href="#/">Hoy</a><span class="sep">›</span><span>Práctica</span></nav>
      <div class="unit-head compact"><div class="eyebrow">Práctica · técnicas con evidencia</div><h1>Práctica</h1><p class="muted small">Repaso espaciado, shadowing, quiz mezclado, examen simulado, role-play, fluidez, dictogloss y recontar: ejercicios transversales con el contenido de todas tus unidades.</p></div>
      <div class="sub">${TABS.map(t => `<button class="${t === active ? 'on' : ''}" data-t="${t[0]}">${t[1]}</button>`).join('')}</div><div class="act on" id="methodBody"></div>`;
    $$('.sub button', view).forEach(b => b.onclick = () => { location.hash = '#/method/' + b.dataset.t; });
    active[2]($('#methodBody', view), ctx);
  }
  return { render, srsStats, srsLoop, cards, sentences, quizItems };
})();
