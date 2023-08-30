import express from "express";
import cors from "cors";
import morgan from "morgan";

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

  loadRoutes() {
    this.app.get("/api", (req, res) =>
      res.json({ message: "Api is up and running!" })
    );
  }
}

export default new Server().app;
