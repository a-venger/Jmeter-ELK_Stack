'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatText = undefined;

var _predicate = require('../predicate');

var formatText = exports.formatText = function formatText(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$nil = _ref.nil,
      nil = _ref$nil === undefined ? '' : _ref$nil;

  return (0, _predicate.isNil)(value) ? nil : value.toString();
};