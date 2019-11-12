/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

export default class Test {
  static employee(response) {
    const { data } = response.body;
    expect(data).to.have.property('token');
    expect(data).to.have.property('userId');
    const { message } = data;
    if (message) expect(message).to.be.eql('User account successfully created');
  }

  static error(response, message) {
    const { error, status } = response.body;
    expect(status).to.eql('error');
    expect(response.body).to.have.property('error');
    if (message) {
      expect(error).to.eql(message);
    }
  }

  static gif(response) {
    const { data } = response.body;
    expect(data).have.property('image_url');
    expect(data).to.have.property('gifid');
    expect(data).to.have.property('createdon');
    const { message } = data;
    if (message) expect(message).to.eql('GIF image successfully posted');
  }

  static article(response) {
    const { data } = response.body;
    expect(data).have.property('title');
    expect(data).to.have.property('articleid');
    expect(data).to.have.property('createdon');
    const { message } = data;
    if (message) expect(message).to.eql('Article successfully posted');
  }

  static comment(response) {
    const { data } = response.body;
    expect(data).to.have.property('comment');
    if (data.article) {
      expect(data).to.have.property('articleTitle');
      expect(data).to.have.property('article');
    }
    if (data.gifTitle) {
      expect(data).have.property('gifTitle');
    }
    expect(data).to.have.property('createdon');
    const { message } = data;
    expect(message).to.eql('Comment successfully created');
  }

  static get(response) {
    const { data } = response.body;
    expect(data).have.property('comments');
    expect(data.comments).to.be.an('array');
  }

  static feed(response) {
    const { data } = response.body;
    expect(data).to.be.an('array').and.not.empty;
  }

  static delete(response, msg) {
    const { data } = response.body;
    const { message } = data;
    expect(message).to.eql(msg);
  }

  static edit(response, edited, msg) {
    const { data } = response.body;
    expect(data.title).to.be.eql(edited.title);
    expect(data.article).to.be.eql(edited.article);
    const { message } = data;
    expect(message).to.eql(msg);
  }
}
