const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./usermodel");
const Meme = require("./mememodel");
const Usermeme = require("./usermemesmodel");
const viewcontroller = require("./viewController");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPPIRES,
  });
};

const createSendToken = (user, statuscode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COKKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
   
    
  };
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statuscode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // eslint-disable-next-line no-throw-literal
      throw new Error("email & password both should be present");
      // throw;
    }
    const user = await User.findOne({ email }).select("+password");
    // console.log(u);
    // const correct = ;
    if (!user || !(await user.correctPasswword(password, user.password))) {
      throw new Error("wrong id or  password");
    }
    createSendToken(user, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization ||
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    else {
    token = req.cookies.jwt;
    }
    if (!(await jwt.verify(token, process.env.JWT_SECRET))) {
      throw new Error("you are not logged in to see this things");
    }
    //verification of token
    // console.log(await jwt.verify(token, process.env.JWT_SECRET));
    const freshuser = await jwt.verify(token, process.env.JWT_SECRET);

    const freshexist = await User.findById(freshuser.id);
    // if(freshuser.id)
    if (!freshexist) {
      throw new Error("ivalid web token");
    }
    req.user = freshexist;
    // console.log(req.user.role);
    next();
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
//only for rendered pages so no errors
exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else return next();
    if (!(await jwt.verify(token, process.env.JWT_SECRET))) {
      return next();
    }
    //verification of token
    // console.log(await jwt.verify(token, process.env.JWT_SECRET));
    const freshuser = await jwt.verify(token, process.env.JWT_SECRET);

    const freshexist = await User.findById(freshuser.id);
    // if(freshuser.id)
    if (!freshexist) {
      return next();
      // throw new Error("ivalid web token");
    }
    //req.user = freshexist;
    //useee hai to header change hoga
    res.locals.useer = freshexist;
    // console.log(req.user.role);
    // console.log(freshexist);
    //console.log(res.locals.useer);
    return next();
  } catch (err) {
    return next();
  }
};
exports.isLoggedInn = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else
      return res.status(200).render("login", {
        title: "log in to your account",
      });
    if (!(await jwt.verify(token, process.env.JWT_SECRET))) {
      return res.status(200).render("login", {
        title: "log in to your account",
      });
    }
    //verification of token
    // console.log(await jwt.verify(token, process.env.JWT_SECRET));
    const freshuser = await jwt.verify(token, process.env.JWT_SECRET);

    const freshexist = await User.findById(freshuser.id);
    // if(freshuser.id)
    if (!freshexist) {
      return res.status(200).render("login", {
        title: "log in to your account",
      });
      // throw new Error("ivalid web token");
    }
    //req.user = freshexist;
    // const memes = await Meme.find();
    // const count = memes.length;
    // return Meme.findRandom({}, {}, { limit: 50 }, function (err, result) {
    //   if (!err) {

    //     res.status(200).render("overview", {
    //       title: "All MEMES",
    //       memes:result,
    //     });
    //   }
    // });
    next();
  } catch (err) {
    return res.status(200).render("login", {
      title: "log in to your account",
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const newuser = await User.create(req.body);
    //console.log(newuser);
    createSendToken(newuser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.iflogin = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) 
    {//console.log("1");
    return next();
    }
    if (!(await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET))) {
      // console.log("2");
      return next();
    }
    //verification of req.cookies.jwt
    // console.log(await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET));
    const freshuser = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    const freshexist = await User.findById(freshuser.id);
    // if(freshuser.id)
    if (!freshexist) {
      //console.log("3");
      return next();

    }
    //for some reason window.location not working
    ///console.log(window.location.pathname);
    const memes = await Usermeme.find();
    //  console.log(memes);
    return res.status(200).render("usermemes", {
      title: "users memes",
      memes,
    });
    //  location.replace("/memes");
  } catch (err) {
   // console.log(err);
    return next();
  }
};

exports.photoliked = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(`${req.body.liked}`);
    const check = await Usermeme.find(
      { photo: req.body.photo },
      { likedid: req.body.likedid }
    );

    // console.log(check[0].likedid[0]);
    if (check[0].likedid[0] == req.body.likedid) {
      throw new Error("already exist");
    } else {
      const newuser = await Usermeme.findOneAndUpdate(
        { photo: req.body.photo },

        {
          $push: { likedid: req.body.likedid },
        },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        newuser,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
