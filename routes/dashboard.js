var express = require("express");
var router = express.Router();

let dashboardCtrl = require("../controllers/dashboard");

router.get("/", isLoggedIn, dashboardCtrl.index);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
