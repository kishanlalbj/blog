const Article = require("../../models/Article");

const getArticles = (successCB, errorCB) => {
  Article.find().then(
    articles => {
      successCB(articles);
    },
    err => {
      errorCB(err);
    }
  );
};

const addArticle = (article, success, errorCB) => {
  let newarticle = new Article({ article });

  newarticle
    .save()
    .then(article => {
      successCB(article);
    })
    .catch(err => errorCB(err));
};

const deleteArticle = (articleId, successCB, errorCB) => {
  Expense.deleteOne({ _id: articleId })
    .then(article => {
      console.log("Deleted One", article);
      successCB(article);
    })
    .catch(err => {
      errorCB(err);
    });
};

const updateArticle = (articleId, successCB, errorCB) => {
  Expense.updateOne({ id: articleId })
    .then(article => {
      successCB(article);
    })
    .catch(err => {
      errorCB(err);
    });
};

module.exports = {
  getArticles,
  addArticle,
  deleteArticle,
  updateArticle
};
