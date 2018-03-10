/* global self, caches, fetch */
'use strict'

var cachename = 'priority-task-list-vuejs-pouchdb-0.0.1'
var urlstocache = [
  'index.css',
  'index.html',
  'index.js',
  'vuepouch.js',
  'autolink-min.js',
  'icons/age.png',
  'icons/count.png',
  'icons/day.png',
  'icons/delete.png',
  'icons/help.png',
  'icons/increase.png',
  'icons/pause.png',
  'icons/play.png',
  'icons/priority.png',
  'icons/save.png',
  'icons/tag.png',
  'icons/week.png',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/pouchdb/6.4.3/pouchdb.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.14/vue.min.js'
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