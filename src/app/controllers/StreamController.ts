import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import uploadConfig from '@config/upload';

import Music from '@entities/Music';

class StreamController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { music_id } = request.params;

    const musicRepository = getRepository(Music);

    const music = await musicRepository.findOne(music_id);

    if (!music) {
      return response.status(400).json({ error: 'Music not found' });
    }

    const filePath = path.resolve(
      uploadConfig.tmpFolder,
      'musics',
      music.filename,
    );

    const streamTrack = await fs.promises.stat(filePath);

    response.writeHead(200, {
      'Content-Type': music.mimetype,
      'Content-Length': streamTrack.size,
      'Accept-Ranges': 'bytes',
    });

    const highWaterMark = 64;

    const stream = fs.createReadStream(filePath, { highWaterMark });

    // eslint-disable-next-line no-console
    stream.on('end', () => console.log('acabou'));

    return stream.pipe(response);
  }
}

export default new StreamController();
