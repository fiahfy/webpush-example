'use strict'

self.addEventListener('push', (e) => {
  console.log('[Service Worker] Push Received', e)

  const title = 'Push Title'
  const options = {
    body: e.data ? e.data.text() : 'Empty payload'
  }

  e.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('pushsubscriptionchange', (e) => {
  console.log('[Service Worker] Push Subscription is changed', e)
})

self.addEventListener('notificationclick', (e) => {
  console.log('[Service Worker] Notification  is clicked', e)
})
