const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

class Server {
  app;

  constructor() {
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  loadMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  async loadRoutes() {
    await require("./router")(this.app);
  }
}

module.exports = new Server().app;
