"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _gif = _interopRequireDefault(require("../Controllers/gif"));

var _Middlewares = require("../Middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();

var storage = _multer["default"].memoryStorage();

var uploadImage = (0, _multer["default"])({
  storage: storage
}).single('image');
router.post('/', uploadImage, _Middlewares.cloudinary.upload, _gif["default"].createGif);
router.get('/feed', _gif["default"].feed);
router["delete"]('/:gifId', _gif["default"]["delete"]);
router.get('/:gifId', _gif["default"].get);
var _default = router;
exports["default"] = _default;