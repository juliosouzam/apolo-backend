import fs from 'fs';
import path from 'path';
import { Express, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import uploadConfig from '@config/upload';

import Music from '@entities/Music';

class MusicController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { session_id } = request.params;

    const musicRepository = getRepository(Music);

    const musics = await musicRepository.find({ where: { session_id } });

    return response.json(classToClass(musics));
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, album_id, category_id, artist_id } = request.body;
    const { session_id } = request.params;
    const { cover, music } = request.files as {
      cover?: Express.Multer.File[];
      music: Express.Multer.File[];
    };

    const musicRepository = getRepository(Music);

    if (cover) {
      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, cover[0].filename),
        path.resolve(uploadConfig.tmpFolder, 'uploads', cover[0].filename),
      );
    }

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, music[0].filename),
      path.resolve(uploadConfig.tmpFolder, 'musics', music[0].filename),
    );

    const { originalname, mimetype, size, filename } = music[0];

    const musicCreated = musicRepository.create({
      name: name || filename,
      size,
      album_id: album_id || null,
      category_id,
      session_id,
      artist_id,
      cover: cover ? cover[0].filename : null,
      originalname,
      filename,
      mimetype,
    });

    await musicRepository.save(musicCreated);

    return response.json(musicCreated);
  }
}

export default new MusicController();
