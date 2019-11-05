import Comment from '../Models/comment';
import Article from '../Models/article';
import { FeedbackHandler } from '../Helpers';
import Gif from '../Models/gif';

export default class CommentController {
  static async createArticleComment(req, res, next) {
    try {
      const article = await Article.get(req.params.articleId);
      const comment = await Comment.createArticle(
        req.body,
        article.articleid,
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
      const gif = await Gif.get(req.params.gifId);
      const comment = await Comment.createGif(
        req.body,
        gif.gifid,
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
