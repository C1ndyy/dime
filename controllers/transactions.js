const User = require("../models/user");

async function index(req, res) {
  try {
    let user = await User.findById(req.user.id);
    res.render("transactions/index", {
      user: req.user,
      allTransactions: user.transactions,
    });
  } catch (err) {
    return res.send("there was an error");
  }
}

function newTransaction(req, res) {
  dt = new Date().toISOString().slice(0, 10);
  res.render("transactions/new", {
    user: req.user,
    dt: dt,
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
