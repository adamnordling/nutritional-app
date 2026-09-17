// sw.js - Safe Stale-While-Revalidate Service Worker for Open Nutrition
const CACHE_NAME = 'open-nutrition-cache-v1';

const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.webmanifest',
    './src/style.css',
    './src/main.js',
    './src/foods.js',
    './src/schema.js',
    './src/assets/logo.png',
    './src/assets/favicon_io/favicon-32x32.png',
    './src/assets/favicon_io/favicon-16x16.png',
    './src/assets/favicon_io/apple-touch-icon.png',
    './src/assets/favicon_io/android-chrome-192x192.png',
    './src/assets/favicon_io/android-chrome-512x512.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Use cache.addAll with individual catch so missing optional assets don't abort installation
            return Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url)));
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches
            .keys()
            .then(keys =>
                Promise.all(
                    keys.map(key => {
                        if (key !== CACHE_NAME) return caches.delete(key);
                    })
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then(async cache => {
            const cachedResponse = await cache.match(event.request);

            const fetchPromise = fetch(event.request)
                .then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                })
                .catch(() => cachedResponse);

            return cachedResponse || fetchPromise;
        })
    );
});