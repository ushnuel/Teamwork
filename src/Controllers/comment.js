import Comment from '../Models/comment';
import Article from '../Models/article';
import { FeedbackHandler } from '../Helpers';

export default class CommentController {
  static async createArticle(req, res, next) {
    try {
      const article = await Article.get(req.params.articleId);
      const comment = await Comment.create(
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
}
