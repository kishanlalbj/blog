const router = require("express").Router();
const Profile = require("../../models/Profile");
const adminController = require("../admin/adminController");
router.get("/dashboard", (req, res) => {
  try {
    adminController.getArticlesCount(
      count => {
        // console.log(count);
        res.send({ totalArticles: count });
      },
      err => {
        console.log(err);
        throw err;
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/post/article", (req, res) => {
  try {
    res.send({ message: "article Posted" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
