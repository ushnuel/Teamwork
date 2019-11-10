"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _fs = _interopRequireDefault(require("fs"));

var _ = _interopRequireDefault(require(".."));

var _article = _interopRequireDefault(require("./Mockups/article"));

var _comment = _interopRequireDefault(require("./Mockups/comment"));

var _gif = _interopRequireDefault(require("./Mockups/gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();

var _ref = new _article["default"](),
    article = _ref.article;

var _ref2 = new _comment["default"](),
    comment = _ref2.comment;

var _ref3 = new _gif["default"](),
    post = _ref3.post,
    gifPost = _ref3.gifPost;

var route = '/api/v1';
var newEmployee = {};
var newArticle = {};
var newComment = {};
var newGif = {};
(0, _mocha.describe)('EMPLOYEE COMMENT TESTS', function () {
  (0, _mocha.before)(function (done) {
    _chai["default"].request(_["default"]).post("".concat(route, "/auth/create-user")).send({
      email: 'employeecomment@gmail.com',
      password: 'employeecomment',
      jobRole: 'admin'
    }).then(function (res) {
      var data = res.body.data;
      newEmployee.token = data.token;
    }).then(function () {
      _chai["default"].request(_["default"]).post("".concat(route, "/articles")).auth(newEmployee.token, {
        type: 'bearer'
      }).send(article).then(function (res) {
        var data = res.body.data;
        newArticle.id = data.articleid;
      })["catch"](function (err) {
        return done(err);
      });
    }).then(function () {
      var file = _fs["default"].readFileSync(gifPost.imagePath);

      _chai["default"].request(_["default"]).post("".concat(route, "/gifs")).auth(newEmployee.token, {
        type: 'bearer'
      }).set('Content-Type', 'application/x-www-form-urlencoded').field('title', post.title).attach('image', file, 'giphy.gif').then(function (res) {
        var data = res.body.data;
        newGif.id = data.gifid;
        done();
      })["catch"](function (error) {
        return done(error);
      });
    })["catch"](function (error) {
      return done(error);
    });
  });
  (0, _mocha.describe)('POST /articles/articleId/comment', function () {
    (0, _mocha.it)('Employees can comment on an article', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/articles/").concat(newArticle.id, "/comment")).auth(newEmployee.token, {
        type: 'bearer'
      }).send(comment).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).have.property('articleTitle');
        (0, _chai.expect)(data).to.have.property('comment');
        (0, _chai.expect)(data).to.have.property('article');
        (0, _chai.expect)(data).to.have.property('createdon');
        var message = data.message;
        (0, _chai.expect)(message).to.eql('Comment successfully created');
        newComment.id = data.id;
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('POST /gifs/gifId/comment', function () {
    (0, _mocha.it)('Employees can comment on a gif post', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/gifs/").concat(newGif.id, "/comment")).auth(newEmployee.token, {
        type: 'bearer'
      }).send(comment).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).have.property('gifTitle');
        (0, _chai.expect)(data).to.have.property('comment');
        (0, _chai.expect)(data).to.have.property('createdon');
        var message = data.message;
        (0, _chai.expect)(message).to.eql('Comment successfully created');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
});