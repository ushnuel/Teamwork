import { describe, it, before } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';

import server from '..';
import Gif from './Mockups/gif';
import Employee from './Mockups/employee';

chai.use(chaiHttp);
should();
const { gifPost, post } = new Gif();
const { employee } = new Employee();
const route = '/api/v1';
const newEmployee = {};

describe('GIF TESTS', () => {
  before((done) => {
    chai
      .request(server)
      .post(`${route}/auth/create-user`)
      .send(employee)
      .then((res) => {
        const { data } = res.body;
        newEmployee.token = data.token;
        done();
      })
      .catch(err => done(err));
  });

  describe('POST /gifs', () => {
    it('Employees can create and share gif with colleaques', (done) => {
      const file = fs.readFileSync(gifPost.imagePath);
      chai
        .request(server)
        .post(`${route}/gifs`)
        .auth(newEmployee.token, { type: 'bearer' })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('title', post.title)
        .attach('image', file, 'giphy.gif')
        .then((res) => {
          const { data } = res.body;
          expect(data).have.property('image_url');
          expect(data).to.have.property('gifid');
          expect(data).to.have.property('createdon');

          const { message } = data;
          expect(message).to.eql('GIF image successfully posted');
          done();
        })
        .catch(err => done(err));
    });

    it('throw error if image is not in gif format', (done) => {
      const file = fs.readFileSync(gifPost.incorrectImagePath);
      chai
        .request(server)
        .post(`${route}/gifs`)
        .auth(newEmployee.token, { type: 'bearer' })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('title', post.title)
        .attach('image', file, 'jpeg.jpg')
        .then((res) => {
          expect(res.body).have.property('error');

          const { error } = res.body;
          expect(error).to.eql(
            'Invalid image format: Image should be in a gif format',
          );
          done();
        })
        .catch(err => done(err));
    });
  });
});
