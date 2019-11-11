const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
var cors = require("cors");
const postRouter = require("./routes/articles/articleRouter");
const authRouter = require("./auth/auth");
const profileRouter = require("./routes/profiles/profileRouter");

const app = express();

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static(path.join(__dirname, "uploads")));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

require("./auth/passport")(passport);

app.use("/api/articles/", postRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth/", authRouter);
module.exports = app;
