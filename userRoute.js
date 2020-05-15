const express = require("express");

const authController = require("./authController");
const memeController = require("./memeController");
const router = express.Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/signup", authController.signup);

router.post(
  "/memeupload",authController.protect,
  memeController.uploadUserPhoto,
  memeController.resizeUserPhoto,
  memeController.memeupload
);
router.post("/memelikes", memeController.memelikess);
router.post("/likedphoto", authController.protect, authController.photoliked);
module.exports = router;
