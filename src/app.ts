import 'reflect-metadata';
import { resolve } from 'path';
import express, { Express } from 'express';

import './database';

import routes from './routes';

class Application {
  public express: Express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads')),
    );
  }

  routes() {
    this.express.use(routes);
  }
}

export default new Application().express;
