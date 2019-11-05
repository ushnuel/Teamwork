import { Router } from 'express';
import CommentController from '../Controllers/comment';

const router = Router();
router.post(
  '/articles/:articleId/comment',
  CommentController.createArticleComment,
);
router.post('/gifs/:gifId/comment', CommentController.createGifComment);

export default router;
