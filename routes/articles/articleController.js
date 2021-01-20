const Article = require("../../models/Article");
const Draft = require("../../models/Draft");

const getArticles = (successCB, errorCB) => {
  Article.find({ isPrivate: false })
    .sort({ createdOn: -1 })
    .then(
      (articles) => {
        successCB(articles);
      },
      (err) => {
        errorCB(err);
      }
    );
};

const getDraftArticles = (successCB, errorCB) => {
  Article.find({ isPrivate: true })
    .sort({ createdOn: -1 })
    .then((drafts) => {
      console.log(JSON.stringify(drafts, undefined, 2));
      successCB(drafts);
    })
    .catch((err) => {
      errorCB(err);
    });
};

const getArticle = (id, successCB, errorCB) => {
  Article.findById({ _id: id })
    .then((article) => {
      // console.log(JSON.stringify(article, undefined, 2));
      successCB(article);
    })
    .catch((err) => {
      errorCB(err);
    });
};

const postComment = (comment, successCB, errorCB) => {
  // console.log(comment);
  Article.findOneAndUpdate(
    { _id: comment.id },
    {
      $push: {
        comments: {
          commenterName: comment.commenterName,
          commentText: comment.commentText,
        },
      },
    },
    { new: true }
  )
    .then((response) => {
      // console.log("new Comment", response);
      successCB(response);
    })
    .catch((err) => {
      errorCB(err);
    });
};

const addArticle = (article, successCB, errorCB) => {
  // console.log(JSON.stringify(article, undefined, 2));
  let newarticle = new Article(article);

  newarticle
    .save()
    .then((article) => {
      successCB(article);
    })
    .catch((err) => errorCB(err));
};

const deleteArticle = (articleId, successCB, errorCB) => {
  Article.deleteOne({ _id: articleId })
    .then((article) => {
      // console.log("Deleted One", article);
      successCB(article);
    })
    .catch((err) => {
      errorCB(err);
    });
};

const deleteDraft = (draftId, successCB, errorCB) => {
  Article.deleteOne({ _id: draftId })
    .then((draft) => {
      successCB(draft);
    })
    .catch((err) => {
      errorCB(err);
    });
};

const updateArticle = (article, successCB, errorCB) => {
  // console.log(article);
  Article.updateOne({ _id: article.id }, { $set: article }, { new: true })
    .then((article) => {
      successCB(article);
    })
    .catch((err) => {
      errorCB(err);
    });
};

const saveForLater = async (article, successCB, errorCB) => {
  try {
    let newarticle = new Draft(article);
    let response = await newarticle.save();
    successCB(response);
  } catch (error) {
    errorCB(error);
  }
};

const deleteComment = async (articleId, commentId, successCB, errorCB) => {
  console.log(articleId, commentId);
  try {
    let comment = await Article.findByIdAndUpdate(
      articleId,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    );
    console.log(comment);
    successCB(comment);
  } catch (error) {
    errorCB(error);
  }
};

const addReply = async (articleId, commentId, reply, successCB, errorCB) => {
  let replyResp = await Article.findOneAndUpdate(
    {
      _id: articleId,
      "comments._id": commentId,
    },
    {
      $push: { "comments.$.replies": reply },
    },
    { new: true }
  );

  successCB(replyResp);
};

module.exports = {
  getArticles,
  addArticle,
  deleteArticle,
  updateArticle,
  postComment,
  deleteComment,
  addReply,
  getArticle,
  getDraftArticles,
  saveForLater,
  deleteDraft,
};
