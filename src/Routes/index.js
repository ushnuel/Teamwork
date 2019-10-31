import { Router } from 'express';
import Employee from './employee';

const router = Router();

router.use('/auth', Employee);

export default router;
