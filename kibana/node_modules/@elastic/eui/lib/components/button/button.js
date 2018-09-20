'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiButton = exports.ICON_SIDES = exports.SIZES = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _loading = require('../loading');

var _services = require('../../services');

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorToClassNameMap = {
  primary: 'euiButton--primary',
  secondary: 'euiButton--secondary',
  warning: 'euiButton--warning',
  danger: 'euiButton--danger',
  ghost: 'euiButton--ghost',
  text: 'euiButton--text'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var sizeToClassNameMap = {
  s: 'euiButton--small',
  l: 'euiButton--large'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var iconSideToClassNameMap = {
  left: null,
  right: 'euiButton--iconRight'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var EuiButton = function EuiButton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      iconType = _ref.iconType,
      iconSide = _ref.iconSide,
      color = _ref.color,
      size = _ref.size,
      fill = _ref.fill,
      isDisabled = _ref.isDisabled,
      isLoading = _ref.isLoading,
      href = _ref.href,
      target = _ref.target,
      rel = _ref.rel,
      type = _ref.type,
      buttonRef = _ref.buttonRef,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'iconType', 'iconSide', 'color', 'size', 'fill', 'isDisabled', 'isLoading', 'href', 'target', 'rel', 'type', 'buttonRef']);

  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  var classes = (0, _classnames2.default)('euiButton', colorToClassNameMap[color], sizeToClassNameMap[size], iconSideToClassNameMap[iconSide], className, {
    'euiButton--fill': fill
  });

  // Add an icon to the button if one exists.
  var buttonIcon = void 0;

  if (isLoading) {
    buttonIcon = _react2.default.createElement(_loading.EuiLoadingSpinner, {
      className: 'euiButton__spinner',
      size: 'm'
    });
  } else if (iconType) {
    buttonIcon = _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiButton__icon',
      type: iconType,
      size: 'm',
      'aria-hidden': 'true'
    });
  }

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    var secureRel = (0, _services.getSecureRelForTarget)(target, rel);

    return _react2.default.createElement(
      'a',
      _extends({
        className: classes,
        href: href,
        target: target,
        rel: secureRel,
        ref: buttonRef
      }, rest),
      _react2.default.createElement(
        'span',
        { className: 'euiButton__content' },
        buttonIcon,
        _react2.default.createElement(
          'span',
          { className: 'euiButton__text' },
          children
        )
      )
    );
  } else {
    return _react2.default.createElement(
      'button',
      _extends({
        disabled: isDisabled,
        className: classes,
        type: type,
        ref: buttonRef
      }, rest),
      _react2.default.createElement(
        'span',
        { className: 'euiButton__content' },
        buttonIcon,
        _react2.default.createElement(
          'span',
          { className: 'euiButton__text' },
          children
        )
      )
    );
  }
};

exports.EuiButton = EuiButton;
EuiButton.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,

  /**
   * See EuiIcon
   */
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  iconSide: _propTypes2.default.oneOf(ICON_SIDES),

  /**
   * Add more focus to an action
   */
  fill: _propTypes2.default.bool,

  /**
   * Define the color of the button
   */
  color: _propTypes2.default.oneOf(COLORS),
  size: _propTypes2.default.oneOf(SIZES),
  isDisabled: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  target: _propTypes2.default.string,
  rel: _propTypes2.default.string,
  onClick: _propTypes2.default.func,

  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading: _propTypes2.default.bool,

  /**
   * Standard HTML attribute
   */
  type: _propTypes2.default.string,
  buttonRef: _propTypes2.default.func
};

EuiButton.defaultProps = {
  type: 'button',
  iconSide: 'left',
  color: 'primary',
  fill: false
};
EuiButton.__docgenInfo = [{
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
      'description': 'See EuiIcon'
    },
    'iconSide': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"left"',
          'computed': false
        }, {
          'value': '"right"',
          'computed': false
        }]
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'left\'',
        'computed': false
      }
    },
    'fill': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Add more focus to an action',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'color': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"primary"',
          'computed': false
        }, {
          'value': '"secondary"',
          'computed': false
        }, {
          'value': '"warning"',
          'computed': false
        }, {
          'value': '"danger"',
          'computed': false
        }, {
          'value': '"ghost"',
          'computed': false
        }, {
          'value': '"text"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Define the color of the button',
      'defaultValue': {
        'value': '\'primary\'',
        'computed': false
      }
    },
    'size': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"s"',
          'computed': false
        }, {
          'value': '"l"',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'isDisabled': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'href': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'target': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'rel': {
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
    'isLoading': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Adds/swaps for loading spinner & disables'
    },
    'type': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Standard HTML attribute',
      'defaultValue': {
        'value': '\'button\'',
        'computed': false
      }
    },
    'buttonRef': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    }
  }
}];