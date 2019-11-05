import Article from '../Models/article';
import { FeedbackHandler, ErrorHandler } from '../Helpers';

export default class ArticleController {
  static async create(req, res, next) {
    try {
      const article = await Article.create(req.body, req.user.userId);
      const message = 'Article successfully posted';
      const returnedFields = ArticleController.removeField(article);
      const data = { message, ...returnedFields };
      FeedbackHandler.success(res, 201, data);
    } catch (error) {
      next(error);
    }
  }

  static removeField({ article, ...otherParams }) {
    return otherParams;
  }

  static async edit(req, res, next) {
    try {
      const articleCheck = await Article.get(req.params.articleId);
      if (articleCheck.employeeid !== req.user.userId) {
        throw new ErrorHandler(
          "You don't have permission to edit this article",
          403,
        );
      }
      const article = await Article.edit(
        req.user.userId,
        req.body,
        articleCheck.articleid,
      );
      const message = 'Article successfully updated';
      const data = { message, ...article };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const article = await Article.get(req.params.articleId);
      if (article.employeeid !== req.user.userId) {
        throw new ErrorHandler(
          "You don't have permission to delete this article",
          403,
        );
      }
      await Article.delete(req.user.userId, article.articleid);
      const data = { message: 'Article successfully deleted' };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }

  static async feed(req, res, next) {
    try {
      const articles = await Article.feed();
      const data = [...articles];
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
}
