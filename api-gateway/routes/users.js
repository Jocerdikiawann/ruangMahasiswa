var express = require("express");
var router = express.Router();
const userHandler = require("./handler/users");
const verifyToken = require("../middlewares/verifyToken");

/* GET users listing. */
router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.put("/", verifyToken, userHandler.update);

module.exports = router;
