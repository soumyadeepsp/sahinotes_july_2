const express = require("express");
const router = express.Router();
var usersController = require("../controllers/users_controller");
console.log(usersController);
const passport = require("passport");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/signin", usersController.signin);
router.get("/signup", usersController.signup);
router.post("/create", usersController.create);
router.post('/create_session', passport.authenticate('local', {failureRedirect: '/users/signin'}), usersController.createSession);
router.get('/logout', usersController.logout);
router.get('/verify_mobile', usersController.verifyMobile);
router.get('/sendotp/:mobile_number', usersController.sendOtp);
router.post('/validate_otp', usersController.validateOtp);

//this is used to send request to google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

//this is used to get response from google
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), usersController.createSession);

module.exports = router;