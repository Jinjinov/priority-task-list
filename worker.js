/* global self, caches, fetch */
'use strict'

var cachename = 'priority-task-list-vuejs-pouchdb-0.0.1'
var urlstocache = [
  'index.html',
  'index.js',
  'index.css',
  'https://cdn.jsdelivr.net/gh/pouchdb/pouchdb@6.3.4/dist/pouchdb.min.js',
  //'https://cdn.jsdelivr.net/gh/pouchdb/pouchdb@6.3.4/dist/pouchdb.find.min.js',
  'https://unpkg.com/vue/dist/vue.js'
];

// install/cache page assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cachename)
      .then(function (cache) {
        console.log('cache opened')
        return cache.addAll(urlstocache)
      })
  )
})

// intercept page requests
self.addEventListener('fetch', function (event) {
  console.log(event.request.url)
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // serve requests from cache (if found)
      return response || fetch(event.request)
    })
  )
})

// service worker activated, remove outdated cache
self.addEventListener('activate', function (event) {
  console.log('worker activated')
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          // filter old versioned keys
          return key !== cachename
        }).map(function (key) {
          return caches.delete(key)
        })
      )
    })
  )
})