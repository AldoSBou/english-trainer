/* ===========================================================
   app.js — menú de ciclos/unidades, rutas y progreso
   Rutas:  #/                      → ciclos (Inglés 0-5)
           #/<curso>               → unidades del ciclo
           #/<curso>/<unidad>      → portada de la unidad
           #/<curso>/<unidad>/<sec>→ sección de la unidad
   =========================================================== */
(() => {
  const { $, $$, esc } = Engine.util;
  const key = (c, u) => c + '/' + u;

  /* ---------- progreso ---------- */
  const S = { xp: 0, ok: 0, bad: 0, streak: 0, units: {} };
  try { Object.assign(S, JSON.parse(localStorage.getItem('et-progress') || '{}')); } catch (e) { }
  // migración del esquema antiguo (progreso guardado sin ciclo)
  if (S.units && S.units.unit1 && !S.units['ingles4/unit1']) { S.units['ingles4/unit1'] = S.units.unit1; delete S.units.unit1; }
  const save = () => { try { localStorage.setItem('et-progress', JSON.stringify(S)); } catch (e) { } };

  let cur = { course: null, unit: null };
  const renderXP = () => { $('#xp').textContent = S.xp; $('#lvl').textContent = Math.floor(S.xp / 100) + 1; $('#xpfill').style.width = (S.xp % 100) + '%'; };

  function score(good, pts = 10) {
    if (good) { S.xp += pts; S.ok++; S.streak++; toast('+' + pts + ' XP' + (S.streak >= 3 ? ' · racha ' + S.streak + ' 🔥' : '')); }
    else { S.bad++; S.streak = 0; }
    if (cur.course && cur.unit) { const k = key(cur.course, cur.unit); const u = S.units[k] ||= { xp: 0, ok: 0, bad: 0 }; if (good) { u.xp += pts; u.ok++; } else u.bad++; }
    save(); renderXP(); renderNav();
  }
  let toastT; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1400); }

  /* ---------- voz ----------
     El navegador trae varias voces en inglés y la primera suele ser la
     más robótica. Aquí se puntúan por calidad (neuronales / "Natural" /
     Google / Apple mejoradas primero), se recuerda la que elija el
     alumno y se lee por frases para que el ritmo suene más humano.   */
  const canSpeak = 'speechSynthesis' in window;
  const VOICE_KEY = 'et-voice', RATE_KEY = 'et-rate';
  let prefs = { voice: null, rate: 1 };
  try { prefs.voice = localStorage.getItem(VOICE_KEY); prefs.rate = parseFloat(localStorage.getItem(RATE_KEY)) || 1; } catch (e) { }

  // puntuación: cuanto más alta, más natural suele sonar
  function voiceScore(v) {
    const n = (v.name + ' ' + v.voiceURI).toLowerCase(); let s = 0;
    if (/natural|neural/.test(n)) s += 60;                       // Microsoft Edge "Online (Natural)"
    if (/online/.test(n)) s += 15;
    if (/premium|enhanced|superior/.test(n)) s += 40;            // Apple mejoradas descargadas
    if (/google/.test(n)) s += 35;                               // Chrome / Android
    if (/\b(samantha|ava|allison|zoe|evan|nathan|tom|siri|aria|jenny|guy|ana|christopher|michelle|eric|emma|andrew|brian)\b/.test(n)) s += 20;
    if (/^en-us/i.test(v.lang)) s += 12; else if (/^en-gb/i.test(v.lang)) s += 8; else if (/^en/i.test(v.lang)) s += 4;
    if (/espeak|compact|novelty|whisper|bells|bubbles|zarvox|trinoids|cellos|bad news|good news|boing|deranged|hysterical|albert|fred|junior|ralph|kathy|wobble|jester|organ|superstar|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy/.test(n)) s -= 80;
    if (/microsoft (david|zira|mark) desktop/.test(n)) s -= 20;  // voces SAPI antiguas de Windows
    if (v.localService === false) s += 5;                        // las "online" son las neuronales
    return s;
  }
  const allVoices = () => canSpeak ? speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)) : [];
  const ranked = () => allVoices().sort((a, b) => voiceScore(b) - voiceScore(a));
  const chosenVoice = () => { const vs = ranked(); return vs.find(v => v.voiceURI === prefs.voice) || vs[0] || null; };
  // segunda voz distinta para diálogos (a ser posible de otro "género" por el nombre)
  const FEM = /female|samantha|ava|allison|zoe|siri|aria|jenny|ana|michelle|emma|zira|susan|karen|moira|tessa|fiona|libby|sonia|natasha|hazel|catherine|salli|joanna|kendra|kimberly|ivy|amy|olivia/i;
  function altVoice(main) { const vs = ranked().filter(v => v !== main); if (!vs.length) return main; const f = FEM.test(main?.name || ''); return vs.find(v => FEM.test(v.name) !== f && voiceScore(v) > 0) || vs[0]; }
  if (canSpeak) { allVoices(); speechSynthesis.onvoiceschanged = () => { allVoices(); if ($('#voicePanel')?.classList.contains('open')) renderVoicePanel(); }; }

  // partir en frases: las voces respiran entre oraciones y Chrome no corta textos largos
  const chunks = t => String(t).replace(/\s+/g, ' ').match(/[^.!?…]+[.!?…]+["”']?|[^.!?…]+$/g)?.map(x => x.trim()).filter(Boolean) || [String(t)];
  function utter(text, voice, rate) { const u = new SpeechSynthesisUtterance(text); u.lang = voice?.lang || 'en-US'; if (voice) u.voice = voice; u.rate = rate; u.pitch = 1; return u; }
  function say(text, rate = 1, vi = 0) {
    if (!canSpeak) return; speechSynthesis.cancel();
    const main = chosenVoice(), v = vi ? altVoice(main) : main, r = rate * prefs.rate;
    chunks(text).forEach(c => speechSynthesis.speak(utter(c, v, r)));
  }
  function sayLines(lines) {
    if (!canSpeak) return; speechSynthesis.cancel();
    const main = chosenVoice(), alt = altVoice(main);
    lines.forEach(([vi, text]) => chunks(text).forEach(c => speechSynthesis.speak(utter(c, vi % 2 ? alt : main, prefs.rate))));
  }
  const ctx = { score, say, sayLines, toast, canSpeak };

  /* ---------- panel de voz ---------- */
  const tipFor = () => {
    const ua = navigator.userAgent;
    if (/Edg\//.test(ua)) return 'Estás en Edge: elige una voz marcada como <b>Natural</b>, son las más humanas.';
    if (/Windows/.test(ua)) return 'En Windows, las voces más naturales están en <b>Microsoft Edge</b> (las que dicen "Natural"). En Chrome elige <b>Google US English</b>.';
    if (/Android/.test(ua)) return 'En Android, <b>Google US English</b> suele ser la mejor. Si suena mal, en Ajustes › Sistema › Idiomas › Salida de texto a voz instala las voces de Google.';
    if (/iPhone|iPad|Macintosh/.test(ua)) return 'En iPhone/Mac puedes descargar voces mejoradas: Ajustes › Accesibilidad › Contenido hablado › Voces › Inglés (p. ej. <b>Ava</b> o <b>Samantha (mejorada)</b>). Aparecerán aquí al recargar.';
    return 'Elige la voz que te suene más natural. Las marcadas con ★ suelen ser las mejores.';
  };
  function renderVoicePanel() {
    const panel = $('#voicePanel'), vs = ranked(), cur = chosenVoice();
    if (!canSpeak) { panel.innerHTML = '<p class="small">Este navegador no tiene voces disponibles.</p>'; return; }
    panel.innerHTML = `<div class="vp-head"><span class="eyebrow">Voz del profesor</span><button class="close-vp" aria-label="Cerrar">✕</button></div>
      <p class="small vp-tip">${tipFor()}</p>
      <label class="small vp-rate">Velocidad <input type="range" id="vpRate" min="0.7" max="1.15" step="0.05" value="${prefs.rate}"> <b id="vpRateV">${Math.round(prefs.rate * 100)}%</b></label>
      <div class="vp-list">${vs.length ? vs.map(v => `<div class="vp-item ${v === cur ? 'on' : ''}" data-uri="${esc(v.voiceURI)}">
          <button class="vp-pick"><span class="vp-name">${voiceScore(v) >= 40 ? '★ ' : ''}${esc(v.name.replace(/ - English.*$/, '').replace(/^Microsoft |^Google /, '').replace(/\s*\(United States\)|\s*\(United Kingdom\)/, ''))}</span><span class="vp-lang">${esc(v.lang)}${v.localService === false ? ' · online' : ''}</span></button>
          <button class="vp-try" title="Escuchar">▶</button></div>`).join('') : '<p class="small muted">Las voces aún se están cargando… vuelve a abrir el panel en un segundo.</p>'}</div>`;
    $('.close-vp', panel).onclick = () => toggleVoice(false);
    $('#vpRate').oninput = e => { prefs.rate = parseFloat(e.target.value); $('#vpRateV').textContent = Math.round(prefs.rate * 100) + '%'; try { localStorage.setItem(RATE_KEY, prefs.rate); } catch (x) { } };
    $$('.vp-item', panel).forEach(it => {
      const v = vs.find(x => x.voiceURI === it.dataset.uri);
      $('.vp-pick', it).onclick = () => { prefs.voice = v.voiceURI; try { localStorage.setItem(VOICE_KEY, v.voiceURI); } catch (x) { } $$('.vp-item', panel).forEach(x => x.classList.toggle('on', x === it)); speechSynthesis.cancel(); speechSynthesis.speak(utter("Great choice. Let's practice some English together.", v, prefs.rate)); };
      $('.vp-try', it).onclick = () => { speechSynthesis.cancel(); speechSynthesis.speak(utter("Hi! I've been learning English for a few months, and I'd like to practice with you.", v, prefs.rate)); };
    });
  }
  function toggleVoice(o) { const panel = $('#voicePanel'), open = o ?? !panel.classList.contains('open'); panel.classList.toggle('open', open); $('#voiceBtn').setAttribute('aria-expanded', open); if (open) renderVoicePanel(); }
  $('#voiceBtn').onclick = () => toggleVoice();
  document.addEventListener('click', e => { if (!e.target.closest('#voicePanel') && !e.target.closest('#voiceBtn')) toggleVoice(false); });

  /* ---------- helpers de datos ---------- */
  const course = id => COURSES.find(c => c.id === id);
  const unitOf = (c, id) => (c && c.units || []).find(u => u.id === id);
  const dataOf = (c, u) => window.UNIT_DATA[key(c, u)];
  function unitPct(cId, u) { const p = S.units[key(cId, u.id)]; return p ? Math.min(100, Math.round(p.xp / (u.xpGoal || 600) * 100)) : 0; }
  function coursePct(c) { const av = c.units.filter(u => u.available); return av.length ? Math.round(av.reduce((s, u) => s + unitPct(c.id, u), 0) / av.length) : 0; }

  /* ---------- iconos de sección (barra inferior en móvil) ---------- */
  const ICON = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    vocab: '<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/>',
    grammar: '<path d="M4 6h16M4 12h10M4 18h13"/>',
    listen: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/>',
    speak: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    read: '<path d="M3 5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15a2 2 0 0 0-2-2H3zM21 5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v15a2 2 0 0 1 2-2h7z"/>',
    write: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
    social: '<path d="M4 5h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2l-3-2"/>',
    translate: '<path d="M4 5h8M8 3v2M6 5c0 4 2 7 6 9M11 5c-1 4-4 7-7 9"/><path d="M13 21l4-10 4 10M14.5 17h5"/>',
  };
  const SHORT = { home: 'Inicio', vocab: 'Vocab', grammar: 'Grammar', listen: 'Listen', speak: 'Speak', read: 'Read', write: 'Write', social: 'Social' };
  const icon = id => `<svg class="ti" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[id] || ICON.home}</svg>`;

  /* ---------- menú lateral ---------- */
  const sidebar = $('#sidebar'), backdrop = $('#backdrop');
  const openSide = o => { sidebar.classList.toggle('open', o); backdrop.classList.toggle('show', o); $('#menuBtn').setAttribute('aria-expanded', o); };
  $('#menuBtn').onclick = () => openSide(true); $('#closeSide').onclick = () => openSide(false); backdrop.onclick = () => openSide(false);

  function renderNav() {
    const tool = location.hash.replace(/^#\/?/, '').split('/')[0];
    $('#toolNav').innerHTML = `<a class="tool-link ${tool === 'coach' ? 'active' : ''}" href="#/coach"><span class="ti-wrap c">${icon('speak')}</span><span><span class="t">Speaking Coach</span><span class="s">Conversa y evalúa tu inglés</span></span></a>
      <a class="tool-link ${tool === 'method' ? 'active' : ''}" href="#/method"><span class="ti-wrap m">${icon('read')}</span><span><span class="t">Método</span><span class="s">Repaso, shadowing, 4-3-2…</span></span></a>
      <a class="tool-link ${tool === 'translate' ? 'active' : ''}" href="#/translate"><span class="ti-wrap t">${icon('translate')}</span><span><span class="t">Traductor</span><span class="s">Traduce y escucha con voz</span></span></a>`;
    $('#unitNav').innerHTML = COURSES.map(c => {
      const open = cur.course === c.id;
      if (!c.available) return `<div class="course locked" data-n="${c.number}"><span class="course-head"><span class="num">${c.number}</span><span class="t">${esc(c.title)}</span><span class="s">Pronto</span></span></div>`;
      return `<div class="course ${open ? 'open' : ''}" data-n="${c.number}">
        <a class="course-head" href="#/${c.id}"><span class="num">${c.number}</span><span class="t">${esc(c.title)}</span><span class="pct">${coursePct(c)}%</span></a>
        <div class="course-units">${c.units.map(u => u.available
          ? `<a class="unit-link ${open && cur.unit === u.id ? 'active' : ''}" href="#/${c.id}/${u.id}"><span class="u">U${u.number}</span><span class="t">${esc(u.title)}</span><span class="pct">${unitPct(c.id, u)}%</span></a>`
          : `<span class="unit-link locked"><span class="u">U${u.number}</span><span class="t">Próximamente</span></span>`).join('')}</div></div>`;
    }).join('');
  }

  /* ---------- vistas ---------- */
  const view = $('#view');
  const crumbs = items => `<nav class="crumbs">${items.map((i, n) => n === items.length - 1 ? `<span>${esc(i[0])}</span>` : `<a href="${i[1]}">${esc(i[0])}</a><span class="sep">›</span>`).join('')}</nav>`;

  function renderHome() {
    cur = { course: null, unit: null }; document.body.dataset.sec = 'home'; document.body.classList.remove('in-unit'); renderNav();
    const activeUnits = COURSES.flatMap(c => c.units.filter(u => u.available));
    view.innerHTML = `<div class="unit-head"><div class="eyebrow">Tu programa de inglés</div><h1>Elige tu ciclo</h1><p class="muted">Cada ciclo agrupa sus unidades. Dentro de cada unidad practicas vocabulario, gramática, listening, speaking, reading y writing con ejercicios que cambian en cada ronda.</p></div>
      <div class="card" style="margin-bottom:18px"><div class="eyebrow">Progreso global</div><div class="stat" style="margin-top:8px">
        <div><b>${S.xp}</b><span class="small muted">XP totales</span></div>
        <div><b>${S.ok}</b><span class="small muted">aciertos</span></div>
        <div><b>${S.bad}</b><span class="small muted">errores</span></div>
        <div><b>${activeUnits.length}</b><span class="small muted">unidades disponibles</span></div></div></div>
      <div class="tool-cards"><a class="tool-card c" href="#/coach">${icon('speak')}<div><h3>Speaking Coach</h3><p class="small">Conversa por voz con un profesor, recibe correcciones por turno y un informe con tu nivel.</p></div></a><a class="tool-card m" href="#/method">${icon('read')}<div><h3>Método de estudio</h3><p class="small">Repaso espaciado, shadowing, 4-3-2, dictogloss y quiz mezclado con el contenido de tus unidades.</p></div></a><a class="tool-card t" href="#/translate">${icon('translate')}<div><h3>Traductor con voz</h3><p class="small">Escribe en español o inglés, escucha la traducción con voz natural y guárdala en tu repaso.</p></div></a></div>
      <div class="eyebrow" style="margin:6px 0 10px">Ciclos</div>
      <div class="unit-cards">${COURSES.map(c => c.available
        ? `<a class="unit-card" data-n="${c.number}" href="#/${c.id}"><span class="big">${c.number}</span><h3>${esc(c.title)}</h3><p class="small muted">${esc(c.subtitle || '')}</p><span class="small">${c.units.filter(u => u.available).length} de ${c.units.length} unidades listas${c.current ? ' · <b>ciclo actual</b>' : ''}</span><div class="bar"><i style="width:${coursePct(c)}%"></i></div></a>`
        : `<div class="unit-card locked" data-n="${c.number}"><span class="big">${c.number}</span><h3>${esc(c.title)}</h3><p class="small muted">${esc(c.subtitle || '')} — se añadirá cuando llegues a este ciclo.</p></div>`).join('')}</div>`;
  }

  function renderCourse(cId) {
    const c = course(cId); if (!c || !c.available) { location.hash = '#/'; return; }
    cur = { course: cId, unit: null }; document.body.dataset.sec = 'home'; document.body.classList.remove('in-unit'); renderNav(); openSide(false);
    view.innerHTML = `${crumbs([['Inicio', '#/'], [c.title, '']])}
      <div class="unit-head"><div class="eyebrow">Ciclo ${c.number} · ${esc(c.subtitle || '')}</div><h1>${esc(c.title)}</h1><p class="muted">Unidades del ciclo. Las que aún no has visto en clase aparecen como "Próximamente" y se activan cuando compartas su material.</p></div>
      <div class="unit-cards">${c.units.map(u => u.available
        ? `<a class="unit-card" data-n="${u.number % 6}" href="#/${c.id}/${u.id}"><span class="big">${String(u.number).padStart(2, '0')}</span><h3>${esc(u.title)}</h3><p class="small muted">${esc(u.subtitle || '')}</p><span class="small">${(dataOf(c.id, u.id)?.sections.length || 1) - 1} secciones de práctica</span><div class="bar"><i style="width:${unitPct(c.id, u)}%"></i></div></a>`
        : `<div class="unit-card locked" data-n="${u.number % 6}"><span class="big">${String(u.number).padStart(2, '0')}</span><h3>Unit ${u.number}</h3><p class="small muted">Próximamente</p></div>`).join('')}</div>`;
  }

  function renderUnit(cId, uId, secId) {
    const c = course(cId), u = unitOf(c, uId), data = dataOf(cId, uId);
    if (!c || !u || !u.available || !data) { location.hash = c ? '#/' + cId : '#/'; return; }
    cur = { course: cId, unit: uId }; renderNav(); openSide(false);
    const sections = data.sections, sec = sections.find(s => s.id === secId) || sections[0];
    document.body.dataset.sec = sec.id; document.body.classList.add('in-unit');
    view.innerHTML = `${crumbs([['Inicio', '#/'], [c.title, '#/' + c.id], ['Unit ' + u.number, '']])}
      <div class="unit-head ${sec.render === 'overview' ? '' : 'compact'}"><div class="eyebrow">${esc(data.source || c.title + ' · Unit ' + u.number)}</div><h1>${esc(u.title)}</h1><p class="muted small">${esc(data.description || '')}</p></div>
      <div class="section-tabs"><div class="tabs">${sections.map(s => `<a class="tab ${s.id === sec.id ? 'active' : ''}" data-sec="${s.id}" href="#/${c.id}/${u.id}/${s.id}" ${s.id === sec.id ? 'aria-current="page"' : ''}>${icon(s.id)}<span class="tl">${esc(s.label)}</span><span class="ts">${esc(SHORT[s.id] || s.label)}</span></a>`).join('')}</div></div>
      <div class="sec-body"></div>`;
    const body = $('.sec-body', view);
    if (sec.render === 'overview') return renderOverview(body, c, u, data);
    const acts = sec.activities;
    if (acts.length > 1) {
      body.innerHTML = `<div class="sub">${acts.map((a, i) => `<button class="${i ? '' : 'on'}" data-a="${i}">${esc(a.label)}</button>`).join('')}</div>` + acts.map((a, i) => `<div class="act ${i ? '' : 'on'}" data-a="${i}"></div>`).join('');
      $('.sub', body).onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('.sub button', body).forEach(x => x.classList.toggle('on', x === b)); $$('.act', body).forEach(x => x.classList.toggle('on', x.dataset.a === b.dataset.a)); b.scrollIntoView({ inline: 'center', block: 'nearest' }); };
    } else body.innerHTML = `<div class="act on" data-a="0"></div>`;
    acts.forEach((a, i) => { const r = Engine.renderers[a.type], root = $(`.act[data-a="${i}"]`, body); if (r) r(root, a, ctx); else root.innerHTML = `<div class="card">Tipo de actividad desconocido: ${esc(a.type)}</div>`; });
  }

  function renderOverview(body, c, u, data) {
    const up = S.units[key(c.id, u.id)] || { xp: 0, ok: 0, bad: 0 };
    body.innerHTML = `<div class="stack">
      <div class="card"><div class="eyebrow">Mapa de la unidad</div><h2>Lo que estás aprendiendo</h2><p class="muted intro">Todo sale directamente de tu material. Empieza por donde te sientas menos seguro.</p>
        <div class="scroll-x"><table class="table"><thead><tr><th>Área</th><th>Contenido del curso</th><th>Aquí practicas</th></tr></thead><tbody>${data.map.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="grid2">
        <div class="card"><div class="eyebrow">Tu progreso en esta unidad</div><div class="stat" style="margin-top:8px"><div><b>${up.xp}</b><span class="small muted">XP</span></div><div><b>${up.ok}</b><span class="small muted">aciertos</span></div><div><b>${up.bad}</b><span class="small muted">errores</span></div></div>
          <div class="row" style="margin-top:14px">${data.sections.filter(s => s.render !== 'overview').map(s => `<a class="btn ghost" href="#/${c.id}/${u.id}/${s.id}">${esc(s.label)}</a>`).join('')}</div></div>
        ${data.weak ? `<div class="card"><div class="eyebrow">Detectado en tus ejercicios</div><h3 style="margin:6px 0">Tus puntos débiles</h3><ul style="margin:0;padding-left:18px" class="small">${data.weak.map(w => `<li>${w}</li>`).join('')}</ul>${data.weakLink ? `<p class="small" style="margin-top:10px">→ ${data.weakLink}</p>` : ''}</div>` : ''}
      </div></div>`;
  }

  /* ---------- router ---------- */
  function renderTool(name, sub) {
    cur = { course: null, unit: null }; document.body.dataset.sec = { coach: 'speak', method: 'social', translate: 'listen' }[name] || 'home'; document.body.classList.remove('in-unit'); renderNav(); openSide(false);
    const mod = { coach: window.Coach, method: window.Method, translate: window.Translator }[name];
    if (!mod) { view.innerHTML = '<div class="card">Herramienta no disponible.</div>'; return; }
    mod.render(view, ctx, sub);
  }
  function route() {
    const [c, u, s] = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!c) renderHome(); else if (c === 'coach' || c === 'method' || c === 'translate') renderTool(c, u); else if (!u) renderCourse(c); else renderUnit(c, u, s);
    window.scrollTo({ top: 0 });
  }
  window.addEventListener('hashchange', route);
  renderXP(); route();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { }); });
  }
})();
