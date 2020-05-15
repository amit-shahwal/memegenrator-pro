const mongoose = require("mongoose");
//const slugify = require('slugify');
const random = require("mongoose-simple-random");

const memeSchema = new mongoose.Schema({
  name: String,
  url: String,
  
});
memeSchema.plugin(random);
const Meme = mongoose.model("Meme", memeSchema);
module.exports = Meme;
