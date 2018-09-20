'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSelect = undefined;

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

var EuiSelect = function EuiSelect(_ref) {
  var className = _ref.className,
      options = _ref.options,
      id = _ref.id,
      name = _ref.name,
      inputRef = _ref.inputRef,
      isInvalid = _ref.isInvalid,
      fullWidth = _ref.fullWidth,
      isLoading = _ref.isLoading,
      hasNoInitialSelection = _ref.hasNoInitialSelection,
      defaultValue = _ref.defaultValue,
      compressed = _ref.compressed,
      value = _ref.value,
      prepend = _ref.prepend,
      append = _ref.append,
      rest = _objectWithoutProperties(_ref, ['className', 'options', 'id', 'name', 'inputRef', 'isInvalid', 'fullWidth', 'isLoading', 'hasNoInitialSelection', 'defaultValue', 'compressed', 'value', 'prepend', 'append']);

  var classes = (0, _classnames2.default)('euiSelect', {
    'euiSelect--fullWidth': fullWidth,
    'euiSelect--compressed': compressed,
    'euiSelect--inGroup': prepend || append,
    'euiSelect-isLoading': isLoading
  }, className);

  var emptyOptionNode = void 0;
  if (hasNoInitialSelection) {
    emptyOptionNode = _react2.default.createElement(
      'option',
      { value: '', disabled: true, hidden: true, style: { display: 'none' } },
      '\xA0'
    );
  }

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  var selectDefaultValue = void 0;
  if (!value) {
    selectDefaultValue = defaultValue || '';
  }

  var icon = {
    type: 'arrowDown',
    side: 'right'
  };

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
      _react2.default.createElement(
        'select',
        _extends({
          id: id,
          name: name,
          className: classes,
          ref: inputRef,
          defaultValue: selectDefaultValue,
          value: value
        }, rest),
        emptyOptionNode,
        options.map(function (option, index) {
          var text = option.text,
              rest = _objectWithoutProperties(option, ['text']);

          return _react2.default.createElement(
            'option',
            _extends({}, rest, { key: index }),
            text
          );
        })
      )
    )
  );
};

exports.EuiSelect = EuiSelect;
EuiSelect.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    text: _propTypes2.default.node.isRequired
  })).isRequired,
  isInvalid: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,

  /**
   * Simulates no selection by creating an empty, selected, hidden first option
   */
  hasNoInitialSelection: _propTypes2.default.bool,
  inputRef: _propTypes2.default.func,
  /**
   * when `true` creates a shorter height input
   */
  compressed: _propTypes2.default.bool,
  /**
   * Creates an input group with element(s) coming before select
   */
  prepend: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)]),
  /**
   * Creates an input group with element(s) coming after select
   */
  append: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)])
};

EuiSelect.defaultProps = {
  options: [],
  fullWidth: false,
  isLoading: false,
  hasNoInitialSelection: false,
  compressed: false
};
EuiSelect.__docgenInfo = [{
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
    'options': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'shape',
          'value': {
            'text': {
              'name': 'node',
              'required': true
            }
          }
        }
      },
      'required': true,
      'description': '',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
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
    'hasNoInitialSelection': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Simulates no selection by creating an empty, selected, hidden first option',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'inputRef': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
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
      'description': 'Creates an input group with element(s) coming before select'
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
      'description': 'Creates an input group with element(s) coming after select'
    }
  }
}];