var express = require("express");
var router = express.Router();

let dashboardCtrl = require("../controllers/dashboard");

router.get("/", dashboardCtrl.index);

module.exports = router;
