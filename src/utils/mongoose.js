const mongoose = require('mongoose');
const { MONGODB_URL } = require('../env');

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

module.exports = mongoose;
