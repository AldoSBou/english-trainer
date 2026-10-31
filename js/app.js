/* ===========================================================
   app.js — navegación, rutas, progreso, sesión diaria y voz
   Rutas:  #/                      → Hoy (sesión diaria)
           #/curso                 → ciclos (Inglés 0-5)
           #/<curso>               → unidades del ciclo
           #/<curso>/<unidad>      → portada de la unidad
           #/<curso>/<unidad>/<sec>→ sección de la unidad
           #/perfil                → progreso, racha, objetivo
           #/coach · #/method · #/translate → herramientas
   localStorage: et-progress (XP y aciertos por unidad/sección),
   et-days (actividad por día), et-today (sesión de hoy),
   et-last (último sitio visitado), et-prefs (objetivo semanal),
   et-cando (checklist "Puedo…" por unidad).
   =========================================================== */
(() => {
  const { $, $$, esc, shuffle, pick } = Engine.util;
  const key = (c, u) => c + '/' + u;
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
  // día local (número de días desde 1970 en la zona horaria del usuario)
  const dayNum = (d = new Date()) => Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5);
  const today = () => dayNum();

  /* ---------- progreso ---------- */
  const S = { xp: 0, ok: 0, bad: 0, streak: 0, units: {} };
  try { Object.assign(S, JSON.parse(localStorage.getItem('et-progress') || '{}')); } catch (e) { }
  if (S.units && S.units.unit1 && !S.units['ingles4/unit1']) { S.units['ingles4/unit1'] = S.units.unit1; delete S.units.unit1; }
  const save = () => store('et-progress', S);
  const D = load('et-days', {});                       // { "20390": { ok, bad, secs, done } }
  const P = Object.assign({ goal: 5 }, load('et-prefs', {}));
  let T = load('et-today', { day: 0, steps: {} }); if (T.day !== today()) T = { day: today(), steps: {} };
  let L = load('et-last', null);
  const dayRec = (d = today()) => (D[d] ||= { ok: 0, bad: 0, secs: 0, done: false });

  let cur = { course: null, unit: null, sec: null };
  const renderXP = () => { $('#xp').textContent = S.xp; $('#lvl').textContent = Math.floor(S.xp / 100) + 1; $('#xpfill').style.width = (S.xp % 100) + '%'; const st = streak(); $('#streakPill').innerHTML = st ? `🔥 ${st}` : ''; };

  function score(good, pts = 10, where = cur) {
    if (good) { S.xp += pts; S.ok++; S.streak++; toast('+' + pts + ' XP' + (S.streak >= 3 ? ' · ' + S.streak + ' seguidas 🔥' : '')); }
    else { S.bad++; S.streak = 0; }
    if (where && where.course && where.unit) {
      const u = S.units[key(where.course, where.unit)] ||= { xp: 0, ok: 0, bad: 0 };
      if (good) { u.xp += pts; u.ok++; } else u.bad++;
      if (where.sec) { const s = (u.secs ||= {})[where.sec] ||= { ok: 0, bad: 0 }; good ? s.ok++ : s.bad++; }
    }
    const d = dayRec(); good ? d.ok++ : d.bad++; store('et-days', D);
    save(); renderXP(); renderNav();
  }
  let toastT; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1400); }

  /* racha: días seguidos con actividad, contando hoy o terminando ayer */
  const active = d => { const r = D[d]; return !!r && (r.ok + r.bad > 0 || r.done || r.secs >= 120); };
  function streak() { let n = 0, d = today(); if (!active(d)) d--; while (active(d)) { n++; d--; } return n; }
  function bestStreak() { const days = Object.keys(D).map(Number).filter(active).sort((a, b) => a - b); let best = 0, run = 0, prev = null; for (const d of days) { run = prev === d - 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; } return best; }
  // el día 0 (1970-01-01) fue jueves: (d + 3) % 7 da 0 = lunes … 6 = domingo
  const weekStart = (d = today()) => d - ((d + 3) % 7);
  const dateOf = d => new Date(d * 864e5 + new Date().getTimezoneOffset() * 6e4 + 12 * 36e5); // mediodía local de ese día
  const weekDays = () => { const s = weekStart(); return [0, 1, 2, 3, 4, 5, 6].map(i => s + i); };
  const sessionsThisWeek = () => weekDays().filter(d => D[d]?.done).length;
  const minutes = secs => Math.round((secs || 0) / 60);

  /* tiempo activo: suma 15 s por tic si la pestaña está visible y hubo interacción reciente */
  let lastTouch = Date.now();
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev => document.addEventListener(ev, () => { lastTouch = Date.now(); }, { passive: true }));
  setInterval(() => { if (document.visibilityState === 'visible' && Date.now() - lastTouch < 60e3) { dayRec().secs += 15; store('et-days', D); } }, 15e3);

  /* ---------- voz ----------
     El navegador trae varias voces en inglés y la primera suele ser la
     más robótica. Aquí se puntúan por calidad (neuronales / "Natural" /
     Google / Apple mejoradas primero), se recuerda la que elija el
     alumno y se lee por frases para que el ritmo suene más humano.   */
  const canSpeak = 'speechSynthesis' in window;
  const VOICE_KEY = 'et-voice', RATE_KEY = 'et-rate';
  let prefs = { voice: null, rate: 1 };
  try { prefs.voice = localStorage.getItem(VOICE_KEY); prefs.rate = parseFloat(localStorage.getItem(RATE_KEY)) || 1; } catch (e) { }

  function voiceScore(v) {
    const n = (v.name + ' ' + v.voiceURI).toLowerCase(); let s = 0;
    if (/natural|neural/.test(n)) s += 60;
    if (/online/.test(n)) s += 15;
    if (/premium|enhanced|superior/.test(n)) s += 40;
    if (/google/.test(n)) s += 35;
    if (/\b(samantha|ava|allison|zoe|evan|nathan|tom|siri|aria|jenny|guy|ana|christopher|michelle|eric|emma|andrew|brian)\b/.test(n)) s += 20;
    if (/^en-us/i.test(v.lang)) s += 12; else if (/^en-gb/i.test(v.lang)) s += 8; else if (/^en/i.test(v.lang)) s += 4;
    if (/espeak|compact|novelty|whisper|bells|bubbles|zarvox|trinoids|cellos|bad news|good news|boing|deranged|hysterical|albert|fred|junior|ralph|kathy|wobble|jester|organ|superstar|grandma|grandpa|rocko|shelley|eddy|flo|reed|sandy/.test(n)) s -= 80;
    if (/microsoft (david|zira|mark) desktop/.test(n)) s -= 20;
    if (v.localService === false) s += 5;
    return s;
  }
  const allVoices = () => canSpeak ? speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)) : [];
  const ranked = () => allVoices().sort((a, b) => voiceScore(b) - voiceScore(a));
  const chosenVoice = () => { const vs = ranked(); return vs.find(v => v.voiceURI === prefs.voice) || vs[0] || null; };
  const FEM = /female|samantha|ava|allison|zoe|siri|aria|jenny|ana|michelle|emma|zira|susan|karen|moira|tessa|fiona|libby|sonia|natasha|hazel|catherine|salli|joanna|kendra|kimberly|ivy|amy|olivia/i;
  function altVoice(main) { const vs = ranked().filter(v => v !== main); if (!vs.length) return main; const f = FEM.test(main?.name || ''); return vs.find(v => FEM.test(v.name) !== f && voiceScore(v) > 0) || vs[0]; }
  if (canSpeak) { allVoices(); speechSynthesis.onvoiceschanged = () => { allVoices(); if ($('#voicePanel')?.classList.contains('open')) renderVoicePanel(); }; }

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

  const tipFor = () => {
    const ua = navigator.userAgent;
    if (/Edg\//.test(ua)) return 'Estás en Edge: elige una voz marcada como <b>Natural</b>, son las más humanas.';
    if (/Windows/.test(ua)) return 'En Windows, las voces más naturales están en <b>Microsoft Edge</b> (las que dicen "Natural"). En Chrome elige <b>Google US English</b>.';
    if (/Android/.test(ua)) return 'En Android, <b>Google US English</b> suele ser la mejor. Si suena mal, en Ajustes › Sistema › Idiomas › Salida de texto a voz instala las voces de Google.';
    if (/iPhone|iPad|Macintosh/.test(ua)) return 'En iPhone/Mac puedes descargar voces mejoradas: Ajustes › Accesibilidad › Contenido hablado › Voces › Inglés (p. ej. <b>Ava</b> o <b>Samantha (mejorada)</b>). Aparecerán aquí al recargar.';
    return 'Elige la voz que te suene más natural. Las marcadas con ★ suelen ser las mejores.';
  };
  function renderVoicePanel() {
    const panel = $('#voicePanel'), vs = ranked(), cv = chosenVoice();
    if (!canSpeak) { panel.innerHTML = '<p class="small">Este navegador no tiene voces disponibles.</p>'; return; }
    panel.innerHTML = `<div class="vp-head"><span class="eyebrow">Voz del profesor</span><button class="close-vp" aria-label="Cerrar">✕</button></div>
      <p class="small vp-tip">${tipFor()}</p>
      <label class="small vp-rate">Velocidad <input type="range" id="vpRate" min="0.7" max="1.15" step="0.05" value="${prefs.rate}"> <b id="vpRateV">${Math.round(prefs.rate * 100)}%</b></label>
      <div class="vp-list">${vs.length ? vs.map(v => `<div class="vp-item ${v === cv ? 'on' : ''}" data-uri="${esc(v.voiceURI)}">
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
  const availableUnits = c => c.units.filter(u => u.available);
  function unitPct(cId, u) { const p = S.units[key(cId, u.id)]; return p ? Math.min(100, Math.round(p.xp / (u.xpGoal || 600) * 100)) : 0; }
  function coursePct(c) { const av = availableUnits(c); return av.length ? Math.round(av.reduce((s, u) => s + unitPct(c.id, u), 0) / av.length) : 0; }
  const currentCourse = () => COURSES.find(c => c.current && c.available) || COURSES.filter(c => c.available).pop();
  /* unidad en foco: la última visitada del ciclo actual o, si no, la última disponible */
  function focusUnit() {
    const c = currentCourse(); if (!c) return null;
    const fromLast = L && L.course === c.id && unitOf(c, L.unit)?.available ? unitOf(c, L.unit) : null;
    const u = fromLast || availableUnits(c).slice(-1)[0]; if (!u) return null;
    return { c, u, d: dataOf(c.id, u.id) };
  }
  const actsOf = (d, type, secId) => d.sections.filter(s => !secId || s.id === secId).flatMap(s => s.activities.filter(a => a.type === type));

  /* ---------- actividades virtuales: ejercicios de producción generados del contenido tipado ----------
     vocab → "Escríbela" (recall, desde las flashcards) · listen → "Completa lo que oyes" (cloze, desde el dictado)
     grammar → "Ordena la frase" (build, con las frases del dictado). Se añaden una vez por unidad al arrancar. */
  function enrich(d) {
    if (d._enriched) return d; d._enriched = true;
    const sec = id => d.sections.find(s => s.id === id);
    const v = sec('vocab'), cards = v ? v.activities.filter(a => a.type === 'flashcards').flatMap(a => a.cards) : [];
    if (v && cards.length >= 6 && !v.activities.some(a => a.type === 'recall')) {
      const at = v.activities.findIndex(a => a.type === 'flashcards') + 1;
      v.activities.splice(at || v.activities.length, 0, { virtual: true, label: 'Escríbela', type: 'recall', eyebrow: 'Recuperación escrita', title: 'Lee el significado y escribe la palabra', intro: 'Producir la palabra de memoria fija mucho más que reconocerla. Si te atascas, pide una pista (vale la mitad de XP) y escucha la pronunciación al final.', cards, pool: 8 });
    }
    const l = sec('listen'), sents = l ? l.activities.filter(a => a.type === 'dictation').flatMap(a => a.sentences) : [];
    if (l && sents.length >= 5 && !l.activities.some(a => a.type === 'cloze')) {
      const at = l.activities.findIndex(a => a.type === 'dictation') + 1;
      l.activities.splice(at || l.activities.length, 0, { virtual: true, label: 'Completa lo que oyes', type: 'cloze', eyebrow: 'Listening · cloze', title: 'Escucha y completa las palabras que faltan', intro: 'Dos huecos por frase. Escúchala entera, fíjate en las palabras de contenido y escribe solo lo que falta.', sentences: sents, gaps: 2 });
    }
    const sp = sec('speak');
    if (sp && !sp.activities.some(a => a.type === 'say')) {
      // frases de los modelos de speaking (4-16 palabras) + las del dictado
      const models = sp.activities.filter(a => a.type === 'speaking').flatMap(a => a.challenges.map(ch => String(ch.model || '').replace(/<[^>]+>/g, '')));
      const fromModels = models.flatMap(m => m.match(/[^.!?]+[.!?]+/g) || []).map(s => s.trim()).filter(s => { const n = s.split(' ').length; return n >= 4 && n <= 16; });
      const say = [...new Set([...fromModels, ...sents])];
      if (say.length >= 5) { const at = sp.activities.findIndex(a => a.type === 'speaking') + 1; sp.activities.splice(at || sp.activities.length, 0, { virtual: true, label: 'Dilo', type: 'say', eyebrow: 'Dilo · pronunciación y ritmo', title: 'Escucha la frase, dila y compara', intro: 'Frases del modelo de los retos y del dictado. Escucha, imita el ritmo y grábate: verás palabra por palabra qué se entendió. Más del 80 % es buena señal.', sentences: say }); }
    }
    const rd = sec('read'), reading = rd && rd.activities.find(a => a.type === 'reading');
    if (rd && reading && !rd.activities.some(a => a.type === 'timed')) {
      const at = rd.activities.indexOf(reading) + 1;
      rd.activities.splice(at, 0, { virtual: true, label: 'Lectura cronometrada', type: 'timed', eyebrow: 'Fluidez lectora', title: 'Lee contra el reloj y comprueba que entendiste', intro: 'El mismo texto de la unidad, pero midiendo tu velocidad. Primero lee para entender; al terminar, responde sin mirar. Leerlo dos o tres veces seguidas es la forma más rápida de ganar fluidez.', paragraphs: reading.paragraphs, main: reading.main || [], infer: reading.infer || [], key: d.source || 'texto', name: reading.title || '' });
    }
    const g = sec('grammar');
    if (g && sents.length >= 5 && !g.activities.some(a => a.type === 'build')) {
      const rev = g.activities.findIndex(a => /^repaso/i.test(a.label || ''));
      g.activities.splice(rev >= 0 ? rev : g.activities.length, 0, { virtual: true, label: 'Ordena la frase', type: 'build', eyebrow: 'Constructor de frases', title: 'Arma la frase palabra por palabra', intro: 'El orden de las palabras es donde más se nota el español (adjetivo antes del nombre, sujeto siempre presente, auxiliares en su sitio). Toca las palabras en orden y escucha el resultado.', sentences: sents });
    }
    return d;
  }
  Object.values(window.UNIT_DATA || {}).forEach(enrich);

  /* ctx por actividad: atribuye XP, registra dominio y anota los fallos en el cuaderno */
  const actCtx = (unitKey, secId, a, where) => { const id = Mastery.idFor(unitKey, secId, a); return { ...ctx, score: (g, p) => { score(g, p, where); Mastery.record(id, g); }, answer: info => { if (!info.good) Mastery.miss({ ...info, unit: unitKey, sec: secId, label: a.label || a.type }); } }; };
  const mcqItems = a => { try { return typeof a.build === 'function' ? a.build({ shuffle, pick, esc, blank: Engine.util.blank }) : a.items.map(it => ({ ...it, q: it.blank ? Engine.util.blank(it.q) : it.q, blank: 0 })); } catch (e) { return []; } };

  /* ---------- iconos ---------- */
  const ICON = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    today: '<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="m9 15 2 2 4-4"/>',
    course: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    practice: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    vocab: '<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/>',
    grammar: '<path d="M4 6h16M4 12h10M4 18h13"/>',
    listen: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/>',
    speak: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    read: '<path d="M3 5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15a2 2 0 0 0-2-2H3zM21 5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v15a2 2 0 0 1 2-2h7z"/>',
    write: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
    social: '<path d="M4 5h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2l-3-2"/>',
    translate: '<path d="M4 5h8M8 3v2M6 5c0 4 2 7 6 9M11 5c-1 4-4 7-7 9"/><path d="M13 21l4-10 4 10M14.5 17h5"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    play: '<path d="M6 4l14 8-14 8z"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    srs: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>',
  };
  const SHORT = { home: 'Inicio', vocab: 'Vocab', grammar: 'Grammar', listen: 'Listen', speak: 'Speak', read: 'Read', write: 'Write', social: 'Social' };
  const icon = id => `<svg class="ti" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[id] || ICON.home}</svg>`;

  /* ---------- navegación ---------- */
  const sidebar = $('#sidebar'), backdrop = $('#backdrop');
  const openSide = o => { sidebar.classList.toggle('open', o); backdrop.classList.toggle('show', o); $('#menuBtn').setAttribute('aria-expanded', o); };
  $('#menuBtn').onclick = () => openSide(true); $('#closeSide').onclick = () => openSide(false); backdrop.onclick = () => openSide(false);

  const NAV = [['', 'Hoy', 'today'], ['curso', 'Curso', 'course'], ['method', 'Práctica', 'practice'], ['coach', 'Coach', 'speak'], ['perfil', 'Perfil', 'user']];
  function navKey() { const h = location.hash.replace(/^#\/?/, '').split('/')[0]; if (!h) return ''; if (['method', 'coach', 'perfil', 'curso'].includes(h)) return h; if (h === 'translate') return 'translate'; return 'curso'; }
  function renderNav() {
    const k = navKey();
    const links = NAV.map(([id, label, ic]) => `<a class="${k === id ? 'active' : ''}" href="#/${id}">${icon(ic)}<span>${label}</span></a>`).join('');
    $('#mainNav').innerHTML = links; $('#appNav').innerHTML = links;
    $('#toolNav').innerHTML = `<a class="tool-link ${k === '' ? 'active' : ''}" href="#/"><span class="ti-wrap h">${icon('today')}</span><span><span class="t">Hoy</span><span class="s">Tu sesión diaria</span></span></a>
      <a class="tool-link ${k === 'method' ? 'active' : ''}" href="#/method"><span class="ti-wrap m">${icon('practice')}</span><span><span class="t">Práctica</span><span class="s">Repaso, shadowing, quiz…</span></span></a>
      <a class="tool-link ${k === 'coach' ? 'active' : ''}" href="#/coach"><span class="ti-wrap c">${icon('speak')}</span><span><span class="t">Speaking Coach</span><span class="s">Conversa y evalúa tu inglés</span></span></a>
      <a class="tool-link ${k === 'translate' ? 'active' : ''}" href="#/translate"><span class="ti-wrap t">${icon('translate')}</span><span><span class="t">Traductor</span><span class="s">Traduce y escucha con voz</span></span></a>
      <a class="tool-link ${k === 'perfil' ? 'active' : ''}" href="#/perfil"><span class="ti-wrap p">${icon('user')}</span><span><span class="t">Perfil</span><span class="s">Racha, objetivo y progreso</span></span></a>`;
    $('#unitNav').innerHTML = COURSES.map(c => {
      const open = cur.course === c.id || (!cur.course && c.current && k === 'curso');
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
  // texto plano con cursivas/negritas permitidas (description de la unidad)
  const lite = s => esc(s).replace(/&lt;(\/?)(i|b)&gt;/g, '<$1$2>');
  const crumbs = items => `<nav class="crumbs">${items.map((i, n) => n === items.length - 1 ? `<span>${esc(i[0])}</span>` : `<a href="${i[1]}">${esc(i[0])}</a><span class="sep">›</span>`).join('')}</nav>`;
  const setPage = (sec, c = null, u = null, s = null) => { cur = { course: c, unit: u, sec: s }; document.body.dataset.sec = sec; document.body.classList.toggle('in-unit', !!u); renderNav(); openSide(false); };
  const ring = (p, label, big) => `<div class="ring ${p >= 100 ? 'done' : ''}" style="--p:${Math.min(100, p)}"><div><b>${big}</b><span>${label}</span></div></div>`;

  /* ======================= HOY ======================= */
  const BASE_STEPS = [
    { id: 'srs', t: 'Repaso espaciado', s: 'Las palabras que tocan hoy', mins: 3, ic: 'srs', sec: 'vocab' },
    { id: 'grammar', t: 'Gramática mezclada', s: 'Seis preguntas: la unidad actual y repaso', mins: 3, ic: 'grammar', sec: 'grammar' },
    { id: 'errors', t: 'Caza tus errores', s: 'Lo que fallaste vuelve a salir', mins: 3, ic: 'write', sec: 'write' },
    { id: 'listen', t: 'Oído fino', s: 'Tres frases al dictado', mins: 3, ic: 'listen', sec: 'listen' },
    { id: 'speak', t: 'Habla un minuto', s: 'Un reto de speaking con modelo', mins: 2, ic: 'speak', sec: 'speak' },
    { id: 'words', t: 'Palabras nuevas', s: 'Seis tarjetas que entran al repaso', mins: 2, ic: 'vocab', sec: 'vocab' },
  ];
  // el paso de errores solo aparece si hay al menos tres fallos anotados (o ya se hizo hoy)
  const steps = () => BASE_STEPS.filter(s => s.id !== 'errors' || T.steps.errors || Mastery.errors().length >= 3);
  let STEPS = steps();
  const SEC_COLOR = { vocab: '#C77D0F', grammar: '#0E7C6B', listen: '#2563EB', speak: '#DC5540', read: '#3B8A3F', write: '#5457CF', social: '#A3467C' };
  const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; };
  const fmtDate = () => new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });

  function renderToday() {
    setPage('home'); STEPS = steps();
    const f = focusUnit(), st = streak(), doneN = STEPS.filter(s => T.steps[s.id]).length, srs = window.Method ? Method.srsStats() : null;
    const week = weekDays(), tn = today(), sess = sessionsThisWeek();
    view.innerHTML = `
      <div class="hello"><div><div class="date">${esc(fmtDate())}</div><h1>${greeting()}. <em>Let's practice.</em></h1></div>
        <div class="streak"><div class="flame ${st ? '' : 'off'}">🔥</div><div><b>${st}</b><span>${st === 1 ? 'día seguido' : 'días seguidos'}</span></div><div style="margin-left:6px;padding-left:12px;border-left:1px solid var(--line)"><b>${minutes(dayRec().secs)}</b><span>min hoy</span></div></div></div>

      <div class="card"><div class="session">
        ${ring(doneN / STEPS.length * 100, 'pasos', `${doneN}/${STEPS.length}`)}
        <div><div class="eyebrow">Sesión de hoy · unos ${STEPS.reduce((a, s) => a + s.mins, 0)} minutos</div>
          <h2>${doneN >= STEPS.length ? '¡Sesión completa! Hasta mañana.' : doneN ? 'Sigue, ya casi está.' : `${STEPS.length === 6 ? 'Seis' : 'Cinco'} pasos cortos, en orden o como prefieras.`}</h2>
          <p class="muted small" style="margin-top:4px">${f ? `Unidad en foco: <b>${esc(f.c.title)} · Unit ${f.u.number} · ${esc(f.u.title)}</b>. Cambia de unidad visitando otra desde <a href="#/curso">Curso</a>.` : 'Carga una unidad para armar tu sesión.'}</p>
          <div class="row" style="margin-top:10px;gap:6px">${week.map(d => `<span class="dot ${D[d]?.done ? 'full' : ''} ${d === tn ? 'today' : ''}" title="${D[d]?.done ? 'Sesión completa' : D[d] && active(d) ? 'Practicaste' : 'Sin práctica'}" style="${d === tn ? 'outline:2px solid var(--amber);outline-offset:1px' : ''}"><i style="height:${active(d) && !D[d]?.done ? 60 : 0}%"></i><span>${'LMXJVSD'[week.indexOf(d)]}</span></span>`).join('')}<span class="small muted" style="margin-left:6px">${sess} de ${P.goal} sesiones esta semana</span></div>
        </div></div>
        <div class="steps">${STEPS.map((s, i) => `<div class="step ${T.steps[s.id] ? 'done' : ''}" data-step="${s.id}" style="--sc:${SEC_COLOR[s.sec]}">
          <button aria-expanded="false"><span class="n">${T.steps[s.id] ? icon('check') : icon(s.ic)}</span><span><span class="t">${s.t}</span><span class="s">${s.s}</span></span><span class="mins">~${s.mins} min</span>${icon('chev').replace('class="ti"', 'class="ti chev"')}</button>
          <div class="step-body"></div></div>`).join('')}</div>
      </div>

      ${L && L.hash ? `<a class="resume" href="${esc(L.hash)}" style="margin-top:18px"><span class="ti-wrap">${icon('play')}</span><div><div class="eyebrow">Continúa donde ibas</div><h3>${esc(L.title)}</h3><p class="small">${esc(L.sub || '')}</p></div><span class="go">Seguir →</span></a>` : ''}

      <div class="grid2" style="margin-top:18px">
        ${f ? `<div class="card plain" data-n="${f.c.number}"><div class="eyebrow">Tu ciclo actual</div><h3 style="margin:4px 0 2px">${esc(f.c.title)} <span class="muted small" style="font-family:var(--font-body);font-weight:700">· ${esc(f.c.subtitle || '')}</span></h3><p class="small muted" style="margin-bottom:10px">${availableUnits(f.c).length} de ${f.c.units.length} unidades disponibles · ${coursePct(f.c)}% del ciclo</p>
          <div class="dots">${f.c.units.map(u => u.available ? `<a class="dot ${unitPct(f.c.id, u) >= 100 ? 'full' : ''}" href="#/${f.c.id}/${u.id}" title="${esc(u.title)} · ${unitPct(f.c.id, u)}%"><i style="height:${unitPct(f.c.id, u)}%"></i><span>${u.number}</span></a>` : `<span class="dot locked"><span>${u.number}</span></span>`).join('')}</div>
          <div class="row" style="margin-top:14px"><a class="btn sm" href="#/${f.c.id}/${f.u.id}">Abrir Unit ${f.u.number}</a><a class="btn ghost sm" href="#/${f.c.id}">Ver el ciclo</a></div></div>` : ''}
        ${weakCard(f)}
      </div>

      <div class="eyebrow" style="margin:22px 0 10px">Herramientas</div>
      <div class="tool-cards">
        <a class="tool-card c" href="#/coach"><span class="ti-wrap">${icon('speak')}</span><div><h3>Speaking Coach</h3><p class="small">Conversa por voz, recibe correcciones y mide tu nivel.</p></div></a>
        <a class="tool-card m" href="#/method"><span class="ti-wrap">${icon('practice')}</span><div><h3>Práctica</h3><p class="small">Shadowing, quiz mezclado, 4-3-2, dictogloss y más.</p></div></a>
        <a class="tool-card t" href="#/translate"><span class="ti-wrap">${icon('translate')}</span><div><h3>Traductor con voz</h3><p class="small">Traduce, escucha y guarda palabras en tu repaso.</p></div></a>
      </div>`;
    $$('.step > button', view).forEach(b => b.onclick = () => toggleStep(b.parentElement, f, srs));
    // abre el primer paso pendiente
    const first = $$('.step', view).find(s => !s.classList.contains('done')); if (first && !T.steps[first.dataset.step]) toggleStep(first, f, srs, true);
  }

  function weakCard(f) {
    const errs = Mastery.errors();
    if (errs.length) {
      const top = errs.slice().sort((a, b) => (b.n - a.n) || (b.day - a.day)).slice(0, 3);
      return `<div class="card plain"><div class="eyebrow" style="color:var(--coral)">Cuaderno de errores</div><h3 style="margin:4px 0 8px">${errs.length} ${errs.length === 1 ? 'fallo pendiente' : 'fallos pendientes'} de volver a practicar</h3><ul class="weak-list small">${top.map(e => `<li><span class="kind" data-kind="${e.kind}">${Mastery.KIND[e.kind] || e.kind}</span> ${Mastery.errText(e)}${e.n > 1 ? ` <b style="color:var(--coral)">· ${e.n}×</b>` : ''}</li>`).join('')}</ul><a class="btn ghost sm" style="margin-top:10px" href="#/method/errors">Abrir el cuaderno</a></div>`;
    }
    const list = []; const add = (d, c, u) => (d?.weak || []).forEach(w => list.push({ w, href: `#/${c.id}/${u.id}/write`, label: `U${u.number}` }));
    if (f) add(f.d, f.c, f.u);
    if (list.length < 3) for (const c of COURSES.filter(c => c.available)) for (const u of availableUnits(c)) { if (f && u === f.u) continue; add(dataOf(c.id, u.id), c, u); if (list.length >= 6) break; }
    if (!list.length) return '';
    return `<div class="card plain"><div class="eyebrow" style="color:var(--coral)">Tus puntos débiles</div><h3 style="margin:4px 0 8px">Errores detectados en tus ejercicios</h3><ul class="weak-list small">${pick(list, 3).map(x => `<li>${x.w} <a href="${x.href}" class="small">· practicar ${x.label} →</a></li>`).join('')}</ul></div>`;
  }

  function toggleStep(el, f, srs, force) {
    const open = force ? true : !el.classList.contains('open');
    $$('.step', view).forEach(s => { s.classList.toggle('open', s === el && open); $('button', s).setAttribute('aria-expanded', s === el && open); });
    if (!open) return;
    const body = $('.step-body', el), id = el.dataset.step;
    if (body.dataset.ready) return; body.dataset.ready = 1;
    const done = () => markStep(id);
    const sctx = stepCtx(id, f);
    const foot = `<div class="step-foot"><button class="btn ghost sm st-done">Marcar como hecho ✓</button></div>`;
    if (!f) { body.innerHTML = `<div class="hint">No hay unidades cargadas.</div>`; return; }
    if (id === 'srs') {
      const n = srs ? srs.due.length : 0;
      body.innerHTML = `<div class="card"><div class="eyebrow">Repaso espaciado</div><h2>${n ? `${Math.min(n, 12)} tarjetas para hoy${n > 12 ? ` (de ${n})` : ''}` : 'Nada pendiente hoy'}</h2><p class="muted small intro">${n ? 'Piensa el significado antes de girar. Si la sabías, sube de caja; si no, vuelve a empezar.' : 'Mañana volverán las palabras que tocan. Si quieres más, abre <a href="#/method/srs">Práctica › Repaso</a>.'}</p><div class="srs-box"></div></div>${foot}`;
      if (n) Method.srsLoop($('.srs-box', body), sctx, { limit: 12, onDone: done }); else done();
    } else if (id === 'grammar') {
      const mine = actsOf(f.d, 'mcq', 'grammar').flatMap(mcqItems), others = [];
      for (const c of COURSES.filter(c => c.available)) for (const u of availableUnits(c)) { if (u === f.u) continue; const d = dataOf(c.id, u.id); if (d) actsOf(d, 'mcq', 'grammar').forEach(a => others.push(...mcqItems(a).map(it => ({ ...it, ctx: `Repaso · ${c.title} · U${u.number}` })))); }
      const items = shuffle([...pick(mine, 4), ...pick(others, 2)]);
      body.innerHTML = `<div class="card"><div class="eyebrow">Gramática · interleaving</div><h2>Decide qué regla aplica</h2><p class="muted small intro">Cuatro preguntas de la Unit ${f.u.number} y dos de unidades anteriores, sin avisar cuál es cuál.</p><div class="g-box"></div></div>${foot}`;
      Engine.renderers.mcq($('.g-box', body), { items, pool: items.length }, sctx.counting(items.length, done));
    } else if (id === 'errors') {
      const n = Math.min(6, Mastery.errors().length);
      body.innerHTML = `<div class="card"><div class="eyebrow" style="color:var(--coral)">Cuaderno de errores</div><h2>${n ? `${n} fallos recientes, otra vez` : 'Cuaderno vacío'}</h2><p class="muted small intro">${n ? 'Los más repetidos primero. Acertarlos los borra del cuaderno; fallarlos los deja para mañana.' : 'Nada pendiente. ¡Bien!'}</p><div class="e-box"></div></div>${foot}`;
      if (n) Mastery.renderDrill($('.e-box', body), sctx, { limit: 6, onDone: done }); else done();
    } else if (id === 'listen') {
      const sents = pick(actsOf(f.d, 'dictation').flatMap(a => a.sentences), 3);
      body.innerHTML = `<div class="card"><div class="eyebrow">Listening · dictado</div><h2>Escucha y escribe exactamente lo que oyes</h2><p class="muted small intro">Tres frases de la Unit ${f.u.number}. Baja la velocidad si hace falta; fíjate en las contracciones.</p><div class="l-box"></div></div>${foot}`;
      if (sents.length) Engine.renderers.dictation($('.l-box', body), { sentences: sents }, sctx.counting(3, done)); else { $('.l-box', body).innerHTML = '<p class="small muted">Esta unidad no tiene dictado.</p>'; }
    } else if (id === 'speak') {
      const ch = pick(actsOf(f.d, 'speaking').flatMap(a => a.challenges), 1);
      body.innerHTML = `<div class="card"><div class="eyebrow">Speaking · un minuto</div><div class="sp-box"></div><p class="small muted" style="margin-top:10px">¿Quieres feedback de verdad? Lleva este tema al <a href="#/coach">Speaking Coach</a>.</p></div>${foot}`;
      if (ch.length) Engine.renderers.speaking($('.sp-box', body), { challenges: ch }, sctx.counting(1, done)); else $('.sp-box', body).innerHTML = '<p class="small muted">Esta unidad no tiene retos de speaking.</p>';
    } else if (id === 'words') {
      body.innerHTML = `<div class="card"><div class="eyebrow">Vocabulario · palabras nuevas</div><h2>Seis palabras que entran a tu repaso</h2><p class="muted small intro">Léelas, escúchalas y decide: si ya la conocías empieza en la caja 2; si no, en la caja 1 y vuelve mañana.</p><div class="w-box"></div></div>${foot}`;
      newWords($('.w-box', body), f, sctx, done);
    }
    $('.st-done', body).onclick = () => { done(); };
  }

  /* ctx envuelto para la sesión: atribuye XP a la unidad en foco y cuenta respuestas para cerrar el paso */
  function stepCtx(id, f) {
    const where = f ? { course: f.c.id, unit: f.u.id, sec: STEPS.find(s => s.id === id)?.sec } : null;
    const base = { ...ctx, score: (good, pts) => score(good, pts, where), answer: info => { if (!info.good && id !== 'errors') Mastery.miss({ ...info, unit: f ? key(f.c.id, f.u.id) : '', sec: where?.sec || '', label: 'Sesión de hoy' }); } };
    base.counting = (n, onDone) => { let k = 0; return { ...base, score: (good, pts) => { base.score(good, pts); if (++k >= n) onDone(); } }; };
    return base;
  }
  function markStep(id) {
    if (T.steps[id]) return; T.steps[id] = true; store('et-today', T);
    const el = $(`.step[data-step="${id}"]`, view); if (el) { el.classList.add('done'); $('.n', el).innerHTML = icon('check'); }
    const doneN = STEPS.filter(s => T.steps[s.id]).length;
    const r = $('.session .ring', view); if (r) { r.style.setProperty('--p', doneN / STEPS.length * 100); r.classList.toggle('done', doneN >= STEPS.length); $('b', r).textContent = `${doneN}/${STEPS.length}`; }
    if (doneN >= STEPS.length) { dayRec().done = true; store('et-days', D); toast('🎉 Sesión completa. ¡Hasta mañana!'); score(true, 30, null); setTimeout(renderToday, 1500); }
    else { const h = $('.session h2', view); if (h) h.textContent = 'Sigue, ya casi está.'; const next = $$('.step', view).find(s => !s.classList.contains('done')); if (next) setTimeout(() => toggleStep(next, focusUnit(), Method.srsStats(), true), 600); }
  }

  /* palabras nuevas: tarjetas que aún no están en el SRS, se califican y entran al mazo */
  function newWords(root, f, sctx, onDone) {
    const st = load('et-srs', {}), tn = Math.floor(Date.now() / 864e5);
    const all = actsOf(f.d, 'flashcards').flatMap(a => a.cards.map(cd => ({ ...cd, id: key(f.c.id, f.u.id) + '|' + cd.w })));
    let cards = pick(all.filter(c => !st[c.id]), 6);
    if (!cards.length) { // todas vistas: repasa las de caja 1 de esta unidad
      cards = pick(all.filter(c => (st[c.id]?.box || 1) === 1), 6);
      if (!cards.length) { root.innerHTML = '<div class="hint">Ya tienes todas las palabras de esta unidad en el repaso. ¡Bien!</div>'; onDone(); return; }
    }
    let i = 0, known = 0;
    function draw() {
      if (i >= cards.length) { root.innerHTML = `<div class="hint">Listo: ${known} ya las conocías y ${cards.length - known} entran mañana al repaso.</div>`; onDone(); return; }
      const c = cards[i];
      root.innerHTML = `<div class="flash"><div class="inner"><div class="face front"><div class="eyebrow">${esc(c.cat || 'nueva')} · ${i + 1} / ${cards.length}</div><div class="word">${esc(c.w)}</div><p class="muted small">toca para ver el significado</p></div>
        <div class="face back"><p style="font-weight:700">${esc(c.def)}</p><p class="small">${c.ex ? '“' + esc(c.ex) + '”' : ''}</p><p class="small muted">${esc(c.ask || '')}</p></div></div></div>
        <div class="row" style="margin-top:12px"><button class="btn ghost nw-say">🔊 Escuchar</button><span style="flex:1"></span><button class="btn ghost nw-no">Nueva para mí</button><button class="btn nw-yes">Ya la conocía ✓</button></div>`;
      const fl = $('.flash', root); fl.onclick = () => fl.classList.toggle('flipped');
      $('.nw-say', root).onclick = e => { e.stopPropagation(); sctx.say((c.say || c.w.replace(' / ', ', ')) + '. ' + (c.ex || '')); };
      const grade = good => { st[c.id] = good ? { box: 2, due: tn + 2 } : { box: 1, due: tn + 1 }; store('et-srs', st); if (good) known++; sctx.score(true, good ? 4 : 2); i++; draw(); };
      $('.nw-yes', root).onclick = () => grade(true); $('.nw-no', root).onclick = () => grade(false);
    }
    draw();
  }

  /* ======================= CURSO (ciclos) ======================= */
  function renderCourses() {
    setPage('home');
    view.innerHTML = `${crumbs([['Hoy', '#/'], ['Curso', '']])}
      <div class="page-head"><div class="eyebrow">Tu programa de inglés</div><h1>Ciclos y unidades</h1><p class="muted">Cada ciclo agrupa las unidades de tu curso. Dentro de cada unidad tienes lo que viste en clase, convertido en práctica: vocabulario, gramática, listening, speaking, reading, writing y social English.</p></div>
      <div class="unit-cards">${COURSES.map(c => c.available
        ? `<a class="unit-card" data-n="${c.number}" href="#/${c.id}"><span class="big">${c.number}</span><h3>${esc(c.title)}</h3><p class="small muted">${esc(c.subtitle || '')}</p><span class="small">${availableUnits(c).length} de ${c.units.length} unidades listas${c.current ? ' · <b>ciclo actual</b>' : ''}</span><div class="bar"><i style="width:${coursePct(c)}%"></i></div></a>`
        : `<div class="unit-card locked" data-n="${c.number}"><span class="big">${c.number}</span><h3>${esc(c.title)}</h3><p class="small muted">${esc(c.subtitle || '')} — se añadirá cuando llegues a este ciclo.</p></div>`).join('')}</div>`;
  }

  function renderCourse(cId) {
    const c = course(cId); if (!c || !c.available) { location.hash = '#/curso'; return; }
    setPage('home', cId);
    view.innerHTML = `${crumbs([['Hoy', '#/'], ['Curso', '#/curso'], [c.title, '']])}
      <div class="unit-head" data-n="${c.number}"><div class="eyebrow">${c.practical ? 'Situaciones reales' : 'Ciclo ' + c.number} · ${esc(c.subtitle || '')}</div><h1>${esc(c.title)}</h1><p class="small">${c.practical ? `${availableUnits(c).length} situaciones listas · ${coursePct(c)}% completado. Cada una es una unidad completa: frases, gramática mínima, audio, role-plays con ramas y escritura.` : `${availableUnits(c).length} unidades listas · ${coursePct(c)}% completado. Las que aún no has visto en clase aparecen como "Próximamente".`}</p></div>
      <div class="unit-cards">${c.units.map(u => u.available
        ? `<a class="unit-card" data-n="${u.number % 6}" href="#/${c.id}/${u.id}"><span class="big">${String(u.number).padStart(2, '0')}</span><h3>${esc(u.title)}</h3><p class="small muted">${esc(u.subtitle || '')}</p><span class="small">${(dataOf(c.id, u.id)?.sections.length || 1) - 1} secciones · ${unitPct(c.id, u)}%</span><div class="bar"><i style="width:${unitPct(c.id, u)}%"></i></div></a>`
        : `<div class="unit-card locked" data-n="${u.number % 6}"><span class="big">${String(u.number).padStart(2, '0')}</span><h3>Unit ${u.number}</h3><p class="small muted">Próximamente</p></div>`).join('')}</div>`;
  }

  /* ======================= UNIDAD ======================= */
  function renderUnit(cId, uId, secId) {
    const c = course(cId), u = unitOf(c, uId), data = dataOf(cId, uId);
    if (!c || !u || !u.available || !data) { location.hash = c ? '#/' + cId : '#/curso'; return; }
    const sections = data.sections, sec = sections.find(s => s.id === secId) || sections[0];
    setPage(sec.id, cId, uId, sec.id);
    // recuerda el último sitio; la portada no pisa la sección que estabas practicando
    if (sec.render !== 'overview' || !(L && L.course === cId && L.unit === uId)) { L = { hash: `#/${cId}/${uId}/${sec.id}`, course: cId, unit: uId, title: `Unit ${u.number} · ${u.title}`, sub: `${c.title} › ${sec.label}` }; store('et-last', L); }
    view.innerHTML = `${crumbs([['Hoy', '#/'], [c.title, '#/' + c.id], ['Unit ' + u.number, '']])}
      <div class="unit-head ${sec.render === 'overview' ? '' : 'compact'}"><div class="eyebrow">${esc(data.source || c.title + ' · Unit ' + u.number)}</div><h1>${esc(u.title)}</h1><p class="small">${lite(data.description || '')}</p></div>
      <div class="section-tabs"><div class="tabs">${sections.map(s => `<a class="tab ${s.id === sec.id ? 'active' : ''}" data-sec="${s.id}" href="#/${c.id}/${u.id}/${s.id}" ${s.id === sec.id ? 'aria-current="page"' : ''}>${icon(s.id)}<span class="tl">${esc(s.label)}</span><span class="ts">${esc(SHORT[s.id] || s.label)}</span></a>`).join('')}</div></div>
      <div class="sec-body"></div>`;
    const body = $('.sec-body', view);
    if (sec.render === 'overview') return renderOverview(body, c, u, data);
    const acts = sec.activities;
    if (acts.length > 1) {
      const TYPE_LABEL = { reading: 'Lectura', notes: 'Notas', flashcards: 'Flashcards', dictation: 'Dictado', dialog: 'Diálogo', speaking: 'Retos', stress: 'Pronunciación', comment: 'Escribe', fix: 'Corrige', order: 'Ordena' };
      body.innerHTML = `<div class="sub">${acts.map((a, i) => `<button class="${i ? '' : 'on'}" data-a="${i}">${esc(a.label || TYPE_LABEL[a.type] || a.title || a.type)}</button>`).join('')}</div>` + acts.map((a, i) => `<div class="act ${i ? '' : 'on'}" data-a="${i}"></div>`).join('');
      $('.sub', body).onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('.sub button', body).forEach(x => x.classList.toggle('on', x === b)); $$('.act', body).forEach(x => x.classList.toggle('on', x.dataset.a === b.dataset.a)); b.scrollIntoView({ inline: 'center', block: 'nearest' }); };
    } else body.innerHTML = `<div class="act on" data-a="0"></div>`;
    acts.forEach((a, i) => { const r = Engine.renderers[a.type], root = $(`.act[data-a="${i}"]`, body); if (r) r(root, a, actCtx(key(cId, uId), sec.id, a, { course: cId, unit: uId, sec: sec.id })); else root.innerHTML = `<div class="card">Tipo de actividad desconocido: ${esc(a.type)}</div>`; });
  }
  const LVL_COLOR = ['var(--surface3)', 'var(--amber-2)', 'var(--teal-2)', 'var(--ok)'];
  const segBar = (counts, labels) => { const total = counts.reduce((a, b) => a + b, 0) || 1; return `<div class="seg">${counts.map((n, k) => n ? `<i style="width:${n / total * 100}%;background:${LVL_COLOR[k]}" title="${n} ${labels[k]}"></i>` : '').join('')}</div><div class="seg-legend">${counts.map((n, k) => `<span><i style="background:${LVL_COLOR[k]}"></i>${n} ${labels[k]}</span>`).join('')}</div>`; };

  function renderOverview(body, c, u, data) {
    const up = S.units[key(c.id, u.id)] || { xp: 0, ok: 0, bad: 0, secs: {} };
    const pct = unitPct(c.id, u), secs = data.sections.filter(s => s.render !== 'overview');
    const acc = (ok, bad) => ok + bad ? Math.round(ok / (ok + bad) * 100) : null;
    const lastSec = L && L.unit === u.id && L.course === c.id && L.hash.split('/')[3] !== 'home' ? L.hash.split('/')[3] : null;
    const cando = load('et-cando', {})[key(c.id, u.id)] || {};
    body.innerHTML = `<div class="stack">
      <div class="card"><div class="u-hero"><div>
          <div class="eyebrow">Tu progreso en esta unidad</div><h2>${pct >= 100 ? 'Unidad completada. Sigue repasando.' : pct ? `Vas por el ${pct}%` : 'Empieza por donde te sientas menos seguro'}</h2>
          <p class="muted small" style="margin:6px 0 12px">${up.ok} aciertos · ${up.bad} errores${acc(up.ok, up.bad) !== null ? ` · ${acc(up.ok, up.bad)}% de precisión` : ''} · objetivo ${u.xpGoal || 600} XP</p>
          <div class="row"><a class="btn" href="#/${c.id}/${u.id}/${lastSec || 'vocab'}">${lastSec ? 'Continuar en ' + esc(secs.find(s => s.id === lastSec)?.label || lastSec) : 'Empezar por Vocabulary'} →</a><a class="btn ghost" href="#/">Sesión de hoy</a></div>
        </div>${ring(pct, 'XP', pct + '%')}</div></div>

      <div><div class="eyebrow" style="margin-bottom:10px">Secciones</div>
      <div class="sec-grid">${secs.map(s => { const sp = up.secs?.[s.id] || { ok: 0, bad: 0 }, a = acc(sp.ok, sp.bad); return `<a class="sec-card" data-sec="${s.id}" href="#/${c.id}/${u.id}/${s.id}"><span class="ti-wrap">${icon(s.id)}</span>${a !== null ? `<span class="acc">${a}%</span>` : ''}<h3>${esc(s.label)}</h3><span class="s">${s.activities.length} ${s.activities.length === 1 ? 'actividad' : 'actividades'}${sp.ok + sp.bad ? ` · ${sp.ok} ✔` : ''}</span><div class="bar"><i style="width:${a ?? 0}%"></i></div></a>`; }).join('')}</div></div>

      ${(() => { const ms = Mastery.unitSummary(key(c.id, u.id), data); return `<div class="card"><div class="eyebrow">Dominio</div><h2>Qué tienes ya y qué falta</h2><p class="muted small intro">El vocabulario sube de nivel con el repaso espaciado; los puntos de gramática, con tus respuestas en esta unidad (tres aciertos seguidos y buena precisión = dominado).</p>
        <div class="grid2"><div><h3 style="margin-bottom:8px">Vocabulario · ${ms.vocabTotal} palabras</h3>${segBar(ms.vocab, ['nuevas', 'vistas', 'en práctica', 'dominadas'])}</div>
        <div><h3 style="margin-bottom:8px">Gramática · ${ms.points.filter(p => p.level === 3).length} de ${ms.points.length} puntos dominados</h3><div class="lvls">${ms.points.map(p => `<a class="lvl l${p.level}" href="#/${c.id}/${u.id}/grammar" title="${p.n ? `${p.ok}/${p.n} aciertos` : 'sin intentos'} · ${Mastery.LEVELS[p.level]}">${esc(p.label)}</a>`).join('')}</div></div></div></div>`; })()}

      <div class="card"><div class="eyebrow">Mapa de la unidad</div><h2>Lo que estás aprendiendo</h2><p class="muted small intro">Todo sale directamente de tu material del curso. A la izquierda, lo que viste en clase; a la derecha, cómo lo practicas aquí.</p>
        <div class="map">${data.map.map(r => `<div class="map-row"><div class="area">${r[0]}</div><div><span class="lbl">En el curso</span>${r[1]}</div><div><span class="lbl">Aquí practicas</span>${r[2]}</div></div>`).join('')}</div></div>

      <div class="grid2">
        ${data.cando ? `<div class="card"><div class="eyebrow">Al terminar la unidad…</div><h2>Puedo…</h2><p class="muted small intro">Marca lo que ya sabes hacer sin pensarlo. Sé honesto: lo que quede sin marcar es tu próximo objetivo.</p><div class="cando">${data.cando.map((t, i) => `<label class="${cando[i] ? 'on' : ''}"><input type="checkbox" data-i="${i}" ${cando[i] ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div></div>` : ''}
        ${data.weak ? `<div class="card"><div class="eyebrow" style="color:var(--coral)">Detectado en tus ejercicios</div><h2>Tus puntos débiles</h2><ul class="weak-list small" style="margin-top:8px">${data.weak.map(w => `<li>${w}</li>`).join('')}</ul>${data.weakLink ? `<p class="small" style="margin-top:10px">→ ${data.weakLink}</p>` : ''}</div>` : ''}
      </div></div>`;
    $$('.cando input', body).forEach(inp => inp.onchange = () => { const all = load('et-cando', {}), k = key(c.id, u.id); (all[k] ||= {})[inp.dataset.i] = inp.checked; store('et-cando', all); inp.closest('label').classList.toggle('on', inp.checked); if (inp.checked) toast('✓ Anotado'); });
  }

  /* ======================= PERFIL ======================= */
  function renderProfile() {
    setPage('home');
    const st = streak(), best = bestStreak(), days = Object.keys(D).map(Number).filter(active), tn = today();
    const weekSecs = weekDays().reduce((a, d) => a + (D[d]?.secs || 0), 0), acc = S.ok + S.bad ? Math.round(S.ok / (S.ok + S.bad) * 100) : 0;
    const srs = window.Method ? Method.srsStats() : null;
    // mapa de calor: 16 semanas, columnas = semanas, filas = lunes…domingo
    const start = weekStart(tn) - 15 * 7, cells = [];
    for (let d = start; d < start + 16 * 7; d++) { const r = D[d]; const n = r ? r.ok + (r.done ? 20 : 0) + Math.floor((r.secs || 0) / 120) : 0; cells.push(`<i class="${d > tn ? '' : n >= 25 ? 'l3' : n >= 10 ? 'l2' : n > 0 || (r && active(d)) ? 'l1' : ''} ${d === tn ? 'today' : ''}" title="${dateOf(d).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}${r ? ` · ${r.ok} ✔ · ${minutes(r.secs)} min${r.done ? ' · sesión completa' : ''}` : ''}"></i>`); }
    view.innerHTML = `${crumbs([['Hoy', '#/'], ['Perfil', '']])}
      <div class="page-head"><div class="eyebrow">Tu perfil</div><h1>Cómo vas</h1><p class="muted">Lo que importa no es el XP sino la constancia: días seguidos, minutos reales y precisión.</p></div>
      <div class="stat" style="margin-bottom:18px">
        <div><b>${st} 🔥</b><span class="small muted">racha actual · mejor ${best}</span></div>
        <div><b>${days.length}</b><span class="small muted">días con práctica</span></div>
        <div><b>${minutes(weekSecs)}</b><span class="small muted">minutos esta semana</span></div>
        <div><b>${acc}%</b><span class="small muted">precisión · ${S.ok} ✔ / ${S.bad} ✘</span></div>
        <div><b>${S.xp}</b><span class="small muted">XP · nivel ${Math.floor(S.xp / 100) + 1}</span></div>
      </div>
      <div class="grid2">
        <div class="card"><div class="eyebrow">Últimas 16 semanas</div><h2>Tu calendario de práctica</h2><p class="muted small intro">Cada cuadro es un día. Cuanto más oscuro, más practicaste. El borde ámbar es hoy.</p>
          <div class="heat">${cells.join('')}</div><div class="heat-legend">menos <i></i><i class="l1"></i><i class="l2"></i><i class="l3"></i> más</div></div>
        <div class="card"><div class="eyebrow">Objetivo semanal</div><h2>${sessionsThisWeek()} de ${P.goal} sesiones</h2><p class="muted small intro">Una sesión cuenta cuando completas todos los pasos de "Hoy". Elige un objetivo que puedas cumplir incluso en una semana mala.</p>
          <div class="goal-pick">${[3, 4, 5, 6, 7].map(n => `<button class="${P.goal === n ? 'on' : ''}" data-g="${n}">${n} / semana</button>`).join('')}</div>
          ${srs ? `<div style="margin-top:18px"><div class="eyebrow">Repaso espaciado</div><p class="small" style="margin-top:4px"><b>${srs.due.length}</b> tarjetas pendientes hoy · <b>${srs.seen}</b> ya repasadas de <b>${srs.total}</b> · <b>${srs.counts[5]}</b> dominadas (caja 6)</p><div class="boxes">${srs.counts.map((n, k) => `<div class="box b${k + 1}"><b>${n}</b><span>caja ${k + 1}</span></div>`).join('')}</div><a class="btn ghost sm" style="margin-top:10px" href="#/method/srs">Ir al repaso</a></div>` : ''}</div>
      </div>
      ${(() => { const sk = Mastery.skillTotals(), vt = Mastery.vocabTotals(), SECN = { vocab: 'Vocabulary', grammar: 'Grammar', listen: 'Listening', speak: 'Speaking', read: 'Reading', write: 'Writing', social: 'Social English' }; const errs = Mastery.errors().length; return `<div class="grid2" style="margin-top:18px">
        <div class="card"><div class="eyebrow">Dominio</div><h2>Por destreza</h2><p class="muted small intro">Precisión acumulada en cada destreza y cuántas actividades tienes dominadas.</p><div class="skills">${Object.keys(SECN).map(s => { const o = sk[s] || { n: 0, ok: 0, items: 0, mastered: 0 }, acc = o.n ? Math.round(o.ok / o.n * 100) : 0; return `<div class="skill" data-sec="${s}"><span class="nm">${icon(s)} ${SECN[s]}</span><div class="bar"><i style="width:${acc}%"></i></div><span class="val">${o.n ? acc + '%' : '—'}<small> · ${o.mastered}/${o.items} dominadas</small></span></div>`; }).join('')}</div></div>
        <div class="card"><div class="eyebrow">Vocabulario</div><h2>${vt[3]} palabras dominadas</h2><p class="muted small intro">De ${vt.reduce((a, b) => a + b, 0)} en todas las unidades. Una palabra está dominada cuando llega a la caja 4 del repaso.</p>${segBar(vt, ['nuevas', 'vistas', 'en práctica', 'dominadas'])}
          <div style="margin-top:16px"><div class="eyebrow" style="color:var(--coral)">Cuaderno de errores</div><p class="small" style="margin:4px 0 8px"><b>${errs}</b> ${errs === 1 ? 'error pendiente' : 'errores pendientes'} de volver a practicar.</p><a class="btn ghost sm" href="#/method/errors">Abrir el cuaderno</a></div></div></div>`; })()}
      <div class="card" style="margin-top:18px"><div class="eyebrow">Por ciclo y unidad</div><h2>Progreso del curso</h2>
        ${COURSES.filter(c => c.available).map(c => `<h3 style="margin:16px 0 8px">${esc(c.title)} <span class="muted small" style="font-family:var(--font-body);font-weight:700">· ${coursePct(c)}%</span></h3><div class="prog" data-n="${c.number}">${availableUnits(c).map(u => { const p = S.units[key(c.id, u.id)] || { ok: 0, bad: 0 }; return `<div class="prog-row"><a href="#/${c.id}/${u.id}">U${u.number} · ${esc(u.title)}</a><span class="pct">${unitPct(c.id, u)}% · ${p.ok} ✔</span><div class="bar"><i style="width:${unitPct(c.id, u)}%"></i></div></div>`; }).join('')}</div>`).join('')}</div>
      <div class="card" style="margin-top:18px"><div class="eyebrow">Ajustes</div><h2>Voz y datos</h2>
        <div class="row" style="margin-top:10px"><button class="btn ghost" id="pfVoice">🔊 Elegir voz y velocidad</button><a class="btn ghost" href="#/coach/settings">Ajustes de IA del Coach</a><span style="flex:1"></span><button class="btn ghost danger" id="pfReset">Borrar todo el progreso</button></div>
        <p class="small muted" style="margin-top:10px">Todo se guarda solo en este navegador. Si cambias de dispositivo, el progreso empieza de cero.</p></div>`;
    $$('.goal-pick button', view).forEach(b => b.onclick = () => { P.goal = +b.dataset.g; store('et-prefs', P); renderProfile(); });
    $('#pfVoice').onclick = e => { e.stopPropagation(); toggleVoice(true); };
    const rb = $('#pfReset'); rb.onclick = () => { if (rb.dataset.arm) { ['et-progress', 'et-days', 'et-today', 'et-last', 'et-srs', 'et-cando', 'et-mastery', 'et-errors'].forEach(k => localStorage.removeItem(k)); location.reload(); } else { rb.dataset.arm = 1; rb.textContent = '¿Seguro? Pulsa otra vez para borrar'; setTimeout(() => { delete rb.dataset.arm; rb.textContent = 'Borrar todo el progreso'; }, 4000); } };
  }

  /* ---------- router ---------- */
  function renderTool(name, sub) {
    setPage({ coach: 'speak', method: 'grammar', translate: 'listen' }[name] || 'home');
    const mod = { coach: window.Coach, method: window.Method, translate: window.Translator }[name];
    if (!mod) { view.innerHTML = '<div class="card">Herramienta no disponible.</div>'; return; }
    mod.render(view, ctx, sub);
  }
  function route() {
    const [c, u, s] = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!c) renderToday();
    else if (c === 'curso') renderCourses();
    else if (c === 'perfil') renderProfile();
    else if (c === 'coach' || c === 'method' || c === 'translate') renderTool(c, u);
    else if (!u) renderCourse(c); else renderUnit(c, u, s);
    window.scrollTo({ top: 0 });
  }
  window.addEventListener('hashchange', route);
  renderXP(); route();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { }); });
  }
})();
