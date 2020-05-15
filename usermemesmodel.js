const mongoose = require("mongoose");
//const slugify = require('slugify');

const newusermemeSchema = new mongoose.Schema({
  photo: String,
  creatername: String,
  upname: String,
  likedid: {
    type: [String],
    
  },
});

const Newusermeme = mongoose.model("Usermeme", newusermemeSchema);
module.exports = Newusermeme;
