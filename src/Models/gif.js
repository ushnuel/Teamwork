import DB from '../DB';
import { ErrorHandler } from '../Helpers';

export default class Gif {
  static async create(title, url, employeeId) {
    const query = `
    INSERT 
    INTO gifs(
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

  static async get(gifId) {
    const query = `
    SELECT
    gifid as id,
    employeeid as authorid,
    title,
    image_url as url,
    createdon
    FROM gifs
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
    const query = `
    DELETE 
    FROM gifs
    WHERE gifid = $1 
    AND employeeid = $2`;
    const params = [gifId, employeeId];
    await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
  }

  static async feed() {
    const query = `SELECT 
    gifid AS id,
    createdon,
    image_url AS url,
    g.employeeid AS authorid,
    title
    FROM gifs g
    ORDER BY
    createdon DESC`;
    const gifs = await DB.query(query, '', true).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    if (gifs.length <= 0) {
      throw new ErrorHandler(
        'There are no gif posts available. Create one now!',
        404,
      );
    }
    return gifs;
  }
}
