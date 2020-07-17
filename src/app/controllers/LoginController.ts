import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@entities/User';

import authConfig from '@config/auth';
import { time } from 'console';

class LoginController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: 'User dont exists' });
    }

    if (!(await compare(password, user.password))) {
      return response.status(400).json({ error: 'User dont exists' });
    }

    const token = sign({ time: time() }, authConfig.secret, {
      expiresIn: '1d',
      subject: user.id,
    });

    return response.json({ user, token });
  }
}

export default new LoginController();
