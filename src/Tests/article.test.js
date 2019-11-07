/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';

import server from '..';
import Article from './Mockups/article';

chai.use(chaiHttp);
should();

const { article, editedArticle } = new Article();
const route = '/api/v1';
const newEmployee = {};
const newArticle = {};

describe('ARTICLE TESTS', () => {
  before((done) => {
    chai
      .request(server)
      .post(`${route}/auth/create-user`)
      .send({
        email: 'articleemployee@gmail.com',
        password: 'articleemployee',
        jobRole: 'Doctor',
      })
      .then((res) => {
        const { data } = res.body;
        newEmployee.token = data.token;
        done();
      })
      .catch(err => done(err));
  });

  describe('POST /articles', () => {
    it('Employees can create and/or share articles with colleaques', (done) => {
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

  describe('GET articles/feed', () => {
    it('Employees can view all articles', (done) => {
      chai
        .request(server)
        .get(`${route}/articles/feed`)
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

  describe('GET articles/:articleId', () => {
    it('Employees can view a specific article and its comments(if any)', (done) => {
      chai
        .request(server)
        .get(`${route}/articles/${newArticle.id}`)
        .auth(newEmployee.token, { type: 'bearer' })
        .then((res) => {
          const { data } = res.body;
          expect(data).to.have.property('id');
          expect(data).have.property('comments');
          expect(data.comments).to.be.an('array');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('DELETE articles/:articleId', () => {
    it('Employees can delete their own articles', (done) => {
      chai
        .request(server)
        .delete(`${route}/articles/${newArticle.id}`)
        .auth(newEmployee.token, { type: 'bearer' })
        .then((res) => {
          const { message } = res.body.data;
          expect(message).to.eql('Article successfully deleted');
          done();
        })
        .catch(err => done(err));
    });
  });
});
