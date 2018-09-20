'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPanel = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _beta_badge = require('../badge/beta_badge');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPanel--paddingSmall',
  m: 'euiPanel--paddingMedium',
  l: 'euiPanel--paddingLarge'
};

var SIZES = exports.SIZES = Object.keys(paddingSizeToClassNameMap);

var EuiPanel = function EuiPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      paddingSize = _ref.paddingSize,
      hasShadow = _ref.hasShadow,
      grow = _ref.grow,
      panelRef = _ref.panelRef,
      onClick = _ref.onClick,
      betaBadgeLabel = _ref.betaBadgeLabel,
      betaBadgeTooltipContent = _ref.betaBadgeTooltipContent,
      betaBadgeTitle = _ref.betaBadgeTitle,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'paddingSize', 'hasShadow', 'grow', 'panelRef', 'onClick', 'betaBadgeLabel', 'betaBadgeTooltipContent', 'betaBadgeTitle']);

  var classes = (0, _classnames2.default)('euiPanel', paddingSizeToClassNameMap[paddingSize], {
    'euiPanel--shadow': hasShadow,
    'euiPanel--flexGrowZero': !grow,
    'euiPanel--isClickable': onClick,
    'euiPanel--hasBetaBadge': betaBadgeLabel
  }, className);

  var PanelTag = onClick ? 'button' : 'div';

  var props = {
    ref: panelRef,
    className: classes
  };

  // Avoid passing down this prop if it hasn't been supplied, in order to
  // avoid noise in react-test-renderer snapshots.
  if (onClick != null) {
    props.onClick = onClick;
  }

  var optionalBetaBadge = void 0;
  if (betaBadgeLabel) {
    optionalBetaBadge = _react2.default.createElement(
      'span',
      { className: 'euiPanel__betaBadgeWrapper' },
      _react2.default.createElement(_beta_badge.EuiBetaBadge, {
        label: betaBadgeLabel,
        title: betaBadgeTitle,
        tooltipContent: betaBadgeTooltipContent,
        className: 'euiPanel__betaBadge'
      })
    );
  }

  return _react2.default.createElement(
    PanelTag,
    _extends({}, props, rest),
    optionalBetaBadge,
    children
  );
};

exports.EuiPanel = EuiPanel;
EuiPanel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  /**
   * If active, adds a deeper shadow to the panel
   */
  hasShadow: _propTypes2.default.bool,
  /**
   * Padding applied to the panel
   */
  paddingSize: _propTypes2.default.oneOf(SIZES),
  /**
   * When true the panel will grow to match `EuiFlexItem`
   */
  grow: _propTypes2.default.bool,
  panelRef: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  /**
   * Add a badge to the panel to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel: _propTypes2.default.string,

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent: _propTypes2.default.node,

  /**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  betaBadgeTitle: _propTypes2.default.string
};

EuiPanel.defaultProps = {
  paddingSize: 'm',
  hasShadow: false,
  grow: true
};
EuiPanel.__docgenInfo = [{
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
    'hasShadow': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'If active, adds a deeper shadow to the panel',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'paddingSize': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"none"',
          'computed': false
        }, {
          'value': '"s"',
          'computed': false
        }, {
          'value': '"m"',
          'computed': false
        }, {
          'value': '"l"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Padding applied to the panel',
      'defaultValue': {
        'value': '\'m\'',
        'computed': false
      }
    },
    'grow': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'When true the panel will grow to match `EuiFlexItem`',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'panelRef': {
      'type': {
        'name': 'func'
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
    'betaBadgeLabel': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Add a badge to the panel to label it as "Beta" or other non-GA state'
    },
    'betaBadgeTooltipContent': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': 'Add a description to the beta badge (will appear in a tooltip)'
    },
    'betaBadgeTitle': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Optional title will be supplied as tooltip title or title attribute otherwise the label will be used'
    }
  }
}];