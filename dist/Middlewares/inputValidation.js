"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputValidator =
/*#__PURE__*/
function () {
  function InputValidator() {
    _classCallCheck(this, InputValidator);
  }

  _createClass(InputValidator, null, [{
    key: "Validate",
    value: function Validate(method) {
      switch (method) {
        case 'signUp':
          {
            return [(0, _expressValidator.body)('email', 'Invalid email address: express validator').exists().isEmail(), (0, _expressValidator.body)('password', 'Password should not be less than 8 characters').exists().isLength({
              min: 8
            }), (0, _expressValidator.body)('jobRole', 'Please indicate if employee is an admin or not.').exists()];
          }

        case 'signIn':
          {
            return [(0, _expressValidator.body)('email', 'Incorrect email address').isEmail(), (0, _expressValidator.body)('password', 'Please provide a password').exists()];
          }

        case 'createArticle':
          {
            return [(0, _expressValidator.body)('article', 'Article must not be empty').exists(), (0, _expressValidator.body)('title', 'Include the title of the article').exists()];
          }

        case 'createArticleComment':
          {
            return [(0, _expressValidator.body)('comment', 'comment must not be empty').exists()];
          }

        case 'createGifComment':
          {
            return [(0, _expressValidator.body)('comment', 'comment must not be empty').exists()];
          }

        default:
          break;
      }

      return method;
    }
  }]);

  return InputValidator;
}();

exports["default"] = InputValidator;