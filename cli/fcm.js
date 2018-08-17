require('dotenv').config()
const webPush = require('web-push')

const gcmAPIKey = process.env.FIREBASE_SERVER_KEY

const [,, ...args] = process.argv
const [subscriptionString] = args

if (!subscriptionString) {
  console.error('Subscription not specified')
  process.exit(1)
}

const subscription = JSON.parse(subscriptionString)

const payload = 'Here is a payload with FCM!'

const options = {
  gcmAPIKey,
  TTL: 60
}

webPush.sendNotification(
  subscription,
  payload,
  options
)
  .then((result) => {
    console.log('Notification sended', result)
  })
  .catch((e) => {
    console.error('Send notification failed', e)
  })

