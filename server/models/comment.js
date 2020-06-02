const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  description: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  created: { type: Date, default: Date.now() },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Posts" },
});

commentSchema.methods.upvotes = function (cb) {
  this.upvotes += 1;
  this.save(cb);
};

commentSchema.methods.downvotes = function (cb) {
  this.downvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model("Comments", commentSchema);
