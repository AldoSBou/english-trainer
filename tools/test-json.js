#!/usr/bin/env node
/* Prueba del parser tolerante de JSON del Coach (js/coach.js, entre los marcadores parseJSON:start/end).
   Uso: node tools/test-json.js   → debe terminar "ok: N, fail: 0". */
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../js/coach.js', 'utf8');
const fn = src.slice(src.indexOf('/* parseJSON:start */'), src.indexOf('/* parseJSON:end */'));
const parseJSON = new Function(fn + '; return parseJSON;')();
const cases = {
  limpio: ['{"a":[1,2],"b":"x"}', o => o.a[1] === 2],
  fences: ['Here you go:\n```json\n{"a":1}\n```', o => o.a === 1],
  texto_antes_y_despues: ['Sure! {"a":1} Hope this helps.', o => o.a === 1],
  comas_sobrantes: ['{"a":[1,2,],"b":{"c":1,},}', o => o.a.length === 2 && o.b.c === 1],
  comillas_internas: ['{"say":"She said "hello" to me","ok":2}', o => o.say === 'She said "hello" to me' && o.ok === 2],
  comillas_internas_en_array: ['{"opts":[{"t":"He was like "no way"","ok":1},{"t":"fine","ok":2}]}', o => o.opts[0].t === 'He was like "no way"' && o.opts[1].ok === 2],
  comillas_escapadas: ['{"t":"She said \\"hi\\""}', o => o.t === 'She said "hi"'],
  cortado_en_string: ['{"cards":[{"w":"ban","def":"prohibir"},{"w":"limit","def":"lim', o => o.cards.length === 2 && o.cards[1].w === 'limit'],
  cortado_tras_coma: ['{"cards":[{"w":"ban"},{"w":"limit"},', o => o.cards.length === 2],
  cortado_tras_clave: ['{"cards":[{"w":"ban"}],"grammar":{"notes":"x","items":[{"q":"a","opts":["1","2"],"a":', o => o.cards.length === 1 && o.grammar.items.length === 1],
  salto_de_linea_crudo: ['{"notes":"line1\nline2","x":1}', o => o.notes === 'line1\nline2'],
  comentario: ['{"a":1, // nota\n"b":2}', o => o.a === 1 && o.b === 2],
  llave_de_mas: ['{"a":[1,2]}}', o => o.a.length === 2],
  basura: ['no json here', o => o === null],
  vacio: ['', o => o === null],
};
let ok = 0, fail = 0;
for (const [k, [inp, chk]] of Object.entries(cases)) {
  let o, pass;
  try { o = parseJSON(inp); pass = chk(o); } catch (e) { o = 'THROW ' + e.message; pass = false; }
  if (pass) ok++; else fail++;
  console.log((pass ? 'ok   ' : 'FAIL ') + k + (pass ? '' : ' → ' + JSON.stringify(o)));
}
console.log('ok: ' + ok + ', fail: ' + fail);
process.exit(fail ? 1 : 0);
