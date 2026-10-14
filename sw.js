/* ===========================================================
   sw.js — hace que English Trainer funcione sin conexión.
   Estrategia "stale-while-revalidate": responde al instante
   desde la caché y en segundo plano descarga la versión nueva,
   que se verá la próxima vez que abras la app.
   No hace falta listar las unidades: todo lo que la página
   carga (incluidas las nuevas unidades) se guarda solo.
   Sube CACHE (et-v2, et-v3…) si quieres forzar una limpieza.
   =========================================================== */
const CACHE = 'et-v8';
const SHELL = ['./', 'index.html', 'css/style.css', 'js/engine.js', 'js/coach.js', 'js/method.js', 'js/translate.js', 'js/app.js', 'courses/registry.js',
  'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(e.request, { ignoreSearch: true });
    const fresh = fetch(e.request).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone());
      return res;
    }).catch(() => hit || (e.request.mode === 'navigate' ? cache.match('index.html') : undefined));
    return hit || fresh;
  }));
});
