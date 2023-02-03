const express = require("express");
const router = express.Router();
const homecontroller = require("../controllers/home_controller");
const usersController = require("../controllers/users_controller");

console.log("router is running");
router.get('/', homecontroller.home);
router.use("/users", require('./users'));
router.use("/notes", require('./notes'));

module.exports = router;