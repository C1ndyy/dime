const User = require("../models/user");

async function index(req, res) {
  try {
    let user = await User.findById(req.user.id);
    res.render("profile", {
      user: req.user,
      income: user.portfolio.income,
      savings: user.portfolio.monthlySavings,
      allPayments: user.portfolio.monthlyPayments,
    });
  } catch (err) {
    return res.send("there was an error");
  }
}

async function editProfile(req, res) {
  try {
    let user = await User.findById(req.user.id);
    user.portfolio.income = req.body.income;
    user.portfolio.monthlySavings =
      (req.body.monthlySavings / 100) * req.body.income;
    await user.save();
    res.redirect("/profile/");
  } catch (err) {
    return res.send("there was an error");
  }
}

async function createPayment(req, res) {
  try {
    let user = await User.findById(req.user.id);
    user.portfolio.monthlyPayments.push(req.body);
    await user.save();
    res.redirect("/profile/");
  } catch (err) {
    res.send("there was an error");
  }
}

module.exports = {
  index,
  edit: editProfile,
  create: createPayment,
};
