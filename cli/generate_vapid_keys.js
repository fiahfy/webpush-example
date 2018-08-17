const webPush = require('web-push')

const vapidKeys = webPush.generateVAPIDKeys()

const keys = {
  publicKey: vapidKeys.publicKey,
  privateKey: vapidKeys.privateKey,
}

console.log(keys)
