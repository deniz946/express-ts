import express from "express";
class TestController {
  constructor() {}

  testFnc(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // res.json("hola router");
    next("wtfff");
  }
}

export default new TestController();
