const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  image: String,
  description: String,
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Posts", postSchema);
