import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import expressValidator from "express-validator";
import morgan from "morgan";
import path from "path";

import dbConnect from "./config/db-connect";
// Routers import
import testRouter from "./routes/test.router";
// we load the environment variables
dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    dbConnect.start();
    // Express configuration
    this.config();
    this.configRoutes();
    this.configErrorMiddleware();
  }

  private config(): void {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(expressValidator());
    this.app.use(
      express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    );
  }

  private configRoutes(): void {
    this.app.use("/test", testRouter);
  }

  private configErrorMiddleware(): void {
    this.app.use((err: string, req: express.Request, res: express.Response) => {
      res.status(500).send({ error: true, errMsg: err });
    });
  }
}

export default new App().app;
