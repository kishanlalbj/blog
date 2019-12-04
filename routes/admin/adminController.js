const Article = require("../../models/Article");

const getDashboardDetails = (successCB, errorCB) => {
  Article.find()
    .then(articles => {
      successCB(articles);
    })
    .catch(err => {
      errorCB(err);
    });
};

const getArticlesCount = (successCB, errorCB) => {
  Article.find()
    .countDocuments()
    .then(count => {
      console.log(count);
      successCB(count);
    })
    .catch(err => {
      console.log(err);
      errorCB(err);
    });
};

module.exports = {
  getDashboardDetails,
  getArticlesCount
};
