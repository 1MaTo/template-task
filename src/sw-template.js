if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    const serverUrl = 'http://f1f45c525785.ngrok.io'


    // TO FORCE UPDATE SERVICE WORKER IF NEW DETECED
    self.addEventListener("install", async (event) => {
      self.skipWaiting();
    });

    // TO FORCE APP USING ROUTING RIGHT AFTER FIRST LOADING
    self.addEventListener('activate', function (event) {
      event.waitUntil(self.clients.claim());
    });

    // Like Imports
    const { registerRoute, NavigationRoute } = workbox.routing;
    const { StaleWhileRevalidate, NetworkFirst, NetworkOnly } = workbox.strategies;
    const { precacheAndRoute, createHandlerBoundToURL } = workbox.precaching;
    const { setCacheNameDetails } = workbox.core;
    const { BackgroundSyncPlugin } = workbox.backgroundSync;
    const { BroadcastUpdatePlugin } = workbox.broadcastUpdate;

    setCacheNameDetails({
      prefix: 'template-task',
      suffix: 'v1',
      precache: 'precache',
      runtime: 'runtime',
      googleAnalytics: 'template-google-analytics-name'
    })

    precacheAndRoute(self.__WB_MANIFEST);

    // handler for caching SPA routing
    const handler = createHandlerBoundToURL('index.html')
    const navigationRoute = new NavigationRoute(handler)
    registerRoute(navigationRoute)

    // Background sync settings
    const bgSyncPlugin = new BackgroundSyncPlugin('apiQueue', {
      maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
    });

    // cache GET api responses SWR with BroadCastUpdate
    /*     registerRoute(
          new RegExp('http://9861898cc3b4.ngrok.io/.*'),
          new StaleWhileRevalidate({
            cacheName: 'api',
            plugins: [
              new BroadcastUpdatePlugin(),
            ],
          }),
          'GET'
        ) */
    registerRoute(
      new RegExp(`${serverUrl}/users.*`),
      new NetworkFirst({
        cacheName: 'api'
      }),
      'GET'
    )

    //Handler and route for using indexedDB as data storage for failed request
    const networkOnly = new NetworkOnly();
    const offlineHandler = async (params) => {
      try {
        return await networkOnly.handle(params);
      } catch (error) {
        let table;
        if (params.url.pathname.includes('challenges')) {
          table = 'challenges'
        } else if (params.url.pathname.includes('tasks')) {
          table = 'tasks'
        }
        let init = { "status": 200, "statusText": "indexedDB" }
        const data = await getDataFromBd(table)
        return new Response(JSON.stringify(data), init)
      }
    }
    registerRoute(
      new RegExp(`${serverUrl}/challenges`),
      offlineHandler,
      'GET'
    )
    registerRoute(
      new RegExp(`${serverUrl}/tasks.*`),
      offlineHandler,
      'GET'
    )

    // This function get data from indexedDB
    const getDataFromBd = (table) => new Promise((resolve, reject) => {
      let db;
      let request = indexedDB.open('db', 10)
      request.onsuccess = function (event) {
        db = request.result
        let transaction = db.transaction(table, 'readonly')
        let objectStore = transaction.objectStore(table)
        objectStore.getAll().onsuccess = (e) => {
          resolve(e.target.result)
        }
      }
    })

    //Post request to background sync
    registerRoute(
      new RegExp(`${serverUrl}/.*`),
      new NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    )

    //Put request to background sync
    registerRoute(
      new RegExp(`${serverUrl}/.*`),
      new NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'PUT'
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
    console.log('Workbox could not be loaded. No Offline support');
  }
}