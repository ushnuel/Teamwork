"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var validate = function validate(req) {
  var errors = (0, _expressValidator.validationResult)(req);
  var message;

  if (!errors.isEmpty()) {
    message = errors.array()[0].msg;
  }

  return message;
};

var _default = validate;
exports["default"] = _default;