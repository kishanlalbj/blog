const Article = require("../../models/Article");

const getArticles = (successCB, errorCB) => {
  Article.find()
    .sort({ createdOn: -1 })
    .then(
      articles => {
        successCB(articles);
      },
      err => {
        errorCB(err);
      }
    );
};

const getArticle = (id, successCB, errorCB) => {
  Article.findById({ _id: id })
    .then(article => {
      console.log(JSON.stringify(article, undefined, 2));
      successCB(article);
    })
    .catch(err => {
      errorCB(err);
    });
};

const postComment = (comment, successCB, errorCB) => {
  console.log(comment);
  Article.findOneAndUpdate(
    { _id: comment.id },
    {
      $push: {
        comments: {
          commenterName: comment.commenterName,
          commentText: comment.commentText
        }
      }
    }
  )
    .then(response => {
      console.log(response);
      successCB(comment);
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
  Article.deleteOne({ _id: articleId })
    .then(article => {
      console.log("Deleted One", article);
      successCB(article);
    })
    .catch(err => {
      errorCB(err);
    });
};

const updateArticle = (article, successCB, errorCB) => {
  console.log(article);
  Article.updateOne({ _id: article.id }, { $set: article }, { new: true })
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
  postComment,
  getArticle
};
