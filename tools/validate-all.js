#!/usr/bin/env node
// Ejecuta tools/validate-unit.js sobre todas las unidades de courses/<ciclo>/*.js (unitN.js primero, luego el resto por nombre)
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
let fail = 0;
for (const ciclo of fs.readdirSync(path.join(root, 'courses'))) {
  const dir = path.join(root, 'courses', ciclo);
  if (!fs.statSync(dir).isDirectory()) continue;
  const num = f => /^unit\d+\.js$/.test(f) ? parseInt(f.slice(4)) : 1e9;
  for (const f of fs.readdirSync(dir).filter(f => /\.js$/.test(f)).sort((a, b) => (num(a) - num(b)) || a.localeCompare(b))) {
    const rel = path.join('courses', ciclo, f);
    try { execFileSync('node', [path.join(__dirname, 'validate-unit.js'), path.join(root, rel)], { stdio: 'pipe' }); console.log('OK   ' + rel); }
    catch (e) { fail++; console.log('FAIL ' + rel + '\n' + e.stdout.toString().split('\n').filter(l => l.startsWith(' - ')).join('\n')); }
  }
}
process.exit(fail ? 1 : 0);
