module.exports = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://0.0.0.0/riodocampolimpo',
  MONGODB_TESTING_URL: process.env.MONGODB_TESTING_URL || 'mongodb://0.0.0.0/riodocampolimpo-testing',
};
