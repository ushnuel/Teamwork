import { body } from 'express-validator';

export default class InputValidator {
  static Validate(method) {
    switch (method) {
      case 'signUp': {
        return [
          body('email', 'Invalid email address: express validator')
            .exists()
            .isEmail(),
          body('password', 'Password should not be less than 8 characters')
            .exists()
            .isLength({ min: 8 }),
          body(
            'jobRole',
            'Please indicate if employee is an admin or not.',
          ).exists(),
        ];
      }
      case 'signIn': {
        return [
          body('email', 'Incorrect email address').isEmail(),
          body('password', 'Please provide a password').exists(),
        ];
      }
      case 'createArticle': {
        return [
          body('article', 'Article must not be empty').exists(),
          body('title', 'Include the title of the article').exists(),
        ];
      }
      case 'createArticleComment': {
        return [body('comment', 'comment must not be empty').exists()];
      }
      case 'createGifComment': {
        return [body('comment', 'comment must not be empty').exists()];
      }
      default:
        break;
    }
    return method;
  }
}
