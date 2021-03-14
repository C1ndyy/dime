function index(req, res) {
  console.log(req.user);
  res.render("dashboard", {
    user: req.user,
  });
}

module.exports = {
  index,
};
