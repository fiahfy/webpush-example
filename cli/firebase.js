const admin = require('firebase-admin')

const serviceAccount = require('../key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const [,, ...args] = process.argv
const [token] = args

if (!token) {
  console.error('Token not specified')
  process.exit(1)
}

// See documentation on defining a message payload.
const message = {
  data: {
    text: 'Here is a payload with Firebase!'
  },
  token
}

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response)
    process.exit(0)
  })
  .catch((error) => {
    console.log('Error sending message:', error)
    process.exit(0)
  })
