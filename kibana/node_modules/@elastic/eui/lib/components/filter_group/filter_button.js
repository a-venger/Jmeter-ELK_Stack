'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFilterButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _notification_badge = require('../badge/notification_badge');

var _button_empty = require('../button/button_empty');

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// import { getSecureRelForTarget } from '../../services';


var EuiFilterButton = function EuiFilterButton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      iconType = _ref.iconType,
      iconSide = _ref.iconSide,
      color = _ref.color,
      hasActiveFilters = _ref.hasActiveFilters,
      numFilters = _ref.numFilters,
      isDisabled = _ref.isDisabled,
      isSelected = _ref.isSelected,
      type = _ref.type,
      grow = _ref.grow,
      noDivider = _ref.noDivider,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'iconType', 'iconSide', 'color', 'hasActiveFilters', 'numFilters', 'isDisabled', 'isSelected', 'type', 'grow', 'noDivider']);

  var classes = (0, _classnames2.default)('euiFilterButton', {
    'euiFilterButton-isSelected': isSelected,
    'euiFilterButton-hasActiveFilters': hasActiveFilters,
    'euiFilterButton--grow': grow,
    'euiFilterButton--noDivider': noDivider
  }, className);

  var buttonContents = _react2.default.createElement(
    'span',
    { className: 'euiFilterButton__textShift', 'data-text': children },
    children,
    numFilters && _react2.default.createElement(
      _notification_badge.EuiNotificationBadge,
      { className: 'euiFilterButton__notification' },
      numFilters
    )
  );

  return _react2.default.createElement(
    _button_empty.EuiButtonEmpty,
    _extends({
      className: classes,
      color: color,
      isDisabled: isDisabled,
      iconSide: iconSide,
      iconType: iconType,
      type: type
    }, rest),
    buttonContents
  );
};

exports.EuiFilterButton = EuiFilterButton;
EuiFilterButton.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  /**
   * Use any one of our icons
   */
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  iconSide: _propTypes2.default.oneOf(_button_empty.ICON_SIDES),
  color: _propTypes2.default.oneOf(_button_empty.COLORS),
  /**
   * Bolds the button if true
   */
  hasActiveFilters: _propTypes2.default.bool,
  /**
   * Adds a notification with number
   */
  numFilters: _propTypes2.default.number,
  /**
   * Applies a visual state to the button useful when using with a popover.
   */
  isSelected: _propTypes2.default.bool,
  isDisabled: _propTypes2.default.bool,
  /**
   * Defines html button input type
   */
  type: _propTypes2.default.string,
  /**
   * Should the button grow to fill it's container, best used for dropdown buttons
   */
  grow: _propTypes2.default.bool,
  /**
   * Remove border after button, good for opposite filters
   */
  noDivider: _propTypes2.default.bool
};

EuiFilterButton.defaultProps = {
  type: 'button',
  iconSide: 'right',
  color: 'text',
  grow: false
};
EuiFilterButton.__docgenInfo = [{
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
    'onClick': {
      'type': {
        'name': 'func'
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
      'description': 'Use any one of our icons'
    },
    'iconSide': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'ICON_SIDES'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'right\'',
        'computed': false
      }
    },
    'color': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'COLORS'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'text\'',
        'computed': false
      }
    },
    'hasActiveFilters': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Bolds the button if true'
    },
    'numFilters': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': 'Adds a notification with number'
    },
    'isSelected': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Applies a visual state to the button useful when using with a popover.'
    },
    'isDisabled': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'type': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Defines html button input type',
      'defaultValue': {
        'value': '\'button\'',
        'computed': false
      }
    },
    'grow': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Should the button grow to fill it\'s container, best used for dropdown buttons',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'noDivider': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Remove border after button, good for opposite filters'
    }
  }
}];