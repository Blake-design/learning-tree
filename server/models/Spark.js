const { Schema, model } = require("mongoose");
// const dateFormat = require('../utils/dateFormat');

const sparkSchema = new Schema({
  userName: {
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
  },
  sparks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Spark",
    },
  ],
});

const Spark = model("Spark", sparkSchema);

module.exports = Spark;
