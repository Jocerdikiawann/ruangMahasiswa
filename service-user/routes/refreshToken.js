var express = require("express");
var router = express.Router();

const refreshTokenHandler = require("./handler/refreshToken");

router.post("/", refreshTokenHandler.create);

module.exports = router;
