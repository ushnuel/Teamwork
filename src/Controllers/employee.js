import bcrypt from 'bcrypt';
import Employee from '../Models/employee';
import JWT from '../Middlewares/jwtHelper';
import { FeedbackHandler, ErrorHandler } from '../Helpers';

export default class EmployeeController {
  static async create(req, res, next) {
    try {
      const newEmployee = await Employee.getEmployeeEmail(req.body.email);
      if (newEmployee) {
        throw new ErrorHandler(
          `Employee with email ${newEmployee.email.toUpperCase()} already exists`,
        );
      }
      const employee = await Employee.create(req.body);
      const payload = {
        status: employee.jobrole,
        email: employee.email,
        userId: employee.id,
      };
      const token = JWT.createToken(payload);
      const message = 'User account successfully created';
      const data = { token, message, userId: employee.id };
      FeedbackHandler.success(res, 201, data);
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const employee = await Employee.getEmployeeEmail(email);
      if (!email || !password) {
        throw new ErrorHandler('Invalid email address or password', 400);
      }
      if (!employee) {
        throw new ErrorHandler('Operation failed: Email does not exist', 404);
      }
      const passwordMatched = await bcrypt.compare(password, employee.password);
      if (!passwordMatched) {
        throw new ErrorHandler(
          'Invalid Password: Passwords did not match',
          404,
        );
      }
      const token = JWT.createToken({
        userId: employee.id,
        status: employee.jobrole,
        email: employee.email,
      });
      const data = { token, userId: employee.id };
      FeedbackHandler.success(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
}
