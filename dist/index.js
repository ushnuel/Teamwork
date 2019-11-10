"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireWildcard(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _Routes = _interopRequireDefault(require("./Routes"));

var _Config = _interopRequireDefault(require("./Config"));

var _Helpers = require("./Helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable comma-dangle */

/* eslint-disable indent */
var debug = require('debug')('http');

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  next();
});
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use((0, _morgan["default"])('dev'));
app.use('/api/v1', _Routes["default"]);
app.get('/', function (req, res) {
  return res.json({
    message: 'Welcome to Warefarer server API homepage'
  });
});
app.use('*', function (req, res, next) {
  var error = new _Helpers.ErrorHandler('Page Not Found', 404);
  next(error);
});
app.use(_Helpers.FeedbackHandler.error);
app.set('port', _Config["default"].PORT);
app.listen(_Config["default"].PORT, function () {
  debug('Server started on port', _Config["default"].PORT);
});
var _default = app;
exports["default"] = _default;