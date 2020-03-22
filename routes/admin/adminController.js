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
  let result = {};
  Article.find({ isPrivate: false })
    .countDocuments()
    .then(count => {
      // console.log(count);
      // successCB(count);
      result.public = count;

      Article.find({ isPrivate: true })
        .countDocuments()
        .then(draftCount => {
          result.draft = draftCount;
          successCB(result);
        });
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
