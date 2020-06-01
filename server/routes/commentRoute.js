const router = require("express").Router();
const Comment = require("../models/comment");

router.route("/comments")
.get((req, res) =>{
  console.log(req.body);
  Comment.find({},(err, comments) =>{
    if(err) throw err;
    else{
      res.json({
        success: true,
        message: "All comments found",
        comments: comments
      });
    }
  });
})
.post((req, res) =>{
  console.log(req.body);
  let comment = new Comment();
  comment.title = req.body.title;
  comment.description = req.body.description;
  comment.save();
  res.json({
    success: true,
    message: "Saved comment successfully"
  });
});

module.exports = router;
