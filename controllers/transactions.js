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

module.exports = {
  index,
  new: newTransaction,
};
