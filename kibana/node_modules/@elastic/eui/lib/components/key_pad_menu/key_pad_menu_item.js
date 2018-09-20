'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiKeyPadMenuItemButton = exports.EuiKeyPadMenuItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _beta_badge = require('../../components/badge/beta_badge');

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var renderContent = function renderContent(children, label, betaBadgeLabel, betaBadgeTooltipContent, betaBadgeIconType) {
  return _react2.default.createElement(
    'div',
    { className: 'euiKeyPadMenuItem__inner' },
    betaBadgeLabel && _react2.default.createElement(
      'span',
      { className: 'euiKeyPadMenuItem__betaBadgeWrapper' },
      _react2.default.createElement(_beta_badge.EuiBetaBadge, {
        className: 'euiKeyPadMenuItem__betaBadge',
        label: betaBadgeLabel,
        iconType: betaBadgeIconType,
        tooltipContent: betaBadgeTooltipContent
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'euiKeyPadMenuItem__icon' },
      children
    ),
    _react2.default.createElement(
      'p',
      { className: 'euiKeyPadMenuItem__label' },
      label
    )
  );
};

var commonPropTypes = {
  children: _propTypes2.default.node.isRequired,
  label: _propTypes2.default.node.isRequired,

  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel: _propTypes2.default.string,

  /**
   * Supply an icon type if the badge should just be an icon
   */
  betaBadgeIconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent: _propTypes2.default.node
};

var EuiKeyPadMenuItem = function EuiKeyPadMenuItem(_ref) {
  var href = _ref.href,
      label = _ref.label,
      children = _ref.children,
      className = _ref.className,
      betaBadgeLabel = _ref.betaBadgeLabel,
      betaBadgeTooltipContent = _ref.betaBadgeTooltipContent,
      betaBadgeIconType = _ref.betaBadgeIconType,
      rest = _objectWithoutProperties(_ref, ['href', 'label', 'children', 'className', 'betaBadgeLabel', 'betaBadgeTooltipContent', 'betaBadgeIconType']);

  var classes = (0, _classnames2.default)('euiKeyPadMenuItem', {
    'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel
  }, className);

  return _react2.default.createElement(
    'a',
    _extends({
      href: href,
      className: classes,
      role: 'menuitem'
    }, rest),
    renderContent(children, label, betaBadgeLabel, betaBadgeTooltipContent, betaBadgeIconType)
  );
};

exports.EuiKeyPadMenuItem = EuiKeyPadMenuItem;
EuiKeyPadMenuItem.propTypes = _extends({
  href: _propTypes2.default.string
}, commonPropTypes);

var EuiKeyPadMenuItemButton = function EuiKeyPadMenuItemButton(_ref2) {
  var onClick = _ref2.onClick,
      label = _ref2.label,
      children = _ref2.children,
      className = _ref2.className,
      betaBadgeLabel = _ref2.betaBadgeLabel,
      betaBadgeTooltipContent = _ref2.betaBadgeTooltipContent,
      betaBadgeIconType = _ref2.betaBadgeIconType,
      rest = _objectWithoutProperties(_ref2, ['onClick', 'label', 'children', 'className', 'betaBadgeLabel', 'betaBadgeTooltipContent', 'betaBadgeIconType']);

  var classes = (0, _classnames2.default)('euiKeyPadMenuItem', {
    'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel
  }, className);

  return _react2.default.createElement(
    'button',
    _extends({
      type: 'button',
      onClick: onClick,
      className: classes
    }, rest),
    renderContent(children, label, betaBadgeLabel, betaBadgeTooltipContent, betaBadgeIconType)
  );
};

exports.EuiKeyPadMenuItemButton = EuiKeyPadMenuItemButton;
EuiKeyPadMenuItemButton.propTypes = _extends({
  onClick: _propTypes2.default.func
}, commonPropTypes);
EuiKeyPadMenuItem.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'href': {
      'type': {
        'name': 'string'
      },
      'required': false
    },
    'children': {
      'type': {
        'name': 'node'
      },
      'required': true
    },
    'label': {
      'type': {
        'name': 'node'
      },
      'required': true
    },
    'betaBadgeLabel': {
      'type': {
        'name': 'string'
      },
      'required': false
    },
    'betaBadgeIconType': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'ICON_TYPES'
      },
      'required': false
    },
    'betaBadgeTooltipContent': {
      'type': {
        'name': 'node'
      },
      'required': false
    }
  }
}, {
  'description': '',
  'methods': [],
  'props': {
    'onClick': {
      'type': {
        'name': 'func'
      },
      'required': false
    },
    'children': {
      'type': {
        'name': 'node'
      },
      'required': true
    },
    'label': {
      'type': {
        'name': 'node'
      },
      'required': true
    },
    'betaBadgeLabel': {
      'type': {
        'name': 'string'
      },
      'required': false
    },
    'betaBadgeIconType': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'ICON_TYPES'
      },
      'required': false
    },
    'betaBadgeTooltipContent': {
      'type': {
        'name': 'node'
      },
      'required': false
    }
  }
}];