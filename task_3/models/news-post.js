const mongoose = require("mongoose");

const NewsPostSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("NewsPosts", NewsPostSchema);
