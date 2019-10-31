import bcrypt from 'bcrypt';
import DB from '../DB';
import { ErrorHandler } from '../Helpers';

export default class Employee {
  static async create({
    firstName,
    lastName,
    jobRole,
    email,
    password,
    department,
    address,
    gender,
  }) {
    const query = `INSERT INTO employees (firstName, lastName, jobRole, email, password, department, address, gender)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`;
    const encryptedPswd = await bcrypt.hash(password, 10);

    const params = [
      firstName,
      lastName,
      jobRole,
      email,
      encryptedPswd,
      department,
      address,
      gender,
    ];
    const employee = await DB.query(query, params).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    return employee;
  }

  static async signInEmployee({ email, password }) {
    const query = `SELECT * FROM employees
    WHERE email = $1`;
    const param = [email];
    const employee = await DB.query(query, param).catch((err) => {
      throw new ErrorHandler(err.message, 400);
    });
    if (!employee) {
      throw new ErrorHandler(
        `Employee with email ${email} does not exist`,
        404,
      );
    }
    const passwordMatched = await bcrypt.compare(password, employee.password);
    if (!passwordMatched) {
      throw new ErrorHandler('Passwords do not match', 404);
    }
    return employee;
  }
}
