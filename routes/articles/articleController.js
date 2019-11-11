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

getArticle = (id, successCB, errorCB) => {
  Article.findById({ _id: id })
    .then(article => {
      console.log(JSON.stringify(article, undefined, 2));
      successCB(article);
    })
    .catch(err => {
      errorCB(err);
    });
};

const addArticle = (article, successCB, errorCB) => {
  console.log(JSON.stringify(article, undefined, 2));
  let newarticle = new Article(article);

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
  updateArticle,
  getArticle
};
