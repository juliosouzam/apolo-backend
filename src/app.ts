import 'reflect-metadata';
import { resolve } from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import './database';

import routes from './routes';

class Application {
  public express: Express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();

    this.errorHandler();
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

  errorHandler() {
    this.express.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (process.env.NODE_ENV !== 'production') {
          return response
            .status(400)
            .json({ status: 'error', message: err.message });
        }

        return response
          .status(500)
          .json({ status: 'error', message: 'Internal Server Error' });
      },
    );
  }
}

export default new Application().express;
