import bcrypt from 'bcrypt';
import Employee from '../Models/employee';
import Utils from '../Utils';
import { ErrorHandler, InputValidation } from '../Helpers';

const Model = new Employee();

export default class EmployeeController {
  static async signUp(req, res, next) {
    try {
      const { ...body } = req.body;
      body.password = await bcrypt.hash(body.password, 10);
      const error = InputValidation(req);
      if (error) {
        throw new ErrorHandler(error, 422);
      }
      const user = await Model.getEmail(req.body.email);
      Employee.userExist(user, true);
      const employee = await Model.create(body);
      Utils.help(employee, res, 'User account successfully created', 201);
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const error = InputValidation(req);
      if (error) {
        throw new ErrorHandler(error, 422);
      }
      const employee = await Model.getEmail(email);
      Employee.userExist(employee, false);
      const passwordMatched = await bcrypt.compare(password, employee.password);
      if (!passwordMatched) {
        throw new ErrorHandler(
          'Invalid Password: Passwords did not match',
          404,
        );
      }
      Utils.help(employee, res, undefined, 200);
    } catch (error) {
      next(error);
    }
  }
}
