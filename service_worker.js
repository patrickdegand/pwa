// Cached core static resources
self.addEventListener("install",e=>{
e.waitUntil(
caches.open("static").then(cache=>{
return cache.addAll([
    "/pwa/",
    "/pwa/images/logo192.png",
    "/pwa/images/logo512.png",
    "/pwa/css/w3.css",
    "/pwa/css/w3-theme-black.css",
    "/pwa/css/font-awesome.min.css",
    "/pwa/js/app.js",
    "/pwa/js/w3.js"
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
