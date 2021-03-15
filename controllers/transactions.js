const User = require("../models/user");

function index(req, res) {
  res.render("transactions/index", {
    user: req.user,
  });
}

function newTransaction(req, res) {
  res.render("transactions/new", {
    user: req.user,
  });
}

async function createTransaction(req, res) {
  try {
    let user = await User.findById(req.user.id);
    user.transactions.push(req.body);
    await user.save();
    res.redirect("/transactions/");
  } catch (err) {
    res.send("there was an error");
  }
}

module.exports = {
  index,
  new: newTransaction,
  create: createTransaction,
};
