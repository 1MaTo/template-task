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
    precacheAndRoute(self.__WB_MANIFEST);

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