import jwt from 'jsonwebtoken';
import config from '../Config';
import { ErrorHandler } from '../Helpers';

export default class JWT {
  static createToken(payload) {
    return jwt.sign(payload, config.JWT_SECRET);
  }

  static authorize(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw new ErrorHandler('Invalid authorization header. Please log in to continue', 401);
      }
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
          if (err) {
            throw new ErrorHandler('Authentication failed: Invalid token', 401);
          }
          req.user = decoded;
          if (req.body.id && req.body.id !== req.user.userId) {
            throw new ErrorHandler(
              'Invalid user, Permission not granted ',
              403,
            );
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
    if (req.user) {
      const { status } = req.user;
      if (status !== config.ADMIN) {
        next(
          new ErrorHandler(
            'Unauthorized access: Only admins are permitted',
            403,
          ),
        );
      } else {
        next();
      }
    } else {
      next();
    }
  }

  static hasAccount(req, res, next) {
    if (!req.headers.authorization) {
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
          if (err) {
            throw new ErrorHandler('Invalid authorization token. Please log in to continue', 401);
          }
          req.user = decoded;
          next();
        });
      } else {
        throw new ErrorHandler('Authentication failed: No token provided', 401);
      }
    } catch (error) {
      next(error);
    }
  }
}
