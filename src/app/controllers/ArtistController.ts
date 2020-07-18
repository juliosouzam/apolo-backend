import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Artist from '@entities/Artist';

class ArtistController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { session_id } = request.params;

    const artistRepository = getRepository(Artist);

    const artists = await artistRepository.find({ where: { session_id } });

    return response.json(artists);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, cover, category_id } = request.body;
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
      cover,
      category_id,
      session_id,
    });

    await artistRepository.save(artist);

    return response.json(artist);
  }
}

export default new ArtistController();
