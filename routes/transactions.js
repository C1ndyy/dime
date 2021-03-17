var express = require("express");
var router = express.Router();

let transactionsCtrl = require("../controllers/transactions");

router.get("/", isLoggedIn, transactionsCtrl.index);
router.get("/new", isLoggedIn, transactionsCtrl.new);
router.post("/", isLoggedIn, transactionsCtrl.create);
router.get("/:transactionid", isLoggedIn, transactionsCtrl.show);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
