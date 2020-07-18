import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import RegisterController from '@controllers/RegisterController';
import LoginController from '@controllers/LoginController';

import SessionController from '@controllers/SessionController';
import CategoryController from '@controllers/CategoryController';
import ArtistController from '@controllers/ArtistController';
import AlbumController from '@controllers/AlbumController';
import MusicController from '@controllers/MusicController';
import StreamController from '@controllers/StreamController';

import CategoryArtistController from '@controllers/CategoryArtistController';
import CategoryAlbumController from '@controllers/CategoryAlbumController';

import { authenticated } from '../app/middlewares';

const routes = Router();
const upload = multer(uploadConfig);

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
  upload.single('file'),
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
  upload.single('file'),
  AlbumController.store,
);

routes.get(
  '/sessions/:session_id/categories/:category_id/albums',
  CategoryAlbumController.index,
);

// Musics
// - ...

routes.get('/sessions/:session_id/musics', MusicController.index);
routes.post(
  '/sessions/:session_id/musics',
  upload.fields([
    {
      name: 'cover',
      maxCount: 1,
    },
    {
      name: 'music',
      maxCount: 1,
    },
  ]),
  MusicController.store,
);

routes.get('/stream/:music_id', StreamController.show);

export default routes;
