'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiTable = function EuiTable(_ref) {
  var children = _ref.children,
      className = _ref.className,
      compressed = _ref.compressed,
      responsive = _ref.responsive,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'compressed', 'responsive']);

  var classes = (0, _classnames2.default)('euiTable', className, {
    'euiTable--compressed': compressed,
    'euiTable--responsive': responsive
  });

  return _react2.default.createElement(
    'table',
    _extends({ className: classes }, rest),
    children
  );
};

exports.EuiTable = EuiTable;
EuiTable.propTypes = {
  compressed: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  responsive: _propTypes2.default.bool
};

EuiTable.defaultProps = {
  responsive: true
};
EuiTable.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'compressed': {
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
      'description': ''
    },
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'responsive': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    }
  }
}];