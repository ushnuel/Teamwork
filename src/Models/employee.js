import Database from '../DB/database';
import { ErrorHandler } from '../Helpers';

export default class Employee extends Database {
  constructor() {
    super('employees');
  }

  async getEmail(email) {
    const employee = await this.get('email', email, '*');
    return employee;
  }

  static userExist(user, userExist = true) {
    if (user && userExist) {
      throw new ErrorHandler(
        `Employee with email ${user.email} already exists`,
      );
    }
    if (!user && !userExist) {
      throw new ErrorHandler('Operation failed: Email does not exist', 404);
    }
  }
}
