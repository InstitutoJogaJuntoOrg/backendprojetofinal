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
}

module.exports = new Server().app;
