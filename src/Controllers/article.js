import Article from '../Models/article';
import { FeedbackHandler, ErrorHandler, InputValidation } from '../Helpers';
import Comment from '../Models/comment';

export default class ArticleController {
  static async createArticle(req, res, next) {
    try {
      const error = InputValidation(req);
      if (error) {
        throw new ErrorHandler(error, 422);
      }
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
      if (articleCheck.id !== req.user.userId) {
        throw new ErrorHandler(
          "You don't have permission to edit this article",
          403,
        );
      }
      const article = await Article.edit(
        req.user.userId,
        req.body,
        articleCheck.id,
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
      if (article.authorid !== req.user.userId) {
        throw new ErrorHandler(
          "You don't have permission to delete this article",
          403,
        );
      }
      await Article.delete(req.user.userId, article.id);
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

  static async get(req, res, next) {
    try {
      const article = await Article.get(req.params.articleId);
      const response = await Comment.get(article.id);
      const comments = [...response];
      const data = { ...article, comments };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
}
