import { describe, it, before } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';

import server from '..';
import Article from './Mockups/article';
import Employee from './Mockups/employee';
import Comment from './Mockups/comment';

chai.use(chaiHttp);
should();

const { employee } = new Employee();
const { article } = new Article();
const { comment } = new Comment();
const route = '/api/v1';
const newEmployee = {};
const newArticle = {};
const newComment = {};

describe('EMPLOYEE COMMENT TESTS', () => {
  before((done) => {
    chai
      .request(server)
      .post(`${route}/auth/create-user`)
      .send(employee)
      .then((res) => {
        const { data } = res.body;
        newEmployee.id = data.id;
        newEmployee.token = data.token;
      })
      .then(() => {
        chai
          .request(server)
          .post(`${route}/articles`)
          .auth(newEmployee.token, { type: 'bearer' })
          .send(article)
          .then((res) => {
            const { data } = res.body;
            newArticle.id = data.articleid;
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  describe('POST /articles/articleId/comment', () => {
    it('Employees can comment on an article', (done) => {
      comment.employeeID = newEmployee.id;
      comment.articleID = newArticle.id;
      chai
        .request(server)
        .post(`${route}/articles/${newArticle.id}/comment`)
        .auth(newEmployee.token, { type: 'bearer' })
        .send(comment)
        .then((res) => {
          const { data } = res.body;
          expect(data).have.property('articleTitle');
          expect(data).to.have.property('comment');
          expect(data).to.have.property('article');
          expect(data).to.have.property('createdon');
          const { message } = data;
          expect(message).to.eql('Comment successfully created');
          newComment.id = data.id;
          done();
        })
        .catch(err => done(err));
    });
  });
});
