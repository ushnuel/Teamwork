import { Router } from 'express';
import CommentController from '../Controllers/comment';
import { Jwt, InputValidator } from '../Middlewares';

const router = Router();
router.post(
  '/articles/:articleId/comment',
  InputValidator.Validate('createArticleComment'),
  Jwt.authorize,
  CommentController.createArticleComment,
);
router.post(
  '/gifs/:gifId/comment',
  InputValidator.Validate('createGifComment'),
  Jwt.authorize,
  CommentController.createGifComment,
);

export default router;
