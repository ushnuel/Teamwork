import { Router } from 'express';
import Employee from '../Controllers/employee';
import { Jwt, InputValidator } from '../Middlewares';

const router = Router();
router.post(
  '/create-user',
  InputValidator.Validate('signUp'),
  Jwt.hasAccount,
  Jwt.authorizeAdmin,
  Employee.signUp,
);
router.post('/signin', Employee.signIn);

export default router;
