function index(req, res) {
  res.render("goals", {
    user: req.user,
  });
}

module.exports = {
  index,
};
