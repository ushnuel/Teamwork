import Gif from '../Models/gif';
import { FeedbackHandler } from '../Helpers';

export default class GifController {
  static async post(req, res, next) {
    try {
      const gif = await Gif.create(req.body.title, req.body.image_url);
      const message = 'GIF image successfully posted';
      const data = {
        message,
        ...gif,
      };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
}
