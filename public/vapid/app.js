'use strict'

const applicationServerPublicKey = 'VAPID_PUBLIC_KEY'

const button = document.querySelector('button')
const info = document.querySelector('div')

let registration, subscribed

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const initView = () => {
  button.addEventListener('click', onClick)

  registration.pushManager.getSubscription()
    .then(((subscription) => {
      subscribed = !(subscription === null)
      if (subscribed) {
        console.info('User is subscribed', subscription)
      } else {
        console.info('User is NOT subscribed')
      }
      updateSubscriptionOnServer(subscription)
      updateButton()
    }))
}

const updateButton = () => {
  if (Notification.permission === 'denied') {
    button.textContent = 'Push Messaging Blocked'
    button.disabled = true
    updateSubscriptionOnServer(null)
    return
  }
  button.textContent = subscribed ? 'Disable Push Messaging' : 'Enable Push Messaging'
  button.disabled = false
}

const onClick = () => {
  button.disabled = true
  if (subscribed) {
    unsubscribe()
  } else {
    subscribe()
  }
}

const subscribe = () => {
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
  })
    .then((subscription) => {
      console.info('User is subscribed', subscription)
      updateSubscriptionOnServer(subscription)
      subscribed = true
      updateButton()
    })
    .catch((e) => {
      console.error('Failed to subscribe the user', e)
      updateButton()
    })
}

const unsubscribe = () => {
  registration.pushManager.getSubscription()
    .then((subscription) => {
      if (subscription) {
        return subscription.unsubscribe()
      }
    })
    .then((successful) => {
      console.info('User is unsubscribed', successful)
      updateSubscriptionOnServer(null)
      subscribed = false
      updateButton()
    })
    .catch((e) => {
      console.error('Failed to unsubscribe the user', e)
      updateButton()
    })
}

const updateSubscriptionOnServer = (subscription) => {
  // TODO: Send subscription to application server
  if (subscription) {
    info.querySelector('#subscription').textContent = JSON.stringify(subscription)
    info.querySelector('#cmd').textContent = `node cli/vapid.js '${JSON.stringify(subscription)}'`
    info.style.display = 'block'
  } else {
    info.style.display = 'none'
  }
}

(() => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push messaging is not supported')
    return
  }

  navigator.serviceWorker.register('sw.js')
    .then((reg) => {
      console.info('ServiceWorker is registered', reg)
      registration = reg
      initView()
    })
    .catch((e) => {
      console.error('ServiceWorker registation failed', e)
    })
})()
