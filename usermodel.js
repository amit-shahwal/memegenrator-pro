const mongoose = require("mongoose");
//const slugify = require('slugify');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "EMAIL NOT CORRECT"],
  },

  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password doesnot match",
    },
  },
  photoliked: [String],
  passwordresettoken: String,
  tokenexpiresin: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  //if password is not modified just updating email then this
  // document middleware shoud not work
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  // not to save in database and just present in schema
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.correctPasswword = async function (
  candidatepassword,
  userpassword
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};

userSchema.methods.createpasswordresettoken = function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordresettoken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.tokenexpiresin = Date.now() + 10 * 60 * 1000;
  return resettoken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
