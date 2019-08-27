const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  description: {
    type: Schema.Types.String,
    default: '',
    maxlength: 1000,
  },
});

module.exports = mongoose.model('Report', schema);
