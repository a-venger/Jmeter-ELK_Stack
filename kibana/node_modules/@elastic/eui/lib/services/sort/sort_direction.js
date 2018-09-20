'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortDirectionType = exports.SortDirection = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortDirection = exports.SortDirection = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
  isAsc: function isAsc(direction) {
    return direction === this.ASC;
  },
  reverse: function reverse(direction) {
    return this.isAsc(direction) ? this.DESC : this.ASC;
  }
});

var SortDirectionType = exports.SortDirectionType = _propTypes2.default.oneOf([SortDirection.ASC, SortDirection.DESC]);