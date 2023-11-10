const CACHE_NAME = 'v1_Prisicla_bch_pwa'

//Agregar los archivos y carpetas
var urlIsToCache = [
    './',
    'main.js',
    'js/scrollIt.min.js',
    'sw.js',
    'js/wow.min.js',
    'css/animate.css',
    'css/style.css',
    'images/android-icon-36x36.png',
    'images/android-icon-48x48.png',
    'images/android-icon-72x72.png',
    'images/android-icon-96x96.png',
    'images/android-icon-144x144.png',
    'images/android-icon-192x192.png',
    'images/apple-icon-57x57.png',
    'images/apple-icon-60x60.png',
    'images/apple-icon-72x72.png',
    'images/apple-icon-76x76.png',
    'images/apple-icon-114x114.png',
    'images/apple-icon-120x120.png',
    'images/apple-icon-144x144.png',
    'images/apple-icon-152x152.png',
    'images/apple-icon-180x180.png',
    'images/apple-icon-precomposed.png',
    'images/apple-icon.png',
    'images/applight-wave.svg',
    'images/appstore.png',
    'images/arrow-left.png',
    'images/arrow-right.png',
    'images/browserconfig.xml',
    'images/favicon-16x16.png',
    'images/favicon-32x32.png',
    'images/favicon-96x96.png',
    'images/iphone-screen-with-shadow.png',
    'images/iphone-screen.png',
    'images/logo-black.png',
    'images/logo.png',
    'images/ms-icon-70x70.png',
    'images/ms-icon-144x144.png',
    'images/ms-icon-150x150.png',
    'images/ms-icon-310x310.png',
    'images/pattern.png',
    'images/playstore.png',
    'images/user1.png',
    'images/user2.png',
    'images/user3.png',
    'images/video-bg.png'
]

//Instala el service worker 
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlIsToCache)
            .then(() => {
                self.skipWaiting()
            })

            .catch(err => {
                console.log('No se registro el cache', err);
            })
        })
    )
})

self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        //Borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {self.clients.claim();})
    );
})

self.addEventListener
('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});



