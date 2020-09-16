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

    precacheAndRoute(self.__WB_MANIFEST);

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