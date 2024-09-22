// public/service-worker.js

const CACHE_NAME = "mardi-cache-v1";
const VIDEO_CACHE_NAME = "mardi-video-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  // Add other assets like CSS, images, etc.
];

// Install event - caching static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - cleaning up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME, VIDEO_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Fetch event - handling caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle video segment requests (e.g., .m3u8, .ts files)
  if (url.pathname.endsWith(".m3u8") || url.pathname.endsWith(".ts")) {
    event.respondWith(
      caches.open(VIDEO_CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            // Serve from cache
            return response;
          }
          // Fetch from network and cache it
          return fetch(request)
            .then((networkResponse) => {
              // Clone the response before caching
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => {
              // Fallback logic if needed
              return new Response("Video unavailable", {
                status: 503,
                statusText: "Service Unavailable",
              });
            });
        });
      })
    );
    return;
  }

  // Handle static assets with Cache First strategy
  event.respondWith(
    caches.match(request).then((response) => {
      return (
        response ||
        fetch(request).then((networkResponse) => {
          // Clone the response before caching
          if (request.url.startsWith(self.location.origin)) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
      );
    })
  );
});
