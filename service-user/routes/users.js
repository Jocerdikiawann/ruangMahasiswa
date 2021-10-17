var express = require("express");
var router = express.Router();
const userHandler = require("./handler/users");

router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.put("/:id", userHandler.update);
router.get("/:id", userHandler.getUser);

module.exports = router;
