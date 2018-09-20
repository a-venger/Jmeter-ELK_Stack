'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDateLike = exports.isDate = exports.isMoment = exports.isNil = exports.isNull = exports.isUndefined = exports.never = exports.always = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var always = exports.always = function always() {
  return true;
};

var never = exports.never = function never() {
  return false;
};

var isUndefined = exports.isUndefined = function isUndefined(value) {
  return value === undefined;
};

var isNull = exports.isNull = function isNull(value) {
  return value === null;
};

var isNil = exports.isNil = function isNil(value) {
  return isUndefined(value) || isNull(value);
};

var isMoment = exports.isMoment = function isMoment(value) {
  return _moment2.default.isMoment(value);
};

var isDate = exports.isDate = function isDate(value) {
  return _moment2.default.isDate(value);
};

var isDateLike = exports.isDateLike = function isDateLike(value) {
  return isMoment(value) || isDate(value);
};