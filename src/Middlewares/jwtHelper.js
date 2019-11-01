import jwt from 'jsonwebtoken';
import config from '../Config';
import ErrorHandler from '../Helpers';

export default class JWT {
  static createToken(payload) {
    return jwt.sign(payload, config.JWT_SECRET);
  }

  static authorize(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
          if (err) {
            throw new ErrorHandler('Authentication failed: Invalid token', 401);
          }
          req.user = decoded;
          if (req.body.id && req.body.id !== req.user.userId) {
            throw new ErrorHandler('Invalid user', 400);
          }
        });
        next();
      } else {
        throw new ErrorHandler('Authentication failed: No token provided', 401);
      }
    } catch (error) {
      next(error);
    }
  }

  static authorizeAdmin(req, res, next) {
    const { status } = req.user;
    if (status !== 'admin') {
      next(new ErrorHandler('Unauthorized access', 403));
    } else {
      next();
    }
  }
}
