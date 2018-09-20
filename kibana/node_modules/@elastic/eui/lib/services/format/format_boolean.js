'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatBoolean = undefined;

var _predicate = require('../predicate');

var formatBoolean = exports.formatBoolean = function formatBoolean(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$yes = _ref.yes,
      yes = _ref$yes === undefined ? 'Yes' : _ref$yes,
      _ref$no = _ref.no,
      no = _ref$no === undefined ? 'No' : _ref$no,
      _ref$nil = _ref.nil,
      nil = _ref$nil === undefined ? '' : _ref$nil;

  if ((0, _predicate.isNil)(value)) {
    return nil;
  }

  return value ? yes : no;
};