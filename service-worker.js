/* eslint-env browser, es6 */
var cacheName = '1grade-math:v2';

var cacheFiles = [
    './',
    './index.html',
    './style.css',
    './img/iceKingLove.png',
    './img/iceKingRage.png',
    './sounds/bzz.mp3',
    './sounds/tada.mp3',
    './app.js'
];
/* eslint-disable no-console */
self.addEventListener('install', function (evt) {
    console.log('[serviceWorker] installed');

    evt.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('[serviceWorker] caching cache files');
                return cache.addAll(cacheFiles);
            })
    );
});

self.addEventListener('activate', function (evt) {
    console.log('[serviceWorker] activated');

    evt.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (_cacheName) {
                    console.log('[serviceWorker] cache found:', _cacheName);
                    if (_cacheName !== cacheName) {
                        console.log('[serviceWorker] removing files from cache >>>', _cacheName);
                        return caches.delete(_cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (evt) {
    console.log('[serviceWorker] Fetching', evt.request.url);

    evt.respondWith(
        caches.match(evt.request)
            .then(function (res) {
                if (res) {
                    console.log('[serviceWorker] Found in cache', evt.request.url, res);
                    return res;
                } else {
                    var requestClone = evt.request.clone();

                    fetch(requestClone)
                        .then(function (res) {
                            if (!res) {
                                console.log('[serviceWorker] no response from fetch');
                                return res;
                            } else {
                                var responseClone = res.clone();

                                caches.open(cacheName).then(function (cache) {
                                    console.log('[serviceWorker] received new data from', evt.request.url);
                                    cache.put(evt.request, responseClone);
                                    return res;
                                });
                            }
                        })
                        .catch(function (err) {
                            console.log('[serviceWorker] fetching and caching error', err);
                        });
                }
            })
    );
});
