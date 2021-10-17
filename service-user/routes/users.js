var express = require("express");
var router = express.Router();
const userHandler = require("./handler/users");

router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.post("/logout", userHandler.logout);
router.put("/:id", userHandler.update);
router.get("/:id", userHandler.getUser);
router.get("/", userHandler.getUsers);
module.exports = router;
