"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _ = _interopRequireDefault(require(".."));

var _article = _interopRequireDefault(require("./Mockups/article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-unused-expressions */
_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();

var _ref = new _article["default"](),
    article = _ref.article,
    editedArticle = _ref.editedArticle;

var route = '/api/v1';
var newEmployee = {};
var newArticle = {};
(0, _mocha.describe)('ARTICLE TESTS', function () {
  (0, _mocha.before)(function (done) {
    _chai["default"].request(_["default"]).post("".concat(route, "/auth/create-user")).send({
      email: 'articleemployee@gmail.com',
      password: 'articleemployee',
      jobRole: 'Doctor'
    }).then(function (res) {
      var data = res.body.data;
      newEmployee.token = data.token;
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  (0, _mocha.describe)('POST /articles', function () {
    (0, _mocha.it)('Employees can create and/or share articles with colleaques', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/articles")).auth(newEmployee.token, {
        type: 'bearer'
      }).send(article).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).have.property('title');
        (0, _chai.expect)(data).to.have.property('articleid');
        (0, _chai.expect)(data).to.have.property('createdon');
        var message = data.message;
        (0, _chai.expect)(message).to.eql('Article successfully posted');
        newArticle.id = data.articleid;
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('PATCH articles/:articleId', function () {
    (0, _mocha.it)('Employees can edit their own articles', function (done) {
      _chai["default"].request(_["default"]).patch("".concat(route, "/articles/").concat(newArticle.id)).auth(newEmployee.token, {
        type: 'bearer'
      }).send(editedArticle).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data.title).to.be.eql(editedArticle.title);
        (0, _chai.expect)(data.article).to.be.eql(editedArticle.article);
        var message = data.message;
        (0, _chai.expect)(message).to.eql('Article successfully updated');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('GET articles/feed', function () {
    (0, _mocha.it)('Employees can view all articles', function (done) {
      _chai["default"].request(_["default"]).get("".concat(route, "/articles/feed")).auth(newEmployee.token, {
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
  (0, _mocha.describe)('GET articles/:articleId', function () {
    (0, _mocha.it)('Employees can view a specific article and its comments(if any)', function (done) {
      _chai["default"].request(_["default"]).get("".concat(route, "/articles/").concat(newArticle.id)).auth(newEmployee.token, {
        type: 'bearer'
      }).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).to.have.property('id');
        (0, _chai.expect)(data).have.property('comments');
        (0, _chai.expect)(data.comments).to.be.an('array');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('DELETE articles/:articleId', function () {
    (0, _mocha.it)('Employees can delete their own articles', function (done) {
      _chai["default"].request(_["default"])["delete"]("".concat(route, "/articles/").concat(newArticle.id)).auth(newEmployee.token, {
        type: 'bearer'
      }).then(function (res) {
        var message = res.body.data.message;
        (0, _chai.expect)(message).to.eql('Article successfully deleted');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
});