const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Posts", PostSchema);
