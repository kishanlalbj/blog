const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      commenterName: {
        type: String,
        required: true
      },
      commentText: {
        type: String,
        required: true
      },
      createdOn: {
        type: String,
        required: true
      }
    }
  ],
  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Article = mongoose.model("Post", ArticleSchema);
