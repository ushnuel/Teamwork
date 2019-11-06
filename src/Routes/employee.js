import { Router } from 'express';
import Employee from '../Controllers/employee';
import { Jwt } from '../Middlewares';

const router = Router();
router.post('/create-user', Jwt.authorizeAdmin, Employee.create);
router.post('/signin', Employee.signIn);

export default router;
