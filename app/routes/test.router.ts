import express from "express";
import TestController from "../controllers/test.controller";
class TestRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", TestController.testFnc);
  }
}

export default new TestRouter().router;
