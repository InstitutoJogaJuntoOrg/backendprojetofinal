const authRoutes = require("./resources/auth/controller");
const productRoutes = require("./resources/product/controller");

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.json({ message: "Api is up and running!" })
  );

  authRoutes(app);
  productRoutes(app);
};
