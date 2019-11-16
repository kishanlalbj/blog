const router = require("express").Router();
const articleController = require("./articleController");

router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    articleController.getArticles(
      articles => {
        results.results = articles.slice(startIndex, endIndex);

        if (endIndex < articles.length) {
          results.next = {
            page: page + 1,
            limit: limit
          };
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          };
        }
        res.send(results);
      },
      error => {
        throw error;
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    console.log(req.params.id);
    articleController.getArticle(
      req.params.id,
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

router.post("/delete", (req, res) => {
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

router.post("/update", (req, res) => {
  try {
    articleController.updateArticle(
      req.body,
      article => {
        res.send(article);
      },
      error => {
        throw error;
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
