import { Router } from 'express';
import EmployeeRoute from './employee';
import GifRoute from './gif';
import { Jwt } from '../Middlewares';

const router = Router();

router.use('/auth', EmployeeRoute);
router.use('/gifs', Jwt.authorize, GifRoute);

export default router;
