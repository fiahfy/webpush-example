'use strict'

// Initialize Firebase
firebase.initializeApp({
  messagingSenderId: 'SENDER_ID'
})

const messaging = firebase.messaging()

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((e) => {
  console.log('Message received. ', e)

  const title = 'Push Title (forground)'
  const options = {
    body: e.data.text
  }

  new Notification(title, options)
})

const button = document.querySelector('button')
const info = document.querySelector('div')

let subscribed

const initView = () => {
  messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.')
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
      messaging.getToken()
        .then((currentToken) => {
          if (currentToken) {
            sendTokenToServer(currentToken)
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.')
            // Show permission UI.
            sendTokenToServer(false)
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err)
          showToken('Error retrieving Instance ID token. ', err)
          sendTokenToServer(false)
        })
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err)
    })
}

const sendTokenToServer = (token) => {
  // TODO: Send token to application server
  if (token) {
    info.querySelector('#token').textContent = token
    info.querySelector('#cmd').textContent = `node cli/firebase.js '${token}'`
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
      messaging.useServiceWorker(reg)
      initView()
    })
    .catch((e) => {
      console.error('ServiceWorker registation failed', e)
    })
})()
