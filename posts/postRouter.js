const router = require("express").Router();

router.post("/add", (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    res.status(500).send({ error: "Service Unavailable" });
  }
});

router.get("/", (req, res) => {
  try {
    res.send({ name: "Post" });
  } catch (error) {
    res.status(500).send({ error: "Service Unavailable" });
  }
});

router.get("/delete", (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({ error: "Service Unavailable" });
  }
});

module.exports = router;
