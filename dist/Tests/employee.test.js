"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _ = _interopRequireDefault(require(".."));

var _employee = _interopRequireDefault(require("./Mockups/employee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var nonAdmin = {};
var admin = {};

_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();

var _ref = new _employee["default"](),
    employee = _ref.employee,
    validEmployee = _ref.validEmployee,
    invalidEmployee = _ref.invalidEmployee;

var route = '/api/v1/auth';
(0, _mocha.describe)('EMPLOYEE AUTHENTICATION TEST', function () {
  (0, _mocha.describe)('Create User Account', function () {
    (0, _mocha.it)('Create an admin account', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/create-user")).send(employee).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).to.have.property('token');
        (0, _chai.expect)(data).to.have.property('userId');
        var message = data.message;
        (0, _chai.expect)(message).to.be.eql('User account successfully created');
        admin.token = data.token;
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    (0, _mocha.it)('Create a non admin account', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/create-user")).send({
        email: 'notadmin@gmail.com',
        password: 'notadmin',
        jobRole: 'Engineer'
      }).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).to.have.property('token');
        (0, _chai.expect)(data).to.have.property('userId');
        var message = data.message;
        (0, _chai.expect)(message).to.be.eql('User account successfully created');
        nonAdmin.token = data.token;
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    (0, _mocha.it)('throw error if employee email already exists', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/create-user")).send(employee).then(function (res) {
        var _res$body = res.body,
            status = _res$body.status,
            error = _res$body.error;
        (0, _chai.expect)(status).to.eql('error');
        (0, _chai.expect)(error).to.be.eql("Employee with email ".concat(employee.email.toUpperCase(), " already exists"));
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('Sign in feature', function () {
    (0, _mocha.it)('Admin can sign in', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/signin")).send(validEmployee).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).to.have.property('token');
        (0, _chai.expect)(data).to.have.property('userId');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    (0, _mocha.it)('Throw Error for an invalid user', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/signin")).send(invalidEmployee).then(function (res) {
        var status = res.body.status;
        (0, _chai.expect)(res).to.have.property('error');
        (0, _chai.expect)(status).to.eql('error');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
  (0, _mocha.describe)('Admin/Non admin create user account', function () {
    (0, _mocha.it)('Throw Error if non admin wants to create a new account', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/create-user")).auth(nonAdmin.token, {
        type: 'bearer'
      }).send({
        email: 'newuser@gmail.com',
        password: 'notadmin',
        jobRole: 'Engineer'
      }).then(function (res) {
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error).to.eql('Unauthorized access: Only admins are permitted');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
    (0, _mocha.it)('Admin can create user account', function (done) {
      _chai["default"].request(_["default"]).post("".concat(route, "/create-user")).auth(admin.token, {
        type: 'bearer'
      }).send({
        email: 'newuser@gmail.com',
        password: 'notadmin',
        jobRole: 'Engineer'
      }).then(function (res) {
        var data = res.body.data;
        (0, _chai.expect)(data).to.have.property('token');
        (0, _chai.expect)(data).to.have.property('userId');
        var message = data.message;
        (0, _chai.expect)(message).to.be.eql('User account successfully created');
        done();
      })["catch"](function (err) {
        return done(err);
      });
    });
  });
});