/* ===========================================================
   pron.js — Laboratorio de pronunciación para hispanohablantes
   (#/method/pron). Cuatro ejercicios con la voz del navegador:
     · Pares mínimos: oyes una palabra y eliges cuál fue; luego la dices
     · Terminaciones -ed: /t/ /d/ /ɪd/
     · Sílaba tónica: toca la sílaba fuerte
     · Enlaces y contracciones: "Dilo" con frases de habla conectada
   Todo puntúa con ctx.score y registra dominio bajo "pron|speak|…".
   =========================================================== */
window.Pron = (() => {
  const { $, $$, esc, shuffle, pick, norm } = Engine.util;

  /* ---------- datos ---------- */
  const PAIRS = [
    { id: 'i', t: 'sheep / ship', sym: '/iː/ vs /ɪ/', tip: 'La /iː/ es larga y tensa (sonríe al decirla); la /ɪ/ es corta y relajada, entre la <i>i</i> y la <i>e</i> del español. Como en español solo hay una <i>i</i>, <i>leave</i> y <i>live</i> te suenan igual: no lo son.', pairs: [['sheep', 'ship'], ['leave', 'live'], ['feel', 'fill'], ['seat', 'sit'], ['heat', 'hit'], ['cheap', 'chip'], ['eat', 'it'], ['least', 'list'], ['feet', 'fit'], ['green', 'grin']] },
    { id: 'bv', t: 'berry / very', sym: '/b/ vs /v/', tip: 'En español <i>b</i> y <i>v</i> suenan igual. En inglés la /v/ se hace con los dientes de arriba sobre el labio de abajo, como una <i>f</i> con voz. Prueba: <i>very</i>, <i>vote</i>, <i>love</i>.', pairs: [['berry', 'very'], ['boat', 'vote'], ['best', 'vest'], ['ban', 'van'], ['bet', 'vet'], ['curb', 'curve'], ['bat', 'vat'], ['bent', 'vent'], ['marble', 'marvel'], ['bowl', 'vole']] },
    { id: 'jy', t: 'jet / yet', sym: '/dʒ/ vs /j/', tip: 'La <i>j</i> inglesa suena como una <i>ch</i> con voz; la <i>y</i> es como la <i>i</i> de "hielo". El hispanohablante tiende a decir <i>yes</i> como "jes" o <i>job</i> como "yob".', pairs: [['jet', 'yet'], ['jam', 'yam'], ['jail', 'Yale'], ['juice', 'use'], ['major', 'mayor'], ['jello', 'yellow'], ['joke', 'yolk'], ['jeer', 'year']] },
    { id: 'sh', t: 'ship / chip', sym: '/ʃ/ vs /tʃ/', tip: 'La <i>sh</i> es un soplo continuo (pide silencio: shhh); la <i>ch</i> empieza con una pequeña explosión, como la <i>ch</i> de "chico". En español no existe la <i>sh</i>, así que sale <i>ch</i> por defecto.', pairs: [['ship', 'chip'], ['share', 'chair'], ['shoes', 'choose'], ['wash', 'watch'], ['cash', 'catch'], ['sheep', 'cheap'], ['shop', 'chop'], ['wish', 'which']] },
    { id: 'au', t: 'cat / cut', sym: '/æ/ vs /ʌ/', tip: 'La /æ/ de <i>cat</i> es una <i>a</i> muy abierta, casi <i>e</i>; la /ʌ/ de <i>cut</i> es una <i>a</i> corta y central. Si dices <i>cat</i> con <i>a</i> española, suena a <i>cut</i>.', pairs: [['cat', 'cut'], ['bat', 'but'], ['hat', 'hut'], ['match', 'much'], ['ran', 'run'], ['bag', 'bug'], ['cap', 'cup'], ['fan', 'fun'], ['track', 'truck'], ['sang', 'sung']] },
    { id: 'th', t: 'they / day', sym: '/ð/ vs /d/', tip: 'La <i>th</i> sonora se hace con la lengua entre los dientes, como la <i>d</i> de "nada" dicha relajada. No la cambies por una <i>d</i> dura.', pairs: [['they', 'day'], ['there', 'dare'], ['then', 'den'], ['though', 'dough'], ['breathe', 'breed'], ['those', 'doze'], ['than', 'Dan'], ['worthy', 'wordy']] },
    { id: 'dt', t: 'bad / bat', sym: '/d/ vs /t/ final', tip: 'En español las consonantes finales casi desaparecen; en inglés distinguen palabras. Truco: alarga un poco la vocal antes de <i>d</i> (<i>baad</i>) y córtala antes de <i>t</i> (<i>bat</i>).', pairs: [['bad', 'bat'], ['had', 'hat'], ['need', 'neat'], ['hard', 'heart'], ['send', 'sent'], ['bed', 'bet'], ['ride', 'right'], ['made', 'mate'], ['card', 'cart'], ['seed', 'seat']] },
    { id: 'zs', t: 'eyes / ice', sym: '/z/ vs /s/', tip: 'La <i>z</i> inglesa es una <i>s</i> con vibración (pon la mano en la garganta). Muchos plurales y verbos en -s suenan /z/: <i>is, has, goes, plays, friends</i>.', pairs: [['eyes', 'ice'], ['prize', 'price'], ['rise', 'rice'], ['peas', 'peace'], ['zoo', 'Sue'], ['buzz', 'bus'], ['plays', 'place'], ['lazy', 'lacy']] },
    { id: 'h', t: 'hear / ear', sym: '/h/ vs sin h', tip: 'La <i>h</i> inglesa sí suena: es un soplo suave, parecido a la <i>j</i> andaluza, nunca una <i>j</i> fuerte ni una letra muda.', pairs: [['hear', 'ear'], ['hate', 'eight'], ['hair', 'air'], ['hold', 'old'], ['heart', 'art'], ['hill', 'ill'], ['hand', 'and'], ['high', 'eye']] },
    { id: 'u', t: 'pool / pull', sym: '/uː/ vs /ʊ/', tip: 'La /uː/ es larga con los labios muy redondeados; la /ʊ/ es corta y relajada (<i>book, good, put, could</i>).', pairs: [['pool', 'pull'], ['fool', 'full'], ['Luke', 'look'], ['food', 'foot'], ['suit', 'soot'], ['cooed', 'could'], ['stewed', 'stood'], ['wooed', 'wood']] },
  ];
  const ED = {
    t: ['worked', 'watched', 'stopped', 'finished', 'laughed', 'asked', 'helped', 'missed', 'washed', 'talked', 'looked', 'kissed', 'cooked', 'danced', 'fixed', 'hoped', 'jumped', 'liked', 'passed', 'walked'],
    d: ['played', 'lived', 'called', 'opened', 'loved', 'rained', 'cleaned', 'listened', 'enjoyed', 'studied', 'moved', 'used', 'arrived', 'changed', 'closed', 'learned', 'planned', 'showed', 'tried', 'answered'],
    id: ['wanted', 'needed', 'started', 'visited', 'decided', 'waited', 'ended', 'hated', 'invited', 'painted', 'rested', 'added', 'counted', 'expected', 'graduated', 'landed', 'posted', 'repeated', 'shouted', 'tasted'],
  };
  const ED_RULE = { t: 'Tras un sonido <b>sordo</b> (p, k, f, s, sh, ch) la -ed suena /t/: <i>worked</i> = "workt". Una sola sílaba extra, ninguna.', d: 'Tras un sonido <b>sonoro</b> (vocal, l, m, n, r, v, z, g, b) la -ed suena /d/: <i>played</i> = "pleid". Sin "ed" añadido.', id: 'Solo tras <b>t</b> o <b>d</b> la -ed se pronuncia /ɪd/ como sílaba aparte: <i>wanted</i> = "wan-tid". Es el único caso en que se oye la "e".' };
  const ED_LABEL = { t: '/t/ · "workt"', d: '/d/ · "pleid"', id: '/ɪd/ · "wan-tid"' };
  // [sílabas, índice de la tónica, nota opcional]
  const STRESS = [
    [['com', 'for', 'ta', 'ble'], 0], [['ho', 'tel'], 1], [['de', 've', 'lop'], 1], [['in', 'te', 'res', 'ting'], 0], [['ve', 'ge', 'ta', 'ble'], 0], [['cho', 'co', 'late'], 0],
    [['im', 'por', 'tant'], 1], [['un', 'der', 'stand'], 2], [['e', 'co', 'no', 'my'], 1], [['e', 'co', 'no', 'mic'], 2], [['pho', 'to', 'graph'], 0], [['pho', 'to', 'gra', 'pher'], 1], [['pho', 'to', 'gra', 'phic'], 2],
    [['beau', 'ti', 'ful'], 0], [['ne', 'ces', 'sa', 'ry'], 0], [['Ja', 'pa', 'nese'], 2], [['en', 'gi', 'neer'], 2], [['af', 'ter', 'noon'], 2], [['com', 'pu', 'ter'], 1], [['en', 'vi', 'ron', 'ment'], 1],
    [['com', 'mu', 'ni', 'cate'], 1], [['con', 'ver', 'sa', 'tion'], 2], [['in', 'for', 'ma', 'tion'], 2], [['op', 'por', 'tu', 'ni', 'ty'], 2], [['res', 'pon', 'si', 'ble'], 1], [['suc', 'cess', 'ful'], 1], [['am', 'bi', 'tious'], 1], [['ex', 'pe', 'ri', 'ence'], 1],
    [['chal', 'len', 'ging'], 0], [['per', 'ma', 'nent'], 0], [['tem', 'po', 'ra', 'ry'], 0], [['ce', 'le', 'bri', 'ty'], 1], [['co', 'me', 'di', 'an'], 1], [['vo', 'lun', 'teer'], 2], [['ap', 'pre', 'ci', 'ate'], 1], [['ap', 'pa', 'rent', 'ly'], 1],
    [['po', 'li', 'tics'], 0], [['po', 'li', 'ti', 'cal'], 1], [['de', 'mo', 'cra', 'cy'], 1], [['u', 'ni', 'ver', 'si', 'ty'], 2], [['sa', 'la', 'ry'], 0], [['ca', 'reer'], 1, 'En español decimos "carrera" con fuerza al inicio; en inglés es caREER.'], [['de', 'ssert'], 1, 'deSSERT (postre) vs DEsert (desierto).'], [['e', 'vent'], 1], [['po', 'lice'], 1], [['gui', 'tar'], 1], [['ma', 'chine'], 1], [['ba', 'na', 'na'], 1], [['to', 'ma', 'to'], 1], [['a', 'dvice'], 1], [['e', 'xam'], 1], [['re', 'cord'], 0, 'REcord (sustantivo: el récord, el disco). El verbo es reCORD.'], [['pre', 'sent'], 0, 'PREsent (sustantivo: regalo / adjetivo). El verbo es preSENT.'],
  ];
  const LINKS = ["I'd take it if I were you.", "You've got nothing to lose.", "It wouldn't hurt to ask.", "What do you want to do?", "I should've called her.", "Could you give me a hand?", "There's a lot of work to do.", "He's been working here for ages.", "I can't hear you.", "Did you get it?", "We're going to be late.", "I don't know what you mean.", "Let me think about it.", "I've never been to New York.", "Turn it off and on again.", "Pick it up at eight.", "An apple a day keeps the doctor away.", "I'm not sure about it.", "She didn't tell me anything.", "We'd better get going."];

  /* ---------- helpers ---------- */
  const why = (title, body) => `<details class="why"><summary>¿Por qué funciona? <span class="muted">${title}</span></summary><p class="small">${body}</p></details>`;
  const pctx = (ctx, label) => ({ ...ctx, score: (g, p) => { ctx.score(g, p); if (window.Mastery) Mastery.record('pron|speak|' + label, g); } });
  const canRec = () => !!(window.Speech && Speech.supported);

  /* ---------- 1. pares mínimos ---------- */
  function renderPairs(root, ctx) {
    let g = PAIRS[0], round = [], i = 0, ok = 0;
    root.innerHTML = `<div class="card"><div class="eyebrow">Pares mínimos · discriminación y producción</div><h2>¿Cuál oíste?</h2>
      <p class="muted small intro">Primero el oído: si no distingues dos sonidos, tampoco los producirás. Escucha una palabra y elige cuál fue. Después dilas tú, exagerando la diferencia.</p>
      ${why('Bradlow & Pisoni 1999; Flege 1995', 'El entrenamiento perceptivo con pares mínimos y voces variadas mejora tanto la percepción como la pronunciación de contrastes que no existen en la lengua materna, y el efecto se mantiene meses después.')}
      <div class="chips pr-groups">${PAIRS.map(p => `<button class="chip ${p === g ? 'sel' : ''}" data-id="${p.id}">${esc(p.t)}</button>`).join('')}</div>
      <div class="hint pr-tip" style="margin-top:12px"></div>
      <div class="pr-box" style="margin-top:14px"></div></div>`;
    const sctx = () => pctx(ctx, 'Pares · ' + g.t);
    function start() { round = shuffle(g.pairs).slice(0, 8).map(p => ({ p, k: Math.random() < .5 ? 0 : 1 })); i = 0; ok = 0; $('.pr-tip', root).innerHTML = `<b>${g.sym}</b> · ${g.tip}`; draw(); }
    function draw() {
      const box = $('.pr-box', root);
      if (i >= round.length) { box.innerHTML = `<div class="hint"><b>${ok}/${round.length}</b> acertadas${ok >= 7 ? '. Buen oído: pasa al siguiente par.' : '. Escucha los dos sonidos seguidos varias veces antes de repetir la ronda.'}</div><div class="row" style="margin-top:10px"><button class="btn pr-again">Otra ronda</button></div>`; $('.pr-again', box).onclick = start; return; }
      const { p, k } = round[i], target = p[k];
      box.innerHTML = `<p class="small muted">${i + 1} / ${round.length}</p><div class="row" style="margin-bottom:12px"><button class="btn pr-play">▶ Escuchar</button><button class="btn ghost pr-both">🔊 Oír las dos</button></div>
        <div class="opts pr-opts">${p.map((w, idx) => `<button class="opt pr-opt" data-i="${idx}">${esc(w)}</button>`).join('')}</div><div class="fb"></div>
        <div class="row pr-after" style="margin-top:10px" hidden>${canRec() ? `<button class="btn warm sm pr-say" data-w="${esc(p[0])}">🎤 Di "${esc(p[0])}"</button><button class="btn warm sm pr-say" data-w="${esc(p[1])}">🎤 Di "${esc(p[1])}"</button>` : ''}<button class="btn pr-next" style="margin-left:auto">Siguiente →</button></div>`;
      const play = () => ctx.say(target, 0.95);
      $('.pr-play', box).onclick = play; $('.pr-both', box).onclick = () => ctx.say(p[0] + '. ' + p[1] + '.', 0.85);
      $$('.pr-opt', box).forEach(b => b.onclick = () => {
        if (box.dataset.done) return; box.dataset.done = 1; const good = +b.dataset.i === k; b.classList.add(good ? 'ok' : 'bad'); if (!good) $(`.pr-opt[data-i="${k}"]`, box).classList.add('ok');
        const fb = $('.fb', box); fb.className = 'fb show ' + (good ? 'good' : 'wrong'); fb.innerHTML = (good ? '✔ Era <b>' : '✘ Era <b>') + esc(target) + '</b>. Ahora dilas tú: primero <b>' + esc(p[0]) + '</b>, luego <b>' + esc(p[1]) + '</b>.'; if (good) ok++; sctx().score(good, 6); $('.pr-after', box).hidden = false;
      });
      $('.pr-next', box).onclick = () => { i++; draw(); };
      $$('.pr-say', box).forEach(b => b.onclick = () => recWord(b, b.dataset.w, ctx));
      setTimeout(play, 250);
    }
    $$('.pr-groups .chip', root).forEach(b => b.onclick = () => { g = PAIRS.find(p => p.id === b.dataset.id); $$('.pr-groups .chip', root).forEach(x => x.classList.toggle('sel', x === b)); start(); });
    start();
  }
  /* graba una palabra suelta y comprueba si el reconocedor la entendió */
  function recWord(btn, word, ctx) {
    if (btn.dataset.rec) return; btn.dataset.rec = 1; const old = btn.textContent; btn.textContent = '⏹ …'; btn.classList.add('rec'); if (window.speechSynthesis) speechSynthesis.cancel();
    Speech.listen({ continuous: false, onEnd: said => { delete btn.dataset.rec; btn.classList.remove('rec'); const hit = norm(said).split(' ').includes(norm(word)); btn.textContent = (hit ? '✔ ' : '✘ ') + old.replace(/^[✔✘] /, ''); ctx.toast(hit ? `Se entendió "${word}"` : said ? `Se entendió "${said}", no "${word}"` : 'No se oyó nada'); if (window.Mastery) Mastery.record('pron|speak|Decir pares', hit); }, onError: () => { delete btn.dataset.rec; btn.classList.remove('rec'); btn.textContent = old; ctx.toast('No se pudo usar el micrófono'); } });
  }

  /* ---------- 2. terminaciones -ed ---------- */
  function renderEd(root, ctx) {
    const all = Object.entries(ED).flatMap(([k, ws]) => ws.map(w => ({ w, k }))); let round = pick(all, 10), i = 0, ok = 0;
    root.innerHTML = `<div class="card"><div class="eyebrow">Pasado regular · -ed</div><h2>¿Cómo suena la -ed?</h2>
      <p class="muted small intro">El error más común del hispanohablante: pronunciar <i>worked</i> como "wor-ked" (dos sílabas). Solo <i>wanted</i> y <i>needed</i> tienen sílaba extra. Elige el sonido y escucha el verbo.</p>
      <div class="grid3" style="margin:10px 0 14px">${Object.entries(ED_RULE).map(([k, r]) => `<div class="opt-card small"><b>${ED_LABEL[k]}</b><br>${r}</div>`).join('')}</div>
      <div class="ed-box"></div></div>`;
    const sctx = pctx(ctx, 'Terminaciones -ed');
    function draw() {
      const box = $('.ed-box', root);
      if (i >= round.length) { box.innerHTML = `<div class="hint"><b>${ok}/${round.length}</b> correctas.</div><div class="row" style="margin-top:10px"><button class="btn ed-again">Otra ronda</button></div>`; $('.ed-again', box).onclick = () => { round = pick(all, 10); i = 0; ok = 0; draw(); }; return; }
      const it = round[i];
      box.innerHTML = `<p class="small muted">${i + 1} / ${round.length}</p><div class="q" style="font-family:var(--font-head);font-size:1.7rem">${esc(it.w)}</div><div class="opts">${['t', 'd', 'id'].map(k => `<button class="opt ed-opt" data-k="${k}">${ED_LABEL[k]}</button>`).join('')}</div><div class="fb"></div><div class="row" style="margin-top:10px"><button class="btn ghost ed-say">🔊 Escuchar</button><button class="btn ed-next" hidden>Siguiente →</button></div>`;
      $('.ed-say', box).onclick = () => ctx.say(`${it.w}. I ${it.w} yesterday.`, 0.9);
      $$('.ed-opt', box).forEach(b => b.onclick = () => { if (box.dataset.done) return; box.dataset.done = 1; const good = b.dataset.k === it.k; b.classList.add(good ? 'ok' : 'bad'); if (!good) $(`.ed-opt[data-k="${it.k}"]`, box).classList.add('ok'); const fb = $('.fb', box); fb.className = 'fb show ' + (good ? 'good' : 'wrong'); fb.innerHTML = (good ? '✔ ' : '✘ ') + ED_RULE[it.k]; if (good) ok++; sctx.score(good, 6); ctx.say(it.w, 0.9); $('.ed-next', box).hidden = false; });
      $('.ed-next', box).onclick = () => { i++; draw(); };
    }
    draw();
  }

  /* ---------- 3. sílaba tónica ---------- */
  function renderStress(root, ctx) {
    let round = pick(STRESS, 10), i = 0, ok = 0;
    root.innerHTML = `<div class="card"><div class="eyebrow">Word stress · sílaba tónica</div><h2>Toca la sílaba fuerte</h2>
      <p class="muted small intro">En inglés la sílaba tónica es más larga, más alta y más clara; las demás se reducen (muchas vocales suenan /ə/). Si acentúas mal, aunque digas todos los sonidos bien, no te entienden. Toca la sílaba que lleva la fuerza y escucha.</p>
      ${why('Field 2005; Cutler 2012', 'Los oyentes nativos usan el patrón de acento para reconocer palabras; un acento desplazado perjudica la inteligibilidad más que un sonido mal pronunciado.')}
      <div class="st-box"></div></div>`;
    const sctx = pctx(ctx, 'Sílaba tónica');
    function draw() {
      const box = $('.st-box', root);
      if (i >= round.length) { box.innerHTML = `<div class="hint"><b>${ok}/${round.length}</b> correctas.</div><div class="row" style="margin-top:10px"><button class="btn st-again">Otra ronda</button></div>`; $('.st-again', box).onclick = () => { round = pick(STRESS, 10); i = 0; ok = 0; draw(); }; return; }
      const [syl, k, note] = round[i], word = syl.join('');
      box.innerHTML = `<p class="small muted">${i + 1} / ${round.length} · ${syl.length} sílabas</p><div class="syls">${syl.map((s, idx) => `<button class="syl" data-i="${idx}">${esc(s)}</button>`).join('')}</div><div class="fb"></div><div class="row" style="margin-top:10px"><button class="btn ghost st-say">🔊 Escuchar</button>${canRec() ? '<button class="btn warm st-rec" hidden>🎤 Dilo</button>' : ''}<button class="btn st-next" hidden>Siguiente →</button></div>`;
      $('.st-say', box).onclick = () => ctx.say(word, 0.85);
      $$('.syl', box).forEach(b => b.onclick = () => { if (box.dataset.done) return; box.dataset.done = 1; const good = +b.dataset.i === k; b.classList.add(good ? 'ok' : 'bad'); $(`.syl[data-i="${k}"]`, box).classList.add('ok'); const fb = $('.fb', box); fb.className = 'fb show ' + (good ? 'good' : 'wrong'); fb.innerHTML = `${good ? '✔' : '✘'} <b>${syl.map((s, idx) => idx === k ? s.toUpperCase() : s).join('·')}</b> · patrón ${syl.map((s, idx) => idx === k ? 'O' : 'o').join('')}${note ? '<br>' + note : ''}`; if (good) ok++; sctx.score(good, 6); ctx.say(word, 0.85); $('.st-next', box).hidden = false; const rb = $('.st-rec', box); if (rb) { rb.hidden = false; rb.onclick = () => recWord(rb, word, ctx); } });
      $('.st-next', box).onclick = () => { i++; draw(); };
    }
    draw();
  }

  /* ---------- 4. enlaces y contracciones ---------- */
  function renderLinks(root, ctx) {
    root.innerHTML = `<div class="card plain" style="padding:0;border:0;box-shadow:none"><div class="hint" style="margin-bottom:14px"><b>Habla conectada.</b> Los nativos no dicen palabra por palabra: enlazan la consonante final con la vocal siguiente (<i>pick it up</i> → "pi-ki-tup"), reducen las palabras débiles (<i>to</i> → "tə", <i>and</i> → "ən") y contraen (<i>should've</i> → "shudəv"). Escucha, imita el ritmo y compara.</div><div class="lk-box"></div></div>`;
    Engine.renderers.say($('.lk-box', root), { eyebrow: 'Connected speech · Dilo', title: 'Escucha, di la frase y compara', intro: 'Grábate diciendo la frase completa a velocidad natural. Más del 80 % de coincidencia es buena señal; si no, usa la versión lenta y vuelve a intentarlo.', sentences: LINKS }, pctx(ctx, 'Enlaces y contracciones'));
  }

  /* ---------- montaje ---------- */
  const TABS = [['pairs', 'Pares mínimos', renderPairs], ['ed', 'Terminación -ed', renderEd], ['stress', 'Sílaba tónica', renderStress], ['links', 'Enlaces y contracciones', renderLinks]];
  function render(root, ctx, sub) {
    const active = TABS.find(t => t[0] === sub) || TABS[0];
    root.innerHTML = `<div class="card plain" style="padding:0;border:0;box-shadow:none;overflow:visible"><div class="eyebrow" style="color:var(--coral);margin-bottom:6px">Laboratorio de pronunciación · para hispanohablantes</div><div class="sub pron-sub">${TABS.map(t => `<button class="${t === active ? 'on' : ''}" data-t="${t[0]}">${t[1]}</button>`).join('')}</div><div class="pron-body"></div></div>`;
    $$('.pron-sub button', root).forEach(b => b.onclick = () => render(root, ctx, b.dataset.t));
    active[2]($('.pron-body', root), ctx);
  }
  return { render, PAIRS, ED, STRESS, LINKS };
})();
