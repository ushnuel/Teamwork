import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

export default class Utils {
  constructor(server) {
    this.server = server;
  }

  async createUser(employee, route) {
    const res = await chai
      .request(this.server)
      .post(route)
      .send(employee);
    return res;
  }

  async signIn(employee, route) {
    const res = await chai
      .request(this.server)
      .post(route)
      .send(employee);
    return res;
  }

  async authUser(employee, route, token) {
    const res = await chai
      .request(this.server)
      .post(route)
      .send(employee)
      .auth(token, { type: 'bearer' });
    return res;
  }

  async postGif(post, route, token, file, name) {
    const res = await chai
      .request(this.server)
      .post(route)
      .auth(token, { type: 'bearer' })
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('title', post.title)
      .attach('image', file, name);
    return res;
  }

  async get(route, token) {
    const res = await chai
      .request(this.server)
      .get(route)
      .auth(token, { type: 'bearer' });
    return res;
  }

  async delete(route, token) {
    const res = await chai
      .request(this.server)
      .delete(route)
      .auth(token, { type: 'bearer' });
    return res;
  }

  async post(route, token, data) {
    const res = await chai
      .request(this.server)
      .post(route)
      .auth(token, { type: 'bearer' })
      .send(data);
    return res;
  }

  async patch(route, token, data) {
    const res = await chai
      .request(this.server)
      .patch(route)
      .auth(token, { type: 'bearer' })
      .send(data);
    return res;
  }
}
