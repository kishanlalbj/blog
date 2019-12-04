const User = require("../../models/User");

const getProfile = (successCB, errorCB) => {
  User.find()
    .then(profile => {
      successCB(profile);
    })
    .catch(err => {
      errorCB(err);
    });
};

const updateProfile = (profile, successCB, errorCB) => {
  // console.log(profile);
  User.findOneAndUpdate(
    { _id: profile.id },
    { $set: profile },
    { new: true, useFindAndModify: false }
  )
    .then(response => {
      // console.log(response);
      successCB(response);
    })
    .catch(err => {
      errorCB(err);
    });
};

// const uploadAvatar = (profile_path, successCB, errorCB) => {
//   User.findOneAndUpdate({  });
// };
module.exports = {
  getProfile,
  updateProfile
};
