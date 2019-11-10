"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _DB = _interopRequireDefault(require("../DB"));

var _Helpers = require("../Helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Employee =
/*#__PURE__*/
function () {
  function Employee() {
    _classCallCheck(this, Employee);
  }

  _createClass(Employee, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var firstName, lastName, jobRole, email, password, department, address, gender, query, encryptedPswd, params, employee;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                firstName = _ref.firstName, lastName = _ref.lastName, jobRole = _ref.jobRole, email = _ref.email, password = _ref.password, department = _ref.department, address = _ref.address, gender = _ref.gender;
                query = "\n    INSERT \n    INTO \n    employees (firstName, lastName, jobRole, email, password, department, address, gender)\n    VALUES($1,$2,$3,$4,$5,$6,$7,$8)\n    RETURNING *";
                _context.next = 4;
                return _bcrypt["default"].hash(password, 10);

              case 4:
                encryptedPswd = _context.sent;
                params = [firstName, lastName, jobRole, email, encryptedPswd, department, address, gender];
                _context.next = 8;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 8:
                employee = _context.sent;
                return _context.abrupt("return", employee);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getEmployeeEmail",
    value: function () {
      var _getEmployeeEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(email) {
        var query, param, employee;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n    SELECT \n    * \n    FROM employees\n    WHERE email = $1";
                param = [email];
                _context2.next = 4;
                return _DB["default"].query(query, param)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
                employee = _context2.sent;
                return _context2.abrupt("return", employee);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getEmployeeEmail(_x2) {
        return _getEmployeeEmail.apply(this, arguments);
      }

      return getEmployeeEmail;
    }()
  }]);

  return Employee;
}();

exports["default"] = Employee;