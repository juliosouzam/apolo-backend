import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@entities/User';

class RegisterController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ email });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({ name, email, password: passwordHash });

    await userRepository.save(user);

    return response.json(user);
  }
}

export default new RegisterController();
