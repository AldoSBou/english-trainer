/* ===========================================================
   translate.js — Traductor con voz
   Escribe en español o en inglés (detecta el idioma), traduce
   y reproduce el resultado con la voz natural de la app.
   Fuentes de traducción, por orden:
     1) glosario del curso (palabras de tus unidades, al instante)
     2) IA del Coach (Claude dentro de claude.ai o tu API key): traducción
        + alternativas + nota de uso + ejemplo
     3) MyMemory (servicio gratuito sin clave; solo fuera de claude.ai)
   Historial y "mis palabras" (para el repaso espaciado) en localStorage.
   =========================================================== */
window.Translator = (() => {
  const { $, $$, esc, norm } = Engine.util;
  const LS = { hist: 'et-tr-hist', mine: 'et-custom-cards' };
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };

  /* ---------- detección de idioma ---------- */
  const ES = new Set('el la los las un una unos unas de del que y o pero por para con sin es son está están soy eres ser estar hay no sí muy más como cuando donde porque también tengo tiene tienes quiero puedo hacer voy fue era mi tu su nuestro este esta esto ese esa eso ya aquí ahora hoy mañana ayer gracias hola bien mal siempre nunca algo nada alguien nadie todo todos cosa vez días semana año trabajo casa'.split(' '));
  const EN = new Set('the a an of and or but for with without is are am was were be been being not yes very more as when where because also i you he she it we they my your his her our their this that these those there here now today tomorrow yesterday thanks hello well always never something nothing someone nobody everything all thing time day week year work house have has do does did will would can could should to in on at from by about'.split(' '));
  function detect(t) {
    if (/[áéíóúñ¿¡]/i.test(t)) return 'es';
    const w = norm(t).split(' ').filter(Boolean); let es = 0, en = 0;
    w.forEach(x => { if (ES.has(x)) es++; if (EN.has(x)) en++; });
    if (es === en) { if (/\b(ción|mente|ando|iendo)\b|ción\b|dad\b/.test(t)) return 'es'; if (/\b(ing|tion|ly)\b|tion\b|ing\b/.test(t)) return 'en'; }
    return es > en ? 'es' : 'en';
  }

  /* ---------- glosario del curso ---------- */
  function glossary() {
    const out = [];
    for (const c of (window.COURSES || []).filter(c => c.available)) for (const u of c.units.filter(u => u.available)) {
      const d = UNIT_DATA[c.id + '/' + u.id]; if (!d) continue;
      d.sections.forEach(s => s.activities.forEach(a => { if (a.type === 'flashcards') a.cards.forEach(cd => cd.w.split(' / ').forEach(w => out.push({ w: w.trim(), def: cd.def, ex: cd.ex, unit: `${c.title} · U${u.number}` }))); }));
    }
    return out;
  }
  let GL = null;
  function lookup(text, from) {
    GL = GL || glossary(); const q = norm(text).replace(/^(to|a|an|the|el|la|los|las|un|una) /, '');
    if (!q || q.split(' ').length > 5) return [];
    if (from === 'en') return GL.filter(g => norm(g.w).replace(/^to /, '') === q || norm(g.w).includes(q) && q.length >= 4).slice(0, 6);
    return GL.filter(g => norm(g.def).split(/[,;/()]/).some(p => p.trim() === q) || (q.length >= 5 && norm(g.def).includes(q))).slice(0, 6);
  }

  /* ---------- fuentes ---------- */
  const inArtifact = () => !!(window.claude && window.claude.use);
  async function viaAI(text, from, to) {
    const AI = window.Coach && Coach.AI; if (!AI) throw { code: 'not_granted' };
    await AI.init(); if (AI.provider === 'local') throw { code: 'not_granted' };
    const tgt = to === 'en' ? 'English' : 'Spanish (Latin American, Peru)';
    const prompt = `Translate the following ${from === 'es' ? 'Spanish' : 'English'} text into natural, everyday ${tgt} for an adult intermediate learner. Keep the register (formal/informal) of the original.
Text: """${text.slice(0, 1500)}"""
Reply with ONLY a JSON object:
{"translation": "<best natural translation>",
 "alternatives": ["<up to 2 other natural ways to say it in ${tgt}, or fewer>"],
 "note": "<one short usage/grammar/register note in Spanish, max 25 words, or empty string>",
 "example": "<one short example sentence in English using the key expression, or empty string>"}`;
    return AI.chat([{ role: 'user', content: prompt }], { json: true, tier: 'quick' });
  }
  async function viaMyMemory(text, from, to) {
    if (inArtifact()) throw { code: 'blocked' };
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}&langpair=${from}|${to}`);
    const j = await r.json(); const t = j?.responseData?.translatedText;
    if (!t || j.responseStatus !== 200 || /MYMEMORY WARNING/i.test(t)) throw { code: 'upstream_error' };
    return { translation: t, alternatives: [], note: '', example: '', src: 'MyMemory' };
  }

  /* ---------- voz ---------- */
  const esVoice = () => { if (!('speechSynthesis' in window)) return null; const vs = speechSynthesis.getVoices().filter(v => /^es/i.test(v.lang)); return vs.find(v => /es-(PE|MX|US|419)/i.test(v.lang) && /natural|google|neural/i.test(v.name)) || vs.find(v => /natural|google|neural/i.test(v.name)) || vs[0] || null; };
  function sayEs(text) { if (!('speechSynthesis' in window)) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); const v = esVoice(); u.lang = v?.lang || 'es-ES'; if (v) u.voice = v; u.rate = 0.98; speechSynthesis.speak(u); }

  /* ---------- UI ---------- */
  const sents = t => String(t).match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(x => x.trim()).filter(Boolean) || [String(t)];
  function render(view, ctx) {
    const hist = load(LS.hist, []), mine = load(LS.mine, []);
    let dir = 'auto', last = null, stepI = 0;
    view.innerHTML = `<nav class="crumbs"><a href="#/">Inicio</a><span class="sep">›</span><span>Traductor</span></nav>
      <div class="unit-head compact"><div class="eyebrow">Herramienta · traduce y escucha</div><h1>Traductor con voz</h1><p class="muted small">Escribe en español o en inglés; te lo traduce y te lo lee con voz natural.</p></div>
      <div class="card"><div class="row between" style="margin-bottom:8px"><div class="sub" style="margin:0"><button class="on" data-d="auto">Auto</button><button data-d="es">ES → EN</button><button data-d="en">EN → ES</button></div><span class="small muted" id="trSrc"></span></div>
        <textarea id="trIn" placeholder="Escribe una palabra, una frase o un párrafo…&#10;Ej.: ¿Cómo se dice «estar a la altura de un reto»?" style="min-height:90px"></textarea>
        <div class="row" style="margin-top:8px"><button class="btn" id="trGo">Traducir</button><button class="btn ghost" id="trHearIn" title="Escuchar lo que escribí">🔊 Oír original</button><button class="lnk" id="trClear">Limpiar</button><span class="small muted" style="margin-left:auto">Ctrl/⌘ + Enter</span></div>
        <div id="trOut"></div>
      </div>
      <div class="grid2">
        <div class="card"><div class="eyebrow">Mis palabras</div><h3>Guardadas para repasar</h3><p class="small muted intro">Al guardar una traducción entra en tu <a href="#/method/srs">Repaso inteligente</a> junto con el vocabulario del curso.</p><div id="trMine"></div></div>
        <div class="card"><div class="eyebrow">Historial</div><h3>Últimas traducciones</h3><div id="trHist"></div></div>
      </div>`;
    const inp = $('#trIn', view), out = $('#trOut', view);
    $$('.sub button', view).forEach(b => b.onclick = () => { $$('.sub button', view).forEach(x => x.classList.toggle('on', x === b)); dir = b.dataset.d; });
    $('#trClear', view).onclick = () => { inp.value = ''; out.innerHTML = ''; inp.focus(); };
    $('#trHearIn', view).onclick = () => { const t = inp.value.trim(); if (!t) return; (detect(t) === 'es' ? sayEs : x => ctx.say(x, 1))(t); };
    inp.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') go(); });
    $('#trGo', view).onclick = go;

    function speakSide(text, lang, rate = 1) { lang === 'en' ? ctx.say(text, rate) : sayEs(text); }
    function drawMine() {
      $('#trMine', view).innerHTML = mine.length ? `<div class="tags">${mine.slice(0, 40).map((m, i) => `<span class="tag mine" data-i="${i}" title="${esc(m.def)}">${esc(m.w)} <button class="x" aria-label="Quitar">✕</button></span>`).join('')}</div>` : '<p class="small muted">Todavía no has guardado palabras.</p>';
      $$('#trMine .tag', view).forEach(t => { t.onclick = e => { if (e.target.classList.contains('x')) { mine.splice(+t.dataset.i, 1); save(LS.mine, mine); drawMine(); } else ctx.say(mine[+t.dataset.i].w); }; });
    }
    function drawHist() {
      $('#trHist', view).innerHTML = hist.length ? hist.slice(0, 12).map((h, i) => `<button class="hist-item" data-i="${i}"><span>${esc(h.src)}</span><b>${esc(h.tr)}</b></button>`).join('') + '<div class="row" style="margin-top:8px"><button class="lnk" id="trHistClear">Vaciar historial</button></div>' : '<p class="small muted">Aquí aparecerán tus traducciones.</p>';
      $$('.hist-item', view).forEach(b => b.onclick = () => { const h = hist[+b.dataset.i]; inp.value = h.src; dir = 'auto'; $$('.sub button', view).forEach(x => x.classList.toggle('on', x.dataset.d === 'auto')); show({ translation: h.tr, alternatives: [], note: '', example: '' }, h.src, h.from, h.to, h.via, []); });
      const c = $('#trHistClear', view); if (c) c.onclick = () => { hist.length = 0; save(LS.hist, hist); drawHist(); };
    }
    drawMine(); drawHist();

    async function go() {
      const text = inp.value.trim(); if (!text) return;
      const from = dir === 'auto' ? detect(text) : dir, to = from === 'es' ? 'en' : 'es';
      $('#trSrc', view).textContent = (from === 'es' ? 'Español → Inglés' : 'Inglés → Español') + (dir === 'auto' ? ' (detectado)' : '');
      const gl = lookup(text, from);
      out.innerHTML = `<div class="tr-wait small muted">Traduciendo…</div>`; $('#trGo', view).disabled = true;
      let res = null, via = '';
      try { res = await viaAI(text, from, to); via = 'IA'; }
      catch (e) { try { res = await viaMyMemory(text, from, to); via = 'MyMemory'; } catch (e2) { res = null; } }
      $('#trGo', view).disabled = false;
      if (!res && !gl.length) { out.innerHTML = `<div class="fb show wrong">No pude traducir ahora mismo. ${inArtifact() ? 'Acepta el permiso de IA cuando aparezca, o' : 'Revisa tu conexión, o'} configura una API key en <a href="#/coach/settings">Coach › Ajustes IA</a>.</div>`; return; }
      if (!res) res = { translation: gl[0].w, alternatives: [], note: 'Del vocabulario del curso.', example: gl[0].ex };
      show(res, text, from, to, via, gl);
      hist.unshift({ src: text.slice(0, 200), tr: String(res.translation).slice(0, 300), from, to, via, date: Date.now() }); hist.splice(20); save(LS.hist, hist); drawHist();
      ctx.score(true, 2);
    }
    function show(res, text, from, to, via, gl) {
      last = res; stepI = 0;
      const tr = String(res.translation || '').trim(), enText = to === 'en' ? tr : text, single = sents(tr).length < 2;
      out.innerHTML = `<div class="tr-result">
        <div class="eyebrow">${to === 'en' ? 'En inglés' : 'En español'} ${via ? `<span class="muted">· ${esc(via)}</span>` : ''}</div>
        <div class="tr-text" id="trText">${sents(tr).map(x => `<span class="ms">${esc(x)}</span>`).join(' ')}</div>
        <div class="row" style="margin-top:10px"><button class="btn tr-say">🔊 Escuchar</button><button class="btn ghost tr-slow">🐢 Lenta</button>${single ? '' : '<button class="btn ghost tr-step">Frase a frase</button>'}${to === 'en' ? '<button class="btn ghost tr-shadow">🗣 Shadowing</button>' : ''}<button class="btn ghost tr-copy">Copiar</button><button class="btn ghost tr-save">＋ Guardar en mi repaso</button></div>
        ${res.alternatives?.length ? `<div class="tr-alts"><div class="eyebrow">También se puede decir</div>${res.alternatives.map(a => `<button class="chip small alt">${esc(a)}</button>`).join(' ')}</div>` : ''}
        ${res.note ? `<p class="small tr-note">💡 ${esc(res.note)}</p>` : ''}
        ${res.example ? `<p class="small"><b>Ejemplo:</b> <span class="ms">${esc(res.example)}</span></p>` : ''}
        ${gl.length ? `<div class="tr-gl"><div class="eyebrow">En tu curso</div>${gl.map(g => `<div class="gl-item"><b class="ms">${esc(g.w)}</b> — ${esc(g.def)} <span class="muted small">· ${esc(g.unit)}</span>${g.ex ? `<div class="small muted ms">“${esc(g.ex)}”</div>` : ''}</div>`).join('')}</div>` : ''}
      </div>`;
      const sayText = t => (to === 'en' ? ctx.say(t, 1) : sayEs(t));
      $('.tr-say', out).onclick = () => sayText(tr);
      $('.tr-slow', out).onclick = () => (to === 'en' ? ctx.say(tr, 0.75) : sayEs(tr));
      const st = $('.tr-step', out); if (st) st.onclick = () => { const ss = $$('#trText .ms', out); ss.forEach(x => x.classList.remove('on')); const el = ss[stepI % ss.length]; el.classList.add('on'); sayText(el.textContent); stepI++; };
      const sh = $('.tr-shadow', out); if (sh) sh.onclick = () => { sessionStorage.setItem('et-shadow-text', enText); location.hash = '#/method/shadow'; };
      $('.tr-copy', out).onclick = () => { navigator.clipboard?.writeText(tr).then(() => ctx.toast('Copiado')); };
      $('.tr-save', out).onclick = () => { const w = to === 'en' ? tr : text, def = to === 'en' ? text : tr; if (mine.some(m => norm(m.w) === norm(w))) { ctx.toast('Ya estaba guardada'); return; } mine.unshift({ w, def, ex: res.example || '', date: Date.now() }); mine.splice(200); save(LS.mine, mine); drawMine(); ctx.toast('Guardada en tu repaso'); ctx.score(true, 4); };
      $$('.alt', out).forEach(b => b.onclick = () => sayText(b.textContent));
      $$('.ms', out).forEach(el => { if (!el.onclick) el.onclick = () => { const t = el.textContent.replace(/^“|”$/g, ''); (/[áéíóúñ¿¡]/.test(t) || (to === 'es' && el.closest('#trText'))) ? sayEs(t) : ctx.say(t, 0.95); }; });
      if (to === 'en') setTimeout(() => ctx.say(tr, 1), 150);
    }
    inp.focus();
  }
  return { render, detect, mine: () => load(LS.mine, []) };
})();
