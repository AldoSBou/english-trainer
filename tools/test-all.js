// Recorre todas las rutas (ciclos, unidades, secciones y herramientas) en Chromium headless y reporta errores.
// Uso: node tools/test-all.js [rutaDelProyecto]   (requiere: npm i -D playwright && npx playwright install chromium)
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..');
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webmanifest':'application/manifest+json','.json':'application/json'};
const srv = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]); if (p==='/') p='/index.html';
  const f = path.join(ROOT,p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'}); fs.createReadStream(f).pipe(res);
}).listen(0);
(async()=>{
  const port = srv.address().port, base = `http://127.0.0.1:${port}/`;
  const browser = await chromium.launch(); const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e=>errors.push('PAGEERROR '+page.url()+' :: '+e.message));
  page.on('console', m=>{ if (m.type()==='error') errors.push('CONSOLE '+page.url()+' :: '+m.text()); });
  // Google Fonts no importa para el test (y puede no haber red): se responde CSS vacío.
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r=>r.fulfill({status:200, contentType:'text/css', body:''}));
  await page.addInitScript(()=>{
    Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>[],speak(){},cancel(){},addEventListener(){}, onvoiceschanged:null}});
    window.SpeechSynthesisUtterance = function(t){ this.text=t; };
  });
  await page.goto(base+'#/'); await page.waitForTimeout(300);
  const courses = await page.evaluate(()=>window.COURSES.filter(c=>c.available).map(c=>({id:c.id,units:c.units.filter(u=>u.available).map(u=>u.id)})));
  const routes = ['#/','#/curso','#/perfil','#/coach','#/coach/roleplay','#/coach/eval','#/coach/history','#/coach/settings','#/method','#/method/srs','#/method/errors','#/method/pron','#/method/reading','#/method/shadow','#/method/mix','#/method/roleplay','#/method/fluency','#/method/dictogloss','#/method/retell','#/translate'];
  const secs = ['home','vocab','grammar','listen','speak','read','write','social'];
  for (const c of courses){ routes.push('#/'+c.id); for (const u of c.units){ routes.push(`#/${c.id}/${u}`); for (const s of secs) routes.push(`#/${c.id}/${u}/${s}`); } }
  let n=0, empty=[];
  for (const r of routes){
    await page.goto(base+r); await page.waitForTimeout(120);
    const txt = await page.evaluate(()=>document.getElementById('view').innerText.trim().length);
    if (txt<20) empty.push(r);
    // click first option of first mcq if any, to exercise handlers
    const opt = await page.$('.act.on .opt'); if (opt) { try { await opt.click({timeout:500}); } catch(e){} }
    n++;
  }
  // structural check of UNIT_DATA
  const struct = await page.evaluate(()=>{
    const out=[]; for (const [k,u] of Object.entries(window.UNIT_DATA)){
      if (!u.sections||!u.sections.length) out.push(k+': no sections');
      for (const s of u.sections){ if(s.id!=='home' && (!s.activities||!s.activities.length)) out.push(k+'/'+s.id+': no activities');
        for (const a of (s.activities||[])) if(!window.Engine.renderers[a.type]) out.push(k+'/'+s.id+': unknown type '+a.type); }
    }
    return out;
  });
  console.log(`routes: ${n}, empty views: ${empty.length}, errors: ${errors.length}, struct issues: ${struct.length}`);
  empty.forEach(e=>console.log('EMPTY',e)); errors.slice(0,30).forEach(e=>console.log(e)); struct.forEach(e=>console.log('STRUCT',e));
  await browser.close(); srv.close();
  process.exit(errors.length||struct.length||empty.length?1:0);
})();
