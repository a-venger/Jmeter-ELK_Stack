'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterConfigType = exports.createFilter = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_filter = require('./is_filter');

var _field_value_selection_filter = require('./field_value_selection_filter');

var _field_value_toggle_filter = require('./field_value_toggle_filter');

var _field_value_toggle_group_filter = require('./field_value_toggle_group_filter');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFilter = exports.createFilter = function createFilter(index, config, query, onChange) {
  var props = { index: index, config: config, query: query, onChange: onChange };
  switch (config.type) {
    case 'is':
      return _react2.default.createElement(_is_filter.IsFilter, props);
    case 'field_value_selection':
      return _react2.default.createElement(_field_value_selection_filter.FieldValueSelectionFilter, props);
    case 'field_value_toggle':
      return _react2.default.createElement(_field_value_toggle_filter.FieldValueToggleFilter, props);
    case 'field_value_toggle_group':
      return _react2.default.createElement(_field_value_toggle_group_filter.FieldValueToggleGroupFilter, props);
    default:
      throw new Error('Unknown search filter type [' + config.type + ']');
  }
};

var FilterConfigType = exports.FilterConfigType = _propTypes2.default.oneOfType([_is_filter.IsFilterConfigType, _field_value_selection_filter.FieldValueSelectionFilterConfigType, _field_value_toggle_filter.FieldValueToggleFilterConfigType, _field_value_toggle_group_filter.FieldValueToggleGroupFilterConfigType]);