const router = require("express").Router();
const Profile = require("../../models/Profile");
const adminController = require("../admin/adminController");
const passport = require("passport");

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      adminController.getArticlesCount(
        (response) => {
          // console.log(count);
          res.send(response);
        },
        (err) => {
          console.log(err);
          throw err;
        }
      );
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/post/article",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      res.send({ message: "article Posted" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
