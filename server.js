require("dotenv").config(); //<------Oauth
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session"); //<------Oauth
var passport = require("passport"); //<------Oauth
const MongoDBStore = require("connect-mongodb-session")(session); //<-------Session - stay logged in
var methodOverride = require("method-override"); //<------Method Override
require("./config/database"); //<-----Database
require("./config/passport"); //<------Oauth

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dashboardRouter = require("./routes/dashboard");
var transactionsRouter = require("./routes/transactions");
var profileRouter = require("./routes/profile");
var goalsRouter = require("./routes/goals");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//------Oauth---------//
app.use(
  session({
    secret: "SEIRocks!",
    resave: false,
    saveUninitialized: true,
    store: MongoDBStore({
      collection: "sessions",
      uri: process.env.DATABASE_URL,
      databaseName: "dime",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
//<------Oauth---------//
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); //<------Method Override

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/transactions", transactionsRouter);
app.use("/profile", profileRouter);
app.use("/goals", goalsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
