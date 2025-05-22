const cacheName = 'birthday-countdown-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',       // add your CSS file if you have one
  '/script.js',       // add your JS file if you have one
  '/icon-192.png',    // add icons you referenced in manifest
  '/icon-512.png'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});