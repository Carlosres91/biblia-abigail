// Biblia Abigail — service worker (precache + cache-first)
// Generado por scripts/build.js el 2026-08-19T02:16:32.213Z
const CACHE = 'abigail-2026-08-19T02:16:32.213Z';
const PRECACHE = [
  "/biblia-abigail/",
  "/biblia-abigail/index.html",
  "/biblia-abigail/manifest.webmanifest",
  "/biblia-abigail/favicon.svg",
  "/biblia-abigail/icons.svg",
  "/biblia-abigail/assets/index-DIB77a16.css",
  "/biblia-abigail/assets/index-DP5h5wfH.js"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copia = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copia));
      return res;
    }).catch(() => caches.match('/biblia-abigail/index.html')))
  );
});
