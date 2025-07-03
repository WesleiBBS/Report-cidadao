const CACHE_NAME = 'report-cidadao-v1.0'
const STATIC_CACHE = 'static-v1.0'
const DYNAMIC_CACHE = 'dynamic-v1.0'

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.svg'
]

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Cache estático aberto')
        return cache.addAll(urlsToCache)
      })
      .then(() => {
        console.log('Service Worker: Instalado com sucesso')
        return self.skipWaiting()
      })
  )
})

// Ativar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Removendo cache antigo', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('Service Worker: Ativado com sucesso')
      return self.clients.claim()
    })
  )
})

// Interceptar requisições com estratégia Cache First para assets estáticos
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Apenas interceptar requisições do mesmo domínio
  if (url.origin !== location.origin) {
    return
  }

  // Cache first para assets estáticos
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.url.includes('.js') ||
      request.url.includes('.css') ||
      request.url.includes('.png') ||
      request.url.includes('.jpg') ||
      request.url.includes('.svg')) {
    
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response
          }
          return fetch(request).then((fetchResponse) => {
            const responseClone = fetchResponse.clone()
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
            return fetchResponse
          })
        })
        .catch(() => {
          // Fallback para imagens offline
          if (request.destination === 'image') {
            return caches.match('/icon-192.png')
          }
        })
    )
  } 
  // Network first para HTML e API calls
  else {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            if (response) {
              return response
            }
            // Fallback para páginas offline
            if (request.mode === 'navigate') {
              return caches.match('/')
            }
          })
        })
    )
  }
})

// Atualizar service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Sincronização em background para envio de reportes offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-reportes') {
    event.waitUntil(
      // Aqui seria implementada a lógica para enviar reportes salvos offline
      console.log('Sincronizando reportes em background')
    )
  }
})

// Notificações push (para atualizações de status dos reportes)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Atualização sobre seu reporte',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon-192.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Reporte Estradas', options)
  )
})

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/historico')
    )
  }
})

