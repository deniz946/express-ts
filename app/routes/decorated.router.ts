import express from "express";
import { controller, httpGet, interfaces } from "inversify-express-utils";

@controller("/decorated")
export class DecoratedController implements interfaces.Controller {

  @httpGet("/")
  private index(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send('bla');
  }
}
