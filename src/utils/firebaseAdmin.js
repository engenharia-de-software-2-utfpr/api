const admin = require('firebase-admin');
const { FIREBASE_CONFIG, STORAGE_BUCKET_URL } = require('../env');

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(FIREBASE_CONFIG)),
  storageBucket: STORAGE_BUCKET_URL,
});
