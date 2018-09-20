'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiButtonToggle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _toggle = require('../../toggle');

var _button = require('../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiButtonToggle = function EuiButtonToggle(_ref) {
  var className = _ref.className,
      color = _ref.color,
      isDisabled = _ref.isDisabled,
      isEmpty = _ref.isEmpty,
      isIconOnly = _ref.isIconOnly,
      isSelected = _ref.isSelected,
      label = _ref.label,
      name = _ref.name,
      onChange = _ref.onChange,
      toggleClassName = _ref.toggleClassName,
      type = _ref.type,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ['className', 'color', 'isDisabled', 'isEmpty', 'isIconOnly', 'isSelected', 'label', 'name', 'onChange', 'toggleClassName', 'type', 'value']);

  var classes = (0, _classnames2.default)('euiButtonToggle', {
    'euiButtonToggle--isIconOnly': isIconOnly,
    'euiButtonToggle--isEmpty': isEmpty
  }, className);

  var wrapperClasses = (0, _classnames2.default)('euiButtonToggle__wrapper', {
    'euiButtonToggle--isDisabled': isDisabled
  }, toggleClassName);

  var buttonContent = isIconOnly ? '' : label;

  return _react2.default.createElement(
    _toggle.EuiToggle,
    {
      className: wrapperClasses,
      inputClassName: 'euiButtonToggle__input',
      checked: isSelected,
      isDisabled: isDisabled,
      label: label,
      name: name,
      onChange: onChange,
      type: type,
      title: label,
      value: value
    },
    _react2.default.createElement(
      _button.EuiButton,
      _extends({
        tabIndex: '-1' // prevents double focus from input to button
        , className: classes,
        color: color,
        disabled: isDisabled,
        size: isIconOnly ? 's' : undefined // only force small if it's the icon only version
      }, rest),
      buttonContent
    )
  );
};

exports.EuiButtonToggle = EuiButtonToggle;
EuiButtonToggle.propTypes = {
  className: _propTypes2.default.string,

  /**
   * Button label, which is also passed to `EuiToggle` as the input's label
   */
  label: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,

  /**
   * See `EuiButton`
   */
  color: _propTypes2.default.string,
  isDisabled: _propTypes2.default.bool,

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly: _propTypes2.default.bool,

  /**
   * Simulates a `EuiButtonEmpty`
   */
  isEmpty: _propTypes2.default.bool,

  /**
   * Classnames to add to `EuiToggle` instead of the `EuiButton`
   */
  toggleClassName: _propTypes2.default.string,

  /**
   * Is the button a single action or part of a group (multi)?
   * Used primarily for `EuiButtonGroup`
   */
  type: _propTypes2.default.oneOf(_toggle.TOGGLE_TYPES)
};

EuiButtonToggle.defaultProps = {
  color: 'primary'
};
EuiButtonToggle.__docgenInfo = [{
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
        'name': 'string'
      },
      'required': true,
      'description': 'Button label, which is also passed to `EuiToggle` as the input\'s label'
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'color': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'See `EuiButton`',
      'defaultValue': {
        'value': '\'primary\'',
        'computed': false
      }
    },
    'isDisabled': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'isIconOnly': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Hides the label from the button content and only displays the icon'
    },
    'isEmpty': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Simulates a `EuiButtonEmpty`'
    },
    'toggleClassName': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Classnames to add to `EuiToggle` instead of the `EuiButton`'
    },
    'type': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'TOGGLE_TYPES'
      },
      'required': false,
      'description': 'Is the button a single action or part of a group (multi)?\nUsed primarily for `EuiButtonGroup`'
    }
  }
}];