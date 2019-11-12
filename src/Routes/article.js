import { Router } from 'express';
import ArticleController from '../Controllers/article';
import { Jwt, InputValidator } from '../Middlewares';

const router = Router();
router.post(
  '/',
  InputValidator.Validate('createArticle'),
  Jwt.authorize,
  ArticleController.createArticle,
);
router.patch('/:articleId', Jwt.authorize, ArticleController.edit);
router.delete('/:articleId', Jwt.authorize, ArticleController.delete);
router.get('/:articleId', Jwt.authorize, ArticleController.get);

export default router;
