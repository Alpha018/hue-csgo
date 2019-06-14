import * as express from 'express';

export class BaseRouter {
  // tslint:disable-next-line:variable-name
  protected _router = express.Router();

  constructor() {
    this.configRoute();
  }

  configRoute() {
    // abstract
  }

  get router() {
    return this._router;
  }
}
