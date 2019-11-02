import { Router } from 'express';
import ArticleController from '../Controllers/article';

const router = Router();
router.post('/', ArticleController.create);

export default router;
