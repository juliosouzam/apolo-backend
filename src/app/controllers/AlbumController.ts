import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Album from '@entities/Album';

class AlbumController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { session_id } = request.params;

    const albumRepository = getRepository(Album);

    const albums = await albumRepository.find({ where: { session_id } });

    return response.json(albums);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { session_id } = request.params;
    const { name, cover, category_id, artist_id } = request.body;

    const albumRepository = getRepository(Album);

    const albumExists = await albumRepository.findOne({
      where: { category_id, artist_id, name },
    });

    if (albumExists) {
      return response.status(400).json({ error: 'Album already exists.' });
    }

    const album = albumRepository.create({
      name,
      cover,
      session_id,
      category_id,
      artist_id,
    });

    await albumRepository.save(album);

    return response.json(album);
  }
}

export default new AlbumController();
