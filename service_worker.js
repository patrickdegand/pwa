// Cached core static resources
self.addEventListener("install",e=>{
e.waitUntil(
caches.open("static").then(cache=>{
return cache.addAll([
    "/",
    "/images/logo192.png",
    "/images/logo512.png",
    "/css/w3.css",
    "/css/w3-theme-black.css",
    "/css/font-awesome.min.css",
    "/js/app.js",
    "/js/w3.js"
]);
})
);
});
// Fatch resources
self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(response=>{
return response||fetch(e.request);
})
);
});