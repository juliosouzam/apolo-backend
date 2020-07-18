import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import Artist from '@entities/Artist';

class CategoryArtistController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { session_id, category_id } = request.params;

    const artistRepository = getRepository(Artist);

    const artists = await artistRepository.find({
      where: { session_id, category_id },
    });

    return response.json(classToClass(artists));
  }
}

export default new CategoryArtistController();
