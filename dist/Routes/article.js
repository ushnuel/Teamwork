"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _article = _interopRequireDefault(require("../Controllers/article"));

var _Middlewares = require("../Middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', _Middlewares.InputValidator.Validate('createArticle'), _Middlewares.Jwt.authorize, _article["default"].createArticle);
router.get('/feed', _Middlewares.Jwt.authorize, _article["default"].feed);
router.patch('/:articleId', _Middlewares.Jwt.authorize, _article["default"].edit);
router["delete"]('/:articleId', _Middlewares.Jwt.authorize, _article["default"]["delete"]);
router.get('/:articleId', _Middlewares.Jwt.authorize, _article["default"].get);
var _default = router;
exports["default"] = _default;