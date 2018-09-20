'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertySortType = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sort_direction = require('./sort_direction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertySortType = exports.PropertySortType = _propTypes2.default.shape({
  field: _propTypes2.default.string.isRequired,
  direction: _sort_direction.SortDirectionType.isRequired
});