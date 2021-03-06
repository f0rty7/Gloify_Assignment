const router = require("express").Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const checkJwt = require("../middlewares/jwt");

router
  .route("/posts")
  .get((req, res) => {
    console.log(req.body);
    Post.find({}, (err, posts) => {
      if (err) throw err;
      else {
        res.json({
          success: true,
          message: "Succesfully got all the posts",
          posts: posts,
        });
      }
    });
  })
  .post(checkJwt, (req, res) => {
    console.log(req.body);
    let post = new Post();
    post.title = req.body.title;
    post.image = req.body.image;
    post.description = req.body.description;
    post.save();
    res.json({
      success: true,
      message: "Successfully saved the post",
    });
  });

router.get("/posts/:postId", (req, res) => {
  console.log(req.body);
  Post.findById({ _id: req.params.postId })
    .populate("owner")
    .populate("comments")
    .exec((err, post) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: "Post with id not found",
        });
      } else {
        if (post) {
          res.json({
            success: true,
            message: "Successfully got post with selected id",
            post: post,
          });
        }
      }
    });
});

router.get("/posts",checkJwt, (req,res) => {
  console.log("Req decoded\n", req.decoded);
  Post.findOne({_id: req.decoded._id}, (err,posts) => {
    res.json({
      success: true,
      message: "Successfully gathered all posts",
      posts: posts
    });
  });
});

router.put("/posts/:postId/upvote", checkJwt, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post) {
    post.upvote((err, post) => {
      if (err) throw err;
      else {
        if (post) {
          res.json({
            success: true,
            message: "Post upvoted !!!",
            post: post,
          });
        }
      }
    });
  }
});

router.put("/posts/:postId/downvote", checkJwt, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post) {
    post.downvote((err, post) => {
      if (err) throw err;
      else {
        if (post) {
          res.json({
            success: true,
            message: "Post downvoted !!!",
            post: post,
          });
        }
      }
    });
  }
});

module.exports = router;
