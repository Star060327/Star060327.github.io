// Service Worker 命名
const CACHE_NAME = 'novafe-learn-monaco-v1';
// 只拦截并缓存发往以下域名的请求
const CACHE_DOMAINS = ['cdn.staticfile.net', 'esm.sh'];

self.addEventListener('install', function (event) {
  // 跳过等待，让sw立即生效
  self.skipWaiting();
});
 
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }).then(()=>self.clients.claim()) // 确保所有客户端都使用新的sw
  );
});

self.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);
  // 只拦截GET请求以及域名在我们指定的域名列表中的请求
  if(event.request.method !== 'GET' || !CACHE_DOMAINS.includes(url.hostname)) {
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request).then((response) => {
          if (!response || (response.status !== 200 && response.status !== 0)) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
  );
});

