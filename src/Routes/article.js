import { Router } from 'express';
import ArticleController from '../Controllers/article';

const router = Router();
router.post('/', ArticleController.create);
router.patch('/:articleId', ArticleController.edit);
router.delete('/:articleId', ArticleController.delete);
router.get('/feed', ArticleController.feed);

export default router;
