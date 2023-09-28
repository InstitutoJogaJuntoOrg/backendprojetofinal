const path = require("path");

const getEnvPath = () =>
  process.env.NODE_ENV.trim() == "dev"
    ? path.join(__dirname, "..", "..", "..", ".env.dev")
    : path.join(__dirname, "..", "..", "..", ".env.prod");

module.exports = getEnvPath;
