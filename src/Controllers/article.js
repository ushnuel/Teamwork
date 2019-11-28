import Article from '../Models/article';
import { FeedbackHandler, ErrorHandler, InputValidation } from '../Helpers';
import Comment from '../Models/comment';
import Utils from '../Utils';

const Model = new Article();

export default class ArticleController {
  static async createArticle(req, res, next) {
    try {
      const { ...body } = req.body;
      const { userId } = req.user;
      const employeeid = userId;
      const data = { ...body, employeeid };
      const error = InputValidation(req);
      if (error) {
        throw new ErrorHandler(error, 400);
      }
      const article = await Model.create(data);
      Utils.help(article, res, 'Article successfully posted', 201);
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const response = await Model.getArticle(req.params.articleId);
      Article.checkAccess(response, req.user.userId, 'edit', 'article');
      const article = await Model.edit(req.user.userId, req.body, response.articleid);
      Utils.help(article, res, 'Article successfully updated', 200);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const response = await Model.getArticle(req.params.articleId);
      Article.checkAccess(response, req.user.userId, 'delete', 'article');
      await Model.delete('employeeid', 'articleid', req.user.userId, response.articleid);
      Utils.help(null, res, 'Article successfully deleted', 200);
    } catch (error) {
      next(error);
    }
  }

  static async feed(req, res, next) {
    try {
      const articles = await Model.feed();
      Utils.help([articles], res, '', 200);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const article = await Model.getArticle(req.params.articleId);
      const response = await Comment.get(article.articleid);
      const comments = [...response];
      const data = { ...article, comments };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
}
