var express = require("express");
var router = express.Router();

let transactionsCtrl = require("../controllers/transactions");

router.get("/", transactionsCtrl.index);
router.get("/new", transactionsCtrl.new);

module.exports = router;
