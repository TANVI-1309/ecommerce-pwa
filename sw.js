// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      return cache.addAll([
        '/',
        'index.html',
        'offline.html'
      ]);
    })
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request)
        .then(res => res || caches.match('offline.html'));
    })
  );
});

// Sync Event
self.addEventListener('sync', event => {
  if (event.tag === 'sync-orders') {
    console.log("Syncing orders...");
  }
});

// Push Event
self.addEventListener('push', event => {
  const data = event.data ? event.data.text() : "New Offer!";

  event.waitUntil(
    self.registration.showNotification("Ecommerce", {
      body: data,
      icon: "icon.png"
    })
  );
});
