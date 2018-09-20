'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBadge = exports.ICON_SIDES = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../../utils');

var _color = require('../../services/color');

var _accessibility = require('../accessibility');

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorToClassNameMap = {
  default: 'euiBadge--default',
  primary: 'euiBadge--primary',
  secondary: 'euiBadge--secondary',
  accent: 'euiBadge--accent',
  warning: 'euiBadge--warning',
  danger: 'euiBadge--danger',
  hollow: 'euiBadge--hollow'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var iconSideToClassNameMap = {
  left: '',
  right: 'euiBadge--iconRight'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var EuiBadge = function EuiBadge(_ref) {
  var children = _ref.children,
      color = _ref.color,
      iconType = _ref.iconType,
      iconSide = _ref.iconSide,
      className = _ref.className,
      onClick = _ref.onClick,
      iconOnClick = _ref.iconOnClick,
      onClickAriaLabel = _ref.onClickAriaLabel,
      iconOnClickAriaLabel = _ref.iconOnClickAriaLabel,
      closeButtonProps = _ref.closeButtonProps,
      rest = _objectWithoutProperties(_ref, ['children', 'color', 'iconType', 'iconSide', 'className', 'onClick', 'iconOnClick', 'onClickAriaLabel', 'iconOnClickAriaLabel', 'closeButtonProps']);

  var optionalColorClass = null;
  var optionalCustomStyles = null;
  var textColor = null;

  if (COLORS.indexOf(color) > -1) {
    optionalColorClass = colorToClassNameMap[color];
  } else {

    if (_color.isColorDark.apply(undefined, _toConsumableArray((0, _color.hexToRgb)(color)))) {
      textColor = '#FFFFFF';
    } else {
      textColor = '#000000';
    }

    optionalCustomStyles = { backgroundColor: color, color: textColor };
  }

  var classes = (0, _classnames2.default)('euiBadge', iconSideToClassNameMap[iconSide], optionalColorClass, className);

  var optionalIcon = null;
  if (iconType) {
    if (iconOnClick) {
      optionalIcon = _react2.default.createElement(
        _accessibility.EuiKeyboardAccessible,
        null,
        _react2.default.createElement(_icon.EuiIcon, _extends({
          onClick: iconOnClick,
          type: iconType,
          size: 's',
          className: 'euiBadge__icon',
          'aria-label': iconOnClickAriaLabel
        }, closeButtonProps))
      );
    } else {
      optionalIcon = _react2.default.createElement(_icon.EuiIcon, { type: iconType, size: 's', className: 'euiBadge__icon' });
    }
  }

  if (onClick) {
    return _react2.default.createElement(
      'button',
      _extends({
        className: classes,
        style: optionalCustomStyles,
        onClick: onClick,
        'aria-label': onClickAriaLabel
      }, rest),
      _react2.default.createElement(
        'span',
        { className: 'euiBadge__content' },
        optionalIcon,
        _react2.default.createElement(
          'span',
          null,
          children
        )
      )
    );
  } else {
    return _react2.default.createElement(
      'span',
      _extends({
        className: classes,
        style: optionalCustomStyles
      }, rest),
      _react2.default.createElement(
        'span',
        { className: 'euiBadge__content' },
        optionalIcon,
        _react2.default.createElement(
          'span',
          { className: 'euiBadge__text' },
          children
        )
      )
    );
  }
};

exports.EuiBadge = EuiBadge;
function checkValidColor(props, propName, componentName) {
  var validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(props.color);
  if (props.color && !validHex && !COLORS.includes(props.color)) {
    throw new Error(componentName + ' needs to pass a valid color. This can either be a three ' + ('or six character hex value or one of the following: ' + COLORS));
  }
}

EuiBadge.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,

  /**
   * Accepts any string from our icon library
   */
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),

  /**
   * The side of the badge the icon should sit
   */
  iconSide: _propTypes2.default.string,
  /**
   * Will apply an onclick to icon within the badge
   */
  iconOnClick: _utils.EuiPropTypes.withRequiredProp(_propTypes2.default.func, 'iconOnClickAriaLabel', 'Please provide an aria label to complement your iconOnClick'),

  /**
   * Aria label applied to the iconOnClick button
   */
  iconOnClickAriaLabel: _propTypes2.default.string,

  /**
   * Will apply an onclick to the badge itself
   */
  onClick: _utils.EuiPropTypes.withRequiredProp(_propTypes2.default.func, 'onClickAriaLabel', 'Please provide an aria label to complement your onClick'),

  /**
   * Aria label applied to the onClick button
   */
  onClickAriaLabel: _propTypes2.default.string,

  /**
   * Accepts either our palette colors (primary, secondary ..etc) or a hex value `#FFFFFF`, `#000`.
   */
  color: checkValidColor,

  /**
   * Props passed to the close button.
   */
  closeButtonProps: _propTypes2.default.object
};

EuiBadge.defaultProps = {
  color: 'default',
  iconSide: 'left'
};
EuiBadge.__docgenInfo = [{
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
    'iconType': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'ICON_TYPES'
      },
      'required': false,
      'description': 'Accepts any string from our icon library'
    },
    'iconSide': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'The side of the badge the icon should sit',
      'defaultValue': {
        'value': '\'left\'',
        'computed': false
      }
    },
    'iconOnClick': {
      'type': {
        'name': 'custom',
        'raw': 'EuiPropTypes.withRequiredProp(\n  PropTypes.func,\n  \'iconOnClickAriaLabel\',\n  \'Please provide an aria label to complement your iconOnClick\'\n)'
      },
      'required': false,
      'description': 'Will apply an onclick to icon within the badge'
    },
    'iconOnClickAriaLabel': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Aria label applied to the iconOnClick button'
    },
    'onClick': {
      'type': {
        'name': 'custom',
        'raw': 'EuiPropTypes.withRequiredProp(\n  PropTypes.func,\n  \'onClickAriaLabel\',\n  \'Please provide an aria label to complement your onClick\'\n)'
      },
      'required': false,
      'description': 'Will apply an onclick to the badge itself'
    },
    'onClickAriaLabel': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Aria label applied to the onClick button'
    },
    'color': {
      'type': {
        'name': 'custom',
        'raw': 'checkValidColor'
      },
      'required': false,
      'description': 'Accepts either our palette colors (primary, secondary ..etc) or a hex value `#FFFFFF`, `#000`.',
      'defaultValue': {
        'value': '\'default\'',
        'computed': false
      }
    },
    'closeButtonProps': {
      'type': {
        'name': 'object'
      },
      'required': false,
      'description': 'Props passed to the close button.'
    }
  }
}];