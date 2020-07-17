import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Category from '@entities/Category';

class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const categoryRepository = getRepository(Category);
    const { session_id } = request.params;

    const categories = await categoryRepository.find({ where: { session_id } });

    return response.json(categories);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { session_id } = request.params;

    const categoryRepository = getRepository(Category);

    const categoryExists = await categoryRepository.findOne({
      where: { session_id, name },
    });

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists!' });
    }

    const category = categoryRepository.create({ name, session_id });

    await categoryRepository.save(category);

    return response.json(category);
  }
}

export default new CategoryController();
