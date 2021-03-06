const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  articleTitle: {
    type: String,
    required: true,
  },
  articleSubtitle: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: false,
  },
  articleCategory: {
    type: String,
    required: true,
  },
  articleContent: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      commenterName: {
        type: String,
        required: true,
      },
      commentText: {
        type: String,
        required: true,
      },
      createdOn: {
        type: Date,
        default: Date.now(),
      },
      approved: {
        type: Boolean,
        default: false,
      },
      replies: [
        {
          name: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          createdOn: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
  ],
  visits: {
    type: Number,
    default: 0,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = Article = mongoose.model("Post", ArticleSchema);
