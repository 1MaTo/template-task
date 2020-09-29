if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    const serverUrl = 'https://3cb540aab2da.ngrok.io'


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

    precacheAndRoute([{"revision":"33729ddee5fed97b27a2e4b24c093830","url":"icon-225.png"},{"revision":"cb7303b3417856d72f8ad5e2ea6f1e2b","url":"index.html"},{"revision":"edb62b0062571798fcc2ab4a452467b6","url":"ios/apple-touch-icon-ipad-76x76.png"},{"revision":"07ffb905479e966cd1c899d4d7ffde26","url":"ios/apple-touch-icon-ipad-retina-152x152.png"},{"revision":"ba2972e850b75b8e654cf251c9c390a1","url":"ios/apple-touch-icon-iphone-60x60.png"},{"revision":"039fa93bc09b7f9f6d0d19ca2ca01695","url":"ios/apple-touch-icon-iphone-retina-120x120.png"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"ios/logo192.png"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"fa475a310988e49259131ead7e91ac04","url":"maskable_icon.png"},{"revision":"20a7c3a3e46b6d43923db1581f971dc4","url":"precache-manifest.20a7c3a3e46b6d43923db1581f971dc4.js"},{"revision":"9a7afa54deafeeca7b0b6933daf8b342","url":"service-worker.js"},{"revision":"a506b73beb7e501dc35d45f02eb6eb60","url":"splashscreens/ipad_splash.png"},{"revision":"02fc4c75a3673e899b5faa10cd7b3712","url":"splashscreens/ipadpro1_splash.png"},{"revision":"9f87cf0e467d1908f5db983aa7cea4d9","url":"splashscreens/ipadpro2_splash.png"},{"revision":"f24a560a2243ed1fe9d6a0f231b3b4f7","url":"splashscreens/iphone5_splash.png"},{"revision":"a35449b40d186435183b832bd6b0658b","url":"splashscreens/iphone6_splash.png"},{"revision":"852fa97b404865dae0ff2642d65a2f2c","url":"splashscreens/iphoneplus_splash.png"},{"revision":"2b253628f1b77bdf08b26b468fe3d9ca","url":"splashscreens/iphonex_splash.png"},{"revision":"c63d7c5e54fb9f170fd1a7b0268d6624","url":"static/css/main.01af5a9e.chunk.css"},{"revision":"032927e455ea61d57aa2a51e2b65bb5f","url":"static/js/2.bfba1032.chunk.js"},{"revision":"f1743bdff517746d14adf8cfef86ce06","url":"static/js/main.4e16a398.chunk.js"},{"revision":"960f6224d174cb07f8a4b56714925f5f","url":"static/js/runtime-main.8cd61495.js"}]);

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