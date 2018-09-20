'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTextArea = exports.RESIZE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _validatable_control = require('../validatable_control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var resizeToClassNameMap = {
  vertical: 'euiTextArea--resizeVertical',
  horizontal: 'euiTextArea--resizeHorizontal',
  both: 'euiTextArea--resizeBoth',
  none: 'euiTextArea--resizeNone'
};

var RESIZE = exports.RESIZE = Object.keys(resizeToClassNameMap);

var EuiTextArea = function EuiTextArea(_ref) {
  var children = _ref.children,
      className = _ref.className,
      compressed = _ref.compressed,
      fullWidth = _ref.fullWidth,
      id = _ref.id,
      inputRef = _ref.inputRef,
      isInvalid = _ref.isInvalid,
      name = _ref.name,
      placeholder = _ref.placeholder,
      resize = _ref.resize,
      rows = _ref.rows,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'compressed', 'fullWidth', 'id', 'inputRef', 'isInvalid', 'name', 'placeholder', 'resize', 'rows']);

  var classes = (0, _classnames2.default)('euiTextArea', resizeToClassNameMap[resize], {
    'euiTextArea--fullWidth': fullWidth,
    'euiTextArea--compressed': compressed
  }, className);

  var definedRows = void 0;

  if (rows) {
    definedRows = rows;
  } else if (compressed) {
    definedRows = 3;
  } else {
    definedRows = 6;
  }

  return _react2.default.createElement(
    _validatable_control.EuiValidatableControl,
    { isInvalid: isInvalid },
    _react2.default.createElement(
      'textarea',
      _extends({
        className: classes
      }, rest, {
        rows: definedRows,
        name: name,
        id: id,
        ref: inputRef,
        placeholder: placeholder
      }),
      children
    )
  );
};

exports.EuiTextArea = EuiTextArea;
EuiTextArea.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  rows: _propTypes2.default.number,
  isInvalid: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  compressed: _propTypes2.default.bool,

  /**
   * Which direction, if at all, should the textarea resize
   */
  resize: _propTypes2.default.oneOf(RESIZE)
};

EuiTextArea.defaultProps = {
  fullWidth: false,
  resize: 'vertical'
};
EuiTextArea.__docgenInfo = [{
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
    'rows': {
      'type': {
        'name': 'number'
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
    'compressed': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'resize': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"vertical"',
          'computed': false
        }, {
          'value': '"horizontal"',
          'computed': false
        }, {
          'value': '"both"',
          'computed': false
        }, {
          'value': '"none"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Which direction, if at all, should the textarea resize',
      'defaultValue': {
        'value': '\'vertical\'',
        'computed': false
      }
    }
  }
}];