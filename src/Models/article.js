import DB from '../DB';
import { ErrorHandler } from '../Helpers';

export default class Article {
  static async create({ title, article }) {
    const query = `INSERT INTO articles (
      title,
      article
    )
    VALUES($1,$2)
    RETURNING *`;
    const params = [title, article];
    const createdArticle = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return createdArticle;
  }
}
