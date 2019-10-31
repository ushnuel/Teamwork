import { describe, it } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';

import server from '..';
import Employee from './Mockups/employee';

chai.use(chaiHttp);
should();
const { employee, validEmployee, invalidEmployee } = new Employee();
const route = '/api/v1/auth';

describe('EMPLOYEE AUTHENTICATION TEST', () => {
  describe('Create User Account', () => {
    it('Only Admin should create user account', (done) => {
      chai
        .request(server)
        .post(`${route}/create-user`)
        .send(employee)
        .then((res) => {
          res.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.eql('success');
          expect(data).to.be.an('object');
          expect(data).to.have.property('token');
          expect(data).to.have.property('userId');

          const { message } = data;
          expect(message).to.be.eql('User account successfully created');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('Sign in feature', () => {
    it('Admin/Employee can sign in', (done) => {
      chai
        .request(server)
        .post(`${route}/signin`)
        .send(validEmployee)
        .then((res) => {
          res.should.be.an('object');
          const { data, status } = res.body;
          expect(status).to.eql('success');
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
});
