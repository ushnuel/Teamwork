"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-unused-vars */
var FeedbackHandler =
/*#__PURE__*/
function () {
  function FeedbackHandler() {
    _classCallCheck(this, FeedbackHandler);
  }

  _createClass(FeedbackHandler, null, [{
    key: "success",
    value: function success(res) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var data = arguments.length > 2 ? arguments[2] : undefined;
      res.status(status).json({
        status: 'success',
        data: data
      });
    }
  }, {
    key: "error",
    value: function error(err, req, res, next) {
      var _err$status = err.status,
          status = _err$status === void 0 ? 400 : _err$status,
          message = err.message;
      var error = message;
      res.status(status).json({
        status: 'error',
        error: error
      });
    }
  }]);

  return FeedbackHandler;
}();

exports["default"] = FeedbackHandler;