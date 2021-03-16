var express = require("express");
var router = express.Router();

let profileCtrl = require("../controllers/profile");

router.get("/", isLoggedIn, profileCtrl.index);
router.put("/", isLoggedIn, profileCtrl.edit);
router.post("/recurringPayments", isLoggedIn, profileCtrl.create);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
