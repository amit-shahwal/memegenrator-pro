const Meme = require("./mememodel");
const Usermemes = require("./usermemesmodel");

exports.getloginform = async (req, res) => {
  try {
    //  const tours = Tour.find();
    res.status(200).render("login", {
      title: "log in to your account",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.getsignupform = async (req, res) => {
  try {
    //  const tours = Tour.find();
    res.status(200).render("signup", {
      title: "log in to your account",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.viewoverview = async (req, res) => {
  try {
    const memes = await Meme.find();

    const count = memes.length;
    Meme.findRandom({}, {}, { limit: 50 }, function (err, result) {
      if (!err) {
        res.status(200).render("overview", {
          title: "All MEMES",
          memes: result,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.usermemes = async (req, res) => {
  try {
    //  const tours = Tour.find();
    const memes = await Usermemes.find();
  //  console.log(memes);
    res.status(200).render("usermemes", {
      title: "users memes",
      memes,
     
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.upload = async (req, res) => {
  try {
    //  const tours = Tour.find();
    //const memes= await Usermemes.find();
    res.status(200).render("account", {
      title: "users|memes",
      //memes
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.landing = async (req, res) => {
  try {
    //  const tours = Tour.find();
    res.status(200).render("landing", {
      title: "MEME | MAKERS",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.likessubmit = async (req, res) => {
  try {
   // console.log(req.body);
    var query = { photo: `${req.body.photo}` };
    const value = req.body.likes * 1 + 1;
    const ud = await Usermemes.findOneAndUpdate(
      query,
      { $set: { likes: value } },
      { new: true }
    );
    const memes = await Usermemes.find();
    res.status(200).render("usermemes", {
      title: "users memes",
      memes,
    });

    window.location = "/usermemes";
    //console.log(newuser);
    // createSendToken(newuser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
