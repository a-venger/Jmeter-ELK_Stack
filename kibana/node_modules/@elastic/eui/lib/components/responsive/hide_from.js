'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHideFor = exports.RESPONSIVE_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var responsiveSizesToClassNameMap = {
  xs: 'eui-hideFor--xs',
  s: 'eui-hideFor--s',
  m: 'eui-hideFor--m',
  l: 'eui-hideFor--l',
  xl: 'eui-hideFor--xl'
};

var RESPONSIVE_SIZES = exports.RESPONSIVE_SIZES = Object.keys(responsiveSizesToClassNameMap);

var EuiHideFor = function EuiHideFor(_ref) {
  var children = _ref.children,
      className = _ref.className,
      sizes = _ref.sizes,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'sizes']);

  var sizingClasses = sizes.map(function (item) {
    return responsiveSizesToClassNameMap[item];
  });

  var classes = (0, _classnames2.default)('euiHideFor', sizingClasses, className);

  return _react2.default.createElement(
    'span',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.EuiHideFor = EuiHideFor;
EuiHideFor.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  /**
   * List of all the responsive sizes to hide the children from
   */
  sizes: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(RESPONSIVE_SIZES)).isRequired
};
EuiHideFor.__docgenInfo = [{
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
    'sizes': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'enum',
          'value': [{
            'value': '"xs"',
            'computed': false
          }, {
            'value': '"s"',
            'computed': false
          }, {
            'value': '"m"',
            'computed': false
          }, {
            'value': '"l"',
            'computed': false
          }, {
            'value': '"xl"',
            'computed': false
          }]
        }
      },
      'required': true,
      'description': 'List of all the responsive sizes to hide the children from'
    }
  }
}];