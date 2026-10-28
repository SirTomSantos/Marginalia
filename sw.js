// Marginalia service worker: keeps the app working offline.
// It only ever deletes caches whose names start with "marginalia-", so it cannot disturb other apps on this site.
// To force every device to refresh the app files, change the version below.
const V = 'marginalia-shell-v4';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => {
  // add files one by one so one missing file can never block the whole install
  e.waitUntil(caches.open(V).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('marginalia-') && k !== V && k !== 'marginalia-fonts').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    const shell = r.mode === 'navigate' || /\/(index\.html|config\.js|sw\.js|manifest\.webmanifest)$/.test(u.pathname) || u.pathname.endsWith('/');
    if (shell) {
      // network first so updates arrive; fall back to the saved copy when offline
      e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })
        .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
      return;
    }
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })));
    return;
  }
  if (/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.open('marginalia-fonts').then(c => c.match(r).then(m => m || fetch(r).then(res => { c.put(r, res.clone()); return res; }).catch(() => m))));
  }
});
