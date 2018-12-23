import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import expressValidator from "express-validator";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import path from "path";
import "reflect-metadata";
import dbConnect from "./config/db-connect";
import "./controllers/decorated.controller";
// Routers import
import testRouter from "./routes/test.router";
// we load the environment variables
dotenv.config();

class App {
  public app: express.Application;
  public container: Container;
  public server: InversifyExpressServer;

  constructor() {
    this.app = express();
    this.container = new Container();
    this.server = new InversifyExpressServer(this.container);
    dbConnect.start();
    // Express configuration
    this.config();
    this.configRoutes();
    this.configErrorMiddleware();
  }

  private config(): void {
    this.server.setConfig(app => {
      app.use(morgan("dev"));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(expressValidator());
      app.use(
        express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
      );
    });
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

export default new App().server.build();
