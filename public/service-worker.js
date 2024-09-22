// public/service-worker.js

const CACHE_NAME = 'video-cache-v1';

// Install event
self.addEventListener('install', (event) => {
  // Activate immediately
  event.waitUntil(self.skipWaiting());
});

// Activate event
self.addEventListener('activate', (event) => {
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Check if the request is for a video segment or manifest
  if (request.url.includes('.m3u8') || request.url.includes('.ts') || request.url.includes('.mp4')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached response
            return cachedResponse;
          }

          // Fetch from network and cache the response
          return fetch(request).then((networkResponse) => {
            // Check if response is valid
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  }
});
