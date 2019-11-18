if (process.env.NODE_ENV === "production") {
  console.log("USING PROD");
  module.exports = require("./dev-keys");
} else {
  console.log("USING DEV");
  module.exports = require("./dev-keys");
}
