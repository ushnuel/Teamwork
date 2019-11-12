import { describe, it } from 'mocha';
import server from '..';
import Employee from './Mockups/employee';
import Utils from './Utils';
import Test from './chaiHelpers';

const nonAdmin = {};
const admin = {};
const { employee, validEmployee, invalidEmployee } = new Employee();
const utils = new Utils(server);

describe('EMPLOYEE AUTHENTICATION TEST', () => {
  describe('Create User Account', () => {
    const route = '/api/v1/auth/create-user';
    it('Create an admin account', (done) => {
      utils
        .createUser(employee, route)
        .then((res) => {
          Test.employee(res);
          const { data } = res.body;
          admin.token = data.token;
          done();
        })
        .catch(err => done(err));
    });

    it('Create a non admin account', (done) => {
      const notadmin = {
        email: 'notadmin@gmail.com',
        password: 'notadmin',
        jobRole: 'Engineer',
      };
      utils
        .createUser(notadmin, route)
        .then((res) => {
          Test.employee(res);
          const { data } = res.body;
          nonAdmin.token = data.token;
          done();
        })
        .catch(err => done(err));
    });

    it('throw error if employee email already exists', (done) => {
      utils
        .createUser(employee, route)
        .then((res) => {
          Test.error(
            res,
            `Employee with email ${employee.email.toUpperCase()} already exists`,
          );
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('Sign in feature', () => {
    const route = '/api/v1/auth/signin';
    it('Admin can sign in', (done) => {
      utils
        .signIn(validEmployee, route)
        .then((res) => {
          Test.employee(res);
          done();
        })
        .catch(err => done(err));
    });

    it('Throw Error for an invalid user', (done) => {
      utils
        .signIn(invalidEmployee, route)
        .then((res) => {
          Test.error(res);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('Admin/Non admin create user account', () => {
    const route = '/api/v1/auth/create-user';
    const newUser = {
      email: 'newuser@gmail.com',
      password: 'notadmin',
      jobRole: 'Engineer',
    };
    it('Throw Error if non admin wants to create a new account', (done) => {
      utils
        .authUser(newUser, route, nonAdmin.token)
        .then((res) => {
          Test.error(res, 'Unauthorized access: Only admins are permitted');
          done();
        })
        .catch(err => done(err));
    });

    it('Admin can create user account', (done) => {
      utils
        .authUser(newUser, route, admin.token)
        .then((res) => {
          Test.employee(res);
          done();
        })
        .catch(err => done(err));
    });
  });
});
