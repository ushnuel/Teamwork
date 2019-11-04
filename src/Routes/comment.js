import { Router } from 'express';
import CommentController from '../Controllers/comment';

const router = Router();
router.post('/:articleId/comment', CommentController.createArticle);

export default router;
