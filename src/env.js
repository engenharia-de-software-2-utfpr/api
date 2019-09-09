const fs = require('fs');

module.exports = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://0.0.0.0/riodocampolimpo',
  MONGODB_TESTING_URL:
    process.env.MONGODB_TESTING_URL
    || 'mongodb://0.0.0.0/riodocampolimpo-testing',
  FIREBASE_CONFIG:
    process.env.FIREBASE_CONFIG
    || fs.readFileSync('./secrets/firebaseAdminTesting.json'),
  STORAGE_BUCKET_URL:
    process.env.STORAGE_BUCKET_URL || 'riodocampolimpo-app-test.appspot.com',
};
