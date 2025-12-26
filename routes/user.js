const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");

//sign-up
router
.route("/signup")
.get(userController.renderSignUpForm)  //get request for taking user info signup    ------  GET Request
.post(userController.signUp );  //how that request is saved in db   -----  POST Request
 
//login infos
router
.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate
    ("local", { failureRedirect: '/login',failureFlash:true }),
    userController.logIn);

//logout routes
router.get("/logout",userController.logOut);

module.exports=router;