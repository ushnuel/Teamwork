import DB from '../DB';
import { ErrorHandler } from '../Helpers';

export default class Gif {
  static async create(title, url, employeeId) {
    const query = `INSERT INTO gifs(
      title,
      image_url,
      employeeid
    )
    VALUES($1,$2,$3)
    RETURNING *`;
    const params = [title, url, employeeId];
    const gif = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return gif;
  }

  static async checkId(gifId) {
    const query = `SELECT gifid FROM gifs
    WHERE gifid = $1`;
    const param = [gifId];
    const gif = await DB.query(query, param).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    if (!gif) {
      throw new ErrorHandler('Gif not found, cannot process request', 404);
    }
    return gif;
  }

  static async delete(gifId, employeeId) {
    const query = `DELETE FROM gifs
    WHERE gifid = $1 AND employeeid = $2`;
    const params = [gifId, employeeId];
    await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
  }
}
