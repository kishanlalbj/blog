const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const postRouter = require("./routes/articles/articleRouter");
const authRouter = require("./auth/auth");

const app = express();

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require("./auth/passport")(passport);

app.use("/api/posts/", postRouter);
app.use("/api/auth/", authRouter);
module.exports = app;
