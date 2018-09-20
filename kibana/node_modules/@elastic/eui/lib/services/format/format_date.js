'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = exports.dateFormatAliases = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _predicate = require('../predicate');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendar = function calendar(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var refTime = options.refTime || null;
  return (0, _moment2.default)(value).calendar(refTime, options);
};

var dateFormatAliases = exports.dateFormatAliases = {
  date: 'D MMM YYYY',
  longDate: 'DD MMMM YYYY',
  shortDate: 'D MMM YY',
  dateTime: 'D MMM YYYY HH:mm',
  longDateTime: 'DD MMMM YYYY HH:mm:ss',
  shortDateTime: 'D MMM YY HH:mm',
  dobShort: 'Do MMM YY',
  dobLong: 'Do MMMM YYYY',
  iso8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  calendar: calendar,
  calendarDateTime: function calendarDateTime(value, options) {
    return calendar(value, _extends({
      sameDay: '[Today at] H:mmA',
      nextDay: '[Tomorrow at] H:mmA',
      nextWeek: 'dddd [at] H:mmA',
      lastDay: '[Yesterday at] H:mmA',
      lastWeek: '[Last] dddd [at] H:mmA',
      sameElse: 'Do MMM YYYY [at] H:mmA'
    }, options));
  },
  calendarDate: function calendarDate(value, options) {
    return calendar(value, _extends({
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'Do MMM YYYY'
    }, options));
  }
};

var formatDate = exports.formatDate = function formatDate(value) {
  var dateFormatKeyOrConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dateTime';

  if ((0, _predicate.isString)(dateFormatKeyOrConfig)) {
    if ((0, _predicate.isNil)(value)) {
      return '';
    }

    var _dateFormat = dateFormatAliases[dateFormatKeyOrConfig] || dateFormatKeyOrConfig;

    return (0, _moment2.default)(value).format(_dateFormat);
  }

  var _dateFormatKeyOrConfi = dateFormatKeyOrConfig.format,
      format = _dateFormatKeyOrConfi === undefined ? 'dateTime' : _dateFormatKeyOrConfi,
      _dateFormatKeyOrConfi2 = dateFormatKeyOrConfig.nil,
      nil = _dateFormatKeyOrConfi2 === undefined ? '' : _dateFormatKeyOrConfi2,
      options = dateFormatKeyOrConfig.options;


  var dateFormat = dateFormatAliases[format] || format;

  if ((0, _predicate.isNil)(value)) {
    return nil;
  }

  if ((0, _predicate.isFunction)(dateFormat)) {
    return dateFormat(value, options);
  }

  return (0, _moment2.default)(value).format(dateFormat);
};