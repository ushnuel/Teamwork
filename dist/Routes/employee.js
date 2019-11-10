"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _employee = _interopRequireDefault(require("../Controllers/employee"));

var _Middlewares = require("../Middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/create-user', _Middlewares.InputValidator.Validate('signUp'), _Middlewares.Jwt.hasAccount, _Middlewares.Jwt.authorizeAdmin, _employee["default"].signUp);
router.post('/signin', _employee["default"].signIn);
var _default = router;
exports["default"] = _default;