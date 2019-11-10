"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _comment = _interopRequireDefault(require("../Models/comment"));

var _article = _interopRequireDefault(require("../Models/article"));

var _Helpers = require("../Helpers");

var _gif = _interopRequireDefault(require("../Models/gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CommentController =
/*#__PURE__*/
function () {
  function CommentController() {
    _classCallCheck(this, CommentController);
  }

  _createClass(CommentController, null, [{
    key: "createArticleComment",
    value: function () {
      var _createArticleComment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var error, article, comment, message, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                error = (0, _Helpers.InputValidation)(req);

                if (!error) {
                  _context.next = 4;
                  break;
                }

                throw new _Helpers.ErrorHandler(error, 422);

              case 4:
                _context.next = 6;
                return _article["default"].get(req.params.articleId);

              case 6:
                article = _context.sent;
                _context.next = 9;
                return _comment["default"].createArticle(req.body, article.id, req.user.userId);

              case 9:
                comment = _context.sent;
                message = 'Comment successfully created';
                data = _objectSpread({}, comment, {
                  articleTitle: article.title,
                  article: article.article,
                  message: message
                });

                _Helpers.FeedbackHandler.success(res, 201, data);

                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 15]]);
      }));

      function createArticleComment(_x, _x2, _x3) {
        return _createArticleComment.apply(this, arguments);
      }

      return createArticleComment;
    }()
  }, {
    key: "createGifComment",
    value: function () {
      var _createGifComment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var error, gif, comment, message, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                error = (0, _Helpers.InputValidation)(req);

                if (!error) {
                  _context2.next = 4;
                  break;
                }

                throw new _Helpers.ErrorHandler(error, 422);

              case 4:
                _context2.next = 6;
                return _gif["default"].get(req.params.gifId);

              case 6:
                gif = _context2.sent;
                _context2.next = 9;
                return _comment["default"].createGif(req.body, gif.id, req.user.userId);

              case 9:
                comment = _context2.sent;
                message = 'Comment successfully created';
                data = _objectSpread({}, comment, {
                  gifTitle: gif.title,
                  message: message
                });

                _Helpers.FeedbackHandler.success(res, 201, data);

                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                next(_context2.t0);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 15]]);
      }));

      function createGifComment(_x4, _x5, _x6) {
        return _createGifComment.apply(this, arguments);
      }

      return createGifComment;
    }()
  }]);

  return CommentController;
}();

exports["default"] = CommentController;