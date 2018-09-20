'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiToggle = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var typeToInputTypeMap = {
  'single': 'radio',
  'multi': 'checkbox'
};

var TYPES = exports.TYPES = Object.keys(typeToInputTypeMap);

var EuiToggle = function EuiToggle(_ref) {
  var id = _ref.id,
      className = _ref.className,
      checked = _ref.checked,
      children = _ref.children,
      inputClassName = _ref.inputClassName,
      isDisabled = _ref.isDisabled,
      label = _ref.label,
      name = _ref.name,
      onChange = _ref.onChange,
      title = _ref.title,
      type = _ref.type,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ['id', 'className', 'checked', 'children', 'inputClassName', 'isDisabled', 'label', 'name', 'onChange', 'title', 'type', 'value']);

  var classes = (0, _classnames2.default)('euiToggle', {
    'euiToggle--checked': checked
  }, className);

  var inputClasses = (0, _classnames2.default)('euiToggle__input', inputClassName);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement('input', {
      id: id,
      className: inputClasses,
      'aria-label': label,
      checked: checked,
      disabled: isDisabled,
      name: name,
      onChange: onChange,
      title: title,
      type: typeToInputTypeMap[type],
      value: value
    }),
    children
  );
};

exports.EuiToggle = EuiToggle;
EuiToggle.propTypes = {
  id: _propTypes2.default.string,

  /**
   * Initial state of the toggle
   */
  checked: _propTypes2.default.bool,

  /**
   * For handling the onChange event of the input
   */
  onChange: _propTypes2.default.func,
  isDisabled: _propTypes2.default.bool,

  /**
   * Use your own logic to pass the child you want according to
   * the checked state of your component
   */
  children: _propTypes2.default.node,

  /**
   * Determines the input type based on multiple or single item(s)
   */
  type: _propTypes2.default.oneOf(TYPES),

  /**
   * What would typically be the input's label. Required for accessibility.
   */
  label: _propTypes2.default.string.isRequired,

  /**
   * Additional classNames for the input itself
   */
  inputClassName: _propTypes2.default.string
};

EuiToggle.defaultProps = {
  type: 'multi'
};
EuiToggle.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'id': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'checked': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Initial state of the toggle'
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'For handling the onChange event of the input'
    },
    'isDisabled': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'children': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': 'Use your own logic to pass the child you want according to\nthe checked state of your component'
    },
    'type': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"single"',
          'computed': false
        }, {
          'value': '"multi"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Determines the input type based on multiple or single item(s)',
      'defaultValue': {
        'value': '\'multi\'',
        'computed': false
      }
    },
    'label': {
      'type': {
        'name': 'string'
      },
      'required': true,
      'description': 'What would typically be the input\'s label. Required for accessibility.'
    },
    'inputClassName': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Additional classNames for the input itself'
    }
  }
}];