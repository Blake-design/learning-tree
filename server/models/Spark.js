const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const sparkSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  }
});

const Spark = model('Spark', sparkSchema);

module.exports = Spark;
