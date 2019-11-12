import { describe, it, before } from 'mocha';
import fs from 'fs';
import Utils from './Utils';
import Test from './chaiHelpers';
import server from '..';
import Article from './Mockups/article';
import Comment from './Mockups/comment';
import Gif from './Mockups/gif';

const { article } = new Article();
const { comment } = new Comment();
const { post, gifPost } = new Gif();
const newEmployee = {};
const newArticle = {};
const newGif = {};
const utils = new Utils(server);

describe('EMPLOYEE COMMENT TESTS', () => {
  before((done) => {
    const employee = {
      email: 'employeecomment@gmail.com',
      password: 'employeecomment',
      jobRole: 'admin',
    };
    utils
      .createUser(employee, '/api/v1/auth/create-user')
      .then((res) => {
        const { data } = res.body;
        newEmployee.token = data.token;
      })
      .then(() => {
        utils
          .post('/api/v1/articles', newEmployee.token, article)
          .then((res) => {
            const { data } = res.body;
            newArticle.id = data.articleid;
          })
          .catch(err => done(err));
      })
      .then(() => {
        const file = fs.readFileSync(gifPost.imagePath);
        utils
          .postGif(post, '/api/v1/gifs', newEmployee.token, file, 'giph.gif')
          .then((res) => {
            const { data } = res.body;
            newGif.id = data.gifid;
            done();
          })
          .catch(error => done(error));
      })
      .catch(error => done(error));
  });

  describe('POST /articles/articleId/comment', () => {
    it('Employees can comment on an article', (done) => {
      utils
        .post(
          `/api/v1/articles/${newArticle.id}/comment`,
          newEmployee.token,
          comment,
        )
        .then((res) => {
          Test.comment(res);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('POST /gifs/gifId/comment', () => {
    it('Employees can comment on a gif post', (done) => {
      utils
        .post(`/api/v1/gifs/${newGif.id}/comment`, newEmployee.token, comment)
        .then((res) => {
          Test.comment(res);
          done();
        })
        .catch(err => done(err));
    });
  });
});
