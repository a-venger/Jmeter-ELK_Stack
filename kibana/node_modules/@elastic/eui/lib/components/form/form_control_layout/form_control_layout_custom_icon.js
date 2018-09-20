'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormControlLayoutCustomIcon = undefined;

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

var EuiFormControlLayoutCustomIcon = function EuiFormControlLayoutCustomIcon(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      type = _ref.type,
      iconRef = _ref.iconRef,
      rest = _objectWithoutProperties(_ref, ['className', 'onClick', 'type', 'iconRef']);

  var classes = (0, _classnames2.default)('euiFormControlLayoutCustomIcon', className, {
    'euiFormControlLayoutCustomIcon--clickable': onClick
  });

  if (onClick) {
    return _react2.default.createElement(
      'button',
      _extends({
        onClick: onClick,
        className: classes,
        ref: iconRef
      }, rest),
      _react2.default.createElement(_icon.EuiIcon, {
        className: 'euiFormControlLayoutCustomIcon__icon',
        'aria-hidden': 'true',
        type: type
      })
    );
  }

  return _react2.default.createElement(
    'span',
    _extends({
      className: classes,
      ref: iconRef
    }, rest),
    _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiFormControlLayoutCustomIcon__icon',
      'aria-hidden': 'true',
      type: type
    })
  );
};

exports.EuiFormControlLayoutCustomIcon = EuiFormControlLayoutCustomIcon;
EuiFormControlLayoutCustomIcon.propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  type: _propTypes2.default.string,
  iconRef: _propTypes2.default.func
};
EuiFormControlLayoutCustomIcon.__docgenInfo = [{
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
    },
    'type': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'iconRef': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    }
  }
}];