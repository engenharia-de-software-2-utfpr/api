const mongoose = require('mongoose');
const { MONGODB_TESTING_URL } = require('../env');


global.beforeAll(() => {
  mongoose.connect(MONGODB_TESTING_URL, { useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
});

global.beforeEach(() => {
  mongoose.connection.dropDatabase();
});

global.afterAll(async () => {
  await mongoose.connection.dropDatabase();
  mongoose.disconnect();
});
