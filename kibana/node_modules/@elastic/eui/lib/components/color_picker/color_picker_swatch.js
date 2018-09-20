'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiColorPickerSwatch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _color_picker_empty_swatch = require('./color_picker_empty_swatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiColorPickerSwatch = function EuiColorPickerSwatch(_ref) {
  var color = _ref.color,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['color', 'className']);

  var isClear = !color;
  var classes = (0, _classnames2.default)('euiColorPicker__swatch', className, {
    'euiColorPicker__emptySwatch': isClear
  });
  var children = void 0;

  if (isClear) {
    children = _react2.default.createElement(_color_picker_empty_swatch.EuiColorPickerEmptySwatch, null);
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes,
      'data-test-subj': 'colorSwatch',
      style: { background: color ? color : '' }
    }, rest),
    children
  );
};

exports.EuiColorPickerSwatch = EuiColorPickerSwatch;
EuiColorPickerSwatch.propTypes = {
  className: _propTypes2.default.string,
  color: _propTypes2.default.string
};
EuiColorPickerSwatch.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'color': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    }
  }
}];