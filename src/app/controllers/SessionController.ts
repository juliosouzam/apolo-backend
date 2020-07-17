import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '@entities/User';
import Session from '@entities/Session';

class SessionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const sessionRepository = getRepository(Session);
    const userId = request.user.id;

    const sessions = await sessionRepository.find({
      where: { user_id: userId },
    });

    return response.json(sessions);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, url } = request.body;
    const userId = request.user.id;

    const sessionRepository = getRepository(Session);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      return response.status(400).json({ error: 'User not exists' });
    }

    const session = sessionRepository.create({
      name,
      url,
      user,
    });

    await sessionRepository.save(session);

    return response.json(session);
  }
}

export default new SessionController();
