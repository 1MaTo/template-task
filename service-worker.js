if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    

    // Like Imports
    const { registerRoute } = workbox.routing;
    const { StaleWhileRevalidate } = workbox.strategies;
    const { precacheAndRoute } = workbox.precaching;
    const { setCacheNameDetails, skipWaiting } = workbox.core;
    const { setConfig } = workbox
    
    skipWaiting();

    setCacheNameDetails({
      prefix: 'template-task',
      suffix: 'v1',
      precache: 'precache',
      runtime: 'runtime',
      googleAnalytics: 'template-google-analytics-name'
    })

    precacheAndRoute([{"revision":"669654cf0fd7d467e8abca62394da15f","url":"index.html"},{"revision":"ff6a1f227489baab4a63677a0430b433","url":"precache-manifest.ff6a1f227489baab4a63677a0430b433.js"},{"revision":"1f95f3acbbd94dbfb19f47282b70183c","url":"static/css/main.cf595d69.chunk.css"},{"revision":"aff82506238a96728c367da08fad6803","url":"static/js/2.a61baf34.chunk.js"},{"revision":"373ba821abfa26a6743a755ef206197b","url":"static/js/3.9a99ce19.chunk.js"},{"revision":"669f9613136504f4f74a6939a2c0adbc","url":"static/js/4.5a33cad7.chunk.js"},{"revision":"ffccda80d61bfea81767cb489b716af2","url":"static/js/main.e79d2ae6.chunk.js"},{"revision":"23c0e5743a9537ce3de57b01df319130","url":"static/js/runtime-main.53d7e5c6.js"}]);

    registerRoute(
      'https://jsonplaceholder.typicode.com/todos/1',
      new StaleWhileRevalidate({
        cacheName: 'SWR-template-task'
      })
    )
  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}