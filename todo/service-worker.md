###### [TODO](TODO.md)
---
### To implement service worker

```js
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
</script>
```

```js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('your-cache-name') 
      .then((cache) => {
        return cache.addAll([
          '/', 
          '/index.html', 
          '/basic_style.css', 
          '/script.js', 
          '/images/image1.jpg' 
        ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request) 
      .then((response) => {
        return response || fetch(event.request); 
      })
  );
});
```