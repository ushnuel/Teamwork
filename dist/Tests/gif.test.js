"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _fs = _interopRequireDefault(require("fs"));

var _ = _interopRequireDefault(require(".."));

var _gif = _interopRequireDefault(require("./Mockups/gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-unused-expressions */
_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();

var _ref = new _gif["default"](),
    gifPost = _ref.gifPost,
    post = _ref.post;

var route = '/api/v1';
var newEmployee = {};
var newGif = {};
(0, _mocha.describe)('GIF TESTS', function () {
  (0, _mocha.before)(function (done) {
    _chai["default"].request(_["default"]).post("".concat(route, "/auth/create-user")).send({
      email: 'gifemployee@gmail.com',
      password: 'gifemployee',
      jobRole: 'admin'
    }).then(function (res) {
      var data = res.body.data;
      newEmployee.token = data.token;
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  (0, _mocha.describe)('POST /gifs', function () {
    (0, _mocha.it)('Employees can create and share gif with colleaques', function (done) {
      var file = _fs["default"].readFileSync(gifPost.imagePath);

      _chai["default"].request(_["default"]).post("".concat(route, "/gifs")).auth(newEmployee.token, {
        type: 'bearer'
      }).set('Content-Type', 'application/x-www-form-urlencoded').field('title', post.title).attach('image', file, 'giphy.gif').then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).have.property('image_url');
        (0, _chai.expect)(data).to.have.property('gifid');
        (0, _chai.expect)(data).to.have.property('createdon');
        var message = data.message;
        (0, _chai.expect)(message).to.eql('GIF image successfully posted');
        newGif.id = data.gifid;
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    (0, _mocha.it)('throw error if image is not in gif format', function (done) {
      var file = _fs["default"].readFileSync(gifPost.incorrectImagePath);

      _chai["default"].request(_["default"]).post("".concat(route, "/gifs")).auth(newEmployee.token, {
        type: 'bearer'
      }).set('Content-Type', 'application/x-www-form-urlencoded').field('title', post.title).attach('image', file, 'jpeg.jpg').then(function (res) {
        (0, _chai.expect)(res.body).have.property('error');
        var error = res.body.error;
        (0, _chai.expect)(error).to.eql('Invalid image format: Image should be in a gif format');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('GET gifs/:gifId', function () {
    (0, _mocha.it)('Employees can view a specific gif post and its comments(if any)', function (done) {
      _chai["default"].request(_["default"]).get("".concat(route, "/gifs/").concat(newGif.id)).auth(newEmployee.token, {
        type: 'bearer'
      }).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).have.property('comments');
        (0, _chai.expect)(data.comments).to.be.an('array');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('GET gifs/feed', function () {
    (0, _mocha.it)('Employees can view all gif posts', function (done) {
      _chai["default"].request(_["default"]).get("".concat(route, "/gifs/feed")).auth(newEmployee.token, {
        type: 'bearer'
      }).then(function (res) {
        var _res$body = res.body,
            data = _res$body.data,
            status = _res$body.status;
        (0, _chai.expect)(status).to.eql('success');
        (0, _chai.expect)(data).to.be.an('array').and.not.empty;
        done();
      })["catch"](function (error) {
        return done(error);
      });
    });
  });
  (0, _mocha.describe)('DELETE /gifs/:gifId', function () {
    (0, _mocha.it)('Employees can delete their gif posts', function (done) {
      _chai["default"].request(_["default"])["delete"]("".concat(route, "/gifs/").concat(newGif.id)).auth(newEmployee.token, {
        type: 'bearer'
      }).then(function (res) {
        var message = res.body.data.message;
        (0, _chai.expect)(message).to.eql('Gif post successfully deleted');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    (0, _mocha.it)('Throw error if gif does not exist', function (done) {
      _chai["default"].request(_["default"])["delete"]("".concat(route, "/gifs/").concat(newGif.id + 1)).auth(newEmployee.token, {
        type: 'bearer'
      }).then(function (res) {
        (0, _chai.expect)(res.body).to.have.property('error');
        var error = res.body.error;
        (0, _chai.expect)(error).to.eql('Gif not found, cannot process request');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
});