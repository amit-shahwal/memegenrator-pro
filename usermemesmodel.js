const mongoose = require("mongoose");
//const slugify = require('slugify');

const usermemeSchema = new mongoose.Schema({
  photo: String,
  likes: {
    type: Number,
    default: 0,
  },
  likedid: [
    {
      type: String,
      unique: true,
    },
  ],
  creatername: String,
});

const Usermeme = mongoose.model("Usermeme", usermemeSchema);
module.exports = Usermeme;
