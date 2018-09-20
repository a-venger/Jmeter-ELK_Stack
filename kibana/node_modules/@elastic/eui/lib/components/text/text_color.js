'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTextColor = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorsToClassNameMap = {
  'default': 'euiTextColor--default',
  'subdued': 'euiTextColor--subdued',
  'secondary': 'euiTextColor--secondary',
  'accent': 'euiTextColor--accent',
  'danger': 'euiTextColor--danger',
  'warning': 'euiTextColor--warning',
  'ghost': 'euiTextColor--ghost'
};

var COLORS = exports.COLORS = Object.keys(colorsToClassNameMap);

var EuiTextColor = function EuiTextColor(_ref) {
  var children = _ref.children,
      color = _ref.color,
      className = _ref.className,
      Component = _ref.component,
      rest = _objectWithoutProperties(_ref, ['children', 'color', 'className', 'component']);

  var classes = (0, _classnames2.default)('euiTextColor', colorsToClassNameMap[color], className);

  return _react2.default.createElement(
    Component,
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.EuiTextColor = EuiTextColor;
EuiTextColor.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  color: _propTypes2.default.oneOf(COLORS),

  /**
   * Determines the root element
   */
  component: _propTypes2.default.oneOf(['div', 'span'])
};

EuiTextColor.defaultProps = {
  color: 'default',
  component: 'span'
};
EuiTextColor.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'children': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'color': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"default"',
          'computed': false
        }, {
          'value': '"subdued"',
          'computed': false
        }, {
          'value': '"secondary"',
          'computed': false
        }, {
          'value': '"accent"',
          'computed': false
        }, {
          'value': '"danger"',
          'computed': false
        }, {
          'value': '"warning"',
          'computed': false
        }, {
          'value': '"ghost"',
          'computed': false
        }]
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'default\'',
        'computed': false
      }
    },
    'component': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '\'div\'',
          'computed': false
        }, {
          'value': '\'span\'',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Determines the root element',
      'defaultValue': {
        'value': '\'span\'',
        'computed': false
      }
    }
  }
}];