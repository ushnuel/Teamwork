import jwt from 'jsonwebtoken';
import config from '../Config';

export default class JWT {
  static createToken(payload) {
    return jwt.sign(payload, config.JWT_SECRET);
  }
}
