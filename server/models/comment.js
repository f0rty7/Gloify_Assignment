const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Comments", commentSchema);
