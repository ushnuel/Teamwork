"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireWildcard(require("cloudinary"));

var _datauri = _interopRequireDefault(require("datauri"));

var _Config = _interopRequireDefault(require("../Config"));

var _Helpers = require("../Helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var datauri = new _datauri["default"]();

var Cloudinary =
/*#__PURE__*/
function () {
  function Cloudinary() {
    _classCallCheck(this, Cloudinary);
  }

  _createClass(Cloudinary, null, [{
    key: "upload",
    value: function upload(req, res, next) {
      try {
        if (!req.file) {
          throw new _Helpers.ErrorHandler('Please include an image gif', 400);
        }

        if (req.file.mimetype !== 'image/gif') {
          throw new _Helpers.ErrorHandler('Invalid image format: Image should be in a gif format', 400);
        }

        var image = datauri.format('.gif', req.file.buffer).content;

        _cloudinary["default"].config(_Config["default"].CLOUDINARY);

        _cloudinary.uploader.upload(image).then(function (response) {
          req.body.image_url = response.url;
          next();
        })["catch"](function (err) {
          return next(err);
        });
      } catch (error) {
        next(error);
      }
    }
  }]);

  return Cloudinary;
}();

exports["default"] = Cloudinary;