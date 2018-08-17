# webpush-sample

> Sample project for Web Push

## Get Started
``` bash
# install dependencies
yarn

# serve (http://localhost:8080/)
yarn dev
```

## with FCM

### Prepare settings
* Replace `SENDER_ID` to firebase project sender id  
`public/fcm/manifest.json`
    ```
      "gcm_sender_id": "SENDER_ID"
    ```
* Set `FIREBASE_SERVER_KEY` to firebase project server key  
`.env`
    ```
    FIREBASE_SERVER_KEY=
    ```
* Open page for subscription `http://localhost:8080/fcm/`

### Send push notification
```
node cli/fcm.js <SUBSCRIPTION>
```

## with VAPID

### Prepare settings
* Generate VAPID public/private keys by CLI
    ```
    node cli/generate_vapid_keys.js
    ```
    output
    ```
    { publicKey: 'BKd2b...HkVaY',
      privateKey: 'ZfxWs...qV3rI' }
    ```
* Replace `VAPID_PUBLIC_KEY` to generated public key  
`public/vapid/app.js`
    ```
    const applicationServerPublicKey = "VAPID_PUBLIC_KEY"
    ```
* Set generated keys to `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`  
`.env`
    ```
    VAPID_PUBLIC_KEY=
    VAPID_PRIVATE_KEY=
    ```
* Open page for subscription `http://localhost:8080/vapid/`

### Send push notification
```
node cli/vapid.js <SUBSCRIPTION>
```

## with Firebase Cloud Messaging

### Prepare settings
* Replace `SENDER_ID` to firebase project sender id  
`public/firebase/app.js`
    ```
    firebase.initializeApp({
      messagingSenderId: 'SENDER_ID'
    })
    ```
    `public/firebase/sw.js`
    ```
    firebase.initializeApp({
      messagingSenderId: 'SENDER_ID'
    })
    ```
* Download service account key for Firebase Admin SDK from your project, put the file to project root, and rename `key.json`
* Open page for subscription `http://localhost:8080/firebase/`

### Send push notification
```
node cli/firebase.js <TOKEN>
```
