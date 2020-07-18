import { resolve } from 'path';
import crypto from 'crypto';
import { diskStorage, StorageEngine } from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  tmpFolder: string;

  storage: StorageEngine;
}

interface Request {
  type: 'music' | 'file';
}

export default ({ type }: Request): IUploadConfig =>
  ({
    tmpFolder,
    storage: diskStorage({
      destination: resolve(tmpFolder, type === 'music' ? 'musics' : 'uploads'),
      filename: (req, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  } as IUploadConfig);
