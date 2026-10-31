/* ===========================================================
   mastery.js — dominio por ítem y cuaderno de errores global
   · Dominio: cada actividad de una unidad (id "ciclo/unidad|sección|label")
     acumula intentos, aciertos y racha → nivel 0 nuevo · 1 visto ·
     2 en práctica · 3 dominado. El vocabulario toma su nivel de la
     caja del SRS (et-srs).
   · Cuaderno: cada fallo concreto (pregunta, frase, corrección…) se
     guarda con su contexto y se puede volver a practicar con los
     mismos renderizadores del engine; acertarlo en el drill lo borra.
   localStorage: et-mastery, et-errors.
   =========================================================== */
window.Mastery = (() => {
  const { $, $$, esc, shuffle, pick } = Engine.util;
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
  const today = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5); };
  const strip = h => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const M = load('et-mastery', {});
  let E = load('et-errors', []);

  const LEVELS = ['nuevo', 'visto', 'en práctica', 'dominado'];
  const idFor = (unitKey, secId, act) => `${unitKey}|${secId}|${act.label || act.type}`;
  function record(id, good) { const s = M[id] ||= { n: 0, ok: 0, streak: 0, last: 0 }; s.n++; if (good) { s.ok++; s.streak++; } else s.streak = 0; s.last = today(); store('et-mastery', M); }
  function level(id) { const s = M[id]; if (!s || !s.n) return 0; const acc = s.ok / s.n; if (s.n >= 6 && acc >= .8 && s.streak >= 3) return 3; if (s.n >= 3 && acc >= .6) return 2; return 1; }
  const vocabLevel = box => !box ? 0 : box === 1 ? 1 : box <= 3 ? 2 : 3;

  /* resumen de una unidad: vocabulario por nivel, puntos de gramática y nivel por sección */
  function unitSummary(unitKey, data) {
    const srs = load('et-srs', {});
    const cards = data.sections.flatMap(s => s.activities.filter(a => a.type === 'flashcards').flatMap(a => a.cards));
    const vocab = [0, 0, 0, 0]; cards.forEach(c => vocab[vocabLevel(srs[unitKey + '|' + c.w]?.box)]++);
    const g = data.sections.find(s => s.id === 'grammar');
    const points = g ? g.activities.filter(a => ['mcq', 'fix', 'soft', 'order', 'build'].includes(a.type)).map(a => { const id = idFor(unitKey, 'grammar', a), s = M[id] || { n: 0, ok: 0 }; return { label: a.label, level: level(id), n: s.n, ok: s.ok, virtual: !!a.virtual }; }) : [];
    const secs = {}; data.sections.forEach(s => { if (s.render === 'overview') return; const lv = s.activities.filter(a => a.type !== 'notes').map(a => level(idFor(unitKey, s.id, a))); secs[s.id] = lv.length ? Math.round(lv.reduce((a, b) => a + b, 0) / lv.length * 10) / 10 : 0; });
    return { vocab, vocabTotal: cards.length, points, secs };
  }
  /* totales por destreza (todas las unidades): intentos, aciertos, ítems y dominados */
  function skillTotals() {
    const out = {};
    for (const [id, s] of Object.entries(M)) { const sec = id.split('|')[1]; if (!sec) continue; const o = out[sec] ||= { n: 0, ok: 0, items: 0, mastered: 0 }; o.n += s.n; o.ok += s.ok; o.items++; if (level(id) === 3) o.mastered++; }
    return out;
  }
  function vocabTotals() {
    const srs = load('et-srs', {}), t = [0, 0, 0, 0];
    for (const [k, d] of Object.entries(window.UNIT_DATA || {})) d.sections.forEach(s => s.activities.forEach(a => { if (a.type === 'flashcards') a.cards.forEach(c => t[vocabLevel(srs[k + '|' + c.w]?.box)]++); }));
    return t;
  }

  /* ---------- cuaderno de errores ---------- */
  const errKey = e => e.kind + '|' + strip(e.item.q || e.item.s || e.item.bad || e.item.h || e.item.w || '');
  const errText = e => {
    const it = e.item;
    if (e.kind === 'mcq') return `${strip(it.q).replace('…', '___')} → <b>${strip(it.a)}</b>`;
    if (e.kind === 'dictation' || e.kind === 'build') return `<b>${esc(it.s)}</b>`;
    if (e.kind === 'fix') return `<s>${esc(it.bad)}</s> → <b>${esc(it.good)}</b>`;
    if (e.kind === 'soft') return `${esc(it.h)} → <b>${esc(it.a)}</b>`;
    if (e.kind === 'recall') return `${esc(it.def)} → <b>${esc(it.w)}</b>`;
    return esc(JSON.stringify(it));
  };
  const KIND = { mcq: 'Elegir', dictation: 'Dictado', build: 'Orden', fix: 'Corregir', soft: 'Reescribir', recall: 'Escribir' };
  function miss(e) {
    const k = errKey(e), ex = E.find(x => x.k === k);
    if (ex) { ex.n++; ex.day = today(); ex.typed = e.typed || ex.typed; }
    else E.unshift({ k, kind: e.kind, item: e.item, unit: e.unit || '', sec: e.sec || '', label: e.label || '', day: today(), n: 1, typed: e.typed || '' });
    E = E.slice(0, 150); store('et-errors', E);
  }
  function resolve(k) { E = E.filter(x => x.k !== k); store('et-errors', E); }
  const errors = () => E;
  /* los más repetidos y recientes primero */
  const ranked = () => E.slice().sort((a, b) => (b.n - a.n) || (b.day - a.day));

  /* ---------- drill: vuelve a practicar los errores con los renderizadores del engine ---------- */
  function renderDrill(root, ctx, opts = {}) {
    const list = ranked().slice(0, opts.limit || 8);
    if (!list.length) { root.innerHTML = '<div class="hint">Tu cuaderno está vacío. Cuando falles algo en una unidad o en la sesión de Hoy, aparecerá aquí para volver a practicarlo.</div>'; if (opts.onDone) opts.onDone(); return 0; }
    let answered = 0, fixed = 0;
    const dctx = { ...ctx, answer: info => { answered++; if (info.good) { fixed++; resolve(errKey(info)); } if (opts.onItem) opts.onItem(info); if (answered >= list.length && opts.onDone) opts.onDone({ answered, fixed }); } };
    const by = k => list.filter(e => e.kind === k), R = Engine.renderers, parts = [];
    const sect = (title, html) => `<div class="drill-part"><div class="eyebrow">${title}</div>${html}</div>`;
    root.innerHTML = '';
    const add = (title, type, act) => { const box = document.createElement('div'); box.className = 'drill-part'; box.innerHTML = `<div class="eyebrow drill-t">${title}</div><div class="drill-b"></div>`; root.appendChild(box); R[type]($('.drill-b', box), act, dctx); };
    const mcq = by('mcq'); if (mcq.length) add(`Elegir · ${mcq.length}`, 'mcq', { items: mcq.map(e => ({ ...e.item, blank: 0 })), pool: mcq.length });
    const rc = by('recall'); if (rc.length) add(`Escribir la palabra · ${rc.length}`, 'recall', { cards: rc.map(e => e.item), pool: rc.length });
    const dc = by('dictation'); if (dc.length) add(`Dictado · ${dc.length}`, 'dictation', { sentences: dc.map(e => e.item.s) });
    const bd = by('build'); if (bd.length) add(`Ordenar · ${bd.length}`, 'build', { sentences: bd.map(e => e.item.s) });
    const fx = by('fix'); if (fx.length) add(`Corregir · ${fx.length}`, 'fix', { items: fx.map(e => e.item) });
    const sf = by('soft'); const groups = {}; sf.forEach(e => (groups[e.item.pattern + '/' + e.item.flags] ||= []).push(e));
    Object.values(groups).forEach(g => { let re; try { re = new RegExp(g[0].item.pattern, g[0].item.flags); } catch (x) { re = /./; } add(`Reescribir · ${g.length}`, 'soft', { items: g.map(e => ({ h: e.item.h, a: e.item.a })), pattern: re, missing: g[0].item.missing, explain: g[0].item.explain }); });
    return list.length;
  }

  /* ---------- vista del cuaderno (Práctica › Cuaderno de errores) ---------- */
  function renderErrors(root, ctx) {
    const list = ranked();
    const unitLabel = k => { const [c, u] = k.split('/'); const co = (window.COURSES || []).find(x => x.id === c), un = co?.units.find(x => x.id === u); return co && un ? `${co.title} · U${un.number}` : k; };
    root.innerHTML = `<div class="card"><div class="eyebrow" style="color:var(--coral)">Cuaderno de errores · corrección con foco</div><h2>Lo que fallaste, para volver a intentarlo</h2>
      <p class="muted small intro">Cada fallo concreto de las unidades o de la sesión de Hoy se anota aquí con su contexto. Practicarlos de nuevo y acertarlos los borra. Elige dos o tres errores que se repitan y cázalos durante la semana.</p>
      <div class="row between"><span><b>${list.length}</b> ${list.length === 1 ? 'error pendiente' : 'errores pendientes'}${list.length ? ` · ${list.filter(e => e.n > 1).length} repetidos` : ''}</span>${list.length ? `<div class="row"><button class="btn warm er-drill">Practicar los ${Math.min(8, list.length)} más urgentes</button><button class="btn ghost sm er-clear">Vaciar</button></div>` : ''}</div>
      <div class="er-drill-box" style="margin-top:14px"></div>
      ${list.length ? `<div class="err-list" style="margin-top:14px">${list.map(e => `<div class="err" data-k="${esc(e.k)}"><span class="kind" data-kind="${e.kind}">${KIND[e.kind] || e.kind}</span><div class="txt">${errText(e)}${e.typed && e.kind !== 'mcq' ? `<div class="small muted">Tú: “${esc(e.typed)}”</div>` : ''}<div class="small muted">${e.unit ? `<a href="#/${e.unit}/${e.sec || ''}">${esc(unitLabel(e.unit))}${e.label ? ' · ' + esc(e.label) : ''}</a>` : ''}${e.n > 1 ? ` · <b style="color:var(--coral)">${e.n} veces</b>` : ''}</div></div><button class="lnk er-x" title="Quitar">✕</button></div>`).join('')}</div>` : ''}</div>`;
    $$('.er-x', root).forEach(b => b.onclick = () => { resolve(b.closest('.err').dataset.k); renderErrors(root, ctx); });
    const cl = $('.er-clear', root); if (cl) cl.onclick = () => { if (cl.dataset.arm) { E = []; store('et-errors', E); renderErrors(root, ctx); } else { cl.dataset.arm = 1; cl.textContent = '¿Seguro? Pulsa otra vez'; } };
    const dr = $('.er-drill', root); if (dr) dr.onclick = () => { dr.disabled = true; renderDrill($('.er-drill-box', root), ctx, { limit: 8, onDone: r => { ctx.toast(`${r.fixed} de ${r.answered} corregidos ✓`); setTimeout(() => renderErrors(root, ctx), 1200); } }); };
  }

  return { LEVELS, idFor, record, level, vocabLevel, unitSummary, skillTotals, vocabTotals, miss, resolve, errors, errKey, errText, KIND, renderDrill, renderErrors };
})();
