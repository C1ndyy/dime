function index(req, res) {
  res.render("profile", {
    user: req.user,
  });
}

module.exports = {
  index,
};
