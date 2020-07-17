import { Router } from 'express';

import RegisterController from '@controllers/RegisterController';
import LoginController from '@controllers/LoginController';

import { authenticated } from '../app/middlewares';

const routes = Router();

routes.get('/', (request, response) => response.json({ status: true }));

routes.post('/register', RegisterController.store);
routes.post('/login', LoginController.store);

routes.use(authenticated);

export default routes;
