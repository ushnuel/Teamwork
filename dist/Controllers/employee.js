"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _employee = _interopRequireDefault(require("../Models/employee"));

var _jwtHelper = _interopRequireDefault(require("../Middlewares/jwtHelper"));

var _Helpers = require("../Helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmployeeController =
/*#__PURE__*/
function () {
  function EmployeeController() {
    _classCallCheck(this, EmployeeController);
  }

  _createClass(EmployeeController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var error, newEmployee, employee, payload, token, message, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                error = (0, _Helpers.InputValidation)(req);

                if (!error) {
                  _context.next = 4;
                  break;
                }

                throw new _Helpers.ErrorHandler(error, 422);

              case 4:
                _context.next = 6;
                return _employee["default"].getEmployeeEmail(req.body.email);

              case 6:
                newEmployee = _context.sent;

                if (!newEmployee) {
                  _context.next = 9;
                  break;
                }

                throw new _Helpers.ErrorHandler("Employee with email ".concat(newEmployee.email.toUpperCase(), " already exists"));

              case 9:
                _context.next = 11;
                return _employee["default"].create(req.body);

              case 11:
                employee = _context.sent;
                payload = {
                  status: employee.jobrole,
                  email: employee.email,
                  userId: employee.id
                };
                token = _jwtHelper["default"].createToken(payload);
                message = 'User account successfully created';
                data = {
                  token: token,
                  message: message,
                  userId: employee.id
                };

                _Helpers.FeedbackHandler.success(res, 201, data);

                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
      }));

      function signUp(_x, _x2, _x3) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var _req$body, email, password, error, employee, passwordMatched, token, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context2.prev = 1;
                error = (0, _Helpers.InputValidation)(req);

                if (!error) {
                  _context2.next = 5;
                  break;
                }

                throw new _Helpers.ErrorHandler(error, 422);

              case 5:
                _context2.next = 7;
                return _employee["default"].getEmployeeEmail(email);

              case 7:
                employee = _context2.sent;

                if (employee) {
                  _context2.next = 10;
                  break;
                }

                throw new _Helpers.ErrorHandler('Operation failed: Email does not exist', 404);

              case 10:
                _context2.next = 12;
                return _bcrypt["default"].compare(password, employee.password);

              case 12:
                passwordMatched = _context2.sent;

                if (passwordMatched) {
                  _context2.next = 15;
                  break;
                }

                throw new _Helpers.ErrorHandler('Invalid Password: Passwords did not match', 404);

              case 15:
                token = _jwtHelper["default"].createToken({
                  userId: employee.id,
                  status: employee.jobrole,
                  email: employee.email
                });
                data = {
                  token: token,
                  userId: employee.id
                };

                _Helpers.FeedbackHandler.success(res, 200, data);

                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](1);
                next(_context2.t0);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 20]]);
      }));

      function signIn(_x4, _x5, _x6) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return EmployeeController;
}();

exports["default"] = EmployeeController;