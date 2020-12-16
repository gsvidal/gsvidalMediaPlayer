const VERSION = "v1";

self.addEventListener("install", event => {
  event.waitUntil(precache())
})
 
self.addEventListener("fetch", event => {
  const request = event.request;
  //get, no trabajamos con put, delete, update, etc.
  if(request.method !== "GET") {
    return;
  }
  //buscar en cache
  event.respondWith(cachedResponse(request));
  //actualizar el chache
  event.waitUntil(cachedResponse(request));

})

async function precache() {
  const cache = await caches.open(VERSION);
  return cache.addAll([
    './',
    './index.html',
    './assets/index.js',
    './assets/MediaPlayer.js',
    './assets/plugins/AutoPlay.js',
    './assets/plugins/AutoPause.js',
    './assets/index.css',
    './assets/bredcuchillo_1.mp4',
    './assets/images/mute.svg',
    './assets/images/pause.svg',
    './assets/images/play.svg',
    './assets/images/unmute.svg',
  ])
}

async function cachedResponse(request) {
  const cache = await caches.open(VERSION);
  const response = await cache.match(request);
  return response || fetch(request)
  //El || fetch(request) es por si no encuentra nada en cache, entonces el response devolvería undefined, así que con fetch(request) manda  a traer lo que no encuentre en cache
}

async function updateCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);

}