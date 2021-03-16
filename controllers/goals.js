const User = require("../models/user");

function index(req, res) {
  res.render("goals", {
    user: req.user,
  });
}

async function index(req, res) {
  try {
    let user = await User.findById(req.user.id);
    res.render("goals", {
      user: req.user,
      description: user.portfolio.goal.description,
      amount: user.portfolio.goal.amount,
      monthlyGoalPayments: user.portfolio.goal.monthlyGoalPayments,
    });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
}

async function editGoal(req, res) {
  try {
    console.log(req.body);
    let user = await User.findById(req.user.id);
    user.portfolio.goal.description = req.body.description;
    user.portfolio.goal.amount = req.body.amount;
    user.portfolio.goal.monthlyGoalPayments =
      (req.body.monthlyGoalPayments / 100) * req.body.amount;
    await user.save();
    res.redirect("/goals/");
  } catch (err) {
    return res.send("there was an error");
  }
}

module.exports = {
  index,
  edit: editGoal,
};
