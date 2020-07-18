import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AuthConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function authenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;
  const { _token } = request.query as { _token: string };

  if (!authorization && !_token) {
    throw new Error('JWT token is missing!');
  }

  let token = '';

  if (authorization) {
    [, token] = authorization.split(' ');
  } else {
    token = _token;
  }

  const { secret } = AuthConfig;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token!');
  }
}
