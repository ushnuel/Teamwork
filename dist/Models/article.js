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

var Article =
/*#__PURE__*/
function () {
  function Article() {
    _classCallCheck(this, Article);
  }

  _createClass(Article, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref, employeeId) {
        var title, article, query, params, createdArticle;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                title = _ref.title, article = _ref.article;
                query = "\n    INSERT \n    INTO articles (\n      title,\n      article,\n      employeeID\n    )\n    VALUES($1,$2,$3)\n    RETURNING *";
                params = [title, article, employeeId];
                _context.next = 5;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 5:
                createdArticle = _context.sent;
                return _context.abrupt("return", createdArticle);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "edit",
    value: function () {
      var _edit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(employeeId, _ref2, articleId) {
        var title, article, query, params, editedArticle;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                title = _ref2.title, article = _ref2.article;
                query = "\n    UPDATE \n    articles\n    SET title = $1, article = $2\n    WHERE articleid = $3 AND employeeid = $4\n    RETURNING *";
                params = [title, article, articleId, employeeId];
                _context2.next = 5;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 5:
                editedArticle = _context2.sent;
                return _context2.abrupt("return", editedArticle);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function edit(_x3, _x4, _x5) {
        return _edit.apply(this, arguments);
      }

      return edit;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(articleId) {
        var query, param, article;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n    SELECT \n    articleid as id,\n    employeeid as authorid,\n    title,\n    createdon,\n    article\n    FROM articles\n    WHERE articleid = $1";
                param = [articleId];
                _context3.next = 4;
                return _DB["default"].query(query, param)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
                article = _context3.sent;

                if (article) {
                  _context3.next = 7;
                  break;
                }

                throw new _Helpers.ErrorHandler('Article not found, request cannot be processed', 404);

              case 7:
                return _context3.abrupt("return", article);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x6) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(employeeId, articleId) {
        var query, params;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "\n    DELETE \n    FROM articles\n    WHERE \n    employeeid = $1 \n    AND articleid = $2";
                params = [employeeId, articleId];
                _context4.next = 4;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "feed",
    value: function () {
      var _feed = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var query, articles;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = "SELECT \n    articleid AS id,\n    createdon,\n    title,\n    article,\n    employeeid AS authorId\n    FROM articles\n    ORDER BY \n    createdon DESC";
                _context5.next = 3;
                return _DB["default"].query(query, '', true)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 3:
                articles = _context5.sent;

                if (!(articles.length <= 0)) {
                  _context5.next = 6;
                  break;
                }

                throw new _Helpers.ErrorHandler('There are no articles available. Create one now!', 404);

              case 6:
                return _context5.abrupt("return", articles);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function feed() {
        return _feed.apply(this, arguments);
      }

      return feed;
    }()
  }]);

  return Article;
}();

exports["default"] = Article;