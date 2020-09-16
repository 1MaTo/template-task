if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    workbox.setConfig({debug : true})
    workbox.core.skipWaiting();
    workbox.core.setCacheNameDetails({
      prefix: 'template-task',
      suffix: 'v1',
      precache: 'template-precache',
      runtime: 'template-runtime',
      googleAnalytics: 'template-google-analytics-name'
    })
    /* injection point for manifest files. */
    workbox.precaching.precacheAndRoute([{"revision":"2699fe8a142b6174832b8d21c2f35067","url":"index.html"},{"revision":"9584bea79d6514c9426a61ab45744605","url":"precache-manifest.9584bea79d6514c9426a61ab45744605.js"},{"revision":"1f95f3acbbd94dbfb19f47282b70183c","url":"static/css/main.cf595d69.chunk.css"},{"revision":"aff82506238a96728c367da08fad6803","url":"static/js/2.a61baf34.chunk.js"},{"revision":"373ba821abfa26a6743a755ef206197b","url":"static/js/3.9a99ce19.chunk.js"},{"revision":"669f9613136504f4f74a6939a2c0adbc","url":"static/js/4.5a33cad7.chunk.js"},{"revision":"72891cabffc7fdafb3cc704a3f366465","url":"static/js/main.8e57a97b.chunk.js"},{"revision":"23c0e5743a9537ce3de57b01df319130","url":"static/js/runtime-main.53d7e5c6.js"}]);
    /* custom cache rules */
    workbox.routting.registerRoute(
      ({url}) => url.origin === 'https://1mato.github.io/template-task/',
      workbox.strategies.StaleWhileRevalidate({
        cacheName: 'SWR-template-task'
      })
    )

  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}