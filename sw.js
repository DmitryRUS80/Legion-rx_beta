const CACHE_NAME = 'legion-rx-v3.3.11-beta';
const APP_FILES = [
  './',
  './index.html',
  './style.css?v=3.3.11',
  './i18n.js?v=3.3.11',
  './data.js?v=3.3.11',
  './score.js?v=3.3.11',
  './qualifying.js?v=3.3.11',
  './finals.js?v=3.3.11',
  './championship.js?v=3.3.11',
  './theme.js?v=3.3.11',
  './app.js?v=3.3.11',
  './pwa.js?v=3.3.11',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './assets/legion-rx-hero.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

// Network-first: GitHub Pages updates are loaded immediately; cache is only fallback.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        throw new Error('Offline and resource is not cached');
      })
  );
});
