#!/usr/bin/env node
// Ejecuta tools/validate-unit.js sobre todas las unidades registradas en courses/*/unit*.js
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
let fail = 0;
for (const ciclo of fs.readdirSync(path.join(root, 'courses'))) {
  const dir = path.join(root, 'courses', ciclo);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter(f => /^unit\d+\.js$/.test(f)).sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4)))) {
    const rel = path.join('courses', ciclo, f);
    try { execFileSync('node', [path.join(__dirname, 'validate-unit.js'), path.join(root, rel)], { stdio: 'pipe' }); console.log('OK   ' + rel); }
    catch (e) { fail++; console.log('FAIL ' + rel + '\n' + e.stdout.toString().split('\n').filter(l => l.startsWith(' - ')).join('\n')); }
  }
}
process.exit(fail ? 1 : 0);
