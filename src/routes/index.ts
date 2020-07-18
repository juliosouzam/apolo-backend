import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import RegisterController from '@controllers/RegisterController';
import LoginController from '@controllers/LoginController';

import SessionController from '@controllers/SessionController';
import CategoryController from '@controllers/CategoryController';
import ArtistController from '@controllers/ArtistController';
import AlbumController from '@controllers/AlbumController';

import CategoryArtistController from '@controllers/CategoryArtistController';
import CategoryAlbumController from '@controllers/CategoryAlbumController';

import { authenticated } from '../app/middlewares';

const routes = Router();
const uploadFile = multer(uploadConfig({ type: 'file' }));
// const uploadMusic = multer(uploadConfig({ type: 'music' }));

routes.get('/', (request, response) => response.json({ status: true }));

routes.post('/register', RegisterController.store);
routes.post('/login', LoginController.store);

routes.use(authenticated);

routes.get('/sessions', SessionController.index);
routes.post('/sessions', SessionController.store);

routes.get('/sessions/:session_id/categories', CategoryController.index);
routes.post('/sessions/:session_id/categories', CategoryController.store);

// Artists

routes.get('/sessions/:session_id/artists', ArtistController.index);
routes.post(
  '/sessions/:session_id/artists',
  uploadFile.single('file'),
  ArtistController.store,
);

routes.get(
  '/sessions/:session_id/categories/:category_id/artists',
  CategoryArtistController.index,
);

// Albuns
// - Name, Cover, Artist, Category, Session

routes.get('/sessions/:session_id/albums', AlbumController.index);
routes.post(
  '/sessions/:session_id/albums',
  uploadFile.single('file'),
  AlbumController.store,
);

routes.get(
  '/sessions/:session_id/categories/:category_id/albums',
  CategoryAlbumController.index,
);

// Musics
// - ...

export default routes;
