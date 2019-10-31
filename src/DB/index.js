import { Pool } from 'pg';
import config from '../Config';

const pool = new Pool({
  connectionString: config.DB,
});

export default class DB {
  static async query(query, values, isArray = false) {
    const oneLineString = DB.removeNewLine(query);
    const response = await pool.query(oneLineString, values);
    return isArray ? response.rows : response.rows[0];
  }

  static removeNewLine(string) {
    return string.replace(/\n/g, '');
  }
}
