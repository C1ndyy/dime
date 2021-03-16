function index(req, res) {
  res.render("dashboard", {
    user: req.user,
  });
}

module.exports = {
  index,
};
