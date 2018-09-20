'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFieldNumber = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _form_control_layout = require('../form_control_layout');

var _validatable_control = require('../validatable_control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiFieldNumber = function EuiFieldNumber(_ref) {
  var className = _ref.className,
      icon = _ref.icon,
      id = _ref.id,
      placeholder = _ref.placeholder,
      name = _ref.name,
      min = _ref.min,
      max = _ref.max,
      value = _ref.value,
      isInvalid = _ref.isInvalid,
      fullWidth = _ref.fullWidth,
      isLoading = _ref.isLoading,
      compressed = _ref.compressed,
      prepend = _ref.prepend,
      append = _ref.append,
      rest = _objectWithoutProperties(_ref, ['className', 'icon', 'id', 'placeholder', 'name', 'min', 'max', 'value', 'isInvalid', 'fullWidth', 'isLoading', 'compressed', 'prepend', 'append']);

  var classes = (0, _classnames2.default)('euiFieldNumber', className, {
    'euiFieldNumber--withIcon': icon,
    'euiFieldNumber--fullWidth': fullWidth,
    'euiFieldNumber--compressed': compressed,
    'euiFieldNumber--inGroup': prepend || append,
    'euiFieldNumber-isLoading': isLoading
  });

  return _react2.default.createElement(
    _form_control_layout.EuiFormControlLayout,
    {
      icon: icon,
      fullWidth: fullWidth,
      isLoading: isLoading,
      compressed: compressed,
      prepend: prepend,
      append: append
    },
    _react2.default.createElement(
      _validatable_control.EuiValidatableControl,
      { isInvalid: isInvalid },
      _react2.default.createElement('input', _extends({
        type: 'number',
        id: id,
        min: min,
        max: max,
        name: name,
        value: value,
        placeholder: placeholder,
        className: classes
      }, rest))
    )
  );
};

exports.EuiFieldNumber = EuiFieldNumber;
function numberOrEmptyString(props, propName, componentName) {
  componentName = componentName || 'ANONYMOUS';

  if (props[propName]) {
    var value = props[propName];
    if (typeof value === 'string' && value !== '') {
      return new Error('Invalid prop \'' + propName + '\' of type \'string\' supplied to \'' + componentName + '\',' + (' expected empty string or type \'number\', you supplied a string with the contents \'' + value + '\'.'));
    } else if (typeof value !== 'number') {
      return new Error('Invalid prop \'' + propName + '\' of type \'' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '\' supplied to \'' + componentName + '\',' + ' expected empty string or type \'number\'.');
    }
  }

  // assume all ok
  return null;
}

EuiFieldNumber.propTypes = {
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  value: numberOrEmptyString,
  icon: _propTypes2.default.string,
  isInvalid: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  /**
   * when `true` creates a shorter height input
   */
  compressed: _propTypes2.default.bool,
  /**
   * Creates an input group with element(s) coming before input
   */
  prepend: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)]),
  /**
   * Creates an input group with element(s) coming after input
   */
  append: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)])
};

EuiFieldNumber.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false
};
EuiFieldNumber.__docgenInfo = [{
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
    'name': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'min': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'max': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'step': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'value': {
      'type': {
        'name': 'custom',
        'raw': 'numberOrEmptyString'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'undefined',
        'computed': true
      }
    },
    'icon': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'isInvalid': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'fullWidth': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'isLoading': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'compressed': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'when `true` creates a shorter height input',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'prepend': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'node'
        }, {
          'name': 'arrayOf',
          'value': {
            'name': 'node'
          }
        }]
      },
      'required': false,
      'description': 'Creates an input group with element(s) coming before input'
    },
    'append': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'node'
        }, {
          'name': 'arrayOf',
          'value': {
            'name': 'node'
          }
        }]
      },
      'required': false,
      'description': 'Creates an input group with element(s) coming after input'
    }
  }
}];