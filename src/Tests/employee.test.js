import { describe, it } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';

import server from '..';
import Employee from './Mockups/employee';

const nonAdmin = {};
const admin = {};

chai.use(chaiHttp);
should();
const { employee, validEmployee, invalidEmployee } = new Employee();
const route = '/api/v1/auth';

describe('EMPLOYEE AUTHENTICATION TEST', () => {
  describe('Create User Account', () => {
    it('Create an admin account', (done) => {
      chai
        .request(server)
        .post(`${route}/create-user`)
        .send(employee)
        .then((res) => {
          const { data } = res.body;
          expect(data).to.have.property('token');
          expect(data).to.have.property('userId');
          const { message } = data;
          expect(message).to.be.eql('User account successfully created');
          admin.token = data.token;
          done();
        })
        .catch(err => done(err));
    });

    it('Create a non admin account', (done) => {
      chai
        .request(server)
        .post(`${route}/create-user`)
        .send({
          email: 'notadmin@gmail.com',
          password: 'notadmin',
          jobRole: 'Engineer',
        })
        .then((res) => {
          const { data } = res.body;
          expect(data).to.have.property('token');
          expect(data).to.have.property('userId');
          const { message } = data;
          expect(message).to.be.eql('User account successfully created');
          nonAdmin.token = data.token;
          done();
        })
        .catch(err => done(err));
    });

    it('throw error if employee email already exists', (done) => {
      chai
        .request(server)
        .post(`${route}/create-user`)
        .send(employee)
        .then((res) => {
          const { status, error } = res.body;
          expect(status).to.eql('error');
          expect(error).to.be.eql(
            `Employee with email ${employee.email.toUpperCase()} already exists`,
          );
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('Sign in feature', () => {
    it('Admin can sign in', (done) => {
      chai
        .request(server)
        .post(`${route}/signin`)
        .send(validEmployee)
        .then((res) => {
          const { data } = res.body;
          expect(data).to.have.property('token');
          expect(data).to.have.property('userId');
          done();
        })
        .catch(err => done(err));
    });

    it('Throw Error for an invalid user', (done) => {
      chai
        .request(server)
        .post(`${route}/signin`)
        .send(invalidEmployee)
        .then((res) => {
          const { status } = res.body;
          expect(res).to.have.property('error');
          expect(status).to.eql('error');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('Admin/Non admin create user account', () => {
    it('Throw Error if non admin wants to create a new account', (done) => {
      chai
        .request(server)
        .post(`${route}/create-user`)
        .auth(nonAdmin.token, { type: 'bearer' })
        .send({
          email: 'newuser@gmail.com',
          password: 'notadmin',
          jobRole: 'Engineer',
        })
        .then((res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql(
            'Unauthorized access: Only admins are permitted',
          );
          done();
        })
        .catch(err => done(err));
    });

    it('Admin can create user account', (done) => {
      chai
        .request(server)
        .post(`${route}/create-user`)
        .auth(admin.token, { type: 'bearer' })
        .send({
          email: 'newuser@gmail.com',
          password: 'notadmin',
          jobRole: 'Engineer',
        })
        .then((res) => {
          const { data } = res.body;
          expect(data).to.have.property('token');
          expect(data).to.have.property('userId');
          const { message } = data;
          expect(message).to.be.eql('User account successfully created');
          done();
        })
        .catch(err => done(err));
    });
  });
});
