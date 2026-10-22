const CACHE = 'alpha-proxima-one-v0.1.1'
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    const response = await fetch('/')
    const html = await response.clone().text()
    await cache.put('/', response)
    await cache.addAll(['/manifest.webmanifest','/icons/icon.svg','/icons/apple-touch-icon.png'])
    const assets = [...html.matchAll(/(?:src|href)="([^\"]+\.(?:js|css))"/g)].map(match => match[1])
    await Promise.all(assets.map(async url => { const asset = await fetch(url); if (asset.ok) await cache.put(url, asset) }))
  })())
  self.skipWaiting()
})
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))))
  self.clients.claim()
})
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => { const copy = response.clone(); void caches.open(CACHE).then(cache => cache.put('/', copy)); return response }).catch(() => caches.match('/')))
    return
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if (response.ok) { const copy = response.clone(); void caches.open(CACHE).then(cache => cache.put(event.request, copy)) }; return response })))
})
