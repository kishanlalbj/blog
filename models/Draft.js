const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  articleTitle: {
    type: String
  },
  articleSubtitle: {
    type: String
  },
  articleCategory: {
    type: String
  },
  articleContent: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now()
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Draft = mongoose.model("draft", DraftSchema);
