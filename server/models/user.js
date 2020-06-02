const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  image: String,
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", userSchema);


module.exports.addUser = (newUser, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

module.exports.comparePassword = function (userPassword, hash, cb) {
  bcrypt.compare(userPassword, hash, (err, isMatch) => {
    if (err) throw err;
    cb(null, isMatch);
  });
};

