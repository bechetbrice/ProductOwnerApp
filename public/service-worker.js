// Service Worker pour ProductOwnerApp
// Permet l'installation de l'app et le fonctionnement offline

const CACHE_NAME = 'productownerapp-v1.0.0';
const OFFLINE_URL = './';

// Fichiers à mettre en cache pour fonctionnement offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './favicon.svg',
  './favicon.ico',
  './icons/icon-96x96.png',
  './icons/icon-180x180.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  
  // Force l'activation immédiate
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Prendre le contrôle immédiatement
  return self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  // Stratégie: Network First, puis Cache
  // Pour une app offline-first avec données localStorage
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la requête réussit, mettre en cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si erreur réseau, utiliser le cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          
          // Si page non trouvée dans cache, retourner page d'accueil
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});

// Message du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
