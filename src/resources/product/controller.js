const { jwtValidator, fileHandler } = require("../../middlewares");
const productService = require("./service.js");

module.exports = (app) => {
  app.get("/", jwtValidator, productService.getProducts);

  app.post(
    "/",
    fileHandler.single("image"),
    jwtValidator,
    productService.addProduct
  );

  app.delete("/:id", productService.deleteProduct);
};
