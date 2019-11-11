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

module.exports = {
  getDashboardDetails
};
