import { describe, it, before } from 'mocha';
import Test from './chaiHelpers';
import Utils from './Utils';
import server from '..';
import Article from './Mockups/article';

const { article, editedArticle } = new Article();
const newEmployee = {};
const newArticle = {};
const utils = new Utils(server);

describe('ARTICLE TESTS', () => {
  before((done) => {
    const route = '/api/v1/auth/create-user';
    const employee = {
      email: 'articleemployee@gmail.com',
      password: 'articleemployee',
      jobRole: 'Doctor',
    };
    utils
      .createUser(employee, route)
      .then((res) => {
        const { data } = res.body;
        newEmployee.token = data.token;
        done();
      })
      .catch(err => done(err));
  });

  describe('POST /articles', () => {
    const route = '/api/v1/articles';
    it('Employees can create and/or share articles with colleaques', (done) => {
      utils
        .post(route, newEmployee.token, article)
        .then((res) => {
          Test.article(res);
          const { data } = res.body;
          newArticle.id = data.articleid;
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('PATCH articles/:articleId', () => {
    it('Employees can edit their own articles', (done) => {
      const route = `/api/v1/articles/${newArticle.id}`;
      utils
        .patch(route, newEmployee.token, editedArticle)
        .then((res) => {
          Test.edit(res, editedArticle, 'Article successfully updated');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /feed', () => {
    it('Employees can view all articles', (done) => {
      utils
        .get('/api/v1/feed', newEmployee.token)
        .then((res) => {
          Test.feed(res);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('GET articles/:articleId', () => {
    it('Employees can view a specific article and its comments(if any)', (done) => {
      utils
        .get(`/api/v1/articles/${newArticle.id}`, newEmployee.token)
        .then((res) => {
          Test.get(res);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('DELETE articles/:articleId', () => {
    it('Employees can delete their own articles', (done) => {
      utils
        .delete(`/api/v1/articles/${newArticle.id}`, newEmployee.token)
        .then((res) => {
          Test.delete(res, 'Article successfully deleted');
          done();
        })
        .catch(err => done(err));
    });
  });
});
