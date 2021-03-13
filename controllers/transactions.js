function index(req, res) {
  res.render("transactions/index");
}

function newTransaction(req, res) {
  res.render("transactions/new");
}

module.exports = {
  index,
  new: newTransaction,
};
