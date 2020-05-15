const multer = require("multer");
const sharp = require("sharp");

const Usermeme = require("./usermemesmodel");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.file.filename = `${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(800, 800)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.memeupload = async (req, res, next) => {
  try {
   // console.log(req.file);
    const filteredBody = filterObj(req.body);
    if (req.file) filteredBody.photo = req.file.filename;
    var x={creatername:req.user.name,photo:filteredBody.photo};
    //console.log(x);
    const newuser = await Usermeme.create(x);
    //console.log(newuser);
    res.status(200).json({
      status: "success",
    });

    //console.log(newuser);
    // createSendToken(newuser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.memelikess = async (req, res) => {
  try {
  //  console.log(req.body);
    var query = { photo: `${req.body.photo}` };
    const value = req.body.likes * 1 + 1;
    const ud = await Usermeme.findOneAndUpdate(
      query,
      { $set: { likes: value } },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: ud,
    });

    //console.log(newuser);
    // createSendToken(newuser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
