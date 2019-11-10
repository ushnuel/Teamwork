"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _employee = _interopRequireDefault(require("./employee"));

var _gif = _interopRequireDefault(require("./gif"));

var _article = _interopRequireDefault(require("./article"));

var _comment = _interopRequireDefault(require("./comment"));

var _Middlewares = require("../Middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.use('/auth', _employee["default"]);
router.use('/gifs', _Middlewares.Jwt.authorize, _gif["default"]);
router.use('/articles', _article["default"]);
router.use('/', _comment["default"]);
var _default = router;
exports["default"] = _default;