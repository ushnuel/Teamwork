"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _comment = _interopRequireDefault(require("../Controllers/comment"));

var _Middlewares = require("../Middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/articles/:articleId/comment', _Middlewares.InputValidator.Validate('createArticleComment'), _Middlewares.Jwt.authorize, _comment["default"].createArticleComment);
router.post('/gifs/:gifId/comment', _Middlewares.InputValidator.Validate('createGifComment'), _Middlewares.Jwt.authorize, _comment["default"].createGifComment);
var _default = router;
exports["default"] = _default;