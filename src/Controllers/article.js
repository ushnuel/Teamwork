import Article from '../Models/article';
import { FeedbackHandler } from '../Helpers';

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
      await Article.delete(req.user.userId, article.articleid);
      const data = { message: 'Article successfully deleted' };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
}
