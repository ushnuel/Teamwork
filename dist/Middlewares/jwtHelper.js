"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Config = _interopRequireDefault(require("../Config"));

var _Helpers = require("../Helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JWT =
/*#__PURE__*/
function () {
  function JWT() {
    _classCallCheck(this, JWT);
  }

  _createClass(JWT, null, [{
    key: "createToken",
    value: function createToken(payload) {
      return _jsonwebtoken["default"].sign(payload, _Config["default"].JWT_SECRET);
    }
  }, {
    key: "authorize",
    value: function authorize(req, res, next) {
      try {
        if (!req.headers.authorization) {
          throw new _Helpers.ErrorHandler('Invalid authorization header', 401);
        }

        var token = req.headers.authorization.split(' ')[1];

        if (token) {
          _jsonwebtoken["default"].verify(token, _Config["default"].JWT_SECRET, function (err, decoded) {
            if (err) {
              throw new _Helpers.ErrorHandler('Authentication failed: Invalid token', 401);
            }

            req.user = decoded;

            if (req.body.id && req.body.id !== req.user.userId) {
              throw new _Helpers.ErrorHandler('Invalid user, Permission not granted ', 403);
            }
          });

          next();
        } else {
          throw new _Helpers.ErrorHandler('Authentication failed: No token provided', 401);
        }
      } catch (error) {
        next(error);
      }
    }
  }, {
    key: "authorizeAdmin",
    value: function authorizeAdmin(req, res, next) {
      if (req.user) {
        var status = req.user.status;

        if (status !== _Config["default"].ADMIN) {
          next(new _Helpers.ErrorHandler('Unauthorized access: Only admins are permitted', 403));
        } else {
          next();
        }
      } else {
        next();
      }
    }
  }, {
    key: "hasAccount",
    value: function hasAccount(req, res, next) {
      if (!req.headers.authorization) {
        next();
        return;
      }

      var token = req.headers.authorization.split(' ')[1];

      try {
        if (token) {
          _jsonwebtoken["default"].verify(token, _Config["default"].JWT_SECRET, function (err, decoded) {
            if (err) {
              throw new _Helpers.ErrorHandler('Invalid authorization token', 401);
            }

            req.user = decoded;
            next();
          });
        } else {
          throw new _Helpers.ErrorHandler('Authentication failed: No token provided', 401);
        }
      } catch (error) {
        next(error);
      }
    }
  }]);

  return JWT;
}();

exports["default"] = JWT;