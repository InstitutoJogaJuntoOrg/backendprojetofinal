const authService = require("./service.js");

module.exports = (app) => {
  app.post("/login", authService.Login);

  app.post("/register", authService.Register);
};
