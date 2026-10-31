#!/usr/bin/env node
/* Validador estructural de un archivo de unidad.
   Uso: node tools/validate-unit.js courses/ingles4/unit8.js [clave]
   La clave se infiere de la ruta (courses/<ciclo>/<unidad>.js → "<ciclo>/<unidad>"). */
const fs = require('fs');
const vm = require('vm');
const path = process.argv[2];
if (!path) { console.error('Uso: node tools/validate-unit.js courses/<ciclo>/unitN.js [clave]'); process.exit(2); }
const m = path.replace(/\\/g, '/').match(/courses\/([^/]+)\/([^/]+)\.js$/);
const KEY = process.argv[3] || (m ? m[1] + '/' + m[2] : null);
const KNOWN = ['notes', 'flashcards', 'match', 'mcq', 'dictation', 'dialog', 'speaking', 'stress', 'reading', 'fix', 'soft', 'comment', 'order', 'roleplay'];
const SECTIONS = ['home', 'vocab', 'grammar', 'listen', 'speak', 'read', 'write', 'social'];

const window = { UNIT_DATA: {} };
vm.runInNewContext(fs.readFileSync(path, 'utf8'), { window }, { filename: path });
const U = window.UNIT_DATA[KEY];
const errs = [];
const err = m => errs.push(m);
const warns = [];
const warn = m => warns.push(m);
const isStr = s => typeof s === 'string' && s.trim().length > 0;
const isRe = x => Object.prototype.toString.call(x) === '[object RegExp]';

if (!U) { console.error('No existe window.UNIT_DATA["' + KEY + '"]'); process.exit(1); }
if (!isStr(U.source)) err('source vacío');
if (!isStr(U.description)) err('description vacía');
if (!Array.isArray(U.map) || !U.map.every(r => Array.isArray(r) && r.length === 3)) err('map inválido');
if ('weak' in U && !(Array.isArray(U.weak) && U.weak.every(isStr))) err('weak debe ser array de strings');
const ids = U.sections.map(s => s.id);
if (JSON.stringify(ids) !== JSON.stringify(SECTIONS)) err('secciones distintas de las esperadas: ' + ids.join(','));

// mcq items: a debe ser string dentro de opts
const checkMcqItems = (items, where) => {
  if (!Array.isArray(items) || !items.length) return err(where + ': sin items');
  items.forEach((it, i) => {
    const w = where + ' #' + (i + 1);
    if (!isStr(it.q)) err(w + ': q vacío');
    if (!Array.isArray(it.opts) || it.opts.length < 2) err(w + ': opts inválidas');
    else {
      if (!it.opts.includes(it.a)) err(w + ': a "' + it.a + '" no está en opts');
      if (new Set(it.opts).size !== it.opts.length) err(w + ': opts repetidas');
    }
    if (!isStr(it.why)) err(w + ': falta why');
    if (it.blank && !it.q.includes('___')) err(w + ': blank:1 sin ___');
    if (!it.blank && it.q.includes('___')) warn(w + ': ___ sin blank:1 (se verá como guiones, no como hueco)');
  });
};
// fake helpers para build()
const shuffle = a => a.slice().sort(() => Math.random() - 0.5);
const pick = (a, n) => shuffle(a).slice(0, n);
const esc = s => String(s);
const blank = s => String(s);

const counts = {};
U.sections.forEach(sec => {
  const acts = sec.activities;
  if (!Array.isArray(acts)) return err(sec.id + ': activities no es array');
  if (sec.id === 'home') { if (sec.render !== 'overview') err('home sin render overview'); return; }
  if (!acts.length) err(sec.id + ': sin actividades');
  acts.forEach((a, ai) => {
    const w = sec.id + '/' + (a.label || a.type) + '[' + ai + ']';
    counts[a.type] = (counts[a.type] || 0) + 1;
    if (!KNOWN.includes(a.type)) return err(w + ': tipo desconocido ' + a.type);
    switch (a.type) {
      case 'notes': if (!isStr(a.html)) err(w + ': html vacío'); break;
      case 'flashcards':
        if (!Array.isArray(a.cards) || !a.cards.length) err(w + ': sin cards');
        a.cards.forEach((c, i) => { if (!isStr(c.w) || !isStr(c.def) || !isStr(c.ex)) err(w + ' card #' + (i + 1) + ': falta w/def/ex'); });
        break;
      case 'match':
        if (!Array.isArray(a.pairs) || a.pairs.length < 2) err(w + ': pocas pairs');
        a.pairs.forEach((p, i) => { if (!Array.isArray(p) || p.length !== 2 || !isStr(p[0]) || !isStr(p[1])) err(w + ' pair #' + (i + 1) + ' inválido'); });
        if (a.round && a.round > a.pairs.length) err(w + ': round > pairs');
        break;
      case 'mcq':
        if (typeof a.build === 'function') {
          for (let k = 0; k < 20; k++) checkMcqItems(a.build({ shuffle, pick, esc, blank }), w + ' (build run ' + k + ')');
        } else checkMcqItems(a.items, w);
        if (a.pool && a.items && a.pool > a.items.length) err(w + ': pool > items');
        break;
      case 'dictation':
        if (!Array.isArray(a.sentences) || a.sentences.length < 8) err(w + ': menos de 8 frases');
        a.sentences.forEach((s, i) => { if (!isStr(s)) err(w + ' frase #' + (i + 1) + ' vacía'); });
        break;
      case 'dialog':
        if (!Array.isArray(a.lines) || a.lines.length < 4) err(w + ': pocas líneas');
        a.lines.forEach((l, i) => { if (!Array.isArray(l) || l.length !== 2 || !isStr(l[0]) || !isStr(l[1])) err(w + ' line #' + (i + 1) + ' inválida'); });
        checkMcqItems(a.questions, w + ' questions');
        break;
      case 'speaking':
        if (!Array.isArray(a.challenges) || a.challenges.length < 3) err(w + ': pocos challenges');
        a.challenges.forEach((c, i) => { if (!isStr(c.t) || !isStr(c.task) || !isStr(c.model) || !Array.isArray(c.tags) || !c.tags.length) err(w + ' challenge #' + (i + 1) + ' incompleto'); });
        break;
      case 'stress':
        if (!Array.isArray(a.pairs) || !a.pairs.length) err(w + ': sin pairs');
        a.pairs.forEach((p, i) => { if (!Array.isArray(p) || p.length !== 2 || !isStr(p[0]) || !isStr(p[1])) err(w + ' pair #' + (i + 1) + ' inválido'); });
        break;
      case 'reading':
        if (!Array.isArray(a.paragraphs) || a.paragraphs.length < 3) err(w + ': pocos párrafos');
        checkMcqItems(a.main, w + ' main'); checkMcqItems(a.infer, w + ' infer');
        if (!isStr(a.think)) err(w + ': falta think');
        a.main.forEach(m => { if (+m.a < 1 || +m.a > a.paragraphs.length) err(w + ' main: párrafo fuera de rango'); });
        a.infer.forEach(m => { const word = (m.q.match(/<b>(.*?)<\/b>/) || [])[1]; if (word && !a.paragraphs.some(p => p.includes('<b>' + word + '</b>'))) warn(w + ' infer: "' + word + '" no está en negrita en el texto'); });
        break;
      case 'fix':
        if (!Array.isArray(a.items) || !a.items.length) err(w + ': sin items');
        a.items.forEach((f, i) => { if (!isStr(f.bad) || !isStr(f.good) || !isStr(f.why)) err(w + ' item #' + (i + 1) + ' incompleto'); if (f.bad === f.good) err(w + ' item #' + (i + 1) + ': bad == good'); });
        break;
      case 'soft': {
        if (a.pattern === undefined) warn(w + ': sin pattern (engine usa /\\b(a bit|a little)\\b/ por defecto)');
        else if (!isRe(a.pattern)) err(w + ': pattern no es RegExp');
        if (!Array.isArray(a.items) || !a.items.length) err(w + ': sin items');
        a.items.forEach((s, i) => {
          if (!isStr(s.h) || !isStr(s.a)) err(w + ' item #' + (i + 1) + ' incompleto');
          else if (isRe(a.pattern) && !a.pattern.test(s.a.toLowerCase())) err(w + ' item #' + (i + 1) + ': la respuesta modelo NO cumple el pattern: ' + s.a);
        });
        break;
      }
      case 'comment':
        if (!Array.isArray(a.checks) || !a.checks.length) err(w + ': sin checks');
        a.checks.forEach((c, i) => { if (!isStr(c.label)) err(w + ' check #' + (i + 1) + ' sin label'); if (!isRe(c.re) && !Array.isArray(c.words)) err(w + ' check #' + (i + 1) + ' sin re/words'); });
        if (a.need && a.need > a.checks.length) err(w + ': need > checks');
        if (a.min && a.max && a.min >= a.max) err(w + ': min >= max');
        break;
      case 'roleplay':
        if (!Array.isArray(a.scenes) || !a.scenes.length) { err(w + ': sin scenes'); break; }
        a.scenes.forEach((sc, si) => {
          const ws = w + ' scene #' + (si + 1); const N = sc.nodes || {};
          ['t', 'you', 'partner', 'goal', 'start'].forEach(k => { if (!isStr(sc[k])) err(ws + ': falta ' + k); });
          if (!N[sc.start]) err(ws + ': start "' + sc.start + '" no existe');
          const seen = new Set(); const walk = id => { if (seen.has(id)) return; seen.add(id); (N[id] && N[id].opts || []).forEach(o => walk(o.next)); }; walk(sc.start);
          const ends = Object.values(N).filter(n => n.end).length; if (!ends) err(ws + ': ningún nodo final (end:true)');
          Object.entries(N).forEach(([id, n]) => {
            const wn = ws + ' nodo "' + id + '"';
            if (!isStr(n.say)) err(wn + ': falta say');
            if (/<[^>]+>/.test(n.say || '')) err(wn + ': say con HTML');
            if (!seen.has(id)) warn(wn + ': no se alcanza desde start');
            if (n.end) { if (!['win', 'meh', 'fail'].includes(n.outcome)) err(wn + ': outcome debe ser win | meh | fail'); if (!isStr(n.note)) warn(wn + ': sin note'); return; }
            if (!Array.isArray(n.opts) || n.opts.length < 2) { err(wn + ': menos de 2 opts'); return; }
            if (n.opts.filter(o => o.ok === 2).length !== 1) err(wn + ': debe haber exactamente una opción ok:2');
            if (new Set(n.opts.map(o => o.t)).size !== n.opts.length) err(wn + ': opts repetidas');
            n.opts.forEach((o, oi) => { const wo = wn + ' opt #' + (oi + 1); if (!isStr(o.t)) err(wo + ': falta t'); if (/<[^>]+>/.test(o.t || '')) err(wo + ': t con HTML'); if (/&/.test(o.t || '')) err(wo + ': evita & en t (rompe la comparación del cuaderno)'); if (![0, 1, 2].includes(o.ok)) err(wo + ': ok debe ser 0, 1 o 2'); if (!isStr(o.why)) err(wo + ': falta why'); if (!N[o.next]) err(wo + ': next "' + o.next + '" no existe'); });
          });
        });
        break;
      case 'order':
        if (!Array.isArray(a.dialogs) || !a.dialogs.length) err(w + ': sin dialogs');
        a.dialogs.forEach((d, i) => { if (!Array.isArray(d) || d.length < 3) err(w + ' dialog #' + (i + 1) + ' corto'); d.forEach(l => { if (!/^[^:]+:\s+\S/.test(l)) err(w + ' dialog #' + (i + 1) + ': línea sin "Nombre: texto" → ' + l); }); });
        break;
    }
  });
});

const total = U.sections.reduce((n, s) => n + s.activities.length, 0);
console.log('Secciones:', U.sections.map(s => s.id + '(' + s.activities.length + ')').join(' '));
console.log('Total actividades:', total, '| por tipo:', JSON.stringify(counts));
const fcAct = (U.sections.find(s => s.id === 'vocab') || { activities: [] }).activities.find(a => a.type === 'flashcards');
console.log('Flashcards:', fcAct ? fcAct.cards.length : 0, '| bytes:', fs.statSync(path).size);
if (warns.length) { console.log('\nAVISOS (' + warns.length + '):'); warns.forEach(e => console.log(' - ' + e)); }
if (errs.length) { console.log('\nERRORES (' + errs.length + '):'); errs.forEach(e => console.log(' - ' + e)); process.exit(1); }
console.log('\nOK: sin errores');
