const express = require("express");
// const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
var cors = require("cors");
const postRouter = require("./routes/articles/articleRouter");
const authRouter = require("./auth/auth");
const profileRouter = require("./routes/profiles/profileRouter");
const adminRouter = require("./routes/admin/adminRouter");
const helmet = require("helmet");
const path = require("path");
const gravatar = require("gravatar");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "http://www.gravatar.com"],
      styleSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://ssl.gstatic.com",
        "'unsafe-inline'",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://ssl.gstatic.com",
        "'unsafe-inline'",
      ],
    },
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

require("./auth/passport")(passport);

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Express serve up index.html file if it doesn't recognize route
}

app.use("/api/articles/", postRouter);
app.use("/api/admin/", adminRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth/", authRouter);
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build"));
});

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Express serve up index.html file if it doesn't recognize route
}

module.exports = app;
