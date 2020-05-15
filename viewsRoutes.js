const express = require('express');
const viewcontroller = require('./viewController');
const authController=require('./authController')
const router = express.Router();


router.use(authController.isLoggedIn);
router.get('/memes',authController.isLoggedInn,  viewcontroller.viewoverview);
router.get('/login',authController.iflogin, viewcontroller.getloginform);
router.get('/signup',authController.iflogin, viewcontroller.getsignupform);
router.get('/usermemes',authController.isLoggedInn, viewcontroller.usermemes);
router.get('/upload',authController.isLoggedInn, viewcontroller.upload);
router.get('/',authController.iflogin,viewcontroller.landing);


module.exports = router;
