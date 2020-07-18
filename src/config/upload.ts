import { resolve } from 'path';
import crypto from 'crypto';
import { diskStorage, StorageEngine } from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  tmpFolder: string;

  storage: StorageEngine;
}

export default {
  tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
} as IUploadConfig;
