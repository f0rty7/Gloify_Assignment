const router = require("express").Router();
const Post = require("../models/post");

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
  .post((req, res) => {
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

router.get("/posts/:id", (req, res) => {
  console.log(req.body);
  Post.findById({ _id: req.params.id })
    .populate("owner")
    .exec((err, post) => {
      if (err) {
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

module.exports = router;
