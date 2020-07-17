import { Router } from 'express';

import RegisterController from '@controllers/RegisterController';
import LoginController from '@controllers/LoginController';

import SessionController from '@controllers/SessionController';
import CategoryController from '@controllers/CategoryController';

import { authenticated } from '../app/middlewares';

const routes = Router();

routes.get('/', (request, response) => response.json({ status: true }));

routes.post('/register', RegisterController.store);
routes.post('/login', LoginController.store);

routes.use(authenticated);

routes.get('/sessions', SessionController.index);
routes.post('/sessions', SessionController.store);

routes.get('/sessions/:session_id/categories', CategoryController.index);
routes.post('/sessions/:session_id/categories', CategoryController.store);

export default routes;
