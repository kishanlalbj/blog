const router = require("express").Router();
const profileController = require("./profileController");
const path = require("path");
const fs = require("fs");
var multer = require("multer");
const passport = require("passport");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(fs.existsSync(path.join(__dirname, "../../uploads")));
    fs.exists(path.join(__dirname, "../../uploads"), (exists) => {
      if (!exists) fs.mkdir(path.join(__dirname, "../../uploads"));
    });
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  fileFilter: function (req, file, cb) {
    if (
      path.extension(file.originalname) !== ".jpg" ||
      path.extension(file.originalname) !== ".jpeg"
    ) {
      return cb(new Error("Only jpg or jpeg files allowed"));
    }
    cb(null, true);
  },
  filename: function (req, file, cb) {
    cb(null, "avatar.png");
  },
});
var upload = multer({ storage: storage });

router.get(
  "/",

  (req, res) => {
    try {
      profileController.getProfile(
        (profile) => {
          res.send(profile);
        },
        (err) => {
          console.log(err);
          throw err;
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      profileController.updateProfile(
        req.body,
        (result) => {
          // console.log("Updated REstule", result);
          res.send(result);
        },
        (err) => {
          console.log("This is ", err);
          throw err;
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("profile"),
  (req, res) => {
    try {
      // console.log(req.body);

      res.send(req.file);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);
module.exports = router;
