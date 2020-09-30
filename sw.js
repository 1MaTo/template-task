if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    const serverUrl = 'https://25d3f928c7f7.ngrok.io'


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
    const { BackgroundSyncPlugin, Queue } = workbox.backgroundSync;
    const { BroadcastUpdatePlugin } = workbox.broadcastUpdate;

    //Rename caches
    setCacheNameDetails({
      prefix: 'template-task',
      suffix: 'v1',
      precache: 'precache',
      runtime: 'runtime',
      googleAnalytics: 'template-google-analytics-name'
    })

    //Cache static assets
    precacheAndRoute([{"revision":"33729ddee5fed97b27a2e4b24c093830","url":"icon-225.png"},{"revision":"843ec68bebde9382ddc2b94b921f505d","url":"index.html"},{"revision":"edb62b0062571798fcc2ab4a452467b6","url":"ios/apple-touch-icon-ipad-76x76.png"},{"revision":"07ffb905479e966cd1c899d4d7ffde26","url":"ios/apple-touch-icon-ipad-retina-152x152.png"},{"revision":"ba2972e850b75b8e654cf251c9c390a1","url":"ios/apple-touch-icon-iphone-60x60.png"},{"revision":"039fa93bc09b7f9f6d0d19ca2ca01695","url":"ios/apple-touch-icon-iphone-retina-120x120.png"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"ios/logo192.png"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"fa475a310988e49259131ead7e91ac04","url":"maskable_icon.png"},{"revision":"110e0dfd776757496ce55aba4ebb984b","url":"precache-manifest.110e0dfd776757496ce55aba4ebb984b.js"},{"revision":"d1f0fe465d5957a19903aade3b953d86","url":"service-worker.js"},{"revision":"a506b73beb7e501dc35d45f02eb6eb60","url":"splashscreens/ipad_splash.png"},{"revision":"02fc4c75a3673e899b5faa10cd7b3712","url":"splashscreens/ipadpro1_splash.png"},{"revision":"9f87cf0e467d1908f5db983aa7cea4d9","url":"splashscreens/ipadpro2_splash.png"},{"revision":"f24a560a2243ed1fe9d6a0f231b3b4f7","url":"splashscreens/iphone5_splash.png"},{"revision":"a35449b40d186435183b832bd6b0658b","url":"splashscreens/iphone6_splash.png"},{"revision":"852fa97b404865dae0ff2642d65a2f2c","url":"splashscreens/iphoneplus_splash.png"},{"revision":"2b253628f1b77bdf08b26b468fe3d9ca","url":"splashscreens/iphonex_splash.png"},{"revision":"c63d7c5e54fb9f170fd1a7b0268d6624","url":"static/css/main.01af5a9e.chunk.css"},{"revision":"790bde4453a4ffa6d9cf526ae001d032","url":"static/js/2.d2f85dbe.chunk.js"},{"revision":"402d3ed454d0e450878c20baa557c771","url":"static/js/main.29958f01.chunk.js"},{"revision":"960f6224d174cb07f8a4b56714925f5f","url":"static/js/runtime-main.8cd61495.js"}]);

    // handler for caching SPA routing like /tasks and /challenges
    const handler = createHandlerBoundToURL('index.html')
    const navigationRoute = new NavigationRoute(handler)
    registerRoute(navigationRoute)

    // Background sync settings
    const bgSyncPlugin = new BackgroundSyncPlugin('apiQueue', {
      maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
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
    //Caching user data, its not updating frequently
    registerRoute(
      new RegExp(`${serverUrl}/users.*`),
      new NetworkFirst({
        cacheName: 'api'
      }),
      'GET'
    )

    //Handler and route for using indexedDB as data storage for failed request
    const networkOnly = new NetworkOnly();
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
    // Handler that takes data from bd when fetch failed
    const offlineHandler = async (params) => {
      try {
        //if online using network request
        return await networkOnly.handle(params);
      } catch (error) {
        //else getting data from IndexedDB
        let table;
        if (params.url.pathname.includes('challenges')) {
          table = 'challenges'
        } else if (params.url.pathname.includes('tasks')) {
          table = 'tasks'
        }
        let init = { "status": 200, "statusText": "offline" }
        const data = await getDataFromBd(table)
        return new Response(JSON.stringify(data), init)
      }
    }
    //This route serves offile challanges
    registerRoute(
      new RegExp(`${serverUrl}/challenges`),
      offlineHandler,
      'GET'
    )
    //This route serves offile tasks
    registerRoute(
      new RegExp(`${serverUrl}/tasks.*`),
      offlineHandler,
      'GET'
    )
    //POST request for accept task
    const networkOnlyWithBgSync = new NetworkOnly({ plugins: [bgSyncPlugin] })
    const acceptChallengeOfflineHandler = async (params) => {
      try {
        return await networkOnlyWithBgSync.handle(params)
      } catch (error) {
        return new Response("offline", { "status": 201, "statusText": "offline" })
      }
      /* const promiseChain = fetch(params.event.request.clone()).catch((err) => {
        return queue.pushRequest({ request: params.event.request });
      });
      try {
        return await networkOnly.handle(params);
      } catch (error) {
        params.event.waitUntil(promiseChain); 
      } */
    }
    registerRoute(
      new RegExp(`${serverUrl}/challenges/accept`),
      acceptChallengeOfflineHandler,
      'POST'
    )
    //PUT request to /tasks background sync
    registerRoute(
      new RegExp(`${serverUrl}/tasks/.*`),
      new NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'PUT'
    )
    //POST request to /tasks background sync
    registerRoute(
      new RegExp(`${serverUrl}/tasks/.*`),
      new NetworkOnly({
        plugins: [bgSyncPlugin]
      }),
      'POST'
    )
    // Handle Notifications' actions
    self.addEventListener('notificationclick', (e) => {
      e.notification.close()
      e.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
        // If a Window tab matching the targeted URL already exists, focus that;
        const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === e.notification.data.url ? (windowClient.focus(), true) : false);
        // Otherwise, open a new tab to the applicable URL and focus it.
        if (!hadWindowToFocus) clients.openWindow(e.notification.data.url).then(windowClient => windowClient ? windowClient.focus() : null);
      }));

    })

    //Display ntification to open client
    const newContentNotification = () => {
      if (self.Notification.permission === 'granted') {
        const notificationObject = {
          body: 'Данные обновлены',
          data: { url: self.location.origin + '/template-task/tasks' },
        };
        self.registration.showNotification('Ты снова онлайн!', notificationObject);
      }
    }

    // Subscribe on sync event
    self.addEventListener('sync', function(event) {
      if (event.tag === 'workbox-background-sync:apiQueue') {
        event.waitUntil(newContentNotification())
      }
    })

    //Open our pwa
    /* const getInternetConnetionNotification = async (url) => {
      const allClients = await clients.matchAll({
        includeUncontrolled: true
      });
      let ourClient;
      // Let's see if we already have a chat window open:
      for (const client of allClients) {
        const url = new URL(client.url);

        if (url.pathname === '/template-task/tasks') {
          // Excellent, let's use it!
          client.focus();
          ourClient = client;
          break;
        }
      }

      // If we didn't find an existing chat window,
      // open a new one:
      if (!ourClient) {
        ourClient = await clients.openWindow('/chat/');
      }

      // Message the client:
      ourClient.postMessage("New chat messages!");
    } */

    //Push notifications handler
    self.addEventListener('push', e => {
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