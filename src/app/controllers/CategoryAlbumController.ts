import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import Album from '@entities/Album';

class CategoryAlbumController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { session_id, category_id } = request.params;

    const albumRepository = getRepository(Album);

    const albums = await albumRepository.find({
      where: { session_id, category_id },
    });

    return response.json(classToClass(albums));
  }
}

export default new CategoryAlbumController();
