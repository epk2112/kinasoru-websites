// Service Worker 
self.addEventListener('install', (event) => {
    console.log('Installing service worker...');
    // Precache files here (e.g., important static assets)
    event.waitUntil(
      caches.open('kinasoru-cache-v1').then((cache) => {
        return cache.addAll([
          '/', // Home page
          '/index.html',
          '/style.css',
          '/main.js',
          // Add other essential files here 
        ]);
      })
    );
  });
  
  // Fetch events: handle requests and potentially serve from the cache
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Serving from cache:', event.request.url);
          return cachedResponse;
        }
  
        // If not in cache, fetch from network
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request);
      })
    );
  });