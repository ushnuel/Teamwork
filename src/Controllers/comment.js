import Comment from '../Models/comment';
import Article from '../Models/article';
import { FeedbackHandler, ErrorHandler, InputValidation } from '../Helpers';
import Gif from '../Models/gif';

export default class CommentController {
  static async createArticleComment(req, res, next) {
    try {
      const error = InputValidation(req);
      if (error) {
        throw new ErrorHandler(error, 422);
      }
      const article = await Article.get(req.params.articleId);
      const comment = await Comment.createArticle(
        req.body,
        article.id,
        req.user.userId,
      );
      const message = 'Comment successfully created';
      const data = {
        ...comment,
        articleTitle: article.title,
        article: article.article,
        message,
      };
      FeedbackHandler.success(res, 201, data);
    } catch (error) {
      next(error);
    }
  }

  static async createGifComment(req, res, next) {
    try {
      const error = InputValidation(req);
      if (error) {
        throw new ErrorHandler(error, 422);
      }
      const gif = await Gif.get(req.params.gifId);
      const comment = await Comment.createGif(
        req.body,
        gif.id,
        req.user.userId,
      );
      const message = 'Comment successfully created';
      const data = {
        ...comment,
        gifTitle: gif.title,
        message,
      };
      FeedbackHandler.success(res, 201, data);
    } catch (error) {
      next(error);
    }
  }
}
