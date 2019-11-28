import DB from '.';
import { ErrorHandler } from '../Helpers';

export default class Database {
  constructor(table) {
    this.table = table;
  }

  static map(data) {
    const keys = [];
    const params = [];
    const values = [];
    const arrayOfArrays = [];
    Object.keys(data).forEach((key) => {
      keys.push(key);
      params.push(data[key]);
      values.push(`$${params.length}`);
    });

    arrayOfArrays.push(keys, values, params);
    return arrayOfArrays;
  }

  async create(data) {
    const arrays = Database.map(data);
    const [keys, values, params] = arrays;
    const query = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES(${values.join(
      ', ',
    )}) RETURNING *`;
    const response = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return response;
  }

  async get(column, param, option) {
    const value = [param];
    const query = `SELECT ${option} FROM ${this.table} WHERE ${column} = $1`;
    const response = await DB.query(query, value).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return response;
  }

  async edit(employeeId, { title, article }, articleId) {
    const query = `
    UPDATE
    ${this.table}
    SET title = $1, article = $2
    WHERE articleid = $3 AND employeeid = $4
    RETURNING *`;
    const params = [title, article, articleId, employeeId];
    const editedArticle = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return editedArticle;
  }

  async delete(column1, column2, pId, fkey) {
    const query = `
    DELETE
    FROM ${this.table}
    WHERE
    ${column1} = $1
    AND ${column2} = $2`;
    const params = [pId, fkey];
    await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
  }

  async getAll(columns, order) {
    const query = `SELECT
    ${columns}
    FROM ${this.table}
    ORDER BY
    ${order} DESC`;
    const articles = await DB.query(query, '', true).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return articles;
  }
}
