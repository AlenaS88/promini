const CACHE_NAME = 'policy-calculator-v6';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/logos/ARSENAL.png',
  './assets/logos/ARX.png',
  './assets/logos/BBS.webp',
  './assets/logos/ESA.png',
  './assets/logos/ETALON.png',
  './assets/logos/ETS.png',
  './assets/logos/EUROINS.svg',
  './assets/logos/EXPRESS.png',
  './assets/logos/INGO.png',
  './assets/logos/INTERPOLIS.png',
  './assets/logos/KNYAZHA.png',
  './assets/logos/ORANTA.png',
  './assets/logos/PZU.png',
  './assets/logos/TAS.png',
  './assets/logos/UNIQA.webp',
  './assets/logos/UNIVERSAL.png',
  './assets/logos/USG.png',
  './assets/logos/UTICO.png',
  './assets/logos/VUSO.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
