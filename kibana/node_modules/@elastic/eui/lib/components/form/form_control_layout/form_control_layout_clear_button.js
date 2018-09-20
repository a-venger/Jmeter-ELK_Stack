'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormControlLayoutClearButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiFormControlLayoutClearButton = function EuiFormControlLayoutClearButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['className', 'onClick']);

  var classes = (0, _classnames2.default)('euiFormControlLayoutClearButton', className);

  return _react2.default.createElement(
    'button',
    _extends({
      className: classes,
      onClick: onClick,
      'aria-label': 'Clear input'
    }, rest),
    _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiFormControlLayoutClearButton__icon',
      type: 'cross'
    })
  );
};

exports.EuiFormControlLayoutClearButton = EuiFormControlLayoutClearButton;
EuiFormControlLayoutClearButton.propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};
EuiFormControlLayoutClearButton.__docgenInfo = [{
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
    'onClick': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    }
  }
}];