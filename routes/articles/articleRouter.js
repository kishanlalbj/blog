const router = require("express").Router();
const articleController = require("./articleController");

router.get("/", (req, res) => {
  try {
    articleController.getArticles(
      result => {
        res.send(result);
      },
      error => {
        throw error;
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/add", (req, res) => {
  try {
    articleController.addArticle(
      req.body,
      article => {
        res.send(article);
      },
      error => {
        throw error;
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Status Error" });
  }
});

router.delete("/delete", (req, res) => {
  console.log(req.body);
  try {
    articleController.deleteArticle(
      req.body.id,
      article => {
        console.log("DELETED", article);
        res.send(article);
      },
      error => {
        throw error;
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Server error" });
  }
});

router.patch("/update", (req, res) => {
  try {
    articleController.updateArticle(
      req.body.id,
      article => {
        res.send(article);
      },
      error => {
        throw error;
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
