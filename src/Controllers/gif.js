import Gif from '../Models/gif';
import Comment from '../Models/comment';
import { FeedbackHandler, ErrorHandler, InputValidation } from '../Helpers';

export default class GifController {
  static async createGif(req, res, next) {
    try {
      const error = InputValidation(req);
      if (error) {
        throw new ErrorHandler(error, 422);
      }
      const gif = await Gif.create(
        req.body.title,
        req.body.image_url,
        req.user.userId,
      );
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

  static async delete(req, res, next) {
    try {
      const gif = await Gif.get(req.params.gifId);
      if (gif.authorid !== req.user.userId) {
        throw new ErrorHandler(
          "You don't have permission to delete this gif",
          403,
        );
      }
      await Gif.delete(gif.id, req.user.userId);
      const data = { message: 'Gif post successfully deleted' };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }

  static async feed(req, res, next) {
    try {
      const gifs = await Gif.feed();
      const data = [...gifs];
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const gif = await Gif.get(req.params.gifId);
      const response = await Comment.getGif(gif.id);
      const comments = [...response];
      const data = { ...gif, comments };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
}
