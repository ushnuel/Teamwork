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

var Gif =
/*#__PURE__*/
function () {
  function Gif() {
    _classCallCheck(this, Gif);
  }

  _createClass(Gif, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(title, url, employeeId) {
        var query, params, gif;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n    INSERT \n    INTO gifs(\n      title,\n      image_url,\n      employeeid\n    )\n    VALUES($1,$2,$3)\n    RETURNING *";
                params = [title, url, employeeId];
                _context.next = 4;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
                gif = _context.sent;
                return _context.abrupt("return", gif);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x, _x2, _x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(gifId) {
        var query, param, gif;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n    SELECT\n    gifid as id,\n    employeeid as authorid,\n    title,\n    image_url as url,\n    createdon\n    FROM gifs\n    WHERE gifid = $1";
                param = [gifId];
                _context2.next = 4;
                return _DB["default"].query(query, param)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
                gif = _context2.sent;

                if (gif) {
                  _context2.next = 7;
                  break;
                }

                throw new _Helpers.ErrorHandler('Gif not found, cannot process request', 404);

              case 7:
                return _context2.abrupt("return", gif);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function get(_x4) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(gifId, employeeId) {
        var query, params;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n    DELETE \n    FROM gifs\n    WHERE gifid = $1 \n    AND employeeid = $2";
                params = [gifId, employeeId];
                _context3.next = 4;
                return _DB["default"].query(query, params)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function _delete(_x5, _x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "feed",
    value: function () {
      var _feed = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var query, gifs;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "SELECT \n    gifid AS id,\n    createdon,\n    image_url AS url,\n    g.employeeid AS authorid,\n    title\n    FROM gifs g\n    ORDER BY\n    createdon DESC";
                _context4.next = 3;
                return _DB["default"].query(query, '', true)["catch"](function (err) {
                  throw new _Helpers.ErrorHandler(err.message, 400);
                });

              case 3:
                gifs = _context4.sent;

                if (!(gifs.length <= 0)) {
                  _context4.next = 6;
                  break;
                }

                throw new _Helpers.ErrorHandler('There are no gif posts available. Create one now!', 404);

              case 6:
                return _context4.abrupt("return", gifs);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function feed() {
        return _feed.apply(this, arguments);
      }

      return feed;
    }()
  }]);

  return Gif;
}();

exports["default"] = Gif;