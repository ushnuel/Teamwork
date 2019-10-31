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
}
