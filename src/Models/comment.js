import DB from '../DB';
import { ErrorHandler } from '../Helpers';

export default class Comment {
  static async create({ comment }, articleId, employeeId) {
    const query = `INSERT INTO comments_articles(comment,articleid,employeeid)
    VALUES($1,$2,$3) 
    RETURNING *`;
    const params = [comment, articleId, employeeId];
    const response = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return response;
  }
}
