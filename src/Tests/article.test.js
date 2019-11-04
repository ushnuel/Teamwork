import { describe, it, before } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';

import server from '..';
import Article from './Mockups/article';
import Employee from './Mockups/employee';

chai.use(chaiHttp);
should();

const { employee } = new Employee();
const { article, editedArticle } = new Article();
const route = '/api/v1';
const newEmployee = {};
const newArticle = {};

describe('ARTICLE TESTS', () => {
  before((done) => {
    chai
      .request(server)
      .post(`${route}/auth/create-user`)
      .send(employee)
      .then((res) => {
        const { data } = res.body;
        newEmployee.id = data.id;
        newEmployee.token = data.token;
        done();
      })
      .catch(err => done(err));
  });

  describe('POST /articles', () => {
    it('Employees can create and/or share articles with colleaques', (done) => {
      article.employeeID = newEmployee.id;
      chai
        .request(server)
        .post(`${route}/articles`)
        .auth(newEmployee.token, { type: 'bearer' })
        .send(article)
        .then((res) => {
          const { data } = res.body;
          expect(data).have.property('title');
          expect(data).to.have.property('articleid');
          expect(data).to.have.property('createdon');
          const { message } = data;
          expect(message).to.eql('Article successfully posted');
          newArticle.id = data.articleid;
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('PATCH articles/:articleId', () => {
    it('Employees can edit their own articles', (done) => {
      chai
        .request(server)
        .patch(`${route}/articles/${newArticle.id}`)
        .auth(newEmployee.token, { type: 'bearer' })
        .send(editedArticle)
        .then((res) => {
          const { data } = res.body;
          expect(data.title).to.be.eql(editedArticle.title);
          expect(data.article).to.be.eql(editedArticle.article);
          const { message } = data;
          expect(message).to.eql('Article successfully updated');
          done();
        })
        .catch(err => done(err));
    });
  });
});
