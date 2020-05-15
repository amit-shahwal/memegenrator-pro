/* eslint-disable no-console */
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

const Meme = require(`./mememodel`);

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    // eslint-disable-next-line no-console
    //   console.log('success');
  });
const memes = JSON.parse(
  fs.readFileSync(`./memes.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Meme.create(memes);
    //console.log(`successful`);
  } catch (err) {
   // console.log(err);
  }
  process.exit(); 
  
};
const deleteData = async () => {
  try {
    await Meme.deleteMany();
  //  console.log(`successful`);
  } catch (err) {
   // console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
