import cloudinary from 'cloudinary';
import Datauri from 'datauri';

import config from '../Config';
import { ErrorHandler } from '../Helpers';

const datauri = new Datauri();

export default class Cloudinary {
  static upload(req, res, next) {
    try {
      if (!req.file) {
        throw new ErrorHandler('Please include an image gif', 400);
      }
      if (req.file.mimetype !== 'image/gif') {
        throw new ErrorHandler(
          'Invalid image format: Image should be in a gif format',
          400,
        );
      }
      const image = datauri.format('.gif', req.file.buffer).content;
      cloudinary.config(config.CLOUDINARY);
      cloudinary.v2.uploader
        .upload(image, {
          folder: Cloudinary.folder(),
          use_filename: true,
        })
        .then((response) => {
          req.body.image_url = response.url;
          next();
        })
        .catch(err => next(err));
    } catch (error) {
      next(error);
    }
  }

  static folder() {
    let folder = '';
    switch (config.NODE_ENV) {
      case 'dev':
        folder = 'Teamwork_dev';
        break;
      case 'prod':
        folder = 'Teamwork_prod';
        break;
      default:
        break;
    }
    return folder;
  }
}
