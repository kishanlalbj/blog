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
const adminRouter = require("./routes/admin/adminRouter");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const app = express();
console.log(process.env.NODE_ENV, process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(response => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build"));
  });
}

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

require("./auth/passport")(passport);

app.use("/api/articles/", postRouter);
app.use("/api/admin/", adminRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth/", authRouter);
module.exports = app;
