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

    precacheAndRoute([{"revision":"ee9657e96b2ce7bebc154d8713267d07","url":"index.html"},{"revision":"db661aec0ae01e6f1896fae0d1f72ed8","url":"precache-manifest.db661aec0ae01e6f1896fae0d1f72ed8.js"},{"revision":"1f95f3acbbd94dbfb19f47282b70183c","url":"static/css/main.cf595d69.chunk.css"},{"revision":"aff82506238a96728c367da08fad6803","url":"static/js/2.a61baf34.chunk.js"},{"revision":"373ba821abfa26a6743a755ef206197b","url":"static/js/3.9a99ce19.chunk.js"},{"revision":"669f9613136504f4f74a6939a2c0adbc","url":"static/js/4.5a33cad7.chunk.js"},{"revision":"00693115b1e42d29e3b9dc4f325f1ac9","url":"static/js/main.10ee8e6d.chunk.js"},{"revision":"23c0e5743a9537ce3de57b01df319130","url":"static/js/runtime-main.53d7e5c6.js"}]);

    registerRoute(
      'https://jsonplaceholder.typicode.com/todos/1',
      new StaleWhileRevalidate({
        cacheName: 'SWR-template-task'
      })
    )

    // Handle Notifications' actions
    self.addEventListener('notificationclick', (e) => {
      let { notification, action } = e
      if (action === 'close') {
        notification.close()
      }
    })

    self.addEventListener('push', function (e) {
      let body;

      if (e.data) {
        body = e.data.text()
      } else {
        body = 'Нет информации о сообщении'
      }
      let options = {
        body: body,
        icon: 'favicon.ico',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {
            action: 'close', title: 'Закрыть'
          }
        ],
      }
      e.waitUntil(
        self.registration.showNotification('Новое уведомление 😎', options)
      )
    })
  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}