'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTextAlign = exports.ALIGNMENTS = exports.alignmentToClassNameMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var alignmentToClassNameMap = exports.alignmentToClassNameMap = {
  'left': 'euiTextAlign--left',
  'right': 'euiTextAlign--right',
  'center': 'euiTextAlign--center'
};

var ALIGNMENTS = exports.ALIGNMENTS = Object.keys(alignmentToClassNameMap);

var EuiTextAlign = function EuiTextAlign(_ref) {
  var children = _ref.children,
      className = _ref.className,
      textAlign = _ref.textAlign,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'textAlign']);

  var classes = (0, _classnames2.default)('euiTextAlign', alignmentToClassNameMap[textAlign], className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.EuiTextAlign = EuiTextAlign;
EuiTextAlign.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  textAlign: _propTypes2.default.oneOf(ALIGNMENTS)
};

EuiTextAlign.defaultProps = {
  textAlign: 'left'
};
EuiTextAlign.__docgenInfo = [{
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
    'textAlign': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"left"',
          'computed': false
        }, {
          'value': '"right"',
          'computed': false
        }, {
          'value': '"center"',
          'computed': false
        }]
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'left\'',
        'computed': false
      }
    }
  }
}];