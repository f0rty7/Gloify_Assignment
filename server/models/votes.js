const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const votesSchema = new Schema({
  post: {type: Schema.Types.ObjectId, ref: "Posts"},
  comment: {type: Schema.Types.ObjectId, ref: "Comments"},
  upvote: { type: Number, default: 0},
  downvote: { type: Number, default: 0}
});

module.exports = mongoose.model("Votes", votesSchema);
