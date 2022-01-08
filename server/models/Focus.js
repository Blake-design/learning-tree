const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const focusSchema = new Schema({
//   createdBy: {
//     type: String,
//     required: true,
//     trim: true,
//   },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  sparks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Spark',
    },
  ],
});

const Focus = model('Focus', focusSchema);

module.exports = Focus;
