'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lte = exports.lt = exports.gte = exports.gt = exports.eq = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _date_format = require('./date_format');

var _date_value = require('./date_value');

var _predicate = require('../../../services/predicate');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utc = _moment2.default.utc;

var resolveValueAsDate = function resolveValueAsDate(value) {
  if (_moment2.default.isMoment(value)) {
    return value;
  }
  if (_moment2.default.isDate(value) || (0, _predicate.isNumber)(value)) {
    return (0, _moment2.default)(value);
  }
  return _date_format.dateFormat.parse(value.toString());
};

var defaultEqOptions = {
  ignoreCase: true
};

var eq = exports.eq = function eq(fieldValue, clauseValue) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  options = _extends({}, defaultEqOptions, options);

  if ((0, _predicate.isNil)(fieldValue) || (0, _predicate.isNil)(clauseValue)) {
    return fieldValue === clauseValue;
  }

  if ((0, _date_value.isDateValue)(clauseValue)) {
    var dateFieldValue = resolveValueAsDate(fieldValue);
    if (clauseValue.granularity) {
      return clauseValue.granularity.isSame(dateFieldValue, clauseValue.resolve());
    }
    return dateFieldValue.isSame(clauseValue.resolve());
  }

  if ((0, _predicate.isString)(fieldValue)) {
    return options.ignoreCase ? fieldValue.toLowerCase().includes(clauseValue.toString().toLowerCase()) : fieldValue.includes(clauseValue.toString());
  }

  if ((0, _predicate.isNumber)(fieldValue)) {
    clauseValue = Number(clauseValue);
    return fieldValue === clauseValue;
  }

  if ((0, _predicate.isBoolean)(fieldValue)) {
    return clauseValue === fieldValue;
  }

  if ((0, _predicate.isDateLike)(fieldValue)) {
    var date = resolveValueAsDate(clauseValue);
    if (!date.isValid()) {
      return false;
    }
    var granularity = (0, _date_format.dateGranularity)(date);
    if (!granularity) {
      return utc(fieldValue).isSame(date);
    }
    return granularity.isSame(fieldValue, date);
  }

  if ((0, _predicate.isArray)(fieldValue)) {
    return fieldValue.some(function (item) {
      return eq(item, clauseValue, options);
    });
  }

  return false; // unknown value type
};

var greaterThen = function greaterThen(fieldValue, clauseValue) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if ((0, _date_value.isDateValue)(clauseValue)) {
    var clauseDateValue = clauseValue.resolve();
    if (!clauseValue.granularity) {
      return inclusive ? utc(fieldValue).isSameOrAfter(clauseDateValue) : utc(fieldValue).isAfter(clauseDateValue);
    }
    if (inclusive) {
      return utc(fieldValue).isSameOrAfter(clauseValue.granularity.start(clauseDateValue));
    }
    return utc(fieldValue).isSameOrAfter(clauseValue.granularity.startOfNext(clauseDateValue));
  }

  if ((0, _predicate.isString)(fieldValue)) {
    var str = clauseValue.toString();
    return inclusive ? fieldValue >= str : fieldValue > str;
  }

  if ((0, _predicate.isNumber)(fieldValue)) {
    var number = Number(clauseValue);
    return inclusive ? fieldValue >= number : fieldValue > number;
  }

  if ((0, _predicate.isDateLike)(fieldValue)) {
    var date = resolveValueAsDate(clauseValue);
    var granularity = (0, _date_format.dateGranularity)(date);
    if (!granularity) {
      return inclusive ? utc(fieldValue).isSameOrAfter(date) : utc(fieldValue).isAfter(date);
    }
    if (inclusive) {
      return utc(fieldValue).isSameOrAfter(granularity.start(date));
    }
    return utc(fieldValue).isSameOrAfter(granularity.startOfNext(date));
  }

  if ((0, _predicate.isArray)(fieldValue)) {
    return fieldValue.all(function (item) {
      return greaterThen(item, clauseValue, inclusive);
    });
  }

  return false; // unsupported value type
};

var gt = exports.gt = function gt(fieldValue, clauseValue) {
  if ((0, _predicate.isNil)(fieldValue) || (0, _predicate.isNil)(clauseValue)) {
    return false;
  }
  return greaterThen(fieldValue, clauseValue);
};

var gte = exports.gte = function gte(fieldValue, clauseValue) {
  if ((0, _predicate.isNil)(fieldValue) || (0, _predicate.isNil)(clauseValue)) {
    return fieldValue === clauseValue;
  }
  return greaterThen(fieldValue, clauseValue, true);
};

var lt = exports.lt = function lt(fieldValue, clauseValue) {
  if ((0, _predicate.isNil)(fieldValue) || (0, _predicate.isNil)(clauseValue)) {
    return false;
  }
  return !greaterThen(fieldValue, clauseValue, true);
};

var lte = exports.lte = function lte(fieldValue, clauseValue) {
  if ((0, _predicate.isNil)(fieldValue) || (0, _predicate.isNil)(clauseValue)) {
    return fieldValue === clauseValue;
  }
  return !greaterThen(fieldValue, clauseValue);
};