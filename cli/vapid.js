require('dotenv').config()
const webPush = require('web-push')

// Genarete VAPID public/private keys by following command and set keys
// `node cli/generate_vapid_keys.js`
const publicKey = process.env.VAPID_PUBLIC_KEY
const privateKey = process.env.VAPID_PRIVATE_KEY

const [,, ...args] = process.argv
const [subscriptionString] = args

if (!subscriptionString) {
  console.error('Subscription not specified')
  process.exit(1)
}

const subscription = JSON.parse(subscriptionString)

const payload = 'Here is a payload with VAPID!'

const options = {
  vapidDetails: {
    subject: 'mailto:example_email@example.com',
    publicKey,
    privateKey
  },
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
