import { describe, it, before } from 'mocha';
import fs from 'fs';
import server from '..';
import Gif from './Mockups/gif';
import Utils from './Utils';
import Test from './chaiHelpers';

const { gifPost, post } = new Gif();
const newEmployee = {};
const newGif = {};
const utils = new Utils(server);

describe('GIF TESTS', () => {
  before((done) => {
    const employee = {
      email: 'gifemployee@gmail.com',
      password: 'gifemployee',
      jobRole: 'admin',
    };
    const route = '/api/v1/auth/create-user';
    utils
      .createUser(employee, route)
      .then((res) => {
        const { data } = res.body;
        newEmployee.token = data.token;
        done();
      })
      .catch(err => done(err));
  });

  describe('POST /gifs', () => {
    const route = '/api/v1/gifs';
    it('Employees can create and share gif with colleaques', (done) => {
      const file = fs.readFileSync(gifPost.imagePath);
      utils
        .postGif(post, route, newEmployee.token, file, 'giphy.gif')
        .then((res) => {
          Test.gif(res);
          newGif.id = res.body.data.gifid;
          done();
        })
        .catch(err => done(err));
    });

    it('throw error if image is not in gif format', (done) => {
      const file = fs.readFileSync(gifPost.incorrectImagePath);
      utils
        .postGif(post, route, newEmployee.token, file, 'jpeg.jpg')
        .then((res) => {
          Test.error(
            res,
            'Invalid image format: Image should be in a gif format',
          );
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET gifs/:gifId', () => {
    it('Employees can view a specific gif post and its comments(if any)', (done) => {
      utils
        .get(`/api/v1/gifs/${newGif.id}`, newEmployee.token)
        .then((res) => {
          Test.get(res);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET gifs/feed', () => {
    it('Employees can view all gif posts', (done) => {
      utils
        .get('/api/v1/gifs/feed', newEmployee.token)
        .then((res) => {
          Test.feed(res);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('DELETE gifs/:gifId', () => {
    it('Employees can delete their gif posts', (done) => {
      utils
        .delete(`/api/v1/gifs/${newGif.id}`, newEmployee.token)
        .then((res) => {
          Test.delete(res, 'Gif post successfully deleted');
          done();
        })
        .catch(err => done(err));
    });

    it('Throw error if gif does not exist', (done) => {
      utils
        .delete(`/api/v1/gifs/${newGif.id + 1}`, newEmployee.token)
        .then((res) => {
          Test.error(res, 'Gif not found, cannot process request');
          done();
        })
        .catch(err => done(err));
    });
  });
});
