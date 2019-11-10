"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var dropCommentsArticles = 'DROP TABLE IF EXISTS comments_articles CASCADE';
var createTableCommentsArticles = "CREATE TABLE comments_articles(\n  id bigserial NOT NULL,\n  employeeID bigserial,\n  articleID bigserial,\n  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,\n  comment character varying NOT NULL,\n  CONSTRAINT comment_article_pkey PRIMARY KEY(id),\n  CONSTRAINT comment_article_user_fkey FOREIGN KEY(employeeID)\n    REFERENCES employees,\n  CONSTRAINT comment_article_id_fkey FOREIGN KEY(articleID)\n    REFERENCES articles\n)";
var dropTablesCommentsGifs = 'DROP TABLE IF EXISTS comments_gifs CASCADE';
var createTableCommentsGifs = "CREATE TABLE comments_gifs(\n  id bigserial NOT NULL,\n  employeeID bigserial,\n  gifID bigserial,\n  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,\n  comment character varying NOT NULL,\n  CONSTRAINT comment_gif_pkey PRIMARY KEY(id),\n  CONSTRAINT comment_gif_user_fkey FOREIGN KEY(employeeID)\n    REFERENCES employees,\n  CONSTRAINT comment_gif_id_fkey FOREIGN KEY(gifID)\n    REFERENCES gifs\n)";
var dropTablesGifs = 'DROP TABLE IF EXISTS gifs CASCADE';
var createTableGifs = "CREATE TABLE gifs(\n  gifId bigserial NOT NULL,\n  employeeID bigserial,\n  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,\n  title character varying(100) NOT NULL,\n  image_url character varying NOT NULL,\n  CONSTRAINT gif_pkey PRIMARY KEY(gifId),\n  CONSTRAINT employee_id_user_idfkey FOREIGN KEY(employeeID)\n    REFERENCES employees\n)";
var dropTablesArticles = 'DROP TABLE IF EXISTS articles CASCADE';
var createTableArticles = "CREATE TABLE articles(\n  articleId bigserial NOT NULL,\n  employeeID bigserial,\n  title character varying(100) NOT NULL,\n  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,\n  article character varying NOT NULL,\n  CONSTRAINT article_pkey PRIMARY KEY(articleId),\n  CONSTRAINT employee_id_user_idfkey FOREIGN KEY(employeeID)\n    REFERENCES employees\n)";
var dropTableEmployees = 'DROP TABLE IF EXISTS employees CASCADE';
var createTableEmployees = "CREATE TABLE employees(\n  id bigserial NOT NULL,\n  firstName character varying(50),\n  lastName character varying(50),\n  gender character varying (15),\n  jobRole character varying (60) NOT NULL,\n  email character varying (100) NOT NULL,\n  password character varying NOT NULL,\n  department character varying (100),\n  address character varying,\n  CONSTRAINT employee_pkey PRIMARY KEY(id),\n  CONSTRAINT employee_email UNIQUE(email)\n)";

var CreateTables =
/*#__PURE__*/
function () {
  function CreateTables() {
    _classCallCheck(this, CreateTables);
  }

  _createClass(CreateTables, null, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _["default"].query(dropTableEmployees);

              case 2:
                _context.next = 4;
                return _["default"].query(dropTablesArticles);

              case 4:
                _context.next = 6;
                return _["default"].query(dropTablesGifs);

              case 6:
                _context.next = 8;
                return _["default"].query(dropTablesCommentsGifs);

              case 8:
                _context.next = 10;
                return _["default"].query(dropCommentsArticles);

              case 10:
                _context.next = 12;
                return _["default"].query(createTableEmployees);

              case 12:
                _context.next = 14;
                return _["default"].query(createTableGifs);

              case 14:
                _context.next = 16;
                return _["default"].query(createTableArticles);

              case 16:
                _context.next = 18;
                return _["default"].query(createTableCommentsArticles);

              case 18:
                _context.next = 20;
                return _["default"].query(createTableCommentsGifs);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return CreateTables;
}();

CreateTables.create()["catch"](function (err) {
  return console.log('ERROR OCCURED', err);
});