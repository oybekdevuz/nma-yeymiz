const { Schema, model } = require("mongoose");

const scheme = new Schema({
  telegramId: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  username: {
    type: String,
  },
  foods: {
    type: Array,
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  created_at: {
    type: Number,
    default: () => Date.now(),
    required: false,
  }
})

module.exports = model('user', scheme)