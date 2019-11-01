import DB from '../DB';
import { ErrorHandler } from '../Helpers';

export default class Gif {
  static async create(title, url) {
    const query = `INSERT INTO gifs(
      title,
      image_url
    )
    VALUES($1,$2)
    RETURNING *`;
    const params = [title, url];
    const gif = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return gif;
  }
}
