const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config");

router.post("/signup", (req, res) => {
  console.log("user entered details \n", req.body);

  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.name = req.body.name;
  user.image = req.body.image;

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) throw err;
    if (existingUser) {
      res.json({
        success: false,
        message: "Account with entered email id already exists",
      });
    } else {
      User.addUser(user, (err, user) => {
        if (err) {
          res.json({ success: false, msg: "Failed to register user" });
        } else {
          res.json({ success: true, msg: "Successfully registered", user });
        }
      });
    }
  });
});

router.post("/signin", (req, res) => {
  console.log("user entered details \n", req.body);
  const password = req.body.password;

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: "Sign In error! User not found",
      });
    } else if (user) {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: "7d",
          });
          res.status(200).send({
            success: true,
            token: token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
            },
          });
        } else {
          return res.send({ success: false, msg: "Wrong Password" });
        }
      });
    }
  });
});

module.exports = router;
