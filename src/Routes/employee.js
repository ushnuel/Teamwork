import { Router } from 'express';
import Employee from '../Controllers/employee';

const router = Router();
router.post('/create-user', Employee.create);
router.post('/signin', Employee.signIn);

export default router;
