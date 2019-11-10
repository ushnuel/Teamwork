"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DB = _interopRequireDefault(require("../DB"));

var _Helpers = require("../Helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Comment =
/*#__PURE__*/
function () {
  function Comment() {
    _classCallCheck(this, Comment);
  }

  _createClass(Comment, null, [{
    key: "createArticle",
    value: function () {
      var _createArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref, articleId, employeeId) {
        var comment, query, params, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                comment = _ref.comment;
                query = "\n    INSERT INTO \n    comments_articles(comment,articleid,employeeid)\n    VALUES($1,$2,$3) \n    RETURNING *";
                params = [comment, articleId, employeeId];
                _context.next = 5;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 5:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createArticle(_x, _x2, _x3) {
        return _createArticle.apply(this, arguments);
      }

      return createArticle;
    }()
  }, {
    key: "createGif",
    value: function () {
      var _createGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref2, gifId, employeeId) {
        var comment, query, params, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                comment = _ref2.comment;
                query = "\n    INSERT INTO \n    comments_gifs(comment,gifid,employeeid)\n    VALUES($1,$2,$3) \n    RETURNING *";
                params = [comment, gifId, employeeId];
                _context2.next = 5;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 5:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createGif(_x4, _x5, _x6) {
        return _createGif.apply(this, arguments);
      }

      return createGif;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(articleId) {
        var query, param, comments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n    SELECT\n    id as commentid,\n    employeeid as authorid,\n    comment\n    FROM comments_articles \n    WHERE articleid = $1\n   ";
                param = [articleId];
                _context3.next = 4;
                return _DB["default"].query(query, param, true)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
                comments = _context3.sent;
                return _context3.abrupt("return", comments);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x7) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getGif",
    value: function () {
      var _getGif = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(gifId) {
        var query, param, comments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "\n    SELECT\n    id as commentid,\n    employeeid as authorid,\n    comment\n    FROM comments_gifs \n    WHERE gifid = $1\n   ";
                param = [gifId];
                _context4.next = 4;
                return _DB["default"].query(query, param, true)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
                comments = _context4.sent;
                return _context4.abrupt("return", comments);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getGif(_x8) {
        return _getGif.apply(this, arguments);
      }

      return getGif;
    }()
  }]);

  return Comment;
}();

exports["default"] = Comment;