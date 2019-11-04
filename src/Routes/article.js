import { Router } from 'express';
import ArticleController from '../Controllers/article';

const router = Router();
router.post('/', ArticleController.create);
router.patch('/:articleId', ArticleController.edit);

export default router;
