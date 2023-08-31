const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

class Server {
  app;

  constructor() {
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
    this.loadDbConnection();
    this.loadSwagger();
  }

  loadMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  async loadRoutes() {
    await require("./router")(this.app);
  }

  async loadDbConnection() {
    const dbInstance = await require("./config").Database();

    try {
      dbInstance.connect();
      console.log("Sucefully connected to database");
    } catch (e) {
      console.error("Error in connecting to database: ", e.message);
    }
  }

  async loadSwagger() {
    const path = await require("path");
    const fs = await require("fs");
    const yaml = await require("yaml");
    const swaggerUi = await require("swagger-ui-express");

    const swaggerDocPath = path.resolve(__dirname, "..", "swagger.yaml");
    const swaggerDocFile = fs.readFileSync(swaggerDocPath, "utf8");
    const swaggerDocument = yaml.parse(swaggerDocFile);

    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

module.exports = new Server().app;
