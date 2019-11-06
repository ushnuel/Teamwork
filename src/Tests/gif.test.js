/* eslint-disable no-unused-expressions */
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
const newGif = {};

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
          newGif.id = data.gifid;
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

  describe('GET gifs/feed', () => {
    it('Employees can view all gif posts', (done) => {
      chai
        .request(server)
        .get(`${route}/gifs/feed`)
        .auth(newEmployee.token, { type: 'bearer' })
        .then((res) => {
          const { data, status } = res.body;
          expect(status).to.eql('success');
          expect(data).to.be.an('array').and.not.empty;
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('DELETE /gifs/:gifId', () => {
    it('Employees can delete their gif posts', (done) => {
      chai
        .request(server)
        .delete(`${route}/gifs/${newGif.id}`)
        .auth(newEmployee.token, { type: 'bearer' })
        .then((res) => {
          const { message } = res.body.data;
          expect(message).to.eql('Gif post successfully deleted');
          done();
        })
        .catch(err => done(err));
    });

    it('Throw error if gif does not exist', (done) => {
      chai
        .request(server)
        .delete(`${route}/gifs/${newGif.id + 1}`)
        .auth(newEmployee.token, { type: 'bearer' })
        .then((res) => {
          expect(res.body).to.have.property('error');
          const { error } = res.body;
          expect(error).to.eql('Gif not found, cannot process request');
          done();
        })
        .catch(err => done(err));
    });

    it('Throw error if there are no gif post present in the database', (done) => {
      chai
        .request(server)
        .get(`${route}/gifs/feed`)
        .auth(newEmployee.token, { type: 'bearer' })
        .then((res) => {
          const { error, status } = res.body;
          expect(status).to.eql('error');
          expect(error).to.be.eql(
            'There are no gif posts available. Create one now!',
          );
          done();
        })
        .catch(error => done(error));
    });
  });
});
