import Database from '../DB/database';
import { ErrorHandler } from '../Helpers';

export default class Article extends Database {
  constructor() {
    super('articles');
  }

  async getArticle(id) {
    const response = await this.get('articleid', id, '*');
    if (!response) {
      throw new ErrorHandler('Article does not exist, check well and try again', 404);
    }
    return response;
  }

  static checkAccess(response, user, action, model) {
    if (response.employeeid !== user) {
      throw new ErrorHandler(`You don't have permission to ${action} this ${model}`, 403);
    }
  }

  async feed() {
    const columns = 'articleid AS id, createdon, title, article, employeeid AS authorId';
    const response = await this.getAll(columns, 'articleid');
    return response;
  }
}
