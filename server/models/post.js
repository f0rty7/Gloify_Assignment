const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  image: String,
  description: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now() },
});

postSchema.methods.upvote = function (cb) {
  this.upvotes += 1;
  this.save(cb);
};

postSchema.methods.downvote = function (cb) {
  this.downvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model("Posts", postSchema);
