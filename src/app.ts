import 'reflect-metadata';
import express, { Express } from 'express';

import routes from './routes';

class Application {
  public express: Express;

  constructor() {
    this.express = express();

    this.routes();
  }

  routes() {
    this.express.use(routes);
  }
}

export default new Application().express;
