import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => response.json({ status: true }));

export default routes;
