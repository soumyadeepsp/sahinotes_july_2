const express = require("express");
const router = express.Router();
var usersController = require("../controllers/users_controller");
console.log(usersController);
const passport = require("passport");

router.get("/profile", usersController.profile);
router.get("/signin", usersController.signin);
router.get("/signup", usersController.signup);
router.post("/create", usersController.create);
router.post('/create_session', passport.authenticate('local', {failureRedirect: '/users/signin'}), usersController.createSession);

module.exports = router;