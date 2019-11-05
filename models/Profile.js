const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  profilePicture: {
    type: String,
    default: "....defaulr.png"
  }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
