var express = require("express");
var router = express.Router();

let goalsCtrl = require("../controllers/goals");

router.get("/", goalsCtrl.index);

module.exports = router;
