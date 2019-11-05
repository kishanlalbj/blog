const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ mesage: "Email already registered..." });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            return res.status(400).json({ message: "Unable to add user" });
          }

          let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hash
          });

          newUser
            .save()
            .then(user => {
              res.send(user);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ message: "Internal Server Error" });
            });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: "Email is not registered" });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const payload = {
            id: user._id,
            name: user.email
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 2000 },
            (err, token) => {
              if (err) throw err;
              res.json({ success: true, token });
            }
          );
        } else {
          res.status(400).json({ message: "Password Incorrect" });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logout();
    res.send("success");
  }
);

router.get(
  "/isAuthenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("authenticated");
  }
);
module.exports = router;
