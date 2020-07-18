import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import Artist from '@entities/Artist';

class ArtistController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { session_id } = request.params;

    const artistRepository = getRepository(Artist);

    const artists = await artistRepository.find({ where: { session_id } });

    return response.json(classToClass(artists));
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, category_id } = request.body;
    const { session_id } = request.params;

    const artistRepository = getRepository(Artist);

    const artistExists = await artistRepository.findOne({
      where: { name, category_id },
    });

    if (artistExists) {
      return response.status(400).json({ error: 'Artist already exists' });
    }

    const artist = artistRepository.create({
      name,
      cover: request.file.filename,
      category_id,
      session_id,
    });

    await artistRepository.save(artist);

    return response.json(classToClass(artist));
  }
}

export default new ArtistController();
