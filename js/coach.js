/* ===========================================================
   coach.js — Speaking Coach
   Conversa por voz sobre los temas del curso, improvisa role-plays
   con la IA, evalúa lo que dices y guarda tus errores para repasarlos.

   Tres "proveedores" de inteligencia, por orden de preferencia:
     1) claude  → la página abierta dentro de claude.ai (capacidad `sample`)
     2) key     → tu propia API key de Anthropic guardada SOLO en este navegador
     3) local   → sin IA: métricas + detector de errores típicos (siempre activo)
   =========================================================== */
window.Coach = (() => {
  const { $, $$, esc, shuffle, pick, norm, diffWords } = Engine.util;
  const strip = h => String(h || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const cleanModel = m => { let t = strip(m); t = t.replace(/^(modelo|model|ejemplo|example)\s*(de respuesta)?\s*[:：]\s*/i, '').trim(); if (/^["“'‘]/.test(t) && /["”'’]$/.test(t)) t = t.slice(1, -1).trim(); return t; };
  const LS = { hist: 'et-coach', key: 'et-anthropic-key', model: 'et-anthropic-model', auto: 'et-coach-autospeak' };
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };

  /* ---------------- reconocimiento de voz (compartido con Método) ---------------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function listen({ onText, onEnd, onError, continuous = true }) {
    if (!SR) { onError && onError('unsupported'); return null; }
    const rec = new SR(); rec.lang = 'en-US'; rec.continuous = continuous; rec.interimResults = true; rec.maxAlternatives = 1;
    let fin = '';
    rec.onresult = e => { let inter = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) fin += r[0].transcript + ' '; else inter += r[0].transcript; } onText && onText((fin + inter).trim(), fin.trim()); };
    rec.onend = () => onEnd && onEnd(fin.trim());
    rec.onerror = e => onError && onError(e.error);
    try { rec.start(); } catch (e) { onError && onError('start'); return null; }
    return rec;
  }
  window.Speech = { listen, supported: !!SR };

  /* ---------------- proveedor de IA ---------------- */
  const AI = {
    sample: null, ready: null, provider: 'local',
    init() {
      if (this.ready) return this.ready;
      this.ready = (async () => {
        if (window.claude?.use) { try { this.sample = await claude.use('sample'); } catch (e) { this.sample = null; } }
        this.provider = this.sample ? 'claude' : (localStorage.getItem(LS.key) ? 'key' : 'local');
        return this.provider;
      })();
      return this.ready;
    },
    label() { return { claude: 'Claude (dentro de claude.ai)', key: 'Tu API key de Anthropic', local: 'Sin IA · análisis local' }[this.provider]; },
    async chat(turns, { onText, signal, json = false, tier = 'default', max = 1500 } = {}) {
      await this.init();
      if (this.provider === 'claude') {
        const opts = { cache: false, signal, modelTier: tier, onText: onText ? ({ text }) => onText(text) : undefined };
        return json ? this.sample.json(turns, opts) : (await this.sample(turns, opts)).text;
      }
      if (this.provider === 'key') {
        const key = localStorage.getItem(LS.key), model = localStorage.getItem(LS.model) || 'claude-sonnet-5';
        let sys = 'You are an expert English tutor. Follow the instructions in the user message exactly and reply only in the requested format.', msgs = turns.map(t => ({ role: t.role, content: t.content }));
        if (turns.length > 1) { sys = turns[0].content; msgs = turns.slice(1).map(t => ({ role: t.role, content: t.content })); }
        const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal, headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify({ model, max_tokens: max, system: sys, messages: msgs }) });
        if (!res.ok) { const t = await res.text(); throw { code: res.status === 401 ? 'not_granted' : 'upstream_error', message: t.slice(0, 200) }; }
        const data = await res.json(); const text = (data.content || []).map(c => c.text || '').join('');
        if (!json) { onText && onText(text); return text; }
        const m = text.match(/\{[\s\S]*\}/); if (!m) throw { code: 'invalid_json', message: 'sin JSON', text }; return JSON.parse(m[0]);
      }
      throw { code: 'not_granted', message: 'sin proveedor' };
    },
  };

  /* ---------------- análisis local ---------------- */
  const FILLERS = ['um', 'uh', 'eh', 'mm', 'like', 'you know', 'so', 'well', 'este', 'o sea', 'basically', 'actually'];
  // errores típicos de hispanohablantes (patrón → corrección → por qué)
  const RULES = [
    [/\bpeople (is|was|has|does)\b/i, 'people are / were / have / do', '<i>people</i> es plural en inglés.'],
    [/\bi have (\d+|twenty|thirty|forty) years( old)?\b/i, 'I am … years old', 'La edad se dice con <b>be</b>, no con <i>have</i>.'],
    [/\bdepend(s|ed|ing)? of\b/i, 'depend on', '<b>depend on</b>, nunca <i>of</i>.'],
    [/\b(explain|say|tell|suggest|recommend) me\b/i, 'explain it to me / tell me', '<i>explain/say/suggest</i> + to me; solo <b>tell me</b> lleva objeto directo.'],
    [/\bi am agree\b/i, 'I agree', '<i>agree</i> es verbo: <b>I agree</b>, no <i>I am agree</i>.'],
    [/\bmore (better|worse|easier|bigger|cheaper|faster|older|younger|harder)\b/i, 'better / easier…', 'El comparativo ya está en la palabra; no lleva <i>more</i>.'],
    [/\bthe most (easy|cheap|big|fast|hard|old|young|tall|short|long|small)\b/i, 'the easiest / cheapest…', 'Adjetivos cortos: superlativo con <b>-est</b>.'],
    [/\bmake (a|the) (party|photo|question|mistake decision|homework|exam)\b/i, 'have a party / take a photo / ask a question / do homework / take an exam', 'Collocation: <i>make</i> no va con estas palabras.'],
    [/\bfor to\b/i, 'to + verbo', '<i>for to</i> no existe: usa <b>to</b> + infinitivo.'],
    [/\b(he|she|it) (don't|have|do|go|want|need|like|work|live|think)\b/i, 'he doesn\'t / has / does / goes…', 'Tercera persona singular: <b>-s</b> o <b>doesn\'t</b>.'],
    [/\bdidn't (went|had|was|were|did|saw|made|took|came|got|said|bought|thought)\b/i, "didn't go / have / do…", 'Después de <i>didn\'t</i> el verbo va en forma base.'],
    [/\b(assist|assisted|assisting) to\b/i, 'attend / go to', '<i>assist</i> = ayudar. Asistir a = <b>attend</b>.'],
    [/\blisten (to )?music\b/i, 'listen to music', '<b>listen to</b> siempre con <i>to</i>.'],
    [/\bmarried with\b/i, 'married to', '<b>married to</b>.'],
    [/\barrive(d|s)? to\b/i, 'arrive at / in', '<b>arrive at</b> (lugar) / <b>arrive in</b> (ciudad, país).'],
    [/\bin this moment\b/i, 'right now / at the moment', 'Calco del español.'],
    [/\bresponsible of\b/i, 'responsible for', '<b>responsible for</b>.'],
    [/\bparticipate on\b/i, 'participate in', '<b>participate in</b>.'],
    [/\bhaven't (time|money|a car|any)\b/i, "don't have time / money…", '<i>have</i> como verbo principal se niega con <b>don\'t have</b>.'],
    [/\bsince (\d+|two|three|four|five|six|seven|eight|nine|ten|many|several) (years|months|weeks|days)\b/i, 'for … years', '<b>for</b> + duración; <b>since</b> + punto de partida.'],
    [/\bis (very )?(important|necessary|difficult|easy|possible|better) to\b/i, 'it is important to…', 'En inglés el sujeto es obligatorio: <b>It is</b>…'],
    [/\b(my|the) (brother|sister|mother|father|boss|friend|wife|husband) (he|she) \b/i, 'my brother is…', 'Doble sujeto: no repitas <i>he/she</i> después del sustantivo.'],
    [/\bactually\b/i, 'currently / right now (si querías decir "actualmente")', '<i>actually</i> = en realidad, no "actualmente".'],
    [/\b(a|an) (advice|information|news|furniture|homework|money)\b/i, 'some advice / a piece of advice', 'Sustantivo incontable: sin <i>a/an</i>.'],
    [/\bvery much like\b/i, 'like … very much / really like', 'Orden: <b>I really like</b> it.'],
    [/\b(i|we|they) (has)\b/i, 'have', 'Concordancia: <i>I/we/they</i> + <b>have</b>.'],
    [/\bwas being to\b/i, "'ve been to", 'Experiencia sin fecha → present perfect: <b>I\'ve been to</b>.'],
    [/\bi'd want\b/i, "I'd like", 'Para deseos suena natural <b>I\'d like</b>.'],
    [/\b(watch|watching) (my|the|a) (medal|photo|picture|painting)\b/i, 'look at', '<i>watch</i> es para cosas en movimiento; una foto se <b>look at</b>.'],
    [/\bwin money\b/i, 'earn money', 'Ganar dinero trabajando = <b>earn</b>; <i>win</i> es en un premio o juego.'],
    [/\bknow (him|her|them|it|you|my boss|the city) (yesterday|last|two|three|in \d{4})\b/i, 'met', 'Conocer por primera vez = <b>meet</b>; <i>know</i> es la relación continua.'],
  ];
  function analyze(text, seconds) {
    const t = text.trim(); const words = t ? t.split(/\s+/) : []; const n = words.length;
    const sentences = t.split(/[.!?]+/).filter(s => s.trim().length > 2);
    const low = ' ' + norm(t) + ' ';
    const fillers = FILLERS.reduce((a, f) => a + (low.match(new RegExp(' ' + f.replace(/ /g, ' ') + ' ', 'g')) || []).length, 0);
    const freq = {}; words.map(w => norm(w)).filter(w => w.length > 3).forEach(w => freq[w] = (freq[w] || 0) + 1);
    const repeated = Object.entries(freq).filter(([, c]) => c >= 3).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const uniq = new Set(words.map(w => norm(w)).filter(Boolean)).size;
    const errors = RULES.filter(([re]) => re.test(t)).map(([re, fix, why]) => ({ you: (t.match(re) || [''])[0], better: fix, why }));
    return { words: n, wpm: seconds ? Math.round(n / (seconds / 60)) : null, sentences: sentences.length, avgLen: sentences.length ? Math.round(n / sentences.length) : n, fillers, repeated, ttr: n ? Math.round(uniq / n * 100) : 0, errors };
  }
  function bandFor(m) { // orientación CEFR muy aproximada solo con métricas locales
    if (m.words < 25) return { band: '—', note: 'Habla al menos 30-40 segundos para tener una estimación.' };
    let s = 0; if (m.wpm >= 110) s += 2; else if (m.wpm >= 85) s += 1; if (m.ttr >= 60) s += 1; if (m.avgLen >= 10) s += 1; if (m.errors.length === 0) s += 1; else if (m.errors.length >= 3) s -= 1; if (m.fillers > n(m) * .06) s -= 1;
    return { band: s >= 4 ? 'B2' : s >= 2 ? 'B1+' : s >= 1 ? 'B1' : 'A2+', note: 'Estimación orientativa a partir de ritmo, variedad y errores detectados.' };
    function n(m) { return Math.max(m.words, 1); }
  }

  /* ---------------- temas del curso ---------------- */
  function topics() {
    const out = [];
    for (const c of COURSES.filter(c => c.available)) for (const u of c.units.filter(u => u.available)) {
      const d = UNIT_DATA[c.id + '/' + u.id]; if (!d) continue;
      d.sections.forEach(s => s.activities.forEach(a => { if (a.type === 'speaking') a.challenges.forEach(ch => out.push({ t: strip(ch.t), task: strip(ch.task), model: cleanModel(ch.model), tags: ch.tags, unit: `${c.title} · U${u.number}` })); }));
    }
    return out;
  }
  const FREE = [
    { t: 'My job and my projects', task: 'Habla de tu trabajo: qué haces, qué proyecto tienes ahora, qué te gustaría cambiar.', tags: ['work', 'project', 'team', 'because', 'would like'],
      model: "I work as a software developer for a bank. Right now I'm working on a project that connects our payment system with a new provider, so I spend most of my day writing and testing code. I've been on this team for about two years. What I like most is solving problems with people who know a lot, but I'd like to have more time to learn new tools. In the future, I'd love to lead a small team." },
    { t: 'My business', task: 'Cuenta cómo funciona tu negocio, qué vendes, quiénes son tus clientes y qué reto tienes.', tags: ['customers', 'sell', 'challenge', 'usually', 'plan'],
      model: "I run a small food business with my family. We sell empanadas and a few other snacks, mostly to people in our neighborhood and to offices nearby. We usually get orders through WhatsApp, and we deliver on weekends. The biggest challenge is keeping the quality the same every day, because we depend on a supplier for the bread. My plan for this year is to set a goal of twenty regular customers and to improve our social media." },
    { t: 'A typical week', task: 'Describe una semana normal: rutinas, estudio, tiempo libre.', tags: ['usually', 'every', 'after', 'before', 'weekend'],
      model: "My weeks are pretty busy. From Monday to Friday I usually get up at six, work until five or six, and then I study for my degree in the evening. I try to practice English every day, even if it's only fifteen minutes before bed. On weekends I help with the business in the morning, and after that I relax: I watch a series, go out with friends, or just sleep a little more." },
    { t: 'Plans for next year', task: 'Tus planes y predicciones para el próximo año.', tags: ['going to', 'will', 'hope', 'if', 'by'],
      model: "Next year I'm going to finish my thesis, so the first months will be quite intense. After that, I hope to take a certification in cloud architecture. I think I'll also travel somewhere new if I can save enough money. And if the business keeps growing, we're going to hire one more person. By the end of the year, I'd like to feel confident speaking English at work." },
    { t: 'Something you learned recently', task: 'Algo que aprendiste hace poco y cómo lo aprendiste.', tags: ['learned', 'realized', 'have been', 'since', 'now'],
      model: "Recently I've been learning how to make short videos for my business. At first I thought it would be easy, but I realized that editing takes a lot of time. I watched some tutorials, and a friend who works in marketing gave me a few tips. Since then, I've been posting one video a week. Now I feel much more comfortable in front of the camera, and I've learned that practice matters more than equipment." },
    { t: 'Give your opinion', task: 'El profesor te propondrá un tema polémico suave; da tu opinión y defiéndela.', tags: ['i think', 'because', 'however', 'in my opinion', 'for example'],
      model: "In my opinion, working from home is better for most people, because you save time and you can concentrate more. For example, when I work from home I finish my tasks faster and I have time to exercise. However, I understand that some people feel lonely, and it's harder to learn from your colleagues. So I think the best option is a mix: two or three days at home and the rest in the office." },
  ];

  /* ---------------- andamio: modelo, frases de apoyo y vocabulario ---------------- */
  const STARTERS = {
    'Para empezar': ["Well, let me think…", "That's a good question.", "To be honest, …", "The first thing that comes to mind is…", "Let me tell you about…"],
    'Para dar razones y ejemplos': ["The main reason is that…", "For example, …", "What I mean is…", "That's why…", "In my case, …"],
    'Para ganar tiempo': ["How can I put it…", "It's hard to say, but…", "Let me see…", "Something like that.", "…if that makes sense."],
    'Para contrastar y cerrar': ["On the other hand, …", "However, …", "At the same time, …", "So, all in all, …", "That's basically it."],
  };
  const sents = t => String(t).match(/[^.!?]+[.!?]+/g)?.map(x => x.trim()) || [String(t)];
  function modelPanel(topic, id) {
    const has = !!topic.model;
    return `<details class="model" id="${id}"><summary>📋 Modelo y frases de apoyo <span class="muted small">— míralo si te atascas; mejor intenta primero y compara después</span></summary>
      <div class="model-body">
        <div class="eyebrow">Modelo de respuesta</div>
        <div class="model-text" id="${id}-text">${has ? sents(topic.model).map(x => `<span class="ms">${esc(x)}</span>`).join(' ') : '<span class="muted small">Este tema no trae modelo. ' + (AI.provider !== 'local' ? 'Pídeselo a la IA →' : 'Conecta una IA en Ajustes para generarlo.') + '</span>'}</div>
        <div class="row" style="margin-top:8px"><button class="btn ghost m-say" ${has ? '' : 'hidden'}>🔊 Escuchar</button><button class="btn ghost m-slow" ${has ? '' : 'hidden'}>🐢 Frase a frase</button><button class="btn ghost m-shadow" ${has ? '' : 'hidden'}>🗣 Shadowing</button><button class="btn ghost m-gen" ${has || AI.provider === 'local' ? 'hidden' : ''}>✨ Generar modelo con IA</button></div>
        <div class="starters">${Object.entries(STARTERS).map(([k, v]) => `<div><div class="eyebrow">${k}</div><div class="chips">${v.map(x => `<button class="chip small st">${esc(x)}</button>`).join('')}</div></div>`).join('')}</div>
        ${topic.tags?.length ? `<div class="eyebrow" style="margin-top:10px">Intenta usar</div><div class="tags">${topic.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
        <p class="small muted" style="margin-top:8px">Cómo usarlo: escucha el modelo una vez, repítelo frase a frase, y luego cuéntalo <b>con tus datos</b> sin leer. Las frases de apoyo (toca una para oírla) sirven para no quedarte en silencio.</p>
      </div></details>`;
  }
  function wireModel(root, id, topic, ctx) {
    const box = $('#' + id, root); if (!box) return;
    const textEl = $('#' + id + '-text', root); let stepI = 0;
    const setModel = m => { topic.model = m; textEl.innerHTML = sents(m).map(x => `<span class="ms">${esc(x)}</span>`).join(' '); ['.m-say', '.m-slow', '.m-shadow'].forEach(c => $(c, box).hidden = false); $('.m-gen', box).hidden = true; wireSent(); };
    const wireSent = () => $$('.ms', textEl).forEach(el => el.onclick = () => { $$('.ms', textEl).forEach(x => x.classList.remove('on')); el.classList.add('on'); ctx.say(el.textContent, 0.95); });
    wireSent();
    $('.m-say', box).onclick = () => ctx.say(topic.model, 1);
    $('.m-slow', box).onclick = () => { const ss = $$('.ms', textEl); if (!ss.length) return; ss.forEach(x => x.classList.remove('on')); const el = ss[stepI % ss.length]; el.classList.add('on'); ctx.say(el.textContent, 0.85); stepI++; };
    $('.m-shadow', box).onclick = () => { sessionStorage.setItem('et-shadow-text', topic.model); location.hash = '#/method/shadow'; };
    $$('.st', box).forEach(b => b.onclick = () => ctx.say(b.textContent, 1));
    $('.m-gen', box).onclick = async () => {
      const b = $('.m-gen', box); b.disabled = true; b.textContent = 'Generando…';
      try {
        const m = await AI.chat([{ role: 'user', content: `Write a model spoken answer (80-110 words, natural conversational English, B1+ level, first person, 5-7 sentences, no lists, no headings) that an adult Spanish-speaking learner could imitate for this speaking topic: "${topic.t}". Task: "${topic.task || ''}". Try to use these expressions naturally: ${(topic.tags || []).join(', ') || 'none'}. Reply with the answer text only.` }], { tier: 'quick' });
        setModel(String(m).trim()); ctx.toast('Modelo listo');
      } catch (e) { b.disabled = false; b.textContent = '✨ Generar modelo con IA'; ctx.toast('No se pudo generar el modelo'); }
    };
  }

  /* ---------------- prompts ---------------- */
  const RULES_CHAT = (topic, level) => `You are a friendly, encouraging English conversation tutor for an adult Spanish speaker (Peru) at ${level} level. Topic: "${topic.t}". Task given to the student (in Spanish): "${topic.task || ''}".
Hold a natural spoken-style conversation: react briefly to what the student says, then ask ONE follow-up question. Keep your reply to 2-4 short sentences, level-appropriate, no lists. Gently push the student to use richer vocabulary and the target expressions: ${(topic.tags || []).join(', ')}.
The student's messages are speech-to-text transcripts: ignore capitalization/punctuation issues and obvious recognizer glitches; focus on grammar, vocabulary, naturalness and Spanish interference.
Reply with ONLY a JSON object:
{"reply": "<your conversational reply in English>",
 "corrections": [{"you": "<exact fragment the student said>", "better": "<natural correction>", "why": "<max 12 words, in Spanish>"}],
 "upgrade": "<one sentence the student said, rewritten the way a fluent speaker would say it, or empty string>",
 "tip": "<one short coaching tip in Spanish, max 15 words>"}
Max 3 corrections, most important first; if the student's turn was fine, return an empty corrections array and a sincere compliment in "tip".`;

  const RULES_EVAL = (prompt, transcript, m) => `You are an experienced CEFR examiner and English coach. An adult Spanish-speaking learner (Peru, intermediate course) answered this speaking prompt: "${prompt}".
Speech-to-text transcript (ignore punctuation/casing and obvious recognizer glitches):
"""${transcript}"""
Local metrics: ${m.words} words, ${m.wpm ?? '?'} words/min, ${m.sentences} sentences, ${m.fillers} fillers.
Assess the performance. Reply with ONLY a JSON object:
{"cefr": "<A2|B1|B1+|B2|B2+|C1>",
 "scores": {"fluency": <1-10>, "accuracy": <1-10>, "vocabulary": <1-10>, "coherence": <1-10>},
 "summary": "<2 sentences in Spanish: what went well and the main thing to improve>",
 "strengths": ["<in Spanish>", "<in Spanish>"],
 "errors": [{"you": "<exact fragment>", "better": "<correction>", "why": "<short reason in Spanish>"}],
 "upgraded": "<the student's answer rewritten in natural, well-organized English at one level above theirs, same ideas, 60-120 words>",
 "next_steps": ["<concrete practice suggestion in Spanish>", "<...>", "<...>"]}
Include up to 6 errors, most important first. Be honest but kind.`;

  /* ---------------- historial ---------------- */
  const hist = () => load(LS.hist, { sessions: [], errors: [] });
  function addErrors(list, source) {
    const h = hist(); const now = Date.now();
    (list || []).forEach(e => { if (!e || !e.you || !e.better) return; const k = norm(e.you); if (!h.errors.some(x => norm(x.you) === k)) h.errors.unshift({ you: e.you, better: e.better, why: e.why || '', source, date: now, done: 0 }); });
    h.errors = h.errors.slice(0, 200); save(LS.hist, h);
  }

  /* ---------------- UI helpers ---------------- */
  const errCopy = c => ({ not_granted: 'No hay permiso para usar Claude en esta vista. Puedes configurar tu API key en <b>Ajustes IA</b> o seguir con el análisis local.', rate_limited: 'Demasiadas peticiones seguidas. Espera un momento y vuelve a intentarlo.', session_expired: 'Tu sesión de Claude caducó: vuelve a iniciar sesión.', refused: 'La IA no pudo responder a ese mensaje. Prueba a decirlo de otra forma.', invalid_json: 'La respuesta llegó en un formato inesperado. Inténtalo otra vez.', cancelled: '' }[c] || 'No se pudo contactar con la IA. Revisa tu conexión e inténtalo de nuevo.');
  const bar = (v, max = 10) => `<div class="cbar"><i style="width:${Math.round(v / max * 100)}%"></i></div>`;
  const corrHtml = (list) => (list && list.length) ? `<ul class="corr">${list.map(c => `<li><span class="diff"><span class="del">${esc(c.you)}</span> → <span class="ins">${esc(c.better)}</span></span>${c.why ? `<div class="small muted">${esc(c.why)}</div>` : ''}</li>`).join('')}</ul>` : '<p class="small muted">Sin errores destacables en este turno.</p>';
  const micBtn = (cls, txt = '🎤 Hablar') => `<button class="btn ${cls}" ${Speech.supported ? '' : 'disabled title="Tu navegador no tiene reconocimiento de voz (usa Chrome)"'}>${txt}</button>`;

  /* ================= 1. CONVERSAR ================= */
  function renderChat(root, ctx) {
    const all = [...topics(), ...FREE]; let topic = null, turns = [], rec = null, ctl = null, secs = 0, tmr = null, speakOn = load(LS.auto, true);
    root.innerHTML = `<div class="card"><div class="eyebrow">Conversation partner</div><h2>Conversa con tu profesor</h2>
      <p class="muted small intro">Elige un tema, pulsa el micrófono y habla en inglés. El profesor te responde, te hace una pregunta y te corrige por turno. Al final pide la evaluación.</p>
      <div class="ai-state small" id="aiState">Comprobando la IA…</div>
      <div class="chips" id="topicChips">${all.map((t, i) => `<button class="chip small ${i >= 12 ? 'more' : ''}" data-i="${i}" title="${esc(t.unit || 'Tema libre')}" ${i >= 12 ? 'hidden' : ''}>${esc(t.t)}</button>`).join('')}${all.length > 12 ? `<button class="chip small ghost" id="moreTopics">+ ${all.length - 12} temas más</button>` : ''}</div>
      <div class="row" style="margin-top:8px"><input type="text" id="freeTopic" placeholder="…o escribe tu propio tema (en inglés o español)" style="flex:1;min-width:200px"><button class="btn ghost" id="useFree">Usar tema</button></div>
    </div>
    <div class="card" id="chatCard" hidden>
      <div class="row between"><div><div class="eyebrow">Tema</div><h3 id="chatTopic"></h3><p class="small muted" id="chatTask"></p></div><label class="small toggle"><input type="checkbox" id="autoSpeak" ${speakOn ? 'checked' : ''}> Leer respuestas en voz alta</label></div>
      <div id="chatModel"></div>
      <div class="chat" id="chatLog"></div>
      <div class="row" style="margin-top:10px"><textarea id="chatIn" placeholder="Habla con el micrófono o escribe aquí…" style="min-height:70px;flex:1 1 240px"></textarea></div>
      <div class="row" style="margin-top:8px">${micBtn('c-mic')}<button class="btn" id="chatSend">Enviar</button><button class="btn ghost" id="chatStop" hidden>⏹ Parar</button><span class="small muted" id="chatSecs"></span><button class="btn ghost" id="chatEnd" style="margin-left:auto">Terminar y evaluar</button></div>
      <div class="fb" id="chatFb"></div>
    </div>`;
    AI.init().then(p => { $('#aiState', root).innerHTML = p === 'local' ? '⚠️ <b>Sin IA conectada.</b> La conversación necesita Claude o una API key (pestaña <b>Ajustes IA</b>). Mientras tanto puedes usar <b>Evaluar</b> con el análisis local.' : `✅ IA: <b>${AI.label()}</b>`; });

    const log = $('#chatLog', root), input = $('#chatIn', root);
    const bubble = (role, html) => { const d = document.createElement('div'); d.className = 'msg ' + role; d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; };
    function start(t) {
      topic = t; turns = []; log.innerHTML = ''; $('#chatCard', root).hidden = false; $('#chatTopic', root).textContent = t.t; $('#chatTask', root).textContent = t.task || '';
      $('#chatModel', root).innerHTML = modelPanel(t, 'mdl-chat'); wireModel(root, 'mdl-chat', t, ctx);
      $$('#topicChips .chip', root).forEach(c => c.classList.toggle('sel', all[+c.dataset.i] === t));
      const opener = `Let's talk about "${t.t}". ${t.task ? 'Here is your task: ' + t.task.replace(/\s+/g, ' ') : 'Tell me what you think.'}`;
      bubble('tutor', `<b>Teacher:</b> ${esc(opener)}`); if (speakOn) ctx.say(opener);
      $('#chatCard', root).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    $('#topicChips', root).onclick = e => { const c = e.target.closest('.chip'); if (!c) return; if (c.id === 'moreTopics') { $$('.chip.more', root).forEach(x => x.hidden = false); c.remove(); return; } start(all[+c.dataset.i]); };
    $('#useFree', root).onclick = () => { const v = $('#freeTopic', root).value.trim(); if (v) start({ t: v, task: '', tags: [] }); };
    $('#autoSpeak', root).onchange = e => { speakOn = e.target.checked; save(LS.auto, speakOn); };

    const mic = $('.c-mic', root);
    mic.onclick = () => {
      if (rec) { rec.stop(); return; }
      secs = 0; $('#chatSecs', root).textContent = '0 s'; tmr = setInterval(() => { secs++; $('#chatSecs', root).textContent = secs + ' s'; }, 1000);
      mic.textContent = '⏹ Detener'; mic.classList.add('rec');
      rec = listen({ onText: t => { input.value = t; }, onEnd: () => { rec = null; clearInterval(tmr); mic.textContent = '🎤 Hablar'; mic.classList.remove('rec'); if (input.value.trim()) send(); }, onError: () => { rec = null; clearInterval(tmr); mic.textContent = '🎤 Hablar'; mic.classList.remove('rec'); ctx.toast('No se pudo usar el micrófono'); } });
    };
    $('#chatSend', root).onclick = () => send();
    $('#chatStop', root).onclick = () => ctl?.abort();

    async function send() {
      const text = input.value.trim(); if (!text || !topic) return; input.value = '';
      bubble('me', `<b>You:</b> ${esc(text)}`); turns.push({ role: 'user', content: text });
      const local = analyze(text, secs); secs = 0;
      if (AI.provider === 'local') { bubble('tutor', `<b>Análisis local:</b> ${local.words} palabras${local.wpm ? ', ' + local.wpm + ' ppm' : ''}.` + corrHtml(local.errors) + `<p class="small muted">Conecta una IA en <b>Ajustes IA</b> para conversar de verdad.</p>`); addErrors(local.errors, 'chat'); return; }
      const wait = bubble('tutor', '<b>Teacher:</b> <span class="muted">Thinking…</span>'); ctl = new AbortController(); $('#chatStop', root).hidden = false; $('#chatSend', root).disabled = true;
      try {
        const msgs = [{ role: 'user', content: RULES_CHAT(topic, 'B1-B2') }, ...turns.slice(-12)];
        const r = await AI.chat(msgs, { json: true, signal: ctl.signal, tier: 'quick' });
        const reply = String(r.reply || '').trim() || 'Interesting! Tell me more.';
        turns.push({ role: 'assistant', content: reply });
        const corr = Array.isArray(r.corrections) ? r.corrections.slice(0, 3) : [];
        wait.innerHTML = `<b>Teacher:</b> ${esc(reply)}<details class="fbk" ${corr.length ? 'open' : ''}><summary>${corr.length ? '✏️ ' + corr.length + ' correcci' + (corr.length > 1 ? 'ones' : 'ón') : '✅ Sin correcciones'}${r.tip ? ' · ' + esc(r.tip) : ''}</summary>${corrHtml(corr)}${r.upgrade ? `<p class="small"><b>Así lo diría un nativo:</b> <i>${esc(r.upgrade)}</i> <button class="lnk say-up">🔊</button></p>` : ''}</details>`;
        if (r.upgrade) $('.say-up', wait).onclick = () => ctx.say(r.upgrade);
        addErrors(corr, 'chat'); if (speakOn) ctx.say(reply); ctx.score(true, corr.length ? 6 : 10);
      } catch (e) { wait.innerHTML = `<b>Teacher:</b> <span class="muted">${errCopy(e.code)}</span>`; if (e.code === 'cancelled') wait.remove(); }
      finally { ctl = null; $('#chatStop', root).hidden = true; $('#chatSend', root).disabled = false; log.scrollTop = log.scrollHeight; }
    }
    $('#chatEnd', root).onclick = async () => {
      const mine = turns.filter(t => t.role === 'user').map(t => t.content).join(' '); if (!mine) { ctx.toast('Todavía no has hablado'); return; }
      $('#chatEnd', root).disabled = true; const fb = $('#chatFb', root); fb.className = 'fb show good'; fb.innerHTML = 'Preparando tu evaluación…';
      await evaluate({ prompt: 'Conversation: ' + topic.t, transcript: mine, seconds: null, root: fb, ctx, source: 'chat' });
      $('#chatEnd', root).disabled = false;
    };
  }

  /* ================= 1b. ROLE-PLAY LIBRE (improvisado con la IA) ================= */
  const FREE_SCENES = [
    { t: 'Llamada al banco por una tarjeta bloqueada', you: 'Cliente', partner: 'Agente de soporte', role: 'atiende la línea de tarjetas; sigue un protocolo y pide datos de verificación', goal: 'Explicar que tu tarjeta fue rechazada en el extranjero, pasar la verificación y conseguir que la desbloqueen hoy.', tags: ["I'm calling because", 'Could you check', 'How long will it take'] },
    { t: 'Videollamada con mala conexión', you: 'Desarrollador', partner: 'Sam, product manager en EE. UU.', role: 'quiere una actualización rápida; se le corta el audio y a veces no te oye', goal: 'Dar la actualización del sprint, pedir que repita lo que no oíste y acordar el siguiente paso por escrito.', tags: ["You're breaking up", 'Could you repeat that', 'Let me summarize'] },
    { t: 'Small talk en el ascensor', you: 'Tú', partner: 'Claire, colega de otra oficina', role: 'está de visita una semana; es simpática pero no te conoce', goal: 'Romper el hielo, mantener dos o tres intercambios naturales y despedirte proponiendo un café.', tags: ["How's your week going", 'Have you been to', 'We should'] },
    { t: 'Pedir un aumento', you: 'Desarrollador senior', partner: 'Tu jefa', role: 'te valora, pero tiene el presupuesto ajustado y va a pedir argumentos concretos', goal: 'Pedir una revisión salarial con argumentos (resultados, mercado) y cerrar con un compromiso concreto de ella.', tags: ["I'd like to talk about", 'Over the last year', 'What would it take'] },
    { t: 'Explicar un problema técnico a alguien no técnico', you: 'Desarrollador', partner: 'Lorena, gerenta de operaciones', role: 'no sabe de tecnología, está preocupada porque los clientes se quejan y quiere una fecha', goal: 'Explicar sin jerga qué pasó, qué estás haciendo y cuándo estará resuelto, sin prometer de más.', tags: ['In simple terms', 'What this means is', 'Realistically'] },
    { t: 'Negociar una fecha de entrega', you: 'Líder técnico', partner: 'Mark, cliente', role: 'quiere todo para el viernes; presiona, pero escucha razones', goal: 'Explicar por qué no llega todo, proponer una entrega por partes y conseguir que acepte el nuevo plan.', tags: ['I understand that', 'What we can do is', 'Would that work for you'] },
    { t: 'Devolver un coche de alquiler con un rayón', you: 'Cliente', partner: 'Empleado del rent-a-car', role: 'revisa el coche con una lista y quiere cobrarte el daño', goal: 'Explicar que el rayón ya estaba, pedir que revisen el informe de entrega y evitar el cargo o reducirlo.', tags: ['It was already there', 'Could you check the report', "I'd like to speak to"] },
    { t: 'Defender tu tesis ante el jurado', you: 'Tesista', partner: 'Dra. Reyes, miembro del jurado', role: 'escucha con atención y hace preguntas incómodas sobre el método y las limitaciones', goal: 'Resumir tu tesis en tres o cuatro frases y responder a dos preguntas difíciles sin ponerte a la defensiva.', tags: ['The main finding is', "That's a fair point", 'One limitation is'] },
  ];
  const MOODS = { amable: 'friendly, patient and helpful', normal: 'realistic: polite but busy, expects clear answers and reacts to vagueness', dificil: 'difficult: impatient and skeptical, raises objections and pushes back (never insulting)' };
  function scenes() {
    const out = FREE_SCENES.map(s => ({ ...s, unit: 'Libre' }));
    for (const c of COURSES.filter(c => c.available)) for (const u of c.units.filter(u => u.available)) {
      const d = UNIT_DATA[c.id + '/' + u.id]; if (!d) continue;
      const lbl = c.practical ? `Práctico · ${u.number}` : `${c.title.replace('Inglés ', 'I')} · U${u.number}`;
      d.sections.forEach(s => s.activities.forEach(a => { if (a.type === 'roleplay') (a.scenes || []).forEach(sc => out.push({ t: strip(sc.t), you: strip(sc.you), partner: strip(sc.partner), role: strip(sc.role), goal: strip(sc.goal), unit: lbl })); }));
    }
    return out;
  }
  const RULES_RP = (sc, mood, n) => `You are running an improvised spoken role-play for an adult Spanish-speaking English learner (Peru, B1-B2 level). Stay fully in character.
${sc.custom ? `Situation, as described by the student (may be in Spanish): "${sc.goal}". Decide who the other person is and play that character; the student plays themselves.` : `Situation: "${sc.t}". You play: ${sc.partner}${sc.role ? ` (${sc.role})` : ''}. The student plays: ${sc.you || 'themselves'}.
The student's goal, in Spanish (do not translate it for them): "${sc.goal}".`}
Your character is ${MOODS[mood] || MOODS.normal}.
Rules for your lines ("say"): natural spoken English, 1-3 short sentences, level-appropriate, no lists, no stage directions, never mention that this is practice. React realistically to what the student actually says: if they are vague, rude or off-track, respond as that person really would; if they are clear and polite, move the situation forward. A realistic scene lasts about 6-10 exchanges.${n >= 8 ? ' It is time to bring the conversation to a natural close.' : ''}${n >= 11 ? ' This must be the final exchange: set "done" to true.' : ''}
The student's messages are speech-to-text transcripts: ignore casing/punctuation and obvious recognizer glitches; judge grammar, vocabulary, register and naturalness.
Reply with ONLY a JSON object:
{"say": "<your next line, in character>",
 "ok": <2|1|0>,
 "better": "<the student's last turn rewritten the way a fluent speaker would say it in this situation, same meaning, 1-2 sentences; empty if it was already natural>",
 "why": "<max 15 words in Spanish: why it works or what to change (register, naturalness, grammar)>",
 "corrections": [{"you": "<exact fragment the student said>", "better": "<fix>", "why": "<max 10 words in Spanish>"}],
 "hint": "<in Spanish, max 20 words: what the student could do next in the conversation, then one example line in English between quotes>",
 "done": <true|false>,
 "outcome": "<win|meh|fail — only when done>",
 "note": "<only when done: 2 sentences in Spanish: whether the student achieved the goal and the main thing to improve>"${sc.custom && n === 0 ? ',\n "partner": "<who you are playing, in Spanish, max 6 words>",\n "goal": "<the student\'s goal in this situation, in Spanish, one sentence>"' : ''}}
"ok": 2 = natural and appropriate for the situation; 1 = understandable but awkward, too direct or indirect, or with small errors; 0 = a real error, inappropriate, or did not answer. Max 2 corrections, most important first; empty array if none. Set "done" to true when the goal is clearly achieved, clearly failed (your character would end the interaction) or the conversation reached its natural end.`;

  function renderRoleplay(root, ctx) {
    const all = scenes(); const SHOW = 12;
    let sc = null, mood = 'normal', turns = [], n = 0, hits = 0, lines = [], polished = [], rec = null, ctl = null, secs = 0, tmr = null, hint = '', over = false, speakOn = load(LS.auto, true);
    root.innerHTML = `<div class="card"><div class="eyebrow" style="color:var(--coral)">Role-play libre · improvisa con la IA</div><h2>Sin opciones: di lo que tú dirías</h2>
      <p class="muted small intro">Elige una situación (o inventa la tuya). El otro personaje te habla y tú respondes con tu voz. No hay tres réplicas para elegir: la IA reacciona a lo que digas de verdad, te enseña cómo lo diría un nativo y al final te dice si conseguiste tu objetivo.</p>
      <div class="ai-state small" id="aiState4">Comprobando la IA…</div>
      <div class="row" style="margin:6px 0 10px"><span class="small"><b>El otro personaje es:</b></span><div class="chips" id="rpMood">${[['amable', '🙂 Amable'], ['normal', '😐 Normal'], ['dificil', '😤 Difícil']].map(([k, l]) => `<button class="chip small ${k === mood ? 'sel' : ''}" data-m="${k}">${l}</button>`).join('')}</div></div>
      <div class="chips rp-pick" id="rpScenes">${all.map((s, i) => `<button class="chip ${i >= SHOW ? 'more' : ''}" data-i="${i}" ${i >= SHOW ? 'hidden' : ''}><b>${esc(s.unit)}</b>${esc(s.t)}</button>`).join('')}${all.length > SHOW ? `<button class="chip ghost" id="rpMore">+ ${all.length - SHOW} situaciones más</button>` : ''}</div>
      <div class="row" style="margin-top:10px"><input type="text" id="rpCustom" placeholder="…o describe tu situación: con quién hablas y qué quieres conseguir" style="flex:1;min-width:220px"><button class="btn ghost" id="rpUseCustom">Improvisar</button></div>
    </div>
    <div class="card" id="rpCard" hidden>
      <div class="row between"><div class="rp-head" style="flex:1"></div><label class="small toggle"><input type="checkbox" id="rpAuto" ${speakOn ? 'checked' : ''}> Leer en voz alta</label></div>
      <div class="chat rp-log" id="rpLog"></div>
      <div class="rp-io">
        <div class="row" style="margin-top:10px"><textarea id="rpIn" placeholder="Habla con el micrófono o escribe aquí lo que dirías…" style="min-height:64px;flex:1 1 240px"></textarea></div>
        <div class="row" style="margin-top:8px">${micBtn('r-mic')}<button class="btn" id="rpSend">Enviar</button><button class="btn ghost" id="rpStop" hidden>⏹ Parar</button><span class="small muted" id="rpSecs"></span><button class="btn ghost" id="rpHintBtn">💡 Pista</button><button class="lnk" id="rpQuit" style="margin-left:auto">Terminar aquí</button></div>
        <div class="fb" id="rpHint"></div>
      </div>
      <div id="rpEnd"></div>
    </div>`;
    AI.init().then(p => { $('#aiState4', root).innerHTML = p === 'local' ? '⚠️ <b>Sin IA conectada.</b> Improvisar necesita Claude o una API key (pestaña <b>Ajustes IA</b>). Mientras tanto tienes los <a href="#/method/roleplay">role-plays con ramas</a>, que funcionan sin conexión.' : `✅ IA: <b>${AI.label()}</b>`; });

    const log = $('#rpLog', root), input = $('#rpIn', root), endBox = $('#rpEnd', root), io = $('.rp-io', root);
    const me = () => (sc.you || 'Tú').split(/[,(·]/)[0].trim(), who = () => (sc.partner || 'La otra persona').split(/[,(·]/)[0].trim();
    const bubble = (role, name, text) => { const d = document.createElement('div'); d.className = 'msg ' + role; d.innerHTML = `<b>${esc(name)}:</b> ${esc(text)}${role === 'tutor' ? ' <button class="lnk rp-say" title="Escuchar">🔊</button>' : ''}`; if (role === 'tutor') $('.rp-say', d).onclick = () => ctx.say(text, 1, 1); log.appendChild(d); log.scrollTop = log.scrollHeight; return d; };
    const head = () => { $('.rp-head', root).innerHTML = `<div class="rp-goal"><div class="eyebrow">${esc(sc.t)}</div><p class="small" style="margin:4px 0"><b>Tú:</b> ${esc(sc.you || 'Tú')} · <b>${esc(sc.partner || 'La otra persona')}:</b> ${esc(sc.role || '')}</p><p class="small" style="margin:0"><b>Objetivo:</b> ${esc(sc.goal)}</p>${sc.tags?.length ? `<div class="tags" style="margin-top:6px">${sc.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}</div>`; };
    const stopAll = () => { if (rec) { try { rec.stop(); } catch (e) { } rec = null; } ctl?.abort(); clearInterval(tmr); };

    async function start(s) {
      await AI.init(); if (AI.provider === 'local') { ctx.toast('Conecta una IA en Ajustes IA para improvisar'); return; }
      stopAll(); sc = { ...s }; turns = []; n = 0; hits = 0; lines = []; polished = []; hint = ''; over = false; log.innerHTML = ''; endBox.innerHTML = ''; io.hidden = false; $('#rpHint', root).className = 'fb';
      $$('#rpScenes .chip', root).forEach(c => c.classList.toggle('sel', all[+c.dataset.i] === s));
      $('#rpCard', root).hidden = false; head(); $('#rpCard', root).scrollIntoView({ behavior: 'smooth', block: 'start' });
      const wait = bubble('tutor', who(), '…'); $('.rp-say', wait)?.remove();
      try {
        const r = await ask(`${RULES_RP(sc, mood, 0)}\n\nThe student has not spoken yet. Start the scene with your character's opening line. Use "ok": 2, "better": "", "why": "", "corrections": [] and "done": false.`, []);
        if (sc.custom) { if (r.partner) sc.partner = String(r.partner); if (r.goal) sc.goal = String(r.goal); head(); }
        wait.remove(); partner(r);
      } catch (e) { wait.innerHTML = `<span class="muted">${errCopy(e.code)}</span>`; }
    }
    async function ask(rules, hist) {
      ctl = new AbortController(); $('#rpStop', root).hidden = false; $('#rpSend', root).disabled = true;
      try { return await AI.chat([{ role: 'user', content: rules }, ...hist], { json: true, signal: ctl.signal, tier: 'quick' }); }
      finally { ctl = null; $('#rpStop', root).hidden = true; $('#rpSend', root).disabled = false; }
    }
    function partner(r) {
      const say = String(r.say || '').trim(); hint = String(r.hint || '').trim();
      if (say) { bubble('tutor', who(), say); lines.push([1, say]); polished.push([1, say]); turns.push({ role: 'assistant', content: say }); if (speakOn) ctx.say(say, 1, 1); }
      if (r.done) finish(r.outcome, r.note); else input.focus();
    }
    function feedback(text, r) {
      const ok = [0, 1, 2].includes(+r.ok) ? +r.ok : 1, better = String(r.better || '').trim(), corr = (Array.isArray(r.corrections) ? r.corrections : []).filter(c => c && c.you && c.better).slice(0, 2);
      if (ok === 2) hits++;
      const line = ok < 2 && better ? better : text;
      const d = document.createElement('div'); d.className = 'msg note'; d.innerHTML = `<details class="fbk" ${ok < 2 ? 'open' : ''}><summary>${ok === 2 ? '✔ Natural' : ok === 1 ? '≈ Se entiende, pero se puede decir mejor' : '✘ Revisa esto'}${r.why ? ' · ' + esc(r.why) : ''}</summary>
        ${ok < 2 && better ? `<p class="small" style="margin:6px 0"><b>Así lo diría un nativo:</b> <i>${esc(better)}</i></p>` : ''}${corr.length ? corrHtml(corr) : ''}
        ${ok < 2 && better ? `<div class="row" style="margin-top:6px"><button class="btn ghost sm rp-play">▶ Escuchar</button>${Speech.supported ? '<button class="btn warm sm rp-rec">🎤 Dilo</button>' : ''}</div><div class="fb rp-said"></div>` : ''}</details>`;
      log.appendChild(d); log.scrollTop = log.scrollHeight;
      const pl = $('.rp-play', d); if (pl) pl.onclick = () => ctx.say(line, 1);
      const rb = $('.rp-rec', d); let rr = null; if (rb) rb.onclick = () => {
        if (rr) { rr.stop(); return; } if (window.speechSynthesis) speechSynthesis.cancel();
        rb.textContent = '⏹ Detener'; rb.classList.add('rec'); const sf = $('.rp-said', d); sf.className = 'fb rp-said show good'; sf.textContent = 'Escuchando… di la frase.';
        rr = listen({ continuous: false, onText: t => { sf.textContent = t; }, onEnd: said => { rr = null; rb.textContent = '🎤 Dilo'; rb.classList.remove('rec'); if (!said) { sf.className = 'fb rp-said show wrong'; sf.textContent = 'No se oyó nada. Inténtalo otra vez.'; return; } const p = Engine.util.matchScore(said, line); sf.className = 'fb rp-said show ' + (p >= 80 ? 'good' : 'wrong'); sf.innerHTML = `<b>${p}%</b> · <span class="diff">${diffWords(said, line)}</span>`; if (p >= 80) ctx.score(true, 5); }, onError: () => { rr = null; rb.textContent = '🎤 Dilo'; rb.classList.remove('rec'); ctx.toast('No se pudo usar el micrófono'); } });
      };
      polished.push([0, line]);
      ctx.score(ok > 0, ok === 2 ? 10 : ok === 1 ? 5 : 0);
      addErrors(corr.length ? corr : (ok < 2 && better ? [{ you: text, better, why: r.why || '' }] : []), 'roleplay');
    }
    async function send() {
      const text = input.value.trim(); if (!text || !sc || over || ctl) return; input.value = ''; $('#rpHint', root).className = 'fb';
      bubble('me', me(), text); lines.push([0, text]); turns.push({ role: 'user', content: text }); n++; secs = 0;
      const wait = bubble('tutor', who(), '…'); $('.rp-say', wait)?.remove();
      try {
        const hist = [{ role: 'user', content: '[The scene begins. Say your opening line.]' }, ...turns.slice(-14)];
        const r = await ask(RULES_RP(sc, mood, n), hist);
        wait.remove(); feedback(text, r); partner(r);
      } catch (e) { wait.innerHTML = `<span class="muted">${errCopy(e.code)}</span>`; if (e.code === 'cancelled') { wait.remove(); turns.pop(); n--; } }
    }
    function finish(outcome, note) {
      over = true; stopAll(); io.hidden = true;
      const oc = ['win', 'meh', 'fail'].includes(outcome) ? outcome : 'meh', T = { win: ['🎯', 'Objetivo conseguido'], meh: ['🙂', 'Conseguido a medias'], fail: ['💥', 'La conversación se torció'] }[oc];
      endBox.innerHTML = `<div class="rp-end ${oc}"><div class="eyebrow">${T[0]} ${T[1]}</div>${note ? `<p>${esc(note)}</p>` : ''}<p class="small"><b>${hits} de ${n}</b> réplicas sonaron naturales a la primera.</p>
        <div class="row" style="margin-top:10px"><button class="btn ghost rp-replay">🔊 Tal como fue</button><button class="btn ghost rp-polished">✨ Versión pulida</button><button class="btn rp-report">📋 Informe completo</button><button class="btn ghost rp-again">Otra vez</button><button class="btn ghost rp-other">Otra situación →</button></div><div class="fb rp-rep"></div></div>`;
      ctx.score(oc !== 'fail', oc === 'win' ? 15 : oc === 'meh' ? 5 : 0);
      $('.rp-replay', endBox).onclick = () => ctx.sayLines(lines); $('.rp-polished', endBox).onclick = () => ctx.sayLines(polished);
      $('.rp-again', endBox).onclick = () => start(sc); $('.rp-other', endBox).onclick = () => { root.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      $('.rp-report', endBox).onclick = async () => { const mine = turns.filter(t => t.role === 'user').map(t => t.content).join(' '); if (mine.split(/\s+/).length < 8) { ctx.toast('Hablaste muy poco para un informe'); return; } const b = $('.rp-report', endBox); b.disabled = true; const fb = $('.rp-rep', endBox); fb.className = 'fb show good'; fb.textContent = 'Preparando tu informe…'; await evaluate({ prompt: 'Role-play: ' + sc.t, transcript: mine, seconds: null, root: fb, ctx, source: 'roleplay' }); };
      endBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    $('#rpMood', root).onclick = e => { const c = e.target.closest('.chip'); if (!c) return; mood = c.dataset.m; $$('#rpMood .chip', root).forEach(x => x.classList.toggle('sel', x === c)); };
    $('#rpScenes', root).onclick = e => { const c = e.target.closest('.chip'); if (!c) return; if (c.id === 'rpMore') { $$('#rpScenes .chip.more', root).forEach(x => x.hidden = false); c.remove(); return; } start(all[+c.dataset.i]); };
    $('#rpUseCustom', root).onclick = () => { const v = $('#rpCustom', root).value.trim(); if (v.length < 8) { ctx.toast('Describe un poco más la situación'); return; } start({ t: v.length > 60 ? v.slice(0, 57) + '…' : v, you: 'Tú', partner: 'La otra persona', role: '', goal: v, custom: true }); };
    $('#rpAuto', root).onchange = e => { speakOn = e.target.checked; save(LS.auto, speakOn); };
    const mic = $('.r-mic', root);
    mic.onclick = () => {
      if (rec) { rec.stop(); return; } if (window.speechSynthesis) speechSynthesis.cancel();
      secs = 0; $('#rpSecs', root).textContent = '0 s'; tmr = setInterval(() => { secs++; $('#rpSecs', root).textContent = secs + ' s'; }, 1000);
      mic.textContent = '⏹ Detener'; mic.classList.add('rec');
      const reset = () => { rec = null; clearInterval(tmr); $('#rpSecs', root).textContent = ''; mic.textContent = '🎤 Hablar'; mic.classList.remove('rec'); };
      rec = listen({ onText: t => { input.value = t; }, onEnd: () => { reset(); if (input.value.trim()) send(); }, onError: () => { reset(); ctx.toast('No se pudo usar el micrófono'); } });
    };
    $('#rpSend', root).onclick = () => send();
    $('#rpStop', root).onclick = () => ctl?.abort();
    $('#rpHintBtn', root).onclick = () => { const h = $('#rpHint', root); h.className = 'fb show meh'; h.innerHTML = hint ? '💡 ' + esc(hint) : '💡 Todavía no hay pista: espera a que hable el otro personaje.'; };
    $('#rpQuit', root).onclick = () => { if (!sc || over) return; finish(n ? 'meh' : 'fail', n ? 'Cortaste la escena antes del final. Puedes pedir el informe con lo que dijiste.' : 'No llegaste a hablar.'); };
    input.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

    // llegada desde una escena con ramas ("Improvisarla con la IA")
    let hand = null; try { hand = JSON.parse(sessionStorage.getItem('et-rp-free') || 'null'); sessionStorage.removeItem('et-rp-free'); } catch (e) { }
    if (hand && hand.goal) { const same = all.find(s => s.t === strip(hand.t)); start(same || { t: strip(hand.t), you: strip(hand.you), partner: strip(hand.partner), role: strip(hand.role), goal: strip(hand.goal) }); }
  }

  /* ================= 2. EVALUAR ================= */
  async function evaluate({ prompt, transcript, seconds, root, ctx, source }) {
    const m = analyze(transcript, seconds), band = bandFor(m);
    let ai = null, err = null;
    await AI.init();
    if (AI.provider !== 'local') { try { ai = await AI.chat([{ role: 'user', content: RULES_EVAL(prompt, transcript, m) }], { json: true, tier: 'default' }); } catch (e) { err = e; } }
    const errors = (ai?.errors?.length ? ai.errors : m.errors).slice(0, 6);
    const sc = ai?.scores || null;
    root.className = 'fb show good report';
    root.innerHTML = `<div class="rep-head"><div><div class="eyebrow">Informe</div><h3>${esc(prompt)}</h3></div><div class="cefr">${esc(ai?.cefr || band.band)}<small>${ai ? 'nivel estimado' : 'estimación local'}</small></div></div>
      ${ai?.summary ? `<p>${esc(ai.summary)}</p>` : `<p class="small muted">${band.note}${err ? ' ' + errCopy(err.code) : ''}</p>`}
      <div class="stat" style="margin:12px 0"><div><b>${m.words}</b><span class="small muted">palabras</span></div><div><b>${m.wpm ?? '—'}</b><span class="small muted">palabras/min</span></div><div><b>${m.fillers}</b><span class="small muted">muletillas</span></div><div><b>${m.ttr}%</b><span class="small muted">variedad léxica</span></div></div>
      ${sc ? `<div class="scores">${['fluency', 'accuracy', 'vocabulary', 'coherence'].map(k => `<div><span class="small"><b>${{ fluency: 'Fluidez', accuracy: 'Precisión', vocabulary: 'Vocabulario', coherence: 'Coherencia' }[k]}</b> ${sc[k]}/10</span>${bar(sc[k])}</div>`).join('')}</div>` : ''}
      ${ai?.strengths?.length ? `<p><b>Lo que haces bien:</b> ${ai.strengths.map(esc).join(' · ')}</p>` : ''}
      <h3 style="margin-top:14px">Correcciones</h3>${corrHtml(errors)}
      ${m.repeated.length ? `<p class="small muted">Palabras que repites mucho: ${m.repeated.map(([w, c]) => `<b>${esc(w)}</b> ×${c}`).join(', ')}. Busca sinónimos.</p>` : ''}
      ${ai?.upgraded ? `<h3 style="margin-top:14px">Tu respuesta, un nivel más arriba</h3><p class="upgraded">${esc(ai.upgraded)}</p><div class="row"><button class="btn ghost say-upg">🔊 Escuchar</button><button class="btn ghost shadow-upg">🗣 Practicar por frases (shadowing)</button></div>` : ''}
      ${ai?.next_steps?.length ? `<h3 style="margin-top:14px">Próximos pasos</h3><ol class="small">${ai.next_steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
      <details class="small" style="margin-top:10px"><summary>Ver transcripción</summary><p class="muted">${esc(transcript)}</p></details>`;
    if (ai?.upgraded) { $('.say-upg', root).onclick = () => ctx.say(ai.upgraded); $('.shadow-upg', root).onclick = () => { sessionStorage.setItem('et-shadow-text', ai.upgraded); location.hash = '#/method/shadow'; }; }
    const h = hist(); h.sessions.unshift({ date: Date.now(), prompt, source, words: m.words, wpm: m.wpm, cefr: ai?.cefr || band.band, scores: sc, transcript: transcript.slice(0, 2000) }); h.sessions = h.sessions.slice(0, 60); save(LS.hist, h);
    addErrors(errors, source); ctx.score(true, 20);
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderEval(root, ctx) {
    const all = [...topics(), ...FREE]; let cur = pick(all, 1)[0], rec = null, secs = 0, tmr = null, dur = 90;
    root.innerHTML = `<div class="card"><div class="eyebrow">Speaking test</div><h2>Habla 60-90 segundos y recibe tu informe</h2>
      <p class="muted small intro">Como en un examen oral: consigna, tiempo, y luego nivel estimado, puntuaciones, correcciones y tu respuesta reescrita un nivel más arriba.</p>
      <div class="ai-state small" id="aiState2"></div>
      <div class="prompt-box"><div class="eyebrow">Consigna</div><h3 id="evPrompt"></h3><p class="small" id="evTask"></p><div class="tags" id="evTags"></div><button class="lnk" id="evOther">Otra consigna →</button></div>
      <div id="evModel"></div>
      <div class="row" style="margin-top:12px"><div class="timer" id="evTimer">1:30</div><label class="small">Duración <select id="evDur"><option value="60">60 s</option><option value="90" selected>90 s</option><option value="120">120 s</option></select></label>${micBtn('e-mic', '🎤 Empezar a hablar')}</div>
      <textarea id="evText" style="margin-top:10px" placeholder="Aquí aparece lo que dices (puedes corregir errores del reconocedor antes de evaluar, o escribir directamente)"></textarea>
      <div class="row" style="margin-top:8px"><button class="btn" id="evGo">Evaluar</button><span class="small muted">Consejo: no pares aunque te equivoques; la fluidez también cuenta.</span></div>
      <div class="fb" id="evReport"></div></div>`;
    AI.init().then(p => { draw(); $('#aiState2', root).innerHTML = p === 'local' ? 'ℹ️ Sin IA: recibirás métricas y errores típicos detectados localmente. Con IA (pestaña Ajustes) el informe incluye nivel CEFR, puntuaciones y tu respuesta mejorada.' : `✅ IA: <b>${AI.label()}</b>`; });
    const draw = () => { $('#evPrompt', root).textContent = cur.t; $('#evTask', root).textContent = cur.task || ''; $('#evTags', root).innerHTML = (cur.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join(''); $('#evModel', root).innerHTML = modelPanel(cur, 'mdl-eval'); wireModel(root, 'mdl-eval', cur, ctx); };
    draw(); $('#evOther', root).onclick = () => { cur = pick(all.filter(x => x !== cur), 1)[0]; draw(); };
    $('#evDur', root).onchange = e => { dur = +e.target.value; $('#evTimer', root).textContent = fmt(dur); };
    const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    const mic = $('.e-mic', root), ta = $('#evText', root);
    mic.onclick = () => {
      if (rec) { rec.stop(); return; }
      ta.value = ''; secs = 0; $('#evTimer', root).textContent = fmt(dur); mic.textContent = '⏹ Terminar'; mic.classList.add('rec');
      tmr = setInterval(() => { secs++; $('#evTimer', root).textContent = fmt(Math.max(dur - secs, 0)); if (secs >= dur) { rec?.stop(); } }, 1000);
      rec = listen({ onText: t => { ta.value = t; }, onEnd: () => { rec = null; clearInterval(tmr); mic.textContent = '🎤 Empezar a hablar'; mic.classList.remove('rec'); ctx.toast('Grabación lista. Revisa el texto y pulsa Evaluar.'); }, onError: () => { rec = null; clearInterval(tmr); mic.textContent = '🎤 Empezar a hablar'; mic.classList.remove('rec'); ctx.toast('No se pudo usar el micrófono'); } });
    };
    $('#evGo', root).onclick = async () => { const t = ta.value.trim(); if (t.split(/\s+/).length < 8) { ctx.toast('Habla o escribe un poco más'); return; } $('#evGo', root).disabled = true; const r = $('#evReport', root); r.className = 'fb show good'; r.innerHTML = 'Analizando… (con IA puede tardar hasta un minuto)'; await evaluate({ prompt: cur.t, transcript: t, seconds: secs || null, root: r, ctx, source: 'eval' }); $('#evGo', root).disabled = false; };
  }

  /* ================= 3. PROGRESO Y ERRORES ================= */
  function renderHistory(root, ctx) {
    const h = hist();
    const sess = h.sessions.slice(0, 20);
    root.innerHTML = `<div class="card"><div class="eyebrow">Tu evolución</div><h2>Evaluaciones</h2>
      ${sess.length ? `<div class="scroll-x"><table class="table"><thead><tr><th>Fecha</th><th>Consigna</th><th>Nivel</th><th>Palabras</th><th>ppm</th><th>Fluidez</th><th>Precisión</th><th>Vocab.</th></tr></thead><tbody>${sess.map(s => `<tr><td>${new Date(s.date).toLocaleDateString('es-PE')}</td><td>${esc(s.prompt)}</td><td><b>${esc(s.cefr || '—')}</b></td><td>${s.words}</td><td>${s.wpm ?? '—'}</td><td>${s.scores ? s.scores.fluency : '—'}</td><td>${s.scores ? s.scores.accuracy : '—'}</td><td>${s.scores ? s.scores.vocabulary : '—'}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Aún no hay evaluaciones. Haz una en la pestaña <b>Evaluar</b> o termina una conversación.</p>'}
    </div>
    <div class="card"><div class="eyebrow">Cuaderno de errores</div><h2>Tus errores reales</h2><p class="muted small intro">Todo lo que la IA (o el análisis local) te ha corregido. Practícalos: escribe la versión correcta y compara. Los que aciertes tres veces desaparecen.</p>
      <div id="errList">${h.errors.length ? h.errors.slice(0, 30).map((e, i) => `<div class="item" data-i="${i}"><p><span class="diff"><span class="del">${esc(e.you)}</span></span> <span class="small muted">· ${e.source === 'chat' ? 'conversación' : e.source === 'roleplay' ? 'role-play' : e.source === 'eval' ? 'evaluación' : 'local'} · ${'●'.repeat(e.done)}${'○'.repeat(3 - e.done)}</span></p><input type="text" placeholder="Escribe la versión correcta…" autocomplete="off"><div class="row" style="margin-top:6px"><button class="btn ghost chk">Comprobar</button><button class="lnk show">ver solución</button></div><div class="fb"></div></div>`).join('') : '<p class="muted small">Todavía no hay errores guardados.</p>'}</div>
      ${h.errors.length ? '<div class="row" style="margin-top:12px"><button class="btn ghost" id="clearErr">Vaciar cuaderno</button></div>' : ''}
    </div>`;
    $$('#errList .item', root).forEach(it => {
      const e = h.errors[+it.dataset.i], inp = $('input', it), fb = $('.fb', it);
      $('.chk', it).onclick = () => { const v = inp.value.trim(); if (!v) return; const good = norm(v).includes(norm(e.better)) || norm(v) === norm(e.better); fb.className = 'fb show ' + (good ? 'good' : 'wrong'); fb.innerHTML = (good ? '✔ ' : '✘ Sugerido: <b>' + esc(e.better) + '</b><br><span class="diff">' + diffWords(v, e.better) + '</span><br>') + esc(e.why || ''); if (good) { e.done = Math.min(3, e.done + 1); if (e.done >= 3) { h.errors.splice(h.errors.indexOf(e), 1); } save(LS.hist, h); } ctx.score(good, 12); };
      $('.show', it).onclick = () => { fb.className = 'fb show good'; fb.innerHTML = '<b>' + esc(e.better) + '</b> — ' + esc(e.why || ''); };
    });
    const clr = $('#clearErr', root); if (clr) clr.onclick = () => { if (confirm('¿Vaciar el cuaderno de errores?')) { h.errors = []; save(LS.hist, h); renderHistory(root, ctx); } };
  }

  /* ================= 4. AJUSTES IA ================= */
  function renderSettings(root, ctx) {
    const key = localStorage.getItem(LS.key) || '', model = localStorage.getItem(LS.model) || 'claude-sonnet-5';
    root.innerHTML = `<div class="card"><div class="eyebrow">Inteligencia del coach</div><h2>¿Quién evalúa tu inglés?</h2>
      <div class="ai-state small" id="aiState3">Comprobando…</div>
      <div class="grid2" style="margin-top:14px">
        <div class="opt-card"><h3>1 · Dentro de claude.ai</h3><p class="small">Si abres esta app desde el enlace de Claude, el coach usa tu cuenta de Claude directamente. La primera vez te pedirá permiso. No hay que configurar nada.</p></div>
        <div class="opt-card"><h3>2 · Tu propia API key</h3><p class="small">Para la versión instalada en el celular o en GitHub Pages. La clave se guarda <b>solo en este navegador</b> y se envía únicamente a <code>api.anthropic.com</code>. Consíguela en <b>console.anthropic.com</b>.</p>
          <input type="text" id="apiKey" placeholder="sk-ant-…" value="${esc(key)}" autocomplete="off" spellcheck="false"><label class="small" style="display:block;margin-top:6px">Modelo <input type="text" id="apiModel" value="${esc(model)}" style="width:auto;min-width:220px"></label>
          <div class="row" style="margin-top:8px"><button class="btn" id="saveKey">Guardar</button><button class="btn ghost" id="testKey">Probar</button><button class="lnk" id="delKey">Borrar</button></div><div class="fb" id="keyFb"></div></div>
        <div class="opt-card"><h3>3 · Sin IA</h3><p class="small">Siempre disponible, incluso sin internet: métricas de fluidez (palabras por minuto, muletillas, variedad léxica), estimación orientativa de nivel y un detector de ${RULES.length} errores típicos de hispanohablantes (<i>people is, depend of, I have 30 years, I am agree…</i>).</p></div>
      </div></div>`;
    AI.init().then(() => { $('#aiState3', root).innerHTML = `Ahora mismo: <b>${AI.label()}</b>`; });
    $('#saveKey', root).onclick = () => { const k = $('#apiKey', root).value.trim(); if (k) localStorage.setItem(LS.key, k); else localStorage.removeItem(LS.key); localStorage.setItem(LS.model, $('#apiModel', root).value.trim() || 'claude-sonnet-5'); AI.ready = null; AI.init().then(() => { $('#aiState3', root).innerHTML = `Ahora mismo: <b>${AI.label()}</b>`; ctx.toast('Guardado'); }); };
    $('#delKey', root).onclick = () => { localStorage.removeItem(LS.key); $('#apiKey', root).value = ''; AI.ready = null; AI.init().then(() => $('#aiState3', root).innerHTML = `Ahora mismo: <b>${AI.label()}</b>`); };
    $('#testKey', root).onclick = async () => { const fb = $('#keyFb', root); fb.className = 'fb show good'; fb.textContent = 'Probando…'; $('#saveKey', root).click(); try { const r = await AI.chat([{ role: 'user', content: 'You are a test. Reply with JSON only.' }, { role: 'user', content: 'Reply with {"ok":true}' }], { json: true, tier: 'quick' }); fb.innerHTML = r && r.ok ? '✅ Conexión correcta.' : '✅ Respondió, pero con un formato inesperado.'; } catch (e) { fb.className = 'fb show wrong'; fb.innerHTML = '✘ ' + esc(e.message || errCopy(e.code)); } };
  }

  /* ================= montaje ================= */
  const TABS = [['chat', 'Conversar', renderChat], ['roleplay', 'Role-play libre', renderRoleplay], ['eval', 'Evaluar', renderEval], ['history', 'Progreso y errores', renderHistory], ['settings', 'Ajustes IA', renderSettings]];
  function render(view, ctx, sub) {
    const active = TABS.find(t => t[0] === sub) || TABS[0];
    view.innerHTML = `<nav class="crumbs"><a href="#/">Hoy</a><span class="sep">›</span><span>Speaking Coach</span></nav>
      <div class="unit-head compact"><div class="eyebrow">Herramienta · práctica oral con feedback</div><h1>Speaking Coach</h1><p class="muted small">Habla sobre los temas del curso, recibe correcciones y mide tu progreso.</p></div>
      <div class="sub">${TABS.map(t => `<button class="${t === active ? 'on' : ''}" data-t="${t[0]}">${t[1]}</button>`).join('')}</div><div class="act on" id="coachBody"></div>`;
    $$('.sub button', view).forEach(b => b.onclick = () => { location.hash = '#/coach/' + b.dataset.t; });
    active[2]($('#coachBody', view), ctx);
  }
  return { render, analyze, AI, hist, topics, scenes, listen };
})();
