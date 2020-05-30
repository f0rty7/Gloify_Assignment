const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  image: String,
  created: { type: Date, default: Date.now() },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function( password ){
  retrun bcrypt.compareSync( password, this.password);
}

module.exports = mongoose.model("User", userSchema);
