var express = require("express");
var router = express.Router();

let goalsCtrl = require("../controllers/goals");

router.get("/", isLoggedIn, goalsCtrl.index);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
