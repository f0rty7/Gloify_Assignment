const router = require("express").Router();
const Comment = require("../models/comment");
const Post = require("../models/post");
const checkJwt = require("../middlewares/jwt");

router
  .route("/comments")
  .get((req, res) => {
    console.log(req.body);
    Comment.find({}, (err, comments) => {
      if (err) throw err;
      else {
        res.json({
          success: true,
          message: "All comments found",
          comments: comments,
        });
      }
    });
  })
  .post(checkJwt, async (req, res) => {
    console.log(req.body);
    let post = await Post.findById(req.body.postId);
    if (post) {
      let comment = new Comment();
      comment.title = req.body.title;
      comment.description = req.body.description;
      comment.save();
      post.comments.push(comment._id);
      post.save();
      res.json({
        success: true,
        message: "Saved comment successfully",
      });
    }
  });

router.put("/comments/:commentId/upvote", checkJwt, async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (comment) {
    comment.upvote((err, comment) => {
      if (err) throw err;
      else {
        if (comment) {
          res.json({
            success: true,
            message: "Comment upvoted !!!",
            comment: comment,
          });
        }
      }
    });
  }
});

router.put("/comments/:commentId/downvote", checkJwt, async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (comment) {
    comment.downvote((err, comment) => {
      if (err) throw err;
      else {
        if (comment) {
          res.json({
            success: true,
            message: "Comment downvoted !!!",
            comment: comment,
          });
        }
      }
    });
  }
});

module.exports = router;
