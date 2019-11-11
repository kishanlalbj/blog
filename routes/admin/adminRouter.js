const router = require("express").Router();
const Profile = require("../../models/Profile");

router.get("/dashboard", (req, res) => {
  try {
    res.send();
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
