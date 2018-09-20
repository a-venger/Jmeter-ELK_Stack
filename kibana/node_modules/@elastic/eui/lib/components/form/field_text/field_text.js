'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFieldText = undefined;

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

var EuiFieldText = function EuiFieldText(_ref) {
  var id = _ref.id,
      name = _ref.name,
      placeholder = _ref.placeholder,
      value = _ref.value,
      className = _ref.className,
      icon = _ref.icon,
      isInvalid = _ref.isInvalid,
      inputRef = _ref.inputRef,
      fullWidth = _ref.fullWidth,
      isLoading = _ref.isLoading,
      compressed = _ref.compressed,
      prepend = _ref.prepend,
      append = _ref.append,
      rest = _objectWithoutProperties(_ref, ['id', 'name', 'placeholder', 'value', 'className', 'icon', 'isInvalid', 'inputRef', 'fullWidth', 'isLoading', 'compressed', 'prepend', 'append']);

  var classes = (0, _classnames2.default)('euiFieldText', className, {
    'euiFieldText--withIcon': icon,
    'euiFieldText--fullWidth': fullWidth,
    'euiFieldText--compressed': compressed,
    'euiFieldText--inGroup': prepend || append,
    'euiFieldText-isLoading': isLoading
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
      {
        isInvalid: isInvalid
      },
      _react2.default.createElement('input', _extends({
        type: 'text',
        id: id,
        name: name,
        placeholder: placeholder,
        className: classes,
        value: value,
        ref: inputRef
      }, rest))
    )
  );
};

exports.EuiFieldText = EuiFieldText;
EuiFieldText.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string,
  icon: _propTypes2.default.string,
  isInvalid: _propTypes2.default.bool,
  inputRef: _propTypes2.default.func,
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

EuiFieldText.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false
};
EuiFieldText.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'name': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'id': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'placeholder': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'value': {
      'type': {
        'name': 'string'
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
    'inputRef': {
      'type': {
        'name': 'func'
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