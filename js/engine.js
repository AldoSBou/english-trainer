/* ===========================================================
   engine.js — renderizadores de actividades
   Cada actividad es un objeto { type, ...datos } dentro de una
   unidad (ver units/unit1.js). Para crear un tipo nuevo:
   Engine.register('miTipo', (root, act, ctx) => { ... })
   ctx = { score(good, pts), say(text, rate, voice), unit }
   =========================================================== */
window.Engine = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
  const blank = s => esc(s).replace('___', '<span class="blank">…</span>');
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  function diffWords(a, b) {
    const A = norm(a).split(' '), B = norm(b).split(' '); let out = '';
    for (let i = 0; i < Math.max(A.length, B.length); i++) {
      if (A[i] === B[i]) out += esc(B[i] || '') + ' ';
      else { if (A[i]) out += `<span class="del">${esc(A[i])}</span> `; if (B[i]) out += `<span class="ins">${esc(B[i])}</span> `; }
    }
    return out;
  }
  const head = (act) => `${act.eyebrow ? `<div class="eyebrow">${act.eyebrow}</div>` : ''}${act.title ? `<h2>${act.title}</h2>` : ''}${act.intro ? `<p class="muted small intro">${act.intro}</p>` : ''}`;

  /* ---------- MCQ genérico (reutilizado por varios tipos) ---------- */
  function mcq(root, items, ctx, opts = {}) {
    let i = 0, correct = 0, round = opts.pool ? pick(items, opts.pool) : items.slice();
    const pts = opts.pts || 10;
    function draw() {
      if (i >= round.length) {
        root.innerHTML = `<div class="hint"><b>Ronda terminada:</b> ${correct}/${round.length} correctas.</div><div class="row" style="margin-top:10px"><button class="btn">Otra ronda</button></div>`;
        $('.btn', root).onclick = () => { i = 0; correct = 0; round = opts.pool ? pick(items, opts.pool) : shuffle(items); draw(); };
        return;
      }
      const it = round[i];
      root.innerHTML = `<p class="small muted">${i + 1} / ${round.length}</p><div class="q">${it.q}</div>${it.ctx ? `<p class="small muted" style="margin:-6px 0 10px">${it.ctx}</p>` : ''}<div class="opts"></div><div class="fb"></div><div class="row" style="margin-top:10px"><button class="btn nx" hidden>Siguiente →</button></div>`;
      const box = $('.opts', root);
      shuffle(it.opts).forEach(o => {
        const b = el('button', 'opt', o);
        b.onclick = () => {
          if (box.dataset.done) return; box.dataset.done = 1;
          const good = o === it.a; b.classList.add(good ? 'ok' : 'bad');
          if (!good) { const c = $$('.opt', box).find(x => x.innerHTML === it.a); if (c) c.classList.add('ok'); }
          const fb = $('.fb', root); fb.className = 'fb show ' + (good ? 'good' : 'wrong'); fb.innerHTML = (good ? '✔ ' : '✘ ') + (it.why || '');
          if (good) correct++; ctx.score(good, pts); if (ctx.answer) ctx.answer({ kind: 'mcq', good, item: { q: it.q, opts: it.opts, a: it.a, why: it.why || '', ctx: it.ctx || '' }, chosen: o });
          const nx = $('.nx', root); nx.hidden = false; nx.focus();
        };
        box.appendChild(b);
      });
      $('.nx', root).onclick = () => { i++; draw(); };
    }
    draw();
  }

  const R = {};

  /* notes: HTML libre (tablas, explicaciones) */
  R.notes = (root, act) => { root.innerHTML = `<div class="card">${head(act)}${act.html}</div>`; };

  /* flashcards */
  R.flashcards = (root, act, ctx) => {
    const cards = shuffle(act.cards); let ci = 0;
    root.innerHTML = `<div class="card">${head(act)}
      <div class="flash"><div class="inner">
        <div class="face front"><div class="eyebrow f-cat"></div><div class="word f-word"></div><p class="muted small">toca para ver el significado</p></div>
        <div class="face back"><p class="f-def" style="font-weight:700"></p><p class="small f-ex"></p><p class="small muted f-ask"></p></div>
      </div></div>
      <div class="row between" style="margin-top:14px"><div class="row"><button class="btn ghost f-say">🔊 Escuchar</button><button class="btn ghost f-prev">← Anterior</button><button class="btn f-next">Siguiente →</button></div><span class="small muted f-count"></span></div></div>`;
    const flash = $('.flash', root);
    const draw = () => { const c = cards[ci]; flash.classList.remove('flipped'); $('.f-cat', root).textContent = c.cat || ''; $('.f-word', root).textContent = c.w; $('.f-def', root).textContent = c.def; $('.f-ex', root).textContent = c.ex ? '“' + c.ex + '”' : ''; $('.f-ask', root).textContent = c.ask || ''; $('.f-count', root).textContent = (ci + 1) + ' / ' + cards.length; };
    flash.onclick = () => flash.classList.toggle('flipped');
    $('.f-next', root).onclick = () => { ci = (ci + 1) % cards.length; draw(); };
    $('.f-prev', root).onclick = () => { ci = (ci - 1 + cards.length) % cards.length; draw(); };
    $('.f-say', root).onclick = e => { e.stopPropagation(); const c = cards[ci]; ctx.say((c.say || c.w.replace(' / ', ', ')) + '. ' + (c.ex || '')); };
    draw();
  };

  /* match: pares [izquierda, derecha] */
  R.match = (root, act, ctx) => {
    root.innerHTML = `<div class="card">${head(act)}<div class="match"></div><div class="row" style="margin-top:12px"><button class="btn ghost m-new">Nueva ronda</button><span class="small muted m-info"></span></div></div>`;
    const m = $('.match', root); let sel = null, left = 0;
    function round() {
      const set = pick(act.pairs, act.round || 6); left = set.length; sel = null; $('.m-info', root).textContent = ''; m.innerHTML = '';
      const L = el('div'), Rc = el('div');
      shuffle(set.map(p => p[0])).forEach(w => { const b = el('button', 'chip', esc(w)); b.dataset.k = w; b.onclick = () => { $$('.chip', L).forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = b; }; L.appendChild(b); });
      shuffle(set.map(p => p[1])).forEach(w => { const b = el('button', 'chip', esc(w)); b.onclick = () => {
        if (!sel) return; const good = set.find(p => p[0] === sel.dataset.k)[1] === w; ctx.score(good, 8);
        if (good) { sel.classList.add('done'); b.classList.add('done'); ctx.say(sel.dataset.k + ', ' + w); sel = null; if (!--left) $('.m-info', root).textContent = '¡Completado! Pulsa "Nueva ronda".'; }
        else { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 300); }
      }; Rc.appendChild(b); });
      m.append(L, Rc);
    }
    $('.m-new', root).onclick = round; round();
  };

  /* mcq: items [{q,opts,a,why}] o build() que los genera */
  R.mcq = (root, act, ctx) => {
    root.innerHTML = `<div class="card">${head(act)}<div class="mcq"></div></div>`;
    const items = typeof act.build === 'function' ? act.build({ shuffle, pick, esc, blank }) : act.items.map(it => ({ ...it, q: it.blank ? blank(it.q) : it.q }));
    mcq($('.mcq', root), items, ctx, { pool: act.pool, pts: act.pts });
  };

  /* dictation */
  R.dictation = (root, act, ctx) => {
    let q = shuffle(act.sentences), di = 0;
    root.innerHTML = `<div class="card">${head(act)}
      <div class="row" style="margin-bottom:12px"><button class="btn d-play">▶ Reproducir</button><label class="small">Velocidad <select class="d-rate"><option value="0.75">lenta</option><option value="0.9" selected>normal</option><option value="1.05">rápida</option></select></label><span class="small muted d-count"></span></div>
      <input type="text" class="d-in" placeholder="Escribe la frase aquí…" autocomplete="off">
      <div class="row" style="margin-top:10px"><button class="btn d-check">Comprobar</button><button class="btn ghost d-next">Siguiente frase</button></div><div class="fb"></div>
      ${ctx.canSpeak ? '' : '<p class="small muted" style="margin-top:8px">Tu navegador no tiene voz sintética. Prueba en Chrome o Edge.</p>'}</div>`;
    const inp = $('.d-in', root), fb = $('.fb', root);
    const draw = () => { $('.d-count', root).textContent = 'Frase ' + (di + 1) + ' de ' + q.length; inp.value = ''; fb.className = 'fb'; };
    $('.d-play', root).onclick = () => ctx.say(q[di], parseFloat($('.d-rate', root).value));
    $('.d-check', root).onclick = () => { const t = inp.value; if (!t.trim()) return; const good = norm(t) === norm(q[di]); fb.className = 'fb show ' + (good ? 'good' : 'wrong'); fb.innerHTML = good ? '✔ Perfecto: <b>' + esc(q[di]) + '</b>' : '✘ Compara (rojo = lo tuyo, verde = correcto):<br><span class="diff">' + diffWords(t, q[di]) + '</span>'; ctx.score(good, 12); if (ctx.answer) ctx.answer({ kind: 'dictation', good, item: { s: q[di] }, typed: t }); };
    $('.d-next', root).onclick = () => { di = (di + 1) % q.length; if (!di) q = shuffle(act.sentences); draw(); };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') $('.d-check', root).click(); });
    draw();
  };

  /* dialog: lines [[speaker,text]] + questions */
  R.dialog = (root, act, ctx) => {
    root.innerHTML = `<div class="card">${head(act)}<div class="row"><button class="btn dl-play">▶ Escuchar diálogo</button><button class="btn ghost dl-show">Ver transcripción</button></div><div class="dl-script small" style="margin-top:10px" hidden></div><div class="mcq" style="margin-top:14px"></div></div>`;
    const speakers = [...new Set(act.lines.map(l => l[0]))];
    $('.dl-play', root).onclick = () => ctx.sayLines(act.lines.map(l => [speakers.indexOf(l[0]), l[1]]));
    $('.dl-show', root).onclick = () => { const s = $('.dl-script', root); s.hidden = !s.hidden; s.innerHTML = act.lines.map(l => `<b>${esc(l[0])}:</b> ${esc(l[1])}`).join('<br>'); };
    mcq($('.mcq', root), act.questions, ctx);
  };

  /* speaking: challenges [{t,task,model,tags}] */
  R.speaking = (root, act, ctx) => {
    let si = 0, tInt = null, rec = null;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    root.innerHTML = `<div class="card">${act.eyebrow ? `<div class="eyebrow">${act.eyebrow}</div>` : ''}<h2 class="sp-title"></h2><p class="sp-task" style="margin:8px 0 10px"></p><div class="hint small sp-model"></div>
      <div class="row between" style="margin-top:14px"><div class="row"><div class="timer sp-timer">1:00</div><button class="btn sp-start">Empezar 60 s</button><button class="btn ghost sp-mic" ${SR ? '' : 'disabled title="Reconocimiento de voz no disponible (usa Chrome)"'}>🎤 Grabar y transcribir</button></div><button class="btn ghost sp-next">Otro reto →</button></div>
      <p class="small muted" style="margin-top:8px">Objetivo: usar estas palabras. Se marcan en verde cuando aparecen en la transcripción (o escríbelas tú).</p><div class="tags sp-tags" style="margin-top:8px"></div>
      <textarea class="sp-text" style="margin-top:12px" placeholder="Transcripción (o escribe lo que dijiste)…"></textarea>
      <div class="row" style="margin-top:8px"><button class="btn ghost sp-check">Contar palabras objetivo</button><span class="small sp-result"></span></div></div>`;
    const T = $('.sp-text', root), timer = $('.sp-timer', root), mic = $('.sp-mic', root);
    const draw = () => { const s = act.challenges[si]; $('.sp-title', root).textContent = s.t; $('.sp-task', root).textContent = s.task; $('.sp-model', root).textContent = s.model; $('.sp-tags', root).innerHTML = s.tags.map(t => `<span class="tag" data-t="${esc(t)}">${esc(t)}</span>`).join(''); T.value = ''; $('.sp-result', root).textContent = ''; clearInterval(tInt); timer.textContent = '1:00'; };
    const check = () => { const txt = T.value.toLowerCase(); let hit = 0; const tags = $$('.tag', root); tags.forEach(t => { const h = txt.includes(t.dataset.t.toLowerCase()); t.classList.toggle('hit', h); if (h) hit++; }); $('.sp-result', root).textContent = hit + ' de ' + tags.length + ' palabras objetivo'; if (hit >= 3) ctx.score(true, hit * 4); };
    $('.sp-next', root).onclick = () => { si = (si + 1) % act.challenges.length; draw(); };
    $('.sp-start', root).onclick = () => { clearInterval(tInt); let n = 60; timer.textContent = '1:00'; tInt = setInterval(() => { n--; timer.textContent = '0:' + String(n).padStart(2, '0'); if (n <= 0) { clearInterval(tInt); ctx.toast('¡Tiempo! Ahora comprueba las palabras.'); } }, 1000); };
    $('.sp-check', root).onclick = check;
    mic.onclick = () => {
      if (rec) { rec.stop(); return; }
      rec = new SR(); rec.lang = 'en-US'; rec.continuous = true; rec.interimResults = true; let fin = '';
      rec.onresult = e => { let inter = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) fin += r[0].transcript + ' '; else inter += r[0].transcript; } T.value = fin + inter; };
      rec.onend = () => { rec = null; mic.textContent = '🎤 Grabar y transcribir'; check(); };
      rec.onerror = () => { rec = null; mic.textContent = '🎤 Grabar y transcribir'; ctx.toast('No se pudo usar el micrófono'); };
      rec.start(); mic.textContent = '⏹ Detener';
    };
    draw();
  };

  /* stress: pares [etiqueta visible, texto a pronunciar] */
  R.stress = (root, act, ctx) => {
    root.innerHTML = `<div class="card">${head(act)}<div class="opts"></div></div>`;
    const box = $('.opts', root);
    act.pairs.forEach(p => { const b = el('button', 'opt', '🔊 ' + esc(p[0])); b.onclick = () => ctx.say(p[1], 0.85); box.appendChild(b); });
  };

  /* reading: paragraphs + main ideas + infer + think */
  R.reading = (root, act, ctx) => {
    root.innerHTML = `<div class="card">${head(act)}<div class="article">${act.paragraphs.map((p, i) => `<p><span class="pnum">${i + 1}</span>${p}</p>`).join('')}</div>
      ${act.main ? '<h3 style="margin:20px 0 8px">A · Main ideas — ¿qué párrafo dice esto?</h3><div class="r-main"></div>' : ''}
      ${act.infer ? '<h3 style="margin:20px 0 8px">B · Infer meaning — elige el significado según el contexto</h3><div class="r-infer"></div>' : ''}
      ${act.think ? `<h3 style="margin:20px 0 8px">C · Think critically</h3><p class="small">${act.think}</p><textarea style="margin-top:8px" placeholder="I think…"></textarea>` : ''}</div>`;
    if (act.main) mcq($('.r-main', root), act.main, ctx);
    if (act.infer) mcq($('.r-infer', root), act.infer, ctx);
  };

  /* fix: corrección de frases [{bad,good,why}] */
  R.fix = (root, act, ctx) => {
    root.innerHTML = `<div class="card">${head(act)}${act.items.map((f, i) => `<div class="item"><p class="small muted">Frase ${i + 1}</p><p style="font-weight:700;margin:4px 0 8px">“${esc(f.bad)}”</p><input type="text" placeholder="Escribe la versión corregida…" autocomplete="off"><div class="row" style="margin-top:8px"><button class="btn ghost" data-i="${i}">Comprobar</button></div><div class="fb"></div></div>`).join('')}</div>`;
    $$('button[data-i]', root).forEach(b => b.onclick = () => {
      const f = act.items[+b.dataset.i], item = b.closest('.item'), v = $('input', item).value; if (!v.trim()) return;
      const good = norm(v) === norm(f.good); const fb = $('.fb', item); fb.className = 'fb show ' + (good ? 'good' : 'wrong');
      fb.innerHTML = (good ? '✔ ¡Exacto! ' : 'Versión sugerida: <b>' + esc(f.good) + '</b><br><span class="diff">' + diffWords(v, f.good) + '</span><br>') + f.why; ctx.score(good, 15); if (ctx.answer) ctx.answer({ kind: 'fix', good, item: { bad: f.bad, good: f.good, why: f.why || '' }, typed: v });
    });
  };

  /* soft: reescritura que debe contener un patrón [{h,a}] + regex */
  R.soft = (root, act, ctx) => {
    const re = act.pattern || /\b(a bit|a little)\b/;
    root.innerHTML = `<div class="card">${head(act)}${act.explain ? `<p style="margin:6px 0 12px">${act.explain}</p>` : ''}${act.items.map((s, i) => `<div class="item"><p style="font-weight:700">${esc(s.h)}</p><input type="text" placeholder="Versión reescrita…" autocomplete="off"><div class="row" style="margin-top:8px"><button class="btn ghost" data-i="${i}">Comprobar</button></div><div class="fb"></div></div>`).join('')}</div>`;
    $$('button[data-i]', root).forEach(b => b.onclick = () => {
      const s = act.items[+b.dataset.i], item = b.closest('.item'), v = $('input', item).value.toLowerCase(); if (!v.trim()) return;
      const good = re.test(v); const fb = $('.fb', item); fb.className = 'fb show ' + (good ? 'good' : 'wrong');
      fb.innerHTML = (good ? '✔ Mucho mejor. Ejemplo: <b>' : '✘ ' + (act.missing || 'Falta el patrón pedido') + '. Ejemplo: <b>') + esc(s.a) + '</b>'; ctx.score(good, 8); if (ctx.answer) ctx.answer({ kind: 'soft', good, item: { h: s.h, a: s.a, pattern: re.source, flags: re.flags, missing: act.missing || '', explain: act.explain || '' }, typed: v });
    });
  };

  /* comment: texto libre con checklist automática */
  R.comment = (root, act, ctx) => {
    root.innerHTML = `<div class="card">${head(act)}<textarea style="min-height:160px" placeholder="${esc(act.placeholder || '')}"></textarea>
      <div class="row between" style="margin-top:6px"><span class="small muted wc">0 palabras</span><button class="btn ghost scan">Analizar mi texto</button></div>
      <div style="margin-top:12px">${act.checks.map((c, i) => `<label class="check"><input type="checkbox" data-c="${i}"><span>${c.label}</span></label>`).join('')}</div><div class="fb"></div></div>`;
    const T = $('textarea', root), min = act.min || 60, max = act.max || 100;
    T.addEventListener('input', () => { const n = T.value.trim().split(/\s+/).filter(Boolean).length; $('.wc', root).textContent = n + ' palabras' + (n < min ? ` (mínimo ${min})` : n > max ? ` (máximo ${max})` : ' ✔'); });
    $('.scan', root).onclick = () => {
      const t = T.value.toLowerCase(); let n = 0;
      act.checks.forEach((c, i) => { const ok = c.re ? c.re.test(t) : c.words.some(w => t.includes(w)); $(`input[data-c="${i}"]`, root).checked = ok; if (ok) n++; });
      const need = act.need || act.checks.length - 1, fb = $('.fb', root); fb.className = 'fb show ' + (n >= need ? 'good' : 'wrong');
      fb.innerHTML = n >= need ? `✔ Cumples ${n} de ${act.checks.length} puntos. Buen texto.` : `Cumples ${n} de ${act.checks.length}. Revisa los que quedan sin marcar y vuelve a analizar.`; ctx.score(n >= need, 20);
    };
  };

  /* order: dialogs [[líneas en orden]] */
  R.order = (root, act, ctx) => {
    let oi = 0;
    root.innerHTML = `<div class="card">${head(act)}<div class="o-box"></div></div>`;
    const box = $('.o-box', root);
    function draw() {
      const lines = act.dialogs[oi];
      box.innerHTML = `<p class="small muted">Diálogo ${oi + 1} de ${act.dialogs.length}</p><div class="seq"></div><p class="small muted" style="margin:8px 0 4px">Líneas disponibles (toca para mover):</p><div class="pool"></div><div class="row" style="margin-top:10px"><button class="btn o-check">Comprobar</button><button class="btn ghost o-reset">Reiniciar</button><button class="btn ghost o-next">Otro diálogo</button></div><div class="fb"></div>`;
      const pool = $('.pool', box), seq = $('.seq', box);
      shuffle(lines.map((l, i) => i)).forEach(i => { const b = el('button', 'tok', esc(lines[i])); b.dataset.i = i; b.onclick = () => (b.parentElement === pool ? seq : pool).appendChild(b); pool.appendChild(b); });
      $('.o-check', box).onclick = () => {
        const got = $$('.tok', seq).map(b => +b.dataset.i), good = got.length === lines.length && got.every((v, i) => v === i), fb = $('.fb', box);
        fb.className = 'fb show ' + (good ? 'good' : 'wrong');
        fb.innerHTML = good ? '✔ Orden perfecto. Escúchalo: <button class="btn ghost o-say">🔊</button>' : '✘ Todavía no. Pista: el diálogo empieza con el saludo o la pregunta, y cada respuesta va justo después.';
        ctx.score(good, 15); if (good) $('.o-say', fb).onclick = () => ctx.sayLines(lines.map((l, i) => [i % 2, l.replace(/^[^:]+:\s*/, '')]));
      };
      $('.o-reset', box).onclick = draw; $('.o-next', box).onclick = () => { oi = (oi + 1) % act.dialogs.length; draw(); };
    }
    draw();
  };

  /* ---------- Ejercicios de producción (se generan solos desde flashcards y dictados) ---------- */
  const STOP = new Set('the a an and or but so because of to in on at for with from by about as into like through after over between out against during without before under around among is are was were be been being have has had do does did will would can could should may might must this that these those there here it its they them their he she his her we our you your i my me not no yes very really just also then than when while where which who what how if'.split(' '));
  const variants = w => String(w).split(/\s*\/\s*/).map(x => x.replace(/\(.*?\)/g, '').trim()).filter(Boolean);
  const reEsc = v => v.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  const blankWord = (ex, w) => { for (const v of variants(w)) { const re = new RegExp('\\b' + reEsc(v) + '\\b', 'i'); if (re.test(ex)) return ex.replace(re, '___'); } return null; };

  /* recall: recuperación escrita · definición (+ ejemplo con hueco) → escribe la palabra */
  R.recall = (root, act, ctx) => {
    const cards = act.cards.filter(c => c.w && c.def); let round = pick(cards, act.pool || 8), i = 0, ok = 0, hinted = false;
    root.innerHTML = `<div class="card">${head(act)}<div class="rc"></div></div>`;
    const box = $('.rc', root);
    function draw() {
      if (i >= round.length) { box.innerHTML = `<div class="hint"><b>Ronda terminada:</b> ${ok}/${round.length} recuperadas de memoria.</div><div class="row" style="margin-top:10px"><button class="btn">Otra ronda</button></div>`; $('.btn', box).onclick = () => { round = pick(cards, act.pool || 8); i = 0; ok = 0; draw(); }; return; }
      const c = round[i], gap = c.ex ? blankWord(c.ex, c.w) : null; hinted = false; delete box.dataset.done;
      box.innerHTML = `<p class="small muted">${i + 1} / ${round.length}${c.cat ? ' · ' + esc(c.cat) : ''}</p><div class="q">${esc(c.def)}</div>${gap ? `<p class="rc-ex">“${esc(gap).replace('___', '<span class="blank">…</span>')}”</p>` : ''}
        <input type="text" class="rc-in" placeholder="Escribe la palabra o expresión en inglés…" autocomplete="off" autocapitalize="off" spellcheck="false">
        <div class="row" style="margin-top:10px"><button class="btn rc-check">Comprobar</button><button class="btn ghost rc-hint">Pista</button><button class="lnk rc-show">No la sé</button><span class="small muted rc-h" style="margin-left:auto"></span></div><div class="fb"></div><div class="row" style="margin-top:10px"><button class="btn rc-next" hidden>Siguiente →</button></div>`;
      const inp = $('.rc-in', box), fb = $('.fb', box), nx = $('.rc-next', box); inp.focus();
      const vs = variants(c.w), main = vs[0] || c.w;
      const finish = (good, typed) => { if (box.dataset.done) return; box.dataset.done = 1; fb.className = 'fb show ' + (good ? 'good' : 'wrong'); fb.innerHTML = (good ? '✔ <b>' + esc(main) + '</b>' + (hinted ? ' (con pista)' : '') : '✘ Era <b>' + esc(main) + '</b>' + (typed ? ': <span class="diff">' + diffWords(typed, main) + '</span>' : '')) + (c.ex ? '<br><span class="small">“' + esc(c.ex) + '”</span>' : ''); if (good) ok++; ctx.score(good, hinted ? 6 : 12); if (ctx.answer) ctx.answer({ kind: 'recall', good, item: { w: c.w, def: c.def, ex: c.ex || '', cat: c.cat || '' }, typed }); ctx.say(main + (c.ex ? '. ' + c.ex : '')); nx.hidden = false; nx.focus(); };
      $('.rc-check', box).onclick = () => { const t = inp.value; if (!t.trim()) return; finish(vs.some(v => norm(v) === norm(t)), t); };
      $('.rc-hint', box).onclick = () => { hinted = true; const h = $('.rc-h', box), n = (+h.dataset.n || 0) + 1; h.dataset.n = n; h.textContent = main.slice(0, Math.min(n, main.length - 1)) + '… (' + main.length + ' letras)'; };
      $('.rc-show', box).onclick = () => finish(false, inp.value);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { if (box.dataset.done) nx.click(); else $('.rc-check', box).click(); } });
      nx.onclick = () => { i++; draw(); };
    }
    draw();
  };

  /* cloze: escucha la frase y completa las palabras que faltan */
  R.cloze = (root, act, ctx) => {
    const bank = act.sentences.filter(s => s.split(' ').length >= 5); let q = shuffle(bank), i = 0;
    root.innerHTML = `<div class="card">${head(act)}<div class="cz"></div></div>`;
    const box = $('.cz', root);
    function draw() {
      const s = q[i % q.length], words = s.split(' '); delete box.dataset.done;
      const cand = words.map((w, k) => ({ w, k, core: norm(w) })).filter(x => x.core.length >= 4 && !STOP.has(x.core) && !/\d/.test(x.core));
      const src = cand.length ? cand : words.map((w, k) => ({ w, k }));
      const gaps = new Set(pick(src, Math.min(act.gaps || 2, src.length)).map(x => x.k));
      box.innerHTML = `<p class="small muted">Frase ${(i % q.length) + 1} de ${q.length}</p><div class="row" style="margin-bottom:12px"><button class="btn cz-play">▶ Escuchar</button><button class="btn ghost cz-slow">🐢 Lenta</button></div>
        <p class="cz-text">${words.map((w, k) => gaps.has(k) ? `<input type="text" class="cz-in" data-k="${k}" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:${Math.max(5, norm(w).length + 2)}ch" aria-label="hueco">` : esc(w)).join(' ')}</p>
        <div class="row" style="margin-top:10px"><button class="btn cz-check">Comprobar</button><button class="btn ghost cz-next">Siguiente →</button></div><div class="fb"></div>`;
      $('.cz-play', box).onclick = () => ctx.say(s, 1); $('.cz-slow', box).onclick = () => ctx.say(s, 0.75);
      const first = $('.cz-in', box); if (first) first.focus();
      $('.cz-check', box).onclick = () => {
        if (box.dataset.done) return; const ins = $$('.cz-in', box); if (ins.some(x => !x.value.trim())) { ctx.toast('Completa todos los huecos'); return; } box.dataset.done = 1;
        let allOk = true; ins.forEach(x => { const want = norm(words[+x.dataset.k]), got = norm(x.value), good = want === got; x.classList.add(good ? 'ok' : 'bad'); if (!good) { allOk = false; x.value = words[+x.dataset.k].replace(/[^A-Za-z0-9'’-]/g, ''); } });
        const fb = $('.fb', box); fb.className = 'fb show ' + (allOk ? 'good' : 'wrong'); fb.innerHTML = (allOk ? '✔ Exacto. ' : '✘ Mira las palabras marcadas. ') + '<b>' + esc(s) + '</b>'; ctx.score(allOk, 10); if (ctx.answer) ctx.answer({ kind: 'dictation', good: allOk, item: { s }, typed: ins.map(x => x.value).join(' ') });
      };
      $('.cz-next', box).onclick = () => { i++; if (i % q.length === 0) q = shuffle(bank); draw(); };
      $$('.cz-in', box).forEach(x => x.addEventListener('keydown', e => { if (e.key === 'Enter') $('.cz-check', box).click(); }));
    }
    if (bank.length) draw(); else box.innerHTML = '<p class="small muted">No hay frases suficientes.</p>';
  };

  /* build: constructor de frases · ordena las palabras */
  R.build = (root, act, ctx) => {
    const bank = act.sentences.filter(s => { const n = s.split(' ').length; return n >= 5 && n <= 14; }); let q = shuffle(bank), i = 0;
    root.innerHTML = `<div class="card">${head(act)}<div class="bd"></div></div>`;
    const box = $('.bd', root);
    function draw() {
      const s = q[i % q.length], words = s.split(' '); delete box.dataset.done;
      box.innerHTML = `<p class="small muted">Frase ${(i % q.length) + 1} de ${q.length} · ${words.length} palabras</p><div class="seq"></div><p class="small muted" style="margin:8px 0 4px">Toca las palabras en orden (toca una de arriba para devolverla):</p><div class="pool"></div>
        <div class="row" style="margin-top:10px"><button class="btn bd-check">Comprobar</button><button class="btn ghost bd-reset">Reiniciar</button><button class="btn ghost bd-say">🔊 Escuchar</button><button class="btn ghost bd-next">Siguiente →</button></div><div class="fb"></div>`;
      const pool = $('.pool', box), seq = $('.seq', box);
      // la primera palabra se muestra en minúscula (salvo I y nombres propios) para no regalar el orden
      const show = k => { const w = words[k]; if (k !== 0 || w === 'I' || /^I['’]/.test(w)) return w; return w.charAt(0).toLowerCase() + w.slice(1); };
      shuffle(words.map((w, k) => k)).forEach(k => { const b = el('button', 'tok'); b.textContent = show(k); b.dataset.k = k; b.onclick = () => (b.parentElement === pool ? seq : pool).appendChild(b); pool.appendChild(b); });
      $('.bd-check', box).onclick = () => {
        if (box.dataset.done) return; const got = $$('.tok', seq).map(b => +b.dataset.k); if (got.length < words.length) { ctx.toast('Faltan palabras'); return; } box.dataset.done = 1;
        const good = got.every((k, idx) => k === idx), fb = $('.fb', box); fb.className = 'fb show ' + (good ? 'good' : 'wrong');
        fb.innerHTML = (good ? '✔ Perfecto: ' : '✘ El orden correcto es: ') + '<b>' + esc(s) + '</b>'; ctx.score(good, 12); if (ctx.answer) ctx.answer({ kind: 'build', good, item: { s }, typed: got.map(k => words[k]).join(' ') }); ctx.say(s);
      };
      $('.bd-reset', box).onclick = draw; $('.bd-say', box).onclick = () => ctx.say(s); $('.bd-next', box).onclick = () => { i++; if (i % q.length === 0) q = shuffle(bank); draw(); };
    }
    if (bank.length) draw(); else box.innerHTML = '<p class="small muted">No hay frases suficientes.</p>';
  };

  return { renderers: R, register: (t, fn) => { R[t] = fn; }, util: { shuffle, pick, esc, norm, blank, diffWords, $, $$ } };
})();
