import { Router } from 'express';
import ArticleController from '../Controllers/article';

const router = Router();
router.post('/', ArticleController.create);
router.get('/feed', ArticleController.feed);
router.patch('/:articleId', ArticleController.edit);
router.delete('/:articleId', ArticleController.delete);
router.get('/:articleId', ArticleController.get);

export default router;
