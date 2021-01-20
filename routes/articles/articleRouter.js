const router = require("express").Router();
const articleController = require("./articleController");
const passport = require("passport");

router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    articleController.getArticles(
      (articles) => {
        results.results = articles.slice(startIndex, endIndex);

        if (endIndex < articles.length) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        }

        res.send(results);
      },
      (error) => {
        res.status(500).send({ message: "Internal Server Error" });
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get(
  "/drafts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};

      articleController.getDraftArticles(
        (articles) => {
          // console.log(
          //   "*******************",
          //   JSON.stringify(articles, undefined, 2)
          // );
          results.results = articles.slice(startIndex, endIndex);

          if (endIndex < articles.length) {
            results.next = {
              page: page + 1,
              limit: limit,
            };
          }

          if (startIndex > 0) {
            results.previous = {
              page: page - 1,
              limit: limit,
            };
          }

          // console.log(JSON.stringify(results, undefined, 2));
          res.send(results);
        },
        (error) => {
          res.status(500).send({ message: "Internal Server Error" });
        }
      );
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

router.get("/:id", (req, res) => {
  try {
    // console.log(req.params.id);
    articleController.getArticle(
      req.params.id,
      (article) => {
        res.send(article);
      },
      (error) => {
        throw error;
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("USER IDDDDDDDDDDDDDDDd");
    try {
      articleController.addArticle(
        req.body,
        (article) => {
          res.send(article);
        },
        (error) => {
          throw error;
        }
      );
    } catch (error) {
      res.status(500).send({ message: "Internal Status Error" });
    }
  }
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body);
    try {
      articleController.deleteArticle(
        req.body.id,
        (article) => {
          // console.log("DELETED", article);
          res.send(article);
        },
        (error) => {
          res.status(500).send({ message: "Internal Server error" });
        }
      );
    } catch (error) {
      res.status(500).send({ message: "Internal Server error" });
    }
  }
);

router.get(
  "/remove/draft/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      // console.log(JSON.stringify(req.params.id));
      // console.log(req.param.id);

      articleController.deleteDraft(
        req.params.id,
        (draft) => {
          res.send(draft);
        },
        (error) => {
          res.status(500).send({ message: "Internal Server error" });
        }
      );
    } catch (error) {
      res.status(500).send({ message: "Internal Server error" });
    }
  }
);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      articleController.updateArticle(
        req.body,
        (article) => {
          res.send(article);
        },
        (error) => {
          console.log(error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

router.post("/comment", (req, res) => {
  // console.log(req.body);
  try {
    articleController.postComment(
      req.body,
      (response) => {
        // console.log(response);
        res.send(response);
      },
      (error) => {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/comment/delete", (req, res) => {
  try {
    console.log(req.body);
    articleController.deleteComment(
      req.body.articleId,
      req.body.commentId,
      (comment) => {
        res.send(comment);
      },
      (error) => {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post(
  "/draft",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      // console.log("called");
      // console.log(JSON.stringify(req.body, undefined, 2));
      articleController.saveForLater(
        req.body,
        (article) => {
          res.send(article);
        },
        (error) => {
          console.log(error);
          res.status(500).send({ message: "Internal Server Error" });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
