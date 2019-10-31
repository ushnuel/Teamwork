import { Router } from 'express';
import Employee from '../Controllers/employee';

const router = Router();
router.post('/create-user', Employee.create);

export default router;
