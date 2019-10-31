import Employee from '../Models/employee';
import JWT from '../Middlewares/jwtHelper';
import { FeedbackHandler } from '../Helpers';

export default class EmployeeController {
  static async create(req, res, next) {
    try {
      const employee = await Employee.create(req.body);
      const payload = {
        status: employee.jobrole,
        email: employee.email,
        userId: employee.id,
      };
      const token = JWT.createToken(payload);
      const message = 'User account successfully created';
      const userId = employee.id;
      const data = { token, message, userId };
      FeedbackHandler.success(res, 201, data);
    } catch (error) {
      next(error);
    }
  }
}
