const CACHE_NAME = 'gemini-time-travel-booth-v1';
// List of files that make up the app shell.
const APP_SHELL_URLS = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants.ts',
  './utils/fileUtils.ts',
  './services/geminiService.ts',
  './components/PortraitCreator.tsx',
  './components/ImageUploader.tsx',
  './components/SceneSelector.tsx',
  './components/ResultDisplay.tsx',
  './components/Spinner.tsx',
  './components/icons.tsx',
  './icon.svg',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/',
  'https://aistudiocdn.com/@google/genai@^1.27.0',
];

// Install event: cache the app shell.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching app shell');
      // Use { cache: 'reload' } to bypass browser cache for external resources during install
      const requests = APP_SHELL_URLS.map(url => new Request(url, { cache: 'reload' }));
      return cache.addAll(requests);
    }).catch(err => {
      console.error('Service Worker: Caching failed', err);
    })
  );
});

// Activate event: clean up old caches.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: serve from cache or network.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  
  const url = new URL(event.request.url);

  // For API calls to Google, always go to the network.
  if (url.hostname.includes('googleapis.com')) {
    return;
  }

  // For app shell resources, use a cache-first strategy.
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(err => {
        console.error('Fetch failed:', err);
        // You could return a fallback offline page here if you had one.
      });
    })
  );
});
