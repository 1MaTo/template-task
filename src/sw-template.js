if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');


    // Like Imports
    const { registerRoute, NavigationRoute } = workbox.routing;
    const { StaleWhileRevalidate } = workbox.strategies;
    const { precacheAndRoute, createHandlerBoundToURL } = workbox.precaching;
    const { setCacheNameDetails, skipWaiting } = workbox.core;

    skipWaiting();

    setCacheNameDetails({
      prefix: 'template-task',
      suffix: 'v1',
      precache: 'precache',
      runtime: 'runtime',
      googleAnalytics: 'template-google-analytics-name'
    })

    precacheAndRoute(self.__WB_MANIFEST);

    // handler for caching SPA routing
    const handler = createHandlerBoundToURL('/index.html')
    const navigationRoute = new NavigationRoute(handler)
    registerRoute(navigationRoute,
      new StaleWhileRevalidate({
        cacheName: 'shell'
      })
    )

    // cache api responses
    registerRoute(
      new RegExp('http://127.0.0.1:3000/.*'),
      new StaleWhileRevalidate({
        cacheName: 'api'
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