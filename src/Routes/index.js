import { Router } from 'express';
import EmployeeRoute from './employee';
import GifRoute from './gif';
import ArticleRoute from './article';
import { Jwt } from '../Middlewares';

const router = Router();

router.use('/auth', EmployeeRoute);
router.use('/gifs', Jwt.authorize, GifRoute);
router.use('/articles', Jwt.authorize, ArticleRoute);

export default router;
