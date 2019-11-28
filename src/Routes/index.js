import { Router } from 'express';
import EmployeeRoute from './employee';
import GifRoute from './gif';
import ArticleRoute from './article';
import CommentRoute from './comment';
import { Jwt } from '../Middlewares';
import ArticleController from '../Controllers/article';

const router = Router();

router.use('/auth', EmployeeRoute);
router.use('/gifs', Jwt.authorize, GifRoute);
router.use('/articles', ArticleRoute);
router.use('/', CommentRoute);
router.get('/feeds', Jwt.authorize, ArticleController.feed);

export default router;
