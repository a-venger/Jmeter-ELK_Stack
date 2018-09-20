'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBetaBadge = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tool_tip = require('../../tool_tip');

var _icon = require('../../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiBetaBadge = function EuiBetaBadge(_ref) {
  var className = _ref.className,
      label = _ref.label,
      tooltipContent = _ref.tooltipContent,
      tooltipPosition = _ref.tooltipPosition,
      title = _ref.title,
      iconType = _ref.iconType,
      rest = _objectWithoutProperties(_ref, ['className', 'label', 'tooltipContent', 'tooltipPosition', 'title', 'iconType']);

  var classes = (0, _classnames2.default)('euiBetaBadge', {
    'euiBetaBadge--iconOnly': iconType
  }, className);

  var icon = void 0;
  if (iconType) {
    icon = _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiBetaBadge__icon',
      type: iconType,
      size: 'm',
      'aria-hidden': 'true'
    });
  }

  if (tooltipContent) {
    return _react2.default.createElement(
      _tool_tip.EuiToolTip,
      {
        position: tooltipPosition,
        content: tooltipContent,
        title: title || label
      },
      _react2.default.createElement(
        'span',
        _extends({
          className: classes
        }, rest),
        icon || label
      )
    );
  } else {
    return _react2.default.createElement(
      'span',
      _extends({
        className: classes,
        title: title || label
      }, rest),
      icon || label
    );
  }
};

exports.EuiBetaBadge = EuiBetaBadge;
EuiBetaBadge.propTypes = {
  className: _propTypes2.default.string,

  /**
   * One word label like "Beta" or "Lab"
   */
  label: _propTypes2.default.node.isRequired,

  /**
   * Supply an icon type if the badge should just be an icon
   */
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),

  /**
   * Content for the tooltip
   */
  tooltipContent: _propTypes2.default.node,

  /**
   * Custom position of the tooltip
   */
  tooltipPosition: _propTypes2.default.string,

  /**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  title: _propTypes2.default.string
};

EuiBetaBadge.defaultProps = {
  tooltipPosition: 'top'
};
EuiBetaBadge.__docgenInfo = [{
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
    'label': {
      'type': {
        'name': 'node'
      },
      'required': true,
      'description': 'One word label like "Beta" or "Lab"'
    },
    'iconType': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'ICON_TYPES'
      },
      'required': false,
      'description': 'Supply an icon type if the badge should just be an icon'
    },
    'tooltipContent': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': 'Content for the tooltip'
    },
    'tooltipPosition': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Custom position of the tooltip',
      'defaultValue': {
        'value': '\'top\'',
        'computed': false
      }
    },
    'title': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Optional title will be supplied as tooltip title or title attribute otherwise the label will be used'
    }
  }
}];