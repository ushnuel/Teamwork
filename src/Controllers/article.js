import Article from '../Models/article';
import { FeedbackHandler } from '../Helpers';

export default class ArticleController {
  static async create(req, res, next) {
    try {
      const article = await Article.create(req.body);
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
}
