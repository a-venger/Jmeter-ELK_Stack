'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatNumber = undefined;

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _predicate = require('../predicate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberFormatAliases = {
  decimal1: '0,0.0',
  decimal2: '0,0.00',
  decimal3: '0,0.000',
  ordinal: '0o',
  integer: '0,0'
};

var formatNumber = exports.formatNumber = function formatNumber(value) {
  var numberFormatOrConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var format = void 0;
  var nil = '';
  var round = void 0;

  if ((0, _predicate.isString)(numberFormatOrConfig)) {
    format = numberFormatOrConfig;
  } else {
    format = numberFormatOrConfig.format;
    nil = numberFormatOrConfig.nil || '';
    round = numberFormatOrConfig.round;
  }

  if (!format) {
    return (0, _predicate.isNil)(value) ? nil : value.toString();
  }

  var roundingFunc = round ? Math.round : Math.floor;
  var numberFormat = numberFormatAliases[format] || format;
  return (0, _predicate.isNil)(value) ? nil : (0, _numeral2.default)(value).format(numberFormat, roundingFunc);
};