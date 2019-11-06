import DB from '../DB';
import { ErrorHandler } from '../Helpers';

export default class Article {
  static async create({ title, article }, employeeId) {
    const query = `
    INSERT 
    INTO articles (
      title,
      article,
      employeeID
    )
    VALUES($1,$2,$3)
    RETURNING *`;
    const params = [title, article, employeeId];
    const createdArticle = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return createdArticle;
  }

  static async edit(employeeId, { title, article }, articleId) {
    const query = `
    UPDATE 
    articles
    SET title = $1, article = $2
    WHERE articleid = $3 AND employeeid = $4
    RETURNING *`;
    const params = [title, article, articleId, employeeId];
    const editedArticle = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return editedArticle;
  }

  static async get(articleId) {
    const query = `
    SELECT 
    articleid as id,
    employeeid as authorid,
    title,
    createdon,
    article
    FROM articles
    WHERE articleid = $1`;
    const param = [articleId];
    const article = await DB.query(query, param).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    if (!article) {
      throw new ErrorHandler(
        'Article not found, request cannot be processed',
        404,
      );
    }
    return article;
  }

  static async delete(employeeId, articleId) {
    const query = `
    DELETE 
    FROM articles
    WHERE 
    employeeid = $1 
    AND articleid = $2`;
    const params = [employeeId, articleId];
    await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
  }

  static async feed() {
    const query = `SELECT 
    articleid AS id,
    createdon,
    title,
    article,
    employeeid AS authorId
    FROM articles
    ORDER BY 
    createdon DESC`;
    const articles = await DB.query(query, '', true).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    if (articles.length <= 0) {
      throw new ErrorHandler(
        'There are no articles available. Create one now!',
        404,
      );
    }
    return articles;
  }
}
