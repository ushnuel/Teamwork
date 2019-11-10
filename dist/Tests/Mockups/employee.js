"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Employee = function Employee() {
  _classCallCheck(this, Employee);

  this.employee = {
    firstName: 'Emmanuel',
    email: 'ezeemmanuel2010@gmail.com',
    password: 'adminPassword',
    jobRole: 'admin'
  };
  this.validEmployee = {
    email: 'ezeemmanuel2010@gmail.com',
    password: 'adminPassword'
  };
  this.invalidEmployee = {
    email: 'invaliduser@gmail.com',
    password: 'invalidpassword'
  };
};

var _default = Employee;
exports["default"] = _default;