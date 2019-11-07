import { describe, it, before } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';

import server from '..';
import Article from './Mockups/article';
import Comment from './Mockups/comment';
import Gif from './Mockups/gif';

chai.use(chaiHttp);
should();

const { article } = new Article();
const { comment } = new Comment();
const { post, gifPost } = new Gif();
const route = '/api/v1';
const newEmployee = {};
const newArticle = {};
const newComment = {};
const newGif = {};

describe('EMPLOYEE COMMENT TESTS', () => {
  before((done) => {
    chai
      .request(server)
      .post(`${route}/auth/create-user`)
      .send({
        email: 'employeecomment@gmail.com',
        password: 'employeecomment',
        jobRole: 'admin',
      })
      .then((res) => {
        const { data } = res.body;
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
          })
          .catch(err => done(err));
      })
      .then(() => {
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
            newGif.id = data.gifid;
            done();
          })
          .catch(error => done(error));
      })
      .catch(error => done(error));
  });

  describe('POST /articles/articleId/comment', () => {
    it('Employees can comment on an article', (done) => {
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

  describe('POST /gifs/gifId/comment', () => {
    it('Employees can comment on a gif post', (done) => {
      chai
        .request(server)
        .post(`${route}/gifs/${newGif.id}/comment`)
        .auth(newEmployee.token, { type: 'bearer' })
        .send(comment)
        .then((res) => {
          const { data } = res.body;
          expect(data).have.property('gifTitle');
          expect(data).to.have.property('comment');
          expect(data).to.have.property('createdon');
          const { message } = data;
          expect(message).to.eql('Comment successfully created');
          done();
        })
        .catch(err => done(err));
    });
  });
});
