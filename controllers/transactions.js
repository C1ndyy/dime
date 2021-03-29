const User = require("../models/user");

async function index(req, res) {
  try {
    let user = await User.findById(req.user.id);
    let transactions = user.transactions;
    let result = transactions;
    console.log(req.query);
    // filter by search parameter
    if (req.query.description) {
      result = result.filter((item) =>
        item.description.includes(req.query.description)
      );
    }
    // filter by category
    if (req.query.category && req.query.category !== "All Categories") {
      result = result.filter((item) =>
        item.category.includes(req.query.category)
      );
    }
    // sort results by date
    result.sort((a, b) => b.date - a.date);
    // render
    res.render("transactions/index", {
      user: req.user,
      allTransactions: result,
      query: req.query,
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

async function show(req, res) {
  console.log(req.user.id);
  console.log(req.params.transactionid);
  // let transaction = await User.findOne({
  //   _id: req.user.id,
  //   "transactions._id": req.params.transactionid,
  // });
  let user = await User.findById(req.user.id);
  let transaction = user.transactions.id(req.params.transactionid);

  console.log(transaction);

  res.render("transactions/edit", {
    user: req.user,
    transaction: transaction,
  });
}

async function edit(req, res) {
  try {
    let user = await User.findById(req.user.id);
    console.log(req.body);
    let transaction = user.transactions.id(req.params.transactionid);
    transaction.description = req.body.description;
    transaction.amount = req.body.amount;
    transaction.date = req.body.date;
    transaction.category = req.body.category;
    await user.save();
    res.redirect("/transactions/");
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
}

async function deleteTransaction(req, res) {
  try {
    let user = await User.findById(req.user.id);
    let transaction = user.transactions.id(req.params.transactionid);
    transaction.remove();
    await user.save();
    res.redirect("/transactions/");
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
}

module.exports = {
  index,
  new: newTransaction,
  create: createTransaction,
  show,
  edit,
  delete: deleteTransaction,
};
